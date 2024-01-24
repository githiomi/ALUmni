import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";
import { isValidEmail } from "@crispengari/regex-validator";

export const emailPatternValidation: ValidatorFn =
    (control: AbstractControl): ValidationErrors | null => {

        // /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

        return isValidEmail(control.get('emailAddress')?.value) 
        ? null 
        : { invalidEmail: true };

    }