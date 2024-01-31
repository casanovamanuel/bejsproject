// en una terminal ejecutar npm init
import fs from 'fs';


const path = "./package.json"

const reader = async (filePath) => {
    fs.promises.readFile(filePath,"utf8").then((res, err) => {
        if (err) {
            console.log(err);
            return 1;
        }
        let info = {
            contenidoStr: res,
            contenidoJson: JSON.parse(res),
            size: Buffer.byteLength(res, 'utf8')
        }
        fs.promises.writeFile("./info.json", JSON.stringify(info)).then((err1) => {
            if (err1) {
                console.log(err1);
                return 1;
            }
        })
    });

}


reader(path)







