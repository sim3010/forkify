import { elements } from './base';

export const clearCircle = () =>{
    elements.showRecommendation.innerHTML = '';
};

export const renderCircle = (recomm) =>{
  const markup = `<li>
                    <div class="likes__link">       
                        <div class="likes__data" >
                            <h3 class="likes__name">${recomm.customer.custName}</h3>
                            <h3 class="likes__author">has recommended</h3>
                            <h3 class="likes__author">Restaurant - ${recomm.restaurant.restName}</h3>
                            <p class="likes__author">Location - ${recomm.restaurant.location}</p>
                        </div>
                        </div>
                </li>
                    `;  
    elements.showRecommendation.insertAdjacentHTML('beforeend',markup);
};

export const renderRecommendButton = () =>{
    const markup = `  
                        <div class="results__data recommend__btn" style=" margin-top: 100px;
display: flex;align-items: center;justify-content: center;">
                        <button class="btn search__btn btn-recomm">
                            <svg class="search__icon">
                                <use href="img/icons.svg#icon-heart"></use>
                            </svg>
                            <span>Recommend</span>
                        </button>
                        </div>
                        
                        `;
    elements.restaurant.insertAdjacentHTML('beforeend',markup);
};