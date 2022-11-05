import {
  AfterContentChecked,
  AfterContentInit, AfterViewChecked,
  AfterViewInit, ChangeDetectorRef,
  Component,
  DoCheck,
  ElementRef,
  Input,
  OnChanges, OnDestroy,
  OnInit,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import {ChildComponent} from "../child/child.component";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent
  implements OnChanges, OnInit, DoCheck, AfterContentInit, AfterContentChecked,  AfterViewInit, AfterViewChecked, OnDestroy {
  @Input()
  value = 'first';

  @ViewChild('ipt')
  ipt: ElementRef;

  @ViewChild(ChildComponent)
  child: ChildComponent;

  constructor(private changeDetectorRef: ChangeDetectorRef) {
    console.log('1. constructor');
    console.log('\t', this.value);
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('2. OnChanges');
    console.log('\t', this.value);
    console.log('\t', changes);
  }

  ngOnInit(): void {
    console.log('3. ngOnInit');
    console.log('\t', this.value);
  }

  ngDoCheck(): void {
    console.log('4. ngDoCheck');
    console.log('\t', this.value);

  }

  ngAfterContentInit(): void {
    console.log('4.1. ngAfterContentInit');
  }

  ngAfterContentChecked(): void {
    console.log('4.2. ngAfterContentChecked');
  }

  ngAfterViewInit(): void {
    console.log('4.3. ngAfterViewInit');
    console.log(this.ipt.nativeElement);
    this.child.sayHello();
    this.child.name = 'Olha';
    this.changeDetectorRef.detectChanges();
  }

  ngAfterViewChecked(): void {
    console.log('4.4. ngAfterViewChecked');
  }

  ngOnDestroy(): void {
    console.log('6. ngOnDestroy');
  }

  changeValue(): void {
    console.log(this.ipt.nativeElement.value);
    this.child.name = this.ipt.nativeElement.value;
  }
}
