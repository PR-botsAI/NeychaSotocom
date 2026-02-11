const fs = require('fs');
const pdf = require('pdf-parse');
const path = require('path');

const files = [
  '14-Onicopatias-Guia-Practica-de-Diagnostico-Tratamiento-y-Manejo-Arenas-TPDF (1).pdf',
  '38-onicopatias (1).pdf',
  '54 patologia ungueal (1).pdf',
  '30 Patologia Ungueal (1).pdf',
  '65-Enfermedades-de-Las-Unas-de-Las-Manos (1).pdf',
  'Diagnóstico y Tratamiento de (1).pdf'
];

const refDir = path.join(__dirname, 'Reference Data');
let output = '';

async function extractAll() {
  for (const file of files) {
    const filePath = path.join(refDir, file);
    try {
      const dataBuffer = fs.readFileSync(filePath);
      const data = await pdf(dataBuffer);
      output += '\n========================================\n';
      output += 'FILE: ' + file + '\n';
      output += 'PAGES: ' + data.numpages + '\n';
      output += '========================================\n';
      output += data.text.substring(0, 15000) + '\n';
      output += '\n--- END OF EXCERPT ---\n\n';
    } catch (err) {
      output += 'ERROR with ' + file + ': ' + err.message + '\n';
    }
  }
  fs.writeFileSync(path.join(__dirname, 'pdf_extracted_text.txt'), output, 'utf8');
  console.log('Done! Output written to pdf_extracted_text.txt');
}

extractAll();
