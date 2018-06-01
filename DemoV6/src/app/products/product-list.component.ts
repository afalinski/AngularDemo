import { Component, OnInit } from '@angular/core';

import { ICar } from './product';
import { ProductService } from './product.service';
import {BoldDirective} from './product-imageBoldDirective';

@Component({
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
    pageTitle: string = 'Garage';
    imageWidth: number = 150;
    imageMargin: number = 2;
    showImage: boolean = true;
    errorMessage: string;

    _listFilter: string;
    get listFilter(): string {
        return this._listFilter;
    }
    set listFilter(value: string) {
        this._listFilter = value;
        this.filteredProducts = this.listFilter ? this.performFilter(this.listFilter) : this.products;
    }

    filteredProducts: ICar[];
    products: ICar[] = [];

    constructor(private _productService: ProductService) {

    }

    onRatingClicked(message: string): void {
        this.pageTitle = 'Garage: ' + message;
    }

    performFilter(filterBy: string): ICar[] {
        filterBy = filterBy.toLocaleLowerCase();
        return this.products.filter((product: ICar) =>
              product.carName.toLocaleLowerCase().indexOf(filterBy) !== -1);
    }

    toggleImage(): void {
        this.showImage = !this.showImage;
    }

    ngOnInit(): void {
        this._productService.getProducts()
                .subscribe(products => {
                    this.products = products;
                    this.filteredProducts = this.products;
                },
                    error => this.errorMessage = <any>error);
    }
}
