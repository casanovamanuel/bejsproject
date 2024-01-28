const fruta = {nombre:"mono",
    saltos: 0, 
    esfeo: true,
    saltar : function(){
        this.saltos = this.saltos + 1;
        return this.saltos;
    }
}

console.log(fruta.saltar());
console.log(fruta.saltar());
console.log(fruta.saltar());

console.log(fruta);

fruta.nombre = "gorila";

console.log(fruta);


const mirador = (objeto)=>{return objeto.esfeo;};

console.log(mirador(fruta));

