import { ɵConsole } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

/*export class PswCoontrolValidators {
// custom validator to check that two fields match
static MustMatch(group1: FormGroup, group2: FormGroup) {
    var psw = group1.controls['firstCtrl'];
    var confirm=group2.controls['secondCtrl']
    if(psw.value!== confirm.value)
        confirm.setErrors({ newMatchesConfirm: true });
    return null;
}
}
*/
export function MustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
        const control = formGroup.controls[controlName];
        const matchingControl = formGroup.controls[matchingControlName];

        if (matchingControl.errors && !matchingControl.errors.mustMatch) {
            // return if another validator has already found an error on the matchingControl
            return;
        }

        // set error on matchingControl if validation fails
        if (control.value !== matchingControl.value) {
            matchingControl.setErrors({ mustMatch: true });
        } else {
            matchingControl.setErrors(null);
        }
    }
}