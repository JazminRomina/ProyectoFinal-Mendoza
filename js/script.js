const urlpage = "./js/pkmn.json"
let productos = []
fetch(urlpage)
    .then (response => response.json())
    .then (data => {
        productos = data
        listaProductos(productos)
    })

let carritoGuardado = JSON.parse(localStorage.getItem("carrito"))
let carrito = carritoGuardado ? carritoGuardado : []

// Crear tarjetas en HTML
let contenedorProductos = document.getElementById("productos-pokemon")

function listaProductos(listado){
    contenedorProductos.innerHTML = ""
    listado.forEach(lista => {
        let productosPoke = document.createElement("div")
        productosPoke.classList.add("separador")
        productosPoke.innerHTML = `
        <div>
        <img class="img-productos" src=./img/img-productos/${lista.url}>
        </div>
        <div class="container-productos">
        <h2>${lista.nombre}</h2>
        <p>Precio: $${lista.precio}</p>
        <button id="${lista.id}" class="boton-agregar">AGREGAR</button>
        </div>
        `
        contenedorProductos.appendChild(productosPoke)

        let botonAgregar = document.getElementById(lista.id)
        botonAgregar.addEventListener("click", agregarAlCarrito)
    })
}

function agregarAlCarrito(e){
    Toastify({
        text: "Se agregó al carrito",
        duration: 1000,
        gravity: "bottom",
        position: "right",
        stopOnFocus: true,
        style: {
          background: "linear-gradient(to right, #910513, #b81828)",
        },
        offset: {
            x: '.25em',
            y: '4em'
          },
        onClick: function(){}
      }).showToast()
    let productoEncontrado = productos.find(prod => prod.id === Number(e.target.id))
    let productoPosicion = carrito.findIndex(prod => prod.id === Number(e.target.id))
    if(productoPosicion === -1){
    carrito.push({
        id: productoEncontrado.id,
        nombre: productoEncontrado.nombre,
        cantidad: 1,
        precio: productoEncontrado.precio,
        precioTotal: productoEncontrado.precio
    })
    } else{
        carrito[productoPosicion].cantidad++
        carrito[productoPosicion].precioTotal = carrito[productoPosicion].precio * carrito[productoPosicion].cantidad
    }
    localStorage.setItem("carrito", JSON.stringify(carrito))
}

// Boton productos
function botonProductos(){
let botonesFiltros = document.getElementsByClassName("botones-categoria")
for (const botonFiltrar of botonesFiltros) {
    botonFiltrar.addEventListener("click",filtrarPorCategoria)
}
}
botonProductos()

function filtrarPorCategoria(e){
    let elementosFiltrados = productos.filter(producto => producto.categoria === e.target.id)
    listaProductos(elementosFiltrados)
}
// Boton quienes somos

let contenedorSomos = document.getElementById("quienes-somos")
function quienesSomos(){
    contenedorSomos.innerHTML = ""
    let mensajePagina = document.createElement("div")
    mensajePagina.innerHTML = `
    <h2 class="subtitulo-empresa">¿Quiénes Somos?</h2>
    <p class="texto-empresa">En VirtualPokeStudio, nos apasiona brindarte una experiencia única de conexión con nuestros productos importados de diferentes países. Somos una empresa especializada en la importación y venta de productos exclusivos de todo el mundo. Nuestro objetivo es llevarte en un viaje sin salir de casa, ofreciéndote una amplia gama de artículos auténticos y emocionantes.<br>
    Trabajamos arduamente para seleccionar cuidadosamente cada producto que ofrecemos en VirtualPokeStudio. Nuestro equipo se embarca en exploraciones internacionales, estableciendo relaciones con proveedores confiables y vendedores locales para asegurarnos de que nuestros productos sean genuinos y de la más alta calidad. Desde juguetes y juegos hasta prendas para utilizar cuando sale de su casa, cada artículo ha sido seleccionado con esmero para ofrecerte una experiencia de compra excepcional.<br>
    En VirtualPokeStudio, nos enorgullece ser una ventana al mundo para nuestros clientes. ¿Siempre has soñado con visitar los coloridos mercados de Japón? ¿O descubrir la elegancia y el encanto de la artesanía china? Con nuestros productos importados, puedes experimentar la esencia de diferentes lugares sin tener que subir a un avión. Cada producto cuenta su propia historia y está impregnado de la cultura y la tradición del lugar de donde proviene.</p>
    <div class="caja-empresa"><img class="img-empresa" src=./img/empresa-virtualpokestudio.webp></div>
    `
    contenedorSomos.appendChild(mensajePagina)
}
quienesSomos()

// botones para ir entre quienes somos y productos
let cajaDos = document.getElementById("caja-nosotros")
let cajaUno = document.getElementById("caja-productos")

let botonUno = document.querySelector("#boton-uno")
botonUno.addEventListener("click", seleccionoDos)

function seleccionoDos(){
    cajaUno.classList.add("ocultar")
    cajaDos.classList.remove("ocultar")
}

let botonDos = document.querySelector("#boton-dos")
botonDos.addEventListener("click", seleccionoUno)

function seleccionoUno(){
    cajaDos.classList.add("ocultar")
    cajaUno.classList.remove("ocultar")
    listaProductos(productos)
}
