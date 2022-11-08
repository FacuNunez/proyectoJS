//DOM

const contenedor = document.getElementById("contenedor");
const contenedorDos = document.getElementById("contenedorDos");
const formulario = document.getElementById("formulario");
const productosComprados = document.getElementById("productosComprados");
const carritoTable = document.getElementById("carritoTable");
const botonComprarTodo = document.getElementById("botonComprarTodo");





//traer productos del Json y renderizado, se aplica desestructuracion.
fetch("./json/bicicletas.json")
.then(response => response.json())
.then(data => data.forEach (bicicletas => {
        const {id, nombre, precio, imagen} = bicicletas
        let muestra = document.createElement("div")
        muestra.innerHTML = `
        <div class="card" style="width: 13rem;">
            <img src="${imagen}" class="card-img-top" alt="bicicletas">
                <div class="card-body">
                    <h3 class="card-title">${nombre}</h3>
                    <h4 class="card-title">$${precio}</h4>
                    <p class="card-text">${id}</p>    
                    <button id="${id}" class="btn btn-dark">Comprar</button>
                </div>
            </div>`
        
            contenedor.append(muestra);
            const boton = document.getElementById(id);
            boton.addEventListener("click", () => {
                comprar(bicicletas);
            });
           
}))

let carrito = [];


//comprar carrito
const comprar = (bicicletas) => {
    Toastify({
            text: "Agregado a carrito",
            duration: 1000,
            style: {
            background: "linear-gradient(to right, #00b09b, #96c92d)",
            }
            }).showToast();
            let bicisComprada = carrito.find((item) => item.id === bicicletas.id);
            
            bicisComprada === undefined
            ?carrito.push({...bicicletas, cantidad: 1,})
            : (bicisComprada.precio = bicisComprada.precio + bicicletas.precio,
            bicisComprada.cantidad = bicisComprada.cantidad + 1);
            localStorage.setItem("carrito", JSON.stringify(carrito));
}

// Modal
const pintarCarro = () => {
    carritoTable.innerHTML = ``
    carrito.forEach(productCar => {
    const {precio , imagen, cantidad} = productCar
    let itemRender = document.createElement("tr")
    itemRender.innerHTML =  
    `
            <td><img src="${imagen}" alt="imagen producto"></td>
            <td><p>$${precio}</p></td>
            <td><p>cantidad ${cantidad}</p></td>
    `

    carritoTable.append(itemRender) 
    })    
}

//actualiza pagina sin borrar carrito
const storage = () => {
    carrito.length = 0
    const storage = JSON.parse(localStorage.getItem("carrito"))
    if(storage !== null){
            carrito = storage
    }
}

//eventos, sweetalert
productosComprados.addEventListener("click",() => console.log(carrito))
productosComprados.addEventListener("click",() => pintarCarro())
botonVaciar.addEventListener("click", () => localStorage.clear(carrito))
botonVaciar.addEventListener("click", () => {
        carrito.length = 0 
        Swal.fire({
        title: 'Vaciar el carrito?',
        showDenyButton: true,
        confirmButtonText: 'Vaciar',
        denyButtonText: `Cancelar`,
        }).then((result) => {
        if (result.isDenied) {
        } else if (result.isConfirmed) {
                Swal.fire('Vaciado')
                carritoTable.innerHTML = ``
        }
        
        })})
botonComprarTodo.addEventListener("click", () => 
Swal.fire('Gracias por su Compra')
)

storage()




