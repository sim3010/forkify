//http://forkify-api.herokuapp.com/

import  Search from './models/Search';
import * as searchView from './views/searchView';
import * as restView from './views/restView';
import * as listView from './views/listView';
import * as cartView from './views/cartView';
import * as orderView from './views/orderView';
import Restaurant from './models/Restaurant';
import List from './models/List';
import Cart from './models/Cart';
import Delivery from './models/Delivery';
import {elements, renderLoader, clearLoader} from './views/base';
import Order from './models/Order';
import Circle from './models/Circle';
import * as circleView from './views/circleView';
/*
***
SEARCH CONTROLLER
***
*/


/* this is the global state of then app
*- Search object
*- Current recipe object
*- shopping list object
*- liked recipes
*/
const state = {};
state.customer = JSON.parse(sessionStorage.getItem('customer'));
console.log(state.customer);
const controlSearch = async() => {
    //1. get the query from the view
    const location = searchView.getInput(); //todo
    
    //console.log(query);
    if(location){
        //2. new search object and add it to state
        state.search = new Search(location);
        
        // 3. prepare UI for results
        searchView.clearInput();
        searchView.clearResults();
        renderLoader(elements.searchRes);
        
        //4. search for restaurants
        await state.search.getRestaurants();
        
        //5. render results on UI
        clearLoader();
        searchView.renderResults(state.search.result);
    }
}


elements.searchForm.addEventListener('submit',e=>{
    e.preventDefault();
    controlSearch();
});



/*
***
RESTAURANT CONTROLLER
***
*/
/*
1. get rest id from url
2. prepare ui for changes
3. highlight selected restaurant
4. create new dishes object
5. get restaurants dishes
6. render dishes

*/

const controlRestaurant = async () =>{
    //1.get rest id from url
    const id = window.location.hash.replace('#','');
    console.log('state.search is ' + state.search);
    if(id){
        // Prepare UI for changes
        restView.clearRestaurants();
        renderLoader(elements.restaurant);
        
        //highlight selected search item
        if(state.search)
            searchView.highlightSelected(id);
        
        
        // Create new recipe Object
        state.restaurant = new Restaurant(id);
        
        
        // Get restaurant Data
        await state.restaurant.getDishesOfRestaurant();
        
        //Render Dishes
        clearLoader();
       // recipeView.renderDishes(state.restaurant,state.likes.isLiked(id));
        restView.renderDishes(state.restaurant);
        
        
        //Render Recommend Restaurant Button
        circleView.renderRecommendButton();
    }
    
};

['hashchange','load'].forEach(event => window.addEventListener(event,controlRestaurant));


/*
***
CART CONTROLLER
***
*/

/*
1. Add event listener to "add to cart" button
2. Add the dish to cart
3. show total bill amount

*/
window.addEventListener('load',()=>{
    state.cart = new Cart();
    
    // Restore likes
    state.cart.readStorage();
    
    
    //render the existing likes
    state.cart.cartItems.forEach(item =>cartView.renderCart(item));
    cartView.renderCartTotal(state.cart.getCartTotal());
    
});



const controlCart = (dish)=>{
    if(!state.cart)
        state.cart = new Cart(dish.servingRestId);
    else if(state.cart.restId != dish.servingRestId){
        alert('removing old items of different restaurants....');
         state.cart = new Cart(dish.servingRestId);
        cartView.clearCart();
    }     
    if(!state.cart.isAdded(dish.dishName)){
       const newItem = state.cart.addCartItem(
            dish.dishName,
            dish.category,
            dish.veg,
            dish.price );          //quantity is 1
        //add item to UI 
        cartView.renderCart(newItem);
    }
    else{
        state.cart.deleteCartItem(dish.dishName);
        //delete item from UI
        cartView.deleteCartItem(dish.dishName);
    }
    cartView.renderCartTotal(state.cart.getCartTotal());
    console.log(state.cart);
};
console.log(state.restaurant);

elements.restaurant.addEventListener('click',e=>{
   if(e.target.closest('.rest__btn')){                                  
       console.log('dish button clicked');
       console.log(state.restaurant.rest[e.target.dataset.index]);
       const idx = parseInt(e.target.closest('.btn-small').dataset.index);
       controlCart(state.restaurant.rest[idx]);
   }
       
});

elements.cartList.addEventListener('click',e=>{
   if(e.target.matches('.btn-increase, .btn-increase *')){
        const dishName = e.target.closest('.likes__link').dataset.dish;
      console.log(`increase!!! ${dishName}`);
       const quan = state.cart.changeQuantity(dishName,1);
       console.log(quan);
       e.target.closest('.btn-tiny').nextElementSibling.innerHTML = `${quan}`;
       cartView.renderCartTotal(state.cart.getCartTotal());
       
   } 
    else if(e.target.matches('.btn-decrease, .btn-decrease *')){
          const  dishName = e.target.closest('.likes__link').dataset.dish;
        console.log(`decrease!!${dishName}`);
           const quan = state.cart.changeQuantity(dishName,-1);
        if(quan === 0)
            cartView.deleteCartItem(dishName);
        else
            e.target.closest('.btn-tiny').previousElementSibling.innerHTML = `${quan}`;
        console.log(quan);
        cartView.renderCartTotal(state.cart.getCartTotal());
    }   
});




/***
**
*
ORDER CONTROLLER
***
**
*/

/**
1.  Add place order button.
2.  Add Event Listener to place order.
3.  Select available delivery person.
4.  Show confirmation.

**/
window.state = state;
const controlPlaceOrder =async () =>{
    if(state.search)
        state.divPersons = new Delivery(state.search.location);
    else{
        const temp = new Search();
        temp.readStorage();
        state.divPersons = new Delivery(temp.location);
    }
    await state.divPersons.getDeliveryPersons();
    //console.log(state.divPersons);
    const divMan = state.divPersons.selectDeliveryPerson();
    console.log(divMan);
    cartView.clearCart();
    state.cart.deleteAllCartItem();
    cartView.renderCartTotal(state.cart.getCartTotal());
    
    //POST ORDER TO THE CUSTOMER ORDERS
    
    state.order = new Order();
    var d = new Date();
    var sqldate = [
        d.getFullYear(),
        ('0' + (d.getMonth() + 1)).slice(-2),
        ('0' + d.getDate()).slice(-2)
        ].join('-');
    await state.order.postOrder({orderId : Date.now(),
                     restId : state.cart.restId,
                     mobile : state.customer.mobile,//9643041712
                     date : sqldate,
                     orderStatus : "placed"}
                   );
    alert(`Your order assigned to ${divMan.divPersonName} will be delivered soon!!`);
    
}

elements.placeOrder.addEventListener('click', e =>{
    //console.log(`order placed!!${state.search.location}`);
    controlPlaceOrder();
   
    
    
});

const controlShowOrder = async () =>{
    const or = new Order(state.customer.mobile); //9643041712
    await or.getOrders();
    console.log(or.orders);
    orderView.clearOrders();
    or.orders.forEach(el=>{
        orderView.renderOrders(el);
    });
    
};


elements.tabs.addEventListener('click',e=>{
    if(e.target.matches('.tab__order')){  
        //console.log('show orders');
         controlShowOrder();      
        
    }
    else if(e.target.matches('.tab__recomm')){
        //console.log('show recommendations');
        controlShowCircle();
    }
    
});





/***
**
*
RECOMMENDATION CONTROLLER
***
**
*/
/*
1. Add event listener to recommendations button. ( already handled in order controller)
2. Fetch Recommendations from Circle API
3. Render Results on UI using circleView
4. Add Event Listener to Recommend Restauant Button
5. Post Recommendation to Server using API
*/

const controlShowCircle  = async () =>{
  state.circle = new Circle(state.customer.mobile);  //9643041712
    
    //fetch results from API
  await state.circle.getCircleRecommendation();
    console.log(state.circle.circleRecommendations);
    
    //render results on UI
    circleView.clearCircle();
    state.circle.circleRecommendations.forEach(el=>{
        circleView.renderCircle(el);
    });
    
};


const controlPostRecommendation = async (restId) =>{
  const cir = new Circle(state.customer.mobile); //9643041712
    await cir.postRecommendation(restId);
    console.log('recommended');
};

elements.restaurant.addEventListener('click',e=>{
    if(e.target.closest('.recommend__btn')){
        controlPostRecommendation(state.restaurant.id);
    }
    
    
});











