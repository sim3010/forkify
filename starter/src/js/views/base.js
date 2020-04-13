export const elements = {
    searchInput : document.querySelector('.search__field'),
    searchForm : document.querySelector('.search'),
    searchRes : document.querySelector('.results'),
    searchResList : document.querySelector('.results__list'),
    searchResPages : document.querySelector('.results__pages'),
    restaurant : document.querySelector('.restaurant'),
    shopping : document.querySelector('.shopping__list'),
    cartMenu : document.querySelector('.likes__field'),
    cartList : document.querySelector('.likes__list'),
    placeOrder : document.querySelector('.btn-place-order'),
    tabs : document.querySelector('.tabs'),
    showOrder : document.querySelector('.tab__one'),
    showRecommendation : document.querySelector('.tab__two')
};
/*export const elementStrings = {
  loader : 'loader';  
};*/

export const renderLoader = parent =>{
  const loader = `<div class="loader">
                <svg>
                    <use href = "img/icons.svg#icon-cw"></use>
                </svg>
            </div>
        `;  
    parent.insertAdjacentHTML('afterbegin',loader);
};

export const clearLoader = () =>{
  const loader = document.querySelector('.loader');  
    if(loader)
        loader.parentElement.removeChild(loader);
};