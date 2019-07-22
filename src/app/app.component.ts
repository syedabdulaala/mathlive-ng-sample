import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import MathLive from 'mathlive';
import convert from 'mathml-to-svg';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {

  @ViewChild('mathField', { static: true })
  mathFieldElement: ElementRef<HTMLDivElement>;

  mathfield: any;
  latex: string;
  mathML: string;
  asciiMath: string;
  svg: string;

  ngAfterViewInit() {
    this.mathfield = MathLive.makeMathField(this.mathFieldElement.nativeElement, {
      onContentDidChange: (mathField) => {
        this.convert();
      }
    });
    MathLive.renderMathInDocument();
  }

  onCmd(latex: string) {
    this.mathfield.$perform([
      'insert',
      latex,
      { focus: true, feedback: true, mode: 'math', format: 'auto', resetStyle: true }
    ]);
    this.convert();
  }

  convert() {
    this.latex = this.mathfield.$text('latex');
    this.mathML = this.mathfield.$text('mathML');
    this.svg = convert(this.mathML);
  }
}
