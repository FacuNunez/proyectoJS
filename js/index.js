//DOM

const contenedor = document.getElementById("contenedor");
const contenedorDos = document.getElementById("contenedorDos");
const formulario = document.getElementById("formulario");
const vaciar = document.getElementById("vaciar");
const productosComprados = document.getElementById("productosComprados");





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
                Swal.fire({
                    title: "Agregaste",
                    text: `${nombre}`,
                    imageUrl: `${imagen}`,
                    imageWidth: 400,
                    imageHeight: 200,
                });
            });
}))

let carrito = [];


//evento
formulario.addEventListener("submit", (e) => {
    e.preventDefault();
    contenedorDos.innerHTML = "";
    let inputs = e.target.children;

    let producto = bicicletas.find((item) => item.nombre === inputs[0].value);
    const {
        id,
        nombre,
        precio,
        imagen
    } = producto; //desestructuracion de objetos
    let div = document.createElement("div");
    div.innerHTML = `
        <div class="card" style="width: 13rem;">
            <img src="${imagen}" class="card-img-top" alt="bicicletas">
                <div class="card-body">
                    <h3 class="card-title">${nombre}</h3>
                    <h4 class="card-title">${precio}</h4>
                    <p class="card-text">${id}</p>
                    <button id="${id}" class="btn btn-dark">Comprar</button>
                </div>
            </div>`;

    contenedorDos.append(div);
});

//operador spread
const comprar = (bicicletas) => {
    let bicisComprada = carrito.find((item) => item.id === bicicletas.id);
    if (bicisComprada === undefined) {
        carrito.push({
            ...bicicletas,
            cantidad: 1,
        });
    } else {
        bicisComprada.precio = bicisComprada.precio + bicicletas.precio;
        bicisComprada.cantidad = bicisComprada.cantidad + 1;
    }
};

productosComprados.addEventListener("click", () => console.log(carrito));
productosComprados.addEventListener("click", () => localStorage.setItem("carrito", JSON.stringify(carrito)));
