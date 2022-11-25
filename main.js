const categorias = document.querySelector('.desplegable');
const openDesplegable = document.querySelector('.btnCat');
const openCart = document.querySelector('.cartBtnOpen');
const closeCart = document.querySelector('.btnCloseCart')
const carrito = document.querySelector('.cart');
const showResults = document.querySelector('.resultsContainer');
const overlay = document.querySelector('.overlay')
const categoriesBtn = document.querySelectorAll('.category');
const cartContainer = document.querySelector('.cartContainerProducts');
const btnComprar = document.querySelector('.comprar');
const btnVaciar = document.querySelector('vaciar');
const buyBtn = document.querySelector(".comprar");
const deleteBtn = document.querySelector(".vaciar");
const total = document.querySelector(".cartTotalPrice");
const btnAddProduct = document.querySelectorAll(".btnAddProduct");
const successModal =document.querySelector(".modalAdd1");
const barsMenu= document.querySelector(".lista-menu");
const barsBtn = document.querySelector(".menu-label");

let cart = JSON.parse(localStorage.getItem('cart')) || [];

const saveLocalStorage = (cartList) => {
  localStorage.setItem('cart',JSON.stringify(cartList))
};


const openAndClose =() => {
    categorias.classList.toggle ('openDesplegable');
};


const openandCloseCart = () => {
    carrito.classList.toggle ('openCart');
    overlay.classList.toggle("showOverlay");
};

openCart.addEventListener('click', openandCloseCart);
closeCart.addEventListener('click', openandCloseCart);

const toggleMenu = () => {
  barsMenu.classList.toggle("open-lista-menu");
  if (carrito.classList.contains("openCart")) {
    carrito.classList.remove("openCart");
    return;
  }
  overlay.classList.toggle("showOverlay");
};


const renderLibro = (libro) => {
    const {id, name, precio, autor, imagen} = libro;
    return `
      <div class="book">
          <img src=${imagen} class="buscadosContainerImg">
        <div>
          <h5 class="tituloLibro">${name}</h5>
          <p class="descripcionLibro">${autor}</p>
          <h4 class="precioLibro">$ ${precio}</h4>
        </div>
        <button class="btnAddProduct" 
        data-id='${id}'
        data-name='${name}'
        data-precio='${precio}'
        data-autor='${autor}'
        data-imagen='${imagen}'>Agregar</button>
        </div>
   `
};

const renderColecciones = (arr) => {
    arr.forEach(e => {
      if (e.coleccion === true){
        showResults.innerHTML += renderLibro(e);
      }
    })
};
 

const renderFiltradoLIbros = (category) => {
  const productsList = arrayDeLibros.filter(
    (book) => book.categoria === category
  );
  showResults.innerHTML = productsList.map(renderLibro).join("");
};

const renderLibros = (category) => {
  if (!category) {
    renderColecciones(arrayDeLibros);
    return;
  }
  renderFiltradoLIbros(category);
};


const cambiarEstadoBoton = (categoriaElegida) => {
  const categorias = [...categoriesBtn];
  categorias.forEach((categoriaBtn) => {
    if (categoriaBtn.dataset.categoria !== categoriaElegida) {
      categoriaBtn.classList.remove("active");
      return;
    }
    categoriaBtn.classList.add("active");
  });
};


const aplicarFiltro = (e) => {
  if (!e.target.classList.contains("category")) return;
  cambiarEstadoBoton(e);
  if (!e.target.dataset.categoria) {
    showResults.innerHTML = "";
    renderLibros();
  } else {
    renderLibros( e.target.dataset.categoria);
  }
};



/* ------------------------------------------------------------------------------- */

// carrito

const renderProductoCarrito =(cartProduct) => {
 const {id, name, precio, autor, imagen, cantidad} = cartProduct;
 return `
    <div class="product">
      <div class="imgProduct">
        <img src=${imagen}>
      </div>
      <div class="renderInfo">
        <h5>${name}</h5>
        <p>${autor}</p>
        <h4 class="precioLibro">$ ${precio}</h4>
      </div>
      <div class="up-and-down">
        <div class="quantity-handler down" data-id=${id}>-</div>
        <span class="item-quantity">${cantidad}</span>
        <div class="quantity-handler up" data-id=${id}>+</div>
      </div>
    </div>`;
};

const renderCarrito = ()=> {
  if (!cart.length){
    cartContainer.innerHTML= `<p class='empty-msg'> El carrito aún está vacío. </p>`;
    return;
  };
  cartContainer.innerHTML = cart.map (renderProductoCarrito).join("");
};

const obtenerTotal = ()=> {
  return cart.reduce((acc, cur) => acc + Number(cur.precio) * Number(cur.cantidad), 0);
  
};


const mostrarTotal = () => {
 total.innerHTML = `$ ${obtenerTotal()}`;
};


const agregarUnidad = (libro) => {
  cart=cart.map((libroCarrito)=>{
    return libroCarrito.id===libro.id
    ?{...libroCarrito, cantidad:libroCarrito.cantidad+1}
    :libroCarrito;
  });
};

const createCartProduct = (libro)=> {
  cart=[...cart,{...libro, cantidad:1}];
};


const existeLibroCarrito = (p) => {
  return cart.find ((i) => i.id === p.id);
};

const crearLibroData = (id, name, autor, precio, imagen, cantidad) => {
  return {id, name, autor, precio, imagen, cantidad};
};

const mostrarModal = (msg) => {
  successModal.classList.add("active-modal");
  successModal.textContent = msg;
  setTimeout(() => {
    successModal.classList.remove("active-modal");
  }, 1500);
};


const estadoCarrito = () => {
  saveLocalStorage(cart);
  renderCarrito(cart);
  mostrarTotal(cart);
};


const agregarLibro = (e) => {
  if (!e.target.classList.contains("btnAddProduct")) return;
  const {id, name, autor, precio, imagen} = e.target.dataset;
  const producto = crearLibroData(id, name, autor, precio, imagen);
  if (existeLibroCarrito(producto)) {
    agregarUnidad(producto);
    mostrarModal(`Otro ejemplar de "${name}", ha sido añadido al carrito`);
  }else {
    createCartProduct(producto);
    mostrarModal(`"${name}", se ha añadido al carrito`);
  };  
  estadoCarrito();
};


const sustraerUnidadLibro = (existeLibro) => {
  cart = cart.map((libroCarrito)=> {
    return libroCarrito.id === existeLibro.id
    ? {...libroCarrito, cantidad:libroCarrito.cantidad-1}
    : libroCarrito;
  });
};


const sacarLibroCarrito = (existeLibro) => {
  cart = cart.filter ((product) => product.id !== existeLibro.id);
  estadoCarrito();
};

const manipularBtnMenos = (id) => {
   const existeProductoCarrito = cart.find ((i) => i.id === id);
  if (existeProductoCarrito.cantidad === 1) {
    if (window.confirm ("Desea eliminar el producto del carrito?")) {
      sacarLibroCarrito (existeProductoCarrito);
    }
    return;
  }
  sustraerUnidadLibro(existeProductoCarrito);
};


const manipularBtnMas = (id) => {
  const existeProductoCarrito = cart.find((item) => item.id === id);
  agregarUnidad(existeProductoCarrito);
};


const manipularCantidad = (e) => {
  if(e.target.classList.contains("down")){
    manipularBtnMenos(e.target.dataset.id);
  }else if (e.target.classList.contains("up")){
    manipularBtnMas(e.target.dataset.id);
  }
  estadoCarrito();
};

const resetCarritoItems = ()=>{
  cart=[];
  estadoCarrito();
};


const completarAccionCarrito = (confirmMsg, successMsg) => {
  if(!cart.length)return;
  if(window.confirm(confirmMsg)){
    resetCarritoItems();
    alert(successMsg);
  }
};


const completarCompra = ()=>{
  completarAccionCarrito("Esta seguro de completar la compra?","La compra fue realizada con exito");
};

const borrarCarrito=()=>{
  completarAccionCarrito("Desea vaciar el carrito?","El carrito esta vacio.");
};



const init = ()=> {
  renderLibros();
  categorias.addEventListener('click', aplicarFiltro);
  barsBtn.addEventListener('click', toggleMenu);
  openDesplegable.addEventListener('click', openAndClose);
  document.addEventListener("DOMContentLoaded", renderCarrito);
  document.addEventListener("DOMContentLoaded", mostrarTotal);
  showResults.addEventListener("click", agregarLibro);
  cartContainer.addEventListener("click", mostrarTotal);
  cartContainer.addEventListener("click", manipularCantidad);
  buyBtn.addEventListener("click", completarCompra);
  deleteBtn.addEventListener("click", borrarCarrito);
};

init();


/* ----------------------------------------------------------------------- */




