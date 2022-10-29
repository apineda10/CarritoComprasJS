//deshabilita los botones del carrito 
function disableButtonsCompra(bvalor){
    document.getElementById("btnfin").disabled=bvalor;
    document.getElementById("btncancel").disabled=bvalor;
}

//listener de quitar boton de articulo
function configurarButtonQuitar(aCompra){
    aCompra.forEach((art)=>{
        document.getElementById(`btnquitar${art.id}`).addEventListener("click",function(){
            quitarDelCarro(art,aCompra)
            document.getElementById(`btn${art.id}`).disabled=false
        })
    }) 
}

//listener mas/menos de articulo en carrito 
function configButtonMasMenos(aCompra){  
    aCompra.forEach((art)=>{  
        document.getElementById(`btnmas${art.id}`).addEventListener("click",function(){
            sumarArticulo(art,aCompra);
        })        
        document.getElementById(`btnmenos${art.id}`).addEventListener("click",function(){
            restarArticulo(art,aCompra);
        })
    })
}

//listener boton comprar de card
function configbuttonscards(oAlmacen){
    oAlmacen.inventario.forEach((art)=>{
        document.getElementById(`btn${art.id}`).addEventListener("click",function(){
            agregarAlCarro(art,oAlmacen.compra);
            Toastify({
                text: "Articulo agregado al carrito",        
                duration: 1000,
                position: 'right',
                style: {
                    background: 'linear-gradient(to right, #00b09b, #96c92d)'
                }
                }).showToast();
        })
    })
}

//listener botones de compra en carrito 
function configButtonsCompra(aCompra){  
    document.getElementById("btnfin").addEventListener("click",function(){
        mandarWhatsapp(getMensaje(aCompra))
        cancelarCompra(aCompra)
    })
    document.getElementById("btncancel").addEventListener("click",function(){
        cancelarCompra(aCompra)
    })
}


//funciones auxiliar de finalizar compra 

function mandarWhatsapp(url){
    var win = window.open(url, '_blank');
    win.focus();
  }

function getMensaje(compra){
    let mensaje="https://wa.me/5491134698206?text=Hola%2C+quisiera+hacer+una+compra%3A%0D%0A"
    let total=0
    compra.forEach((art)=>{
        let subtot=art.cant*art.precio
        total+=subtot
        mensaje+=art.cant+"%20"+art.Nombre+"%20+$"+subtot+"%0D%0A"
    })
    mensaje+="__________________________%0D%0ATotal%3A+$"+total
    return mensaje
}
