import { Component, OnInit, AfterViewInit, OnDestroy, ViewChildren, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators, FormControlName } from '@angular/forms';

import { ActivatedRoute, Router  } from '@angular/router';

import { Observable, Subscription,fromEvent } from 'rxjs';

import { ICar } from './product';
import { ProductService } from './product.service';

import { NumberValidators } from '../shared/number.validator';
import { GenericValidator } from '../shared/generic-validator';
import { map, tap, catchError, merge, debounceTime} from 'rxjs/operators';



@Component({
    templateUrl: './product-edit.component.html'
})
export class ProductEditComponent implements OnInit, AfterViewInit, OnDestroy {
    @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];

    pageTitle: string = 'Car Edit';
    errorMessage: string;
    productForm: FormGroup;

    product: ICar;
    private sub: Subscription;

    // Use with the generic validation message class
    displayMessage: { [key: string]: string } = {};
    private validationMessages: { [key: string]: { [key: string]: string } };
    private genericValidator: GenericValidator;

    get tags(): FormArray {
        return <FormArray>this.productForm.get('tags');
    }

    constructor(private fb: FormBuilder,
                private route: ActivatedRoute,
                private router: Router,
                private productService: ProductService) {

        // Defines all of the validation messages for the form.
        // These could instead be retrieved from a file or database.
        this.validationMessages = {
            carName: {
                required: 'Car Mark is required.',
                minlength: 'Car Mark must be at least three characters.',
                maxlength: 'Car Mark cannot exceed 50 characters.'
            },
            carCode: {
                required: 'Car code is required.'
            },
            starRating: {
                range: 'Rate the car between 1 (lowest) and 5 (highest).'
            }
        };

        // Define an instance of the validator for use with this form, 
        // passing in this form's set of validation messages.
        this.genericValidator = new GenericValidator(this.validationMessages);
    }

    ngOnInit(): void {
        this.productForm = this.fb.group({
            carName: ['', [Validators.required,
                               Validators.minLength(3),
                               Validators.maxLength(50)]],
            carCode: ['', Validators.required],
            starRating: ['', NumberValidators.range(1, 5)],
            tags: this.fb.array([]),
            description: ''
        });

        // Read the product Id from the route parameter
        this.sub = this.route.params.subscribe(
            params => {
                let id = +params['id'];
                this.getProduct(id);
            }
        );
    }

    ngOnDestroy(): void {
        this.sub.unsubscribe();
    }

    ngAfterViewInit(): void {

      let sss : Observable<ICar>
        // Watch for the blur event from any input element on the form.
        let controlBlurs: Observable<any>[] = this.formInputElements.map((formControl: ElementRef) => fromEvent(formControl.nativeElement, 'blur'))

        // Merge the blur event observable with the valueChanges observable
       merge(this.productForm.valueChanges, ...controlBlurs)
       //Validation
       controlBlurs.forEach(value => value.subscribe(value => {this.displayMessage = this.genericValidator.processMessages(this.productForm)}))
       controlBlurs.forEach(value => debounceTime(800))
    }

    addTag(): void {
        this.tags.push(new FormControl());
    }
    
    deleteTag(index: number): void {
        this.tags.removeAt(index);
        // The line below is required in Angular 4 to fix a bug with `removeAt` that was fixed in Angular 5.
        this.productForm.setControl('tags', this.fb.array(this.tags.value || []));
    }

    getProduct(id: number): void {
        this.productService.getProduct(id)
            .subscribe(
                (product: ICar) => this.onProductRetrieved(product),
                (error: any) => this.errorMessage = <any>error
            );
    }

    onProductRetrieved(product: ICar): void {
        if (this.productForm) {
            this.productForm.reset();
        }
        this.product = product;

        if (this.product.id === 0) {
            this.pageTitle = 'Add Product';
        } else {
            this.pageTitle = `Edit Product: ${this.product.carName}`;
        }

        // Update the data on the form
        this.productForm.patchValue({
            carName: this.product.carName,
            carCode: this.product.carCode,
            starRating: this.product.starRating,
            description: this.product.description
        });
        this.productForm.setControl('tags', this.fb.array(this.product.tags || []));
    }

    deleteProduct(): void {
        if (this.product.id === 0) {
            // Don't delete, it was never saved.
            this.onSaveComplete();
       } else {
            if (confirm(`Really delete the product: ${this.product.carName}?`)) {
                this.productService.deleteProduct(this.product.id)
                    .subscribe(
                        () => this.onSaveComplete(),
                        (error: any) => this.errorMessage = <any>error
                    );
            }
        }
    }

    saveProduct(): void {
        if (this.productForm.dirty && this.productForm.valid) {
            // Copy the form values over the product object values
            let p = Object.assign({}, this.product, this.productForm.value);

            this.productService.saveProduct(p)
                .subscribe(
                    () => this.onSaveComplete(),
                    (error: any) => this.errorMessage = <any>error
                );
        } else if (!this.productForm.dirty) {
            this.onSaveComplete();
        }
    }

    onSaveComplete(): void {
        // Reset the form to clear the flags
        this.productForm.reset();
        this.router.navigate(['/products']);
    }
}
