import fs from 'fs'

const checkProduct = (product) => {
    let valid = true
    valid = valid && (typeof product.title !== 'undefined')
    valid = valid && (typeof product.description !== 'undefined')
    valid = valid && (typeof product.price !== 'undefined')
    //valid = valid && ( typeof product.thumbnail !== 'undefined' )
    valid = valid && (typeof product.code !== 'undefined')
    valid = valid && (typeof product.stock !== 'undefined')
    return valid;
}

// title, description, price, thumbnail, code, stock
const FilePersistenceEngine = {
    path: "./db_product.json",

    encoding: "utf8",
    all: async function () {
        let contenidocrudo = await fs.promises.readFile(this.path, this.encoding);

        let contenido = JSON.parse(contenidocrudo)
        //
        return contenido;
    },
    clean: async function () {
        let contenido = []
        await fs.promises.writeFile(this.path, JSON.stringify(contenido))

    },
    push: async function (element) {

        let contenido = await this.all()
        contenido.push(element)
        await fs.promises.writeFile(this.path, JSON.stringify(contenido))
    },
    find: async function (productId) {//pasar a findByCode
        let contenido = await this.all()

        const res = contenido.find((elem) => elem.code === productId)
        return res
    },
    update: async function (element) {
        let contenido = await this.all()
        const index = contenido.findIndex((elem) => elem.code === element.code)
        if (index === -1) throw new Error("invalid action, not found")
        contenido[index] = element
        await fs.promises.writeFile(this.path, JSON.stringify(contenido))
    },
    delete: async function (code) {
        let contenido = await this.all()
        const index = contenido.findIndex((elem) => elem.code === code)
        if (index === -1) throw new Error("invalid action, not found")
        const retValue = contenido[index]
        contenido.splice(index, 1)

        await fs.promises.writeFile(this.path, JSON.stringify(contenido))
        return retValue
    },
    nextId: async function () {
        let contenido = await this.all()
        let max = 0
        contenido.forEach((elem) => { if (elem.id > max) { max = elem.id } })
        return max + 1;
    }
}

const ProductManager = {
    products: FilePersistenceEngine,
    addProduct: async function (product) {
        if (!checkProduct(product)) {
            throw new Error("producto invalido");
            return 0;
        }
        const elementoExistente = await this.products.find(product.code)
        if (elementoExistente != undefined) {
            throw new Error("El producto ya existe")
            return 0;
        }
        const nextId = await this.products.nextId()
        let identifiedProduct = { ...product, id: nextId }

        await this.products.push(identifiedProduct)
        return nextId
    },
    updateProduct: async function (product) {
        if (!checkProduct(product)) {
            throw new Error("producto invalido");
        }
        const elementoExistente = await this.products.find(product.code)
        if (elementoExistente == undefined) {
            throw new Error("El producto no existe")
        }
        this.products.update(product)
    },
    getProducts: async function () {
        const res = await this.products.all();
        return res
    },
    getProductByCode: async function (searchedCode) {
        const identified = await this.products.find(searchedCode)
        if (identified == undefined) {
            throw new Error("no existe el producto")
        } else {
            return identified;
        }
    },
    deleteProduct: async function (code) {
        return this.products.delete(code)
    },
    clean: async function () {
        await this.products.clean()
    }
}
//el motor de persistencia deberia manejarse por id y manager por code, 
//hay mejora necesaria, 
//tengo que implementar findBy donde le pueda pasar un objeto con el filtro 
// y que me busque entonces usar this.productos.findBy({code : elCodigo }) 


export default ProductManager;