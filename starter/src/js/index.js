import  Customer from './models/Customer';

const elements = {
    login : document.querySelector('.login-submit'),
    signup : document.querySelector('.signup-submit'),
    circle : document.querySelector('.circle-submit')
};


/****
***
**
CUSTOMER CONTROLLER 
**
***
****/
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

const controlPostFriend = async (cust) => {
    const customer = new Customer(cust.mobile,cust.password);
    await customer.getCustomer();
    if(customer.data){
        const res = await customer.postCustomerFriend(cust.friendMobile);
        if(res == 204)
        alert('Friend Added !');
        else
        alert('Oops!! Wrong friend information..Try again')
    }
    else
        alert('Wrong Mobile or Password!!');
}

/*
handles login submit event.
*/

elements.login.addEventListener('click',e=>{
    e.preventDefault();
    const form = new FormData(document.querySelector('.login'));
    const mobile = form.get('login-mobile');
    const password = form.get('login-password');
   // console.log(`${mobile},${password}`);
    controlCustomer(mobile,password);
});


/*
handles signup submit event.
*/

elements.signup.addEventListener('click',e=>{
   e.preventDefault();
    const form = new FormData(document.querySelector('.signup'));
    const cust = {
    mobile : form.get('mobile'),
    address : form.get('address'),
    custName : form.get('name'),
    password : form.get('password'),
    location : form.get('location'),
    email : form.get('email')
    }
    controlPostCustomer(cust);
});

/*
Controller that opens second page.
*/
const openSecondPage = ()=>{
    window.location = '../index2.html';
};


/*
handles add circle event.
*/

elements.circle.addEventListener('click',e=>{
   e.preventDefault();
   const form = new FormData(document.querySelector('.circle'));
   const cust = {
       mobile : form.get('circle-mobile'),
       password : form.get('circle-password'),
       friendMobile : form.get('circle-friend')
       }
    controlPostFriend(cust);
    
});





