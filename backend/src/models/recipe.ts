// Importing the necessary Mongoose modules and interfaces
import {Schema, SchemaTypes, model } from "mongoose";


//Defining the IImage interface for the 'image' property of the recipe
interface IImage {
    url: string,
    id: string
}



//Creating an interface representing  a document in MongoDB.
interface IRecipe {
    title: string;
    description: string;
    note: string;
    ingredients: string;
    image: IImage;
    user?: string;

}


//Creating the Mongoose schema for the 'Recipe' model
const recipeSchema = new Schema<IRecipe>(
    {
        user: { type: SchemaTypes.ObjectId, ref: "User" },
        title: { type: String, required: true, index: true },
        description: { type: String, required: true, index: true },
        note: { type: String, index: true },
        ingredients: { type: String, required: true, index: true },
        image: { //Image for the recipe, with URL and ID properties(required)
            url: { type: String, required: true },
            id: { type: String, required: true},   
        },
    },
    {
        timestamps: true, //Adds 'createdAt' and 'updatedAT' fields to the recipe
        autoIndex: true, //creaties indexes for the schema fields 
        toJSON: { virtuals: true}, //Converts virtuals to JSON when calling 'toJSON()'
        toObject: { virtuals: true }, //Converts virtuals to object when calling 'toObject()'
    }
); 

//Creating the 'Recipe' model from the recipeSchema
export const Recipe = model<IRecipe>("Recipe", recipeSchema);