// cart :- cartItems ( dishName,ctaegory,veg,price) ,restId

export default class Cart {
    constructor(restId) {
        this.cartItems = []; //likes  = cartItems
        this.restId = restId;
        this.cartTotal = 0;
    }

    addCartItem(dishName,category, veg, price,quantity = 1) {
        const cartItem = { dishName,category, veg, price,quantity };
        this.cartItems.push(cartItem);
        // Perist data in localStorage
        this.persistData();

        return cartItem;
    }

    deleteCartItem(dishName) {
        const index = this.cartItems.findIndex(el => el.dishName === dishName);
        this.cartItems.splice(index, 1);
        
        // Perist data in localStorage
        this.persistData();
    }

    isAdded(dishName) {
        return this.cartItems.findIndex(el => el.dishName === dishName) !== -1;
    }
    changeQuantity(dishName,operation){
        const idx = this.cartItems.findIndex(el => el.dishName === dishName);
        (operation === 1) ? this.cartItems[idx].quantity++ : this.cartItems[idx].quantity--;
        const quan = this.cartItems[idx].quantity;
        if(this.cartItems[idx].quantity === 0)
            this.deleteCartItem(dishName);
        return quan;
    }
    getNumCartItems() {
        return this.cartItems.length;
    }
    getCartTotal(){
        let total = 0;
        this.cartItems.forEach(el=>{
            total += (el.price *el.quantity);
        });
        return total;
    }
    persistData() {
        localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
        localStorage.setItem('restId',JSON.stringify(this.restId));
    }

    readStorage() {
        const storage = JSON.parse(localStorage.getItem('cartItems'));
        const storedRestId = JSON.parse(localStorage.getItem('restId'));
        
        // Restoring likes from the localStorage
        if (storage) this.cartItems = storage;
        if (storedRestId)  this.restId = storedRestId;
    }
    deleteAllCartItem(){
        this.cartItems =[];
        this.cartTotal = 0;
    }
}
