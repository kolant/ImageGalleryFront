export abstract class ApplicationError extends Error {
    message: string = null

    constructor(message: string) {
        super(message)
        this.message = message
    }
}
