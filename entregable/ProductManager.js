const checkProduct = (product)=>{
    let valid = true
    valid = valid && ( typeof product.title !== 'undefined' )
    valid = valid && ( typeof product.description !== 'undefined' )
    valid = valid && ( typeof product.price !== 'undefined' )
    valid = valid && ( typeof product.thumbnail !== 'undefined' )
    valid = valid && ( typeof product.code !== 'undefined' )
    valid = valid && ( typeof product.stock !== 'undefined' )
    return valid;
}

// title, description, price, thumbnail, code, stock


const ProductManager = {
    products: [],
    nextId: 1,
    addProduct: function (product) {
        if (!checkProduct(product)) {
            console.log("producto invalido")
            return 0;
        }
        if (this.products.find((elem) => elem.code === product.code) != undefined) {

            console.log("El producto ya existe")
            return 0;
        }
        identifiedProduct = {...product, id: this.nextId}
        this.nextId++
        this.products.push(identifiedProduct)
    },
    getProducts: function () {
        return this.products
    },
    getProductById: function (searchedCode) {
        const identified = this.products.find((elem) => elem.id === searchedCode)
        if (identified == undefined) {
            console.log("no encontre el codigo: ", searchedCode);
            return -1;
        } else {
            return identified;
        }
    }
}

console.log("vacío: ", JSON.stringify(ProductManager.getProducts()))
ProductManager.addProduct({code: "123", title: "frutilla" , description: "fruta roja" , price: 1, thumbnail:"frutilla.png", stock:10})
console.log("Un Elemento: ", JSON.stringify(ProductManager.getProducts()))
ProductManager.addProduct({code: "1232", title: "limon", description: "fruta amarilla" , price: 1, thumbnail:"limon.png", stock:10})
console.log("dos Elementos: ", JSON.stringify(ProductManager.getProducts()))
ProductManager.addProduct({code: "1232", title: "carlitos", description: "fruta amarilla" , price: 1, thumbnail:"limon.png", stock:10})
console.log("codigo repetido", JSON.stringify(ProductManager.getProducts()))
console.log("producto existente", JSON.stringify(ProductManager.getProductById(2)))
console.log("producto inexistente", JSON.stringify(ProductManager.getProductById(4)))


// title, description, price, thumbnail, code, stock