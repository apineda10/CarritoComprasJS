const articulos=[
  {id:1,Nombre:"JOHNNIE WALKER BLACK LABEL",precio:6245,Descripcion:"JOHNNIE WALKER BLACK LABEL",img:"Johnnie.jpg",cant:0},
  {id:2,Nombre:"JOHNNIE WALKER DOUBLE BLACK LABEL",precio:9285,Descripcion:"JOHNNIE WALKER DOUBLE BLACK LABEL",img:"Johnniedouble.jpg",cant:0},
  {id:4,Nombre:"JOHNNIE WALKER GOLD LABEL RESERVE",precio:15392,Descripcion:"JOHNNIE WALKER GOLD LABEL RESERVE",img:"JOHNNIEgold.jpg",cant:0},
  {id:5,Nombre:"JOHNNIE WALKER RED LABEL",precio:4826,Descripcion:"JOHNNIE WALKER RED LABEL",img:"Johnniered.jpg",cant:0},
  {id:6,Nombre:"THE SINGLETON 18YO DUFFTOWN",precio:24855,Descripcion:"THE SINGLETON 18YO DUFFTOWN",img:"singleton.jpg",cant:0},
  {id:7,Nombre:"JOHNNIE WALKER SWING",precio:16040,Descripcion:"JOHNNIE WALKER SWING",img:"JOHNNIESWING.jpg",cant:0},
  {id:8,Nombre:"JOHNNIE WALKER BLUE LABEL",precio:61505,Descripcion:"JOHNNIE WALKER BLUE LABEL",img:"JOHNNIEBLUE.jpg",cant:0},
  {id:9,Nombre:"TALISKER 10YO",precio:18972,Descripcion:"TALISKER 10YO",img:"TALISKER.jpg",cant:0},
  {id:10,Nombre:"SHERIDAN'S",precio:5772,Descripcion:"SHERIDAN'S",img:"sheridans.jpg",cant:0},
  {id:11,Nombre:"BAILEYS ORIGINAL",precio:4275,Descripcion:"BAILEYS ORIGINAL",img:"BAILEYS.jpg",cant:0},
  {id:12,Nombre:"NAVARRO CORREAS",precio:898,Descripcion:"NAVARRO CORREAS",img:"NAVARROCORREAS.jpg",cant:0},
  {id:13,Nombre:"MASCOTA VINEYARDS",precio:2600,Descripcion:"MASCOTA VINEYARDS",img:"MASCOTAVINEYARDS.jpg",cant:0},
  {id:14,Nombre:"EL ESTECO",precio:3818,Descripcion:"EL ESTECO",img:"ELESTECO.jpg",cant:0},
  {id:15,Nombre:"TRAPICHE GRAN MEDALLA",precio:5700,Descripcion:"Crema descremada de 500cc",img:"trapiche.jpg",cant:0},

]

sessionStorage.setItem("listaDeArticulos",JSON.stringify(articulos))

class Almacen{
    constructor(){
        this.totalDeCompra=0;
        this.compra=[];
        this.totalItem=0
        this.inventario=JSON.parse(sessionStorage.getItem("listaDeArticulos"))
    }

} 
