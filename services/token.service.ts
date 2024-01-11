import jwt from "jsonwebtoken";
import { User } from "../models/user";

export const generateTokenForUser = (user: User): string => {
    const authToken: string = jwt.sign(
        {
            pseudo: user.pseudo
        },
        "VUGdJIT?tpX*uOOe,s*cPn+z7l:FG",
        {
            subject: user.pseudo,
            expiresIn: "1d",
            issuer: "dev-api",
            algorithm: "HS256"
        },
    )

    return authToken;
}