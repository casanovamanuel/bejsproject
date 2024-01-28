let numeritos = [2,4,5,7,2,1,3,56,7,3,2,4,66,4,3,2,2,23,4,4,44]


function prom2mayores (arr) {
    let ord = arr.sort((a,b)=>b-a)
    return (ord[0] + ord[1])/2
    
}

const result = prom2mayores(numeritos);
console.log(result)