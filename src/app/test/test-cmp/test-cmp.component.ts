import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, of, Observable, interval, fromEvent } from 'rxjs';
import { tap } from 'rxjs/operators';
import { MAutoAdd, AutoUnsubscrb } from 'ngx-autounsubscrb';


@AutoUnsubscrb({checkArrVar: true})
@Component({
  selector: 'app-test-cmp',
  templateUrl: './test-cmp.component.html',
  styleUrls: ['./test-cmp.component.css']
})
export class TestCmpComponent implements OnInit, OnDestroy {
  // test public member
  a: Subscription; // don't unsubscribe
  b: Subscription; // will unsubscribe

  // test private member
  private c: Subscription; // will unsubscribe

  // test advance usage
  private observable$: Observable<number> = interval(1000);
  subscription$$: Subscription; // will unsubscribe
  subscriptions = [
    interval(1000).subscribe((e) => { console.log('array var0--', e); }),
    interval(1000).subscribe((e) => { console.log('array var1--', e); }),
  ];

  constructor() { }

  ngOnInit(): void {
    this.b = of(1).subscribe(() => { });
    this.c = of(1).subscribe(() => { });
    this.subscription$$ = this.observable$.pipe(tap(console.log)).subscribe();
    // Manually add to the unsubscribe list through the MAutoAdd function and
    // unsubscribe when the component is destroyed
    MAutoAdd(this, this.observable$.pipe(tap(console.log)).subscribe());
  }

  ngOnDestroy(): void {
    console.log('TestCmpComponent component destroy!');
  }
}
