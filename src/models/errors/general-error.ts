import { ApplicationError } from './application-error';
import Vue from 'vue';

export class GeneralError extends ApplicationError {
    data: any;
    silent: boolean;

    constructor(message: string, data: object, silent: boolean) {
        super(message);
        this.data = data;
        this.silent = silent;
    }
}
