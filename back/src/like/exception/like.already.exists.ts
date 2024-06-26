export class LikeAlreadyExistsException extends Error {
    constructor(msg?: string) {
        super(msg === undefined ? "" : msg);
        Object.setPrototypeOf(this, LikeAlreadyExistsException.prototype);
    }
}