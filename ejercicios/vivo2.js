

function sumar (a,b){
    return new Promise((res,rej)=>{
        if (isNaN(a)) rej("a no es un numero")
        if (isNaN(b)) rej("b no es un numero")
        if ((a*b) === 0) rej("operacion innecesaria")
        const result = a + b
        if (result < 0) rej("suma negativa")  
        return res(result)
    })
}
function restar (a,b){
    return new Promise((res,rej)=>{
        if (isNaN(a)) rej("a no es un numero")
        if (isNaN(b)) rej("b no es un numero")
        if ((a*b) === 0) rej("operacion innecesaria")
        const result = a - b
        if (result < 0) rej("resta negativa")  
        return res(result)
    })
}
function multiplicar (a,b){
    return new Promise((res,rej)=>{
        if (isNaN(a)) {return rej("a no es un numero")}
        if (isNaN(b)) {return rej("b no es un numero")}
        if (a < 0) rej("a es negativo")
        if (b < 0) rej("b es negativo")
        return res(a*b)
    })
}
function dividir (a,b){
    return new Promise((res,rej)=>{
        if (isNaN(a)) {return rej("a no es un numero")}
        if (isNaN(b)) {return rej("b no es un numero")}
        if (b == 0) {return rej("b es cero")}
        return res(a/b)
    })
}


const calcular = async (op1,op2)=>{
    try{
        let suma = await sumar(op1,op2)
        let resta = await restar(op1,op2)
        let multi = await multiplicar(op1,op2)
        let dividido = await dividir(op1,op2)
        
        console.log([suma, resta, multi, dividido])
    }catch(err){
        console.log(err)
    }
}


calcular(6,2)
 