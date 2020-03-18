# ngx-autounsubscrb

<img src="https://raw.githubusercontent.com/93Alliance/ngx-autounsubscrb/master/src/assets/ngx-autounsubscrb.png" width="750%" height="50%">

Angular 2+ **automatically** **unsubscribe** to the **RXJS** **decorator**, It is **lightweight** and practical!!


## Installation

```
npm i @flywine93/ngx-autounsubscrb --save
```

## Usage

When using this decorator, you must implement the `OnDestroy` method.

 - `@AutoUnsubscrb(options: Options)` --- Unsubscribe member variable and temp variable when destroy.

 eg.
 ```
 import { MAutoAdd, AutoUnsubscrb } from '@flywine93/ngx-autounsubscrb';
 @AutoUnsubscrb()
 @Component({
    selector: 'app-test-cmp',
    templateUrl: './test-cmp.component.html',
    styleUrls: ['./test-cmp.component.css']
 })
 ...
 ```
 or

 ```
 import { MAutoAdd, AutoUnsubscrb } from '@flywine93/ngx-autounsubscrb';
 @AutoUnsubscrb({blackList: ['a']})
 @Component({
    selector: 'app-test-cmp',
    templateUrl: './test-cmp.component.html',
    styleUrls: ['./test-cmp.component.css']
 })
 export class Test implements OnInit, OnDestroy {
     a: Subscription; // don't unsubscribe
 }
 ```
 The `a` member variable will be excluded.

 - `MAutoAdd(target: any, subscrb: any)` --- Unsubscribe temporary variables when destroy.
    - `target`: Class `this`
    - `subscrb`: temporary variable

 eg.
 ```
 import { MAutoAdd, AutoUnsubscrb } from '@flywine93/ngx-autounsubscrb';
 ngOnInit(): void {
    // Manually add to the unsubscribe list through the MAutoAdd function and
    // unsubscribe when the component is destroyed
    MAutoAdd(this, this.observable$.pipe(tap(console.log)).subscribe());
 }
 ```

### Component

eg. [source code](https://github.com/93Alliance/ngx-autounsubscrb/blob/master/src/app/test/test-cmp/test-cmp.component.ts)

```
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, of, Observable, interval } from 'rxjs';
import { tap } from 'rxjs/operators';
import { MAutoAdd, AutoUnsubscrb } from '@flywine93/ngx-autounsubscrb';

@AutoUnsubscrb()
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
```

### Directive

eg. [source code](https://github.com/93Alliance/ngx-autounsubscrb/blob/master/src/app/test/test-dir.directive.ts)

```
import { Directive, OnDestroy } from '@angular/core';
import { AutoUnsubscrb } from '@flywine93/ngx-autounsubscrb';
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
```

### Service

eg. [source code](https://github.com/93Alliance/ngx-autounsubscrb/blob/master/src/app/test/test-prov.service.ts)

```
import { Injectable, OnDestroy } from '@angular/core';
import { AutoUnsubscrb } from '@flywine93/ngx-autounsubscrb';
import { tap } from 'rxjs/operators';
import { Subscription, Observable, interval } from 'rxjs';

@AutoUnsubscrb()
@Injectable()
export class TestProvService implements OnDestroy {

  subscription$$: Subscription; // will unsubscribe
  observable$: Observable<number> = interval(1000); // don't unsubscribe

  constructor() {
    this.subscription$$ = this.observable$.pipe(tap(console.log)).subscribe();
  }

  ngOnDestroy(): void {
    console.log('TestProvService service  destroy!');
  }
}
```

### Options

| Option      | Description                                            | Default Value |
| ----------- | ------------------------------------------------------ | ------------- |
| `checkArrVar` | check member variables of array type, if it is subscription array, will unsubscribe | `false` |
| `blackList` | an array of properties to exclude                      | `[]` |

### Tooltip

Do not create `autoAddList` member variables in component, directive, or service; this will be fixed in a later release.