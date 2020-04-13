import {elements} from './base';

export const clearRestaurants = () =>{
    elements.restaurant.innerHTML = '';
};


export const renderDishes = (restaurant) =>{
    console.log(restaurant);
   /* <figure class="results__fig">
            <img src="img/test-${Math.floor(Math.random() * (31 - 1)) + 1}.jpeg" alt="${rest.category}">
    </figure>
   */
    restaurant.rest.forEach((rest,idx)=>{                          //href="#${rest.dishName}"
        const markup = `
                    <li class="results__list">
                    <a class="results__link" >    
                        <div class="results__data" >
                            <h4 class="results__name">${rest.dishName}</h4>
                            <p class="results__author">${rest.category}</p>
                            <p class="results__author">Price - ${rest.price}</p>
                    <p class="results__author">Available - ${rest.available===true ? 'Yes' : 'No'}</p>
                   
                    ${rest.available === true ? 
                    `<button class="btn-small rest__btn" data-index=${idx}>
                            <svg class="search__icon">
                                <use href="img/icons.svg#icon-shopping-cart"></use>
                            </svg>
                            <span id = "button_span">Add to Cart</span>
                        </button>` : ''}
                        </div>
                    </a>
                </li>
            `;
        elements.restaurant.insertAdjacentHTML('beforeend',markup);
        
    })  ;
};






