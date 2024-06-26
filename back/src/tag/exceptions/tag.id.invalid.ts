export class TagIdInvalidException extends Error {
    constructor(id : number | string) {
        super(`Tag id ${id} is invalid`);
    }
}