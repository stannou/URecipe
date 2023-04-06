//importing the required dependencies
import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import {User} from "../models";
import { CONSTANTS } from '../constants';

//function to generate a JWT token with the given ID
const signToken = (id: string) => {
    return jwt.sign({ id }, process.env.JWT_SECRET as string, {
        expiresIn: process.env.JWT_EXPIRESIN as string,
    });
};


//Controller function for user registration or login
export const registerOrLogin = async (req: Request, res: Response) => {
    //Extracting email and password from the request body
    const { email, password }: { email: string; password: string } = req.body;

    try {
        //Checking if a user with the given email exists in the database
        const _user = await User.findOne({ email }).select("+password").exec();

        if(_user) {
            //If a user with the given email exists, comparing the provided password with the hashed password stored in the database
            if(!(await bcrypt.compare(password, _user?.password as string))) {
                return res.status(400).json({ error: "Invalid email or password" });
            }

            // If the password is correct, generating a JWT token with the user's ID and sending it in the response along with the email and ID
            const token = signToken(_user?._id as unknown as string);
            return res.status(200).json({ token, email, id: _user?._id});
        }

        //If a user with the given email doesn't exist, creating a new user in the database with the provided email and password
        const newUser = await User.create({email, password: await bcrypt.hash(password, CONSTANTS.SALT) });

        //Generating a JWT token with the new user's ID and sending it in the response along with the email and ID
        const token = signToken(newUser._id);

        return res
            .status(201)
            .json({ token, email: newUser?.email, id: newUser._id});



    } catch (error) {
        //If an error occurs while processing the request, sending a 500 status code along with an error message in the response
        console.log(error);
        return res
            .status(500)
            .json({ error: "An error occucred while processing your request"});
    }
      
};