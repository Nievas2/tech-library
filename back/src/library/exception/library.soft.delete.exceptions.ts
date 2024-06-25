export class LibraryAlreadyDisabledException extends Error {
    constructor(msg : string) {
        super(msg);
    }
}

export class LibraryAlreadyEnabledException extends Error {
    constructor(msg : string) {
        super(msg);
    }
}