import { Request, Response } from "express";

export class TagController {

    public getTags(_req: Request, res: Response) {
        res.status(200).json({ tag: "test" });
    }
}