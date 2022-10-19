//DOM

const contenedor = document.getElementById("contenedor");
const contenedorDos = document.getElementById("contenedorDos");
const formulario = document.getElementById("formulario");
const vaciar = document.getElementById("vaciar");
const productosComprados = document.getElementById("productosComprados");

/* const bicicletas = [{
        id: 1,
        nombre: "Bicicleta Junior",
        precio: 4500,
        imagen: "./img/bicicleta-junior.jpg",
    },

    {
        id: 2,
        nombre: "Bicicleta Urbana",
        precio: 54500,
        imagen: "./img/bicicleta-urbana.jpg",
    },

    {
        id: 3,
        nombre: "Bicicleta Carrera",
        precio: 144500,
        imagen: "./img/bicicletasdecarrera_4.jpg",
    },

    {
        id: 4,
        nombre: "MTB Carbono",
        precio: 204400,
        imagen: "./img/carbono.jpg"
    },

    {
        id: 5,
        nombre: "MTB Feature",
        precio: 104500,
        imagen: "./img/FeatureBiciMontana.jpg",
    },

    {
        id: 6,
        nombre: "Mono Electrico",
        precio: 94800,
        imagen: "./img/monopatin.jpg",
    },

    {
        id: 7,
        nombre: "Bicicleta Madera",
        precio: 9650,
        imagen: "./img/patacleta.jpg",
    },
]; */

let carrito = [];
localStorage.setItem("carrito", JSON.stringify(bicicletas));

//render
fetch(".//bicicletas.json")
    .then((response) => response.json())
    .then((data) => {
        data.forEach((publicacion) => {
            let muestra = document.createElement("div");
            muestra.innerHTML = `
            <div class="card" style="width: 13rem;">
            <img src="${publicacion.imagen}" class="card-img-top" alt="bicicletas">
                <div class="card-body">
                    <h3 class="card-title">${publicacion.nombre}</h3>
                    <h4 class="card-title">$${publicacion.precio}</h4>
                    <p class="card-text">${publicacion.id}</p>    
                    <button id="${publicacion.id}" class="btn btn-dark">Comprar</button>
                </div>
            </div>`;
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
        });
    })
    .catch((error) => console.log(error));
/* bicicletas.forEach((bicicletas) => {
    const {
        id,
        nombre,
        precio,
        imagen
    } = bicicletas; //desestructuracion de objetos
    let muestra = document.createElement("div");
    muestra.innerHTML = `
            <div class="card" style="width: 13rem;">
            <img src="${imagen}" class="card-img-top" alt="bicicletas">
                <div class="card-body">
                    <h3 class="card-title">${nombre}</h3>
                    <h4 class="card-title">$${precio}</h4>
                    <p class="card-text">${id}</p>    
                    <button id="${id}" class="btn btn-dark">Comprar</button>
                </div>
            </div>`;

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
}); */

//evento
formulario.addEventListener("submit", (e) => {
    e.preventDefault();
    contenedorDos.innerHTML = "";
    let inputs = e.target.children;

    let producto = bicicletas.find((item) => item.nombre === inputs[0].value);
    const { id, nombre, precio, imagen } = producto; //desestructuracion de objetos
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
productosComprados.addEventListener("click", () =>
    localStorage.setItem("carrito", JSON.stringify(carrito))
);
