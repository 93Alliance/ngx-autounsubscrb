import { IvyKey } from './constant';
import { isFun } from './util';

export interface Options {
  blackList?: string[];
  checkArrVar?: boolean;
}

const defaultOptions = {
  blackList: [],
  checkArrVar: false
};

/**
 * unsubscribe variable
 * @param member public and private member or temp variable
 */
export function unsubscribe(variable: any, options: Options): void {
  if (variable) {
    if (isFun(variable.unsubscribe)) {
      variable.unsubscribe();
      return;
    }
    // if variable is array type，will check and unsubscribe
    if (options.checkArrVar && Array.isArray(variable)) {
      for (const ele of variable) {
        if (ele && isFun(ele.unsubscribe)) {
          ele.unsubscribe();
        }
      }
    }
  }
}

/**
 * unsubscribe member variable and temp variable when destroy.
 * @param options options
 * 1.blackList---Variables in blacklist are not cancelled
 */
export function AutoUnsubscrb(options: Options = {}) {
  return function(target: any) {
    const original = target.prototype['ngOnDestroy']; // cache original ngOnDestroy function
    if (!isFun(original)) {
      throw new Error(`${target.name} is using @AutoUnsubscrb but does not implement OnDestroy`);
    }
    options = Object.assign(defaultOptions, options);
    target.prototype.autoAddList = []; // Used to cache objects added through MAutoAdd
    target.prototype.ngOnDestroy = function ngOnDestroy() {
      if (isFun(original)) {
        original.apply(this, arguments); // Preserve the original function
      }

      // unsubscribe public and private member variable
      for (const propName in this) {
        if (options.blackList.includes(propName)) {
          continue;
        }
        unsubscribe(this[propName], options);
      }
      // unsubscribe temp variable
      for (const sub of this.autoAddList) {
        unsubscribe(sub, options);
      }
    };
    // Ivy
    if (target.prototype.constructor[IvyKey.cmp]) {
      target.prototype.constructor[IvyKey.cmp].onDestroy = target.prototype.ngOnDestroy;
    } else if (target.prototype.constructor[IvyKey.dir]) {
      target.prototype.constructor[IvyKey.dir].onDestroy = target.prototype.ngOnDestroy;
    }
  };
}

/**
 * Manually add temporary variables and unsubscribe when destroy.
 * @param target Class this keyword
 * @param subscrb Temp variable
 */
export function MAutoAdd(target: any, subscrb: any): void {
  if (target && target.autoAddList) {
    target.autoAddList.push(subscrb);
  }
}
