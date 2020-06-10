import Search from './models/Search';
import Recipe from './models/Recipe';
import List from './models/List';
import * as searchView from './views/searchView';
import * as recipeView from './views/recipeView';
import * as listView from './views/listView';

//object in which everything from search view is stored
import { elements, renderLoader, clearLoader } from './views/base';

/** Global state of the app

*-Search object
*- current recipe object
*- shoppuing list object
*- like recipes

**/
const state = {};
//make state available in global window object

window.state = state;



//application state current state in any given moment search query etc 
//what's in shopping list all data that defines our app in the current moment 
//in one object

//const search = new Search();
//
//search.getResults();


//SEARCH CONTROLLER

const controlSearch =  async () => {
    //1) get query from view
    const query = searchView.getInput();
          

//     console.log(query);
         
    
    if (query) {
        // 2) New search object and add to state
        //new instance based off the search class
        //
        state.search = new Search(query);
        
        //3) Prepare UI for results
        
        searchView.clearInput();
        searchView.clearResults();
        renderLoader(elements.searchRes);
        //4) Search for recipes ren the method based off the constructor method instance
        
        //returns a promise so have to await
        try {
            
       //get recipe data
         await state.search.getResults();
        //5) Render results on UI
       
       searchView.renderResults(state.search.result);
        
        } catch (err) {
            alert('Somethhing wrong with the search..');
            clearLoader();
        }
        
    }
};


elements.searchForm.addEventListener('submit', e => {
    e.preventDefault();
    controlSearch();
    
});




elements.searchResPages.addEventListener('click', e => {
    const btn = e.target.closest('.btn-inline');
//    console.log(e.target);
    
    if (btn) {
        const goToPage = parseInt(btn.dataset.goto, 10);
        searchView.clearResults();
        searchView.renderResults(state.search.results, goToPage);
        //specify base 10
    }
});


//RECIPE CONTROLLER


//const r = new Recipe(46956);
//r.getRecipe();
//console.log(r);


//everytime the hash has changed in URL
//window locaio is the entire url

const controlRecipe = async () => {
    //get ID from URL
    //its a string
    const id = window.location.hash.replace('#', '');
    console.log(id);
    //if there is an id create recipe object
    if (id) {
        //prepare UI for changes
        recipeView.clearRecipe();
        //pass in the parent
        renderLoader(elements.recipe);
        
//        highlight selected search item
      if(state.search) searchView.highlightSelected(id);
        // create new recipe object
        
        //add it to state
        state.recipe = new Recipe(id);
        //get recipe data
        
        //global window object
        //access to recipe object
//        window.r = state.recipe;
        
     try {
      //get it asynchronsly 
      //get recipe data and parse ingredients
      await state.recipe.getRecipe();
        state.recipe.parseIngredients();
        //calculate servings and time
        state.recipe.calcTime();
        state.recipe.calcServings();
        //render recipe  
         clearLoader();
         recipeView.renderRecipe(state.recipe);
         
     }   catch (error) {
         alert('error processing recipe');
         //incase something goes wrong in models recipe
     }
    
       
        
        //get it asynchronsly 
      await state.recipe.getRecipe();
        //calculate servings and time
        state.recipe.calcTime();
        state.recipe.calcServings();
        //render recipe
    }
};
window.addEventListener('hashchange', controlRecipe);
window.addEventListener('load', controlRecipe);

//put events into array and looop through
//each element is an event
['hashchange', 'load'].forEach(event => window.addEventListener(event, controlRecipe));





//LIST CONTROLLER




const controlList = () => {
    //create new list if there is none yet
    //if there is no state.list
    //initialise with empty object
    if( !state.list) state.list = new List();
    //add each ingredient to the list and UI
    state.recipe.ingredients.forEach(el => {
     const item =  state.list.addItem(el.count, el.unit, el.ingredient);
        listView.renderItem(item);
    });
}



//handle delete and update list item events

elements.shopping.addEventListner('click', e => {
  //use dataset and custom dataset id
    const id = e.target.closest('.shopping__item').dataset.itemid;
    
    //handle the delete button
    //shopping delete or any of it's child elements
    if(e.target.matches('.shopping__delete, .shopping__delete *')){
        
        //delete from state
        
        state.list.deleteItem(id);
        
        //delete from UI
        
        listView.deleteItem(id);
        
        //handle count update
    } else if (e.target.matches('.shopping__count-value')) {
        //read current value of input element
        const val = parseFloat(e.target.value, 10);
        state.list.updateCount(id, val);
    }
    
    
        
    
});


//handling recipe button click




elements.recipe.addEventListener('click', e => {
    if (e.target.matches('.btn-decrease, .btn-decrease *')) {
        //decrease button is clicked
        
        if(state.recipe.servings > 1) {
         state.recipe.updateServings('dec');
            recipeView.updateServingsIngredients(state.recipe)
        }

    } else if (e.target.matches('.btn-increase, .btn-increase *')) {
        //increase button is clicked
        state.recipe.updateServings('inc');
         recipeView.updateServingsIngredients(state.recipe)

    } else if (e.target.matches('.recipe__btn--add, .recipe__btn *')) {
                //child elements of button
        controlList();

    }
        
       
    console.log(state.recipe);
});



window.l = new List();


