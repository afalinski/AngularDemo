import { NgModule, Component } from '@angular/core';
import {ReactiveFormsModule } from '@angular/forms'
import { RouterModule } from '@angular/router';
import {Http, Response, Headers, RequestOptions} from '@angular/http';

import { HttpInMemoryWebApiModule, InMemoryWebApiModule } from 'angular-in-memory-web-api';

import { ProductListComponent } from './product-list.component';
import { ProductDetailComponent } from './product-detail.component';
import { ConvertToSpacesPipe } from '../shared/convert-to-spaces.pipe';
import { ProductData } from './car-data';
import { ProductGuardService } from './product-guard.service';
import { ProductService } from './product.service';
import { SharedModule } from './../shared/shared.module';
import { ProductEditComponent } from './product-edit.component';

@NgModule({
  imports: [
    SharedModule,
    InMemoryWebApiModule.forRoot(ProductData),
    ReactiveFormsModule,
    RouterModule.forChild([
        { path: 'products', component: ProductListComponent },
        { path: 'products/:id',
          canActivate: [ ProductGuardService ],
          component: ProductDetailComponent },
          {
            path:'productEdit/:id',
            component: ProductEditComponent
            
          }
    ]),
    SharedModule
  ],
  declarations: [
    ProductListComponent,
    ProductDetailComponent,
    ConvertToSpacesPipe,
    ProductEditComponent
  ],
  providers: [
    ProductService,
    ProductGuardService
  ]
})
export class ProductModule { }
