import { Directive, OnDestroy } from '@angular/core';
import { AutoUnsubscrb } from 'ngx-autounsubscrb';
import { tap } from 'rxjs/operators';
import { Subscription, Observable, interval } from 'rxjs';

@AutoUnsubscrb()
@Directive({
  selector: '[appTestDir]'
})
export class TestDirDirective implements OnDestroy {

  subscription$$: Subscription; // will unsubscribe
  observable$: Observable<number> = interval(1000); // don't unsubscribe

  constructor() {
    this.subscription$$ = this.observable$.pipe(tap(console.log)).subscribe();
  }

  ngOnDestroy(): void {
    console.log('TestDirDirective directive  destroy!');
  }
}
