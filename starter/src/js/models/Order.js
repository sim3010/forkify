import axios from 'axios';
import {proxy} from '../config';

export default class Order{
    constructor(custId){
        this.custId = custId;
        this.orders = [];
    }
    
    async postOrder(order){

    const res = await axios({
        method: 'post',
        url: 'http://localhost/jsdemo/webapi/customers/orders',
        data: JSON.stringify(order),
        headers: {
        'content-type': 'application/json',
        },
    });
        console.log(res);
    }
    async getOrders(custId){
        const res = await axios(`http://localhost/jsdemo/webapi/customers/${this.custId}/orders`);
        /*
        this.orderId = orderId;
		this.restId = restId;
		this.custId = custId;
		this.date = date;
		this.orderStatus = orderStatus;
        */
        //console.log(res.data);
        this.orders = res.data;
    }
}