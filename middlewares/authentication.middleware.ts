import { Request, Response, NextFunction } from "express"
import { IncomingHttpHeaders } from "http";
import jwt, { JwtPayload } from "jsonwebtoken";
import * as fs from "fs"
import { User } from "../models/user";
import { CustomRequest } from "../models/customRequest";

export const authenticationMiddleware = (req: CustomRequest, res: Response, next: NextFunction) => {
    try {
        const headers: IncomingHttpHeaders = req.headers;
        const authorizationHeader = headers.authorization;
        const token = authorizationHeader && authorizationHeader.split(' ')[1];
    
        if (token == null) throw new Error();
    
        const payload: JwtPayload = jwt.verify(token, "VUGdJIT?tpX*uOOe,s*cPn+z7l:FG") as JwtPayload;

        const pseudo: string = payload.pseudo;

        const data = fs.readFileSync("./assets/users.json", "utf8");
        const users: User[] = JSON.parse(data);
    
        const existingUser: User|undefined = users.find((user) => user.pseudo == pseudo);
    
        if (!existingUser) throw new Error();
    
        req.user = existingUser;

        next();
    } catch (error) {
        res.status(401).json(error).send();
    }
}