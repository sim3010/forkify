const elements = {
    login : document.querySelector('.login-submit')
};


console.log('hello');

elements.login.addEventListener('click',e=>{
    e.preventDefault();
    const form = new FormData(document.querySelector('.login'));
    const mobile = form.get('login-mobile');
    const password = form.get('login-password');
    console.log(`${mobile},${password}`);
    
});