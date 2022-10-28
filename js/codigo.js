function quitarDelCarro(art,acompra){
    acompra.splice(acompra.findIndex((artcomprado)=>artcomprado.id==art.id),1)
    actualizarTotal(acompra)
    let artQuitar=document.getElementById(`fila${art.id}`);
    artQuitar.remove();
    let cantCompra=0
    acompra.forEach((art)=>{
        cantCompra+=art.cant
    })
    actualizaIconoCarro(cantCompra)
}


function agregarAlCarro(art,acompra){
    if (articuloAgregado(art,acompra)){
        sumarArticulo(art,acompra)    
    }else{
        art.cant=1
        acompra.push(art);
        renderizarCarroCompras(art,acompra);
        actualizarTotal(acompra)
        disableButtonsCompra(false)
    }
    
}

function actualizarTotal(acompra){
    let ntotal=0
    if (acompra.length!=0){
        acompra.forEach((art)=>{
            ntotal+=(art.precio * art.cant)
    })}
    else {
        disableButtonsCompra(true)
    }
    let total=document.getElementById("total");  
    if (ntotal!=0){
        total.innerHTML=`<h5>Total de la compra: $${ntotal} </h5>`     
    }
    else{
        total.innerHTML=""
    }
    
}

function cancelarCompra(aCompra){
    let lacompra=aCompra
    if (aCompra.length!=0){
        for (i = 0; i < lacompra.length; i++){
            let oArt=aCompra[i]
            document.getElementById(`btn${oArt.id}`).disabled=false;
            quitarDelCarro(oArt,aCompra) 
            cancelarCompra(aCompra)
        }
    }
    actualizaIconoCarro(0)
}

function sumarArticulo(oart,acompra){
    let cantArt=0
    acompra.forEach((art)=>{
        if (art.id==oart.id){
            art.cant+=1
            document.getElementById(`cant${art.id}`).innerHTML=`${art.cant}`
            document.getElementById(`subTot${art.id}`).innerHTML=`$${art.cant*art.precio}`
        }
        cantArt+=art.cant
    })
    actualizaIconoCarro(cantArt)
    actualizarTotal(acompra)
}

function restarArticulo(oart,acompra){
    let cantArt=0
    acompra.forEach((art)=>{
        if (art.id==oart.id){
            if (art.cant>1){
                art.cant-=1
                document.getElementById(`cant${art.id}`).innerHTML=`${art.cant}` 
                document.getElementById(`subTot${art.id}`).innerHTML=`$${art.cant*art.precio}`           
            }
            else{
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
        cantArt+=art.cant
    })
    actualizaIconoCarro(cantArt)
    actualizarTotal(acompra)
}


function renderizarArticulos(arrayDeArticulos){
    let cards=document.getElementById("cartas");
    for(const art of arrayDeArticulos){
        let divcard=document.createElement("div");
        divcard.className="card cardArt m-2";
        /*divcard.style="width: 200px; height: 230px;"*/
        divcard.innerHTML=`
            <img src=./img/${art.img} class="card-img-top card-img" alt="...">
            <div class="card-body  d-flex flex-column justify-content-between align-item-center" style="height:30%>
                <h3 class="card-title">${art.Nombre}</h3>
                <p class="card-subtitle">Precio: $ ${art.precio}</p>
                <p class="card-subtitle">Cantidad:1</p>         
                <button id="btn${art.id}" class="btn btn-primary btn-comprar" style="width: 150px";>Comprar</button>
            </div>
        `;
        cards.append(divcard);
    }
}
function actualizaIconoCarro(nCant){
    let carroCount=document.getElementById("btnCarroCount")
    if(nCant!=0){
        carroCount.style.display="block";
        carroCount.innerHTML=`${nCant}`;
    }
    else{
        carroCount.style.display="none";
        carroCount.innerHTML=``;    
    }
}

function articuloAgregado(art,acompra){
    return acompra.some((a)=>a.id==art.id)
}

function renderizarCarroCompras(art,acompra){
    let carro=document.getElementById("carrocompra__articulos");
    
    carro.innerHTML+=`
        <tr id="fila${art.id}">
            <th>${art.Nombre}</th>
            <th>               
                <div id="contendorCant">  
                    <button id="btnmenos${art.id}" class="btn btn-primary bi bi-dash-circle btn-sm"></button>
                    <i id="cant${art.id}">1</i>
                    <button id="btnmas${art.id}" class="btn btn-primary bi bi-plus-circle btn-sm"></button>
                </div>   
            </th>
            <th>$${art.precio}</th>
            <th id="subTot${art.id}">$${art.precio}</th>       
            <th><button id=btnquitar${art.id} class="btn btn-secondary  btn-quitar btn-sm">Quitar</button></th>
        </tr>
    `;
    let cantCompra=0
    acompra.forEach((art)=>{
        cantCompra+=art.cant
    })
    actualizaIconoCarro(cantCompra)
    configurarButtonQuitar(acompra)
    configButtonMasMenos(acompra)   
}

function init(){
    let almacen=new Almacen();   
    renderizarArticulos(almacen.inventario)
    configbuttonscards(almacen)
    /*configurarBotonCarrito()*/
    configButtonsCompra(almacen.compra)
    disableButtonsCompra(true)
    /*document.getElementById("carroCompra").style.display="none"*/
}


init()


