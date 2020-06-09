export default class List {
    constructor() {
        //pushed into the list item
//        items property set you an empty array
        this.items = [];
    }
    
    //pass in count unit ingredient
    addItem (count, unit, ingredient) {
        //array each of object has count unit ingredient
        
        const item = {
            //don't have to specify name in es6
            id: uniqid(),
            count, 
            unit, 
            ingredient
        }
        this.items.push(item);
        return item;
    }
    
    deleteItem(id) {
        
        //based on passed in ID we want to find position of passed in ID
        
        //find position that matches id passed in
        const index = this.items.findIndex(el => el.id === id);
        
        
        this.items.splice(index, 1);
        // [2,4,8] splice (1, 2) -> returns 4 ,oiginal array [2,8]//
        //start at position 1 and take 1 element
        // [2,4,8] slice (1, 2) -> returns 4 ,oiginal array will not be mutates [2,4,8]
        //start at position one and ends on one doesn't change 
        //mutates the original array takes start and end portion
        
        //if slice(1,1) -> won't return anything
        
        
    }
    
    updateCount(id, newCount) {
        //return the object with the id and update the count
        this.items.find(el => el.id === id).count = newCount;
    }
    
    
}