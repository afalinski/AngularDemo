import { Injectable } from '@angular/core';

import { Observable, of, pipe } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';

import { ICar } from './product';

import { HttpClientModule, HttpClient, HttpHeaders,HttpResponse } from '@angular/common/http'



@Injectable()
export class ProductService {
    private baseUrl = 'api/products';

    constructor(private http: HttpClient) { }

    getProducts(): Observable<ICar[]> {
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this.http.get(this.baseUrl)
        .pipe<ICar[]>
        (
          tap<ICar[]>(data => console.log('getProduct: ' + JSON.stringify(data))),
          catchError(this.handleError)
        )
    }

    getProduct(id: number): Observable<ICar> {
        if (id === 0) {
        return of(this.initializeProduct());
        // return Observable.create((observer: any) => {
        //     observer.next(this.initializeProduct());
        //     observer.complete();
        // });

        };
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        const url = `${this.baseUrl}/${id}`;
        return this.http.get(url, { headers })
        .pipe<ICar>
        (
          tap<ICar>(data => console.log('getProduct: ' + JSON.stringify(data))),
          catchError(this.handleError)
        )
    }

    deleteProduct(id: number): Observable<Response> {
        
        var headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
        const url = `${this.baseUrl}/${id}`;
        return this.http.delete(url, { headers } )
        .pipe<Response>
        (
          tap<Response>(data => console.log('getProduct: ' + JSON.stringify(data))),
          catchError(this.handleError)
        )
    }

    saveProduct(product: ICar): Observable<ICar> {

        if (product.id === 0) {
            return this.createProduct(product );
        }
        return this.updateProduct(product);
    }

    private createProduct(product: ICar): Observable<ICar> {
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });

        product.id = undefined;
        return this.http.post(this.baseUrl, product, { headers })
        .pipe<ICar>
        (
          tap<ICar>(data => console.log('getProduct: ' + JSON.stringify(data))),
          catchError(this.handleError)
        )
    }

    private updateProduct(product: ICar): Observable<ICar> {
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        const url = `${this.baseUrl}/${product.id}`;
        return this.http.put(url, product, { headers })
        .pipe<ICar>
        (
          tap<ICar>(data => console.log('getProduct: ' + JSON.stringify(data))),
          catchError(this.handleError)
        )
    }

      private extractData(response: HttpResponse<any>) {
        let body = response.body.json();
        return body.data || {};
    }
    private handleError(error: Response): Observable<any> {
        // in a real world app, we may send the server to some remote logging infrastructure
        // instead of just logging it to the console
        console.error(error);
        return Observable.throw(error || 'Server error');
    }

    initializeProduct(): ICar {
        // Return an initialized object
        return {
            id: 0,
            carName: null,
            carCode: null,
            releaseDate: null,
            price: null,
            description: null,
            starRating: null,
            imageUrl: null,
            tags: ['']
        };
    }
}
