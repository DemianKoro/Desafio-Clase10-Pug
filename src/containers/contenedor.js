const fs = require('fs');
const { parse } = require('path');

class Contenedor{
    constructor(archivo){
        this.archivo = archivo;
    }
    async save(producto){
        let productosObj = await this.getAll();
        let id = productosObj.length + 1;
        producto.id= parseInt(id)
        productosObj.push(producto);
        await fs.promises.writeFile(this.archivo,JSON.stringify(productosObj, null, 2))
    }

    async getAll(){
        let productos = await fs.promises.readFile(this.archivo);
        let productosObj = JSON.parse(productos);
        return productosObj;
        
    }

    async getById(id){
        let productos = await this.getAll();
        let productoRetornado = await productos.find((prod)=>prod.id==id);
        return productoRetornado;
    }

    async deleteById(id){
        let productos = await this.getAll();
        let nuevaListaProductos = productos.filter((prod)=>prod.id!==parseInt(id));
        await fs.promises.writeFile(this.archivo,JSON.stringify(nuevaListaProductos, null, 2));
    }

    async deleteAll(){
        await fs.promises.writeFile(this.archivo,'[]');
    }

    async getLength(){
        let list = await this.getAll();
        return await list.length;
    }

    async modifyProducto(id, producto){
        let productos = await this.getAll();
        let nuevaListaProductos = productos.splice(parseInt(id - 1) , 1 , producto);
        await fs.promises.writeFile(this.archivo,JSON.stringify(productos, null, 2))

    } 


}

let contenedor = new Contenedor('./public/productos.txt');


const getProductoById = async (id)=>{
    producto = await contenedor.getById(id);
    return producto
  
}

const getProductos = async ()=>{
   const listaProductos = await contenedor.getAll();
    return listaProductos;
}

const saveProducto = async (producto)=>{
    productoNuevo = JSON.stringify(await contenedor.save(producto));
    return productoNuevo;
}

const modifyProductoById = async (id, producto) =>{
    const productoNuevo = await contenedor.modifyProducto(id, producto);
    return productoNuevo;
}

const deleteProductoById = async (id) =>{
    const nuevaLista = await contenedor.deleteById(id);
    return nuevaLista;
}

const getProductoRandom = async (min,max)=>{
    let id = Math.floor( Math.random()*( max-min + 1) + min )
    let productoRandom = JSON.stringify(await contenedor.getById(id));
    return productoRandom;
}

const deleteAllProducts = async () =>{
    let listaVacia = contenedor.deleteAll()
}

module.exports = {Contenedor, getProductos, getProductoById, saveProducto, modifyProductoById, deleteProductoById, deleteAllProducts };

