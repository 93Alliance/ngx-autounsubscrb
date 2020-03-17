import { IvyKey } from './constant';
import { isFun } from './util';


/**
 * unsubscribe variable
 * @param member public and private member or temp variable
 */
function unsubscribe(member: any): void {
  if (member && isFun(member.unsubscribe)) {
    member.unsubscribe();
  }
}

/**
 * unsubscribe member variable and temp variable when destroy.
 * @param options options
 * 1.blackList---Variables in blacklist are not cancelled
 */
export function AutoUnsubscrb(options = { blackList: [] }) {
  return function(target: any) {
    const original = target.prototype['ngOnDestroy']; // cache original ngOnDestroy function
    if (!isFun(original)) {
      throw new Error(`${target.name} is using @AutoUnsubscrb but does not implement OnDestroy`);
    }
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
        unsubscribe(this[propName]);
      }
      // unsubscribe temp variable
      for (const sub of this.autoAddList) {
        unsubscribe(sub);
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
