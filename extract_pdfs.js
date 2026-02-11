import { readFileSync } from 'fs';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const pdf = require('pdf-parse');

const files = [
    { path: "D:/Antigravity/NeychaSotoweb/Reference Data/1.3 unas (1).pdf", maxPages: 10, label: "1.3 UÑAS" },
    { path: "D:/Antigravity/NeychaSotoweb/Reference Data/84-PODOLOGIA (1).pdf", maxPages: null, label: "84-PODOLOGIA" },
    { path: "D:/Antigravity/NeychaSotoweb/Reference Data/41-PODOLOGIA (1).pdf", maxPages: null, label: "41-PODOLOGIA" },
    { path: "D:/Antigravity/NeychaSotoweb/Reference Data/85-anatomia-del-pie (1).pdf", maxPages: 10, label: "85-ANATOMIA DEL PIE" },
    { path: "D:/Antigravity/NeychaSotoweb/Reference Data/FernandezVila_Alejandra_TFG_2015 (1).pdf", maxPages: null, label: "FernandezVila TFG 2015" },
    { path: "D:/Antigravity/NeychaSotoweb/Reference Data/TFGUEX_2016_Oñate_Mendez (1).pdf", maxPages: null, label: "TFGUEX 2016 Oñate" },
    { path: "D:/Antigravity/NeychaSotoweb/Reference Data/11 Diccionario podológico (1).pdf", maxPages: 15, label: "11-Diccionario Podologico" },
];

async function extractAll() {
    for (const file of files) {
        console.log(`\n${'='.repeat(80)}`);
        console.log(`FILE: ${file.label}`);
        console.log(`${'='.repeat(80)}`);
        try {
            const dataBuffer = readFileSync(file.path);
            const options = {};
            if (file.maxPages) {
                options.max = file.maxPages;
            }
            const data = await pdf(dataBuffer, options);
            const text = data.text.substring(0, 8000);
            console.log(text);
            console.log(`\n[Total pages: ${data.numpages}, extracted text length: ${data.text.length}]`);
        } catch(e) {
            console.log(`Error: ${e.message}`);
        }
    }
}

extractAll();
