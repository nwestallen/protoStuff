const Benchmark = require("benchmark");
const { parseBIG, parse32 } = require("./protobuffParse");

const suite12345 = new Benchmark.Suite("Basic Test");
const countUp = new Uint8Array([0xc0, 0xc4, 0x07, 0x96, 0x01]);

suite12345

  .add("parseBIG", () => parseBIG(countUp))
  .add("parse32", () => parse32(countUp))
  .on("start", (event) =>
    console.log("---------12345 Test Suite------------\n")
  )
  .on("cycle", (event) => console.log(String(event.target)))
  .on("complete", (event) => {
    const suite = event.currentTarget;
    const fastestOption = suite.filter("fastest").map("name");
    console.log(`\nThe fastest option is ${fastestOption}\n`);
  })
  .run();

const suiteMaxNeg = new Benchmark.Suite("Max Negative Test");
const maxNegSigned = new Uint8Array([0x80, 0x80, 0x80, 0x80, 0x08]);

suiteMaxNeg
  .add("parseBIG", () => parseBIG(maxNegSigned))
  .add("parse32", () => parse32(maxNegSigned))
  .on("start", (event) =>
    console.log("---------Max Negative Test Suite------------\n")
  )
  .on("cycle", (event) => console.log(String(event.target)))
  .on("complete", (event) => {
    const suite = event.currentTarget;
    const fastestOption = suite.filter("fastest").map("name");
    console.log(`\nThe fastest option is ${fastestOption}\n`);
  })
  .run();

const suiteString = new Benchmark.Suite();

const suiteNumbers = new Benchmark.Suite();
const normalNum = 1992;
const bigNum = BigInt(1992);

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

const suiteNegative = new Benchmark.Suite();

suiteNegative
  .add("Bitwise", () => ~150)
  .add("Based", () => 2 ** 32 - 150)
  .add("Subtraction", () => 4294967146 - 150)
  .on("start", () => console.log("-------------Negative Test-----------------"))
  .on("cycle", (event) => console.log(String(event.target)))
  .on("complete", (event) => {
    const suite = event.currentTarget;
    const fastestOption = suite.filter("fastest").map("name");
    console.log(`\nThe fastest option is ${fastestOption}\n`);
  })
  .run();
