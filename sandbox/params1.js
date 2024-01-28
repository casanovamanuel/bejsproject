
let texto = "texto feo - "

function rototo () {
    
    let interna = texto;
    interna += "colita"
    console.log (interna)
    return interna
}

console.log ()

const listaVacia = [];
const listaNoVacia = [1,2,3,4,5]

const largo = (lista) => lista.length?lista.length:"vacia"

console.log(largo(listaVacia));
console.log(largo(listaNoVacia));



