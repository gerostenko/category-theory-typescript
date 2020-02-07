
class Optional<T> { 
    _isValid: Boolean;
    _value?: T;

    constructor(v?: T) { 
        if (v) {
            this._isValid = true;
            this._value = v;
        } else { 
            this._isValid = false;
        }
    }

    isValid() {
        return this._isValid;
    }

    value() { 
        return this._value;
    }
}

function safe_root(x: number): Optional<number> { 
    if (x >= 0) return new Optional<number>(Math.sqrt(x));
    return new Optional<number>();
}

//Assertion

console.log(safe_root(-10).isValid());
console.log(safe_root(10).isValid());

// 1. Construct the Kleisli category for partial functions (define composition
// and identity).

//1.1 Composition
function compose<A, B, C>(m1: (arg: A) => Optional<B>, m2: (arg: B) => Optional<C>)
    : (arg: A) => Optional<C> { 
    return function (x: A): Optional<C>  { 
        const p1 = m1(x);
        return m2(p1.value() as B);
    }
}

//Assertion

function createOptionalFromArray(arr: Array<String>): Optional<Array<String>> { 
    return new Optional<Array<String>>(arr);
}

function filterCategory(arr: Array<String>): Optional<String> { 
    return new Optional<String>(arr.find((item: String) => item === "Category"));
}

console.log(compose(createOptionalFromArray, filterCategory)(["Category", "Theory"]));

//1.2 Identity

function identity<T>(val?: T): Optional<T> { 
    return new Optional<T>(val);
}

//Assertion

console.log(identity());
console.log(identity("Test"));

//2. Implement the embellished function safe_reciprocal that returns
//a valid reciprocal of its argument, if it’s different from zero.

function safe_reciprocal(x: number): Optional<number> {
    if (x === 0) return new Optional<number>();
    return new Optional<number>(1/x);
}

console.log(safe_reciprocal(0));
console.log(safe_reciprocal(10));

//3. Compose the functions safe_root and safe_reciprocal to
//implement safe_root_reciprocal that calculates sqrt(1/x)
//whenever possible.

const safe_root_reciprocal = compose(safe_reciprocal, safe_root);

//assertion

console.log(safe_root_reciprocal(0).isValid());
console.log(safe_root_reciprocal(-10).isValid());
console.log(safe_root_reciprocal(9).value());
