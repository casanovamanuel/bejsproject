let objetos = [
    {
        manzanas: 3,
        peras:2,
        carnes:1,
        jugos:5,
        dulces:2
    },{
        manzanas:1,
        sandias:1,
        huevos:6,
        jugos:1,
        panes:4
    }, {
        naranjas:1,
        manzanas:1,
        carnes:6,
        jugos:1,
        panes:4
    }
];

let result = new Set();
objetos.forEach((elem) => {
    Object.keys(elem).forEach((elemkey)=> result.add(elemkey));
});

console.log(Array.from(result));


let total = objetos.reduce((acum,actual) => acum += actual.values);
console.log(total);


