import * as yup from "yup";

//Schema for creating a recipe

const createRecipeSchema= yup.object({
  body: yup.object({
    title: yup.string().required("title is required"),
    note: yup.string(),
    ingredients: yup.string().required("ingredients is required"),
    description: yup.string().required("description is required"),
  }),
});
  
//Schema for getting a recipe by ID

const getRecipeSchema = yup.object({
  params: yup.object({
    id: yup.string()
  }),
});

//Schema for searching recipes by query string

const searchRecipeSchema = yup.object({
  query: yup.object({
    q: yup.string()
  }),
});

//Schema for getting recipes by user ID

const getUserRecipesSchema = yup.object({
  params: yup.object({
    userId: yup.string()
  }),
});

//Schema for registering or loggin in a user

const joinSchema = yup.object({
  body: yup.object({
    email: yup.string().email().required("Email is required"),
    password: yup
      .string()
      .min(7, "password must be greater than 6")
      .required("Password is required"),
  }),
});

export {
  createRecipeSchema,
  getRecipeSchema,
  getUserRecipesSchema,
  joinSchema,
  searchRecipeSchema,
};