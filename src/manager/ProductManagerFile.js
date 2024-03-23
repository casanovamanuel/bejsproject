import fs from 'fs'

const checkProduct = (product)=>{
    let valid = true
    valid = valid && ( typeof product.title !== 'undefined' )
    valid = valid && ( typeof product.description !== 'undefined' )
    valid = valid && ( typeof product.price !== 'undefined' )
    //valid = valid && ( typeof product.thumbnail !== 'undefined' )
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
        //console.log(contenido);
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
    find: async function(productId){//pasar a findByCode
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
            //console.log("producto invalido")
            throw new Error("producto invalido");
            return 0;
        }
        //console.log("products find : ", product.code, this.products.find(product.code));
        const elementoExistente = await this.products.find(product.code)
        //console.log("products find : ", product.code, elementoExistente)
        if (elementoExistente != undefined) {
            //console.log("El producto ya existe")
            throw new Error("El producto ya existe")
            return 0;
        }
        let identifiedProduct = {...product, id: this.nextId}
        this.nextId++
        //console.log("identificado ",identifiedProduct)
        await this.products.push(identifiedProduct)
        return this.nextId
    },
    getProducts: async function () {
        const res = await this.products.all();
        return res
    },
    getProductById: async function (searchedCode) {
        const identified = await this.products.find(searchedCode)
        if (identified == undefined) {
            //console.log("no encontre el codigo: ", searchedCode);
            return -1;
        } else {
            return identified;
        }
    },
    clean : async function(){
        await this.products.clean()
    }
}

export default ProductManager;