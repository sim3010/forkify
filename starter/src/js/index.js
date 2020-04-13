import  Customer from './models/Customer';

const elements = {
    login : document.querySelector('.login-submit'),
    signup : document.querySelector('.signup-submit')
};


//console.log('hello');
const controlCustomer = async (mobile,password) =>{
    const customer = new Customer(mobile,password);
    await customer.getCustomer();
    if(customer.data){
        customer.persistData();
        openSecondPage();
    }
    else 
        alert('Wrong Mobile or Password!!');
}

const controlPostCustomer = async (cust) =>{
    
    const customer = new Customer(cust.mobile,cust.password);
    const res = await customer.postCustomer(cust);
    if(res)
        alert('Account Successfully created...');
}


elements.login.addEventListener('click',e=>{
    e.preventDefault();
    const form = new FormData(document.querySelector('.login'));
    const mobile = form.get('login-mobile');
    const password = form.get('login-password');
   // console.log(`${mobile},${password}`);
    controlCustomer(mobile,password);
   // openSecondPage();
});


elements.signup.addEventListener('click',e=>{
   e.preventDefault();
    const form = new FormData(document.querySelector('.signup'));
    const cust = {
    mobile : form.get('mobile'),
    address : form.get('address'),
    custName : form.get('name'),
    password : form.get('password'),
    location : form.get('location')
    }
    controlPostCustomer(cust);
});


const openSecondPage = ()=>{
    window.location = '../index2.html';
};