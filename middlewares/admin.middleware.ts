import { Response, NextFunction } from "express"
import { CustomRequest } from "../models/customRequest";

export const adminMiddleware = (req: CustomRequest, res: Response, next: NextFunction) => {
    try {
        if (!req || !req.user) throw new Error();
    
        if (!req.user.admin) throw new Error();
    
        next();
    } catch (error) {
        res.status(403).json(error).send();
    }
}