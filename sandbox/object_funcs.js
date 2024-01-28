let autos = [
    {
        id: 1,
        marca: "ford",
        modelo: "fiesta",
        año: 2014
    },
    {
        
    },{}
]


let entrities = autos.map((autito)=>Object.entries(autito));
let keysss = autos.map((autito)=>Object.keys(autito));
let valuesss = autos.map((autito)=>Object.values(autito));

console.log(entrities);