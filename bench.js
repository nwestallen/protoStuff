const Benchmark = require('benchmark')
const { parseBIG, parse32 } = require("./protobuffParse")

const suite = new Benchmark.Suite('Perf Test')
const countUp = new Uint8Array([0xc0, 0xc4, 0x07, 0x96, 0x01]);

suite
    .add('parseBIG', () => parseBIG(countUp))
    .add('parse32', () => parse32(countUp))
    .on('cycle', event => console.log(String(event.target)))
    .on('complete', event => {
    const suite = event.currentTarget;
    const fastestOption = suite.filter('fastest').map('name')
    console.log(`The fastest option is ${fastestOption}`) })
    .run();