const hacer = (a,b)=>(a+b)

function hacemeAlgo (a,b, cbfunction){
    return new Promise((res,rej)=>{
        if (isNaN(a)) {return rej("a no es un numero")}
        if (isNaN(b)) {return rej("b no es un numero")}
        return res(cbfunction(a,b))
    })
}

hacemeAlgo(4,"jamon del medio",hacer)
        .then((result)=>console.log(result))
        .catch((err) => console.log("se rompio: " + err))

