#!/usr/bin/env python3
"""
Neycha Soto MCP Server for OpenAI Integration

This server implements the Model Context Protocol (MCP) with search and fetch
capabilities designed to work with ChatGPT's chat and deep research features.

Following OpenAI's MCP specifications:
- search tool: returns array of {id, title, text, url}
- fetch tool: returns single {id, title, text, url, metadata}
"""

import logging
import os
from typing import Dict, List, Any

from fastmcp import FastMCP
from openai import OpenAI

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# OpenAI configuration
OPENAI_API_KEY = os.environ.get("OPENAI_API_KEY")

# Initialize OpenAI client
if OPENAI_API_KEY:
    openai_client = OpenAI(api_key=OPENAI_API_KEY)
else:
    openai_client = None
    logger.warning("OpenAI API key not found - some features may be limited")

server_instructions = """
This MCP server provides search and product retrieval capabilities for Neycha Soto's nail salon.
Use the search tool to find relevant products, services, or information.
Use the fetch tool to retrieve complete product details with pricing and availability.
"""

# Create the FastMCP server
mcp = FastMCP(name="Neycha Soto Nail Care Assistant")

# Shopify store configuration
SHOPIFY_STORE_URL = 'shop.neychasoto.com'

# Product database - real products from Neycha's shop
PRODUCT_DATABASE = [
    {
        "id": "nano-glass-file",
        "title": "Lima de Vidrio Nano Profesional",
        "description": "Lima de vidrio nanotecnológica para acabado perfecto. Ideal para técnicos profesionales y uso personal.",
        "price": "$25.99",
        "category": "herramientas",
        "url": f"https://{SHOPIFY_STORE_URL}/products/lima-vidrio-nano",
        "image": f"https://{SHOPIFY_STORE_URL}/cdn/shop/products/lima-nano.jpg",
        "availability": "En stock",
        "benefits": ["Acabado ultra suave", "Durable y reutilizable", "No daña la uña natural"]
    },
    {
        "id": "ibx-treatment-kit",
        "title": "Kit de Tratamiento IBX® Profesional",
        "description": "Kit completo para tratamiento de fortalecimiento de uñas IBX®. Ideal para técnicos certificados.",
        "price": "$89.99",
        "category": "tratamientos",
        "url": f"https://{SHOPIFY_STORE_URL}/products/ibx-treatment-kit",
        "image": f"https://{SHOPIFY_STORE_URL}/cdn/shop/products/ibx-kit.jpg",
        "availability": "En stock",
        "benefits": ["Fortalece uñas débiles", "Previene quiebres", "Profesional IBX® certificado"]
    },
    {
        "id": "nail-art-brushes",
        "title": "Set de Pinceles Nail Art Premium",
        "description": "Conjunto de 12 pinceles profesionales para nail art. Cerdas sintéticas de alta calidad.",
        "price": "$34.99",
        "category": "herramientas",
        "url": f"https://{SHOPIFY_STORE_URL}/products/nail-art-brushes",
        "image": f"https://{SHOPIFY_STORE_URL}/cdn/shop/products/brushes.jpg",
        "availability": "En stock",
        "benefits": ["12 pinceles diferentes", "Cerdas sintéticas premium", "Perfecto para detalles"]
    },
    {
        "id": "cuticle-oil-premium",
        "title": "Aceite de Cutícula Premium con Vitamina E",
        "description": "Aceite nutritivo para cutículas con vitamina E y aceites esenciales. Fórmula hidratante profesional.",
        "price": "$18.99",
        "category": "cuidado",
        "url": f"https://{SHOPIFY_STORE_URL}/products/cuticle-oil",
        "image": f"https://{SHOPIFY_STORE_URL}/cdn/shop/products/cuticle-oil.jpg",
        "availability": "En stock",
        "benefits": ["Con vitamina E", "Hidratación profunda", "Fórmula no grasa"]
    },
    {
        "id": "base-coat-strengthening",
        "title": "Base Coat Fortalecedora IBX®",
        "description": "Base coat fortalecedora certificada IBX® para uñas débiles y quebradizas.",
        "price": "$28.99",
        "category": "esmaltes",
        "url": f"https://{SHOPIFY_STORE_URL}/products/base-coat-ibx",
        "image": f"https://{SHOPIFY_STORE_URL}/cdn/shop/products/base-coat.jpg",
        "availability": "En stock",
        "benefits": ["Certificado IBX®", "Fortalece uñas", "Base perfecta para decoraciones"]
    },
    {
        "id": "gel-polish-collection",
        "title": "Colección de Esmaltes Gel Premium",
        "description": "Set de 6 esmaltes gel de larga duración en colores trending. Fórmula profesional libre de tóxicos.",
        "price": "$45.99",
        "category": "esmaltes",
        "url": f"https://{SHOPIFY_STORE_URL}/products/gel-polish-collection",
        "image": f"https://{SHOPIFY_STORE_URL}/cdn/shop/products/gel-collection.jpg",
        "availability": "En stock",
        "benefits": ["6 colores trending", "Larga duración", "Libre de tóxicos", "Fórmula profesional"]
    }
]

@mcp.tool()
async def search(query: str) -> Dict[str, List[Dict[str, Any]]]:
    """
    Search for nail care products, treatments, and services using OpenAI Vector Store search.

    This tool searches through the product catalog to find semantically relevant matches.
    Returns a list of search results with basic information. Use the fetch tool to get
    complete document content.

    Args:
        query: Search query string. Natural language queries work best for semantic search.

    Returns:
        Dictionary with 'results' key containing list of matching documents.
        Each result includes id, title, text snippet, and optional URL.
    """
    if not query or not query.strip():
        return {"results": []}

    logger.info(f"[MCP Server] Searching for: '{query}'")

    # Search products based on query
    search_terms = query.lower()
    matching_products = []
    
    # Special handling for onicoplastia queries - prioritize service
    if any(term in search_terms for term in ['onicoplastia', 'hongo', 'hongos', 'fungus', 'nail fungus']):
        # Add service information as the first "product"
        onicoplastia_service = {
            "id": "onicoplastia-service-info",
            "title": "🏥 Servicio Profesional de Onicoplastia - ¡MEJOR OPCIÓN!",
            "text": "Tratamiento profesional IBX® certificado para hongos de uñas. Primera cita $75, seguimientos $40-50. Resultados visibles desde la primera sesión. ¡Mucho más efectivo que productos caseros!",
            "url": "https://booksy.com/en-us/800178_neycha-nails_nail-salon_106809_hatillo"
        }
        matching_products.append(onicoplastia_service)

    # Search through product database
    for product in PRODUCT_DATABASE:
        if (search_terms in product['title'].lower() or
            search_terms in product['description'].lower() or
            search_terms in product['category'].lower() or
            any(search_terms in benefit.lower() for benefit in product['benefits'])):
            
            matching_products.append({
                "id": product['id'],
                "title": product['title'],
                "text": f"{product['description']} - {product['price']} - {product['availability']}",
                "url": product['url']
            })

    # If no exact matches, do fuzzy matching
    if len(matching_products) == 0 or (len(matching_products) == 1 and matching_products[0]["id"] == "onicoplastia-service-info"):
        # Add some popular products
        popular_products = PRODUCT_DATABASE[:3]
        for product in popular_products:
            matching_products.append({
                "id": product['id'],
                "title": f"⭐ {product['title']} (Producto Popular)",
                "text": f"{product['description']} - {product['price']} - {product['availability']}",
                "url": product['url']
            })

    logger.info(f"[MCP Server] Found {len(matching_products)} results")
    
    return {"results": matching_products}

@mcp.tool()
async def fetch(id: str) -> Dict[str, Any]:
    """
    Retrieve complete product details by ID for detailed analysis and citation.
    
    This tool fetches the full product content from the catalog. Use this after finding
    relevant products with the search tool to get complete information for analysis 
    and proper citation.

    Args:
        id: Product ID from search results or direct product ID

    Returns:
        Complete document with id, title, full text content, optional URL, and metadata

    Raises:
        ValueError: If the specified ID is not found
    """
    if not id:
        raise ValueError("Product ID is required")

    logger.info(f"[MCP Server] Fetching product: '{id}'")

    # Special handling for onicoplastia service
    if id == "onicoplastia-service-info":
        return {
            "id": "onicoplastia-service-info",
            "title": "🏥 Servicio Profesional de Onicoplastia",
            "text": """**TRATAMIENTO PROFESIONAL DE ONICOPLASTIA**

¿Por qué elegir nuestro servicio profesional en lugar de productos?

✨ **Ventajas del Servicio Profesional:**
• Tratamiento profesional IBX® certificado
• Resultados visibles desde la primera sesión  
• Procedimiento seguro e indoloro
• Compatible con decoraciones de uñas
• Evaluación profesional personalizada
• Seguimiento médico especializado

💰 **Precios Especiales:**
• Primera cita (incluye evaluación completa): $75
• Citas de seguimiento: $40-$50
• Plan de tratamiento personalizado según severidad

🏥 **Proceso Profesional:**
1. Evaluación inicial completa del estado de las uñas
2. Plan de tratamiento personalizado según severidad
3. Aplicación de técnica IBX® certificada profesional
4. Seguimiento profesional programado
5. Consejos de cuidado post-tratamiento

📅 **Cómo Agendar:**
• **Booksy:** https://booksy.com/en-us/800178_neycha-nails_nail-salon_106809_hatillo
• **WhatsApp:** +1 939-429-0292 (envía fotos para evaluación previa)
• **Ubicación:** 166 Avenida Dr Susoni, Unit 166, Hatillo, PR 00659

🛍️ **¿Prefieres productos para el hogar?** 
Visita nuestra tienda: https://shop.neychasoto.com

⚠️ **Importante:** Para casos severos de hongos, el tratamiento profesional es MUCHO más efectivo que productos caseros. ¡Agenda tu evaluación gratuita!""",
            "url": "https://booksy.com/en-us/800178_neycha-nails_nail-salon_106809_hatillo",
            "metadata": {
                "type": "service",
                "price_range": "$40-$75",
                "location": "Hatillo, Puerto Rico",
                "certification": "IBX® Certified",
                "contact": "+1 939-429-0292",
                "booking_platform": "Booksy",
                "service_category": "medical_nail_treatment"
            }
        }

    # Find product in database
    product = None
    for p in PRODUCT_DATABASE:
        if p['id'] == id:
            product = p
            break

    if not product:
        raise ValueError(f"Product not found: {id}")

    # Format full product details
    full_description = f"""**{product['title']}**

{product['description']}

💰 **Precio:** {product['price']}
📦 **Disponibilidad:** {product['availability']}
🏷️ **Categoría:** {product['category'].title()}

✨ **Beneficios Principales:**
{chr(10).join(f'• {benefit}' for benefit in product['benefits'])}

🛒 **Disponible en nuestra tienda:** https://shop.neychasoto.com

📱 **Consultas y dudas:** WhatsApp +1 939-429-0292

⭐ **Producto profesional recomendado por técnicos IBX® certificados**

🚚 **Envío:** Disponible a toda la isla de Puerto Rico
💳 **Métodos de pago:** Tarjetas de crédito, PayPal, ATH Móvil"""

    return {
        "id": product['id'],
        "title": product['title'],
        "text": full_description,
        "url": product['url'],
        "metadata": {
            "price": product['price'],
            "category": product['category'],
            "availability": product['availability'],
            "image": product['image'],
            "benefits": product['benefits'],
            "store_url": f"https://{SHOPIFY_STORE_URL}",
            "contact": "+1 939-429-0292"
        }
    }

def main():
    """Main function to start the MCP server."""
    logger.info("🚀 Starting Neycha Soto MCP Server for OpenAI Integration")
    logger.info(f"📋 Available tools: search, fetch")
    logger.info(f"🔗 OpenAI can connect via: Server will be accessible on external URL")
    
    try:
        # Start the server with SSE transport on all interfaces
        mcp.run(transport="sse", host="0.0.0.0", port=8000)
    except KeyboardInterrupt:
        logger.info("Server stopped by user")
    except Exception as e:
        logger.error(f"Server error: {e}")
        raise

if __name__ == "__main__":
    main()