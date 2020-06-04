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
    
    
    parseIngredients() {
        
        const unitsLong = ['tablespoons', 'tablespoon', 'ounces', 'ounce', 'teaspoons',  'teaspoon','cups', 'pounds'];
        const unitsShort = ['tbsp', 'tbsp'. 'oz', 'oz', 'tsp'];
        const newIngredients = this.ingredients.map(el => {
      //1) uniform units
            
            //put everything into lowercase first
            
            let ingredient = el.toLowerCase();
            
            unitsLong.forEach((unit, i ) => {
                //current element index
                ingredient = ingredient.replace(unit, unitsShort[i])
                
                
            //loop over longer ingredients list and replace them with the shorter ones
//                current ingredient has shorter unit now
            });
            
            
    //2) Remove parentheses
            
            //returns a new one 
//            replace everthing in parenthesis with nothing
            ingredient = ingredient.replace(/ *\([^)]*\) */g, '');
            
            //3) parse ingredients into count unit and ingredients
            
            //if there is a unit in the string and if it is where si it located
            const arrIng = ingredient.split(' ');
            
            const unitIndex = arrIng.findIndex(el2 => unitsShort.includes(el2));
            
            
            //will check if element in arrIng is in units short
            //have to return ingredient
            
            //let and const are block scoped
            let objIng;
            
            
            if (unitIndex > -1) {
                // there is a unit
                //assume number appears in same position
//                e.g 1 piece of bread
                const arrCount = arrIng.slice(0, unitIndex); //E
            } else if (parseInt(arrIng[0], 10)) {
                //coerce it to true conver it to number
                // if not it will coerce it to not a number which is false
                
                
              objIng = {
                   count: parseInt(arrIng[0], 10),
                  unit: '',
                  //entire array except first element
                  //put all array elements back into a strince
                  ingredient: arrIng.slice(1).join(' ');
                       
                  }
                
            } else if (unitIndex === -1) {
                //there is No unit and no number in 1st position
                
                objIng = {
                    count: 1, 
                    unit: '',
                    ingredient
                }
            }
            
            
//            return ingredient; 
            
            return objIng;
        });
        //this.indgredients is new ingredients array now
        this.ingredients = newIngredients;
        
    }
}

