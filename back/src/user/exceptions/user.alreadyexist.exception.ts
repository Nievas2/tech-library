export class UserAlreadyExistByEmailException extends Error {
    constructor(msg: string) { super(msg); }
}

export class UserAlreadyExistByUsernameException extends Error {
    constructor(msg: string) { super(msg); }
}

export class UserAlreadyExistException extends Error {
    constructor(msg: string) { super(msg); }
}