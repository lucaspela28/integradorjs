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
 

const renderFilteredBooks = (category) => {
  const productsList = arrayDeLibros.filter(
    (book) => book.categoria === category
  );
  showResults.innerHTML = productsList.map(renderLibro).join("");
};

const renderBooks = (category) => {
  if (!category) {
    renderColecciones(arrayDeLibros);
    return;
  }
  renderFilteredBooks(category);
};


const changeBtnActiveState = (selectedCategory) => {
  const categorias = [...categoriesBtn];
  categorias.forEach((categoryBtn) => {
    if (categoryBtn.dataset.categoria !== selectedCategory) {
      categoryBtn.classList.remove("active");
      return;
    }
    categoryBtn.classList.add("active");
  });
};


const applyFilter = (e) => {
  if (!e.target.classList.contains("category")) return;
  changeBtnActiveState(e);
  if (!e.target.dataset.categoria) {
    showResults.innerHTML = "";
    renderBooks();
  } else {
    renderBooks( e.target.dataset.categoria);
  }
};



/* ------------------------------------------------------------------------------- */

// carrito

const renderCartProduct =(cartProduct) => {
 const {id, name, precio, autor, imagen, quantity} = cartProduct;
 return `
    <div class="product">
      <div class="renderImg">
        <img src=${imagen}>
      </div>
      <div class="renderInfo">
        <h5>${name}</h5>
        <p>${autor}</p>
        <h4 class="precioLibro">$ ${precio}</h4>
      </div>
      <div class="up-and-down">
        <span class="quantity-handler down" data-id=${id}>-</span>
        <span class="item-quantity">${quantity}</span>
        <span class="quantity-handler up" data-id=${id}>+</span>
      </div>
    </div>`;
};

const renderCart = ()=> {
  if (!cart.length){
    cartContainer.innerHTML= `<p class='empty-msg'> El carrito aún está vacío. </p>`;
    return;
  };
  cartContainer.innerHTML = cart.map (renderCartProduct).join("");
};

const getCartTotal = ()=> {
  return cart.reduce((acc, cur) => acc + Number(cur.precio) * Number(acc.quantity), 0);
};


const showTotal = () => {
  total.innerHTML = `$ ${getCartTotal()}`;
};

/* const disableBtn = (btn) => {
  if (!cart.length) {
   btn.classList.add('disabled');
   return;
  }
  btn.classList.remove('disabled');
}; */

const addUnitToProduct = (product) => {
  cart=cart.map((cartProduct)=>{
    return cartProduct.id===product.id
    ?{...cartProduct, quantity:cartProduct.quantity+1}
    :cartProduct;
  });
};

const createCartProduct = (product)=> {
  cart=[...cart,{...product, quantity:1}];
};


const isExistingCartProduct = (p) => {
  return cart.find ((i) => i.id === p.id);
};

const createProductData = (id, name, autor, precio, imagen, quantity) => {
  return {id, name, autor, precio, imagen, quantity};
};

const checkCartState = () => {
  saveLocalStorage(cart);
  renderCart(cart);
  showTotal(cart);
};


const addProduct = (e) => {
  if (!e.target.classList.contains("btnAddProduct")) return;
  const {id, name, autor, precio, imagen} = e.target.dataset;
  const product = createProductData(id, name, autor, precio, imagen);
  if (isExistingCartProduct(product)) {
    addUnitToProduct(product);
  }else {
    createCartProduct();
  };  
  checkCartState(cart);
};


const substractProductUnit = (existingProduct) => {
  cart = cart.map((cartProduct)=> {
    return cartProduct.id === existingProduct.id
    ? {...cartProduct, quantity:cartProduct.quantity-1}
    : cartProduct;
  });
};


const removeProductFromCart = (existingProduct) => {
  cart = cart.filter ((product) => product.id !== existingProduct.id);
  checkCartState();
};

const handleMinusBtnEvent = (id) => {
   const existingCartProduct = cart.find ((i) => i.id === id);
  if (existingCartProduct.quantity === 1) {
    if (window.confirm ("Desea eliminar, el producto del carrito?")) {
      removeProductFromCart (existingCartProduct);
    }
    return;
  }
  substractProductUnit(existingCartProduct);
};


const handlePlusBtnEvent = (id) => {
  const existingCartProduct = cart.find((item) => item.id === id);
  addUnitToProduct(existingCartProduct);
};


const handleQuantity = (e) => {
  if(e.target.classList.contains("down")){
    handleMinusBtnEvent(e.target.dataset.id);
  }else if (e.target.classList.contains("up")){
    handlePlusBtnEvent(e.target.dataset.id);
  }
  checkCartState();
};

const resetCartItems = ()=>{
  cart=[];
  checkCartState();
};


const completeCartAction = (confirmMsg, successMsg) => {
  if(!cart.length)return;
  if(window.confirm(confirmMsg)){
    resetCartItems();
    alert(successMsg);
  }
};


const completeBuy = ()=>{
  completeCartAction("","");
};

const deleteCart=()=>{
  completeCartAction("","");
};



const init = ()=> {
  renderBooks();
  categorias.addEventListener('click', applyFilter);
  openDesplegable.addEventListener('click', openAndClose);
  document.addEventListener("DOMContentLoaded", renderCart);
  document.addEventListener("DOMContentLoaded", showTotal);
  showResults.addEventListener("click", addProduct);
  cartContainer.addEventListener("click", handleQuantity);
  buyBtn.addEventListener("click", completeBuy);
  deleteBtn.addEventListener("click", deleteCart);
  /* disableBtn(buyBtn);
  disableBtn(deleteBtn); */
};

init();


/* ----------------------------------------------------------------------- */

/* 
const showSuccessModal = (msg) => {
  successModal.classList.add("active-modal");
  successModal.textContent = msg;
  setTimeout(() => {
    successModal.classList.remove("active-modal");
  }, 1500);
};
 */
