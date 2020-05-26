import axios from 'axios';
import {proxy} from '../config';

export default class Delivery{
    constructor(location){
        this.location = location;
    }
    async getDeliveryPersons(){
        try{
            const res = await axios(`http://localhost:8081/jsdemo/webapi/deliveryPerson/${this.location}`);
            this.deliveryPersons = res.data;
            /*this.divPersonId = res.data.divPersonId;
            this.divPersonName = res.data.divPersonName;
            this.rating= res.data.rating;
            this.salary = res.data.salary;
            this.location = res.data.location;
            this.available = res.data.available;*/
            
            
        }catch(error){
            console.log(error);
            alert('Something went wrong in fetching delivery persons !!');
        }
    }
    selectDeliveryPerson(){
        this.deliveryPersons.sort((a, b) => b.rating-a.rating);
        //console.log(this.deliveryPersons);
        let divMan;
        this.deliveryPersons.forEach(el=>{
          if(el.available === true){
              divMan = el;
              return;
          }
        });
        return divMan;
    }
}