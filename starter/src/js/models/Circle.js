import axios from 'axios';
import {proxy} from '../config';

export default class Circle{
    constructor(custId){
        this.custId = custId;
    }
    async getCircleRecommendation(){
        const res = await axios(`http://localhost:8081/jsdemo/webapi/customers/${this.custId}/circle`);
        this.circleRecommendations = res.data;
        //console.log(this.circleRecommendations);
    }
    async postRecommendation(restId){
        const res = await axios({
            method: 'post',
            url: `http://localhost:8081/jsdemo/webapi/customers/${this.custId}/recommend`,
            data: JSON.stringify(restId),
            headers: {
                'content-type': 'application/json',
                },
        });
        console.log(res);
    }
}

