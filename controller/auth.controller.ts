import { Request, Response } from "express";
import * as fs from "fs"
import { User } from "../models/user";
import { generateTokenForUser } from "../services/token.service";

export interface AuthController {
    login(req: Request, res: Response): any;
}

class _AuthController implements AuthController {
    public login(req: Request, res: Response) {
        try {
            const { pseudo, password } = req.body;
            
            if (!pseudo || !password) throw new Error("pseudo/password");
            
            const data = fs.readFileSync("./assets/users.json", "utf8");
            const users: User[] = JSON.parse(data);

            const existingUser: User|undefined = users.find((user) => user.pseudo == pseudo);
            
            if (!existingUser) throw new Error("!user");

            if (existingUser.password !== password) throw new Error(); 

            const token = generateTokenForUser(existingUser);

            res.status(200).json(token).send();
    
        } catch (error) {
            console.log(error);
            res.status(401).json(error).send();
        }
    }
}

export const AuthController: AuthController = new _AuthController();