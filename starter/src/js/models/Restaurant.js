import axios from 'axios';
import {proxy} from '../config';
export default class Restaurant{
    constructor(id){
        this.id = id;
    }
    
    async getDishesOfRestaurant(){
        try{
            const res = await axios(`http://localhost:8081/jsdemo/webapi/restaurants/${this.id}/dishes`);
            this.rest = res.data;
            /*this.dishName = res.data.dishName;
            this.category = res.data.category;
            this.veg= res.data.veg;
            this.price = res.data.price;
            this.available = res.data.available;*/
            
            
            
        }catch(error){
            console.log(error);
            alert('Something went wrong in fetching restaurants!!');
        }
    }        
}




