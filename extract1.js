const fs=require('fs'),pdf=require('pdf-parse');
pdf(fs.readFileSync('Reference Data/41-PODOLOGIA (1).pdf')).then(d=>{
  console.log(d.text.substring(0,8000));
  console.log('\n[PAGES:'+d.numpages+' LEN:'+d.text.length+']');
}).catch(e=>console.log('ERR:'+e.message));
