import { Response } from "express";
import * as fs from "fs"
import { Post } from "../models/post";
import { CustomRequest } from "../models/customRequest";

export interface PostController {
    getAll(req: CustomRequest, res: Response): any;
    getById(req: CustomRequest, res: Response): any;
}

class _PostController implements PostController {
    public getAll(req: CustomRequest, res: Response) {
        try {
            const data = fs.readFileSync("./assets/posts.json", "utf8");
            const posts: Post[] = JSON.parse(data);

            res.status(200).json(posts).send();
        } catch (error) {
            console.log(error);
            res.status(400).json(error).send();
        }
    }    
    
    public getById(req: CustomRequest, res: Response) {
        try {
            const { id } = req.params;

            if (!id) throw new Error();

            const data = fs.readFileSync("./assets/posts.json", "utf8");
            const posts: Post[] = JSON.parse(data);

            const post: Post|undefined = posts.find((post) => post.id == Number(id));

            if (!post) throw new Error();

            if (post.author !== req.user?.id) {
                if (!req.user?.admin) throw new Error();

                res.status(200).json(post).send();
            }
            
            res.status(200).json(post).send();
        } catch (error) {
            res.status(400).json(error).send();
        }
    }
}

export const PostController: PostController = new _PostController();