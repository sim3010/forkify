import {elements} from './base';

export const getInput = ()=> elements.searchInput.value; //automatically returns

export const clearInput = () => {
    elements.searchInput.value = '';
};
export const clearResults = () =>{
  elements.searchResList.innerHTML = '';
};

export const highlightSelected = id =>{
    const resultsArr = Array.from(document.querySelectorAll('.results__link'));
    resultsArr.forEach(el =>{
        el.classList.remove('results__link--active');
    });
    document.querySelector(`.results__link[href="#${id}"]`).classList.add('results__link--active');
};

//pasta with tomato and spinach = pasta with tomato...
export const limitRestaurantTitle = (title,limit = 17) =>{
    const newTitle = [];
    if(title.length > limit){
        title.split(' ').reduce((acc,cur)=>{
            if(acc+cur.length <= limit){
                newTitle.push(cur);
            }
            return acc + cur.length;
        },0);
        return `${newTitle.join(' ')}...`;
    }
    return title;
};

const renderRestaurants = restaurant =>{
    /*
    <figure class="results__fig">
                            <img src="${recipe.image_url}" alt="${recipe.title}">
                        </figure>
    */
    const markup = `
            <li>
                    <a class="results__link" href="#${restaurant.restId}"> 
                        <figure class="results__fig">
                            <img src="img/test-${Math.floor(Math.random() * (31 - 1)) + 1}.jpeg" alt="${restaurant.category}">
                        </figure>
                        <div class="results__data">
                            <h4 class="results__name">${limitRestaurantTitle(restaurant.restName)}</h4>
                            <p class="results__author">${restaurant.category}</p>
                            
                        </div>
                    </a>
                </li>
`;
    elements.searchResList.insertAdjacentHTML('beforeend',markup);
};


export const renderResults = (restaurants) =>{
    
     //same as el =>renderRestaurats(el)
    restaurants.forEach(renderRestaurants);

};








