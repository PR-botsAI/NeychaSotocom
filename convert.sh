#!/bin/bash
/mingw64/bin/pdftotext.exe "Reference Data/84-PODOLOGIA (1).pdf" "84-pod.txt"
/mingw64/bin/pdftotext.exe "Reference Data/41-PODOLOGIA (1).pdf" "41-pod.txt"
/mingw64/bin/pdftotext.exe -l 10 "Reference Data/1.3 unas (1).pdf" "13-unas.txt"
/mingw64/bin/pdftotext.exe -l 10 "Reference Data/85-anatomia-del-pie (1).pdf" "85-anat.txt"
/mingw64/bin/pdftotext.exe "Reference Data/FernandezVila_Alejandra_TFG_2015 (1).pdf" "fernandez.txt"
/mingw64/bin/pdftotext.exe "Reference Data/TFGUEX_2016_Oñate_Mendez (1).pdf" "onate.txt"
/mingw64/bin/pdftotext.exe -l 15 "Reference Data/11 Diccionario podológico (1).pdf" "diccionario.txt"
echo "DONE"
