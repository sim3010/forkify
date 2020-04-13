import { elements } from './base';
import { limitRecipeTitle } from './searchView';

export const toggleCartMenu = numItems => {
    elements.cartMenu.style.visibility = numItems > 0 ? 'visible' : 'hidden';
};

export const renderCart = cartItem => {
    /*const markup = `
        <figure class="likes__fig">
                    <img src="img/test-${Math.floor(Math.random() * (31 - 1)) + 1}.jpeg" alt="${cartItem.category}">
                    </figure>*/
    const markup = `
                        <li class="cart__items">
                    <div class="likes__link"  data-dish="${cartItem.dishName}">
                        <div class="likes__data" >
                            <h4 class="likes__name">${cartItem.dishName}</h4>
                            <p class="likes__author">${cartItem.category}</p>
                            <h3 class="likes__author">Price - ${cartItem.price}</h3>
                        </div>
                        
                        <button class="btn-tiny btn-increase" style = "margin-left: 80px;">
                            <svg>
                                <use href="img/icons.svg#icon-circle-with-plus"></use>
                            </svg> 
                        </button>
                        <button class="likes__quantity">${cartItem.quantity}</button>
                        
                        <button class="btn-tiny btn-decrease">
                            <svg>
                                <use href="img/icons.svg#icon-circle-with-minus"></use>
                            </svg>
                        </button>
                        </div>
                </li>
                    `;
    elements.cartList.insertAdjacentHTML('beforeend', markup);
};

export const renderCartTotal = total =>{
    const cartTotal = document.getElementById('cart__total');
    //console.log(cartTotal);
    if(cartTotal)
        cartTotal.innerHTML = total;
    else{
            const markup = `<li>
                    <a class="likes__name">
                    <h2>TOTAL = 
                    <a class = "likes__name" id = "cart__total">
                    ${total}
                    </a>
                    </h2>
                    </a>
                    
                </li>
                `; 
    elements.cartList.insertAdjacentHTML('afterend',markup);
    }
};
export const deleteCartItem = dishName => {
    const el = document.querySelector(`.likes__link[data-dish="${dishName}"]`).parentElement;
    if (el) el.parentElement.removeChild(el);
};


export const clearCart = ()=>{
  const myCartList = document.querySelectorAll('.cart__items');  
    if(myCartList){
        myCartList.forEach(el=>{
          el.parentElement.removeChild(el);  
        });
    }
};



