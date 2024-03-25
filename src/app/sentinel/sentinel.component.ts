import { Component, ElementRef, Output, ViewChild, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-sentinel',
  standalone: true,
  imports: [],
  templateUrl: './sentinel.component.html',
  styleUrl: './sentinel.component.css'
})
export class SentinelComponent {
  @Output() inView = new EventEmitter();
  visible = false;
  observer!: any;
  @ViewChild('sentinel') sentinel!: ElementRef;

  ngAfterViewInit() {
    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if(entry.isIntersecting) {this.inView.emit()}
      }) 
    });
    const target = this.sentinel.nativeElement;
    this.observer.observe(target);
  }

}
