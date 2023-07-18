let traerProductos = JSON.parse(localStorage.getItem("carrito"))

const vacio = document.getElementById("sin-productos")
const carritoProductos = document.getElementById("carrito")
let comprar = document.getElementById("comprar-carrito")
let eliminarElProducto = document.getElementsByClassName("contenedor-eliminar")

function CarritoDeCompras(){
if(traerProductos && traerProductos.length > 0){
    carritoProductos.innerHTML= ""
    vacio.classList.add("ocultar")
    carritoProductos.classList.remove("ocultar")
    comprar.classList.remove("ocultar")
    traerProductos.forEach(carrito => {
        let contenedorCarrito = document.createElement("div")
        contenedorCarrito.classList.add("separador-carrito")
        contenedorCarrito.innerHTML= `
        <div class="contenedor-carrito">
        <div class="contenedor-id">
        <article>ID</article>
        <h2>${carrito.id}</h2>
        </div>
        <div class="contenedor-nombre">
        <article>Nombre</article>
        <h2>${carrito.nombre}</h2>
        </div>
        <div class="contenedor-cantidad">
        <article>Cantidad</article>
        <h2>${carrito.cantidad}</h2>
        </div>
        <div class="contenedor-precio">
        <article>Precio</article>
        <h2>$${carrito.precioTotal}</h2>
        </div>
        <div id="${carrito.id}" class="contenedor-eliminar">
        <img class="img-eliminar" src="./img/eliminar.png">
        </div>
        </div>
        `
        carritoProductos.appendChild(contenedorCarrito)
    });
} else{
    vacio.classList.remove("ocultar")
    comprar.classList.add("ocultar")
    carritoProductos.classList.add("ocultar")
}
eliminarProducto()
CarritoComprado()
}
CarritoDeCompras()

function CarritoComprado(){comprar.addEventListener("click", comprarCarrito)}
function comprarCarrito(e){
    Swal.fire({
        icon: 'question',
        title: '¿Estás seguro?',
        text: 'Al aceptar vas a comprar todos los productos que hay en el carrito.' ,
        showDenyButton: true,
        confirmButtonText: 'Comprar',
        denyButtonText: `No comprar`,
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire('¡Felicidades por tu compra!', '', 'success')
          traerProductos.length = 0
          localStorage.setItem("carrito", JSON.stringify(traerProductos))
          CarritoDeCompras()
        }
    })
}

function eliminarProducto(){
    eliminarElProducto = document.getElementsByClassName("contenedor-eliminar")
    for(const botonEliminado of eliminarElProducto) {
        botonEliminado.addEventListener("click", chauProducto)
    }
}
function chauProducto(e){
    Toastify({
        text: "Se eliminó el producto",
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
    let encontrado = traerProductos.findIndex(producto => producto.id == e.currentTarget.id)
    traerProductos.splice(encontrado, 1)
    CarritoDeCompras()
    localStorage.setItem("carrito", JSON.stringify(traerProductos))
}