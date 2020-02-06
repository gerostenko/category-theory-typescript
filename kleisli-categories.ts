
type Writer<T> = [T, String];

function toUpper(str: String): Writer<String> { 
    const result = str.toLocaleUpperCase();
    return [result, `toUpper: ${result}, `]
}

function toWords(str: String): Writer<Array<String>> {
    const result = str.split(" ");
    return [result, `toWords: ${result} `];
}

function process(str: String): Writer<Array<String>> { 
    const p1 = toUpper(str);
    const p2 = toWords(p1[0]);

    return [p2[0], p1[1].concat(p2[1] as string)];
}

console.log(process("I love functional programming and strong typing"));

function isEven(n: number): [Boolean, String] { 
    const result = n % 2 === 0;
    return [result, `isEeven: ${result} `]
}

function negate(b: Boolean): [Boolean, String] { 
    return [!b, "Not so! "];
}

function compose<A, B, C>(m1: (arg: A) => Writer<B>, m2: (arg: B) => Writer<C>)
    : (arg: A) => Writer<C> { 
    return function (x: A): Writer<C>  { 
        const p1 = m1(x);
        const p2 = m2(p1[0]);
        return [p2[0], p1[1].concat(p2[1] as string)];
    }
}

function processToUpperAndToWords(str: String): Writer<Array<String>> { 
    return compose(toUpper, toWords)(str);
}

function processIsOdd(n: number): Writer<Boolean> {
    return compose(isEven, negate)(n);
}

console.log(processToUpperAndToWords("I love functional programming and strong typing"));
console.log(processIsOdd(4));
