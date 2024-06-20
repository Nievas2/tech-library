export class LibraryNotFoundException extends Error{
    constructor(message: string) {
        super(message);
    }
}