export const elements = {
    searchForm: document.querySelector('.search'),
    searchInput: document.querySelector('.search__field'),
    searchRes: document.querySelector('.results'),
    searchResList: document.querySelector('.results__list'),
    searchResPages: document.querySelector('.results__pages'),
    recipe: document.querySelector('.recipe'), 
    shopping: document.querySelector('shopping__list')
   
};

//new object for loader
export const elementStrings = {
    loader: 'loader'
};

export const renderLoader = parent => {
//    attach loader as child node of parent
    const loader = `
    <div class="${elementStrings.loader}">
     <svg>
      <use href = "img/icon.svg#icon-cw">
    </svg>
    </div>
     `;
    parent.insertAdjacentHTML('afterbegin',loader);
};

export const clearLoader = () => {
    const loader = document.querySelector(`.${elementStrings.loader}`);
    //if loader then delete it
    if(loader) {
        loader.parentElement.removeChild(loader);
    };
}