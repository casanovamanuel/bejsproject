import fs from 'fs'

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
const FilePersistenceEngine = {
    path: "./db.json",
    encoding : "utf8",
    all: async function(){
        let contenidocrudo = await fs.promises.readFile(this.path,this.encoding);
        let contenido = JSON.parse( contenidocrudo) 
        return contenido;
    },
    clean: async function(){
        let contenido = []
        await fs.promises.writeFile(this.path, JSON.stringify(contenido))
    },
    push: async function(element){
        let contenido = await this.all()
        contenido.push(element)
        await fs.promises.writeFile(this.path, JSON.stringify(contenido))
    },
    find: async function(productId){
        let contenido = await this.all()
        
        const res = contenido.find((elem)=>elem.code === productId)
        return res
    }
}

const ProductManager = {
    products: FilePersistenceEngine,
    nextId: 1,
    addProduct: async function (product) {
        if (!checkProduct(product)) {
            console.log("producto invalido")
            return 0;
        }
        //console.log("products find : ", product.code, this.products.find(product.code));
        const elementoExistente = await this.products.find(product.code)
        console.log("products find : ", product.code, elementoExistente)
        if (elementoExistente != undefined) {
            console.log("El producto ya existe")
            return 0;
        }
        let identifiedProduct = {...product, id: this.nextId}
        this.nextId++
        console.log("identificado ",identifiedProduct)
        await this.products.push(identifiedProduct)
        return this.nextId
    },
    getProducts: async function () {
        return await this.products.all()
    },
    getProductById: async function (searchedCode) {
        const identified = await this.products.find(searchedCode)
        if (identified == undefined) {
            console.log("no encontre el codigo: ", searchedCode);
            return -1;
        } else {
            return identified;
        }
    },
    clean : async function(){
        await this.products.clean()
    }
}


const fruti1 = {code: "123", title: "frutilla" , description: "fruta roja" , price: 1, thumbnail:"frutilla.png", stock:10}
const fruti2 = {code: "1232", title: "limon", description: "fruta amarilla" , price: 1, thumbnail:"limon.png", stock:10}
const ffruti2 = {code: "1232", title: "carlitos", description: "fruta amarilla" , price: 1, thumbnail:"limon.png", stock:10}

ProductManager.clean().then((res, err)=>{});
ProductManager.getProducts().then((res,err)=>{
    if (err != null) throw err;
    console.log("vacío: ", JSON.stringify(res))
})

ProductManager.addProduct(fruti1).then((res, err)=>{
    ProductManager.getProducts().then((res,err)=>{
        if (err != null) throw err;
        console.log("un Elemento: ", JSON.stringify(res))
    })
})

ProductManager.addProduct(fruti2).then((res, err)=>{
    ProductManager.getProducts().then((res,err)=>{
        if (err != null) throw err;
        console.log("dos Elementos: ", JSON.stringify(res))
    })
})

//console.log("Un Elemento: ", JSON.stringify(ProductManager.getProducts()))
//ProductManager.addProduct(fruti2)
//console.log("dos Elementos: ", JSON.stringify(ProductManager.getProducts()))
//ProductManager.addProduct(ffruti2)
//console.log("codigo repetido", JSON.stringify(ProductManager.getProducts()))
//console.log("producto existente", JSON.stringify(ProductManager.getProductById(2)))
//console.log("producto inexistente", JSON.stringify(ProductManager.getProductById(4)))


// title, description, price, thumbnail, code, stock