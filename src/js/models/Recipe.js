import axios from 'axios';

export default class Recipe {
  constructor(id) {
      //each recipe identified by id
      //when we create new recipe object pass in id then get new ajax call
      this.id = id;
  }
    
  async getRecipe() {
        try {
        const res = await axios(`https://forkify-api.herokuapp.com/api/get?&rId=${this.id}`);
        this.title = res.data.recipe.title;
        this.author = res.data.recipe.publisher;
        this.img = res.data.recipe.img;
        this.url =  res.data.recipe.source_url;
        this.ingredients = res.data.recipe.ingredients;
            console.log(res);
        } catch (error) {
            
            console.log(error)
        }
    }
    
    calcTime() {
        //for every three ingredients need 15 minutes
        //ingredients is an array
       const numIng = this.ingredients.length; 
       const periods = Math.ciel(numIng / 3);
       this.time = periods * 15;
    }
    
    calcServings() {
        this.servings = 4;
   }
}

