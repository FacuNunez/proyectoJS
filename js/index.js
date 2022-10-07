//DOM

const contenedor = document.getElementById("contenedor");
const contenedorDos = document.getElementById("contenedorDos");
const formulario = document.getElementById("formulario");
const botonComprar = document.getElementById("botonComprar");
const productosComprados = document.getElementById("productosComprados");


const bicicletas = [
        { id: 1,
        nombre: "Bicicleta Junior",
        precio: 4500,
        imagen: "./img/bicicleta-junior.jpg"
        },

        { id: 2,
            nombre: "Bicicleta Urbana",
            precio: 54500,
            imagen: "./img/bicicleta-urbana.jpg"
        },

        { id: 3,
            nombre: "Bicicleta de Carrera",
            precio: 144500,
            imagen: "./img/bicicletasdecarrera_4.jpg"
        },

        { id: 4,
            nombre: "Bicicleta de Carbono",
            precio: 204400,
            imagen: "./img/carbono.jpg"
        },

        { id: 5,
            nombre: "Bicicleta Feature MTB",
            precio: 104500,
            imagen: "./img/FeatureBiciMontana.jpg"
        },

        { id: 6,
            nombre: "Monopatin Electrico",
            precio: 94800,
            imagen: "./img/monopatin.jpg"
        },
                        
        { id: 7,
            nombre: "Bicicleta Madera",
            precio: 9650,
            imagen: "./img/patacleta.jpg"
        }

]

let carrito = []
localStorage.setItem("carrito", JSON.stringify(bicicletas));

//render
bicicletas.forEach(bicicletas => {
    let muestra = document.createElement("div")
    muestra.innerHTML = `
            <div class="card p1" style="width: 13rem;">
            <img src="${bicicletas.imagen}" class="card-img-top" alt="bicicletas">
                <div class="card-body">
                    <h3 class="card-title">${bicicletas.nombre}</h3>
                    <h4 class="card-title">${bicicletas.precio}</h4>
                    <p class="card-text">${bicicletas.id}</p>
                    <button id="${bicicletas.id}" class="btn btn-dark">Comprar</button>
                </div>
            </div>`

    contenedor.append(muestra);
    const boton = document.getElementById(bicicletas.id)
    boton.addEventListener("click", () => comprar(bicicletas))
});

formulario.addEventListener("submit", (e) => {
    e.preventDefault();
    contenedorDos.innerHTML= "";
    let inputs = e.target.children;

    let producto = bicicletas.find((item) => item.nombre === inputs[0].value);
    let div = document.createElement("div");
        div.innerHTML = `
        <div class="card" style="width: 13rem;">
            <img src="${producto.imagen}" class="card-img-top" alt="bicicletas">
                <div class="card-body">
                    <h3 class="card-title">${producto.nombre}</h3>
                    <h4 class="card-title">${producto.precio}</h4>
                    <p class="card-text">${producto.id}</p>
                    <button id="${producto.id}" class="btn btn-dark">Comprar</button>
                </div>
            </div>`

    contenedorDos.append(div);
});

const comprar = (bicicletas) =>{
    let bicisComprada = carrito.find(item => item.id === bicicletas.id)
    if (bicisComprada === undefined){
        carrito.push({
            id: bicicletas.id,
            nombre: bicicletas.nombre,
            precio: bicicletas.precio,
            imagen: bicicletas.imagen,
            cantidad: 1
        })
    }else{
        bicisComprada = bicisComprada.precio + bicicletas.precio;
        bicisComprada = bicisComprada.cantidad + 1;
    }
}

productosComprados.addEventListener("click",() => console.log(carrito))
productosComprados.addEventListener("click",() => localStorage.setItem("carrito", JSON.stringify(carrito)))
