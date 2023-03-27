const Benchmark = require('benchmark')
const { parseBIG, parse32, parseBIGWhile, parse32While } = require("./protobuffParse")

const suite12345 = new Benchmark.Suite('Basic Test')
const countUp = new Uint8Array([0xc0, 0xc4, 0x07, 0x96, 0x01]);

suite12345
    
    .add('parseBIG', () => parseBIG(countUp))
    .add('parse32', () => parse32(countUp))
    .add('paresBIGWhile', () => parseBIGWhile(countUp))
    .add('parse32While', () => parse32While(countUp))
    .on('start', event => console.log('---------12345 Test Suite------------\n'))
    .on('cycle', event => console.log(String(event.target)))
    .on('complete', event => {
    const suite = event.currentTarget;
    const fastestOption = suite.filter('fastest').map('name')
    console.log(`\nThe fastest option is ${fastestOption}\n`) })
    .run();

const suiteMaxNeg = new Benchmark.Suite('Max Negative Test')
const maxNegSigned = new Uint8Array([0x80, 0x80, 0x80, 0x80, 0x08]);

suiteMaxNeg
  .add("parseBIG", () => parseBIG(maxNegSigned))
  .add("parse32", () => parse32(maxNegSigned))
  .add("paresBIGWhile", () => parseBIGWhile(maxNegSigned))
  .add("parse32While", () => parse32While(maxNegSigned))
  .on("start", (event) => console.log("---------Max Negative Test Suite------------\n"))
  .on("cycle", (event) => console.log(String(event.target)))
  .on("complete", (event) => {
    const suite = event.currentTarget;
    const fastestOption = suite.filter("fastest").map("name");
    console.log(`\nThe fastest option is ${fastestOption}\n`);
  })
  .run();

  const suiteString = new Benchmark.Suite();

  // add tests
  suiteString
    .add("RegExp#test", function () {
      /o/.test("Hello World!");
    })
    .add("String#indexOf", function () {
      "Hello World!".indexOf("o") > -1;
    })
    .add("String#match", function () {
      !!"Hello World!".match(/o/);
    })
    // add listeners
    .on("cycle", function (event) {
      console.log(String(event.target));
    })
    .on("complete", function () {
      console.log("\nFastest is " + this.filter("fastest").map("name"));
    })
    // run async
    .run({ async: true });

    const suiteNumbers = new Benchmark.Suite();
    const normalNum = 1992
    const bigNum = BigInt(1992)

    suiteNumbers
      .add("Normal Num", () => normalNum ** 2)
      .add("Big Num", () => bigNum ** 2n)
      .on("start", () => console.log("-----------Numbers Test--------------"))
      .on("cycle", (event) => console.log(String(event.target)))
      .on("complete", (event) => {
        const suite = event.currentTarget;
        const fastestOption = suite.filter("fastest").map("name");
        console.log(`\nThe fastest option is ${fastestOption}\n`);
      })
      .run();