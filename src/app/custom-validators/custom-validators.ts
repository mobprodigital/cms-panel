import { AbstractControl } from '@angular/forms';

export namespace CustomValidators {
    let emailRgx: RegExp = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    let urlRgx: RegExp = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/;

    let intRgx: RegExp = /^-?\d*$/;

    let uintRgx: RegExp = /^[0-9]\d*$/;

    let phoneRgx : RegExp = /^([0|\+[0-9]{1,5})?([7-9][0-9]{9})$/;

    /**
     * Validate that the email is valid
     * @param control Control whose value to be validate
     */
    export function ValidateEmail(control: AbstractControl) {
        if (!control.value || !control.value.trim()) {
            return null;
        }
        else if (!emailRgx.test(control.value)) {
            return { validateEmail: true }
        }
        else {
            return null;
        }
    }

    /**
     * Validate that the email is valid
     * @param control Control whose value to be validate
     */
    export function ValidateUrl(control: AbstractControl) {
        if (!control.value || !control.value.trim()) {
            return null
        }
        else if (!urlRgx.test(control.value)) {
            return { validateUrl: true };
        }
        else {
            return null;
        }
    }

    /**
     * Validate that the value is int
     * @param control Control whose value to be validate
     */
    export function ValidateInt(control: AbstractControl) {

        if (!control.value) {
            return null
        }
        else if (!intRgx.test(control.value)) {
            return { validateInt: true };
        }
        else {
            return null;
        }
    }
    
    /**
     * Validate that the value is unsigned int
     * @param control Control whose value to be validate
     */
    export function ValidateUint(control: AbstractControl) {

        if (!control.value) {
            return null
        }
        else if (!uintRgx.test(control.value)) {
            return { validateUint: true };
        }
        else {
            return null;
        }
    }

    /**
     * Validate that the phone number is valid
     * @param control Control whose value to be validate
     */
    export function ValidatePhone(control:AbstractControl){
        if (!control.value) {
            return null
        }
        else if (!phoneRgx.test(control.value)) {
            return { validatePhone: true };
        }
        else {
            return null;
        }
    }
}