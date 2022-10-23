class Articulo {
    constructor(nid, cNombre,nPrecio,cDescripcion,img,cant) {
      this.id = nid;
      this.Nombre = cNombre;
      this.precio=nPrecio
      this.Descripcion=cDescripcion
      this.img=img
      this.cant=cant
    }
  }


class Almacen{
    constructor(){
        this.totalDeCompra=0;
        this.compra=[]
        this.inventario=[
            new Articulo(1,"Crema",100,"Crema descremada de 500cc","crema.png",0),
            new Articulo(2,"Leche Descremada",222,"Leche descremada de 1lt","leche.png",0),
            new Articulo(3,"Queso Cremoso",900,"Queso Cremoso por kilo","pan.png",0),
            new Articulo(4,"Manteca",300,"Manteca entera de 250gr","manteca.png",0),
            new Articulo(5,"Yogurt",100,"Yogurt descremado de 250cc","yogurt.png",0),
            new Articulo(6,"Ricota",150,"Ricota de 500gr","ricota.png"),
            new Articulo(7,"Queso Reggianito",500,"Queso Cremoso por kilo","quesoregia.png",0),
            new Articulo(8,"Pan",300,"Pan por kilo","pan.png",0),
            new Articulo(9,"Mermelada",250,"Mermelada de durazno","mermelada.png",0),
            new Articulo(10,"CocaCola",300,"Coca-cola de 2.5lt","coca.png",0),
        ];
    }

} 