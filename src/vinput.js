import { bindable, bindingMode } from 'aurelia-framework';

export class VinputCustomElement {
    @bindable type = "text";
    @bindable class = "form-control";
    @bindable placeholder = "";
    @bindable propertyName;
    @bindable({ defaultBindingMode: bindingMode.twoWay }) value;
    @bindable handleChange;
    @bindable handleBlur;
    @bindable validationResult;

    onChange() {
        this.handleChange(null, this.propertyName);
    }

    onBlur() {
        this.handleChange(null, this.propertyName);
    }

    onKeyUp(value) {
        this.handleChange(value);
    }

    get wasValidated() {
        return this.validationResult && this.validationResult[this.propertyName] && this.validationResult[this.propertyName].length > 0;
    }

    get isValid() {
        let isValid = false;
        if (this.wasValidated) {
            isValid = this.validationResult[this.propertyName].find(x => !x.valid) === undefined;
        }
        return isValid;
    }

    get isValidFeedback() {
        return this.wasValidated && this.isValid;
    }

    get isInValidFeedback() {
        return this.wasValidated && !this.isValid
    }

    get className() {
        let className = [this.class];
        if (this.isValidFeedback) {
            className.push('is-valid');
        }
        else if (this.isInValidFeedback) {
            className.push('is-invalid');
        }
        return className.join(' ')
    }

    get errors() {
        return this.validationResult[this.propertyName];
    }



}