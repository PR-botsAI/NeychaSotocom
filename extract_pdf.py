import subprocess
import sys

# Install PyPDF2
subprocess.check_call([sys.executable, "-m", "pip", "install", "PyPDF2"])

from PyPDF2 import PdfReader

files = [
    ("D:/Antigravity/NeychaSotoweb/Reference Data/1.3 unas (1).pdf", 10),
    ("D:/Antigravity/NeychaSotoweb/Reference Data/84-PODOLOGIA (1).pdf", None),
    ("D:/Antigravity/NeychaSotoweb/Reference Data/41-PODOLOGIA (1).pdf", None),
    ("D:/Antigravity/NeychaSotoweb/Reference Data/85-anatomia-del-pie (1).pdf", 10),
    ("D:/Antigravity/NeychaSotoweb/Reference Data/FernandezVila_Alejandra_TFG_2015 (1).pdf", None),
    ("D:/Antigravity/NeychaSotoweb/Reference Data/TFGUEX_2016_Oñate_Mendez (1).pdf", None),
    ("D:/Antigravity/NeychaSotoweb/Reference Data/11 Diccionario podológico (1).pdf", 15),
]

for filepath, max_pages in files:
    print(f"\n{'='*80}")
    print(f"FILE: {filepath}")
    print(f"{'='*80}")
    try:
        reader = PdfReader(filepath)
        total = len(reader.pages)
        pages_to_read = min(total, max_pages) if max_pages else total
        for i in range(pages_to_read):
            text = reader.pages[i].extract_text()
            if text and text.strip():
                print(f"\n--- Page {i+1} ---")
                print(text[:3000])
    except Exception as e:
        print(f"Error: {e}")
