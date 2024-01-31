let fs = require('fs');

const path_archivo = "./algo.txt"
const fyh = new Date().toLocaleString()
fs.writeFile(path_archivo, "alguna info", (err)=>{
    if (err) {console.log(err); return 0;}
    fs.readFile(path_archivo, "utf8", (err, res)=>{
        if (err) {console.log(err); return 0;}
        console.log(res)
    })
});


let fruta = {lala:1, lolo:3}

console.log(fruta);


