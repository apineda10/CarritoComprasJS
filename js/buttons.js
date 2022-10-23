function disableButtonsCompra(bvalor){
    document.getElementById("btnfin").disabled=bvalor;
    document.getElementById("btncancel").disabled=bvalor;
}

function configurarButtonQuitar(aCompra){
    aCompra.forEach((art)=>{
        document.getElementById(`btnquitar${art.id}`).addEventListener("click",function(){
            quitarDelCarro(art,aCompra)
            document.getElementById(`btn${art.id}`).disabled=false
        })
    }) 
}
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
function configbuttonscards(oAlmacen){
    oAlmacen.inventario.forEach((art)=>{
        document.getElementById(`btn${art.id}`).addEventListener("click",function(){
            agregarAlCarro(art,oAlmacen.compra);
            document.getElementById(`btn${art.id}`).disabled=true;
        })
    })
}

function configButtonsCompra(aCompra){  
    document.getElementById("btnfin").addEventListener("click",function(){
        mandarWhatsapp(getMensaje(aCompra))
        cancelarCompra(aCompra)
    })
    document.getElementById("btncancel").addEventListener("click",function(){
        cancelarCompra(aCompra)
    })
}

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
    mensaje+="_______________________%0D%0ATotal%3A+$"+total
    return mensaje
}