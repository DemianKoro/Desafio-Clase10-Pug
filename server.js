const express = require('express')
const { Router } = express
const routerProducts = Router()
// const apiContainer = require ('./src/containers/contenedor') // import de clase constructora
const {getProductos, getProductoById, saveProducto, modifyProductoById, deleteProductoById, deleteAllProducts,  } = require('./src/containers/contenedor');
const app = express()

const productos = require('./public/productos.txt')


app.set('view engine', 'pug')
app.set('views', './views')

app.use(express.json())
app.use(express.urlencoded({ extended: true}))
// app.use('/api/products', routerProducts)
app.use(express.static('public'))


app.get('/', async (req, res) => {
    const productos = await getProductos().catch();
    res.render('inicio', {productos});
});

app.post('/productos', async (req, res) => {
    const producto = req.body
    // const productoNuevo = await saveProducto(producto).catch()
    console.log(producto)
    const productos = await getProductos().catch();
    console.log(productos)
    // res.redirect('/')
    res.render('products', {productos});
});



// Running server
const PORT = process.env.port || 8080

const server = app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${server.address().port}`)
})

server.on("error", error => console.log(`Error en servisor ${error}`))