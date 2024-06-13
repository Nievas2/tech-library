import { Request, Response } from "express";

export class LibraryController {

    public getLibrary(_req: Request, res: Response) {
        res.status(200).json({ library: "test" });
    }
}