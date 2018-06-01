import {Directive, ElementRef, Renderer2} from '@angular/core';
 
@Directive({
    selector: '[img]',
	host: {
		'(mouseenter)': 'onMouseEnter()',
		'(mouseleave)': 'onMouseLeave()'
	}
})
export class BoldDirective{
     
    constructor(private element: ElementRef, private renderer: Renderer2){
         
        this.renderer.setStyle(this.element.nativeElement, "cursor", "pointer");
    }
	
	onMouseEnter(){
		this.setFontWeight(2000);
	}
	onMouseLeave(){
		this.setFontWeight(100);
	}
	private setFontWeight(val: number) {
        this.renderer.setStyle(this.element.nativeElement, "weight", val);
    }
}