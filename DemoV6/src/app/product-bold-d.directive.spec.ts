import { ProductBoldDDirective } from './product-bold-d.directive';
import { ElementRef, Renderer2 } from '@angular/core';
var element: ElementRef;
var renderer: Renderer2;

describe('ProductBoldDDirective', () => {
  it('should create an instance', () => {
    const directive = new ProductBoldDDirective(element,renderer);
    expect(directive).toBeTruthy();
  });
});
