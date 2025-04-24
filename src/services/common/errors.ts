export class AccessDeniedError extends Error {
    constructor(message: string){
        super(message)
        this.name = "AccesDeniedError"
    }
}

export class ConflictError extends Error {
    constructor(message: string){
        super(message)
        this.name = "AccesDeniedError"
    }
}