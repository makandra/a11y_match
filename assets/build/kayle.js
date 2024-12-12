(() => {
  // node_modules/@siteimprove/alfa-clone/dist/clone.js
  var Clone;
  (function(Clone2) {
    function clone(value) {
      return value.clone();
    }
    Clone2.clone = clone;
  })(Clone || (Clone = {}));

  // node_modules/@siteimprove/alfa-equatable/dist/equatable.js
  var Equatable;
  (function(Equatable2) {
    function isFunction7(value) {
      return typeof value === "function";
    }
    function isObject7(value) {
      return typeof value === "object" && value !== null;
    }
    function isEquatable(value) {
      return isObject7(value) && isFunction7(value.equals);
    }
    Equatable2.isEquatable = isEquatable;
    function equals2(a, b) {
      if (a === b || // `NaN` is the only value in JavaScript that is not equal to itself.
      a !== a && b !== b) {
        return true;
      }
      if (isEquatable(a)) {
        return a.equals(b);
      }
      if (isEquatable(b)) {
        return b.equals(a);
      }
      return false;
    }
    Equatable2.equals = equals2;
  })(Equatable || (Equatable = {}));

  // node_modules/@siteimprove/alfa-predicate/dist/predicate.js
  var Predicate;
  (function(Predicate2) {
    function test5(predicate, value, ...args) {
      return predicate(value, ...args);
    }
    Predicate2.test = test5;
    function fold(predicate, ifTrue, ifFalse, value, ...args) {
      return predicate(value, ...args) ? ifTrue(value) : ifFalse(value);
    }
    Predicate2.fold = fold;
    function not11(predicate) {
      return (value, ...args) => !predicate(value, ...args);
    }
    Predicate2.not = not11;
    function and(...predicates) {
      return (value, ...args) => {
        for (let i = 0, n = predicates.length; i < n; i++) {
          if (!predicates[i](value, ...args)) {
            return false;
          }
        }
        return true;
      };
    }
    Predicate2.and = and;
    function or(...predicates) {
      return (value, ...args) => {
        for (let i = 0, n = predicates.length; i < n; i++) {
          if (predicates[i](value, ...args)) {
            return true;
          }
        }
        return false;
      };
    }
    Predicate2.or = or;
    function xor(...predicates) {
      return and(or(...predicates), not11(and(...predicates)));
    }
    Predicate2.xor = xor;
    function nor(...predicates) {
      return not11(or(...predicates));
    }
    Predicate2.nor = nor;
    function nand(...predicates) {
      return not11(and(...predicates));
    }
    Predicate2.nand = nand;
    function equals2(...values) {
      return (other) => values.some((value) => Equatable.equals(other, value));
    }
    Predicate2.equals = equals2;
    function property(property2, predicate) {
      return (value, ...args) => predicate(value[property2], ...args);
    }
    Predicate2.property = property;
    function tee(predicate, callback) {
      return (value, ...args) => {
        const result = predicate(value, ...args);
        callback(value, result, ...args);
        return result;
      };
    }
    Predicate2.tee = tee;
  })(Predicate || (Predicate = {}));

  // node_modules/@siteimprove/alfa-refinement/dist/refinement.js
  var Refinement;
  (function(Refinement2) {
    Refinement2.test = Predicate.test;
    Refinement2.fold = Predicate.fold;
    Refinement2.not = Predicate.not;
    Refinement2.and = Predicate.and;
    Refinement2.or = Predicate.or;
    Refinement2.xor = Predicate.xor;
    Refinement2.nor = Predicate.nor;
    Refinement2.nand = Predicate.nand;
    Refinement2.equals = Predicate.equals;
    Refinement2.tee = Predicate.tee;
    function isString3(value) {
      return typeof value === "string";
    }
    Refinement2.isString = isString3;
    function isNumber3(value) {
      return typeof value === "number";
    }
    Refinement2.isNumber = isNumber3;
    function isBigInt2(value) {
      return typeof value === "bigint";
    }
    Refinement2.isBigInt = isBigInt2;
    function isBoolean4(value) {
      return typeof value === "boolean";
    }
    Refinement2.isBoolean = isBoolean4;
    function isNull2(value) {
      return value === null;
    }
    Refinement2.isNull = isNull2;
    function isUndefined(value) {
      return value === void 0;
    }
    Refinement2.isUndefined = isUndefined;
    function isSymbol(value) {
      return typeof value === "symbol";
    }
    Refinement2.isSymbol = isSymbol;
    function isFunction7(value) {
      return typeof value === "function";
    }
    Refinement2.isFunction = isFunction7;
    function isObject7(value) {
      return typeof value === "object" && value !== null;
    }
    Refinement2.isObject = isObject7;
    Refinement2.isPrimitive = Refinement2.or(isString3, Refinement2.or(isNumber3, Refinement2.or(isBigInt2, Refinement2.or(isBoolean4, Refinement2.or(isNull2, Refinement2.or(isUndefined, isSymbol))))));
  })(Refinement || (Refinement = {}));

  // node_modules/@siteimprove/alfa-comparable/dist/comparison.js
  var Comparison;
  (function(Comparison2) {
    Comparison2[Comparison2["Less"] = -1] = "Less";
    Comparison2[Comparison2["Equal"] = 0] = "Equal";
    Comparison2[Comparison2["Greater"] = 1] = "Greater";
  })(Comparison || (Comparison = {}));

  // node_modules/@siteimprove/alfa-comparable/dist/comparable.js
  var { isString, isNumber, isBigInt, isBoolean, isFunction, isObject } = Refinement;
  var Comparable;
  (function(Comparable2) {
    function isComparable(value) {
      return isObject(value) && isFunction(value.compare);
    }
    Comparable2.isComparable = isComparable;
    function compare(a, b) {
      if (isString(a)) {
        return compareString(a, b);
      }
      if (isNumber(a)) {
        return compareNumber(a, b);
      }
      if (isBigInt(a)) {
        return compareBigInt(a, b);
      }
      if (isBoolean(a)) {
        return compareBoolean(a, b);
      }
      return compareComparable7(a, b);
    }
    Comparable2.compare = compare;
    function compareString(a, b) {
      return comparePrimitive(a, b);
    }
    Comparable2.compareString = compareString;
    function compareNumber(a, b) {
      return comparePrimitive(a, b);
    }
    Comparable2.compareNumber = compareNumber;
    function compareBigInt(a, b) {
      return comparePrimitive(a, b);
    }
    Comparable2.compareBigInt = compareBigInt;
    function compareBoolean(a, b) {
      return comparePrimitive(a, b);
    }
    Comparable2.compareBoolean = compareBoolean;
    function compareComparable7(a, b) {
      return a.compare(b);
    }
    Comparable2.compareComparable = compareComparable7;
    function comparePrimitive(a, b) {
      if (a < b) {
        return Comparison.Less;
      }
      if (a > b) {
        return Comparison.Greater;
      }
      return Comparison.Equal;
    }
    function compareLexicographically(a, b, comparer) {
      for (let i = 0; i < a.length; i++) {
        const comparison = comparer[i](a[i], b[i]);
        if (comparison === Comparison.Equal) {
          continue;
        }
        return comparison;
      }
      return Comparison.Equal;
    }
    Comparable2.compareLexicographically = compareLexicographically;
    function isLessThan(a, b) {
      return a.compare(b) < 0;
    }
    Comparable2.isLessThan = isLessThan;
    function isLessThanOrEqual(a, b) {
      return a.compare(b) <= 0;
    }
    Comparable2.isLessThanOrEqual = isLessThanOrEqual;
    function isEqual(a, b) {
      return a.compare(b) === 0;
    }
    Comparable2.isEqual = isEqual;
    function isGreaterThan(a, b) {
      return a.compare(b) > 0;
    }
    Comparable2.isGreaterThan = isGreaterThan;
    function isGreaterThanOrEqual(a, b) {
      return a.compare(b) >= 0;
    }
    Comparable2.isGreaterThanOrEqual = isGreaterThanOrEqual;
  })(Comparable || (Comparable = {}));

  // node_modules/@siteimprove/alfa-json/dist/builtin.js
  var Builtin = JSON;

  // node_modules/@siteimprove/alfa-json/dist/json.js
  var JSON2;
  (function(JSON3) {
    function parse(value) {
      return Builtin.parse(value);
    }
    JSON3.parse = parse;
    function stringify(value) {
      return Builtin.stringify(value);
    }
    JSON3.stringify = stringify;
  })(JSON2 || (JSON2 = {}));

  // node_modules/@siteimprove/alfa-json/dist/serializable.js
  var { keys } = Object;
  var { isArray } = Array;
  var { isFunction: isFunction2, isObject: isObject2, isString: isString2, isNumber: isNumber2, isBoolean: isBoolean2, isNull } = Refinement;
  var Serializable;
  (function(Serializable4) {
    function isSerializable(value) {
      return isObject2(value) && isFunction2(value.toJSON);
    }
    Serializable4.isSerializable = isSerializable;
    function toJSON(value, options) {
      if (isSerializable(value)) {
        return value.toJSON(options);
      }
      if (isString2(value) || isNumber2(value) || isBoolean2(value) || isNull(value)) {
        return value;
      }
      if (isArray(value)) {
        return value.map((item) => toJSON(item, options));
      }
      if (isObject2(value)) {
        const json = {};
        for (const key of keys(value)) {
          if (value[key] !== void 0) {
            json[key] = toJSON(value[key], options);
          }
        }
        return json;
      }
      return null;
    }
    Serializable4.toJSON = toJSON;
    let Verbosity;
    (function(Verbosity2) {
      Verbosity2[Verbosity2["Minimal"] = 0] = "Minimal";
      Verbosity2[Verbosity2["Low"] = 100] = "Low";
      Verbosity2[Verbosity2["Medium"] = 200] = "Medium";
      Verbosity2[Verbosity2["High"] = 300] = "High";
    })(Verbosity = Serializable4.Verbosity || (Serializable4.Verbosity = {}));
  })(Serializable || (Serializable = {}));

  // node_modules/@siteimprove/alfa-option/dist/none.js
  var { compareComparable } = Comparable;
  var None = new class None2 {
    isSome() {
      return false;
    }
    isNone() {
      return true;
    }
    map() {
      return this;
    }
    forEach() {
      return;
    }
    apply() {
      return this;
    }
    flatMap() {
      return this;
    }
    flatten() {
      return this;
    }
    reduce(reducer, accumulator) {
      return accumulator;
    }
    filter() {
      return this;
    }
    reject() {
      return this;
    }
    includes() {
      return false;
    }
    some() {
      return false;
    }
    none() {
      return true;
    }
    every() {
      return true;
    }
    and() {
      return this;
    }
    andThen() {
      return this;
    }
    or(option) {
      return option;
    }
    orElse(option) {
      return option();
    }
    /**
     * @internal
     */
    getUnsafe(message = "Attempted to .getUnsafe() from None") {
      throw new Error(message);
    }
    getOr(value) {
      return value;
    }
    getOrElse(value) {
      return value();
    }
    tee() {
      return this;
    }
    compare(option) {
      return this.compareWith(option, compareComparable);
    }
    compareWith(option) {
      return option.isNone() ? Comparison.Equal : Comparison.Less;
    }
    equals(value) {
      return value instanceof None2;
    }
    hash(hash2) {
      hash2.writeBoolean(false);
    }
    *[Symbol.iterator]() {
    }
    toArray() {
      return [];
    }
    toJSON() {
      return {
        type: "none"
      };
    }
    toString() {
      return "None";
    }
  }();

  // node_modules/@siteimprove/alfa-option/dist/some.js
  var { not, test } = Predicate;
  var { compareComparable: compareComparable2 } = Comparable;
  var Some = class _Some {
    static of(value) {
      return new _Some(value);
    }
    _value;
    constructor(value) {
      this._value = value;
    }
    isSome() {
      return true;
    }
    isNone() {
      return false;
    }
    map(mapper) {
      return new _Some(mapper(this._value));
    }
    forEach(mapper) {
      mapper(this._value);
    }
    apply(mapper) {
      return mapper.map((mapper2) => mapper2(this._value));
    }
    flatMap(mapper) {
      return mapper(this._value);
    }
    flatten() {
      return this._value;
    }
    reduce(reducer, accumulator) {
      return reducer(accumulator, this._value);
    }
    filter(predicate) {
      return test(predicate, this._value) ? this : None;
    }
    reject(predicate) {
      return this.filter(not(predicate));
    }
    includes(value) {
      return Equatable.equals(value, this._value);
    }
    some(predicate) {
      return test(predicate, this._value);
    }
    none(predicate) {
      return test(not(predicate), this._value);
    }
    every(predicate) {
      return test(predicate, this._value);
    }
    and(option) {
      return option;
    }
    andThen(option) {
      return option(this._value);
    }
    or() {
      return this;
    }
    orElse() {
      return this;
    }
    get() {
      return this._value;
    }
    /**
     * @internal
     */
    getUnsafe() {
      return this._value;
    }
    getOr() {
      return this._value;
    }
    getOrElse() {
      return this._value;
    }
    tee(callback) {
      callback(this._value);
      return this;
    }
    compare(option) {
      return this.compareWith(option, compareComparable2);
    }
    compareWith(option, comparer) {
      return option.isSome() ? comparer(this._value, option._value) : Comparison.Greater;
    }
    equals(value) {
      return value instanceof _Some && Equatable.equals(value._value, this._value);
    }
    hash(hash2) {
      hash2.writeBoolean(true).writeUnknown(this._value);
    }
    *[Symbol.iterator]() {
      yield this._value;
    }
    toArray() {
      return [this._value];
    }
    toJSON(options) {
      return {
        type: "some",
        value: Serializable.toJSON(this._value, options)
      };
    }
    toString() {
      return `Some { ${this._value} }`;
    }
  };
  (function(Some2) {
    function isSome(value) {
      return value instanceof Some2;
    }
    Some2.isSome = isSome;
  })(Some || (Some = {}));

  // node_modules/@siteimprove/alfa-option/dist/option.js
  var Option;
  (function(Option2) {
    function isOption2(value) {
      return isSome(value) || isNone(value);
    }
    Option2.isOption = isOption2;
    function isSome(value) {
      return Some.isSome(value);
    }
    Option2.isSome = isSome;
    function isNone(value) {
      return value === None;
    }
    Option2.isNone = isNone;
    function of(value) {
      return Some.of(value);
    }
    Option2.of = of;
    function empty() {
      return None;
    }
    Option2.empty = empty;
    function from(value) {
      return value === null || value === void 0 ? None : Some.of(value);
    }
    Option2.from = from;
    function conditional(value, predicate) {
      return predicate(value) ? Some.of(value) : None;
    }
    Option2.conditional = conditional;
  })(Option || (Option = {}));

  // node_modules/@siteimprove/alfa-option/dist/maybe.js
  var Maybe;
  (function(Maybe2) {
    function toOption(maybe) {
      return Option.isOption(maybe) ? maybe : Option.of(maybe);
    }
    Maybe2.toOption = toOption;
  })(Maybe || (Maybe = {}));

  // node_modules/@siteimprove/alfa-iterable/dist/iterable.js
  var { not: not2 } = Predicate;
  var { isObject: isObject3 } = Refinement;
  var { compareComparable: compareComparable3 } = Comparable;
  var Iterable;
  (function(Iterable2) {
    function isIterable(value) {
      return isObject3(value) && Symbol.iterator in value;
    }
    Iterable2.isIterable = isIterable;
    function* empty() {
    }
    Iterable2.empty = empty;
    function* from(arrayLike) {
      for (let i = 0, n = arrayLike.length; i < n; i++) {
        yield arrayLike[i];
      }
    }
    Iterable2.from = from;
    function size(iterable) {
      return reduce2(iterable, (size2) => size2 + 1, 0);
    }
    Iterable2.size = size;
    function isEmpty(iterable) {
      for (const _ of iterable) {
        return false;
      }
      return true;
    }
    Iterable2.isEmpty = isEmpty;
    function forEach(iterable, callback) {
      let index = 0;
      for (const value of iterable) {
        callback(value, index++);
      }
    }
    Iterable2.forEach = forEach;
    function* map(iterable, mapper) {
      let index = 0;
      for (const value of iterable) {
        yield mapper(value, index++);
      }
    }
    Iterable2.map = map;
    function* flatMap(iterable, mapper) {
      let index = 0;
      for (const value of iterable) {
        yield* mapper(value, index++);
      }
    }
    Iterable2.flatMap = flatMap;
    function* flatten2(iterable) {
      for (const value of iterable) {
        yield* value;
      }
    }
    Iterable2.flatten = flatten2;
    function reduce2(iterable, reducer, accumulator) {
      let index = 0;
      for (const value of iterable) {
        accumulator = reducer(accumulator, value, index++);
      }
      return accumulator;
    }
    Iterable2.reduce = reduce2;
    function reduceWhile(iterable, predicate, reducer, accumulator) {
      let index = 0;
      for (const value of iterable) {
        if (predicate(value, index)) {
          accumulator = reducer(accumulator, value, index++);
        } else {
          break;
        }
      }
      return accumulator;
    }
    Iterable2.reduceWhile = reduceWhile;
    function reduceUntil(iterable, predicate, reducer, accumulator) {
      return reduceWhile(iterable, not2(predicate), reducer, accumulator);
    }
    Iterable2.reduceUntil = reduceUntil;
    function apply(iterable, mapper) {
      return flatMap(mapper, (mapper2) => map(iterable, mapper2));
    }
    Iterable2.apply = apply;
    function* filter(iterable, predicate) {
      let index = 0;
      for (const value of iterable) {
        if (predicate(value, index++)) {
          yield value;
        }
      }
    }
    Iterable2.filter = filter;
    function reject(iterable, predicate) {
      return filter(iterable, not2(predicate));
    }
    Iterable2.reject = reject;
    function find(iterable, predicate) {
      let index = 0;
      for (const value of iterable) {
        if (predicate(value, index++)) {
          return Option.of(value);
        }
      }
      return None;
    }
    Iterable2.find = find;
    function findLast(iterable, predicate) {
      let index = 0;
      let result = None;
      for (const value of iterable) {
        if (predicate(value, index++)) {
          result = Option.of(value);
        }
      }
      return result;
    }
    Iterable2.findLast = findLast;
    function includes(iterable, value) {
      return some(iterable, Predicate.equals(value));
    }
    Iterable2.includes = includes;
    function collect(iterable, mapper) {
      return flatMap(iterable, mapper);
    }
    Iterable2.collect = collect;
    function collectFirst(iterable, mapper) {
      return first(collect(iterable, mapper));
    }
    Iterable2.collectFirst = collectFirst;
    function some(iterable, predicate) {
      let index = 0;
      for (const value of iterable) {
        if (predicate(value, index++)) {
          return true;
        }
      }
      return false;
    }
    Iterable2.some = some;
    function none(iterable, predicate) {
      return every(iterable, not2(predicate));
    }
    Iterable2.none = none;
    function every(iterable, predicate) {
      let index = 0;
      for (const value of iterable) {
        if (!predicate(value, index++)) {
          return false;
        }
      }
      return true;
    }
    Iterable2.every = every;
    function count(iterable, predicate) {
      return reduce2(iterable, (count2, value, index) => predicate(value, index) ? count2 + 1 : count2, 0);
    }
    Iterable2.count = count;
    function* distinct(iterable) {
      const seen = [];
      for (const value of iterable) {
        if (seen.some(Predicate.equals(value))) {
          continue;
        }
        seen.push(value);
        yield value;
      }
    }
    Iterable2.distinct = distinct;
    function get(iterable, index) {
      return index < 0 ? None : first(skip3(iterable, index));
    }
    Iterable2.get = get;
    function has(iterable, index) {
      return index < 0 ? false : !isEmpty(skip3(iterable, index));
    }
    Iterable2.has = has;
    function* set2(iterable, index, value) {
      const it = iterator(iterable);
      while (index-- > 0) {
        const next2 = it.next();
        if (next2.done === true) {
          return;
        }
        yield next2.value;
      }
      const next = it.next();
      if (next.done === true) {
        return;
      }
      yield value;
      while (true) {
        const next2 = it.next();
        if (next2.done === true) {
          return;
        }
        yield next2.value;
      }
    }
    Iterable2.set = set2;
    function* insert2(iterable, index, value) {
      const it = iterator(iterable);
      while (index-- > 0) {
        const next = it.next();
        if (next.done === true) {
          return;
        }
        yield next.value;
      }
      yield value;
      while (true) {
        const next = it.next();
        if (next.done === true) {
          return;
        }
        yield next.value;
      }
    }
    Iterable2.insert = insert2;
    function* append(iterable, value) {
      yield* iterable;
      yield value;
    }
    Iterable2.append = append;
    function* prepend(iterable, value) {
      yield value;
      yield* iterable;
    }
    Iterable2.prepend = prepend;
    function* concat(iterable, ...iterables) {
      yield* iterable;
      for (const iterable2 of iterables) {
        yield* iterable2;
      }
    }
    Iterable2.concat = concat;
    function subtract(iterable, ...iterables) {
      return reject(iterable, (value) => includes(flatten2(iterables), value));
    }
    Iterable2.subtract = subtract;
    function intersect(iterable, ...iterables) {
      return filter(iterable, (value) => includes(flatten2(iterables), value));
    }
    Iterable2.intersect = intersect;
    function* zip(a, b) {
      const itA = iterator(a);
      const itB = iterator(b);
      while (true) {
        const a2 = itA.next();
        const b2 = itB.next();
        if (a2.done === true || b2.done === true) {
          return;
        }
        yield [a2.value, b2.value];
      }
    }
    Iterable2.zip = zip;
    function first(iterable) {
      for (const value of iterable) {
        return Option.of(value);
      }
      return None;
    }
    Iterable2.first = first;
    function last(iterable) {
      let last2 = null;
      for (const value of iterable) {
        last2 = value;
      }
      return Option.from(last2);
    }
    Iterable2.last = last;
    function* take3(iterable, count2) {
      const it = iterator(iterable);
      while (count2-- > 0) {
        const next = it.next();
        if (next.done === true) {
          return;
        }
        yield next.value;
      }
    }
    Iterable2.take = take3;
    function* takeWhile(iterable, predicate) {
      let index = 0;
      for (const value of iterable) {
        if (predicate(value, index++)) {
          yield value;
        } else {
          break;
        }
      }
    }
    Iterable2.takeWhile = takeWhile;
    function takeUntil(iterable, predicate) {
      return takeWhile(iterable, not2(predicate));
    }
    Iterable2.takeUntil = takeUntil;
    function* takeLast(iterable, count2 = 1) {
      if (count2 <= 0) {
        return;
      }
      const last2 = [];
      for (const value of iterable) {
        last2.push(value);
        if (last2.length > count2) {
          last2.shift();
        }
      }
      yield* last2;
    }
    Iterable2.takeLast = takeLast;
    function* takeLastWhile(iterable, predicate) {
      const values = [...iterable];
      let last2 = values.length - 1;
      while (last2 >= 0) {
        if (predicate(values[last2], last2)) {
          last2--;
        } else {
          break;
        }
      }
      for (let i = last2, n = values.length - 1; i < n; i++) {
        yield values[i];
      }
    }
    Iterable2.takeLastWhile = takeLastWhile;
    function takeLastUntil(iterable, predicate) {
      return takeLastWhile(iterable, not2(predicate));
    }
    Iterable2.takeLastUntil = takeLastUntil;
    function* skip3(iterable, count2) {
      const it = iterator(iterable);
      while (count2-- > 0) {
        const next = it.next();
        if (next.done === true) {
          return;
        }
      }
      while (true) {
        const next = it.next();
        if (next.done === true) {
          return;
        }
        yield next.value;
      }
    }
    Iterable2.skip = skip3;
    function* skipWhile(iterable, predicate) {
      let index = 0;
      let skipped = false;
      for (const value of iterable) {
        if (!skipped && predicate(value, index++)) {
          continue;
        } else {
          skipped = true;
          yield value;
        }
      }
    }
    Iterable2.skipWhile = skipWhile;
    function skipUntil(iterable, predicate) {
      return skipWhile(iterable, not2(predicate));
    }
    Iterable2.skipUntil = skipUntil;
    function* skipLast(iterable, count2 = 1) {
      const it = iterator(iterable);
      const first2 = [];
      while (count2-- > 0) {
        const next = it.next();
        if (next.done === true) {
          return;
        }
        first2.push(next.value);
      }
      while (true) {
        const next = it.next();
        if (next.done === true) {
          return;
        }
        first2.push(next.value);
        yield first2.shift();
      }
    }
    Iterable2.skipLast = skipLast;
    function* skipLastWhile(iterable, predicate) {
      const values = [...iterable];
      let last2 = values.length - 1;
      while (last2 >= 0) {
        if (predicate(values[last2], last2)) {
          last2--;
        } else {
          break;
        }
      }
      for (let i = 0, n = last2; i < n; i++) {
        yield values[i];
      }
    }
    Iterable2.skipLastWhile = skipLastWhile;
    function skipLastUntil(iterable, predicate) {
      return skipLastWhile(iterable, not2(predicate));
    }
    Iterable2.skipLastUntil = skipLastUntil;
    function trim(iterable, predicate) {
      return trimTrailing(trimLeading(iterable, predicate), predicate);
    }
    Iterable2.trim = trim;
    function trimLeading(iterable, predicate) {
      return skipWhile(iterable, predicate);
    }
    Iterable2.trimLeading = trimLeading;
    function trimTrailing(iterable, predicate) {
      return skipLastWhile(iterable, predicate);
    }
    Iterable2.trimTrailing = trimTrailing;
    function rest(iterable) {
      return skip3(iterable, 1);
    }
    Iterable2.rest = rest;
    function slice(iterable, start, end) {
      iterable = skip3(iterable, start);
      if (end !== void 0) {
        iterable = take3(iterable, end - start);
      }
      return iterable;
    }
    Iterable2.slice = slice;
    function* reverse(iterable) {
      const array = Array.from(iterable);
      for (let i = array.length - 1; i >= 0; i--) {
        yield array[i];
      }
    }
    Iterable2.reverse = reverse;
    function join(iterable, separator) {
      const it = iterator(iterable);
      let next = it.next();
      if (next.done === true) {
        return "";
      }
      let result = `${next.value}`;
      next = it.next();
      while (next.done !== true) {
        result += `${separator}${next.value}`;
        next = it.next();
      }
      return result;
    }
    Iterable2.join = join;
    function sort(iterable) {
      return sortWith(iterable, compareComparable3);
    }
    Iterable2.sort = sort;
    function* sortWith(iterable, comparer) {
      yield* [...iterable].sort(comparer);
    }
    Iterable2.sortWith = sortWith;
    function compare(a, b) {
      return compareWith(a, b, compareComparable3);
    }
    Iterable2.compare = compare;
    function compareWith(a, b, comparer) {
      const itA = iterator(a);
      const itB = iterator(b);
      let index = 0;
      while (true) {
        const a2 = itA.next();
        const b2 = itB.next();
        if (a2.done === true) {
          return b2.done === true ? Comparison.Equal : Comparison.Less;
        }
        if (b2.done === true) {
          return Comparison.Greater;
        }
        const result = comparer(a2.value, b2.value, index++);
        if (result !== 0) {
          return result;
        }
      }
    }
    Iterable2.compareWith = compareWith;
    function equals2(a, b) {
      const itA = iterator(a);
      const itB = iterator(b);
      while (true) {
        const a2 = itA.next();
        const b2 = itB.next();
        if (a2.done === true) {
          return b2.done === true;
        }
        if (b2.done === true || !Equatable.equals(a2.value, b2.value)) {
          return false;
        }
      }
    }
    Iterable2.equals = equals2;
    function hash2(iterable, hash3) {
      let size2 = 0;
      for (const value of iterable) {
        hash3.writeUnknown(value);
        size2++;
      }
      hash3.writeUint32(size2);
    }
    Iterable2.hash = hash2;
    function iterator(iterable) {
      return iterable[Symbol.iterator]();
    }
    Iterable2.iterator = iterator;
    function groupBy(iterable, grouper) {
      const groups = [];
      let index = 0;
      for (const value of iterable) {
        const group = grouper(value, index++);
        const existing = groups.find(([existing2]) => Equatable.equals(group, existing2));
        if (existing === void 0) {
          groups.push([group, [value]]);
        } else {
          existing[1].push(value);
        }
      }
      return groups;
    }
    Iterable2.groupBy = groupBy;
    function toJSON(iterable, options) {
      return [...map(iterable, (value) => Serializable.toJSON(value, options))];
    }
    Iterable2.toJSON = toJSON;
  })(Iterable || (Iterable = {}));

  // node_modules/@siteimprove/alfa-array/dist/builtin.js
  var Builtin2 = Array;

  // node_modules/@siteimprove/alfa-array/dist/array.js
  var { not: not3 } = Predicate;
  var { compareComparable: compareComparable4 } = Comparable;
  var Array2;
  (function(Array3) {
    function isArray2(value) {
      return Builtin2.isArray(value);
    }
    Array3.isArray = isArray2;
    function of(...values) {
      return values;
    }
    Array3.of = of;
    function empty() {
      return [];
    }
    Array3.empty = empty;
    function allocate(capacity) {
      return new Builtin2(capacity);
    }
    Array3.allocate = allocate;
    function from(iterable) {
      if (isArray2(iterable)) {
        return iterable;
      }
      return [...iterable];
    }
    Array3.from = from;
    function size(array) {
      return array.length;
    }
    Array3.size = size;
    function isEmpty(array) {
      return array.length === 0;
    }
    Array3.isEmpty = isEmpty;
    function copy(array) {
      return array.slice(0);
    }
    Array3.copy = copy;
    function clone(array) {
      return array.map(Clone.clone);
    }
    Array3.clone = clone;
    function forEach(array, callback) {
      for (let i = 0, n = array.length; i < n; i++) {
        callback(array[i], i);
      }
    }
    Array3.forEach = forEach;
    function map(array, mapper) {
      const result = new Builtin2(array.length);
      for (let i = 0, n = array.length; i < n; i++) {
        result[i] = mapper(array[i], i);
      }
      return result;
    }
    Array3.map = map;
    function flatMap(array, mapper) {
      const result = empty();
      for (let i = 0, n = array.length; i < n; i++) {
        result.push(...mapper(array[i], i));
      }
      return result;
    }
    Array3.flatMap = flatMap;
    function flatten2(array) {
      return flatMap(array, (array2) => array2);
    }
    Array3.flatten = flatten2;
    function reduce2(array, reducer, accumulator) {
      for (let i = 0, n = array.length; i < n; i++) {
        accumulator = reducer(accumulator, array[i], i);
      }
      return accumulator;
    }
    Array3.reduce = reduce2;
    function reduceWhile(array, predicate, reducer, accumulator) {
      for (let i = 0, n = array.length; i < n; i++) {
        const value = array[i];
        if (predicate(value, i)) {
          accumulator = reducer(accumulator, value, i);
        } else {
          break;
        }
      }
      return accumulator;
    }
    Array3.reduceWhile = reduceWhile;
    function reduceUntil(array, predicate, reducer, accumulator) {
      return reduceWhile(array, not3(predicate), reducer, accumulator);
    }
    Array3.reduceUntil = reduceUntil;
    function apply(array, mapper) {
      return flatMap(mapper, (mapper2) => map(array, mapper2));
    }
    Array3.apply = apply;
    function filter(array, predicate) {
      const result = empty();
      for (let i = 0, n = array.length; i < n; i++) {
        const value = array[i];
        if (predicate(value, i)) {
          result.push(value);
        }
      }
      return result;
    }
    Array3.filter = filter;
    function reject(array, predicate) {
      return filter(array, not3(predicate));
    }
    Array3.reject = reject;
    function find(array, predicate) {
      for (let i = 0, n = array.length; i < n; i++) {
        const value = array[i];
        if (predicate(value, i)) {
          return Option.of(value);
        }
      }
      return None;
    }
    Array3.find = find;
    function findLast(array, predicate) {
      for (let i = array.length - 1; i >= 0; i--) {
        const value = array[i];
        if (predicate(value, i)) {
          return Option.of(value);
        }
      }
      return None;
    }
    Array3.findLast = findLast;
    function includes(array, value) {
      return some(array, Predicate.equals(value));
    }
    Array3.includes = includes;
    function collect(array, mapper) {
      const result = empty();
      for (let i = 0, n = array.length; i < n; i++) {
        for (const value of mapper(array[i], i)) {
          result.push(value);
        }
      }
      return result;
    }
    Array3.collect = collect;
    function collectFirst(array, mapper) {
      for (let i = 0, n = array.length; i < n; i++) {
        const value = mapper(array[i], i);
        if (value.isSome()) {
          return value;
        }
      }
      return None;
    }
    Array3.collectFirst = collectFirst;
    function some(array, predicate) {
      for (let i = 0, n = array.length; i < n; i++) {
        if (predicate(array[i], i)) {
          return true;
        }
      }
      return false;
    }
    Array3.some = some;
    function none(array, predicate) {
      return every(array, not3(predicate));
    }
    Array3.none = none;
    function every(array, predicate) {
      for (let i = 0, n = array.length; i < n; i++) {
        if (!predicate(array[i], i)) {
          return false;
        }
      }
      return true;
    }
    Array3.every = every;
    function count(array, predicate) {
      return reduce2(array, (count2, value, index) => predicate(value, index) ? count2 + 1 : count2, 0);
    }
    Array3.count = count;
    function distinct(array) {
      const result = empty();
      for (let i = 0, n = array.length; i < n; i++) {
        const value = array[i];
        if (result.some(Predicate.equals(value))) {
          continue;
        }
        result.push(value);
      }
      return result;
    }
    Array3.distinct = distinct;
    function get(array, index) {
      return index < array.length ? Option.of(array[index]) : None;
    }
    Array3.get = get;
    function has(array, index) {
      return index < array.length;
    }
    Array3.has = has;
    function set2(array, index, value) {
      if (index < array.length) {
        array[index] = value;
      }
      return array;
    }
    Array3.set = set2;
    function insert2(array, index, value) {
      if (index <= array.length) {
        array.splice(index, 0, value);
      }
      return array;
    }
    Array3.insert = insert2;
    function append(array, value) {
      array.push(value);
      return array;
    }
    Array3.append = append;
    function prepend(array, value) {
      array.unshift(value);
      return array;
    }
    Array3.prepend = prepend;
    function concat(array, ...iterables) {
      return [...Iterable.concat(array, ...iterables)];
    }
    Array3.concat = concat;
    function subtract(array, ...iterables) {
      return [...Iterable.subtract(array, ...iterables)];
    }
    Array3.subtract = subtract;
    function intersect(array, ...iterables) {
      return [...Iterable.intersect(array, ...iterables)];
    }
    Array3.intersect = intersect;
    function zip(array, iterable) {
      const result = empty();
      const it = Iterable.iterator(iterable);
      for (let i = 0, n = array.length; i < n; i++) {
        const next = it.next();
        if (next.done === true) {
          break;
        }
        result.push([array[i], next.value]);
      }
      return result;
    }
    Array3.zip = zip;
    function first(array) {
      return array.length > 0 ? Option.of(array[0]) : None;
    }
    Array3.first = first;
    function last(array) {
      return array.length > 0 ? Option.of(array[array.length - 1]) : None;
    }
    Array3.last = last;
    function sort(array) {
      return sortWith(array, compareComparable4);
    }
    Array3.sort = sort;
    function sortWith(array, comparer) {
      return array.sort(comparer);
    }
    Array3.sortWith = sortWith;
    function compare(a, b) {
      return compareWith(a, b, compareComparable4);
    }
    Array3.compare = compare;
    function compareWith(a, b, comparer) {
      return Iterable.compareWith(a, b, comparer);
    }
    Array3.compareWith = compareWith;
    function search(array, value, comparer) {
      let lower = 0;
      let upper = array.length - 1;
      while (lower <= upper) {
        const middle = lower + (upper - lower) / 2 >>> 0;
        switch (comparer(value, array[middle])) {
          case Comparison.Greater:
            lower = middle + 1;
            break;
          case Comparison.Less:
            upper = middle - 1;
            break;
          case Comparison.Equal:
            return middle;
        }
      }
      return lower;
    }
    Array3.search = search;
    function equals2(a, b) {
      if (a.length !== b.length) {
        return false;
      }
      for (let i = 0, n = a.length; i < n; i++) {
        if (!Equatable.equals(a[i], b[i])) {
          return false;
        }
      }
      return true;
    }
    Array3.equals = equals2;
    function hash2(array, hash3) {
      for (let i = 0, n = array.length; i < n; i++) {
        hash3.writeUnknown(array[i]);
      }
      hash3.writeUint32(array.length);
    }
    Array3.hash = hash2;
    function iterator(array) {
      return array[Symbol.iterator]();
    }
    Array3.iterator = iterator;
    function toJSON(array, options) {
      return array.map((value) => Serializable.toJSON(value, options));
    }
    Array3.toJSON = toJSON;
  })(Array2 || (Array2 = {}));

  // node_modules/@siteimprove/alfa-future/dist/future.js
  var Future = class {
    then(callback) {
      let step = this;
      while (true) {
        const next = step.step();
        if (step !== next) {
          step = next;
        } else {
          return next.then(callback);
        }
      }
    }
    get() {
      let step = this;
      while (true) {
        const next = step.step();
        if (step !== next) {
          step = next;
        } else {
          return next.get();
        }
      }
    }
    map(mapper) {
      return this.flatMap((value) => Now.of(mapper(value)));
    }
    apply(mapper) {
      return mapper.flatMap((mapper2) => this.map(mapper2));
    }
    flatten() {
      return this.flatMap((future) => future);
    }
    tee(callback) {
      return this.map((value) => {
        callback(value);
        return value;
      });
    }
    async *asyncIterator() {
      yield this.toPromise();
    }
    [Symbol.asyncIterator]() {
      return this.asyncIterator();
    }
    toPromise() {
      return new Promise((resolve2) => this.then(resolve2));
    }
  };
  (function(Future2) {
    function isFuture(value) {
      return value instanceof Future2;
    }
    Future2.isFuture = isFuture;
    function empty() {
      return now(void 0);
    }
    Future2.empty = empty;
    function now(value) {
      return Now.of(value);
    }
    Future2.now = now;
    function defer2(continuation) {
      return Defer.of(continuation);
    }
    Future2.defer = defer2;
    function suspend(thunk) {
      return Suspend.of(thunk);
    }
    Future2.suspend = suspend;
    function delay(thunk) {
      return suspend(() => now(thunk()));
    }
    Future2.delay = delay;
    function from(promise) {
      return Future2.defer((callback) => (typeof promise === "function" ? promise() : promise).then(callback));
    }
    Future2.from = from;
    function traverse(values, mapper) {
      return Iterable.reduce(values, (values2, value, i) => values2.flatMap((values3) => mapper(value, i).map((value2) => Array2.append(values3, value2))), now(Array2.empty()));
    }
    Future2.traverse = traverse;
    function sequence(futures) {
      return traverse(futures, (value) => value);
    }
    Future2.sequence = sequence;
  })(Future || (Future = {}));
  var Now = class _Now extends Future {
    static of(value) {
      return new _Now(value);
    }
    _value;
    constructor(value) {
      super();
      this._value = value;
    }
    step() {
      return this;
    }
    then(callback) {
      callback(this._value);
    }
    get() {
      return this._value;
    }
    isNow() {
      return true;
    }
    isDeferred() {
      return false;
    }
    isSuspended() {
      return false;
    }
    map(mapper) {
      return new _Now(mapper(this._value));
    }
    flatMap(mapper) {
      return Suspend.of(() => mapper(this._value));
    }
  };
  var Defer = class _Defer extends Future {
    static of(continuation) {
      return new _Defer(continuation);
    }
    _continuation;
    constructor(continuation) {
      super();
      this._continuation = continuation;
    }
    step() {
      return this;
    }
    then(callback) {
      this._continuation((value) => defer(() => callback(value)));
    }
    get() {
      throw new Error("Attempted to .get() from deferred future");
    }
    isNow() {
      return false;
    }
    isDeferred() {
      return true;
    }
    isSuspended() {
      return false;
    }
    flatMap(mapper) {
      return _Defer.Bind.of(this._continuation, mapper);
    }
  };
  (function(Defer2) {
    class Bind2 extends Future {
      static of(continuation, mapper) {
        return new Bind2(continuation, mapper);
      }
      _continuation;
      _mapper;
      constructor(continuation, mapper) {
        super();
        this._continuation = continuation;
        this._mapper = mapper;
      }
      step() {
        return this;
      }
      then(callback) {
        this._continuation((value) => defer(() => this._mapper(value).then(callback)));
      }
      get() {
        throw new Error("Attempted to .get() from deferred future");
      }
      isNow() {
        return false;
      }
      isDeferred() {
        return true;
      }
      isSuspended() {
        return false;
      }
      flatMap(mapper) {
        return Suspend.of(() => Bind2.of(this._continuation, (value) => this._mapper(value).flatMap(mapper)));
      }
    }
    Defer2.Bind = Bind2;
  })(Defer || (Defer = {}));
  var Suspend = class _Suspend extends Future {
    static of(thunk) {
      return new _Suspend(thunk);
    }
    _thunk;
    constructor(thunk) {
      super();
      this._thunk = thunk;
    }
    step() {
      return this._thunk();
    }
    isNow() {
      return false;
    }
    isDeferred() {
      return false;
    }
    isSuspended() {
      return true;
    }
    flatMap(mapper) {
      return _Suspend.Bind.of(this._thunk, mapper);
    }
  };
  (function(Suspend3) {
    class Bind2 extends Future {
      static of(thunk, mapper) {
        return new Bind2(thunk, mapper);
      }
      _thunk;
      _mapper;
      constructor(thunk, mapper) {
        super();
        this._thunk = thunk;
        this._mapper = mapper;
      }
      step() {
        return this._thunk().flatMap(this._mapper);
      }
      isNow() {
        return false;
      }
      isDeferred() {
        return false;
      }
      isSuspended() {
        return true;
      }
      flatMap(mapper) {
        return Suspend3.of(() => Bind2.of(this._thunk, (value) => this._mapper(value).flatMap(mapper)));
      }
    }
    Suspend3.Bind = Bind2;
  })(Suspend || (Suspend = {}));
  async function defer(thunk) {
    return Promise.resolve().then(thunk);
  }

  // node_modules/@siteimprove/alfa-encoding/dist/decoder.js
  var Decoder;
  (function(Decoder2) {
    function decode(input) {
      let output = "";
      let i = 0;
      while (i < input.length) {
        let byte = input[i];
        let bytesNeeded = 0;
        let codePoint = 0;
        if (byte <= 127) {
          bytesNeeded = 0;
          codePoint = byte & 255;
        } else if (byte <= 223) {
          bytesNeeded = 1;
          codePoint = byte & 31;
        } else if (byte <= 239) {
          bytesNeeded = 2;
          codePoint = byte & 15;
        } else if (byte <= 244) {
          bytesNeeded = 3;
          codePoint = byte & 7;
        }
        if (input.length - i - bytesNeeded > 0) {
          let k = 0;
          while (k < bytesNeeded) {
            byte = input[i + k + 1];
            codePoint = codePoint << 6 | byte & 63;
            k += 1;
          }
        } else {
          codePoint = 65533;
          bytesNeeded = input.length - i;
        }
        output += String.fromCodePoint(codePoint);
        i += bytesNeeded + 1;
      }
      return output;
    }
    Decoder2.decode = decode;
  })(Decoder || (Decoder = {}));

  // node_modules/@siteimprove/alfa-encoding/dist/encoder.js
  var Encoder;
  (function(Encoder2) {
    function encode(input) {
      const output = [];
      const length = input.length;
      let i = 0;
      while (i < length) {
        const codePoint = input.codePointAt(i);
        let count = 0;
        let bits = 0;
        if (codePoint <= 127) {
          count = 0;
          bits = 0;
        } else if (codePoint <= 2047) {
          count = 6;
          bits = 192;
        } else if (codePoint <= 65535) {
          count = 12;
          bits = 224;
        } else if (codePoint <= 2097151) {
          count = 18;
          bits = 240;
        }
        output.push(bits | codePoint >> count);
        count -= 6;
        while (count >= 0) {
          output.push(128 | codePoint >> count & 63);
          count -= 6;
        }
        i += codePoint >= 65536 ? 2 : 1;
      }
      return new Uint8Array(output);
    }
    Encoder2.encode = encode;
  })(Encoder || (Encoder = {}));

  // node_modules/@siteimprove/alfa-hash/dist/hashable.js
  var { isFunction: isFunction3, isObject: isObject4 } = Refinement;
  var Hashable;
  (function(Hashable2) {
    function isHashable(value) {
      return isObject4(value) && isFunction3(value.hash);
    }
    Hashable2.isHashable = isHashable;
  })(Hashable || (Hashable = {}));

  // node_modules/@siteimprove/alfa-hash/dist/hash.js
  var { keys: keys2 } = Object;
  var builtinOffset = 2216757312;
  var Hash = class _Hash {
    /**
     * A map from objects to their hash values. Objects are weakly referenced as
     * to not prevent them from being garbage collected.
     */
    static _objectHashes = /* @__PURE__ */ new WeakMap();
    /**
     * A map from symbols to their hash values. As there's not currently a way to
     * weakly reference symbols, we have to instead use strong references.
     *
     * {@link https://github.com/tc39/proposal-symbols-as-weakmap-keys}
     */
    static _symbolHashes = /* @__PURE__ */ new Map();
    /**
     * The next available hash value. This is used for symbols and objects that
     * don't implement the {@link (Hashable:interface)} interface.
     */
    static _nextHash = 0;
    constructor() {
    }
    writeString(data) {
      return this.write(Encoder.encode(data));
    }
    /**
     * @remarks
     * As JavaScript represents numbers in double-precision floating-point format,
     * numbers in general will be written as such.
     *
     * {@link https://en.wikipedia.org/wiki/Double-precision_floating-point_format}
     */
    writeNumber(data) {
      return this.writeFloat64(data);
    }
    writeInt(data, size = 32, signed = true) {
      const buffer = new ArrayBuffer(size / 8);
      const view = new DataView(buffer);
      switch (size) {
        case 8:
          signed ? view.setInt8(0, data) : view.setUint8(0, data);
          break;
        case 16:
          signed ? view.setInt16(0, data) : view.setUint16(0, data);
          break;
        case 32:
          signed ? view.setInt32(0, data) : view.setUint32(0, data);
      }
      return this.write(new Uint8Array(buffer));
    }
    writeInt8(data) {
      return this.writeInt(data, 8, true);
    }
    writeUint8(data) {
      return this.writeInt(data, 8, false);
    }
    writeInt16(data) {
      return this.writeInt(data, 16, true);
    }
    writeUint16(data) {
      return this.writeInt(data, 16, false);
    }
    writeInt32(data) {
      return this.writeInt(data, 32, true);
    }
    writeUint32(data) {
      return this.writeInt(data, 32, false);
    }
    writeBigInt(data, size = 64, signed = true) {
      const buffer = new ArrayBuffer(size / 8);
      const view = new DataView(buffer);
      switch (size) {
        case 64:
          signed ? view.setBigInt64(0, data) : view.setBigUint64(0, data);
      }
      return this.write(new Uint8Array(buffer));
    }
    writeBigInt64(data) {
      return this.writeBigInt(data, 64, true);
    }
    writeBigUint64(data) {
      return this.writeBigInt(data, 64, false);
    }
    writeFloat(data, size = 32) {
      const buffer = new ArrayBuffer(size / 8);
      const view = new DataView(buffer);
      switch (size) {
        case 32:
          view.setFloat32(0, data);
          break;
        case 64:
          view.setFloat64(0, data);
      }
      return this.write(new Uint8Array(buffer));
    }
    writeFloat32(data) {
      return this.writeFloat(data, 32);
    }
    writeFloat64(data) {
      return this.writeFloat(data, 64);
    }
    writeBoolean(data) {
      return this.writeUint8(builtinOffset + (data ? 1 : 0));
    }
    writeUndefined() {
      return this.writeUint32(builtinOffset + 2);
    }
    writeNull() {
      return this.writeUint32(builtinOffset + 3);
    }
    writeObject(data) {
      let hash2 = _Hash._objectHashes.get(data);
      if (hash2 === void 0) {
        hash2 = _Hash._getNextHash();
        _Hash._objectHashes.set(data, hash2);
      }
      return this.writeUint32(hash2);
    }
    writeSymbol(data) {
      let hash2 = _Hash._symbolHashes.get(data);
      if (hash2 === void 0) {
        hash2 = _Hash._getNextHash();
        _Hash._symbolHashes.set(data, hash2);
      }
      return this.writeUint32(hash2);
    }
    writeHashable(data) {
      data.hash(this);
      return this;
    }
    writeUnknown(data) {
      switch (typeof data) {
        case "string":
          return this.writeString(data);
        case "number":
          return this.writeNumber(data);
        case "bigint":
          return this.writeBigInt(data);
        case "boolean":
          return this.writeBoolean(data);
        case "symbol":
          return this.writeSymbol(data);
        case "undefined":
          return this.writeUndefined();
        case "object":
          if (data === null) {
            return this.writeNull();
          }
          if (Hashable.isHashable(data)) {
            return this.writeHashable(data);
          }
          return this.writeObject(data);
        case "function":
          return this.writeObject(data);
      }
    }
    writeJSON(data) {
      switch (typeof data) {
        case "string":
          return this.writeString(data);
        case "number":
          return this.writeNumber(data);
        case "boolean":
          return this.writeBoolean(data);
        case "object":
          if (Array.isArray(data)) {
            for (let i = 0, n = data.length; i < n; i++) {
              this.writeJSON(data[i]);
            }
            this.writeUint32(data.length);
          } else if (data !== null) {
            for (const key of keys2(data).sort()) {
              const value = data[key];
              this.writeString(key);
              if (value !== void 0) {
                this.writeJSON(value);
              }
              this.writeUint8(0);
            }
          }
          return this;
      }
    }
    equals(value) {
      return value instanceof _Hash && value.finish() === this.finish();
    }
    hash(hash2) {
      hash2.writeUint32(this.finish());
    }
    static _getNextHash() {
      const nextHash = _Hash._nextHash;
      _Hash._nextHash = _Hash._nextHash + 1 >>> 0;
      return nextHash;
    }
  };

  // node_modules/@siteimprove/alfa-fnv/dist/fnv.js
  var FNV = class _FNV extends Hash {
    static empty() {
      return new _FNV();
    }
    _hash = 2166136261;
    constructor() {
      super();
    }
    finish() {
      return this._hash >>> 0;
    }
    write(data) {
      let hash2 = this._hash;
      for (const octet of data) {
        hash2 ^= octet;
        hash2 += (hash2 << 1) + (hash2 << 4) + (hash2 << 7) + (hash2 << 8) + (hash2 << 24);
      }
      this._hash = hash2;
      return this;
    }
    equals(value) {
      return value instanceof _FNV && value._hash === this._hash;
    }
  };

  // node_modules/@siteimprove/alfa-bits/dist/bits.js
  var Bits;
  (function(Bits2) {
    function bit3(i) {
      return 1 << i;
    }
    Bits2.bit = bit3;
    function set2(bits, i) {
      return bits | bit3(i);
    }
    Bits2.set = set2;
    function clear2(bits, i) {
      return bits & ~bit3(i);
    }
    Bits2.clear = clear2;
    function test5(bits, i) {
      return (bits & bit3(i)) !== 0;
    }
    Bits2.test = test5;
    function take3(bits, n) {
      return bits & (1 << n) - 1;
    }
    Bits2.take = take3;
    function skip3(bits, n) {
      return bits >>> n;
    }
    Bits2.skip = skip3;
    function popCount2(bits) {
      bits -= bits >> 1 & 1431655765;
      bits = (bits & 858993459) + (bits >> 2 & 858993459);
      bits = bits + (bits >> 4) & 252645135;
      bits += bits >> 8;
      bits += bits >> 16;
      return bits & 127;
    }
    Bits2.popCount = popCount2;
  })(Bits || (Bits = {}));

  // node_modules/@siteimprove/alfa-map/dist/status.js
  var Status;
  (function(Status_1) {
    class Status2 {
      _result;
      constructor(result) {
        this._result = result;
      }
      get result() {
        return this._result;
      }
    }
    class Created extends Status2 {
      static of(result) {
        return new Created(result);
      }
      constructor(result) {
        super(result);
      }
      get status() {
        return "created";
      }
    }
    Status_1.Created = Created;
    Status_1.created = Created.of;
    class Updated extends Status2 {
      static of(result) {
        return new Updated(result);
      }
      constructor(result) {
        super(result);
      }
      get status() {
        return "updated";
      }
    }
    Status_1.Updated = Updated;
    Status_1.updated = Updated.of;
    class Deleted extends Status2 {
      static of(result) {
        return new Deleted(result);
      }
      constructor(result) {
        super(result);
      }
      get status() {
        return "deleted";
      }
    }
    Status_1.Deleted = Deleted;
    Status_1.deleted = Deleted.of;
    class Unchanged extends Status2 {
      static of(result) {
        return new Unchanged(result);
      }
      constructor(result) {
        super(result);
      }
      get status() {
        return "unchanged";
      }
    }
    Status_1.Unchanged = Unchanged;
    Status_1.unchanged = Unchanged.of;
  })(Status || (Status = {}));

  // node_modules/@siteimprove/alfa-map/dist/node.js
  var { bit, take, skip, test: test2, set, clear, popCount } = Bits;
  var Node;
  (function(Node3) {
    Node3.Bits = 5;
    function fragment(hash2, shift) {
      return take(skip(hash2, shift), Node3.Bits);
    }
    Node3.fragment = fragment;
    function index(fragment2, mask) {
      return popCount(take(mask, fragment2));
    }
    Node3.index = index;
  })(Node || (Node = {}));
  var Empty = new class Empty2 {
    isEmpty() {
      return true;
    }
    isLeaf() {
      return false;
    }
    get() {
      return None;
    }
    set(key, value, hash2) {
      return Status.created(Leaf.of(hash2, key, value));
    }
    delete() {
      return Status.unchanged(this);
    }
    map() {
      return this;
    }
    equals(value) {
      return value instanceof Empty2;
    }
    *[Symbol.iterator]() {
    }
  }();
  var Leaf = class _Leaf {
    static of(hash2, key, value) {
      return new _Leaf(hash2, key, value);
    }
    _hash;
    _key;
    _value;
    constructor(hash2, key, value) {
      this._hash = hash2;
      this._key = key;
      this._value = value;
    }
    get key() {
      return this._key;
    }
    get value() {
      return this._value;
    }
    isEmpty() {
      return false;
    }
    isLeaf() {
      return true;
    }
    get(key, hash2, shift) {
      return hash2 === this._hash && Equatable.equals(key, this._key) ? Option.of(this._value) : None;
    }
    set(key, value, hash2, shift) {
      if (hash2 === this._hash) {
        if (Equatable.equals(key, this._key)) {
          if (Equatable.equals(value, this._value)) {
            return Status.unchanged(this);
          }
          return Status.updated(_Leaf.of(hash2, key, value));
        }
        return Status.created(Collision.of(hash2, [this, _Leaf.of(hash2, key, value)]));
      }
      const fragment = Node.fragment(this._hash, shift);
      return Sparse.of(bit(fragment), [this]).set(key, value, hash2, shift);
    }
    delete(key, hash2) {
      return hash2 === this._hash && Equatable.equals(key, this._key) ? Status.deleted(Empty) : Status.unchanged(this);
    }
    map(mapper) {
      return _Leaf.of(this._hash, this._key, mapper(this._value, this._key));
    }
    equals(value) {
      return value instanceof _Leaf && value._hash === this._hash && Equatable.equals(value._key, this._key) && Equatable.equals(value._value, this._value);
    }
    *[Symbol.iterator]() {
      yield [this._key, this._value];
    }
  };
  var Collision = class _Collision {
    static of(hash2, nodes) {
      return new _Collision(hash2, nodes);
    }
    _hash;
    _nodes;
    constructor(hash2, nodes) {
      this._hash = hash2;
      this._nodes = nodes;
    }
    isEmpty() {
      return false;
    }
    isLeaf() {
      return false;
    }
    get(key, hash2, shift) {
      if (hash2 === this._hash) {
        for (const node of this._nodes) {
          const value = node.get(key, hash2, shift);
          if (value.isSome()) {
            return value;
          }
        }
      }
      return None;
    }
    set(key, value, hash2, shift) {
      if (hash2 === this._hash) {
        for (let i = 0, n = this._nodes.length; i < n; i++) {
          const node = this._nodes[i];
          if (Equatable.equals(key, node.key)) {
            if (Equatable.equals(value, node.value)) {
              return Status.unchanged(this);
            }
            return Status.updated(_Collision.of(this._hash, replace(this._nodes, i, Leaf.of(hash2, key, value))));
          }
        }
        return Status.created(_Collision.of(this._hash, this._nodes.concat(Leaf.of(hash2, key, value))));
      }
      const fragment = Node.fragment(this._hash, shift);
      return Sparse.of(bit(fragment), [this]).set(key, value, hash2, shift);
    }
    delete(key, hash2) {
      if (hash2 === this._hash) {
        for (let i = 0, n = this._nodes.length; i < n; i++) {
          const node = this._nodes[i];
          if (Equatable.equals(key, node.key)) {
            const nodes = remove(this._nodes, i);
            if (nodes.length === 1) {
              return Status.deleted(nodes[0]);
            }
            return Status.deleted(_Collision.of(this._hash, nodes));
          }
        }
      }
      return Status.unchanged(this);
    }
    map(mapper) {
      return _Collision.of(this._hash, this._nodes.map((node) => node.map(mapper)));
    }
    equals(value) {
      return value instanceof _Collision && value._hash === this._hash && value._nodes.length === this._nodes.length && value._nodes.every((node, i) => node.equals(this._nodes[i]));
    }
    *[Symbol.iterator]() {
      for (const node of this._nodes) {
        yield* node;
      }
    }
  };
  var Sparse = class _Sparse {
    static of(mask, nodes) {
      return new _Sparse(mask, nodes);
    }
    _mask;
    _nodes;
    constructor(mask, nodes) {
      this._mask = mask;
      this._nodes = nodes;
    }
    isEmpty() {
      return false;
    }
    isLeaf() {
      return false;
    }
    get(key, hash2, shift) {
      const fragment = Node.fragment(hash2, shift);
      if (test2(this._mask, fragment)) {
        const index = Node.index(fragment, this._mask);
        return this._nodes[index].get(key, hash2, shift + Node.Bits);
      }
      return None;
    }
    set(key, value, hash2, shift) {
      const fragment = Node.fragment(hash2, shift);
      const index = Node.index(fragment, this._mask);
      if (test2(this._mask, fragment)) {
        const { result: node, status } = this._nodes[index].set(key, value, hash2, shift + Node.Bits);
        if (status === "unchanged") {
          return Status.unchanged(this);
        }
        const sparse = _Sparse.of(this._mask, replace(this._nodes, index, node));
        switch (status) {
          case "created":
            return Status.created(sparse);
          case "updated":
          default:
            return Status.updated(sparse);
        }
      }
      return Status.created(_Sparse.of(set(this._mask, fragment), insert(this._nodes, index, Leaf.of(hash2, key, value))));
    }
    delete(key, hash2, shift) {
      const fragment = Node.fragment(hash2, shift);
      if (test2(this._mask, fragment)) {
        const index = Node.index(fragment, this._mask);
        const { result: node, status } = this._nodes[index].delete(key, hash2, shift + Node.Bits);
        if (status === "unchanged") {
          return Status.unchanged(this);
        }
        if (node.isEmpty()) {
          const nodes = remove(this._nodes, index);
          if (nodes.length === 1) {
            if (nodes[0].isLeaf() || nodes[0] instanceof Collision) {
              return Status.deleted(nodes[0]);
            }
          }
          return Status.deleted(_Sparse.of(clear(this._mask, fragment), nodes));
        }
        return Status.deleted(_Sparse.of(this._mask, replace(this._nodes, index, node)));
      }
      return Status.unchanged(this);
    }
    map(mapper) {
      return _Sparse.of(this._mask, this._nodes.map((node) => node.map(mapper)));
    }
    equals(value) {
      return value instanceof _Sparse && value._mask === this._mask && value._nodes.length === this._nodes.length && value._nodes.every((node, i) => node.equals(this._nodes[i]));
    }
    *[Symbol.iterator]() {
      for (const node of this._nodes) {
        yield* node;
      }
    }
  };
  function insert(array, index, value) {
    const result = new Array(array.length + 1);
    result[index] = value;
    for (let i = 0, n = index; i < n; i++) {
      result[i] = array[i];
    }
    for (let i = index, n = array.length; i < n; i++) {
      result[i + 1] = array[i];
    }
    return result;
  }
  function remove(array, index) {
    const result = new Array(array.length - 1);
    for (let i = 0, n = index; i < n; i++) {
      result[i] = array[i];
    }
    for (let i = index, n = result.length; i < n; i++) {
      result[i] = array[i + 1];
    }
    return result;
  }
  function replace(array, index, value) {
    const result = array.slice(0);
    result[index] = value;
    return result;
  }

  // node_modules/@siteimprove/alfa-map/dist/map.js
  var { not: not4 } = Predicate;
  var Map2 = class _Map {
    static of(...entries) {
      return entries.reduce((map, [key, value]) => map.set(key, value), _Map.empty());
    }
    static _empty = new _Map(Empty, 0);
    static empty() {
      return this._empty;
    }
    _root;
    _size;
    constructor(root, size) {
      this._root = root;
      this._size = size;
    }
    get size() {
      return this._size;
    }
    isEmpty() {
      return this._size === 0;
    }
    forEach(callback) {
      Iterable.forEach(this, ([key, value]) => callback(value, key));
    }
    map(mapper) {
      return new _Map(this._root.map(mapper), this._size);
    }
    /**
     * Apply a map of functions to each corresponding value of this map.
     *
     * @remarks
     * Keys without a corresponding function or value are dropped from the
     * resulting map.
     *
     * @example
     * ```ts
     * Map.of(["a", 1], ["b", 2])
     *   .apply(Map.of(["a", (x) => x + 1], ["b", (x) => x * 2]))
     *   .toArray();
     * // => [["a", 2], ["b", 4]]
     * ```
     */
    apply(mapper) {
      return this.collect((value, key) => mapper.get(key).map((mapper2) => mapper2(value)));
    }
    /**
     * @remarks
     * As the order of maps is undefined, it is also undefined which keys are
     * kept when duplicate keys are encountered.
     */
    flatMap(mapper) {
      return this.reduce((map, value, key) => map.concat(mapper(value, key)), _Map.empty());
    }
    /**
     * @remarks
     * As the order of maps is undefined, it is also undefined which keys are
     * kept when duplicate keys are encountered.
     */
    flatten() {
      return this.flatMap((map) => map);
    }
    reduce(reducer, accumulator) {
      return Iterable.reduce(this, (accumulator2, [key, value]) => reducer(accumulator2, value, key), accumulator);
    }
    filter(predicate) {
      return this.reduce((map, value, key) => predicate(value, key) ? map.set(key, value) : map, _Map.empty());
    }
    reject(predicate) {
      return this.filter(not4(predicate));
    }
    find(predicate) {
      return Iterable.find(this, ([key, value]) => predicate(value, key)).map(([, value]) => value);
    }
    includes(value) {
      return Iterable.includes(this.values(), value);
    }
    collect(mapper) {
      return _Map.from(Iterable.collect(this, ([key, value]) => mapper(value, key).map((value2) => [key, value2])));
    }
    collectFirst(mapper) {
      return Iterable.collectFirst(this, ([key, value]) => mapper(value, key));
    }
    some(predicate) {
      return Iterable.some(this, ([key, value]) => predicate(value, key));
    }
    none(predicate) {
      return Iterable.none(this, ([key, value]) => predicate(value, key));
    }
    every(predicate) {
      return Iterable.every(this, ([key, value]) => predicate(value, key));
    }
    count(predicate) {
      return Iterable.count(this, ([key, value]) => predicate(value, key));
    }
    /**
     * @remarks
     * As the order of maps is undefined, it is also undefined which keys are
     * kept when duplicate values are encountered.
     */
    distinct() {
      let seen = _Map.empty();
      let map = this;
      for (const [key, value] of map) {
        if (seen.has(value)) {
          map = map.delete(key);
        } else {
          seen = seen.set(value, value);
        }
      }
      return map;
    }
    get(key) {
      return this._root.get(key, hash(key), 0);
    }
    has(key) {
      return this.get(key).isSome();
    }
    set(key, value) {
      const { result: root, status } = this._root.set(key, value, hash(key), 0);
      if (status === "unchanged") {
        return this;
      }
      return new _Map(root, this._size + (status === "updated" ? 0 : 1));
    }
    delete(key) {
      const { result: root, status } = this._root.delete(key, hash(key), 0);
      if (status === "unchanged") {
        return this;
      }
      return new _Map(root, this._size - 1);
    }
    concat(iterable) {
      return Iterable.reduce(iterable, (map, [key, value]) => map.set(key, value), this);
    }
    subtract(iterable) {
      return Iterable.reduce(iterable, (map, [key]) => map.delete(key), this);
    }
    intersect(iterable) {
      return _Map.fromIterable(Iterable.filter(iterable, ([key]) => this.has(key)));
    }
    tee(callback, ...args) {
      callback(this, ...args);
      return this;
    }
    equals(value) {
      return value instanceof _Map && value._size === this._size && value._root.equals(this._root);
    }
    hash(hash2) {
      for (const [key, value] of this) {
        hash2.writeUnknown(key).writeUnknown(value);
      }
      hash2.writeUint32(this._size);
    }
    keys() {
      return Iterable.map(this._root, (entry) => entry[0]);
    }
    values() {
      return Iterable.map(this._root, (entry) => entry[1]);
    }
    *iterator() {
      yield* this._root;
    }
    [Symbol.iterator]() {
      return this.iterator();
    }
    toArray() {
      return [...this];
    }
    toJSON(options) {
      return this.toArray().map(([key, value]) => [
        Serializable.toJSON(key, options),
        Serializable.toJSON(value, options)
      ]);
    }
    toString() {
      const entries = this.toArray().map(([key, value]) => `${key} => ${value}`).join(", ");
      return `Map {${entries === "" ? "" : ` ${entries} `}}`;
    }
  };
  (function(Map3) {
    function isMap(value) {
      return value instanceof Map3;
    }
    Map3.isMap = isMap;
    function from(iterable) {
      if (isMap(iterable)) {
        return iterable;
      }
      if (Array2.isArray(iterable)) {
        return fromArray(iterable);
      }
      return fromIterable(iterable);
    }
    Map3.from = from;
    function fromArray(array) {
      return Array2.reduce(array, (map, [key, value]) => map.set(key, value), Map3.empty());
    }
    Map3.fromArray = fromArray;
    function fromIterable(iterable) {
      return Iterable.reduce(iterable, (map, [key, value]) => map.set(key, value), Map3.empty());
    }
    Map3.fromIterable = fromIterable;
  })(Map2 || (Map2 = {}));
  function hash(key) {
    return FNV.empty().writeUnknown(key).finish();
  }

  // node_modules/@siteimprove/alfa-set/dist/set.js
  var { not: not5 } = Predicate;
  var Set2 = class _Set {
    static of(...values) {
      return values.reduce((set2, value) => set2.add(value), _Set.empty());
    }
    static _empty = new _Set(Map2.empty());
    static empty() {
      return this._empty;
    }
    _values;
    constructor(values) {
      this._values = values;
    }
    get size() {
      return this._values.size;
    }
    isEmpty() {
      return this._values.isEmpty();
    }
    forEach(callback) {
      Iterable.forEach(this, callback);
    }
    map(mapper) {
      return this._values.reduce((set2, _, value) => set2.add(mapper(value)), _Set.empty());
    }
    apply(mapper) {
      return mapper.flatMap((mapper2) => this.map(mapper2));
    }
    flatMap(mapper) {
      return this.reduce((set2, value) => set2.concat(mapper(value)), _Set.empty());
    }
    flatten() {
      return this.flatMap((set2) => set2);
    }
    reduce(reducer, accumulator) {
      return Iterable.reduce(this, reducer, accumulator);
    }
    filter(predicate) {
      return this.reduce((set2, value) => predicate(value) ? set2.add(value) : set2, _Set.empty());
    }
    reject(predicate) {
      return this.filter(not5(predicate));
    }
    find(predicate) {
      return Iterable.find(this, predicate);
    }
    includes(value) {
      return Iterable.includes(this, value);
    }
    collect(mapper) {
      return _Set.from(Iterable.collect(this, mapper));
    }
    collectFirst(mapper) {
      return Iterable.collectFirst(this, mapper);
    }
    some(predicate) {
      return Iterable.some(this, predicate);
    }
    none(predicate) {
      return Iterable.none(this, predicate);
    }
    every(predicate) {
      return Iterable.every(this, predicate);
    }
    count(predicate) {
      return Iterable.count(this, predicate);
    }
    /**
     * @remarks
     * As sets don't contain duplicate values, they will only ever contain
     * distinct values.
     */
    distinct() {
      return this;
    }
    get(value) {
      return this._values.get(value);
    }
    has(value) {
      return this._values.has(value);
    }
    add(value) {
      const values = this._values.set(value, value);
      if (values === this._values) {
        return this;
      }
      return new _Set(values);
    }
    delete(value) {
      const values = this._values.delete(value);
      if (values === this._values) {
        return this;
      }
      return new _Set(values);
    }
    concat(iterable) {
      return Iterable.reduce(iterable, (set2, value) => set2.add(value), this);
    }
    subtract(iterable) {
      return Iterable.reduce(iterable, (set2, value) => set2.delete(value), this);
    }
    intersect(iterable) {
      return _Set.fromIterable(Iterable.filter(iterable, (value) => this.has(value)));
    }
    tee(callback, ...args) {
      callback(this, ...args);
      return this;
    }
    equals(value) {
      return value instanceof _Set && value._values.equals(this._values);
    }
    hash(hash2) {
      for (const value of this) {
        hash2.writeUnknown(value);
      }
      hash2.writeUint32(this._values.size);
    }
    *iterator() {
      for (const [value] of this._values) {
        yield value;
      }
    }
    [Symbol.iterator]() {
      return this.iterator();
    }
    toArray() {
      return [...this];
    }
    toJSON(options) {
      return this.toArray().map((value) => Serializable.toJSON(value, options));
    }
    toString() {
      const entries = this.toArray().join(", ");
      return `Set {${entries === "" ? "" : ` ${entries} `}}`;
    }
  };
  (function(Set3) {
    function isSet(value) {
      return value instanceof Set3;
    }
    Set3.isSet = isSet;
    function from(iterable) {
      if (isSet(iterable)) {
        return iterable;
      }
      if (Array2.isArray(iterable)) {
        return fromArray(iterable);
      }
      return fromIterable(iterable);
    }
    Set3.from = from;
    function fromArray(array) {
      return Array2.reduce(array, (set2, value) => set2.add(value), Set3.empty());
    }
    Set3.fromArray = fromArray;
    function fromIterable(iterable) {
      return Iterable.reduce(iterable, (set2, value) => set2.add(value), Set3.empty());
    }
    Set3.fromIterable = fromIterable;
  })(Set2 || (Set2 = {}));

  // node_modules/@siteimprove/alfa-list/dist/node.js
  var { bit: bit2, take: take2, skip: skip2 } = Bits;
  var Node2;
  (function(Node3) {
    Node3.Bits = 5;
    Node3.Capacity = bit2(Node3.Bits);
    function fragment(index, shift) {
      return take2(skip2(index, shift), Node3.Bits);
    }
    Node3.fragment = fragment;
    function overflow(shift) {
      return Node3.Capacity << shift - Node3.Bits;
    }
    Node3.overflow = overflow;
    function underflow(shift) {
      return Node3.Capacity << shift - Node3.Bits * 2;
    }
    Node3.underflow = underflow;
  })(Node2 || (Node2 = {}));
  var Empty3 = new class Empty4 {
    isEmpty() {
      return true;
    }
    isLeaf() {
      return false;
    }
    get() {
      return None;
    }
    set() {
      return this;
    }
    map() {
      return this;
    }
    equals(value) {
      return value instanceof Empty4;
    }
    *[Symbol.iterator]() {
    }
  }();
  var Leaf2 = class _Leaf {
    static of(values) {
      return new _Leaf(values);
    }
    _values;
    constructor(values) {
      this._values = values;
    }
    get values() {
      return this._values;
    }
    isEmpty() {
      return false;
    }
    isLeaf() {
      return true;
    }
    hasCapacity() {
      return this._values.length < Node2.Capacity;
    }
    get(index) {
      const fragment = take2(index, Node2.Bits);
      return Option.of(this._values[fragment]);
    }
    set(index, value) {
      const fragment = take2(index, Node2.Bits);
      if (Equatable.equals(value, this._values[fragment])) {
        return this;
      }
      const values = this._values.slice(0);
      values[fragment] = value;
      return _Leaf.of(values);
    }
    map(mapper) {
      return _Leaf.of(this._values.map(mapper));
    }
    equals(value) {
      return value instanceof _Leaf && value._values.length === this._values.length && value._values.every((value2, i) => Equatable.equals(value2, this._values[i]));
    }
    *[Symbol.iterator]() {
      yield* this._values;
    }
  };
  var Branch = class _Branch {
    static of(nodes) {
      return new _Branch(nodes);
    }
    static empty() {
      return new _Branch([]);
    }
    _nodes;
    constructor(nodes) {
      this._nodes = nodes;
    }
    get nodes() {
      return this._nodes;
    }
    isEmpty() {
      return false;
    }
    isLeaf() {
      return false;
    }
    clone() {
      return _Branch.of(this._nodes.slice(0));
    }
    get(index, shift) {
      const fragment = Node2.fragment(index, shift);
      return this._nodes[fragment].get(index, shift - Node2.Bits);
    }
    set(index, value, shift) {
      const fragment = Node2.fragment(index, shift);
      const node = this._nodes[fragment].set(index, value, shift - Node2.Bits);
      if (node === this._nodes[fragment]) {
        return this;
      }
      const nodes = this._nodes.slice(0);
      nodes[fragment] = node;
      return _Branch.of(nodes);
    }
    map(mapper) {
      return _Branch.of(this._nodes.map((node) => node.map(mapper)));
    }
    equals(value) {
      return value instanceof _Branch && value._nodes.length === this._nodes.length && value._nodes.every((node, i) => node.equals(this._nodes[i]));
    }
    *[Symbol.iterator]() {
      for (const node of this._nodes) {
        yield* node;
      }
    }
  };

  // node_modules/@siteimprove/alfa-list/dist/list.js
  var { not: not6 } = Predicate;
  var { compareComparable: compareComparable5 } = Comparable;
  var List = class _List {
    static of(...values) {
      const size = values.length;
      if (size <= Node2.Capacity) {
        return new _List(Empty3, Leaf2.of(values), 0, size);
      }
      return values.reduce((list, value) => list._push(value), _List.empty());
    }
    static _empty = new _List(Empty3, Empty3, 0, 0);
    static empty() {
      return this._empty;
    }
    _head;
    _tail;
    _shift;
    _size;
    constructor(head, tail, shift, size) {
      this._head = head;
      this._tail = tail;
      this._shift = shift;
      this._size = size;
    }
    get size() {
      return this._size;
    }
    isEmpty() {
      return this._tail.isEmpty();
    }
    forEach(callback) {
      Iterable.forEach(this, callback);
    }
    map(mapper) {
      let index = 0;
      const tail = this._tail.map((value) => mapper(value, index++));
      const head = this._head.map((value) => mapper(value, index++));
      return new _List(head, tail, this._shift, this._size);
    }
    apply(mapper) {
      return mapper.flatMap((mapper2) => this.map(mapper2));
    }
    flatMap(mapper) {
      return this.reduce((list, value, index) => list.concat(mapper(value, index)), _List.empty());
    }
    flatten() {
      return this.flatMap((list) => list);
    }
    reduce(reducer, accumulator) {
      return Iterable.reduce(this, reducer, accumulator);
    }
    reduceWhile(predicate, reducer, accumulator) {
      return Iterable.reduceWhile(this, predicate, reducer, accumulator);
    }
    reduceUntil(predicate, reducer, accumulator) {
      return Iterable.reduceUntil(this, predicate, reducer, accumulator);
    }
    filter(predicate) {
      return _List.from(Iterable.filter(this, predicate));
    }
    reject(predicate) {
      return this.filter(not6(predicate));
    }
    find(predicate) {
      return Iterable.find(this, predicate);
    }
    includes(value) {
      return Iterable.includes(this, value);
    }
    collect(mapper) {
      return _List.from(Iterable.collect(this, mapper));
    }
    collectFirst(mapper) {
      return Iterable.collectFirst(this, mapper);
    }
    some(predicate) {
      return Iterable.some(this, predicate);
    }
    none(predicate) {
      return Iterable.none(this, predicate);
    }
    every(predicate) {
      return Iterable.every(this, predicate);
    }
    count(predicate) {
      return Iterable.count(this, predicate);
    }
    distinct() {
      let seen = Set2.empty();
      let list = _List.empty();
      for (const value of this) {
        if (seen.has(value)) {
          continue;
        }
        seen = seen.add(value);
        list = list.append(value);
      }
      return list;
    }
    get(index) {
      if (index < 0 || index >= this._size || this._tail.isEmpty()) {
        return None;
      }
      const offset = this._size - this._tail.values.length;
      let value;
      if (index < offset) {
        value = this._head.get(index, this._shift - Node2.Bits);
      } else {
        value = this._tail.get(index - offset);
      }
      return value;
    }
    has(index) {
      return index >= 0 && index < this._size;
    }
    set(index, value) {
      if (index < 0 || index >= this._size || this._tail.isEmpty()) {
        return this;
      }
      const offset = this._size - this._tail.values.length;
      let head = this._head;
      let tail = this._tail;
      if (index < offset) {
        if (head.isEmpty()) {
          return this;
        }
        head = head.set(index, value, this._shift);
        if (head === this._head) {
          return this;
        }
      } else {
        tail = tail.set(index - offset, value);
        if (tail === this._tail) {
          return this;
        }
      }
      return new _List(head, tail, this._shift, this._size);
    }
    insert(index, value) {
      if (index < 0 || index > this.size) {
        return this;
      }
      if (index === 0) {
        return this.prepend(value);
      }
      if (index === this.size) {
        return this.append(value);
      }
      return _List.from(Iterable.concat(Iterable.take(this, index), Iterable.from([value]), Iterable.skip(this, index)));
    }
    append(value) {
      return this._push(value);
    }
    prepend(value) {
      return _List.of(value).concat(this);
    }
    concat(iterable) {
      return Iterable.reduce(iterable, (list, value) => list._push(value), this);
    }
    subtract(iterable) {
      return _List.from(Iterable.subtract(this, iterable));
    }
    intersect(iterable) {
      return _List.from(Iterable.intersect(this, iterable));
    }
    tee(callback, ...args) {
      callback(this, ...args);
      return this;
    }
    zip(iterable) {
      return _List.from(Iterable.zip(this, iterable));
    }
    first() {
      return this._tail.isEmpty() ? None : Option.of(this._tail.values[0]);
    }
    last() {
      return Iterable.last(this);
    }
    take(count) {
      return _List.from(Iterable.take(this, count));
    }
    takeWhile(predicate) {
      return _List.from(Iterable.takeWhile(this, predicate));
    }
    takeUntil(predicate) {
      return this.takeWhile(not6(predicate));
    }
    takeLast(count = 1) {
      return _List.from(Iterable.takeLast(this, count));
    }
    takeLastWhile(predicate) {
      return _List.from(Iterable.takeLastWhile(this, predicate));
    }
    takeLastUntil(predicate) {
      return this.takeLastWhile(not6(predicate));
    }
    skip(count) {
      return _List.from(Iterable.skip(this, count));
    }
    skipWhile(predicate) {
      return _List.from(Iterable.skipWhile(this, predicate));
    }
    skipUntil(predicate) {
      return this.skipWhile(not6(predicate));
    }
    skipLast(count = 1) {
      let list = this;
      while (count-- > 0) {
        list = list._pop();
      }
      return list;
    }
    skipLastWhile(predicate) {
      return _List.from(Iterable.skipLastWhile(this, predicate));
    }
    skipLastUntil(predicate) {
      return this.skipLastWhile(not6(predicate));
    }
    trim(predicate) {
      return this.trimLeading(predicate).trimTrailing(predicate);
    }
    trimLeading(predicate) {
      return this.skipWhile(predicate);
    }
    trimTrailing(predicate) {
      return this.skipLastWhile(predicate);
    }
    rest() {
      return this.skip(1);
    }
    slice(start, end) {
      return _List.from(Iterable.slice(this, start, end));
    }
    reverse() {
      return _List.from(Iterable.reverse(this));
    }
    join(separator) {
      return Iterable.join(this, separator);
    }
    sort() {
      return this.sortWith(compareComparable5);
    }
    sortWith(comparer) {
      return _List.from(Iterable.sortWith(this, comparer));
    }
    compare(iterable) {
      return this.compareWith(iterable, compareComparable5);
    }
    compareWith(iterable, comparer) {
      return Iterable.compareWith(this, iterable, comparer);
    }
    groupBy(grouper) {
      return this.reduce((groups, value) => {
        const group = grouper(value);
        return groups.set(group, groups.get(group).getOrElse(() => _List.empty())._push(value));
      }, Map2.empty());
    }
    equals(value) {
      return value instanceof _List && value._size === this._size && value._head.equals(this._head) && value._tail.equals(this._tail);
    }
    hash(hash2) {
      for (const value of this) {
        hash2.writeUnknown(value);
      }
      hash2.writeUint32(this._size);
    }
    *[Symbol.iterator]() {
      yield* this._head;
      yield* this._tail;
    }
    toArray() {
      return [...this];
    }
    toJSON(options) {
      return this.toArray().map((value) => Serializable.toJSON(value, options));
    }
    toString() {
      const values = this.join(", ");
      return `List [${values === "" ? "" : ` ${values} `}]`;
    }
    _push(value) {
      if (this._tail.isEmpty()) {
        return new _List(Empty3, Leaf2.of([value]), 0, 1);
      }
      if (this._tail.hasCapacity()) {
        return new _List(this._head, Leaf2.of([...this._tail.values, value]), this._shift, this._size + 1);
      }
      if (this._head.isEmpty()) {
        return new _List(this._tail, Leaf2.of([value]), this._shift + Node2.Bits, this._size + 1);
      }
      const index = this._size - Node2.Capacity;
      let head = this._head;
      let shift = this._shift;
      if (head.isLeaf() || index === Node2.overflow(shift)) {
        head = Branch.of([head]);
        shift += Node2.Bits;
      } else {
        head = head.clone();
      }
      let prev = head;
      let level = shift - Node2.Bits;
      while (level > 0) {
        const i = Node2.fragment(index, level);
        level -= Node2.Bits;
        const next = prev.nodes[i];
        if (next === void 0) {
          if (level === 0) {
            prev.nodes[i] = this._tail;
          } else {
            prev.nodes[i] = prev = Branch.empty();
          }
        } else {
          prev.nodes[i] = prev = next.clone();
        }
      }
      return new _List(head, Leaf2.of([value]), shift, this._size + 1);
    }
    _pop() {
      if (this._tail.isEmpty()) {
        return this;
      }
      if (this._size === 1) {
        return _List.empty();
      }
      if (this._tail.values.length > 1) {
        return new _List(this._head, Leaf2.of(this._tail.values.slice(0, this._tail.values.length - 1)), this._shift, this._size - 1);
      }
      if (this._head.isLeaf() || this._head.isEmpty()) {
        return new _List(Empty3, this._head, this._shift - Node2.Bits, this._size - 1);
      }
      let head = this._head.clone();
      let tail = this._tail;
      let shift = this._shift;
      const index = this._size - Node2.Capacity - 1;
      let prev = head;
      let level = shift - Node2.Bits;
      while (level > 0) {
        const fragment = Node2.fragment(index, level);
        level -= Node2.Bits;
        const next = prev.nodes[fragment];
        if (next.isLeaf()) {
          prev.nodes.pop();
          tail = next;
        } else {
          prev = prev.nodes[fragment] = next.clone();
        }
      }
      if (index === Node2.underflow(shift)) {
        head = head.nodes[0];
        shift -= Node2.Bits;
      }
      return new _List(head, tail, shift, this._size - 1);
    }
  };
  (function(List2) {
    function isList(value) {
      return value instanceof List2;
    }
    List2.isList = isList;
    function from(iterable) {
      if (isList(iterable)) {
        return iterable;
      }
      if (Array2.isArray(iterable)) {
        return fromArray(iterable);
      }
      return fromIterable(iterable);
    }
    List2.from = from;
    function fromArray(array) {
      const size = array.length;
      if (size <= Node2.Capacity) {
        return List2.of(...array);
      }
      return Array2.reduce(array, (list, value) => list.append(value), List2.empty());
    }
    List2.fromArray = fromArray;
    function fromIterable(iterable) {
      return Iterable.reduce(iterable, (list, value) => list.append(value), List2.empty());
    }
    List2.fromIterable = fromIterable;
  })(List || (List = {}));

  // node_modules/@siteimprove/alfa-act/dist/cache.js
  var Cache = class _Cache {
    static empty() {
      return new _Cache();
    }
    _storage = /* @__PURE__ */ new WeakMap();
    constructor() {
    }
    get(rule, ifMissing) {
      let outcomes = this._storage.get(rule);
      if (outcomes === void 0) {
        outcomes = ifMissing();
        this._storage.set(rule, outcomes);
      }
      return outcomes;
    }
  };

  // node_modules/@siteimprove/alfa-string/dist/string.js
  var String2;
  (function(String3) {
    function and(...transformers) {
      return (input) => transformers.reduce((input2, transformer) => transformer(input2), input);
    }
    String3.and = and;
    function indent(input) {
      return input.replace(/^/gm, "  ");
    }
    String3.indent = indent;
    function flatten2(input) {
      return input.replace(/\s+/g, " ");
    }
    String3.flatten = flatten2;
    function normalize(input, toLowerCase2 = true) {
      return flatten2(toLowerCase2 ? input.toLowerCase() : input).trim();
    }
    String3.normalize = normalize;
    function removePunctuation(input) {
      return input.replace(/\p{P}|\p{S}|\p{Cf}/gu, "");
    }
    String3.removePunctuation = removePunctuation;
    function toLowerCase(input) {
      return input.toLowerCase();
    }
    String3.toLowerCase = toLowerCase;
    function isWhitespace(input, allowEmpty = true) {
      return (allowEmpty || input.length > 0) && input.trim() === "";
    }
    String3.isWhitespace = isWhitespace;
    function hasWhitespace(input) {
      return /\s/.test(input);
    }
    String3.hasWhitespace = hasWhitespace;
    function hasSoftWrapOpportunity(input) {
      return /\s|\p{P}/u.test(input);
    }
    String3.hasSoftWrapOpportunity = hasSoftWrapOpportunity;
  })(String2 || (String2 = {}));

  // node_modules/@siteimprove/alfa-act/dist/diagnostic.js
  var Diagnostic = class _Diagnostic {
    static of(message) {
      return new _Diagnostic(String2.normalize(message, false));
    }
    _message;
    constructor(message) {
      this._message = message;
    }
    get message() {
      return this._message;
    }
    equals(value) {
      return value instanceof _Diagnostic && value._message === this._message;
    }
    hash(hash2) {
      hash2.writeString(this._message);
    }
    toJSON(options) {
      return {
        message: this._message
      };
    }
  };
  (function(Diagnostic2) {
    function isDiagnostic(value) {
      return value instanceof Diagnostic2;
    }
    Diagnostic2.isDiagnostic = isDiagnostic;
    Diagnostic2.empty = Diagnostic2.of("No extra information");
  })(Diagnostic || (Diagnostic = {}));

  // node_modules/@siteimprove/alfa-either/dist/left.js
  var Left = class _Left {
    static of(value) {
      return new _Left(value);
    }
    _value;
    constructor(value) {
      this._value = value;
    }
    isLeft() {
      return true;
    }
    isRight() {
      return false;
    }
    map() {
      return this;
    }
    apply() {
      return this;
    }
    flatMap() {
      return this;
    }
    flatten() {
      return this;
    }
    reduce(reducer, accumulator) {
      return accumulator;
    }
    either(left) {
      return left(this._value);
    }
    get() {
      return this._value;
    }
    left() {
      return Option.of(this._value);
    }
    right() {
      return None;
    }
    teeLeft(callback) {
      callback(this._value);
      return this;
    }
    teeRight() {
      return this;
    }
    equals(value) {
      return value instanceof _Left && Equatable.equals(value._value, this._value);
    }
    hash(hash2) {
      hash2.writeBoolean(false).writeUnknown(this._value);
    }
    *[Symbol.iterator]() {
      yield this._value;
    }
    toJSON() {
      return {
        type: "left",
        value: Serializable.toJSON(this._value)
      };
    }
    toString() {
      return `Left { ${this._value} }`;
    }
  };
  (function(Left2) {
    function isLeft(value) {
      return value instanceof Left2;
    }
    Left2.isLeft = isLeft;
  })(Left || (Left = {}));

  // node_modules/@siteimprove/alfa-either/dist/right.js
  var Right = class _Right {
    static of(value) {
      return new _Right(value);
    }
    _value;
    constructor(value) {
      this._value = value;
    }
    isLeft() {
      return false;
    }
    isRight() {
      return true;
    }
    map(mapper) {
      return new _Right(mapper(this._value));
    }
    apply(mapper) {
      return mapper.map((mapper2) => mapper2(this._value));
    }
    flatMap(mapper) {
      return mapper(this._value);
    }
    flatten() {
      return this._value;
    }
    reduce(reducer, accumulator) {
      return reducer(accumulator, this._value);
    }
    either(left, right) {
      return right(this._value);
    }
    get() {
      return this._value;
    }
    left() {
      return None;
    }
    right() {
      return Option.of(this._value);
    }
    teeLeft() {
      return this;
    }
    teeRight(callback) {
      callback(this._value);
      return this;
    }
    equals(value) {
      return value instanceof _Right && Equatable.equals(value._value, this._value);
    }
    hash(hash2) {
      hash2.writeBoolean(true).writeUnknown(this._value);
    }
    *[Symbol.iterator]() {
      yield this._value;
    }
    toJSON() {
      return {
        type: "right",
        value: Serializable.toJSON(this._value)
      };
    }
    toString() {
      return `Right { ${this._value} }`;
    }
  };
  (function(Right2) {
    function isRight(value) {
      return value instanceof Right2;
    }
    Right2.isRight = isRight;
  })(Right || (Right = {}));

  // node_modules/@siteimprove/alfa-either/dist/either.js
  var Either;
  (function(Either2) {
    function isEither(value) {
      return isLeft(value) || isRight(value);
    }
    Either2.isEither = isEither;
    function isLeft(value) {
      return Left.isLeft(value);
    }
    Either2.isLeft = isLeft;
    function isRight(value) {
      return Right.isRight(value);
    }
    Either2.isRight = isRight;
    function left(value) {
      return Left.of(value);
    }
    Either2.left = left;
    function right(value) {
      return Right.of(value);
    }
    Either2.right = right;
  })(Either || (Either = {}));

  // node_modules/@siteimprove/alfa-tuple/dist/tuple.js
  var Tuple;
  (function(Tuple2) {
    function of(...values) {
      return values;
    }
    Tuple2.of = of;
    function empty() {
      return [];
    }
    Tuple2.empty = empty;
    function size(tuple) {
      return Array2.size(tuple);
    }
    Tuple2.size = size;
    function copy(tuple) {
      return Array2.copy(tuple);
    }
    Tuple2.copy = copy;
    function forEach(tuple, callback) {
      Array2.forEach(tuple, callback);
    }
    Tuple2.forEach = forEach;
    function map(tuple, mapper) {
      return Array2.map(tuple, mapper);
    }
    Tuple2.map = map;
    function reduce2(tuple, reducer, accumulator) {
      return Array2.reduce(tuple, reducer, accumulator);
    }
    Tuple2.reduce = reduce2;
    function reduceWhile(tuple, predicate, reducer, accumulator) {
      return Array2.reduceWhile(tuple, predicate, reducer, accumulator);
    }
    Tuple2.reduceWhile = reduceWhile;
    function reduceUntil(tuple, predicate, reducer, accumulator) {
      return Array2.reduceUntil(tuple, predicate, reducer, accumulator);
    }
    Tuple2.reduceUntil = reduceUntil;
    function filter(tuple, predicate) {
      return Array2.filter(tuple, predicate);
    }
    Tuple2.filter = filter;
    function reject(tuple, predicate) {
      return Array2.filter(tuple, predicate);
    }
    Tuple2.reject = reject;
    function find(tuple, predicate) {
      return Array2.find(tuple, predicate);
    }
    Tuple2.find = find;
    function findLast(tuple, predicate) {
      return Array2.findLast(tuple, predicate);
    }
    Tuple2.findLast = findLast;
    function includes(tuple, value) {
      return Array2.includes(tuple, value);
    }
    Tuple2.includes = includes;
    function collect(tuple, mapper) {
      return Array2.collect(tuple, mapper);
    }
    Tuple2.collect = collect;
    function collectFirst(tuple, mapper) {
      return Array2.collectFirst(tuple, mapper);
    }
    Tuple2.collectFirst = collectFirst;
    function some(tuple, predicate) {
      return Array2.some(tuple, predicate);
    }
    Tuple2.some = some;
    function none(tuple, predicate) {
      return Array2.none(tuple, predicate);
    }
    Tuple2.none = none;
    function every(tuple, predicate) {
      return Array2.every(tuple, predicate);
    }
    Tuple2.every = every;
    function count(tuple, predicate) {
      return Array2.count(tuple, predicate);
    }
    Tuple2.count = count;
    function get(tuple, index) {
      return Array2.get(tuple, index);
    }
    Tuple2.get = get;
    function has(tuple, index) {
      return Array2.has(tuple, index);
    }
    Tuple2.has = has;
    function set2(tuple, index, value) {
      return Array2.set(copy(tuple), index, value);
    }
    Tuple2.set = set2;
    function insert2(tuple, index, value) {
      return Array2.insert(copy(tuple), index, value);
    }
    Tuple2.insert = insert2;
    function append(tuple, value) {
      return Array2.append(copy(tuple), value);
    }
    Tuple2.append = append;
    function prepend(tuple, value) {
      return Array2.prepend(copy(tuple), value);
    }
    Tuple2.prepend = prepend;
    function first(tuple) {
      return Array2.first(tuple);
    }
    Tuple2.first = first;
    function last(tuple) {
      return Array2.last(tuple);
    }
    Tuple2.last = last;
    function search(tuple, value, comparer) {
      return Array2.search(tuple, value, comparer);
    }
    Tuple2.search = search;
    function equals2(a, b) {
      return Array2.equals(a, b);
    }
    Tuple2.equals = equals2;
    function hash2(tuple, hash3) {
      Array2.hash(tuple, hash3);
    }
    Tuple2.hash = hash2;
    function iterator(tuple) {
      return Array2.iterator(tuple);
    }
    Tuple2.iterator = iterator;
  })(Tuple || (Tuple = {}));

  // node_modules/@siteimprove/alfa-act/dist/question.js
  var { isOption } = Option;
  var { isBoolean: isBoolean3, isFunction: isFunction4 } = Refinement;
  var Question = class _Question {
    static of(type, uri, message, subject, context, options = {}) {
      const { fallback = None, diagnostic = Diagnostic.empty } = options;
      return new _Question(type, uri, message, diagnostic, fallback, subject, context, (answer) => answer);
    }
    _type;
    _uri;
    _message;
    _diagnostic;
    _fallback;
    _subject;
    _context;
    _quester;
    constructor(type, uri, message, diagnostic, fallback, subject, context, quester) {
      this._type = type;
      this._uri = uri;
      this._message = message;
      this._diagnostic = diagnostic;
      this._fallback = fallback;
      this._subject = subject;
      this._context = context;
      this._quester = quester;
    }
    get type() {
      return this._type;
    }
    get uri() {
      return this._uri;
    }
    get message() {
      return this._message;
    }
    get diagnostic() {
      return this._diagnostic;
    }
    get fallback() {
      return this._fallback;
    }
    get subject() {
      return this._subject;
    }
    get context() {
      return this._context;
    }
    isRhetorical() {
      return this instanceof _Question.Rhetorical;
    }
    answer(answer) {
      return this._quester(answer);
    }
    answerIf(conditionOrPredicateOrAnswer, answerOrMerger) {
      let condition = false;
      let answer;
      let diagnostic = this._diagnostic;
      if (isBoolean3(conditionOrPredicateOrAnswer)) {
        condition = conditionOrPredicateOrAnswer;
        answer = answerOrMerger;
      } else if (isFunction4(conditionOrPredicateOrAnswer)) {
        condition = conditionOrPredicateOrAnswer(this._subject, this._context);
        answer = answerOrMerger;
      } else if (isOption(conditionOrPredicateOrAnswer)) {
        if (conditionOrPredicateOrAnswer.isSome()) {
          condition = true;
          answer = conditionOrPredicateOrAnswer.get();
        }
      } else {
        condition = conditionOrPredicateOrAnswer.isOk();
        if (condition) {
          answer = conditionOrPredicateOrAnswer.getUnsafe();
        } else {
          const error = conditionOrPredicateOrAnswer.getErrUnsafe();
          if (Diagnostic.isDiagnostic(error)) {
            const merger = answerOrMerger ?? // Default is to overwrite the old diagnostic
            ((old, cur) => cur);
            diagnostic = merger(diagnostic, error);
          }
        }
      }
      return condition ? new _Question.Rhetorical(this._type, this._uri, this._message, this._diagnostic, this._subject, this._context, this.answer(answer)) : new _Question(this._type, this._uri, this._message, diagnostic, this._fallback, this._subject, this._context, this._quester);
    }
    map(mapper) {
      return new _Question(this._type, this._uri, this._message, this._diagnostic, this._fallback, this._subject, this._context, (answer) => mapper(this._quester(answer)));
    }
    apply(mapper) {
      return mapper.flatMap((mapper2) => this.map(mapper2));
    }
    flatMap(mapper) {
      return new _Question(this._type, this._uri, this._message, this._diagnostic, this._fallback, this._subject, this._context, (answer) => mapper(this._quester(answer))._quester(answer));
    }
    flatten() {
      return new _Question(this._type, this._uri, this._message, this._diagnostic, this._fallback, this._subject, this._context, (answer) => this._quester(answer)._quester(answer));
    }
    toJSON() {
      return {
        type: Serializable.toJSON(this._type),
        uri: this._uri,
        message: this._message,
        diagnostic: this._diagnostic.toJSON(),
        fallback: this._fallback.toJSON(),
        subject: Serializable.toJSON(this._subject),
        context: Serializable.toJSON(this._context)
      };
    }
  };
  (function(Question2) {
    function isQuestion(value) {
      return value instanceof Question2;
    }
    Question2.isQuestion = isQuestion;
    class Rhetorical extends Question2 {
      _answer;
      constructor(type, uri, message, diagnostic, subject, context, answer) {
        super(type, uri, message, diagnostic, None, subject, context, () => answer);
        this._answer = answer;
      }
      answer() {
        return this._answer;
      }
      /**
       * @remarks
       * Overriding {@link (Question:class).map} ensures that the answer to a
       * rhetorical question is not lost as the question is transformed.
       */
      map(mapper) {
        return new Rhetorical(this._type, this._uri, this._message, this._diagnostic, this._subject, this._context, mapper(this._answer));
      }
    }
    Question2.Rhetorical = Rhetorical;
  })(Question || (Question = {}));

  // node_modules/@siteimprove/alfa-act/dist/interview.js
  var Interview;
  (function(Interview2) {
    function conduct(interview, rule, oracle, oracleUsed = false) {
      if (interview instanceof Question) {
        let answer;
        if (interview.isRhetorical()) {
          answer = Future.now(Option.of(interview.answer()));
        } else {
          answer = oracle(rule, interview).map((option) => option.tee((_) => oracleUsed = true).or(interview.fallback).map(interview.answer.bind(interview)));
        }
        return answer.flatMap((answer2) => answer2.map((answer3) => conduct(answer3, rule, oracle, oracleUsed)).getOrElse(() => Future.now(Either.right(Tuple.of(interview.diagnostic, oracleUsed)))));
      }
      return Future.now(Either.left(Tuple.of(interview, oracleUsed)));
    }
    Interview2.conduct = conduct;
  })(Interview || (Interview = {}));

  // node_modules/@siteimprove/alfa-record/dist/record.js
  var Record = class _Record {
    static of(properties) {
      const keys3 = Object.keys(properties ?? {}).sort();
      return new _Record(new Map(Iterable.map(keys3, (key, i) => [key, i])), keys3, List.from(keys3.map((key) => properties[key])));
    }
    _indices;
    _keys;
    _values;
    constructor(indices, keys3, values) {
      this._indices = indices;
      this._keys = keys3;
      this._values = values;
    }
    has(key) {
      return this._indices.has(key);
    }
    get(key) {
      const i = this._indices.get(key);
      if (i === void 0) {
        return None;
      }
      return this._values.get(i);
    }
    set(key, value) {
      const i = this._indices.get(key);
      if (i === void 0) {
        return this;
      }
      return new _Record(this._indices, this._keys, this._values.set(i, value));
    }
    reduce(reducer, accumulator) {
      return Iterable.reduce(this, (accumulator2, [key, value]) => reducer(accumulator2, value, key), accumulator);
    }
    some(predicate) {
      return Iterable.some(this, ([key, value]) => predicate(value, key));
    }
    every(predicate) {
      return Iterable.every(this, ([key, value]) => predicate(value, key));
    }
    equals(value) {
      return value instanceof _Record && value._keys.length === this._keys.length && value._keys.every((key, i) => key === this._keys[i]) && value._values.equals(this._values);
    }
    *keys() {
      yield* this._keys;
    }
    *values() {
      yield* this._values;
    }
    *entries() {
      yield* this;
    }
    *[Symbol.iterator]() {
      let i = 0;
      for (const value of this._values) {
        yield [this._keys[i++], value];
      }
    }
    toArray() {
      return [...this];
    }
    toJSON(options) {
      const json = {};
      for (const [key, value] of this) {
        json[key] = Serializable.toJSON(value, options);
      }
      return json;
    }
    toString() {
      const entries = this.toArray().map(([key, value]) => `${key}: ${value}`).join(", ");
      return `Record {${entries === "" ? "" : ` ${entries} `}}`;
    }
  };
  (function(Record2) {
    function isRecord(value) {
      return value instanceof Record2;
    }
    Record2.isRecord = isRecord;
    function from(entries) {
      const record = {};
      for (const [key, value] of entries) {
        record[key] = value;
      }
      return Record2.of(record);
    }
    Record2.from = from;
  })(Record || (Record = {}));

  // node_modules/@siteimprove/alfa-result/dist/err.js
  var { not: not7, test: test3 } = Predicate;
  var Err = class _Err {
    static of(error) {
      return new _Err(error);
    }
    _error;
    constructor(error) {
      this._error = error;
    }
    isOk() {
      return false;
    }
    isErr() {
      return true;
    }
    map() {
      return this;
    }
    mapErr(mapper) {
      return new _Err(mapper(this._error));
    }
    mapOrElse(ok, err) {
      return err(this._error);
    }
    apply() {
      return this;
    }
    flatMap() {
      return this;
    }
    flatten() {
      return this;
    }
    reduce(reducer, accumulator) {
      return accumulator;
    }
    includes() {
      return false;
    }
    includesErr(error) {
      return Equatable.equals(this._error, error);
    }
    some() {
      return false;
    }
    someErr(predicate) {
      return test3(predicate, this._error);
    }
    none() {
      return true;
    }
    noneErr(predicate) {
      return test3(not7(predicate), this._error);
    }
    every() {
      return true;
    }
    everyErr(predicate) {
      return test3(predicate, this._error);
    }
    and() {
      return this;
    }
    andThen() {
      return this;
    }
    or(result) {
      return result;
    }
    orElse(result) {
      return result();
    }
    /**
     * @internal
     */
    getUnsafe(message = "Attempted to .getUnsafe() from Err") {
      throw new Error(message);
    }
    /**
     * @internal
     */
    getErrUnsafe() {
      return this._error;
    }
    getErr() {
      return this._error;
    }
    getOr(value) {
      return value;
    }
    getOrElse(value) {
      return value();
    }
    getErrOr() {
      return this._error;
    }
    getErrOrElse() {
      return this._error;
    }
    ok() {
      return None;
    }
    err() {
      return Option.of(this._error);
    }
    tee() {
      return this;
    }
    teeErr(callback) {
      callback(this._error);
      return this;
    }
    equals(value) {
      return value instanceof _Err && Equatable.equals(value._error, this._error);
    }
    hash(hash2) {
      hash2.writeBoolean(false).writeUnknown(this._error);
    }
    *[Symbol.iterator]() {
    }
    toJSON(options) {
      return {
        type: "err",
        error: Serializable.toJSON(this._error, options)
      };
    }
    toString() {
      return `Err { ${this._error} }`;
    }
  };
  (function(Err2) {
    function isErr(value) {
      return value instanceof Err2;
    }
    Err2.isErr = isErr;
  })(Err || (Err = {}));

  // node_modules/@siteimprove/alfa-result/dist/ok.js
  var { not: not8, test: test4 } = Predicate;
  var Ok = class _Ok {
    static of(value) {
      return new _Ok(value);
    }
    _value;
    constructor(value) {
      this._value = value;
    }
    isOk() {
      return true;
    }
    isErr() {
      return false;
    }
    map(mapper) {
      return new _Ok(mapper(this._value));
    }
    mapErr() {
      return this;
    }
    mapOrElse(ok) {
      return ok(this._value);
    }
    apply(mapper) {
      return mapper.map((mapper2) => mapper2(this._value));
    }
    flatMap(mapper) {
      return mapper(this._value);
    }
    flatten() {
      return this._value;
    }
    reduce(reducer, accumulator) {
      return reducer(accumulator, this._value);
    }
    includes(value) {
      return Equatable.equals(this._value, value);
    }
    includesErr() {
      return false;
    }
    some(predicate) {
      return test4(predicate, this._value);
    }
    someErr() {
      return false;
    }
    none(predicate) {
      return test4(not8(predicate), this._value);
    }
    noneErr() {
      return true;
    }
    every(predicate) {
      return test4(predicate, this._value);
    }
    everyErr() {
      return true;
    }
    and(result) {
      return result;
    }
    andThen(result) {
      return result(this._value);
    }
    or() {
      return this;
    }
    orElse() {
      return this;
    }
    get() {
      return this._value;
    }
    /**
     * @internal
     */
    getUnsafe() {
      return this._value;
    }
    /**
     * @internal
     */
    getErrUnsafe(message = "Attempted to .getErrUnsafe() from Ok") {
      throw new Error(message);
    }
    getOr() {
      return this._value;
    }
    getOrElse() {
      return this._value;
    }
    getErrOr(error) {
      return error;
    }
    getErrOrElse(error) {
      return error();
    }
    ok() {
      return Option.of(this._value);
    }
    err() {
      return None;
    }
    tee(callback) {
      callback(this._value);
      return this;
    }
    teeErr() {
      return this;
    }
    equals(value) {
      return value instanceof _Ok && Equatable.equals(value._value, this._value);
    }
    hash(hash2) {
      hash2.writeBoolean(true).writeUnknown(this._value);
    }
    *[Symbol.iterator]() {
      yield this._value;
    }
    toJSON(options) {
      return {
        type: "ok",
        value: Serializable.toJSON(this._value, options)
      };
    }
    toString() {
      return `Ok { ${this._value} }`;
    }
  };
  (function(Ok2) {
    function isOk(value) {
      return value instanceof Ok2;
    }
    Ok2.isOk = isOk;
  })(Ok || (Ok = {}));

  // node_modules/@siteimprove/alfa-result/dist/result.js
  var Result;
  (function(Result2) {
    function isResult(value) {
      return isOk(value) || isErr(value);
    }
    Result2.isResult = isResult;
    function isOk(value) {
      return Ok.isOk(value);
    }
    Result2.isOk = isOk;
    function isErr(value) {
      return Err.isErr(value);
    }
    Result2.isErr = isErr;
    function of(value) {
      return Ok.of(value);
    }
    Result2.of = of;
    function from(thunk) {
      let value;
      try {
        value = thunk();
      } catch (error) {
        return Err.of(error);
      }
      if (value instanceof Promise) {
        return value.then((value2) => Ok.of(value2)).catch((error) => Err.of(error));
      }
      return Ok.of(value);
    }
    Result2.from = from;
  })(Result || (Result = {}));

  // node_modules/@siteimprove/alfa-trilean/dist/trilean.js
  var Trilean;
  (function(Trilean2) {
    function test5(predicate, value, ...args) {
      return predicate(value, ...args);
    }
    Trilean2.test = test5;
    function fold(predicate, ifTrue, ifFalse, ifUndefined, value, ...args) {
      switch (predicate(value, ...args)) {
        case true:
          return ifTrue(value);
        case false:
          return ifFalse(value);
        case void 0:
          return ifUndefined(value);
      }
    }
    Trilean2.fold = fold;
    function not11(predicate) {
      return (value, ...args) => {
        switch (predicate(value, ...args)) {
          case true:
            return false;
          case false:
            return true;
          case void 0:
            return void 0;
        }
      };
    }
    Trilean2.not = not11;
    function and(...predicates) {
      return (value, ...args) => predicates.reduce((holds, predicate) => {
        if (holds === false) {
          return false;
        }
        if (holds === true) {
          return predicate(value, ...args);
        }
        if (predicate(value, ...args) === false) {
          return false;
        } else {
          return void 0;
        }
      }, true);
    }
    Trilean2.and = and;
    function or(...predicates) {
      return (value, ...args) => predicates.reduce((holds, predicate) => {
        if (holds === true) {
          return true;
        }
        if (holds === false) {
          return predicate(value, ...args);
        }
        if (predicate(value, ...args) === true) {
          return true;
        } else {
          return void 0;
        }
      }, false);
    }
    Trilean2.or = or;
    function xor(left, right) {
      return and(or(left, right), not11(and(left, right)));
    }
    Trilean2.xor = xor;
    function nor(left, right) {
      return not11(or(left, right));
    }
    Trilean2.nor = nor;
    function nand(left, right) {
      return not11(and(left, right));
    }
    Trilean2.nand = nand;
    function some(iterable, predicate) {
      return Iterable.reduce(iterable, (result, value, i) => test5(or(() => result, predicate), value, i), false);
    }
    Trilean2.some = some;
    function none(iterable, predicate) {
      return every(iterable, not11(predicate));
    }
    Trilean2.none = none;
    function every(iterable, predicate) {
      return Iterable.reduce(iterable, (result, value, i) => test5(and(() => result, predicate), value, i), true);
    }
    Trilean2.every = every;
  })(Trilean || (Trilean = {}));

  // node_modules/@siteimprove/alfa-earl/dist/serializable.js
  var { isFunction: isFunction5, isObject: isObject5 } = Refinement;
  var Serializable2;
  (function(Serializable4) {
    function isSerializable(value) {
      return isObject5(value) && isFunction5(value.toEARL);
    }
    Serializable4.isSerializable = isSerializable;
    function toEARL(value) {
      if (isSerializable(value)) {
        return Some.of(value.toEARL());
      }
      return None;
    }
    Serializable4.toEARL = toEARL;
  })(Serializable2 || (Serializable2 = {}));

  // node_modules/@siteimprove/alfa-sarif/dist/serializable.js
  var { isFunction: isFunction6, isObject: isObject6 } = Refinement;
  var Serializable3;
  (function(Serializable4) {
    function isSerializable(value) {
      return isObject6(value) && isFunction6(value.toSARIF);
    }
    Serializable4.isSerializable = isSerializable;
    function toSARIF(value) {
      if (isSerializable(value)) {
        return Some.of(value.toSARIF());
      }
      return None;
    }
    Serializable4.toSARIF = toSARIF;
  })(Serializable3 || (Serializable3 = {}));

  // node_modules/@siteimprove/alfa-act/dist/outcome.js
  var Outcome = class _Outcome {
    /**
     * {@link https://www.w3.org/TR/EARL10-Schema/#outcome}
     */
    _outcome;
    /**
     * {@link https://www.w3.org/TR/EARL10-Schema/#test}
     * While this is called a "test" in EARL, in Alfa this is always a "rule".
     */
    _rule;
    /**
     * {@link https://www.w3.org/TR/EARL10-Schema/#mode}
     */
    _mode;
    constructor(outcome, rule, mode) {
      this._outcome = outcome;
      this._rule = rule;
      this._mode = mode;
    }
    /**
     * {@link https://www.w3.org/TR/EARL10-Schema/#outcome}
     */
    get outcome() {
      return this._outcome;
    }
    /**
     * {@link https://www.w3.org/TR/EARL10-Schema/#test}
     * While this is called a "test" in EARL, in Alfa this is always a "rule".
     */
    get rule() {
      return this._rule;
    }
    /**
     * {@link https://www.w3.org/TR/EARL10-Schema/#mode}
     */
    get mode() {
      return this._mode;
    }
    get isSemiAuto() {
      return this._mode === _Outcome.Mode.SemiAuto;
    }
    get target() {
      return void 0;
    }
    equals(value) {
      return value instanceof _Outcome && value._rule.equals(this._rule) && value._outcome === this._outcome && value._mode === this._mode;
    }
    hash(hash2) {
      this._rule.hash(hash2);
      hash2.writeString(this._outcome);
      hash2.writeString(this._mode);
    }
    toJSON(options) {
      return {
        outcome: this._outcome,
        rule: this._rule.toJSON(),
        mode: this._mode
      };
    }
    toEARL() {
      return {
        "@context": {
          earl: "http://www.w3.org/ns/earl#"
        },
        "@type": "earl:Assertion",
        "earl:mode": `earl:${this._mode}`,
        "earl:test": {
          "@id": this._rule.uri
        }
      };
    }
  };
  (function(Outcome2) {
    let Value2;
    (function(Value3) {
      Value3["Inapplicable"] = "inapplicable";
      Value3["Passed"] = "passed";
      Value3["Failed"] = "failed";
      Value3["CantTell"] = "cantTell";
    })(Value2 = Outcome2.Value || (Outcome2.Value = {}));
    let Mode;
    (function(Mode2) {
      Mode2["Automatic"] = "automatic";
      Mode2["SemiAuto"] = "semiAuto";
      Mode2["Manual"] = "manual";
    })(Mode = Outcome2.Mode || (Outcome2.Mode = {}));
    class Passed extends Outcome2 {
      static of(rule, target, expectations, mode) {
        return new Passed(rule, target, expectations, mode);
      }
      _target;
      _expectations;
      constructor(rule, target, expectations, mode) {
        super(Value2.Passed, rule, mode);
        this._target = target;
        this._expectations = Record.from(expectations.toArray());
      }
      get target() {
        return this._target;
      }
      get expectations() {
        return this._expectations;
      }
      equals(value) {
        return super.equals(value) && value instanceof Passed && Equatable.equals(value._target, this._target) && value._expectations.equals(this._expectations);
      }
      hash(hash2) {
        super.hash(hash2);
        this._target.hash(hash2);
        for (const [id, result] of this._expectations) {
          hash2.writeString(id);
          result.hash(hash2);
        }
      }
      toJSON(options) {
        return {
          ...super.toJSON(options),
          target: Serializable.toJSON(this._target, options),
          expectations: this._expectations.toArray().map(([id, expectation]) => [id, expectation.toJSON(options)])
        };
      }
      toEARL() {
        const outcome = {
          ...super.toEARL(),
          "earl:result": {
            "@type": "earl:TestResult",
            "earl:outcome": {
              "@id": "earl:passed"
            },
            "earl:info": this._expectations.toArray().reduce((message, [, expectation]) => (
              // the outcome is passed, so all expectations should be Ok
              message + "\n" + expectation.getUnsafe().message
            ), "").trim()
          }
        };
        for (const pointer of Serializable2.toEARL(this._target)) {
          outcome["earl:result"]["earl:pointer"] = pointer;
        }
        return outcome;
      }
      toSARIF() {
        const message = "The test target passes all requirements:\n\n" + this._expectations.toArray().map(([, expectation]) => `- ${expectation.getUnsafe().message}`).join("\n");
        const locations = [];
        for (const location of Serializable3.toSARIF(this._target)) {
          locations.push(location);
        }
        return {
          ruleId: this._rule.uri,
          kind: "pass",
          level: "none",
          message: {
            text: message,
            markdown: message
          },
          locations
        };
      }
    }
    Outcome2.Passed = Passed;
    (function(Passed2) {
      function isPassed(value) {
        return value instanceof Passed2;
      }
      Passed2.isPassed = isPassed;
    })(Passed = Outcome2.Passed || (Outcome2.Passed = {}));
    Outcome2.passed = Passed.of, Outcome2.isPassed = Passed.isPassed;
    class Failed extends Outcome2 {
      static of(rule, target, expectations, mode) {
        return new Failed(rule, target, expectations, mode);
      }
      _target;
      _expectations;
      constructor(rule, target, expectations, mode) {
        super(Value2.Failed, rule, mode);
        this._target = target;
        this._expectations = Record.from(expectations.toArray());
      }
      get target() {
        return this._target;
      }
      get expectations() {
        return this._expectations;
      }
      equals(value) {
        return super.equals(value) && value instanceof Failed && Equatable.equals(value._target, this._target) && value._expectations.equals(this._expectations);
      }
      hash(hash2) {
        super.hash(hash2);
        this._target.hash(hash2);
        for (const [id, result] of this._expectations) {
          hash2.writeString(id);
          result.hash(hash2);
        }
      }
      toJSON(options) {
        return {
          ...super.toJSON(options),
          target: Serializable.toJSON(this._target, options),
          expectations: this._expectations.toArray().map(([id, expectation]) => [id, expectation.toJSON(options)])
        };
      }
      toEARL() {
        const outcome = {
          ...super.toEARL(),
          "earl:result": {
            "@type": "earl:TestResult",
            "earl:outcome": {
              "@id": "earl:failed"
            },
            "earl:info": this._expectations.toArray().reduce((message, [, expectation]) => {
              if (expectation.isErr()) {
                message += "\n" + expectation.getErr().message;
              }
              return message;
            }, "").trim()
          }
        };
        for (const pointer of Serializable2.toEARL(this._target)) {
          outcome["earl:result"]["earl:pointer"] = pointer;
        }
        return outcome;
      }
      toSARIF() {
        const message = "The test target fails the following requirements:\n\n" + Iterable.join(Iterable.map(Iterable.filter(Iterable.map(this._expectations.entries(), ([, expectation]) => expectation), Err.isErr), (expectation) => `- ${expectation.getErr().message}`), "\n");
        const locations = [];
        for (const location of Serializable3.toSARIF(this._target)) {
          locations.push(location);
        }
        return {
          ruleId: this._rule.uri,
          kind: "fail",
          level: "error",
          message: {
            text: message,
            markdown: message
          },
          locations
        };
      }
    }
    Outcome2.Failed = Failed;
    (function(Failed2) {
      function isFailed(value) {
        return value instanceof Failed2;
      }
      Failed2.isFailed = isFailed;
    })(Failed = Outcome2.Failed || (Outcome2.Failed = {}));
    Outcome2.failed = Failed.of, Outcome2.isFailed = Failed.isFailed;
    class CantTell extends Outcome2 {
      static of(rule, target, diagnostic, mode) {
        return new CantTell(rule, target, diagnostic, mode);
      }
      _target;
      _diagnostic;
      constructor(rule, target, diagnostic, mode) {
        super(Value2.CantTell, rule, mode);
        this._target = target;
        this._diagnostic = diagnostic;
      }
      get target() {
        return this._target;
      }
      get diagnostic() {
        return this._diagnostic;
      }
      equals(value) {
        return super.equals(value) && value instanceof CantTell && Equatable.equals(value._target, this._target) && value._diagnostic.equals(this._diagnostic);
      }
      hash(hash2) {
        super.hash(hash2);
        this._target.hash(hash2);
        this._diagnostic.hash(hash2);
      }
      toJSON(options) {
        return {
          ...super.toJSON(options),
          target: Serializable.toJSON(this._target, options),
          diagnostic: this._diagnostic.toJSON(options)
        };
      }
      toEARL() {
        const outcome = {
          ...super.toEARL(),
          "earl:result": {
            "@type": "earl:TestResult",
            "earl:outcome": {
              "@id": "earl:cantTell"
            }
          }
        };
        for (const pointer of Serializable2.toEARL(this._target)) {
          outcome["earl:result"]["earl:pointer"] = pointer;
        }
        return outcome;
      }
      toSARIF() {
        const message = "The rule has outstanding questions that must be answered for the test target";
        const locations = [];
        for (const location of Serializable3.toSARIF(this._target)) {
          locations.push(location);
        }
        return {
          ruleId: this._rule.uri,
          kind: "review",
          level: "warning",
          message: {
            text: message,
            markdown: message
          },
          locations
        };
      }
    }
    Outcome2.CantTell = CantTell;
    (function(CantTell2) {
      function isCantTell(value) {
        return value instanceof CantTell2;
      }
      CantTell2.isCantTell = isCantTell;
    })(CantTell = Outcome2.CantTell || (Outcome2.CantTell = {}));
    Outcome2.cantTell = CantTell.of, Outcome2.isCantTell = CantTell.isCantTell;
    let Applicable;
    (function(Applicable2) {
      function isApplicable(value) {
        return Outcome2.isPassed(value) || Outcome2.isFailed(value) || Outcome2.isCantTell(value);
      }
      Applicable2.isApplicable = isApplicable;
    })(Applicable = Outcome2.Applicable || (Outcome2.Applicable = {}));
    Outcome2.isApplicable = Applicable.isApplicable;
    class Inapplicable extends Outcome2 {
      static of(rule, mode) {
        return new Inapplicable(rule, mode);
      }
      constructor(rule, mode) {
        super(Value2.Inapplicable, rule, mode);
      }
      equals(value) {
        return super.equals(value) && value instanceof Inapplicable;
      }
      toJSON(options) {
        return super.toJSON(options);
      }
      toEARL() {
        return {
          ...super.toEARL(),
          "earl:result": {
            "@type": "earl:TestResult",
            "earl:outcome": {
              "@id": "earl:inapplicable"
            }
          }
        };
      }
      toSARIF() {
        const message = "The rule did not apply to the test subject";
        return {
          ruleId: this._rule.uri,
          kind: "notApplicable",
          level: "none",
          message: {
            text: message,
            markdown: message
          }
        };
      }
    }
    Outcome2.Inapplicable = Inapplicable;
    (function(Inapplicable2) {
      function isInapplicable(value) {
        return value instanceof Inapplicable2;
      }
      Inapplicable2.isInapplicable = isInapplicable;
    })(Inapplicable = Outcome2.Inapplicable || (Outcome2.Inapplicable = {}));
    Outcome2.inapplicable = Inapplicable.of, Outcome2.isInapplicable = Inapplicable.isInapplicable;
    function from(rule, target, expectations, mode) {
      return Trilean.fold((expectations2) => Trilean.every(expectations2, (expectation) => expectation.map((expectation2) => expectation2.isOk()).getOr(void 0)), () => Passed.of(rule, target, Record.from(Iterable.map(expectations.entries(), ([id, expectation]) => [
        id,
        // Due to the predicate in every, this branch is only taken if every
        // expectation is a Some<Ok<T>>.
        expectation.getUnsafe()
      ])), mode), () => Failed.of(rule, target, Record.from(Iterable.map(expectations.entries(), ([id, expectation]) => [
        id,
        // One expectation being a Some<Err<T>> is enough to take that branch,
        // even if others are None.
        expectation.getOr(Err.of(Diagnostic.empty))
      ])), mode), () => CantTell.of(rule, target, Diagnostic.empty, mode), expectations.values());
    }
    Outcome2.from = from;
  })(Outcome || (Outcome = {}));

  // node_modules/@siteimprove/alfa-act/dist/requirement.js
  var Requirement = class _Requirement {
    _type;
    _uri;
    constructor(type, uri) {
      this._type = type;
      this._uri = uri;
    }
    get type() {
      return this._type;
    }
    get uri() {
      return this._uri;
    }
    equals(value) {
      return value instanceof _Requirement && value.uri === this.uri;
    }
    toJSON() {
      return {
        type: this._type,
        uri: this._uri
      };
    }
    toEARL() {
      return {
        "@context": {
          earl: "http://www.w3.org/ns/earl#"
        },
        "@type": ["earl:TestCriterion", "earl:TestRequirement"],
        "@id": this.uri
      };
    }
  };
  (function(Requirement2) {
    function isRequirement(value) {
      return value instanceof Requirement2;
    }
    Requirement2.isRequirement = isRequirement;
  })(Requirement || (Requirement = {}));

  // node_modules/@siteimprove/alfa-trampoline/dist/trampoline.js
  var Trampoline = class {
    run() {
      let step = this;
      while (true) {
        const next = step.step();
        if (step !== next) {
          step = next;
        } else {
          return next.run();
        }
      }
    }
    map(mapper) {
      return this.flatMap((value) => Done.of(mapper(value)));
    }
    apply(mapper) {
      return mapper.flatMap((mapper2) => this.map(mapper2));
    }
    flatten() {
      return this.flatMap((trampoline) => trampoline);
    }
    reduce(reducer, accumulator) {
      return reducer(accumulator, this.run());
    }
    tee(callback) {
      return this.map((value) => {
        callback(value);
        return value;
      });
    }
    *iterator() {
      yield this.run();
    }
    [Symbol.iterator]() {
      return this.iterator();
    }
  };
  (function(Trampoline2) {
    function isTrampoline(value) {
      return value instanceof Trampoline2;
    }
    Trampoline2.isTrampoline = isTrampoline;
    function empty() {
      return done(void 0);
    }
    Trampoline2.empty = empty;
    function done(value) {
      return Done.of(value);
    }
    Trampoline2.done = done;
    function suspend(thunk) {
      return Suspend2.of(thunk);
    }
    Trampoline2.suspend = suspend;
    function delay(thunk) {
      return suspend(() => done(thunk()));
    }
    Trampoline2.delay = delay;
    function traverse(values, mapper) {
      return Iterable.reduce(values, (values2, value, i) => values2.flatMap((values3) => mapper(value, i).map((value2) => Array2.append(values3, value2))), done(Array2.empty()));
    }
    Trampoline2.traverse = traverse;
    function sequence(futures) {
      return traverse(futures, (value) => value);
    }
    Trampoline2.sequence = sequence;
  })(Trampoline || (Trampoline = {}));
  var Done = class _Done extends Trampoline {
    static of(value) {
      return new _Done(value);
    }
    _value;
    constructor(value) {
      super();
      this._value = value;
    }
    step() {
      return this;
    }
    run() {
      return this._value;
    }
    isDone() {
      return true;
    }
    isSuspended() {
      return false;
    }
    map(mapper) {
      return new _Done(mapper(this._value));
    }
    flatMap(mapper) {
      return Suspend2.of(() => mapper(this._value));
    }
  };
  var Suspend2 = class _Suspend extends Trampoline {
    static of(thunk) {
      return new _Suspend(thunk);
    }
    _thunk;
    constructor(thunk) {
      super();
      this._thunk = thunk;
    }
    step() {
      return this._thunk();
    }
    isDone() {
      return false;
    }
    isSuspended() {
      return true;
    }
    flatMap(mapper) {
      return Bind.of(this._thunk, mapper);
    }
  };
  var Bind = class _Bind extends Trampoline {
    static of(thunk, mapper) {
      return new _Bind(thunk, mapper);
    }
    _thunk;
    _mapper;
    constructor(thunk, mapper) {
      super();
      this._thunk = thunk;
      this._mapper = mapper;
    }
    step() {
      return this._thunk().flatMap(this._mapper);
    }
    isDone() {
      return false;
    }
    isSuspended() {
      return true;
    }
    flatMap(mapper) {
      return Suspend2.of(() => _Bind.of(this._thunk, (value) => this._mapper(value).flatMap(mapper)));
    }
  };

  // node_modules/@siteimprove/alfa-lazy/dist/lazy.js
  var Lazy = class _Lazy {
    static of(thunk) {
      return new _Lazy(Trampoline.delay(thunk));
    }
    static force(value) {
      return new _Lazy(Trampoline.done(value));
    }
    _value;
    constructor(value) {
      this._value = value;
    }
    force() {
      if (this._value.isSuspended()) {
        this._value = Trampoline.done(this._value.run());
      }
      return this._value.run();
    }
    map(mapper) {
      return new _Lazy(this._value.flatMap((value) => {
        if (this._value.isSuspended()) {
          this._value = Trampoline.done(value);
        }
        return Trampoline.done(mapper(value));
      }));
    }
    apply(mapper) {
      return mapper.map((mapper2) => mapper2(this.force()));
    }
    flatMap(mapper) {
      return new _Lazy(this._value.flatMap((value) => {
        if (this._value.isSuspended()) {
          this._value = Trampoline.done(value);
        }
        return mapper(value)._value;
      }));
    }
    flatten() {
      return this.flatMap((lazy) => lazy);
    }
    equals(value) {
      return value instanceof _Lazy && Equatable.equals(value.force(), this.force());
    }
    *iterator() {
      yield this.force();
    }
    [Symbol.iterator]() {
      return this.iterator();
    }
    toThunk() {
      return () => this.force();
    }
    toJSON(options) {
      return Serializable.toJSON(this.force(), options);
    }
    toString() {
      return `Lazy { ${this.force()} }`;
    }
  };

  // node_modules/@siteimprove/alfa-sequence/dist/nil.js
  var Nil = new class Nil2 {
    get size() {
      return 0;
    }
    isEmpty() {
      return true;
    }
    forEach() {
    }
    map() {
      return this;
    }
    apply() {
      return this;
    }
    flatMap() {
      return this;
    }
    flatten() {
      return this;
    }
    reduce(reducer, accumulator) {
      return accumulator;
    }
    reduceWhile(predicate, reducer, accumulator) {
      return accumulator;
    }
    reduceUntil(predicate, reducer, accumulator) {
      return accumulator;
    }
    filter() {
      return this;
    }
    reject() {
      return this;
    }
    find() {
      return None;
    }
    includes() {
      return false;
    }
    collect() {
      return this;
    }
    collectFirst() {
      return None;
    }
    some() {
      return false;
    }
    none() {
      return true;
    }
    every() {
      return true;
    }
    count() {
      return 0;
    }
    distinct() {
      return this;
    }
    get() {
      return None;
    }
    has() {
      return false;
    }
    set() {
      return this;
    }
    insert(index, value) {
      return index === 0 ? Cons.of(value) : this;
    }
    append(value) {
      return Cons.of(value);
    }
    prepend(value) {
      return Cons.of(value);
    }
    concat(iterable) {
      if (iterable === this) {
        return this;
      }
      return Sequence.from(iterable);
    }
    subtract() {
      return this;
    }
    intersect() {
      return this;
    }
    tee(callback, ...args) {
      callback(this, ...args);
      return this;
    }
    zip() {
      return this;
    }
    first() {
      return None;
    }
    last() {
      return None;
    }
    take() {
      return this;
    }
    takeWhile() {
      return this;
    }
    takeUntil() {
      return this;
    }
    takeLast() {
      return this;
    }
    takeLastWhile() {
      return this;
    }
    takeLastUntil() {
      return this;
    }
    skip() {
      return this;
    }
    skipWhile() {
      return this;
    }
    skipUntil() {
      return this;
    }
    skipLast() {
      return this;
    }
    skipLastWhile() {
      return this;
    }
    skipLastUntil() {
      return this;
    }
    trim() {
      return this;
    }
    trimLeading() {
      return this;
    }
    trimTrailing() {
      return this;
    }
    rest() {
      return this;
    }
    slice() {
      return this;
    }
    reverse() {
      return this;
    }
    join() {
      return "";
    }
    sort() {
      return this;
    }
    sortWith() {
      return this;
    }
    compare(iterable) {
      return this.compareWith(iterable, Comparable.compare);
    }
    compareWith(iterable, comparer) {
      return Iterable.compareWith(this, iterable, comparer);
    }
    groupBy() {
      return Map2.empty();
    }
    equals(value) {
      return value instanceof Nil2;
    }
    hash(hash2) {
      hash2.writeUint32(0);
    }
    *iterator() {
    }
    [Symbol.iterator]() {
      return this.iterator();
    }
    toArray() {
      return [];
    }
    toJSON() {
      return [];
    }
    toString() {
      return "Sequence []";
    }
  }();

  // node_modules/@siteimprove/alfa-sequence/dist/sequence.js
  var Sequence;
  (function(Sequence2) {
    function isSequence(value) {
      return isCons(value) || isNil(value);
    }
    Sequence2.isSequence = isSequence;
    function isCons(value) {
      return Cons.isCons(value);
    }
    Sequence2.isCons = isCons;
    function isNil(value) {
      return value === Nil;
    }
    Sequence2.isNil = isNil;
    function of(head, tail) {
      return Cons.of(head, tail);
    }
    Sequence2.of = of;
    function empty() {
      return Nil;
    }
    Sequence2.empty = empty;
    function from(iterable) {
      if (isSequence(iterable)) {
        return iterable;
      }
      if (Array2.isArray(iterable)) {
        return fromArray(iterable);
      }
      return fromIterable(iterable);
    }
    Sequence2.from = from;
    function fromArray(array) {
      let i = 0;
      const tail = () => {
        if (i >= array.length) {
          return empty();
        }
        return of(array[i++], Lazy.of(tail));
      };
      return tail();
    }
    Sequence2.fromArray = fromArray;
    function fromIterable(iterable) {
      return fromIterator(iterable[Symbol.iterator]());
    }
    Sequence2.fromIterable = fromIterable;
    function fromIterator(iterator) {
      const tail = () => {
        const head = iterator.next();
        if (head.done === true) {
          return empty();
        }
        return of(head.value, Lazy.of(tail));
      };
      return tail();
    }
    Sequence2.fromIterator = fromIterator;
  })(Sequence || (Sequence = {}));

  // node_modules/@siteimprove/alfa-sequence/dist/cons.js
  var { not: not9, equals } = Predicate;
  var { compareComparable: compareComparable6 } = Comparable;
  var Cons = class _Cons {
    static of(head, tail = Lazy.force(Nil)) {
      return new _Cons(head, tail);
    }
    _head;
    _tail;
    constructor(head, tail) {
      this._head = head;
      this._tail = tail;
    }
    get size() {
      return Iterable.size(this);
    }
    isEmpty() {
      return false;
    }
    forEach(callback) {
      Iterable.forEach(this, callback);
    }
    map(mapper, index = 0) {
      return new _Cons(mapper(this._head, index), this._tail.map((tail) => _Cons.isCons(tail) ? tail.map(mapper, index + 1) : Nil));
    }
    apply(mapper) {
      return mapper.flatMap((mapper2) => this.map(mapper2));
    }
    flatMap(mapper, index = 0) {
      let next = this;
      while (true) {
        const head = mapper(next._head, index++);
        if (_Cons.isCons(head)) {
          return new _Cons(head._head, head._tail.map((left) => {
            const right = next._tail.force();
            return _Cons.isCons(right) ? left.concat(right.flatMap(mapper, index)) : left;
          }));
        }
        const tail = next._tail.force();
        if (_Cons.isCons(tail)) {
          next = tail;
        } else {
          return Nil;
        }
      }
    }
    flatten() {
      return this.flatMap((sequence) => sequence);
    }
    reduce(reducer, accumulator) {
      let next = this;
      let index = 0;
      while (true) {
        accumulator = reducer(accumulator, next._head, index++);
        const tail = next._tail.force();
        if (_Cons.isCons(tail)) {
          next = tail;
        } else {
          break;
        }
      }
      return accumulator;
    }
    reduceWhile(predicate, reducer, accumulator) {
      let next = this;
      let index = 0;
      while (predicate(next._head, index)) {
        accumulator = reducer(accumulator, next._head, index++);
        const tail = next._tail.force();
        if (_Cons.isCons(tail)) {
          next = tail;
        } else {
          break;
        }
      }
      return accumulator;
    }
    reduceUntil(predicate, reducer, accumulator) {
      return this.reduceWhile(not9(predicate), reducer, accumulator);
    }
    filter(predicate, index = 0) {
      let next = this;
      while (true) {
        if (predicate(next._head, index++)) {
          return new _Cons(next._head, next._tail.map((tail2) => _Cons.isCons(tail2) ? tail2.filter(predicate, index) : Nil));
        }
        const tail = next._tail.force();
        if (_Cons.isCons(tail)) {
          next = tail;
        } else {
          return Nil;
        }
      }
    }
    reject(predicate) {
      return this.filter(not9(predicate));
    }
    find(predicate) {
      let next = this;
      let index = 0;
      while (true) {
        const head = next._head;
        if (predicate(head, index++)) {
          return Option.of(head);
        }
        const tail = next._tail.force();
        if (_Cons.isCons(tail)) {
          next = tail;
        } else {
          return None;
        }
      }
    }
    includes(value) {
      return this.some(equals(value));
    }
    collect(mapper, index = 0) {
      let next = this;
      while (true) {
        const value = mapper(next._head, index++);
        if (value.isSome()) {
          return new _Cons(value.get(), next._tail.map((tail2) => _Cons.isCons(tail2) ? tail2.collect(mapper, index) : Nil));
        }
        const tail = next._tail.force();
        if (_Cons.isCons(tail)) {
          next = tail;
        } else {
          return Nil;
        }
      }
    }
    collectFirst(mapper) {
      let next = this;
      let index = 0;
      while (true) {
        const value = mapper(next._head, index++);
        if (value.isSome()) {
          return value;
        }
        const tail = next._tail.force();
        if (_Cons.isCons(tail)) {
          next = tail;
        } else {
          return None;
        }
      }
    }
    some(predicate) {
      let next = this;
      let index = 0;
      while (true) {
        if (predicate(next._head, index++)) {
          return true;
        }
        const tail = next._tail.force();
        if (_Cons.isCons(tail)) {
          next = tail;
        } else {
          return false;
        }
      }
    }
    none(predicate) {
      return this.every(not9(predicate));
    }
    every(predicate) {
      let next = this;
      let index = 0;
      while (true) {
        if (!predicate(next._head, index++)) {
          return false;
        }
        const tail = next._tail.force();
        if (_Cons.isCons(tail)) {
          next = tail;
        } else {
          return true;
        }
      }
    }
    count(predicate) {
      return this.reduce((count, value, index) => predicate(value, index) ? count + 1 : count, 0);
    }
    distinct(seen = Set2.empty()) {
      let next = this;
      while (true) {
        if (seen.has(next._head)) {
          const tail = next._tail.force();
          if (_Cons.isCons(tail)) {
            next = tail;
          } else {
            return Nil;
          }
        } else {
          return _Cons.of(next._head, next._tail.map((tail) => _Cons.isCons(tail) ? tail.distinct(seen.add(next._head)) : Nil));
        }
      }
    }
    get(index) {
      return index < 0 ? None : this.skip(index).first();
    }
    has(index) {
      return this.get(index).isSome();
    }
    set(index, value) {
      if (index < 0) {
        return this;
      }
      if (index === 0) {
        if (Equatable.equals(value, this._head)) {
          return this;
        }
        return new _Cons(value, this._tail);
      }
      return new _Cons(this._head, this._tail.map((tail) => tail.set(index - 1, value)));
    }
    insert(index, value) {
      if (index < 0) {
        return this;
      }
      if (index === 0) {
        return new _Cons(value, Lazy.force(this));
      }
      return new _Cons(this._head, this._tail.map((tail) => tail.set(index - 1, value)));
    }
    append(value) {
      return new _Cons(this._head, this._tail.map((tail) => tail.append(value)));
    }
    prepend(value) {
      return new _Cons(value, Lazy.force(this));
    }
    concat(iterable) {
      const sequence = Sequence.from(iterable);
      if (_Cons.isCons(sequence)) {
        return new _Cons(this._head, this._tail.map((tail) => tail.concat(sequence)));
      }
      return this;
    }
    subtract(iterable) {
      return this.filter((value) => !Iterable.includes(iterable, value));
    }
    intersect(iterable) {
      return this.filter((value) => Iterable.includes(iterable, value));
    }
    tee(callback, ...args) {
      callback(this, ...args);
      return this;
    }
    zip(iterable) {
      const sequence = Sequence.from(iterable);
      if (_Cons.isCons(sequence)) {
        return new _Cons([this._head, sequence._head], this._tail.map((tail) => tail.zip(sequence.rest())));
      }
      return Nil;
    }
    first() {
      return Option.of(this._head);
    }
    last() {
      let next = this;
      while (true) {
        const tail = next._tail.force();
        if (_Cons.isCons(tail)) {
          next = tail;
        } else {
          return Option.of(next._head);
        }
      }
    }
    take(count) {
      if (count <= 0) {
        return Nil;
      }
      return new _Cons(this._head, count === 1 ? Lazy.force(Nil) : this._tail.map((tail) => _Cons.isCons(tail) ? tail.take(count - 1) : Nil));
    }
    takeWhile(predicate) {
      return this.takeUntil(not9(predicate));
    }
    takeUntil(predicate, index = 0) {
      if (predicate(this._head, index)) {
        return Nil;
      }
      return new _Cons(this._head, this._tail.map((tail) => _Cons.isCons(tail) ? tail.takeUntil(predicate, index + 1) : tail.takeUntil(predicate)));
    }
    takeLast(count) {
      return this.skip(this.size - count);
    }
    takeLastWhile(predicate) {
      return this.reverse().takeWhile(predicate).reverse();
    }
    takeLastUntil(predicate) {
      return this.takeLastWhile(not9(predicate));
    }
    skip(count) {
      let next = this;
      while (count-- > 0) {
        const tail = next._tail.force();
        if (_Cons.isCons(tail)) {
          next = tail;
        } else {
          return Nil;
        }
      }
      return next;
    }
    skipWhile(predicate) {
      let next = this;
      let index = 0;
      while (predicate(next._head, index++)) {
        const tail = next._tail.force();
        if (_Cons.isCons(tail)) {
          next = tail;
        } else {
          return Nil;
        }
      }
      return next;
    }
    skipUntil(predicate) {
      return this.skipWhile(not9(predicate));
    }
    skipLast(count) {
      return this.take(this.size - count);
    }
    skipLastWhile(predicate) {
      return this.reverse().skipWhile(predicate).reverse();
    }
    skipLastUntil(predicate) {
      return this.skipLastWhile(not9(predicate));
    }
    trim(predicate) {
      return this.trimLeading(predicate).trimTrailing(predicate);
    }
    trimLeading(predicate) {
      return this.skipWhile(predicate);
    }
    trimTrailing(predicate) {
      return this.skipLastWhile(predicate);
    }
    rest() {
      return this._tail.force();
    }
    slice(start, end) {
      let slice = this.skip(start);
      if (end !== void 0) {
        slice = slice.take(end - start);
      }
      return slice;
    }
    reverse() {
      return this.reduce((reversed, value) => new _Cons(value, Lazy.force(reversed)), Nil);
    }
    join(separator) {
      let result = `${this._head}`;
      let next = this;
      while (true) {
        const tail = next._tail.force();
        if (_Cons.isCons(tail)) {
          result += `${separator}${tail._head}`;
          next = tail;
        } else {
          return result;
        }
      }
    }
    sort() {
      return this.sortWith(compareComparable6);
    }
    sortWith(comparer) {
      return Sequence.fromArray(Array2.sortWith(this.toArray(), comparer));
    }
    compare(iterable) {
      return this.compareWith(iterable, Comparable.compare);
    }
    compareWith(iterable, comparer) {
      return Iterable.compareWith(this, iterable, comparer);
    }
    groupBy(grouper) {
      return this.reduce((groups, value, index) => {
        const group = grouper(value, index);
        return groups.set(group, new _Cons(value, Lazy.force(groups.get(group).getOrElse(() => Nil))));
      }, Map2.empty()).map((group) => group.reverse());
    }
    equals(value) {
      if (!_Cons.isCons(value)) {
        return false;
      }
      let a = this;
      let b = value;
      while (true) {
        if (!Equatable.equals(a._head, b._head)) {
          return false;
        }
        const ta = a._tail.force();
        const tb = b._tail.force();
        if (_Cons.isCons(ta) && _Cons.isCons(tb)) {
          a = ta;
          b = tb;
        } else {
          return ta === Nil && tb === Nil;
        }
      }
    }
    hash(hash2) {
      let size = 0;
      for (const value of this) {
        hash2.writeUnknown(value);
        size++;
      }
      hash2.writeUint32(size);
    }
    *iterator() {
      let next = this;
      while (true) {
        yield next._head;
        const tail = next._tail.force();
        if (_Cons.isCons(tail)) {
          next = tail;
        } else {
          break;
        }
      }
    }
    [Symbol.iterator]() {
      return this.iterator();
    }
    toArray() {
      const array = [];
      let next = this;
      while (true) {
        array.push(next._head);
        const tail = next._tail.force();
        if (_Cons.isCons(tail)) {
          next = tail;
        } else {
          return array;
        }
      }
    }
    toJSON(options) {
      const json = [];
      let next = this;
      while (true) {
        json.push(Serializable.toJSON(next._head, options));
        const tail = next._tail.force();
        if (_Cons.isCons(tail)) {
          next = tail;
        } else {
          return json;
        }
      }
    }
    toString() {
      return `Sequence [ ${this.join(", ")} ]`;
    }
  };
  (function(Cons2) {
    function isCons(value) {
      return value instanceof Cons2;
    }
    Cons2.isCons = isCons;
  })(Cons || (Cons = {}));

  // node_modules/@siteimprove/alfa-act/dist/tag.js
  var Tag = class _Tag {
    constructor() {
    }
    equals(value) {
      return value instanceof _Tag && value.type === this.type;
    }
    toJSON() {
      return {
        type: this.type
      };
    }
  };
  (function(Tag2) {
    function isTag(value, type) {
      return value instanceof Tag2 && (type === void 0 || value.type === type);
    }
    Tag2.isTag = isTag;
  })(Tag || (Tag = {}));

  // node_modules/@siteimprove/alfa-act/dist/rule.js
  var { flatten, reduce } = Iterable;
  var Rule = class _Rule {
    _uri;
    _requirements;
    _tags;
    _evaluate;
    constructor(uri, requirements, tags, evaluator) {
      this._uri = uri;
      this._requirements = requirements;
      this._tags = tags;
      this._evaluate = evaluator;
    }
    get uri() {
      return this._uri;
    }
    get requirements() {
      return this._requirements;
    }
    get tags() {
      return this._tags;
    }
    hasRequirement(requirementOrPredicate) {
      const predicate = Requirement.isRequirement(requirementOrPredicate) ? (requirement) => requirementOrPredicate.equals(requirement) : requirementOrPredicate;
      return Array2.some(this._requirements, predicate);
    }
    hasTag(tagOrPredicate) {
      const predicate = Tag.isTag(tagOrPredicate) ? (tag) => tagOrPredicate.equals(tag) : tagOrPredicate;
      return Array2.some(this._tags, predicate);
    }
    evaluate(input, oracle = () => Future.now(None), outcomes = Cache.empty(), performance) {
      return this._evaluate(input, oracle, outcomes, performance);
    }
    equals(value) {
      return value instanceof _Rule && value._uri === this._uri;
    }
    hash(hash2) {
      hash2.writeString(this._uri);
    }
    toEARL() {
      return {
        "@context": {
          earl: "http://www.w3.org/ns/earl#",
          dct: "http://purl.org/dc/terms/"
        },
        "@type": ["earl:TestCriterion", "earl:TestCase"],
        "@id": this._uri,
        "dct:isPartOf": {
          "@set": this._requirements.map((requirement) => requirement.toEARL())
        }
      };
    }
    toSARIF() {
      return {
        id: this._uri,
        helpUri: this._uri
      };
    }
  };
  (function(Rule2) {
    const { Applicable } = Outcome;
    function isRule(value) {
      return value instanceof Rule2;
    }
    Rule2.isRule = isRule;
    class Atomic extends Rule2 {
      static of(properties) {
        return new Atomic(properties.uri, Array2.from(properties.requirements ?? []), Array2.from(properties.tags ?? []), properties.evaluate);
      }
      constructor(uri, requirements, tags, evaluate) {
        super(uri, requirements, tags, (input, oracle, outcomes, performance) => outcomes.get(this, () => {
          const startRule = performance?.mark(Event.start(this)).start;
          const rulePerformance = performance !== void 0 ? {
            mark: (name) => performance?.mark(Event.start(this, name)),
            measure: (name, start) => performance?.measure(Event.end(this, name), start)
          } : void 0;
          const { applicability, expectations } = evaluate(input, rulePerformance);
          const startApplicability = performance?.mark(Event.startApplicability(this)).start;
          let startExpectation;
          return Future.traverse(applicability(), (interview) => Interview.conduct(interview, this, oracle).map((target) => target.either(
            // We have a target, wrap it properly and return it.
            ([target2, oracleUsed]) => Tuple.of(Maybe.toOption(target2), oracleUsed),
            // We have an unanswered question and return None
            ([_, oracleUsed]) => Tuple.of(None, oracleUsed)
          ))).map((targets) => (
            // We both need to keep with each target whether the oracle was used,
            // and with the global sequence whether it was used at all.
            // The second case is needed to decide whether the oracle was used
            // when producing an Inapplicable result (empty sequence).
            // None are cleared from the sequence, and Some are opened to only
            // keep the targets.
            //
            // For efficiency, we prepend the targets and reverse the full
            // sequence later to conserve the order.
            // This result in a O(n) rather than O(n²) process.
            Sequence.from(targets).reduce(([acc, wasUsed], [cur, isUsed]) => Tuple.of(cur.isSome() ? acc.prepend(Tuple.of(cur.get(), isUsed)) : acc, wasUsed || isUsed), Tuple.of(Sequence.empty(), false))
          )).tee(() => {
            performance?.measure(Event.endApplicability(this), startApplicability);
            startExpectation = performance?.mark(Event.startExpectation(this)).start;
          }).flatMap(([targets, oracleUsed]) => {
            if (targets.isEmpty()) {
              return Future.now([
                Outcome.Inapplicable.of(this, getMode(oracleUsed))
              ]);
            }
            return Future.traverse(
              // Since targets were prepended when Applicability was processed,
              // we now need to reverse the sequence to restore initial order.
              targets.reverse(),
              ([target, oracleUsedInApplicability]) => resolve(target, Record.of(expectations(target)), this, oracle, oracleUsedInApplicability)
            ).tee(() => {
              performance?.measure(Event.endExpectation(this), startExpectation);
            });
          }).tee(() => {
            performance?.measure(Event.end(this), startRule);
          });
        }));
      }
      toJSON() {
        return {
          type: "atomic",
          uri: this._uri,
          requirements: this._requirements.map((requirement) => requirement.toJSON()),
          tags: this._tags.map((tag) => tag.toJSON())
        };
      }
    }
    Rule2.Atomic = Atomic;
    (function(Atomic2) {
      function isAtomic(value) {
        return value instanceof Atomic2;
      }
      Atomic2.isAtomic = isAtomic;
    })(Atomic = Rule2.Atomic || (Rule2.Atomic = {}));
    Rule2.isAtomic = Atomic.isAtomic;
    class Composite extends Rule2 {
      static of(properties) {
        return new Composite(properties.uri, Array2.from(properties.requirements ?? []), Array2.from(properties.tags ?? []), Array2.from(properties.composes), properties.evaluate);
      }
      _composes;
      constructor(uri, requirements, tags, composes, evaluate) {
        super(uri, requirements, tags, (input, oracle, outcomes, performance) => outcomes.get(this, () => {
          const startRule = performance?.mark(Event.start(this)).start;
          const rulePerformance = performance !== void 0 ? {
            mark: (name) => performance?.mark(Event.start(this, name)),
            measure: (name, start) => performance?.measure(Event.end(this, name), start)
          } : void 0;
          return Future.traverse(this._composes, (rule) => rule.evaluate(input, oracle, outcomes, performance)).map((outcomes2) => (
            // We both need to keep with each outcome whether the oracle was used,
            // and with the global sequence whether it was used at all.
            // The second case is needed to decide whether the oracle was used
            // when producing an Inapplicable result (empty sequence).
            // Inapplicable outcomes one are cleared from the sequence.
            //
            // For efficiency, we prepend the targets and reverse the full
            // sequence later to conserve the order.
            // This result in a O(n) rather than O(n²) process.
            Sequence.from(flatten(outcomes2)).reduce(([acc, wasUsed], outcome) => Tuple.of(Applicable.isApplicable(outcome) ? acc.prepend(outcome) : acc, wasUsed || outcome.isSemiAuto), Tuple.of(Sequence.empty(), false))
          )).flatMap(([targets, oracleUsed]) => {
            if (targets.isEmpty()) {
              return Future.now([
                Outcome.Inapplicable.of(this, getMode(oracleUsed))
              ]);
            }
            const { expectations } = evaluate(input, rulePerformance);
            return Future.traverse(
              // Since targets were prepended when Applicability was processed,
              // we now need to reverse the sequence to restore initial order.
              targets.reverse().groupBy((outcome) => outcome.target),
              ([target, outcomes2]) => resolve(target, Record.of(expectations(outcomes2)), this, oracle, oracleUsed)
            );
          }).tee(() => {
            performance?.measure(Event.end(this), startRule);
          });
        }));
        this._composes = composes;
      }
      get composes() {
        return this._composes;
      }
      toJSON() {
        return {
          type: "composite",
          uri: this._uri,
          requirements: this._requirements.map((requirement) => requirement.toJSON()),
          tags: this._tags.map((tag) => tag.toJSON()),
          composes: this._composes.map((rule) => rule.toJSON())
        };
      }
    }
    Rule2.Composite = Composite;
    (function(Composite2) {
      function isComposite(value) {
        return value instanceof Composite2;
      }
      Composite2.isComposite = isComposite;
    })(Composite = Rule2.Composite || (Rule2.Composite = {}));
    Rule2.isComposite = Composite.isComposite;
    class Event {
      static of(type, rule, name) {
        return new Event(type, rule, name);
      }
      _type;
      _rule;
      _name;
      constructor(type, rule, name) {
        this._type = type;
        this._rule = rule;
        this._name = name;
      }
      get type() {
        return this._type;
      }
      get rule() {
        return this._rule;
      }
      get name() {
        return this._name;
      }
      toJSON() {
        return {
          type: this._type,
          rule: this._rule.toJSON(),
          name: this._name
        };
      }
    }
    Rule2.Event = Event;
    (function(Event2) {
      function isEvent(value) {
        return value instanceof Event2;
      }
      Event2.isEvent = isEvent;
      function start(rule, name = "total") {
        return Event2.of("start", rule, name);
      }
      Event2.start = start;
      function end(rule, name = "total") {
        return Event2.of("end", rule, name);
      }
      Event2.end = end;
      function startApplicability(rule) {
        return Event2.of("start", rule, "applicability");
      }
      Event2.startApplicability = startApplicability;
      function endApplicability(rule) {
        return Event2.of("end", rule, "applicability");
      }
      Event2.endApplicability = endApplicability;
      function startExpectation(rule) {
        return Event2.of("start", rule, "expectation");
      }
      Event2.startExpectation = startExpectation;
      function endExpectation(rule) {
        return Event2.of("end", rule, "expectation");
      }
      Event2.endExpectation = endExpectation;
    })(Event = Rule2.Event || (Rule2.Event = {}));
  })(Rule || (Rule = {}));
  function processExpectation(acc, [id, expectation]) {
    return acc.either(
      // The accumulator only contains true result, keep going.
      ([accumulator, oracleUsedAccumulator]) => expectation.either(
        // The current result is defined, accumulate.
        ([result, oracleUsed]) => Left.of(Tuple.of(accumulator.append([id, Maybe.toOption(result)]), oracleUsedAccumulator || oracleUsed)),
        // The current result is cantTell, abort.
        ([diagnostic, oracleUsed]) => Right.of(Tuple.of(diagnostic, oracleUsedAccumulator || oracleUsed))
      ),
      // The accumulator already contains cantTell, skip.
      // Note that we only keep the mode of the first Expectation that cannot tell,
      // which is likely OK.
      () => acc
    );
  }
  function resolve(target, expectations, rule, oracle, oracleUsedInApplicability) {
    return Future.traverse(expectations, ([id, interview]) => Interview.conduct(interview, rule, oracle).map((expectation) => [id, expectation])).map((expectations2) => reduce(expectations2, processExpectation, Left.of(Tuple.of(List.empty(), oracleUsedInApplicability)))).map((expectation) => expectation.either(([expectations2, oracleUsed]) => Outcome.from(rule, target, Record.from(expectations2), getMode(oracleUsed)), ([diagnostic, oracleUsed]) => Outcome.CantTell.of(rule, target, diagnostic, getMode(oracleUsed))));
  }
  function getMode(oracleUsed) {
    return oracleUsed ? Outcome.Mode.SemiAuto : Outcome.Mode.Automatic;
  }

  // node_modules/@siteimprove/alfa-branched/dist/branched.js
  var { not: not10 } = Predicate;
  var Branched = class _Branched {
    static of(value, ...branches) {
      return new _Branched(List.of(Value.of(value, branches.length === 0 ? None : Some.of(List.from(branches)))));
    }
    _values;
    constructor(values) {
      this._values = values;
    }
    get size() {
      return this._values.size;
    }
    isEmpty() {
      return false;
    }
    forEach(callback) {
      this._values.forEach(({ value, branches }) => callback(value, branches.getOrElse(() => List.empty())));
    }
    map(mapper) {
      return new _Branched(this._values.reduce((values, { value, branches }) => merge(values, mapper(value, branches.getOrElse(() => List.empty())), branches), List.empty()));
    }
    apply(mapper) {
      return mapper.flatMap((mapper2) => this.map(mapper2));
    }
    flatMap(mapper) {
      return new _Branched(this._values.reduce((values, { value, branches: scope }) => mapper(value, scope.getOrElse(() => List.empty()))._values.reduce((values2, { value: value2, branches }) => {
        if (scope.isNone() && branches.isSome()) {
          branches = unused(branches, this._values);
        } else {
          branches = narrow(branches, scope);
        }
        return merge(values2, value2, branches);
      }, values), List.empty()));
    }
    flatten() {
      return this.flatMap((branched) => branched);
    }
    reduce(reducer, accumulator) {
      return this._values.reduce((accumulator2, value) => reducer(accumulator2, value.value, value.branches.getOrElse(() => List.empty())), accumulator);
    }
    filter(predicate) {
      return new _Branched(this._values.filter(({ value, branches }) => predicate(value, branches.getOrElse(() => List.empty()))));
    }
    reject(predicate) {
      return this.filter(not10(predicate));
    }
    find(predicate) {
      return this._values.find(({ value, branches }) => predicate(value, branches.getOrElse(() => List.empty()))).map(({ value }) => value);
    }
    includes(value) {
      return this._values.some(({ value: found }) => Equatable.equals(value, found));
    }
    collect(mapper) {
      return new _Branched(this._values.reduce((values, { value, branches }) => mapper(value, branches.getOrElse(() => List.empty())).map((value2) => merge(values, value2, branches)).getOr(values), List.empty()));
    }
    collectFirst(mapper) {
      return this._values.collectFirst(({ value, branches }) => mapper(value, branches.getOrElse(() => List.empty())));
    }
    some(predicate) {
      for (const value of this._values) {
        if (predicate(value.value, value.branches.getOrElse(() => List.empty()))) {
          return true;
        }
      }
      return false;
    }
    none(predicate) {
      return this.every(not10(predicate));
    }
    every(predicate) {
      for (const value of this._values) {
        if (!predicate(value.value, value.branches.getOrElse(() => List.empty()))) {
          return false;
        }
      }
      return true;
    }
    count(predicate) {
      return this.reduce((count, value, branches) => predicate(value, branches) ? count + 1 : count, 0);
    }
    /**
     * @remarks
     * As branched values merges branches with duplicate values, they will only
     * ever contain distinct values.
     */
    distinct() {
      return this;
    }
    tee(callback, ...args) {
      callback(this, ...args);
      return this;
    }
    branch(value, ...branches) {
      return new _Branched(merge(this._values, value, branches.length === 0 ? None : Some.of(List.from(branches))));
    }
    equals(value) {
      return value instanceof _Branched && value._values.equals(this._values);
    }
    hash(hash2) {
      hash2.writeHashable(this._values);
    }
    *[Symbol.iterator]() {
      for (const value of this._values) {
        yield [value.value, value.branches.getOrElse(() => List.empty())];
      }
    }
    toArray() {
      return this._values.toArray().map(({ value, branches }) => [
        value,
        branches.getOrElse(() => List.empty()).toArray()
      ]);
    }
    toJSON() {
      return this._values.toArray().map(({ value, branches }) => [
        Serializable.toJSON(value),
        branches.getOrElse(() => List.empty()).toJSON()
      ]);
    }
  };
  (function(Branched2) {
    function isBranched(value) {
      return value instanceof Branched2;
    }
    Branched2.isBranched = isBranched;
    function from(values) {
      if (isBranched(values)) {
        return values;
      }
      const [[value, branches], ...rest] = values;
      return rest.reduce((result, [value2, branches2]) => result.branch(value2, ...branches2), Branched2.of(value, ...branches));
    }
    Branched2.from = from;
    function traverse(values, mapper) {
      return Iterable.reduce(values, (values2, value, i) => values2.flatMap((values3) => mapper(value, i).map((value2) => values3.append(value2))), Branched2.of(List.empty()));
    }
    Branched2.traverse = traverse;
    function sequence(values) {
      return traverse(values, (value) => value);
    }
    Branched2.sequence = sequence;
  })(Branched || (Branched = {}));
  var Value = class _Value {
    static of(value, branches = None) {
      return new _Value(value, branches);
    }
    _value;
    _branches;
    constructor(value, branches) {
      this._value = value;
      this._branches = branches;
    }
    get value() {
      return this._value;
    }
    get branches() {
      return this._branches;
    }
    equals(value) {
      return value instanceof _Value && Equatable.equals(value._value, this._value) && Equatable.equals(value._branches, this._branches);
    }
    hash(hash2) {
      hash2.writeUnknown(this._value).writeHashable(this._branches);
    }
  };
  function merge(values, value, branches) {
    if (values.size === 0) {
      return List.of(Value.of(value, branches));
    }
    branches = values.find((existing) => Equatable.equals(existing.value, value)).map((existing) => existing.branches.flatMap((left) => branches.map((right) => left.concat(right)))).getOr(branches);
    return deduplicate(values, value, branches).append(Value.of(value, branches));
  }
  function deduplicate(values, value, branches) {
    return values.reduce((values2, existing) => {
      if (Equatable.equals(existing.value, value)) {
        return values2;
      }
      if (existing.branches.isNone()) {
        return branches.isNone() ? values2 : values2.append(existing);
      }
      return existing.branches.reduce((values3, existingBranches) => {
        const deduplicated = branches.reduce((existing2, branches2) => existing2.subtract(branches2), existingBranches);
        if (deduplicated.size === 0) {
          return values3;
        }
        return values3.append(Value.of(existing.value, Some.of(deduplicated)));
      }, values2);
    }, List.empty());
  }
  function narrow(branches, scope) {
    return scope.map((scope2) => branches.reduce((scope3, branches2) => scope3.intersect(branches2), scope2));
  }
  function unused(branches, values) {
    return values.reduce((branches2, value) => value.branches.flatMap((existing) => branches2.map((branches3) => branches3.subtract(existing))).or(branches2), branches);
  }

  // node_modules/@siteimprove/alfa-wcag/dist/criterion/data.js
  var Criteria = {
    "1.1.1": {
      title: "Non-text Content",
      versions: [
        [
          "2.2",
          {
            uri: "https://www.w3.org/TR/WCAG2/#non-text-content",
            level: "A"
          }
        ],
        [
          "2.1",
          {
            uri: "https://www.w3.org/TR/WCAG21/#non-text-content",
            level: "A"
          }
        ],
        [
          "2.0",
          {
            uri: "https://www.w3.org/TR/WCAG20/#text-equiv-all",
            level: "A"
          }
        ]
      ]
    },
    "1.2.1": {
      title: "Audio-only and Video-only (Prerecorded)",
      versions: [
        [
          "2.2",
          {
            uri: "https://www.w3.org/TR/WCAG2/#audio-only-and-video-only-prerecorded",
            level: "A"
          }
        ],
        [
          "2.1",
          {
            uri: "https://www.w3.org/TR/WCAG21/#audio-only-and-video-only-prerecorded",
            level: "A"
          }
        ],
        [
          "2.0",
          {
            uri: "https://www.w3.org/TR/WCAG20/#media-equiv-av-only-alt",
            level: "A"
          }
        ]
      ]
    },
    "1.2.2": {
      title: "Captions (Prerecorded)",
      versions: [
        [
          "2.2",
          {
            uri: "https://www.w3.org/TR/WCAG2/#captions-prerecorded",
            level: "A"
          }
        ],
        [
          "2.1",
          {
            uri: "https://www.w3.org/TR/WCAG21/#captions-prerecorded",
            level: "A"
          }
        ],
        [
          "2.0",
          {
            uri: "https://www.w3.org/TR/WCAG20/#media-equiv-captions",
            level: "A"
          }
        ]
      ]
    },
    "1.2.3": {
      title: "Audio Description or Media Alternative (Prerecorded)",
      versions: [
        [
          "2.2",
          {
            uri: "https://www.w3.org/TR/WCAG2/#audio-description-or-media-alternative-prerecorded",
            level: "A"
          }
        ],
        [
          "2.1",
          {
            uri: "https://www.w3.org/TR/WCAG21/#audio-description-or-media-alternative-prerecorded",
            level: "A"
          }
        ],
        [
          "2.0",
          {
            uri: "https://www.w3.org/TR/WCAG20/#media-equiv-audio-desc",
            level: "A"
          }
        ]
      ]
    },
    "1.2.4": {
      title: "Captions (Live)",
      versions: [
        [
          "2.2",
          {
            uri: "https://www.w3.org/TR/WCAG2/#captions-live",
            level: "AA"
          }
        ],
        [
          "2.1",
          {
            uri: "https://www.w3.org/TR/WCAG21/#captions-live",
            level: "AA"
          }
        ],
        [
          "2.0",
          {
            uri: "https://www.w3.org/TR/WCAG20/#media-equiv-real-time-captions",
            level: "AA"
          }
        ]
      ]
    },
    "1.2.5": {
      title: "Audio Description (Prerecorded)",
      versions: [
        [
          "2.2",
          {
            uri: "https://www.w3.org/TR/WCAG2/#audio-description-prerecorded",
            level: "AA"
          }
        ],
        [
          "2.1",
          {
            uri: "https://www.w3.org/TR/WCAG21/#audio-description-prerecorded",
            level: "AA"
          }
        ],
        [
          "2.0",
          {
            uri: "https://www.w3.org/TR/WCAG20/#media-equiv-audio-desc-only",
            level: "AA"
          }
        ]
      ]
    },
    "1.2.6": {
      title: "Sign Language (Prerecorded)",
      versions: [
        [
          "2.2",
          {
            uri: "https://www.w3.org/TR/WCAG2/#sign-language-prerecorded",
            level: "AAA"
          }
        ],
        [
          "2.1",
          {
            uri: "https://www.w3.org/TR/WCAG21/#sign-language-prerecorded",
            level: "AAA"
          }
        ],
        [
          "2.0",
          {
            uri: "https://www.w3.org/TR/WCAG20/#media-equiv-sign",
            level: "AAA"
          }
        ]
      ]
    },
    "1.2.7": {
      title: "Extended Audio Description (Prerecorded)",
      versions: [
        [
          "2.2",
          {
            uri: "https://www.w3.org/TR/WCAG2/#extended-audio-description-prerecorded",
            level: "AAA"
          }
        ],
        [
          "2.1",
          {
            uri: "https://www.w3.org/TR/WCAG21/#extended-audio-description-prerecorded",
            level: "AAA"
          }
        ],
        [
          "2.0",
          {
            uri: "https://www.w3.org/TR/WCAG20/#media-equiv-extended-ad",
            level: "AAA"
          }
        ]
      ]
    },
    "1.2.8": {
      title: "Media Alternative (Prerecorded)",
      versions: [
        [
          "2.2",
          {
            uri: "https://www.w3.org/TR/WCAG2/#media-alternative-prerecorded",
            level: "AAA"
          }
        ],
        [
          "2.1",
          {
            uri: "https://www.w3.org/TR/WCAG21/#media-alternative-prerecorded",
            level: "AAA"
          }
        ],
        [
          "2.0",
          {
            uri: "https://www.w3.org/TR/WCAG20/#media-equiv-text-doc",
            level: "AAA"
          }
        ]
      ]
    },
    "1.2.9": {
      title: "Audio-only (Live)",
      versions: [
        [
          "2.2",
          {
            uri: "https://www.w3.org/TR/WCAG2/#audio-only-live",
            level: "AAA"
          }
        ],
        [
          "2.1",
          {
            uri: "https://www.w3.org/TR/WCAG21/#audio-only-live",
            level: "AAA"
          }
        ],
        [
          "2.0",
          {
            uri: "https://www.w3.org/TR/WCAG20/#media-equiv-live-audio-only",
            level: "AAA"
          }
        ]
      ]
    },
    "1.3.1": {
      title: "Info and Relationships",
      versions: [
        [
          "2.2",
          {
            uri: "https://www.w3.org/TR/WCAG2/#info-and-relationships",
            level: "A"
          }
        ],
        [
          "2.1",
          {
            uri: "https://www.w3.org/TR/WCAG21/#info-and-relationships",
            level: "A"
          }
        ],
        [
          "2.0",
          {
            uri: "https://www.w3.org/TR/WCAG20/#content-structure-separation-programmatic",
            level: "A"
          }
        ]
      ]
    },
    "1.3.2": {
      title: "Meaningful Sequence",
      versions: [
        [
          "2.2",
          {
            uri: "https://www.w3.org/TR/WCAG2/#meaningful-sequence",
            level: "A"
          }
        ],
        [
          "2.1",
          {
            uri: "https://www.w3.org/TR/WCAG21/#meaningful-sequence",
            level: "A"
          }
        ],
        [
          "2.0",
          {
            uri: "https://www.w3.org/TR/WCAG20/#content-structure-separation-sequence",
            level: "A"
          }
        ]
      ]
    },
    "1.3.3": {
      title: "Sensory Characteristics",
      versions: [
        [
          "2.2",
          {
            uri: "https://www.w3.org/TR/WCAG2/#sensory-characteristics",
            level: "A"
          }
        ],
        [
          "2.1",
          {
            uri: "https://www.w3.org/TR/WCAG21/#sensory-characteristics",
            level: "A"
          }
        ],
        [
          "2.0",
          {
            uri: "https://www.w3.org/TR/WCAG20/#content-structure-separation-understanding",
            level: "A"
          }
        ]
      ]
    },
    "1.3.4": {
      title: "Orientation",
      versions: [
        [
          "2.2",
          {
            uri: "https://www.w3.org/TR/WCAG2/#orientation",
            level: "AA"
          }
        ],
        [
          "2.1",
          {
            uri: "https://www.w3.org/TR/WCAG21/#orientation",
            level: "AA"
          }
        ]
      ]
    },
    "1.3.5": {
      title: "Identify Input Purpose",
      versions: [
        [
          "2.2",
          {
            uri: "https://www.w3.org/TR/WCAG2/#identify-input-purpose",
            level: "AA"
          }
        ],
        [
          "2.1",
          {
            uri: "https://www.w3.org/TR/WCAG21/#identify-input-purpose",
            level: "AA"
          }
        ]
      ]
    },
    "1.3.6": {
      title: "Identify Purpose",
      versions: [
        [
          "2.2",
          {
            uri: "https://www.w3.org/TR/WCAG2/#identify-purpose",
            level: "AAA"
          }
        ],
        [
          "2.1",
          {
            uri: "https://www.w3.org/TR/WCAG21/#identify-purpose",
            level: "AAA"
          }
        ]
      ]
    },
    "1.4.1": {
      title: "Use of Color",
      versions: [
        [
          "2.2",
          {
            uri: "https://www.w3.org/TR/WCAG2/#use-of-color",
            level: "A"
          }
        ],
        [
          "2.1",
          {
            uri: "https://www.w3.org/TR/WCAG21/#use-of-color",
            level: "A"
          }
        ],
        [
          "2.0",
          {
            uri: "https://www.w3.org/TR/WCAG20/#visual-audio-contrast-without-color",
            level: "A"
          }
        ]
      ]
    },
    "1.4.2": {
      title: "Audio Control",
      versions: [
        [
          "2.2",
          {
            uri: "https://www.w3.org/TR/WCAG2/#audio-control",
            level: "A"
          }
        ],
        [
          "2.1",
          {
            uri: "https://www.w3.org/TR/WCAG21/#audio-control",
            level: "A"
          }
        ],
        [
          "2.0",
          {
            uri: "https://www.w3.org/TR/WCAG20/#visual-audio-contrast-dis-audio",
            level: "A"
          }
        ]
      ]
    },
    "1.4.3": {
      title: "Contrast (Minimum)",
      versions: [
        [
          "2.2",
          {
            uri: "https://www.w3.org/TR/WCAG2/#contrast-minimum",
            level: "AA"
          }
        ],
        [
          "2.1",
          {
            uri: "https://www.w3.org/TR/WCAG21/#contrast-minimum",
            level: "AA"
          }
        ],
        [
          "2.0",
          {
            uri: "https://www.w3.org/TR/WCAG20/#visual-audio-contrast-contrast",
            level: "AA"
          }
        ]
      ]
    },
    "1.4.4": {
      title: "Resize Text",
      versions: [
        [
          "2.2",
          {
            uri: "https://www.w3.org/TR/WCAG2/#resize-text",
            level: "AA"
          }
        ],
        [
          "2.1",
          {
            uri: "https://www.w3.org/TR/WCAG21/#resize-text",
            level: "AA"
          }
        ],
        [
          "2.0",
          {
            uri: "https://www.w3.org/TR/WCAG20/#visual-audio-contrast-scale",
            level: "AA"
          }
        ]
      ]
    },
    "1.4.5": {
      title: "Images of Text",
      versions: [
        [
          "2.2",
          {
            uri: "https://www.w3.org/TR/WCAG2/#images-of-text",
            level: "AA"
          }
        ],
        [
          "2.1",
          {
            uri: "https://www.w3.org/TR/WCAG21/#images-of-text",
            level: "AA"
          }
        ],
        [
          "2.0",
          {
            uri: "https://www.w3.org/TR/WCAG20/#visual-audio-contrast-text-presentation",
            level: "AA"
          }
        ]
      ]
    },
    "1.4.6": {
      title: "Contrast (Enhanced)",
      versions: [
        [
          "2.2",
          {
            uri: "https://www.w3.org/TR/WCAG2/#contrast-enhanced",
            level: "AAA"
          }
        ],
        [
          "2.1",
          {
            uri: "https://www.w3.org/TR/WCAG21/#contrast-enhanced",
            level: "AAA"
          }
        ],
        [
          "2.0",
          {
            uri: "https://www.w3.org/TR/WCAG20/#visual-audio-contrast7",
            level: "AAA"
          }
        ]
      ]
    },
    "1.4.7": {
      title: "Low or No Background Audio",
      versions: [
        [
          "2.2",
          {
            uri: "https://www.w3.org/TR/WCAG2/#low-or-no-background-audio",
            level: "AAA"
          }
        ],
        [
          "2.1",
          {
            uri: "https://www.w3.org/TR/WCAG21/#low-or-no-background-audio",
            level: "AAA"
          }
        ],
        [
          "2.0",
          {
            uri: "https://www.w3.org/TR/WCAG20/#visual-audio-contrast-noaudio",
            level: "AAA"
          }
        ]
      ]
    },
    "1.4.8": {
      title: "Visual Presentation",
      versions: [
        [
          "2.2",
          {
            uri: "https://www.w3.org/TR/WCAG2/#visual-presentation",
            level: "AAA"
          }
        ],
        [
          "2.1",
          {
            uri: "https://www.w3.org/TR/WCAG21/#visual-presentation",
            level: "AAA"
          }
        ],
        [
          "2.0",
          {
            uri: "https://www.w3.org/TR/WCAG20/#visual-audio-contrast-visual-presentation",
            level: "AAA"
          }
        ]
      ]
    },
    "1.4.9": {
      title: "Images of Text (No Exception)",
      versions: [
        [
          "2.2",
          {
            uri: "https://www.w3.org/TR/WCAG2/#images-of-text-no-exception",
            level: "AAA"
          }
        ],
        [
          "2.1",
          {
            uri: "https://www.w3.org/TR/WCAG21/#images-of-text-no-exception",
            level: "AAA"
          }
        ],
        [
          "2.0",
          {
            uri: "https://www.w3.org/TR/WCAG20/#visual-audio-contrast-text-images",
            level: "AAA"
          }
        ]
      ]
    },
    "1.4.10": {
      title: "Reflow",
      versions: [
        [
          "2.2",
          {
            uri: "https://www.w3.org/TR/WCAG2/#reflow",
            level: "AA"
          }
        ],
        [
          "2.1",
          {
            uri: "https://www.w3.org/TR/WCAG21/#reflow",
            level: "AA"
          }
        ]
      ]
    },
    "1.4.11": {
      title: "Non-text Contrast",
      versions: [
        [
          "2.2",
          {
            uri: "https://www.w3.org/TR/WCAG2/#non-text-contrast",
            level: "AA"
          }
        ],
        [
          "2.1",
          {
            uri: "https://www.w3.org/TR/WCAG21/#non-text-contrast",
            level: "AA"
          }
        ]
      ]
    },
    "1.4.12": {
      title: "Text Spacing",
      versions: [
        [
          "2.2",
          {
            uri: "https://www.w3.org/TR/WCAG2/#text-spacing",
            level: "AA"
          }
        ],
        [
          "2.1",
          {
            uri: "https://www.w3.org/TR/WCAG21/#text-spacing",
            level: "AA"
          }
        ]
      ]
    },
    "1.4.13": {
      title: "Content on Hover or Focus",
      versions: [
        [
          "2.2",
          {
            uri: "https://www.w3.org/TR/WCAG2/#content-on-hover-or-focus",
            level: "AA"
          }
        ],
        [
          "2.1",
          {
            uri: "https://www.w3.org/TR/WCAG21/#content-on-hover-or-focus",
            level: "AA"
          }
        ]
      ]
    },
    "2.1.1": {
      title: "Keyboard",
      versions: [
        [
          "2.2",
          {
            uri: "https://www.w3.org/TR/WCAG2/#keyboard",
            level: "A"
          }
        ],
        [
          "2.1",
          {
            uri: "https://www.w3.org/TR/WCAG21/#keyboard",
            level: "A"
          }
        ],
        [
          "2.0",
          {
            uri: "https://www.w3.org/TR/WCAG20/#keyboard-operation-keyboard-operable",
            level: "A"
          }
        ]
      ]
    },
    "2.1.2": {
      title: "No Keyboard Trap",
      versions: [
        [
          "2.2",
          {
            uri: "https://www.w3.org/TR/WCAG2/#no-keyboard-trap",
            level: "A"
          }
        ],
        [
          "2.1",
          {
            uri: "https://www.w3.org/TR/WCAG21/#no-keyboard-trap",
            level: "A"
          }
        ],
        [
          "2.0",
          {
            uri: "https://www.w3.org/TR/WCAG20/#keyboard-operation-trapping",
            level: "A"
          }
        ]
      ]
    },
    "2.1.3": {
      title: "Keyboard (No Exception)",
      versions: [
        [
          "2.2",
          {
            uri: "https://www.w3.org/TR/WCAG2/#keyboard-no-exception",
            level: "AAA"
          }
        ],
        [
          "2.1",
          {
            uri: "https://www.w3.org/TR/WCAG21/#keyboard-no-exception",
            level: "AAA"
          }
        ],
        [
          "2.0",
          {
            uri: "https://www.w3.org/TR/WCAG20/#keyboard-operation-all-funcs",
            level: "AAA"
          }
        ]
      ]
    },
    "2.1.4": {
      title: "Character Key Shortcuts",
      versions: [
        [
          "2.2",
          {
            uri: "https://www.w3.org/TR/WCAG2/#character-key-shortcuts",
            level: "A"
          }
        ],
        [
          "2.1",
          {
            uri: "https://www.w3.org/TR/WCAG21/#character-key-shortcuts",
            level: "A"
          }
        ]
      ]
    },
    "2.2.1": {
      title: "Timing Adjustable",
      versions: [
        [
          "2.2",
          {
            uri: "https://www.w3.org/TR/WCAG2/#timing-adjustable",
            level: "A"
          }
        ],
        [
          "2.1",
          {
            uri: "https://www.w3.org/TR/WCAG21/#timing-adjustable",
            level: "A"
          }
        ],
        [
          "2.0",
          {
            uri: "https://www.w3.org/TR/WCAG20/#time-limits-required-behaviors",
            level: "A"
          }
        ]
      ]
    },
    "2.2.2": {
      title: "Pause, Stop, Hide",
      versions: [
        [
          "2.2",
          {
            uri: "https://www.w3.org/TR/WCAG2/#pause-stop-hide",
            level: "A"
          }
        ],
        [
          "2.1",
          {
            uri: "https://www.w3.org/TR/WCAG21/#pause-stop-hide",
            level: "A"
          }
        ],
        [
          "2.0",
          {
            uri: "https://www.w3.org/TR/WCAG20/#time-limits-pause",
            level: "A"
          }
        ]
      ]
    },
    "2.2.3": {
      title: "No Timing",
      versions: [
        [
          "2.2",
          {
            uri: "https://www.w3.org/TR/WCAG2/#no-timing",
            level: "AAA"
          }
        ],
        [
          "2.1",
          {
            uri: "https://www.w3.org/TR/WCAG21/#no-timing",
            level: "AAA"
          }
        ],
        [
          "2.0",
          {
            uri: "https://www.w3.org/TR/WCAG20/#time-limits-no-exceptions",
            level: "AAA"
          }
        ]
      ]
    },
    "2.2.4": {
      title: "Interruptions",
      versions: [
        [
          "2.2",
          {
            uri: "https://www.w3.org/TR/WCAG2/#interruptions",
            level: "AAA"
          }
        ],
        [
          "2.1",
          {
            uri: "https://www.w3.org/TR/WCAG21/#interruptions",
            level: "AAA"
          }
        ],
        [
          "2.0",
          {
            uri: "https://www.w3.org/TR/WCAG20/#time-limits-postponed",
            level: "AAA"
          }
        ]
      ]
    },
    "2.2.5": {
      title: "Re-authenticating",
      versions: [
        [
          "2.2",
          {
            uri: "https://www.w3.org/TR/WCAG2/#re-authenticating",
            level: "AAA"
          }
        ],
        [
          "2.1",
          {
            uri: "https://www.w3.org/TR/WCAG21/#re-authenticating",
            level: "AAA"
          }
        ],
        [
          "2.0",
          {
            uri: "https://www.w3.org/TR/WCAG20/#time-limits-server-timeout",
            level: "AAA"
          }
        ]
      ]
    },
    "2.2.6": {
      title: "Timeouts",
      versions: [
        [
          "2.2",
          {
            uri: "https://www.w3.org/TR/WCAG2/#timeouts",
            level: "AAA"
          }
        ],
        [
          "2.1",
          {
            uri: "https://www.w3.org/TR/WCAG21/#timeouts",
            level: "AAA"
          }
        ]
      ]
    },
    "2.3.1": {
      title: "Three Flashes or Below Threshold",
      versions: [
        [
          "2.2",
          {
            uri: "https://www.w3.org/TR/WCAG2/#three-flashes-or-below-threshold",
            level: "A"
          }
        ],
        [
          "2.1",
          {
            uri: "https://www.w3.org/TR/WCAG21/#three-flashes-or-below-threshold",
            level: "A"
          }
        ],
        [
          "2.0",
          {
            uri: "https://www.w3.org/TR/WCAG20/#seizure-does-not-violate",
            level: "A"
          }
        ]
      ]
    },
    "2.3.2": {
      title: "Three Flashes",
      versions: [
        [
          "2.2",
          {
            uri: "https://www.w3.org/TR/WCAG2/#three-flashes",
            level: "AAA"
          }
        ],
        [
          "2.1",
          {
            uri: "https://www.w3.org/TR/WCAG21/#three-flashes",
            level: "AAA"
          }
        ],
        [
          "2.0",
          {
            uri: "https://www.w3.org/TR/WCAG20/#seizure-three-times",
            level: "AAA"
          }
        ]
      ]
    },
    "2.3.3": {
      title: "Animation from Interactions",
      versions: [
        [
          "2.2",
          {
            uri: "https://www.w3.org/TR/WCAG2/#animation-from-interactions",
            level: "AAA"
          }
        ],
        [
          "2.1",
          {
            uri: "https://www.w3.org/TR/WCAG21/#animation-from-interactions",
            level: "AAA"
          }
        ]
      ]
    },
    "2.4.1": {
      title: "Bypass Blocks",
      versions: [
        [
          "2.2",
          {
            uri: "https://www.w3.org/TR/WCAG2/#bypass-blocks",
            level: "A"
          }
        ],
        [
          "2.1",
          {
            uri: "https://www.w3.org/TR/WCAG21/#bypass-blocks",
            level: "A"
          }
        ],
        [
          "2.0",
          {
            uri: "https://www.w3.org/TR/WCAG20/#navigation-mechanisms-skip",
            level: "A"
          }
        ]
      ]
    },
    "2.4.2": {
      title: "Page Titled",
      versions: [
        [
          "2.2",
          {
            uri: "https://www.w3.org/TR/WCAG2/#page-titled",
            level: "A"
          }
        ],
        [
          "2.1",
          {
            uri: "https://www.w3.org/TR/WCAG21/#page-titled",
            level: "A"
          }
        ],
        [
          "2.0",
          {
            uri: "https://www.w3.org/TR/WCAG20/#navigation-mechanisms-title",
            level: "A"
          }
        ]
      ]
    },
    "2.4.3": {
      title: "Focus Order",
      versions: [
        [
          "2.2",
          {
            uri: "https://www.w3.org/TR/WCAG2/#focus-order",
            level: "A"
          }
        ],
        [
          "2.1",
          {
            uri: "https://www.w3.org/TR/WCAG21/#focus-order",
            level: "A"
          }
        ],
        [
          "2.0",
          {
            uri: "https://www.w3.org/TR/WCAG20/#navigation-mechanisms-focus-order",
            level: "A"
          }
        ]
      ]
    },
    "2.4.4": {
      title: "Link Purpose (In Context)",
      versions: [
        [
          "2.2",
          {
            uri: "https://www.w3.org/TR/WCAG2/#link-purpose-in-context",
            level: "A"
          }
        ],
        [
          "2.1",
          {
            uri: "https://www.w3.org/TR/WCAG21/#link-purpose-in-context",
            level: "A"
          }
        ],
        [
          "2.0",
          {
            uri: "https://www.w3.org/TR/WCAG20/#navigation-mechanisms-refs",
            level: "A"
          }
        ]
      ]
    },
    "2.4.5": {
      title: "Multiple Ways",
      versions: [
        [
          "2.2",
          {
            uri: "https://www.w3.org/TR/WCAG2/#multiple-ways",
            level: "AA"
          }
        ],
        [
          "2.1",
          {
            uri: "https://www.w3.org/TR/WCAG21/#multiple-ways",
            level: "AA"
          }
        ],
        [
          "2.0",
          {
            uri: "https://www.w3.org/TR/WCAG20/#navigation-mechanisms-mult-loc",
            level: "AA"
          }
        ]
      ]
    },
    "2.4.6": {
      title: "Headings and Labels",
      versions: [
        [
          "2.2",
          {
            uri: "https://www.w3.org/TR/WCAG2/#headings-and-labels",
            level: "AA"
          }
        ],
        [
          "2.1",
          {
            uri: "https://www.w3.org/TR/WCAG21/#headings-and-labels",
            level: "AA"
          }
        ],
        [
          "2.0",
          {
            uri: "https://www.w3.org/TR/WCAG20/#navigation-mechanisms-descriptive",
            level: "AA"
          }
        ]
      ]
    },
    "2.4.7": {
      title: "Focus Visible",
      versions: [
        [
          "2.2",
          {
            uri: "https://www.w3.org/TR/WCAG2/#focus-visible",
            level: "AA"
          }
        ],
        [
          "2.1",
          {
            uri: "https://www.w3.org/TR/WCAG21/#focus-visible",
            level: "AA"
          }
        ],
        [
          "2.0",
          {
            uri: "https://www.w3.org/TR/WCAG20/#navigation-mechanisms-focus-visible",
            level: "AA"
          }
        ]
      ]
    },
    "2.4.8": {
      title: "Location",
      versions: [
        [
          "2.2",
          {
            uri: "https://www.w3.org/TR/WCAG2/#location",
            level: "AAA"
          }
        ],
        [
          "2.1",
          {
            uri: "https://www.w3.org/TR/WCAG21/#location",
            level: "AAA"
          }
        ],
        [
          "2.0",
          {
            uri: "https://www.w3.org/TR/WCAG20/#navigation-mechanisms-location",
            level: "AAA"
          }
        ]
      ]
    },
    "2.4.9": {
      title: "Link Purpose (Link Only)",
      versions: [
        [
          "2.2",
          {
            uri: "https://www.w3.org/TR/WCAG2/#link-purpose-link-only",
            level: "AAA"
          }
        ],
        [
          "2.1",
          {
            uri: "https://www.w3.org/TR/WCAG21/#link-purpose-link-only",
            level: "AAA"
          }
        ],
        [
          "2.0",
          {
            uri: "https://www.w3.org/TR/WCAG20/#navigation-mechanisms-link",
            level: "AAA"
          }
        ]
      ]
    },
    "2.4.10": {
      title: "Section Headings",
      versions: [
        [
          "2.2",
          {
            uri: "https://www.w3.org/TR/WCAG2/#section-headings",
            level: "AAA"
          }
        ],
        [
          "2.1",
          {
            uri: "https://www.w3.org/TR/WCAG21/#section-headings",
            level: "AAA"
          }
        ],
        [
          "2.0",
          {
            uri: "https://www.w3.org/TR/WCAG20/#navigation-mechanisms-headings",
            level: "AAA"
          }
        ]
      ]
    },
    "2.4.11": {
      title: "Focus Not Obscured (Minimum)",
      versions: [
        [
          "2.2",
          {
            uri: "https://www.w3.org/TR/WCAG2/#focus-not-obscured-minimum",
            level: "AA"
          }
        ]
      ]
    },
    "2.4.12": {
      title: "Focus Not Obscured (Enhanced)",
      versions: [
        [
          "2.2",
          {
            uri: "https://www.w3.org/TR/WCAG2/#focus-not-obscured-enhanced",
            level: "AAA"
          }
        ]
      ]
    },
    "2.4.13": {
      title: "Focus Appearance",
      versions: [
        [
          "2.2",
          {
            uri: "https://www.w3.org/TR/WCAG2/#focus-appearance",
            level: "AAA"
          }
        ]
      ]
    },
    "2.5.1": {
      title: "Pointer Gestures",
      versions: [
        [
          "2.2",
          {
            uri: "https://www.w3.org/TR/WCAG2/#pointer-gestures",
            level: "A"
          }
        ],
        [
          "2.1",
          {
            uri: "https://www.w3.org/TR/WCAG21/#pointer-gestures",
            level: "A"
          }
        ]
      ]
    },
    "2.5.2": {
      title: "Pointer Cancellation",
      versions: [
        [
          "2.2",
          {
            uri: "https://www.w3.org/TR/WCAG2/#pointer-cancellation",
            level: "A"
          }
        ],
        [
          "2.1",
          {
            uri: "https://www.w3.org/TR/WCAG21/#pointer-cancellation",
            level: "A"
          }
        ]
      ]
    },
    "2.5.3": {
      title: "Label in Name",
      versions: [
        [
          "2.2",
          {
            uri: "https://www.w3.org/TR/WCAG2/#label-in-name",
            level: "A"
          }
        ],
        [
          "2.1",
          {
            uri: "https://www.w3.org/TR/WCAG21/#label-in-name",
            level: "A"
          }
        ]
      ]
    },
    "2.5.4": {
      title: "Motion Actuation",
      versions: [
        [
          "2.2",
          {
            uri: "https://www.w3.org/TR/WCAG2/#motion-actuation",
            level: "A"
          }
        ],
        [
          "2.1",
          {
            uri: "https://www.w3.org/TR/WCAG21/#motion-actuation",
            level: "A"
          }
        ]
      ]
    },
    "2.5.5": {
      title: "Target Size (Enhanced)",
      versions: [
        [
          "2.2",
          {
            uri: "https://www.w3.org/TR/WCAG2/#target-size-enhanced",
            level: "AAA"
          }
        ],
        [
          "2.1",
          {
            uri: "https://www.w3.org/TR/WCAG21/#target-size",
            level: "AAA"
          }
        ]
      ]
    },
    "2.5.6": {
      title: "Concurrent Input Mechanisms",
      versions: [
        [
          "2.2",
          {
            uri: "https://www.w3.org/TR/WCAG2/#concurrent-input-mechanisms",
            level: "AAA"
          }
        ],
        [
          "2.1",
          {
            uri: "https://www.w3.org/TR/WCAG21/#concurrent-input-mechanisms",
            level: "AAA"
          }
        ]
      ]
    },
    "2.5.7": {
      title: "Dragging Movements",
      versions: [
        [
          "2.2",
          {
            uri: "https://www.w3.org/TR/WCAG2/#dragging-movements",
            level: "AA"
          }
        ]
      ]
    },
    "2.5.8": {
      title: "Target Size (Minimum)",
      versions: [
        [
          "2.2",
          {
            uri: "https://www.w3.org/TR/WCAG2/#target-size-minimum",
            level: "AA"
          }
        ]
      ]
    },
    "3.1.1": {
      title: "Language of Page",
      versions: [
        [
          "2.2",
          {
            uri: "https://www.w3.org/TR/WCAG2/#language-of-page",
            level: "A"
          }
        ],
        [
          "2.1",
          {
            uri: "https://www.w3.org/TR/WCAG21/#language-of-page",
            level: "A"
          }
        ],
        [
          "2.0",
          {
            uri: "https://www.w3.org/TR/WCAG20/#meaning-doc-lang-id",
            level: "A"
          }
        ]
      ]
    },
    "3.1.2": {
      title: "Language of Parts",
      versions: [
        [
          "2.2",
          {
            uri: "https://www.w3.org/TR/WCAG2/#language-of-parts",
            level: "AA"
          }
        ],
        [
          "2.1",
          {
            uri: "https://www.w3.org/TR/WCAG21/#language-of-parts",
            level: "AA"
          }
        ],
        [
          "2.0",
          {
            uri: "https://www.w3.org/TR/WCAG20/#meaning-other-lang-id",
            level: "AA"
          }
        ]
      ]
    },
    "3.1.3": {
      title: "Unusual Words",
      versions: [
        [
          "2.2",
          {
            uri: "https://www.w3.org/TR/WCAG2/#unusual-words",
            level: "AAA"
          }
        ],
        [
          "2.1",
          {
            uri: "https://www.w3.org/TR/WCAG21/#unusual-words",
            level: "AAA"
          }
        ],
        [
          "2.0",
          {
            uri: "https://www.w3.org/TR/WCAG20/#meaning-idioms",
            level: "AAA"
          }
        ]
      ]
    },
    "3.1.4": {
      title: "Abbreviations",
      versions: [
        [
          "2.2",
          {
            uri: "https://www.w3.org/TR/WCAG2/#abbreviations",
            level: "AAA"
          }
        ],
        [
          "2.1",
          {
            uri: "https://www.w3.org/TR/WCAG21/#abbreviations",
            level: "AAA"
          }
        ],
        [
          "2.0",
          {
            uri: "https://www.w3.org/TR/WCAG20/#meaning-located",
            level: "AAA"
          }
        ]
      ]
    },
    "3.1.5": {
      title: "Reading Level",
      versions: [
        [
          "2.2",
          {
            uri: "https://www.w3.org/TR/WCAG2/#reading-level",
            level: "AAA"
          }
        ],
        [
          "2.1",
          {
            uri: "https://www.w3.org/TR/WCAG21/#reading-level",
            level: "AAA"
          }
        ],
        [
          "2.0",
          {
            uri: "https://www.w3.org/TR/WCAG20/#meaning-supplements",
            level: "AAA"
          }
        ]
      ]
    },
    "3.1.6": {
      title: "Pronunciation",
      versions: [
        [
          "2.2",
          {
            uri: "https://www.w3.org/TR/WCAG2/#pronunciation",
            level: "AAA"
          }
        ],
        [
          "2.1",
          {
            uri: "https://www.w3.org/TR/WCAG21/#pronunciation",
            level: "AAA"
          }
        ],
        [
          "2.0",
          {
            uri: "https://www.w3.org/TR/WCAG20/#meaning-pronunciation",
            level: "AAA"
          }
        ]
      ]
    },
    "3.2.1": {
      title: "On Focus",
      versions: [
        [
          "2.2",
          {
            uri: "https://www.w3.org/TR/WCAG2/#on-focus",
            level: "A"
          }
        ],
        [
          "2.1",
          {
            uri: "https://www.w3.org/TR/WCAG21/#on-focus",
            level: "A"
          }
        ],
        [
          "2.0",
          {
            uri: "https://www.w3.org/TR/WCAG20/#consistent-behavior-receive-focus",
            level: "A"
          }
        ]
      ]
    },
    "3.2.2": {
      title: "On Input",
      versions: [
        [
          "2.2",
          {
            uri: "https://www.w3.org/TR/WCAG2/#on-input",
            level: "A"
          }
        ],
        [
          "2.1",
          {
            uri: "https://www.w3.org/TR/WCAG21/#on-input",
            level: "A"
          }
        ],
        [
          "2.0",
          {
            uri: "https://www.w3.org/TR/WCAG20/#consistent-behavior-unpredictable-change",
            level: "A"
          }
        ]
      ]
    },
    "3.2.3": {
      title: "Consistent Navigation",
      versions: [
        [
          "2.2",
          {
            uri: "https://www.w3.org/TR/WCAG2/#consistent-navigation",
            level: "AA"
          }
        ],
        [
          "2.1",
          {
            uri: "https://www.w3.org/TR/WCAG21/#consistent-navigation",
            level: "AA"
          }
        ],
        [
          "2.0",
          {
            uri: "https://www.w3.org/TR/WCAG20/#consistent-behavior-consistent-locations",
            level: "AA"
          }
        ]
      ]
    },
    "3.2.4": {
      title: "Consistent Identification",
      versions: [
        [
          "2.2",
          {
            uri: "https://www.w3.org/TR/WCAG2/#consistent-identification",
            level: "AA"
          }
        ],
        [
          "2.1",
          {
            uri: "https://www.w3.org/TR/WCAG21/#consistent-identification",
            level: "AA"
          }
        ],
        [
          "2.0",
          {
            uri: "https://www.w3.org/TR/WCAG20/#consistent-behavior-consistent-functionality",
            level: "AA"
          }
        ]
      ]
    },
    "3.2.5": {
      title: "Change on Request",
      versions: [
        [
          "2.2",
          {
            uri: "https://www.w3.org/TR/WCAG2/#change-on-request",
            level: "AAA"
          }
        ],
        [
          "2.1",
          {
            uri: "https://www.w3.org/TR/WCAG21/#change-on-request",
            level: "AAA"
          }
        ],
        [
          "2.0",
          {
            uri: "https://www.w3.org/TR/WCAG20/#consistent-behavior-no-extreme-changes-context",
            level: "AAA"
          }
        ]
      ]
    },
    "3.2.6": {
      title: "Consistent Help",
      versions: [
        [
          "2.2",
          {
            uri: "https://www.w3.org/TR/WCAG2/#consistent-help",
            level: "A"
          }
        ]
      ]
    },
    "3.3.1": {
      title: "Error Identification",
      versions: [
        [
          "2.2",
          {
            uri: "https://www.w3.org/TR/WCAG2/#error-identification",
            level: "A"
          }
        ],
        [
          "2.1",
          {
            uri: "https://www.w3.org/TR/WCAG21/#error-identification",
            level: "A"
          }
        ],
        [
          "2.0",
          {
            uri: "https://www.w3.org/TR/WCAG20/#minimize-error-identified",
            level: "A"
          }
        ]
      ]
    },
    "3.3.2": {
      title: "Labels or Instructions",
      versions: [
        [
          "2.2",
          {
            uri: "https://www.w3.org/TR/WCAG2/#labels-or-instructions",
            level: "A"
          }
        ],
        [
          "2.1",
          {
            uri: "https://www.w3.org/TR/WCAG21/#labels-or-instructions",
            level: "A"
          }
        ],
        [
          "2.0",
          {
            uri: "https://www.w3.org/TR/WCAG20/#minimize-error-cues",
            level: "A"
          }
        ]
      ]
    },
    "3.3.3": {
      title: "Error Suggestion",
      versions: [
        [
          "2.2",
          {
            uri: "https://www.w3.org/TR/WCAG2/#error-suggestion",
            level: "AA"
          }
        ],
        [
          "2.1",
          {
            uri: "https://www.w3.org/TR/WCAG21/#error-suggestion",
            level: "AA"
          }
        ],
        [
          "2.0",
          {
            uri: "https://www.w3.org/TR/WCAG20/#minimize-error-suggestions",
            level: "AA"
          }
        ]
      ]
    },
    "3.3.4": {
      title: "Error Prevention (Legal, Financial, Data)",
      versions: [
        [
          "2.2",
          {
            uri: "https://www.w3.org/TR/WCAG2/#error-prevention-legal-financial-data",
            level: "AA"
          }
        ],
        [
          "2.1",
          {
            uri: "https://www.w3.org/TR/WCAG21/#error-prevention-legal-financial-data",
            level: "AA"
          }
        ],
        [
          "2.0",
          {
            uri: "https://www.w3.org/TR/WCAG20/#minimize-error-reversible",
            level: "AA"
          }
        ]
      ]
    },
    "3.3.5": {
      title: "Help",
      versions: [
        [
          "2.2",
          {
            uri: "https://www.w3.org/TR/WCAG2/#help",
            level: "AAA"
          }
        ],
        [
          "2.1",
          {
            uri: "https://www.w3.org/TR/WCAG21/#help",
            level: "AAA"
          }
        ],
        [
          "2.0",
          {
            uri: "https://www.w3.org/TR/WCAG20/#minimize-error-context-help",
            level: "AAA"
          }
        ]
      ]
    },
    "3.3.6": {
      title: "Error Prevention (All)",
      versions: [
        [
          "2.2",
          {
            uri: "https://www.w3.org/TR/WCAG2/#error-prevention-all",
            level: "AAA"
          }
        ],
        [
          "2.1",
          {
            uri: "https://www.w3.org/TR/WCAG21/#error-prevention-all",
            level: "AAA"
          }
        ],
        [
          "2.0",
          {
            uri: "https://www.w3.org/TR/WCAG20/#minimize-error-reversible-all",
            level: "AAA"
          }
        ]
      ]
    },
    "3.3.7": {
      title: "Redundant Entry",
      versions: [
        [
          "2.2",
          {
            uri: "https://www.w3.org/TR/WCAG2/#redundant-entry",
            level: "A"
          }
        ]
      ]
    },
    "3.3.8": {
      title: "Accessible Authentication (Minimum)",
      versions: [
        [
          "2.2",
          {
            uri: "https://www.w3.org/TR/WCAG2/#accessible-authentication-minimum",
            level: "AA"
          }
        ]
      ]
    },
    "3.3.9": {
      title: "Accessible Authentication (Enhanced)",
      versions: [
        [
          "2.2",
          {
            uri: "https://www.w3.org/TR/WCAG2/#accessible-authentication-enhanced",
            level: "AAA"
          }
        ]
      ]
    },
    "4.1.2": {
      title: "Name, Role, Value",
      versions: [
        [
          "2.2",
          {
            uri: "https://www.w3.org/TR/WCAG2/#name-role-value",
            level: "A"
          }
        ],
        [
          "2.1",
          {
            uri: "https://www.w3.org/TR/WCAG21/#name-role-value",
            level: "A"
          }
        ],
        [
          "2.0",
          {
            uri: "https://www.w3.org/TR/WCAG20/#ensure-compat-rsv",
            level: "A"
          }
        ]
      ]
    },
    "4.1.3": {
      title: "Status Messages",
      versions: [
        [
          "2.2",
          {
            uri: "https://www.w3.org/TR/WCAG2/#status-messages",
            level: "AA"
          }
        ],
        [
          "2.1",
          {
            uri: "https://www.w3.org/TR/WCAG21/#status-messages",
            level: "AA"
          }
        ]
      ]
    },
    "4.1.1": {
      title: "Parsing",
      versions: [
        [
          "2.1",
          {
            uri: "https://www.w3.org/TR/WCAG21/#parsing",
            level: "A"
          }
        ],
        [
          "2.0",
          {
            uri: "https://www.w3.org/TR/WCAG20/#ensure-compat-parses",
            level: "A"
          }
        ]
      ]
    }
  };

  // node_modules/@siteimprove/alfa-wcag/dist/criterion.js
  var Criterion = class _Criterion extends Requirement {
    static of(chapter) {
      const versions = [...Criteria[chapter].versions];
      const [, { uri }] = versions.find(([version]) => version === _Criterion.Version.Recommendation) ?? versions.find(([version]) => version === _Criterion.Version.Old);
      return new _Criterion(chapter, uri);
    }
    _chapter;
    constructor(chapter, uri) {
      super("criterion", uri);
      this._chapter = chapter;
    }
    /**
     * The chapter of this criterion.
     */
    get chapter() {
      return this._chapter;
    }
    /**
     * The title of this criterion.
     */
    get title() {
      return Criteria[this._chapter].title;
    }
    /**
     * The versions in which this criterion is defined.
     */
    get versions() {
      return [...Criteria[this._chapter].versions].map(([version]) => version);
    }
    /**
     * The level of this criterion.
     *
     * @remarks
     * The level may be different between versions.
     */
    get level() {
      return Branched.from([...Criteria[this._chapter].versions].map(([version, { level }]) => [
        level,
        [version]
      ]));
    }
    toJSON() {
      const { title } = Criteria[this._chapter];
      return {
        ...super.toJSON(),
        chapter: this._chapter,
        title
      };
    }
    toEARL() {
      const { title } = Criteria[this._chapter];
      return {
        ...super.toEARL(),
        "@context": {
          earl: "http://www.w3.org/ns/earl#",
          dct: "http://purl.org/dc/terms/"
        },
        "dct:title": title,
        "dct:isPartOf": "https://www.w3.org/TR/WCAG/"
      };
    }
  };
  (function(Criterion2) {
    function isChapter(value) {
      return value in Criteria;
    }
    Criterion2.isChapter = isChapter;
    let Version;
    (function(Version2) {
      Version2.Recommendation = "2.2";
      Version2.Old = "2.1";
    })(Version = Criterion2.Version || (Criterion2.Version = {}));
    function isCriterion(value) {
      return value instanceof Criterion2;
    }
    Criterion2.isCriterion = isCriterion;
    function fromURI(uri) {
      const rewrittenUri = uri.replace("/WCAG22/", "/WCAG2/").replace("/WCAG/", "/WCAG2/");
      for (const [chapter, value] of Object.entries(Criteria)) {
        for (const version of value.versions) {
          if (version[1].uri === rewrittenUri) {
            return Option.of(Criterion2.of(chapter));
          }
        }
      }
      return None;
    }
    Criterion2.fromURI = fromURI;
  })(Criterion || (Criterion = {}));

  // node_modules/@siteimprove/alfa-wcag/dist/conformance.js
  var Conformance;
  (function(Conformance2) {
    function hasLevel(level, version = Criterion.Version.Recommendation) {
      return (criterion) => criterion.level.some((found, versions) => found <= level && [...versions].includes(version));
    }
    function isA(version) {
      return hasLevel("A", version);
    }
    Conformance2.isA = isA;
    function isAA(version) {
      return hasLevel("AA", version);
    }
    Conformance2.isAA = isAA;
    function isAAA(version) {
      return hasLevel("AAA", version);
    }
    Conformance2.isAAA = isAAA;
  })(Conformance || (Conformance = {}));

  // node_modules/@siteimprove/alfa-wcag/dist/technique/data.js
  var Techniques = {
    ARIA1: {
      title: "Using the aria-describedby property to provide a descriptive label for user interface",
      uri: "https://www.w3.org/WAI/WCAG22/Techniques/aria/ARIA1"
    },
    ARIA2: {
      title: "Identifying a required field with the aria-required property",
      uri: "https://www.w3.org/WAI/WCAG22/Techniques/aria/ARIA2"
    },
    ARIA4: {
      title: "Using a WAI-ARIA role to expose the role of a user interface component",
      uri: "https://www.w3.org/WAI/WCAG22/Techniques/aria/ARIA4"
    },
    ARIA5: {
      title: "Using WAI-ARIA state and property attributes to expose the state of a user interface",
      uri: "https://www.w3.org/WAI/WCAG22/Techniques/aria/ARIA5"
    },
    ARIA6: {
      title: "Using aria-label to provide labels for objects",
      uri: "https://www.w3.org/WAI/WCAG22/Techniques/aria/ARIA6"
    },
    ARIA7: {
      title: "Using aria-labelledby for link purpose",
      uri: "https://www.w3.org/WAI/WCAG22/Techniques/aria/ARIA7"
    },
    ARIA8: {
      title: "Using aria-label for link purpose",
      uri: "https://www.w3.org/WAI/WCAG22/Techniques/aria/ARIA8"
    },
    ARIA9: {
      title: "Using aria-labelledby to concatenate a label from several text nodes",
      uri: "https://www.w3.org/WAI/WCAG22/Techniques/aria/ARIA9"
    },
    ARIA10: {
      title: "Using aria-labelledby to provide a text alternative for non-text content",
      uri: "https://www.w3.org/WAI/WCAG22/Techniques/aria/ARIA10"
    },
    ARIA11: {
      title: "Using ARIA landmarks to identify regions of a page",
      uri: "https://www.w3.org/WAI/WCAG22/Techniques/aria/ARIA11"
    },
    ARIA12: {
      title: "Using role=heading to identify headings",
      uri: "https://www.w3.org/WAI/WCAG22/Techniques/aria/ARIA12"
    },
    ARIA13: {
      title: "Using aria-labelledby to name regions and landmarks",
      uri: "https://www.w3.org/WAI/WCAG22/Techniques/aria/ARIA13"
    },
    ARIA14: {
      title: "Using aria-label to provide an invisible label where a visible label cannot be used",
      uri: "https://www.w3.org/WAI/WCAG22/Techniques/aria/ARIA14"
    },
    ARIA15: {
      title: "Using aria-describedby to provide descriptions of images",
      uri: "https://www.w3.org/WAI/WCAG22/Techniques/aria/ARIA15"
    },
    ARIA16: {
      title: "Using aria-labelledby to provide a name for user interface controls",
      uri: "https://www.w3.org/WAI/WCAG22/Techniques/aria/ARIA16"
    },
    ARIA17: {
      title: "Using grouping roles to identify related form controls",
      uri: "https://www.w3.org/WAI/WCAG22/Techniques/aria/ARIA17"
    },
    ARIA18: {
      title: "Using aria-alertdialog to Identify Errors",
      uri: "https://www.w3.org/WAI/WCAG22/Techniques/aria/ARIA18"
    },
    ARIA19: {
      title: "Using ARIA role=alert or Live Regions to Identify Errors",
      uri: "https://www.w3.org/WAI/WCAG22/Techniques/aria/ARIA19"
    },
    ARIA20: {
      title: "Using the region role to identify a region of the page",
      uri: "https://www.w3.org/WAI/WCAG22/Techniques/aria/ARIA20"
    },
    ARIA21: {
      title: "Using aria-invalid to Indicate An Error Field",
      uri: "https://www.w3.org/WAI/WCAG22/Techniques/aria/ARIA21"
    },
    ARIA22: {
      title: "Using role=status to present status messages",
      uri: "https://www.w3.org/WAI/WCAG22/Techniques/aria/ARIA22"
    },
    ARIA23: {
      title: "Using role=log to identify sequential information updates",
      uri: "https://www.w3.org/WAI/WCAG22/Techniques/aria/ARIA23"
    },
    ARIA24: {
      title: 'Semantically identifying a font icon with role="img"',
      uri: "https://www.w3.org/WAI/WCAG22/Techniques/aria/ARIA24"
    },
    SCR1: {
      title: "Allowing the user to extend the default time limit",
      uri: "https://www.w3.org/WAI/WCAG22/Techniques/client-side-script/SCR1"
    },
    SCR2: {
      title: "Using redundant keyboard and mouse event handlers",
      uri: "https://www.w3.org/WAI/WCAG22/Techniques/client-side-script/SCR2"
    },
    SCR14: {
      title: "Using scripts to make nonessential alerts optional",
      uri: "https://www.w3.org/WAI/WCAG22/Techniques/client-side-script/SCR14"
    },
    SCR16: {
      title: "Providing a script that warns the user a time limit is about to expire",
      uri: "https://www.w3.org/WAI/WCAG22/Techniques/client-side-script/SCR16"
    },
    SCR18: {
      title: "Providing client-side validation and alert",
      uri: "https://www.w3.org/WAI/WCAG22/Techniques/client-side-script/SCR18"
    },
    SCR19: {
      title: "Using an onchange event on a select element without causing a change of context",
      uri: "https://www.w3.org/WAI/WCAG22/Techniques/client-side-script/SCR19"
    },
    SCR20: {
      title: "Using both keyboard and other device-specific functions",
      uri: "https://www.w3.org/WAI/WCAG22/Techniques/client-side-script/SCR20"
    },
    SCR21: {
      title: "Using functions of the Document Object Model (DOM) to add content to a page",
      uri: "https://www.w3.org/WAI/WCAG22/Techniques/client-side-script/SCR21"
    },
    SCR22: {
      title: "Using scripts to control blinking and stop it in five seconds or less",
      uri: "https://www.w3.org/WAI/WCAG22/Techniques/client-side-script/SCR22"
    },
    SCR24: {
      title: "Using progressive enhancement to open new windows on user request",
      uri: "https://www.w3.org/WAI/WCAG22/Techniques/client-side-script/SCR24"
    },
    SCR26: {
      title: "Inserting dynamic content into the Document Object Model immediately following its",
      uri: "https://www.w3.org/WAI/WCAG22/Techniques/client-side-script/SCR26"
    },
    SCR27: {
      title: "Reordering page sections using the Document Object Model",
      uri: "https://www.w3.org/WAI/WCAG22/Techniques/client-side-script/SCR27"
    },
    SCR28: {
      title: "Using an expandable and collapsible menu to bypass block of content",
      uri: "https://www.w3.org/WAI/WCAG22/Techniques/client-side-script/SCR28"
    },
    SCR29: {
      title: "Adding keyboard-accessible actions to static HTML elements",
      uri: "https://www.w3.org/WAI/WCAG22/Techniques/client-side-script/SCR29"
    },
    SCR30: {
      title: "Using scripts to change the link text",
      uri: "https://www.w3.org/WAI/WCAG22/Techniques/client-side-script/SCR30"
    },
    SCR31: {
      title: "Using script to change the background color or border of the element with focus",
      uri: "https://www.w3.org/WAI/WCAG22/Techniques/client-side-script/SCR31"
    },
    SCR32: {
      title: "Providing client-side validation and adding error text via the DOM",
      uri: "https://www.w3.org/WAI/WCAG22/Techniques/client-side-script/SCR32"
    },
    SCR33: {
      title: "Using script to scroll content, and providing a mechanism to pause it",
      uri: "https://www.w3.org/WAI/WCAG22/Techniques/client-side-script/SCR33"
    },
    SCR34: {
      title: "Calculating size and position in a way that scales with text size",
      uri: "https://www.w3.org/WAI/WCAG22/Techniques/client-side-script/SCR34"
    },
    SCR35: {
      title: "Making actions keyboard accessible by using the onclick event of anchors and buttons",
      uri: "https://www.w3.org/WAI/WCAG22/Techniques/client-side-script/SCR35"
    },
    SCR36: {
      title: "Providing a mechanism to allow users to display moving, scrolling, or auto-updating",
      uri: "https://www.w3.org/WAI/WCAG22/Techniques/client-side-script/SCR36"
    },
    SCR37: {
      title: "Creating Custom Dialogs",
      uri: "https://www.w3.org/WAI/WCAG22/Techniques/client-side-script/SCR37"
    },
    SCR38: {
      title: "Creating a conforming alternate version for a web page designed with progressive enhancement",
      uri: "https://www.w3.org/WAI/WCAG22/Techniques/client-side-script/SCR38"
    },
    SCR39: {
      title: "Making content on focus or hover hoverable, dismissible, and persistent",
      uri: "https://www.w3.org/WAI/WCAG22/Techniques/client-side-script/SCR39"
    },
    C6: {
      title: "Positioning content based on structural markup",
      uri: "https://www.w3.org/WAI/WCAG22/Techniques/css/C6"
    },
    C7: {
      title: "Using CSS to hide a portion of the link text",
      uri: "https://www.w3.org/WAI/WCAG22/Techniques/css/C7"
    },
    C8: {
      title: "Using CSS letter-spacing to control spacing within a word",
      uri: "https://www.w3.org/WAI/WCAG22/Techniques/css/C8"
    },
    C9: {
      title: "Using CSS to include decorative images",
      uri: "https://www.w3.org/WAI/WCAG22/Techniques/css/C9"
    },
    C12: {
      title: "Using percent for font sizes",
      uri: "https://www.w3.org/WAI/WCAG22/Techniques/css/C12"
    },
    C13: {
      title: "Using named font sizes",
      uri: "https://www.w3.org/WAI/WCAG22/Techniques/css/C13"
    },
    C14: {
      title: "Using em units for font sizes",
      uri: "https://www.w3.org/WAI/WCAG22/Techniques/css/C14"
    },
    C15: {
      title: "Using CSS to change the presentation of a user interface component when it receives",
      uri: "https://www.w3.org/WAI/WCAG22/Techniques/css/C15"
    },
    C17: {
      title: "Scaling form elements which contain text",
      uri: "https://www.w3.org/WAI/WCAG22/Techniques/css/C17"
    },
    C18: {
      title: "Using CSS margin and padding rules instead of spacer images for layout design",
      uri: "https://www.w3.org/WAI/WCAG22/Techniques/css/C18"
    },
    C19: {
      title: "Specifying alignment either to the left or right in CSS",
      uri: "https://www.w3.org/WAI/WCAG22/Techniques/css/C19"
    },
    C20: {
      title: "Using relative measurements to set column widths so that lines can average 80 characters",
      uri: "https://www.w3.org/WAI/WCAG22/Techniques/css/C20"
    },
    C21: {
      title: "Specifying line spacing in CSS",
      uri: "https://www.w3.org/WAI/WCAG22/Techniques/css/C21"
    },
    C22: {
      title: "Using CSS to control visual presentation of text",
      uri: "https://www.w3.org/WAI/WCAG22/Techniques/css/C22"
    },
    C23: {
      title: "Specifying text and background colors of secondary content such as banners, features",
      uri: "https://www.w3.org/WAI/WCAG22/Techniques/css/C23"
    },
    C24: {
      title: "Using percentage values in CSS for container sizes",
      uri: "https://www.w3.org/WAI/WCAG22/Techniques/css/C24"
    },
    C25: {
      title: "Specifying borders and layout in CSS to delineate areas of a Web page while not specifying",
      uri: "https://www.w3.org/WAI/WCAG22/Techniques/css/C25"
    },
    C27: {
      title: "Making the DOM order match the visual order",
      uri: "https://www.w3.org/WAI/WCAG22/Techniques/css/C27"
    },
    C28: {
      title: "Specifying the size of text containers using em units",
      uri: "https://www.w3.org/WAI/WCAG22/Techniques/css/C28"
    },
    C29: {
      title: "Using a style switcher to provide a conforming alternate version",
      uri: "https://www.w3.org/WAI/WCAG22/Techniques/css/C29"
    },
    C30: {
      title: "Using CSS to replace text with images of text and providing user interface controls",
      uri: "https://www.w3.org/WAI/WCAG22/Techniques/css/C30"
    },
    C31: {
      title: "Using CSS Flexbox to reflow content",
      uri: "https://www.w3.org/WAI/WCAG22/Techniques/css/C31"
    },
    C32: {
      title: "Using media queries and grid CSS to reflow columns",
      uri: "https://www.w3.org/WAI/WCAG22/Techniques/css/C32"
    },
    C33: {
      title: "Allowing for Reflow with Long URLs and Strings of Text",
      uri: "https://www.w3.org/WAI/WCAG22/Techniques/css/C33"
    },
    C34: {
      title: "Using media queries to un-fixing sticky headers / footers",
      uri: "https://www.w3.org/WAI/WCAG22/Techniques/css/C34"
    },
    C35: {
      title: "Allowing for text spacing without wrapping",
      uri: "https://www.w3.org/WAI/WCAG22/Techniques/css/C35"
    },
    C36: {
      title: "Allowing for text spacing override",
      uri: "https://www.w3.org/WAI/WCAG22/Techniques/css/C36"
    },
    C37: {
      title: "Using CSS max-width and height to fit images",
      uri: "https://www.w3.org/WAI/WCAG22/Techniques/css/C37"
    },
    C38: {
      title: "Using CSS width, max-width and flexbox to fit labels and inputs",
      uri: "https://www.w3.org/WAI/WCAG22/Techniques/css/C38"
    },
    C39: {
      title: "Using the CSS reduce-motion query to prevent motion",
      uri: "https://www.w3.org/WAI/WCAG22/Techniques/css/C39"
    },
    C40: {
      title: "Creating a two-color focus indicator to ensure sufficient contrast with all components",
      uri: "https://www.w3.org/WAI/WCAG22/Techniques/css/C40"
    },
    C41: {
      title: "Creating a strong focus indicator within the component",
      uri: "https://www.w3.org/WAI/WCAG22/Techniques/css/C41"
    },
    C42: {
      title: "Using min-height and min-width to ensure sufficient target spacing",
      uri: "https://www.w3.org/WAI/WCAG22/Techniques/css/C42"
    },
    C43: {
      title: "Using CSS scroll-padding to un-obscure content",
      uri: "https://www.w3.org/WAI/WCAG22/Techniques/css/C43"
    },
    F1: {
      title: "Failure of Success Criterion 1.3.2 due to changing the meaning of content by positioning",
      uri: "https://www.w3.org/WAI/WCAG22/Techniques/failures/F1"
    },
    F2: {
      title: "Failure of Success Criterion 1.3.1 due to using changes in text presentation to convey",
      uri: "https://www.w3.org/WAI/WCAG22/Techniques/failures/F2"
    },
    F3: {
      title: "Failure of Success Criterion 1.1.1 due to using CSS to include images that convey",
      uri: "https://www.w3.org/WAI/WCAG22/Techniques/failures/F3"
    },
    F4: {
      title: "Failure of Success Criterion 2.2.2 due to using text-decoration:blink without a mechanism",
      uri: "https://www.w3.org/WAI/WCAG22/Techniques/failures/F4"
    },
    F7: {
      title: "Failure of Success Criterion 2.2.2 due to an object or applet for more than five seconds",
      uri: "https://www.w3.org/WAI/WCAG22/Techniques/failures/F7"
    },
    F8: {
      title: "Failure of Success Criterion 1.2.2 due to captions omitting some dialogue or important",
      uri: "https://www.w3.org/WAI/WCAG22/Techniques/failures/F8"
    },
    F9: {
      title: "Failure of Success Criterion 3.2.5 due to changing the context when the user removes",
      uri: "https://www.w3.org/WAI/WCAG22/Techniques/failures/F9"
    },
    F10: {
      title: "Failure of Success Criterion 2.1.2 and Conformance Requirement 5 due to combining",
      uri: "https://www.w3.org/WAI/WCAG22/Techniques/failures/F10"
    },
    F12: {
      title: "Failure of Success Criterion 2.2.5 due to having a session time limit without a mechanism",
      uri: "https://www.w3.org/WAI/WCAG22/Techniques/failures/F12"
    },
    F13: {
      title: "Failure of Success Criterion 1.1.1 and 1.4.1 due to having a text alternative that",
      uri: "https://www.w3.org/WAI/WCAG22/Techniques/failures/F13"
    },
    F14: {
      title: "Failure of Success Criterion 1.3.3 due to identifying content only by its shape or",
      uri: "https://www.w3.org/WAI/WCAG22/Techniques/failures/F14"
    },
    F15: {
      title: "Failure of Success Criterion 4.1.2 due to implementing custom controls that do not",
      uri: "https://www.w3.org/WAI/WCAG22/Techniques/failures/F15"
    },
    F16: {
      title: "Failure of Success Criterion 2.2.2 due to including scrolling content where movement",
      uri: "https://www.w3.org/WAI/WCAG22/Techniques/failures/F16"
    },
    F19: {
      title: "Failure of Conformance Requirement 1 due to not providing a method for the user to",
      uri: "https://www.w3.org/WAI/WCAG22/Techniques/failures/F19"
    },
    F20: {
      title: "Failure of Success Criterion 1.1.1 and 4.1.2 due to not updating text alternatives",
      uri: "https://www.w3.org/WAI/WCAG22/Techniques/failures/F20"
    },
    F22: {
      title: "Failure of Success Criterion 3.2.5 due to opening windows that are not requested by",
      uri: "https://www.w3.org/WAI/WCAG22/Techniques/failures/F22"
    },
    F23: {
      title: "Failure of 1.4.2 due to playing a sound longer than 3 seconds where              ",
      uri: "https://www.w3.org/WAI/WCAG22/Techniques/failures/F23"
    },
    F24: {
      title: "Failure of Success Criterion 1.4.3, 1.4.6 and 1.4.8 due to specifying foreground colors",
      uri: "https://www.w3.org/WAI/WCAG22/Techniques/failures/F24"
    },
    F25: {
      title: "Failure of Success Criterion 2.4.2 due to the title of a Web page not identifying",
      uri: "https://www.w3.org/WAI/WCAG22/Techniques/failures/F25"
    },
    F26: {
      title: "Failure of Success Criterion 1.3.3 due to using a graphical symbol alone to convey",
      uri: "https://www.w3.org/WAI/WCAG22/Techniques/failures/F26"
    },
    F30: {
      title: "Failure of Success Criterion 1.1.1 and 1.2.1 due to using text alternatives that are",
      uri: "https://www.w3.org/WAI/WCAG22/Techniques/failures/F30"
    },
    F31: {
      title: "Failure of Success Criterion 3.2.4 due to using two different labels for the same",
      uri: "https://www.w3.org/WAI/WCAG22/Techniques/failures/F31"
    },
    F32: {
      title: "Failure of Success Criterion 1.3.2 due to using white space characters to control",
      uri: "https://www.w3.org/WAI/WCAG22/Techniques/failures/F32"
    },
    F33: {
      title: "Failure of Success Criterion 1.3.1 and 1.3.2 due to using white space characters to",
      uri: "https://www.w3.org/WAI/WCAG22/Techniques/failures/F33"
    },
    F34: {
      title: "Failure of Success Criterion 1.3.1 and 1.3.2 due to using white space characters to",
      uri: "https://www.w3.org/WAI/WCAG22/Techniques/failures/F34"
    },
    F36: {
      title: "Failure of Success Criterion 3.2.2 due to automatically submitting a form and given",
      uri: "https://www.w3.org/WAI/WCAG22/Techniques/failures/F36"
    },
    F37: {
      title: "Failure of Success Criterion 3.2.2 due to launching a new window without prior warning",
      uri: "https://www.w3.org/WAI/WCAG22/Techniques/failures/F37"
    },
    F38: {
      title: "Failure of Success Criterion 1.1.1 due to not marking up decorative images in HTML",
      uri: "https://www.w3.org/WAI/WCAG22/Techniques/failures/F38"
    },
    F39: {
      title: "Failure of Success Criterion 1.1.1 due to providing a text alternative that is not",
      uri: "https://www.w3.org/WAI/WCAG22/Techniques/failures/F39"
    },
    F40: {
      title: "Failure due to using meta redirect with a time limit",
      uri: "https://www.w3.org/WAI/WCAG22/Techniques/failures/F40"
    },
    F41: {
      title: "Failure of Success Criterion 2.2.1, 2.2.4, and 3.2.5 due to using meta refresh to",
      uri: "https://www.w3.org/WAI/WCAG22/Techniques/failures/F41"
    },
    F42: {
      title: "Failure of Success Criteria 1.3.1, 2.1.1, 2.1.3, or 4.1.2 when emulating links",
      uri: "https://www.w3.org/WAI/WCAG22/Techniques/failures/F42"
    },
    F43: {
      title: "Failure of Success Criterion 1.3.1 due to using structural markup in a way that does",
      uri: "https://www.w3.org/WAI/WCAG22/Techniques/failures/F43"
    },
    F44: {
      title: "Failure of Success Criterion 2.4.3 due to using tabindex to create a tab order that",
      uri: "https://www.w3.org/WAI/WCAG22/Techniques/failures/F44"
    },
    F46: {
      title: "Failure of Success Criterion 1.3.1 due to using th elements, layout tables",
      uri: "https://www.w3.org/WAI/WCAG22/Techniques/failures/F46"
    },
    F47: {
      title: "Failure of Success Criterion 2.2.2 due to using the blink element",
      uri: "https://www.w3.org/WAI/WCAG22/Techniques/failures/F47"
    },
    F48: {
      title: "Failure of Success Criterion 1.3.1 due to using the pre element to markup tabular",
      uri: "https://www.w3.org/WAI/WCAG22/Techniques/failures/F48"
    },
    F49: {
      title: "Failure of Success Criterion 1.3.2 due to using an HTML layout table that does not",
      uri: "https://www.w3.org/WAI/WCAG22/Techniques/failures/F49"
    },
    F50: {
      title: "Failure of Success Criterion 2.2.2 due to a script that causes a blink effect without",
      uri: "https://www.w3.org/WAI/WCAG22/Techniques/failures/F50"
    },
    F52: {
      title: "Failure of Success Criterion 3.2.1 and 3.2.5 due to opening a new window as soon as",
      uri: "https://www.w3.org/WAI/WCAG22/Techniques/failures/F52"
    },
    F54: {
      title: "Failure of Success Criterion 2.1.1 due to using only pointing-device-specific event",
      uri: "https://www.w3.org/WAI/WCAG22/Techniques/failures/F54"
    },
    F55: {
      title: "Failure of Success Criteria 2.1.1, 2.4.7, and 3.2.1 due to using script to remove",
      uri: "https://www.w3.org/WAI/WCAG22/Techniques/failures/F55"
    },
    F58: {
      title: "Failure of Success Criterion 2.2.1 due to using server-side techniques to automatically",
      uri: "https://www.w3.org/WAI/WCAG22/Techniques/failures/F58"
    },
    F59: {
      title: "Failure of Success Criterion 4.1.2 due to using script to make div or span a user",
      uri: "https://www.w3.org/WAI/WCAG22/Techniques/failures/F59"
    },
    F60: {
      title: "Failure of Success Criterion 3.2.5 due to launching a new window when a user enters",
      uri: "https://www.w3.org/WAI/WCAG22/Techniques/failures/F60"
    },
    F61: {
      title: "Failure of Success Criterion 3.2.5 due to complete change of main content through",
      uri: "https://www.w3.org/WAI/WCAG22/Techniques/failures/F61"
    },
    F63: {
      title: "Failure of Success Criterion 2.4.4 due to providing link context only in content that",
      uri: "https://www.w3.org/WAI/WCAG22/Techniques/failures/F63"
    },
    F65: {
      title: "Failure of Success Criterion 1.1.1 due to omitting the alt attribute or text alternative",
      uri: "https://www.w3.org/WAI/WCAG22/Techniques/failures/F65"
    },
    F66: {
      title: "Failure of Success Criterion 3.2.3 due to presenting navigation links in a different",
      uri: "https://www.w3.org/WAI/WCAG22/Techniques/failures/F66"
    },
    F67: {
      title: "Failure of Success Criterion 1.1.1 and 1.2.1 due to providing long descriptions for",
      uri: "https://www.w3.org/WAI/WCAG22/Techniques/failures/F67"
    },
    F68: {
      title: "Failure of Success Criterion 4.1.2 due to a user interface control not having a programmatically",
      uri: "https://www.w3.org/WAI/WCAG22/Techniques/failures/F68"
    },
    F69: {
      title: "Failure of Success Criterion 1.4.4 when resizing visually rendered text up to 200",
      uri: "https://www.w3.org/WAI/WCAG22/Techniques/failures/F69"
    },
    F70: {
      title: "Failure of Success Criterion 4.1.1 due to incorrect use of start and end tags or attribute",
      uri: "https://www.w3.org/WAI/WCAG22/Techniques/failures/F70"
    },
    F71: {
      title: "Failure of Success Criterion 1.1.1 due to using text look-alikes to represent text",
      uri: "https://www.w3.org/WAI/WCAG22/Techniques/failures/F71"
    },
    F72: {
      title: "Failure of Success Criterion 1.1.1 due to using ASCII art without providing a text",
      uri: "https://www.w3.org/WAI/WCAG22/Techniques/failures/F72"
    },
    F73: {
      title: "Failure of Success Criterion 1.4.1 due to creating links that are not visually evident",
      uri: "https://www.w3.org/WAI/WCAG22/Techniques/failures/F73"
    },
    F74: {
      title: "Failure of Success Criterion 1.2.2 and 1.2.8 due to not labeling a synchronized media",
      uri: "https://www.w3.org/WAI/WCAG22/Techniques/failures/F74"
    },
    F75: {
      title: "Failure of Success Criterion 1.2.2 by providing synchronized media without captions",
      uri: "https://www.w3.org/WAI/WCAG22/Techniques/failures/F75"
    },
    F77: {
      title: "Failure of Success Criterion 4.1.1 due to duplicate values of type ID",
      uri: "https://www.w3.org/WAI/WCAG22/Techniques/failures/F77"
    },
    F78: {
      title: "Failure of Success Criterion 2.4.7 due to styling element outlines and borders in",
      uri: "https://www.w3.org/WAI/WCAG22/Techniques/failures/F78"
    },
    F79: {
      title: "Failure of Success Criterion 4.1.2 due to the focus state of a user interface component",
      uri: "https://www.w3.org/WAI/WCAG22/Techniques/failures/F79"
    },
    F80: {
      title: "Failure of Success Criterion 1.4.4 when text-based form controls do not resize when",
      uri: "https://www.w3.org/WAI/WCAG22/Techniques/failures/F80"
    },
    F81: {
      title: "Failure of Success Criterion 1.4.1 due to identifying required or error fields using",
      uri: "https://www.w3.org/WAI/WCAG22/Techniques/failures/F81"
    },
    F82: {
      title: "Failure of Success Criterion 3.3.2 by visually formatting a set of phone number fields",
      uri: "https://www.w3.org/WAI/WCAG22/Techniques/failures/F82"
    },
    F83: {
      title: "Failure of Success Criterion 1.4.3 and 1.4.6 due to using background images that do",
      uri: "https://www.w3.org/WAI/WCAG22/Techniques/failures/F83"
    },
    F84: {
      title: 'Failure of Success Criterion 2.4.9 due to using a non-specific link such as "click',
      uri: "https://www.w3.org/WAI/WCAG22/Techniques/failures/F84"
    },
    F85: {
      title: "Failure of Success Criterion 2.4.3 due to using dialogs or menus that are not adjacent",
      uri: "https://www.w3.org/WAI/WCAG22/Techniques/failures/F85"
    },
    F86: {
      title: "Failure of Success Criterion 4.1.2 due to not providing names for each part of a multi-part",
      uri: "https://www.w3.org/WAI/WCAG22/Techniques/failures/F86"
    },
    F87: {
      title: "Failure of Success Criterion 1.3.1 due to inserting non-decorative content by using",
      uri: "https://www.w3.org/WAI/WCAG22/Techniques/failures/F87"
    },
    F88: {
      title: "Failure of Success Criterion 1.4.8 due to using text that is justified (aligned to",
      uri: "https://www.w3.org/WAI/WCAG22/Techniques/failures/F88"
    },
    F89: {
      title: "Failure of Success Criteria 2.4.4, 2.4.9 and 4.1.2 due to not providing an accessible",
      uri: "https://www.w3.org/WAI/WCAG22/Techniques/failures/F89"
    },
    F90: {
      title: "Failure of Success Criterion 1.3.1 for incorrectly associating table headers and content",
      uri: "https://www.w3.org/WAI/WCAG22/Techniques/failures/F90"
    },
    F91: {
      title: "Failure of Success Criterion 1.3.1 for not correctly marking up table headers",
      uri: "https://www.w3.org/WAI/WCAG22/Techniques/failures/F91"
    },
    F92: {
      title: "Failure of Success Criterion 1.3.1 due to the use of role presentation on content",
      uri: "https://www.w3.org/WAI/WCAG22/Techniques/failures/F92"
    },
    F93: {
      title: "Failure of Success Criterion 1.4.2 for absence of a way to pause or stop an HTML5",
      uri: "https://www.w3.org/WAI/WCAG22/Techniques/failures/F93"
    },
    F94: {
      title: "Failure of Success Criterion 1.4.4 due to incorrect use of viewport units to resize",
      uri: "https://www.w3.org/WAI/WCAG22/Techniques/failures/F94"
    },
    F95: {
      title: "Failure of Success Criterion 1.4.13 due to content shown on hover not being hoverable",
      uri: "https://www.w3.org/WAI/WCAG22/Techniques/failures/F95"
    },
    F96: {
      title: "Failure due to the accessible name not containing the visible label text",
      uri: "https://www.w3.org/WAI/WCAG22/Techniques/failures/F96"
    },
    F97: {
      title: "Failure due to locking the orientation to landscape or portrait view",
      uri: "https://www.w3.org/WAI/WCAG22/Techniques/failures/F97"
    },
    F98: {
      title: "Failure due to interactions being limited to touch-only on touchscreen devices",
      uri: "https://www.w3.org/WAI/WCAG22/Techniques/failures/F98"
    },
    F99: {
      title: "Failure of Success Criterion 2.1.4 due to implementing character key shortcuts that",
      uri: "https://www.w3.org/WAI/WCAG22/Techniques/failures/F99"
    },
    F100: {
      title: "Failure of Success Criterion 1.3.4 due to showing a message asking to reorient device",
      uri: "https://www.w3.org/WAI/WCAG22/Techniques/failures/F100"
    },
    F101: {
      title: "Failure of Success Criterion 2.5.2 due to activating a control on the down-event",
      uri: "https://www.w3.org/WAI/WCAG22/Techniques/failures/F101"
    },
    F102: {
      title: "Failure of Success Criterion 1.4.10 due to content disappearing and not being available",
      uri: "https://www.w3.org/WAI/WCAG22/Techniques/failures/F102"
    },
    F103: {
      title: "Failure of Success Criterion 4.1.3 due to providing status messages that cannot be",
      uri: "https://www.w3.org/WAI/WCAG22/Techniques/failures/F103"
    },
    F104: {
      title: "Failure of Success Criterion 1.4.12 due to clipped or overlapped content when text",
      uri: "https://www.w3.org/WAI/WCAG22/Techniques/failures/F104"
    },
    F105: {
      title: "Failure of Success Criterion 2.5.1 due to providing functionality via a path-based",
      uri: "https://www.w3.org/WAI/WCAG22/Techniques/failures/F105"
    },
    F106: {
      title: "Failure due to inability to deactivate motion actuation",
      uri: "https://www.w3.org/WAI/WCAG22/Techniques/failures/F106"
    },
    F107: {
      title: "Failure of Success Criterion 1.3.5 due to incorrect autocomplete attribute values",
      uri: "https://www.w3.org/WAI/WCAG22/Techniques/failures/F107"
    },
    F108: {
      title: "Failure of Success Criterion 2.5.7 Dragging Movements due to not providing a single",
      uri: "https://www.w3.org/WAI/WCAG22/Techniques/failures/F108"
    },
    F109: {
      title: "Failure of Success Criterion 3.3.8 and 3.3.9 due to preventing password or code re-entry",
      uri: "https://www.w3.org/WAI/WCAG22/Techniques/failures/F109"
    },
    F110: {
      title: "Failure of Success Criterion 2.4.12 Focus Not Obscured (Minimum) due to a sticky footer",
      uri: "https://www.w3.org/WAI/WCAG22/Techniques/failures/F110"
    },
    G1: {
      title: "Adding a link at the top of each page that goes directly to the main content area",
      uri: "https://www.w3.org/WAI/WCAG22/Techniques/general/G1"
    },
    G4: {
      title: "Allowing the content to be paused and restarted from where it was paused",
      uri: "https://www.w3.org/WAI/WCAG22/Techniques/general/G4"
    },
    G5: {
      title: "Allowing users to complete an activity without any time limit",
      uri: "https://www.w3.org/WAI/WCAG22/Techniques/general/G5"
    },
    G8: {
      title: "Providing a movie with extended audio descriptions",
      uri: "https://www.w3.org/WAI/WCAG22/Techniques/general/G8"
    },
    G9: {
      title: "Creating captions for live synchronized media",
      uri: "https://www.w3.org/WAI/WCAG22/Techniques/general/G9"
    },
    G10: {
      title: "Creating components using a technology that supports the accessibility notification",
      uri: "https://www.w3.org/WAI/WCAG22/Techniques/general/G10"
    },
    G11: {
      title: "Creating content that blinks for less than 5 seconds",
      uri: "https://www.w3.org/WAI/WCAG22/Techniques/general/G11"
    },
    G13: {
      title: "Describing what will happen before a change to a form control that causes a change",
      uri: "https://www.w3.org/WAI/WCAG22/Techniques/general/G13"
    },
    G14: {
      title: "Ensuring that information conveyed by color differences is also available in text",
      uri: "https://www.w3.org/WAI/WCAG22/Techniques/general/G14"
    },
    G15: {
      title: "Using a tool to ensure that content does not violate the general flash threshold or",
      uri: "https://www.w3.org/WAI/WCAG22/Techniques/general/G15"
    },
    G17: {
      title: "Ensuring that a contrast ratio of at least 7:1 exists between text (and images of",
      uri: "https://www.w3.org/WAI/WCAG22/Techniques/general/G17"
    },
    G18: {
      title: "Ensuring that a contrast ratio of at least 4.5:1 exists between text (and images of",
      uri: "https://www.w3.org/WAI/WCAG22/Techniques/general/G18"
    },
    G19: {
      title: "Ensuring that no component of the content flashes more than three times in any 1-second",
      uri: "https://www.w3.org/WAI/WCAG22/Techniques/general/G19"
    },
    G21: {
      title: "Ensuring that users are not trapped in content",
      uri: "https://www.w3.org/WAI/WCAG22/Techniques/general/G21"
    },
    G53: {
      title: "Identifying the purpose of a link using link text combined with the text of the enclosing",
      uri: "https://www.w3.org/WAI/WCAG22/Techniques/general/G53"
    },
    G54: {
      title: "Including a sign language interpreter in the video stream",
      uri: "https://www.w3.org/WAI/WCAG22/Techniques/general/G54"
    },
    G55: {
      title: "Linking to definitions",
      uri: "https://www.w3.org/WAI/WCAG22/Techniques/general/G55"
    },
    G56: {
      title: "Mixing audio files so that non-speech sounds are at least 20 decibels lower than the",
      uri: "https://www.w3.org/WAI/WCAG22/Techniques/general/G56"
    },
    G57: {
      title: "Ordering the content in a meaningful sequence",
      uri: "https://www.w3.org/WAI/WCAG22/Techniques/general/G57"
    },
    G58: {
      title: "Placing a link to the alternative for time-based media immediately next to the non-text",
      uri: "https://www.w3.org/WAI/WCAG22/Techniques/general/G58"
    },
    G59: {
      title: "Placing the interactive elements in an order that follows sequences and relationships",
      uri: "https://www.w3.org/WAI/WCAG22/Techniques/general/G59"
    },
    G60: {
      title: "Playing a sound that turns off automatically within three seconds",
      uri: "https://www.w3.org/WAI/WCAG22/Techniques/general/G60"
    },
    G61: {
      title: "Presenting repeated components in the same relative order each time they appear",
      uri: "https://www.w3.org/WAI/WCAG22/Techniques/general/G61"
    },
    G62: {
      title: "Providing a glossary",
      uri: "https://www.w3.org/WAI/WCAG22/Techniques/general/G62"
    },
    G63: {
      title: "Providing a site map",
      uri: "https://www.w3.org/WAI/WCAG22/Techniques/general/G63"
    },
    G64: {
      title: "Providing a Table of Contents",
      uri: "https://www.w3.org/WAI/WCAG22/Techniques/general/G64"
    },
    G65: {
      title: "Providing a breadcrumb trail",
      uri: "https://www.w3.org/WAI/WCAG22/Techniques/general/G65"
    },
    G68: {
      title: "Providing a short text alternative that describes the purpose of live audio-only and",
      uri: "https://www.w3.org/WAI/WCAG22/Techniques/general/G68"
    },
    G69: {
      title: "Providing an alternative for time based media",
      uri: "https://www.w3.org/WAI/WCAG22/Techniques/general/G69"
    },
    G70: {
      title: "Providing a function to search an online dictionary",
      uri: "https://www.w3.org/WAI/WCAG22/Techniques/general/G70"
    },
    G71: {
      title: "Providing a help link on every Web page",
      uri: "https://www.w3.org/WAI/WCAG22/Techniques/general/G71"
    },
    G73: {
      title: "Providing a long description in another location with a link to it that is immediately",
      uri: "https://www.w3.org/WAI/WCAG22/Techniques/general/G73"
    },
    G74: {
      title: "Providing a long description in text near the non-text content, with a reference to",
      uri: "https://www.w3.org/WAI/WCAG22/Techniques/general/G74"
    },
    G75: {
      title: "Providing a mechanism to postpone any updating of content",
      uri: "https://www.w3.org/WAI/WCAG22/Techniques/general/G75"
    },
    G76: {
      title: "Providing a mechanism to request an update of the content instead of updating automatically",
      uri: "https://www.w3.org/WAI/WCAG22/Techniques/general/G76"
    },
    G78: {
      title: "Providing a second, user-selectable, audio track that includes audio descriptions",
      uri: "https://www.w3.org/WAI/WCAG22/Techniques/general/G78"
    },
    G79: {
      title: "Providing a spoken version of the text",
      uri: "https://www.w3.org/WAI/WCAG22/Techniques/general/G79"
    },
    G80: {
      title: "Providing a submit button to initiate a change of context",
      uri: "https://www.w3.org/WAI/WCAG22/Techniques/general/G80"
    },
    G81: {
      title: "Providing a synchronized video of the sign language interpreter that can be displayed",
      uri: "https://www.w3.org/WAI/WCAG22/Techniques/general/G81"
    },
    G82: {
      title: "Providing a text alternative that identifies the purpose of the non-text content",
      uri: "https://www.w3.org/WAI/WCAG22/Techniques/general/G82"
    },
    G83: {
      title: "Providing text descriptions to identify required fields that were not completed",
      uri: "https://www.w3.org/WAI/WCAG22/Techniques/general/G83"
    },
    G84: {
      title: "Providing a text description when the user provides information that is not in the",
      uri: "https://www.w3.org/WAI/WCAG22/Techniques/general/G84"
    },
    G85: {
      title: "Providing a text description when user input falls outside the required format or",
      uri: "https://www.w3.org/WAI/WCAG22/Techniques/general/G85"
    },
    G86: {
      title: "Providing a text summary that can be understood by people with lower secondary education",
      uri: "https://www.w3.org/WAI/WCAG22/Techniques/general/G86"
    },
    G87: {
      title: "Providing closed captions",
      uri: "https://www.w3.org/WAI/WCAG22/Techniques/general/G87"
    },
    G88: {
      title: "Providing descriptive titles for Web pages",
      uri: "https://www.w3.org/WAI/WCAG22/Techniques/general/G88"
    },
    G89: {
      title: "Providing expected data format and example",
      uri: "https://www.w3.org/WAI/WCAG22/Techniques/general/G89"
    },
    G90: {
      title: "Providing keyboard-triggered event handlers",
      uri: "https://www.w3.org/WAI/WCAG22/Techniques/general/G90"
    },
    G91: {
      title: "Providing link text that describes the purpose of a link",
      uri: "https://www.w3.org/WAI/WCAG22/Techniques/general/G91"
    },
    G92: {
      title: "Providing long description for non-text content that serves the same purpose and presents",
      uri: "https://www.w3.org/WAI/WCAG22/Techniques/general/G92"
    },
    G93: {
      title: "Providing open (always visible) captions",
      uri: "https://www.w3.org/WAI/WCAG22/Techniques/general/G93"
    },
    G94: {
      title: "Providing short text alternative for non-text content that serves the same purpose",
      uri: "https://www.w3.org/WAI/WCAG22/Techniques/general/G94"
    },
    G95: {
      title: "Providing short text alternatives that provide a brief description of the non-text",
      uri: "https://www.w3.org/WAI/WCAG22/Techniques/general/G95"
    },
    G96: {
      title: "Providing textual identification of items that otherwise rely only on sensory information",
      uri: "https://www.w3.org/WAI/WCAG22/Techniques/general/G96"
    },
    G97: {
      title: "Providing the first use of an abbreviation immediately before or after the expanded",
      uri: "https://www.w3.org/WAI/WCAG22/Techniques/general/G97"
    },
    G98: {
      title: "Providing the ability for the user to review and correct answers before submitting",
      uri: "https://www.w3.org/WAI/WCAG22/Techniques/general/G98"
    },
    G99: {
      title: "Providing the ability to recover deleted information",
      uri: "https://www.w3.org/WAI/WCAG22/Techniques/general/G99"
    },
    G100: {
      title: "Providing a short text alternative which is the accepted name or a descriptive name",
      uri: "https://www.w3.org/WAI/WCAG22/Techniques/general/G100"
    },
    G101: {
      title: "Providing the definition of a word or phrase used in an unusual or restricted way",
      uri: "https://www.w3.org/WAI/WCAG22/Techniques/general/G101"
    },
    G102: {
      title: "Providing the expansion or explanation of an abbreviation",
      uri: "https://www.w3.org/WAI/WCAG22/Techniques/general/G102"
    },
    G103: {
      title: "Providing visual illustrations, pictures, and symbols to help explain ideas, events,",
      uri: "https://www.w3.org/WAI/WCAG22/Techniques/general/G103"
    },
    G105: {
      title: "Saving data so that it can be used after a user re-authenticates",
      uri: "https://www.w3.org/WAI/WCAG22/Techniques/general/G105"
    },
    G107: {
      title: 'Using "activate" rather than "focus" as a trigger for changes of context',
      uri: "https://www.w3.org/WAI/WCAG22/Techniques/general/G107"
    },
    G108: {
      title: "Using markup features to expose the name and role, allow user-settable properties",
      uri: "https://www.w3.org/WAI/WCAG22/Techniques/general/G108"
    },
    G110: {
      title: "Using an instant client-side redirect",
      uri: "https://www.w3.org/WAI/WCAG22/Techniques/general/G110"
    },
    G111: {
      title: "Using color and pattern",
      uri: "https://www.w3.org/WAI/WCAG22/Techniques/general/G111"
    },
    G112: {
      title: "Using inline definitions",
      uri: "https://www.w3.org/WAI/WCAG22/Techniques/general/G112"
    },
    G115: {
      title: "Using semantic elements to mark up structure",
      uri: "https://www.w3.org/WAI/WCAG22/Techniques/general/G115"
    },
    G117: {
      title: "Using text to convey information that is conveyed by variations in presentation of",
      uri: "https://www.w3.org/WAI/WCAG22/Techniques/general/G117"
    },
    G120: {
      title: "Providing the pronunciation immediately following the word",
      uri: "https://www.w3.org/WAI/WCAG22/Techniques/general/G120"
    },
    G121: {
      title: "Linking to pronunciations",
      uri: "https://www.w3.org/WAI/WCAG22/Techniques/general/G121"
    },
    G123: {
      title: "Adding a link at the beginning of a block of repeated content to go to the end of",
      uri: "https://www.w3.org/WAI/WCAG22/Techniques/general/G123"
    },
    G124: {
      title: "Adding links at the top of the page to each area of the content",
      uri: "https://www.w3.org/WAI/WCAG22/Techniques/general/G124"
    },
    G125: {
      title: "Providing links to navigate to related Web pages",
      uri: "https://www.w3.org/WAI/WCAG22/Techniques/general/G125"
    },
    G126: {
      title: "Providing a list of links to all other Web pages",
      uri: "https://www.w3.org/WAI/WCAG22/Techniques/general/G126"
    },
    G127: {
      title: "Identifying a Web page's relationship to a larger collection of Web pages",
      uri: "https://www.w3.org/WAI/WCAG22/Techniques/general/G127"
    },
    G128: {
      title: "Indicating current location within navigation bars",
      uri: "https://www.w3.org/WAI/WCAG22/Techniques/general/G128"
    },
    G130: {
      title: "Providing descriptive headings",
      uri: "https://www.w3.org/WAI/WCAG22/Techniques/general/G130"
    },
    G131: {
      title: "Providing descriptive labels",
      uri: "https://www.w3.org/WAI/WCAG22/Techniques/general/G131"
    },
    G133: {
      title: "Providing a checkbox on the first page of a multipart form that allows users to ask",
      uri: "https://www.w3.org/WAI/WCAG22/Techniques/general/G133"
    },
    G134: {
      title: "Validating Web pages",
      uri: "https://www.w3.org/WAI/WCAG22/Techniques/general/G134"
    },
    G135: {
      title: "Using the accessibility API features of a technology to expose names and notification",
      uri: "https://www.w3.org/WAI/WCAG22/Techniques/general/G135"
    },
    G136: {
      title: "Providing a link at the beginning of a nonconforming Web page that points to a conforming",
      uri: "https://www.w3.org/WAI/WCAG22/Techniques/general/G136"
    },
    G138: {
      title: "Using semantic markup whenever color cues are used",
      uri: "https://www.w3.org/WAI/WCAG22/Techniques/general/G138"
    },
    G139: {
      title: "Creating a mechanism that allows users to jump to errors",
      uri: "https://www.w3.org/WAI/WCAG22/Techniques/general/G139"
    },
    G140: {
      title: "Separating information and structure from presentation to enable different presentations",
      uri: "https://www.w3.org/WAI/WCAG22/Techniques/general/G140"
    },
    G141: {
      title: "Organizing a page using headings",
      uri: "https://www.w3.org/WAI/WCAG22/Techniques/general/G141"
    },
    G142: {
      title: "Using a technology that has commonly-available user agents that support zoom",
      uri: "https://www.w3.org/WAI/WCAG22/Techniques/general/G142"
    },
    G143: {
      title: "Providing a text alternative that describes the purpose of the CAPTCHA",
      uri: "https://www.w3.org/WAI/WCAG22/Techniques/general/G143"
    },
    G144: {
      title: "Ensuring that the Web Page contains another CAPTCHA serving the same purpose using",
      uri: "https://www.w3.org/WAI/WCAG22/Techniques/general/G144"
    },
    G145: {
      title: "Ensuring that a contrast ratio of at least 3:1 exists between text (and images of",
      uri: "https://www.w3.org/WAI/WCAG22/Techniques/general/G145"
    },
    G146: {
      title: "Using liquid layout",
      uri: "https://www.w3.org/WAI/WCAG22/Techniques/general/G146"
    },
    G148: {
      title: "Not specifying background color, not specifying text color, and not using technology",
      uri: "https://www.w3.org/WAI/WCAG22/Techniques/general/G148"
    },
    G149: {
      title: "Using user interface components that are highlighted by the user agent when they receive",
      uri: "https://www.w3.org/WAI/WCAG22/Techniques/general/G149"
    },
    G150: {
      title: "Providing text based alternatives for live audio-only content",
      uri: "https://www.w3.org/WAI/WCAG22/Techniques/general/G150"
    },
    G151: {
      title: "Providing a link to a text transcript of a prepared statement or script if the script",
      uri: "https://www.w3.org/WAI/WCAG22/Techniques/general/G151"
    },
    G152: {
      title: "Setting animated gif images to stop blinking after n cycles (within 5 seconds)",
      uri: "https://www.w3.org/WAI/WCAG22/Techniques/general/G152"
    },
    G153: {
      title: "Making the text easier to read",
      uri: "https://www.w3.org/WAI/WCAG22/Techniques/general/G153"
    },
    G155: {
      title: "Providing a checkbox in addition to a submit button",
      uri: "https://www.w3.org/WAI/WCAG22/Techniques/general/G155"
    },
    G156: {
      title: "Using a technology that has commonly-available user agents that can change the foreground",
      uri: "https://www.w3.org/WAI/WCAG22/Techniques/general/G156"
    },
    G157: {
      title: "Incorporating a live audio captioning service into a Web page",
      uri: "https://www.w3.org/WAI/WCAG22/Techniques/general/G157"
    },
    G158: {
      title: "Providing an alternative for time-based media for audio-only content",
      uri: "https://www.w3.org/WAI/WCAG22/Techniques/general/G158"
    },
    G159: {
      title: "Providing an alternative for time-based media for video-only content",
      uri: "https://www.w3.org/WAI/WCAG22/Techniques/general/G159"
    },
    G160: {
      title: "Providing sign language versions of information, ideas, and processes that must be",
      uri: "https://www.w3.org/WAI/WCAG22/Techniques/general/G160"
    },
    G161: {
      title: "Providing a search function to help users find content",
      uri: "https://www.w3.org/WAI/WCAG22/Techniques/general/G161"
    },
    G162: {
      title: "Positioning labels to maximize predictability of relationships",
      uri: "https://www.w3.org/WAI/WCAG22/Techniques/general/G162"
    },
    G163: {
      title: "Using standard diacritical marks that can be turned off",
      uri: "https://www.w3.org/WAI/WCAG22/Techniques/general/G163"
    },
    G164: {
      title: "Providing a stated time within which an online request (or transaction) may be amended",
      uri: "https://www.w3.org/WAI/WCAG22/Techniques/general/G164"
    },
    G165: {
      title: "Using the default focus indicator for the platform so that high visibility default",
      uri: "https://www.w3.org/WAI/WCAG22/Techniques/general/G165"
    },
    G166: {
      title: "Providing audio that describes the important video content and describing it as such",
      uri: "https://www.w3.org/WAI/WCAG22/Techniques/general/G166"
    },
    G167: {
      title: "Using an adjacent button to label the purpose of a field",
      uri: "https://www.w3.org/WAI/WCAG22/Techniques/general/G167"
    },
    G168: {
      title: "Requesting confirmation to continue with selected action",
      uri: "https://www.w3.org/WAI/WCAG22/Techniques/general/G168"
    },
    G169: {
      title: "Aligning text on only one side",
      uri: "https://www.w3.org/WAI/WCAG22/Techniques/general/G169"
    },
    G170: {
      title: "Providing a control near the beginning of the Web page that turns off sounds that",
      uri: "https://www.w3.org/WAI/WCAG22/Techniques/general/G170"
    },
    G171: {
      title: "Playing sounds only on user request",
      uri: "https://www.w3.org/WAI/WCAG22/Techniques/general/G171"
    },
    G172: {
      title: "Providing a mechanism to remove full justification of text",
      uri: "https://www.w3.org/WAI/WCAG22/Techniques/general/G172"
    },
    G173: {
      title: "Providing a version of a movie with audio descriptions",
      uri: "https://www.w3.org/WAI/WCAG22/Techniques/general/G173"
    },
    G174: {
      title: "Providing a control with a sufficient contrast ratio that allows users to switch to",
      uri: "https://www.w3.org/WAI/WCAG22/Techniques/general/G174"
    },
    G175: {
      title: "Providing a multi color selection tool on the page for foreground and background colors",
      uri: "https://www.w3.org/WAI/WCAG22/Techniques/general/G175"
    },
    G176: {
      title: "Keeping the flashing area small enough",
      uri: "https://www.w3.org/WAI/WCAG22/Techniques/general/G176"
    },
    G177: {
      title: "Providing suggested correction text",
      uri: "https://www.w3.org/WAI/WCAG22/Techniques/general/G177"
    },
    G178: {
      title: "Providing controls on the Web page that allow users to incrementally change the size",
      uri: "https://www.w3.org/WAI/WCAG22/Techniques/general/G178"
    },
    G179: {
      title: "Ensuring that there is no loss of content or functionality when the text resizes and",
      uri: "https://www.w3.org/WAI/WCAG22/Techniques/general/G179"
    },
    G180: {
      title: "Providing the user with a means to set the time limit to 10 times the default time",
      uri: "https://www.w3.org/WAI/WCAG22/Techniques/general/G180"
    },
    G181: {
      title: "Encoding user data as hidden or encrypted data in a re-authorization page",
      uri: "https://www.w3.org/WAI/WCAG22/Techniques/general/G181"
    },
    G182: {
      title: "Ensuring that additional visual cues are available when text color differences are",
      uri: "https://www.w3.org/WAI/WCAG22/Techniques/general/G182"
    },
    G183: {
      title: "Using a contrast ratio of 3:1 with surrounding text and providing additional visual",
      uri: "https://www.w3.org/WAI/WCAG22/Techniques/general/G183"
    },
    G184: {
      title: "Providing text instructions at the beginning of a form or set of fields that describes",
      uri: "https://www.w3.org/WAI/WCAG22/Techniques/general/G184"
    },
    G185: {
      title: "Linking to all of the pages on the site from the home page",
      uri: "https://www.w3.org/WAI/WCAG22/Techniques/general/G185"
    },
    G186: {
      title: "Using a control in the Web page that stops moving, blinking, or auto-updating content",
      uri: "https://www.w3.org/WAI/WCAG22/Techniques/general/G186"
    },
    G187: {
      title: "Using a technology to include blinking content that can be turned off via the user",
      uri: "https://www.w3.org/WAI/WCAG22/Techniques/general/G187"
    },
    G188: {
      title: "Providing a button on the page to increase line spaces and paragraph spaces",
      uri: "https://www.w3.org/WAI/WCAG22/Techniques/general/G188"
    },
    G189: {
      title: "Providing a control near the beginning of the Web page that changes the link text",
      uri: "https://www.w3.org/WAI/WCAG22/Techniques/general/G189"
    },
    G190: {
      title: "Providing a link adjacent to or associated with a non-conforming object that links",
      uri: "https://www.w3.org/WAI/WCAG22/Techniques/general/G190"
    },
    G191: {
      title: "Providing a link, button, or other mechanism that reloads the page without any blinking",
      uri: "https://www.w3.org/WAI/WCAG22/Techniques/general/G191"
    },
    G192: {
      title: "Fully conforming to specifications",
      uri: "https://www.w3.org/WAI/WCAG22/Techniques/general/G192"
    },
    G193: {
      title: "Providing help by an assistant in the Web page",
      uri: "https://www.w3.org/WAI/WCAG22/Techniques/general/G193"
    },
    G194: {
      title: "Providing spell checking and suggestions for text input",
      uri: "https://www.w3.org/WAI/WCAG22/Techniques/general/G194"
    },
    G195: {
      title: "Using an author-supplied, visible focus indicator",
      uri: "https://www.w3.org/WAI/WCAG22/Techniques/general/G195"
    },
    G196: {
      title: "Using a text alternative on one item within a group of images that describes all items",
      uri: "https://www.w3.org/WAI/WCAG22/Techniques/general/G196"
    },
    G197: {
      title: "Using labels, names, and text alternatives consistently for content that has the same",
      uri: "https://www.w3.org/WAI/WCAG22/Techniques/general/G197"
    },
    G198: {
      title: "Providing a way for the user to turn the time limit off",
      uri: "https://www.w3.org/WAI/WCAG22/Techniques/general/G198"
    },
    G199: {
      title: "Providing success feedback when data is submitted successfully",
      uri: "https://www.w3.org/WAI/WCAG22/Techniques/general/G199"
    },
    G200: {
      title: "Opening new windows and tabs from a link only when necessary",
      uri: "https://www.w3.org/WAI/WCAG22/Techniques/general/G200"
    },
    G201: {
      title: "Giving users advanced warning when opening a new window",
      uri: "https://www.w3.org/WAI/WCAG22/Techniques/general/G201"
    },
    G202: {
      title: "Ensuring keyboard control for all functionality",
      uri: "https://www.w3.org/WAI/WCAG22/Techniques/general/G202"
    },
    G203: {
      title: "Using a static text alternative to describe a talking head video",
      uri: "https://www.w3.org/WAI/WCAG22/Techniques/general/G203"
    },
    G204: {
      title: "Not interfering with the user agent's reflow of text as the viewing window is narrowed",
      uri: "https://www.w3.org/WAI/WCAG22/Techniques/general/G204"
    },
    G205: {
      title: "Including a text cue for colored form control labels",
      uri: "https://www.w3.org/WAI/WCAG22/Techniques/general/G205"
    },
    G206: {
      title: "Providing options within the content to switch to a layout that does not require the",
      uri: "https://www.w3.org/WAI/WCAG22/Techniques/general/G206"
    },
    G207: {
      title: "Ensuring that a contrast ratio of 3:1 is provided for icons",
      uri: "https://www.w3.org/WAI/WCAG22/Techniques/general/G207"
    },
    G208: {
      title: "Including the text of the visible label as part of the accessible name",
      uri: "https://www.w3.org/WAI/WCAG22/Techniques/general/G208"
    },
    G209: {
      title: "Provide sufficient contrast at the boundaries between adjoining colors",
      uri: "https://www.w3.org/WAI/WCAG22/Techniques/general/G209"
    },
    G210: {
      title: "Ensuring that drag-and-drop actions can be cancelled",
      uri: "https://www.w3.org/WAI/WCAG22/Techniques/general/G210"
    },
    G211: {
      title: "Matching the accessible name to the visible label",
      uri: "https://www.w3.org/WAI/WCAG22/Techniques/general/G211"
    },
    G212: {
      title: "Using native controls to ensure functionality is triggered on the up-event.",
      uri: "https://www.w3.org/WAI/WCAG22/Techniques/general/G212"
    },
    G213: {
      title: "Provide conventional controls and an application setting for motion activated input",
      uri: "https://www.w3.org/WAI/WCAG22/Techniques/general/G213"
    },
    G214: {
      title: "Using a control to allow access to content in different orientations which is otherwise",
      uri: "https://www.w3.org/WAI/WCAG22/Techniques/general/G214"
    },
    G215: {
      title: "Providing controls to achieve the same result as path based or multipoint gestures",
      uri: "https://www.w3.org/WAI/WCAG22/Techniques/general/G215"
    },
    G216: {
      title: "Providing single point activation for a control slider",
      uri: "https://www.w3.org/WAI/WCAG22/Techniques/general/G216"
    },
    G217: {
      title: "Providing a mechanism to allow users to remap or turn off character key shortcuts",
      uri: "https://www.w3.org/WAI/WCAG22/Techniques/general/G217"
    },
    G218: {
      title: "Email link authentication",
      uri: "https://www.w3.org/WAI/WCAG22/Techniques/general/G218"
    },
    G219: {
      title: "Ensuring that an alternative is available for dragging movements that operate on content",
      uri: "https://www.w3.org/WAI/WCAG22/Techniques/general/G219"
    },
    G220: {
      title: "Provide a contact-us link in a consistent location",
      uri: "https://www.w3.org/WAI/WCAG22/Techniques/general/G220"
    },
    G221: {
      title: "Provide data from a previous step in a process",
      uri: "https://www.w3.org/WAI/WCAG22/Techniques/general/G221"
    },
    G223: {
      title: "Using an author-supplied, highly visible focus indicator",
      uri: "https://www.w3.org/WAI/WCAG22/Techniques/general/G223"
    },
    H2: {
      title: "Combining adjacent image and text links for the same resource",
      uri: "https://www.w3.org/WAI/WCAG22/Techniques/html/H2"
    },
    H24: {
      title: "Providing text alternatives for the area elements of image maps",
      uri: "https://www.w3.org/WAI/WCAG22/Techniques/html/H24"
    },
    H25: {
      title: "Providing a title using the title element",
      uri: "https://www.w3.org/WAI/WCAG22/Techniques/html/H25"
    },
    H28: {
      title: "Providing definitions for abbreviations by using the abbr element",
      uri: "https://www.w3.org/WAI/WCAG22/Techniques/html/H28"
    },
    H30: {
      title: "Providing link text that describes the purpose of a link for anchor elements",
      uri: "https://www.w3.org/WAI/WCAG22/Techniques/html/H30"
    },
    H32: {
      title: "Providing submit buttons",
      uri: "https://www.w3.org/WAI/WCAG22/Techniques/html/H32"
    },
    H33: {
      title: "Supplementing link text with the title attribute",
      uri: "https://www.w3.org/WAI/WCAG22/Techniques/html/H33"
    },
    H34: {
      title: "Using a Unicode right-to-left mark (RLM) or left-to-right mark (LRM) to mix text direction",
      uri: "https://www.w3.org/WAI/WCAG22/Techniques/html/H34"
    },
    H36: {
      title: "Using alt attributes on images used as submit buttons",
      uri: "https://www.w3.org/WAI/WCAG22/Techniques/html/H36"
    },
    H37: {
      title: "Using alt attributes on img elements",
      uri: "https://www.w3.org/WAI/WCAG22/Techniques/html/H37"
    },
    H39: {
      title: "Using caption elements to associate data table captions with data tables",
      uri: "https://www.w3.org/WAI/WCAG22/Techniques/html/H39"
    },
    H40: {
      title: "Using description lists",
      uri: "https://www.w3.org/WAI/WCAG22/Techniques/html/H40"
    },
    H42: {
      title: "Using h1-h6 to identify headings",
      uri: "https://www.w3.org/WAI/WCAG22/Techniques/html/H42"
    },
    H43: {
      title: "Using id and headers attributes to associate data cells with header cells in data",
      uri: "https://www.w3.org/WAI/WCAG22/Techniques/html/H43"
    },
    H44: {
      title: "Using label elements to associate text labels with form controls",
      uri: "https://www.w3.org/WAI/WCAG22/Techniques/html/H44"
    },
    H48: {
      title: "Using ol, ul and dl for lists or groups of links",
      uri: "https://www.w3.org/WAI/WCAG22/Techniques/html/H48"
    },
    H49: {
      title: "Using semantic markup to mark emphasized or special text",
      uri: "https://www.w3.org/WAI/WCAG22/Techniques/html/H49"
    },
    H51: {
      title: "Using table markup to present tabular information",
      uri: "https://www.w3.org/WAI/WCAG22/Techniques/html/H51"
    },
    H53: {
      title: "Using the body of the object element",
      uri: "https://www.w3.org/WAI/WCAG22/Techniques/html/H53"
    },
    H54: {
      title: "Using the dfn element to identify the defining instance of a word",
      uri: "https://www.w3.org/WAI/WCAG22/Techniques/html/H54"
    },
    H56: {
      title: "Using the dir attribute on an inline element to resolve problems with nested directional",
      uri: "https://www.w3.org/WAI/WCAG22/Techniques/html/H56"
    },
    H57: {
      title: "Using the language attribute on the HTML element",
      uri: "https://www.w3.org/WAI/WCAG22/Techniques/html/H57"
    },
    H58: {
      title: "Using language attributes to identify changes in the human language",
      uri: "https://www.w3.org/WAI/WCAG22/Techniques/html/H58"
    },
    H59: {
      title: "Using the link element and navigation tools",
      uri: "https://www.w3.org/WAI/WCAG22/Techniques/html/H59"
    },
    H62: {
      title: "Using the ruby element",
      uri: "https://www.w3.org/WAI/WCAG22/Techniques/html/H62"
    },
    H63: {
      title: "Using the scope attribute to associate header cells and data cells in data tables",
      uri: "https://www.w3.org/WAI/WCAG22/Techniques/html/H63"
    },
    H64: {
      title: "Using the title attribute of the iframe element",
      uri: "https://www.w3.org/WAI/WCAG22/Techniques/html/H64"
    },
    H65: {
      title: "Using the title attribute to identify form controls when the label element cannot",
      uri: "https://www.w3.org/WAI/WCAG22/Techniques/html/H65"
    },
    H67: {
      title: "Using null alt text and no title attribute on img elements for images that assistive",
      uri: "https://www.w3.org/WAI/WCAG22/Techniques/html/H67"
    },
    H69: {
      title: "Providing heading elements at the beginning of each section of content",
      uri: "https://www.w3.org/WAI/WCAG22/Techniques/html/H69"
    },
    H70: {
      title: "Using frame elements to group blocks of repeated material",
      uri: "https://www.w3.org/WAI/WCAG22/Techniques/html/H70"
    },
    H71: {
      title: "Providing a description for groups of form controls using fieldset and legend elements",
      uri: "https://www.w3.org/WAI/WCAG22/Techniques/html/H71"
    },
    H74: {
      title: "Ensuring that opening and closing tags are used according to specification",
      uri: "https://www.w3.org/WAI/WCAG22/Techniques/html/H74"
    },
    H75: {
      title: "Ensuring that Web pages are well-formed",
      uri: "https://www.w3.org/WAI/WCAG22/Techniques/html/H75"
    },
    H76: {
      title: "Using meta refresh to create an instant client-side redirect",
      uri: "https://www.w3.org/WAI/WCAG22/Techniques/html/H76"
    },
    H77: {
      title: "Identifying the purpose of a link using link text combined with its enclosing list",
      uri: "https://www.w3.org/WAI/WCAG22/Techniques/html/H77"
    },
    H78: {
      title: "Identifying the purpose of a link using link text combined with its enclosing paragraph",
      uri: "https://www.w3.org/WAI/WCAG22/Techniques/html/H78"
    },
    H79: {
      title: "Identifying the purpose of a link in a data table using the link text combined with",
      uri: "https://www.w3.org/WAI/WCAG22/Techniques/html/H79"
    },
    H80: {
      title: "Identifying the purpose of a link using link text combined with the preceding heading",
      uri: "https://www.w3.org/WAI/WCAG22/Techniques/html/H80"
    },
    H81: {
      title: "Identifying the purpose of a link in a nested list using link text combined with the",
      uri: "https://www.w3.org/WAI/WCAG22/Techniques/html/H81"
    },
    H83: {
      title: "Using the target attribute to open a new window on user request and indicating this",
      uri: "https://www.w3.org/WAI/WCAG22/Techniques/html/H83"
    },
    H84: {
      title: "Using a button with a select element to perform an action",
      uri: "https://www.w3.org/WAI/WCAG22/Techniques/html/H84"
    },
    H85: {
      title: "Using optgroup to group option elements inside a select",
      uri: "https://www.w3.org/WAI/WCAG22/Techniques/html/H85"
    },
    H86: {
      title: "Providing text alternatives for emojis, emoticons, ASCII art, and leetspeak",
      uri: "https://www.w3.org/WAI/WCAG22/Techniques/html/H86"
    },
    H88: {
      title: "Using HTML according to spec",
      uri: "https://www.w3.org/WAI/WCAG22/Techniques/html/H88"
    },
    H89: {
      title: "Using the title attribute to provide context-sensitive help",
      uri: "https://www.w3.org/WAI/WCAG22/Techniques/html/H89"
    },
    H90: {
      title: "Indicating required form controls using label or legend",
      uri: "https://www.w3.org/WAI/WCAG22/Techniques/html/H90"
    },
    H91: {
      title: "Using HTML form controls and links",
      uri: "https://www.w3.org/WAI/WCAG22/Techniques/html/H91"
    },
    H93: {
      title: "Ensuring that id attributes are unique on a Web page",
      uri: "https://www.w3.org/WAI/WCAG22/Techniques/html/H93"
    },
    H94: {
      title: "Ensuring that elements do not contain duplicate attributes",
      uri: "https://www.w3.org/WAI/WCAG22/Techniques/html/H94"
    },
    H95: {
      title: "Using the track element to provide captions",
      uri: "https://www.w3.org/WAI/WCAG22/Techniques/html/H95"
    },
    H96: {
      title: "Using the track element to provide audio descriptions",
      uri: "https://www.w3.org/WAI/WCAG22/Techniques/html/H96"
    },
    H97: {
      title: "Grouping related links using the nav element",
      uri: "https://www.w3.org/WAI/WCAG22/Techniques/html/H97"
    },
    H98: {
      title: "Using HTML 5.2 autocomplete attributes",
      uri: "https://www.w3.org/WAI/WCAG22/Techniques/html/H98"
    },
    H99: {
      title: "Provide a page-selection mechanism",
      uri: "https://www.w3.org/WAI/WCAG22/Techniques/html/H99"
    },
    H100: {
      title: "Providing properly marked up email and password inputs",
      uri: "https://www.w3.org/WAI/WCAG22/Techniques/html/H100"
    },
    H101: {
      title: "Using semantic HTML elements to identify regions of a page",
      uri: "https://www.w3.org/WAI/WCAG22/Techniques/html/H101"
    },
    PDF1: {
      title: "Applying text alternatives to images with the Alt entry in PDF documents",
      uri: "https://www.w3.org/WAI/WCAG22/Techniques/pdf/PDF1"
    },
    PDF2: {
      title: "Creating bookmarks in PDF documents",
      uri: "https://www.w3.org/WAI/WCAG22/Techniques/pdf/PDF2"
    },
    PDF3: {
      title: "Ensuring correct tab and reading order in PDF documents",
      uri: "https://www.w3.org/WAI/WCAG22/Techniques/pdf/PDF3"
    },
    PDF4: {
      title: "Hiding decorative images with the Artifact tag in PDF documents",
      uri: "https://www.w3.org/WAI/WCAG22/Techniques/pdf/PDF4"
    },
    PDF5: {
      title: "Indicating required form controls in PDF forms",
      uri: "https://www.w3.org/WAI/WCAG22/Techniques/pdf/PDF5"
    },
    PDF6: {
      title: "Using table elements for table markup in PDF Documents",
      uri: "https://www.w3.org/WAI/WCAG22/Techniques/pdf/PDF6"
    },
    PDF7: {
      title: "Performing OCR on a scanned PDF document to provide actual text",
      uri: "https://www.w3.org/WAI/WCAG22/Techniques/pdf/PDF7"
    },
    PDF8: {
      title: "Providing definitions for abbreviations via an E entry for a structure element",
      uri: "https://www.w3.org/WAI/WCAG22/Techniques/pdf/PDF8"
    },
    PDF9: {
      title: "Providing headings by marking content with heading tags in PDF documents",
      uri: "https://www.w3.org/WAI/WCAG22/Techniques/pdf/PDF9"
    },
    PDF10: {
      title: "Providing labels for interactive form controls in PDF documents",
      uri: "https://www.w3.org/WAI/WCAG22/Techniques/pdf/PDF10"
    },
    PDF11: {
      title: "Providing links and link text using the Link annotation and the /Link structure element",
      uri: "https://www.w3.org/WAI/WCAG22/Techniques/pdf/PDF11"
    },
    PDF12: {
      title: "Providing name, role, value information for form fields in PDF documents",
      uri: "https://www.w3.org/WAI/WCAG22/Techniques/pdf/PDF12"
    },
    PDF13: {
      title: "Providing replacement text using the /Alt entry for links in PDF documents",
      uri: "https://www.w3.org/WAI/WCAG22/Techniques/pdf/PDF13"
    },
    PDF14: {
      title: "Providing running headers and footers in PDF documents",
      uri: "https://www.w3.org/WAI/WCAG22/Techniques/pdf/PDF14"
    },
    PDF15: {
      title: "Providing submit buttons with the submit-form action in PDF forms",
      uri: "https://www.w3.org/WAI/WCAG22/Techniques/pdf/PDF15"
    },
    PDF16: {
      title: "Setting the default language using the /Lang entry in the document catalog of a PDF",
      uri: "https://www.w3.org/WAI/WCAG22/Techniques/pdf/PDF16"
    },
    PDF17: {
      title: "Specifying consistent page numbering for PDF documents",
      uri: "https://www.w3.org/WAI/WCAG22/Techniques/pdf/PDF17"
    },
    PDF18: {
      title: "Specifying the document title using the Title entry in the document information dictionary",
      uri: "https://www.w3.org/WAI/WCAG22/Techniques/pdf/PDF18"
    },
    PDF19: {
      title: "Specifying the language for a passage or phrase with the Lang entry in PDF documents",
      uri: "https://www.w3.org/WAI/WCAG22/Techniques/pdf/PDF19"
    },
    PDF20: {
      title: "Using Adobe Acrobat Pro's Table Editor to repair mistagged tables",
      uri: "https://www.w3.org/WAI/WCAG22/Techniques/pdf/PDF20"
    },
    PDF21: {
      title: "Using List tags for lists in PDF documents",
      uri: "https://www.w3.org/WAI/WCAG22/Techniques/pdf/PDF21"
    },
    PDF22: {
      title: "Indicating when user input falls outside the required format or values in PDF forms",
      uri: "https://www.w3.org/WAI/WCAG22/Techniques/pdf/PDF22"
    },
    PDF23: {
      title: "Providing interactive form controls in PDF documents",
      uri: "https://www.w3.org/WAI/WCAG22/Techniques/pdf/PDF23"
    },
    SVR1: {
      title: "Implementing automatic redirects on the server side instead of on the	client side",
      uri: "https://www.w3.org/WAI/WCAG22/Techniques/server-side-script/SVR1"
    },
    SVR2: {
      title: "Using .htaccess to ensure that the only way to access non-conforming content is from",
      uri: "https://www.w3.org/WAI/WCAG22/Techniques/server-side-script/SVR2"
    },
    SVR3: {
      title: "Using HTTP referer to ensure that the only way to access non-conforming content is",
      uri: "https://www.w3.org/WAI/WCAG22/Techniques/server-side-script/SVR3"
    },
    SVR4: {
      title: "Allowing users to provide preferences for the display of conforming alternate versions",
      uri: "https://www.w3.org/WAI/WCAG22/Techniques/server-side-script/SVR4"
    },
    SVR5: {
      title: "Specifying the default language in the HTTP header",
      uri: "https://www.w3.org/WAI/WCAG22/Techniques/server-side-script/SVR5"
    },
    SM1: {
      title: "Adding extended audio description in SMIL 1.0",
      uri: "https://www.w3.org/WAI/WCAG22/Techniques/smil/SM1"
    },
    SM2: {
      title: "Adding extended audio description in SMIL 2.0",
      uri: "https://www.w3.org/WAI/WCAG22/Techniques/smil/SM2"
    },
    SM6: {
      title: "Providing audio description in SMIL 1.0",
      uri: "https://www.w3.org/WAI/WCAG22/Techniques/smil/SM6"
    },
    SM7: {
      title: "Providing audio description in SMIL 2.0",
      uri: "https://www.w3.org/WAI/WCAG22/Techniques/smil/SM7"
    },
    SM11: {
      title: "Providing captions through synchronized text streams in SMIL 1.0",
      uri: "https://www.w3.org/WAI/WCAG22/Techniques/smil/SM11"
    },
    SM12: {
      title: "Providing captions through synchronized text streams in SMIL 2.0",
      uri: "https://www.w3.org/WAI/WCAG22/Techniques/smil/SM12"
    },
    SM13: {
      title: "Providing sign language interpretation through synchronized video streams in SMIL",
      uri: "https://www.w3.org/WAI/WCAG22/Techniques/smil/SM13"
    },
    SM14: {
      title: "Providing sign language interpretation through synchronized video streams in SMIL",
      uri: "https://www.w3.org/WAI/WCAG22/Techniques/smil/SM14"
    },
    T1: {
      title: "Using standard text formatting conventions for paragraphs",
      uri: "https://www.w3.org/WAI/WCAG22/Techniques/text/T1"
    },
    T2: {
      title: "Using standard text formatting conventions for lists",
      uri: "https://www.w3.org/WAI/WCAG22/Techniques/text/T2"
    },
    T3: {
      title: "Using standard text formatting conventions for headings",
      uri: "https://www.w3.org/WAI/WCAG22/Techniques/text/T3"
    }
  };

  // node_modules/@siteimprove/alfa-wcag/dist/technique.js
  var Technique = class _Technique extends Requirement {
    static of(name) {
      return new _Technique(name, Techniques[name].uri);
    }
    _name;
    _title;
    constructor(name, uri) {
      super("technique", uri);
      this._name = name;
      this._title = Techniques[name].title;
    }
    /**
     * The name of this technique.
     */
    get name() {
      return this._name;
    }
    /**
     * The title of this technique.
     */
    get title() {
      return this._title;
    }
    toJSON() {
      return {
        ...super.toJSON(),
        name: this._name,
        title: this._title
      };
    }
    toEARL() {
      return {
        ...super.toEARL(),
        "@context": {
          earl: "http://www.w3.org/ns/earl#",
          dct: "http://purl.org/dc/terms/"
        },
        "dct:title": this._title,
        "dct:isPartOf": "https://www.w3.org/WAI/WCAG21/Techniques/"
      };
    }
  };
  (function(Technique2) {
    function isName(value) {
      return value in Techniques;
    }
    Technique2.isName = isName;
    function isTechnique(value) {
      return value instanceof Technique2;
    }
    Technique2.isTechnique = isTechnique;
  })(Technique || (Technique = {}));

  // assets/kayle.js
  function formatCode(code) {
    const extractNumbers = (string) => string.match(/([0-9]+_)*[0-9]/)[0].replaceAll("_", ".");
    let [criterion, technique] = code.split(".").slice(3);
    criterion = extractNumbers(criterion);
    const criterionName = Criterion.of(criterion).uri ?? criterion;
    const techniqueName = Technique.of(technique).uri ?? technique;
    return `WCAG Criterion: ${criterionName}` + (techniqueName ? `, Technique: ${techniqueName}` : "");
  }
  async function startAudit() {
    const excludedRules = new Set(arguments[0]["excluded_rules"]);
    const { wcagLevels, includedRules } = arguments[0]["included_rules"].reduce(
      (intermediateValue, currentRule) => {
        if (["wcag_a", "wcag_aa", "wcag_aaa"].includes(currentRule))
          intermediateValue.wcagLevels.push(currentRule);
        else intermediateValue.includedRules.add(currentRule);
        return intermediateValue;
      },
      { wcagLevels: [], includedRules: /* @__PURE__ */ new Set() }
    );
    let sniffs = /* @__PURE__ */ new Set();
    if (wcagLevels.includes("wcag_aaa"))
      sniffs = sniffs.union(new Set(HTMLCS_WCAG2AAA.sniffs));
    else if (wcagLevels.includes("wcag_aa"))
      sniffs = sniffs.union(new Set(HTMLCS_WCAG2AA.sniffs[0].include));
    else if (wcagLevels.includes("wcag_a"))
      sniffs = sniffs.union(new Set(HTMLCS_WCAG2A.sniffs[0].include));
    sniffs = sniffs.union(includedRules).difference(excludedRules);
    HTMLCS.messages = [];
    sniffs.forEach((sniff) => HTMLCS.registerSniff("WCAG2AAA", sniff));
    const promise = new Promise((resolve2, reject) => {
      HTMLCS.run(() => {
        resolve2(HTMLCS.messages);
      }, window.document);
    });
    const messages = await promise;
    const result = messages.reduce(
      (intermediateResult, assertion) => {
        const type = assertion["type"];
        if (type !== "error" && type !== "warning") return intermediateResult;
        const code = assertion["code"];
        const message = assertion["message"];
        const element = assertion["element"];
        let elementName = "";
        if (element instanceof HTMLDocument) elementName = "/";
        else {
          elementName = element.outerHTML;
          if (elementName.length > 130)
            elementName = elementName.substring(0, elementName.indexOf(">") + 1);
        }
        const key = type + code;
        if (key in intermediateResult[type]) {
          intermediateResult[type][key]["occurences"].push(elementName);
          intermediateResult[type][key]["elements"].push(element);
        } else {
          intermediateResult[type][key] = {
            url: formatCode(code),
            info: message,
            // add something about the recurrence value
            outcome: type === "error" ? "earl:failed" : "earl:cantTell",
            // remove leading . and suffix
            ruleId: code.replace(/\.[^\.]*$/, "").substring(1),
            occurences: [elementName],
            elements: [element]
          };
        }
        return intermediateResult;
      },
      { error: {}, warning: {} }
    );
    return {
      errors: Object.values(result.error),
      warnings: Object.values(result.warning)
    };
  }
  window.kayle = {
    startAudit
  };
})();
