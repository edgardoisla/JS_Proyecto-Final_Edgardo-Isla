/*Constructor de mi producto

class producto {
    constructor(sku, categoria, nombre, precio){
        this.sku = parseInt(sku);
        this.categoria = categoria.toLowerCase();
        this.nombre = nombre;
        this.precio = parseFloat(precio);

    }
}
*/

const url = '/js/products.json'

fetch(url)
.then(response => response.json())
.then(prod => {

    // Verifico si existe el producto que necesito tener en el stock:

    const stockProducts = prod.map(producto => producto.sku)

    console.log(`Los productos en stock son: ${stockProducts}`);

    // Almaceno datos de productos en el storage

    const localSave = (catalogo, id) => {localStorage.setItem(catalogo,id)};

    localSave("productosDisponibles", JSON.stringify(prod));


    const productoCatalogoHTML = (producto) => {
        return `
        <div class="col-3">
            <div class="card">
                <img src="https://loremflickr.com/320/240/${producto.nombre}" class="card-img-top" alt="...">
                <div class="card-body">
                  <h5 class="card-title">${producto.nombre}</h5>
                  <p class="card-text">Precio: ${producto.precio}</p>
                  <button id="btn-catalogo-${producto.sku}" class="btn btn-success">Agregar</button>
                </div>
            </div>
        </div> 
        `
    };

    const mostrarCatalogo = () => {
        const catalogoNodo = document.getElementById("catalogo");
        let catalogoHTML ="";

        for (const producto of prod) {
            catalogoHTML += productoCatalogoHTML(producto);
        }

        catalogoNodo.innerHTML = catalogoHTML;
        botonesCatalogo();
    };

    const botonesCatalogo = () => {
        for (const producto of prod) {
            const botonId = `btn-catalogo-${producto.sku}`;
            const botonNodo = document.getElementById(botonId);
            
            
            botonNodo.addEventListener("click",() => {
                const productoCarrito = {
                    nombre: producto.nombre,
                    idCompra: contadorCarrito,
                    precio: producto.precio,
                };
    
                contadorCarrito ++;
                carrito.push(productoCarrito);
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Producto agregado al carrito!',
                    showConfirmButton: false,
                    timer: 1500
                  })
                mostrarCarrito ()
            })
        
        
        }
    };

    mostrarCatalogo ()
});




let contadorCarrito = 0;

const carrito =[];

const productoCarritoHTML = (producto) => {
    return `
    <div class="col-3">
        <div class="card">
            <img src="https://loremflickr.com/320/240/${producto.nombre}" class="card-img-top" alt="...">
            <div class="card-body">
              <h5 class="card-title">${producto.nombre}</h5>
              <button id="btn-carrito-${producto.idCompra}" class="btn btn-danger">Quitar</button>
            </div>
        </div>
    </div> 
    `
};

const mostrarCarrito = () => {
    const carritoNodo = document.getElementById("carrito")
    const precioNodo = document.getElementById("precioTotal")
    let carritoHTML ="";
    let precio = 0;
    
    for (const producto of carrito) {
        carritoHTML += productoCarritoHTML(producto);
        precio += producto.precio;
    }

    precioNodo.innerHTML = precio;
    carritoNodo.innerHTML = carritoHTML;

    botonesCarrito();
};



const botonesCarrito = () => {
    for (const producto of carrito) {
        const botonId = `btn-carrito-${producto.idCompra}`;
        const botonNodo = document.getElementById(botonId);
        
        botonNodo.addEventListener("click",() => {
            const index = carrito.findIndex((p) => p.idCompra == producto.idCompra);
            carrito.splice(index, 1)
            
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Producto eliminado del carrito!',
                showConfirmButton: false,
                timer: 1500
              }) 
            
            mostrarCarrito();
            
        })
    }
};

