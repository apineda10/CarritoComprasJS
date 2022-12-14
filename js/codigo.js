let inventario = []
let listaCompra = JSON.parse(sessionStorage.getItem("listaCompra")) || [];
disableButtonsCompra(true)
if (listaCompra.length != 0) {
    console.log(listaCompra)
    renderizarCarroCompras(listaCompra);
   /* disableButtonsCompra(false)
    configurarButtonQuitar(listaCompra)
    configButtonMasMenos(listaCompra)*/
} else {
    //Sweet alert
    Swal.fire({
        title: 'Sos mayor de 18 años?',
        text: "Presione Si o No",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si',
        cancelButtonText: 'No',
        allowEscapeKey: false,
        allowOutsideClick: false,
    }).then((result) => {
        if (!result.isConfirmed) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Vuelva cuando sea mayor',
                allowEscapeKey: false,
                allowOutsideClick: false,
                showConfirmButton: false
            })
        }
    })
}

configButtonsCompra(listaCompra)
getArticulos()



//elimina un articuo del array de articulo y actualiza icono 
function quitarDelCarro(art, acompra) {
    acompra.splice(acompra.findIndex((artcomprado) => artcomprado.id == art.id), 1)
    let artQuitar = document.getElementById(`fila${art.id}`);
    artQuitar.remove();
    let cantCompra = 0
    let ntotal = 0
    for (const art of acompra) {
        ntotal += (art.cant * art.precio)
        cantCompra += art.cant
    }
    renderizarCarroCompras(acompra);

}

//agrega funcion de listener comprar de card 
function agregarAlCarro(art, acompra) {
    if (articuloAgregado(art, acompra)) {
        sumarArticulo(art, acompra)
    } else {
        console.log(acompra)
        acompra.push(art);
    }
    renderizarCarroCompras(acompra);
    /*configurarButtonQuitar(acompra)
    configButtonMasMenos(acompra)*/
    
}

//actualiza el total en carrito 
function actualizarTotal(ntotal) {
    let total = document.getElementById("total");
    if (ntotal != 0) {
        total.innerHTML = `<h5>Total de la compra: $${ntotal} </h5>`
    }
    else {
        disableButtonsCompra(true)
        total.innerHTML = ""
    }

}

//vacia el array de compra y los elimina de carrito 
function cancelarCompra(aCompra) {
    let lacompra = aCompra
    if (aCompra.length != 0) {
        for (i = 0; i < lacompra.length; i++) {
            let oArt = aCompra[i]
            document.getElementById(`btn${oArt.id}`).disabled = false;
            quitarDelCarro(oArt, aCompra)
            cancelarCompra(aCompra)
        }
    }
    renderizarCarroCompras(aCompra)
}

//suma un articulo al array de compra y al carrito 
function sumarArticulo(oart, acompra) {
    for (const art of acompra) {
        if (art.id == oart.id) {
            art.cant += 1
            document.getElementById(`cant${art.id}`).innerHTML = `${art.cant}`
            document.getElementById(`subTot${art.id}`).innerHTML = `$${art.cant * art.precio}`
        }
    }
    renderizarCarroCompras(acompra)
}

//resta un articulo al array de compra y al carrito
function restarArticulo(oart, acompra) {
    for (const art of acompra) {
        if (art.id == oart.id) {
            if (art.cant > 1) {
                art.cant -= 1
                document.getElementById(`cant${art.id}`).innerHTML = `${art.cant}`
                document.getElementById(`subTot${art.id}`).innerHTML = `$${art.cant * art.precio}`
            }
            else {
                Toastify({
                    text: "Presione quitar si no desea comprar este artículo",
                    duration: 2000,
                    position: 'right',
                    style: {
                        background: 'linear-gradient(to right, #ff0000, #fd07bd)'
                    }
                }).showToast();
            }

        }
    }
    renderizarCarroCompras(acompra)
}


//actualiza el numero de articulos en carro en el icono 
function actualizaIconoCarro(nCant) {
    let carroCount = document.getElementById("btnCarroCount")
    console.log(nCant)
    if (nCant != 0) {
        carroCount.style.display = "block";
        carroCount.innerHTML = `${nCant}`;
    }
    else {
        carroCount.style.display = "none";
        carroCount.innerHTML = ``;
    }
}

//valida si el articulo fue previamente agregado al carro 
function articuloAgregado(art, acompra) {
    return acompra.some((a) => a.id == art.id)
}

//renderiza el carro de compra y setea botones
function renderizarCarroCompras(acompra) {
    let carro = document.getElementById("carrocompra__articulos");
    let cantCompra = 0
    let nTotal = 0
    carro.innerHTML ="";
    for (const art of acompra) {
        cantCompra += art.cant
        nTotal += (art.precio * art.cant)
        carro.innerHTML += `
            <tr id="fila${art.id}">
                <th>${art.nombre}</th>
                <th>               
                    <div id="contendorCant">  
                        <button id="btnmenos${art.id}" class="btn btn-primary bi bi-dash-circle btn-sm"></button>
                        <i id="cant${art.id}">${art.cant}</i>
                        <button id="btnmas${art.id}" class="btn btn-primary bi bi-plus-circle btn-sm"></button>
                    </div>   
                </th>
                <th>$${art.precio}</th>
                <th id="subTot${art.id}">$${(art.precio * art.cant)}</th>       
                <th><button id=btnquitar${art.id} class="btn btn-secondary  btn-quitar btn-sm">Quitar</button></th>
            </tr>
        `;
    }
    actualizaIconoCarro(cantCompra)
    actualizarTotal(nTotal)
    configurarButtonQuitar(acompra)
    configButtonMasMenos(acompra)
    disableButtonsCompra(false)
    sessionStorage.setItem("listaCompra", JSON.stringify(acompra))
}

//renderiza articulo
function renderizarArticulos(arrayDeArticulos) {

    let cards = document.getElementById("cartas");
    for (const art of arrayDeArticulos) {
        let divcard = document.createElement("div");

        divcard.className = "card cardArt m-2";
        divcard.setAttribute("data-aos", "fade-up");
        divcard.innerHTML = `
            <img src=./img/${art.img} class="card-img-top card-img" alt="...">
            <div class="card-body  d-flex flex-column justify-content-center align-item-center text-center" style="height:20%>
                <h3 class="card-title" style="font-weight: 600;">${art.nombre}</h3>
                <p class="card-subtitle">Precio: $ ${art.precio}</p>
                <p class="card-subtitle">Cantidad:1</p>         
            </div>
            <button id="btn${art.id}" class="btn btn-primary btn-comprar " style="width: 150px ;margin-bottom:20px";>Comprar</button>
        `;
        cards.append(divcard);
    }
}

async function getArticulos() {
    const URLGETART = "./js/articulos.json";
    const resp = await fetch(URLGETART);
    const datos = await resp.json();
    inventario = datos.articulos;
    renderizarArticulos(inventario)
    configbuttonscards(inventario, listaCompra)
}

