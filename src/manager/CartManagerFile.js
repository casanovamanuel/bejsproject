import fs from 'fs'

function checkCartItem(item) {
    let valid = true
                    console.log(item);
    valid = valid && ( typeof item.productId !== 'undefined' )
    valid = valid && ( typeof item.quantity !== 'undefined' )
    valid = valid && ( Math.round(item.quantity) > 0 )
    
    return valid;
}
// title, description, price, thumbnail, code, stock
const FilePersistenceEngine = {
    path: "./db_cart.json",
    
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
        
        const res = contenido.find((elem)=>elem.productId === productId)
        return res
    },
    update: async function(element){
        let contenido = await this.all()
        const index = contenido.findIndex((elem) => elem.id === element.id)
        if (index === -1) throw new Error("invalid action, not found")  
        contenido[index] = element
        await fs.promises.writeFile(this.path, JSON.stringify(contenido))
    },
    delete: async function(code){
        let contenido = await this.all()
               
        const index = contenido.findIndex((elem) => elem.id === Number(code))
        if (index === -1) throw new Error("invalid action, not found")  
        const retValue = contenido[index] 
        contenido.splice(index,1)
        
        await fs.promises.writeFile(this.path, JSON.stringify(contenido))
        return retValue
    },
    nextId: async function (){
        let contenido = await this.all()
        let max = 0
        contenido.forEach((elem)=>{ if(elem.id>max){max = elem.id} })
        return max + 1;
    }
}

const CartManager = {
    items: FilePersistenceEngine,
    addItem: async function (cartItem) {
        if (!checkCartItem(cartItem)) {
            throw new Error("elemento invalido");
            return 0;
        }
        let knownItem = await this.items.find(cartItem.productId)
        if (typeof knownItem !== 'undefined'){
            // existe => agrego y actualizo
            knownItem.quantity = knownItem.quantity + cartItem.quantity
            this.items.update(knownItem)
            return knownItem.id
        }else{
            const nextId = await this.items.nextId()
            let identifiedItem = {...cartItem, id: nextId}
            await this.items.push(identifiedItem)
            return nextId
        }
        
        
    },
    getItems: async function () {
        const res = await this.items.all();
        return res
    },
    deleteItem: async function(id){
        return this.items.delete(id)
    },
    clean : async function(){
        await this.items.clean()
    }
}

export default CartManager;