import axios from 'axios';

export default class Customer{
    constructor(mobile,password){
        this.mobile = mobile;
        this.password = password;
    }
    
    async getCustomer(){
        const res = await axios(`http://localhost/jsdemo/webapi/customers/${this.mobile}?password=${this.password}`);
        this.data = res.data;
        console.log(res);
    }
    
    async postCustomer(cust){
        const res = await axios({
            method: 'post',
            url: `http://localhost/jsdemo/webapi/customers`,
            data: JSON.stringify(cust),
            headers: {
                'content-type': 'application/json',
                },
        });
        console.log(res.data);
        return res.data;
    }
    
    persistData(){
        sessionStorage.setItem('customer',JSON.stringify(this.data));
    }

    async postCustomerFriend(friendMobile){

        const res = await axios({
            method : 'post',
            url : `http://localhost/jsdemo/webapi/customers/${this.mobile}/circle`,
            data : friendMobile,
            headers : {
                'content-type' : 'application/json',
            },
        });
        console.log(res);
        return res.data;

    }
}