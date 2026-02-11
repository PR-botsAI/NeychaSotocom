const fs = require('fs');
const pdf = require('pdf-parse');

const file = process.argv[2];
const maxChars = parseInt(process.argv[3] || '20000');

const dataBuffer = fs.readFileSync(file);
pdf(dataBuffer).then(function(data) {
    console.log('PAGES: ' + data.numpages);
    console.log('---TEXT_START---');
    console.log(data.text.substring(0, maxChars));
    console.log('---TEXT_END---');
}).catch(function(err) {
    console.error('ERROR: ' + err.message);
});
