import { FormEvent, useContext, useState } from "react";
import recipeOne from "../../assets/recipe-one.jpg";
import { Form, Input, Button } from "../../components";
import { AUTH_TYPE, IPAYLOAD } from "../../@types";
import { validateEmail } from "../../utils";
import { AuthenticationContext } from "../../context";
import cogoToast from "cogo-toast";

export const Landing = () => {
    const {loading, onLogin} = useContext(AuthenticationContext) as AUTH_TYPE;
    const [state, setState] = useState<IPAYLOAD>({email: "", password: ""});

    const handleSubmit = async(e: FormEvent<HTMLFormElement>)=> {
        e.preventDefault();
        if (!validateEmail(state?.email)) {
            return cogoToast.error("Invalid email");
          }
          if (!state?.password || state?.password?.length < 7) {
            return cogoToast.error("Please provide password");
          }
          await onLogin(state);
    };
    

    const handleState =(e: FormEvent<HTMLInputElement>)=> {
        const {name, value} = e.currentTarget;
        setState({ ...state, [name]: value});
    };
    
    return (
        <div className="container bg-black text-white h-[100%] flex flex-col-reverse md:flex-row w-full"> 
            <div className="w-full h-full">
                <Form
                    className="flex items-center justify-center w-full h-full p-10"
                    onSubmit={handleSubmit}
                >

                    <div className="flex flex-col gap-2 w-full md:w-[50%]">
                        <h2 className="text-orange-500 font-extrabold text-xl underline underline-offset-4 ">
                            URecipe
                        </h2>

                            <Input 
                                name="email"
                                placeholder="Email"
                                handleChange={handleState}
                                type="text"
                                className={`bg-zinc-900 py-1 px-4 w-full shadow-xl  placeholder:text-sm hover:bg-zinc-800 cursor-pointer focus:outline-none`}
                                disabled={loading}
                            />

                            <Input
                                name="password"
                                placeholder="Password"
                                handleChange={handleState}
                                type="password"
                                className={`bg-zinc-900 py-1 px-4 w-full placeholder:text-sm hover:bg-zinc-800 cursor-pointer focus:outline-none`}
                                disabled={loading}
                            />

                            <div className="w-full md:w-[50%] m-auto flex flex-col gap-2">
                                <Button
                                    title={loading ? "Loading": "Login"}
                                    className={`bg-orange-500 text-white hover:bg-orange-600 py-1 px-6 w-full `}
                                    type="submit"
                                    disabled={loading}
                                    
                                />
                        </div>

                    </div>

                    

                </Form>
            </div>
            <div className="w-full h-full saturate-200"></div>
            <img
                src={recipeOne}
                alt="A dish with food recipes"
                className="w-full h-full object-center object-cover"
            />

        </div>
    );
};