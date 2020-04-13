import axios from 'axios';  //returns json and better at error handling
import {proxy} from '../config'
export default class Search{
    constructor(location){
        this.location = location;
        
    }


async getRestaurants(){
    //const proxy = 'https://cors-anywhere.herokuapp.com/';
    const res = await axios(`http://localhost/jsdemo/webapi/restaurants/${this.location}`);
    this.result = res.data;
    this.persistData();
    console.log(this.result);
}
    persistData() {
        localStorage.setItem('location', JSON.stringify(this.location));
    }
    
    readStorage() {
        const storage = JSON.parse(localStorage.getItem('location'));
        
        // Restoring likes from the localStorage
        if (storage) {
            this.location = storage;
            return true;
        }
        return false;
    }
}