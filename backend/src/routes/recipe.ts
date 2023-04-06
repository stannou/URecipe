import { Router } from "express";
import passport from "passport";
import { searchRecipe } from "../controllers";
import { createRecipe, getAllRecipes, getRecipe,  getUserRecipes } from "../controllers/recipe";
import { searchRecipeSchema, createRecipeSchema, getUserRecipesSchema, getRecipeSchema } from "../schema-validations";
import { validate } from "./../middlewares/validate";

//Create a new router instance
const router = Router();

//endpoint for getting all recipes
router.get("/", 
passport.authenticate("jwt", {session: false }), 
getAllRecipes
);


router.get("/find", 
passport.authenticate("jwt",{ session: false}),
validate(searchRecipeSchema), 
searchRecipe
);


router.post("/create",
passport.authenticate("jwt", { session: false}),
validate(createRecipeSchema), 
createRecipe
);


router.get(
"/user/:userID",
passport.authenticate("jwt", { session: false }),
validate(getUserRecipesSchema), 
getUserRecipes
);


router.get(
"/:id", 
passport.authenticate("jwt", { session: false }),
validate(getRecipeSchema), 
getRecipe
);


export { router };