import { ApplicationError } from './application-error';

export class AccessError extends ApplicationError {
    constructor(message: string) {
        super(message)
    }
}
