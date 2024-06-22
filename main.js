const data = {
    param1: "lalalala",
    param2: "lal2ssva",
    param3: "laggggla",
    param4: "lahhhhla"
}

const datitos = [{ name: "hola" }, { name: "chau" }]

const { param3, param2 } = data
console.log({ param3, param2 })


datitos.forEach((element, index) => {
    element.age = 10
})

console.log(datitos)