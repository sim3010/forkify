import {elements} from './base';

export const clearOrders = () =>{
    elements.showOrder.innerHTML = '';
}

export const renderOrders = (orders) =>{
    
    const markup = ` <li>
                    <div class="likes__link">       
                        <div class="likes__data" >
                            <h3 class="likes__name">${orders.restName}</h3>
                            <h3 class="likes__author">${orders.orderId}</h3>
                            <h3 class="likes__author">${orders.date.substring(0,10)}</h3>
                            <p class="likes__author">${orders.orderStatus}</p>
                        </div>
                        </div>
                </li>
                    `;
    elements.showOrder.insertAdjacentHTML('beforeend',markup);
};
