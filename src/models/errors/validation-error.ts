import { IFieldValidationError } from './field-validation-error';
import { ApplicationError } from './application-error';

export class ValidationError extends ApplicationError {
    errors: IFieldValidationError[] = []

    constructor(errors) {
        super(null)

        this.errors = Object.keys((errors || {}))
            .map(key => ({ field: key, errors: errors[key] }))
            // tslint:disable-next-line: no-shadowed-variable
            .map(({ field, errors }) => ({
                field,
                errors: Array.isArray(errors) ? errors : [errors],
            }) as IFieldValidationError);
    }

    addErrors(field: string, ...errors: string[]) {
        const fieldErrors = this.errors.find(p => p.field === field)

        if (!fieldErrors) {
            this.errors.push(({
                field,
                errors,
            }) as IFieldValidationError)
        } else {
            fieldErrors.errors.push(...errors)
        }
    }

    setErrors(field: string, ...errors: string[]) {
        const fieldErrors = this.errors.find(p => p.field === field)

        if (!fieldErrors) {
            this.errors.push(({
                field,
                errors,
            }) as IFieldValidationError)
        } else {
            fieldErrors.errors.splice(0, fieldErrors.errors.length - 1, ...errors)
        }
    }

    resetErrors(...fields: string[]) {
        fields.forEach(field => {
            const fieldIndex = this.errors.findIndex(p => p.field === field)
            if (fieldIndex >= 0) {
                this.errors.splice(fieldIndex, 1)
            }
        })
    }
}
