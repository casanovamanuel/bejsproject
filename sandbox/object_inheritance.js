const persona = {
    nombre: "",
    apellido: "",
    nombreCompleto: function () {
        return this.nombre + " " + this.apellido
    }
}

const jhonWick = {
    nombre: "Jhon",
    apellido: "Wick",
    __proto__: persona,
    nombreCompleto: function () {
        const aux = (this.__proto__.nombreCompleto.bind(this))()
        return aux + "!!"
    }
}




console.log(jhonWick.nombreCompleto());
console.log(persona.nombreCompleto());

