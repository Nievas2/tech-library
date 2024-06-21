export class LibraryAlreadyExistException extends Error {
    constructor(message: string) {
        super(message);
    }
}