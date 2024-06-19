export class TagAlreadyExistException extends Error {
    constructor(message: string) {
        super(message);
    }
}