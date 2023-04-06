//Importing the 'registerOrLogin' function from the 'auth' module
import { registerOrLogin } from "./auth";
import { createRecipe, getAllRecipes, getRecipe, searchRecipe } from "./recipe";

//Exporting the 'registerOrLogin' function to make it available for other modules that import this module
export { 
    registerOrLogin, 
    searchRecipe, 
    getRecipe, 
    getAllRecipes, 
    createRecipe 
};