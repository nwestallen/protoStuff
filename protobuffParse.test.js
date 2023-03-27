const { parseBIG, parse32 } = require("./protobuffParse");

const oneFifty = new Uint8Array([0x96, 0x01]);
const oneFifties = new Uint8Array([0x96, 0x01, 0x96, 0x01]);
const negOneFifty = new Uint8Array([0xea, 0xfe, 0xff, 0xff, 0x0f]);
const countUp = new Uint8Array([0xc0, 0xc4, 0x07, 0x96, 0x01]);
const countDown = new Uint8Array([0xb1, 0xd1, 0xf9, 0xd6, 0x03]);
const maxUnsigned = new Uint8Array([0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0x01,]);
const negOneSigned = new Uint8Array([0xff, 0xff, 0xff, 0xff, 0x0f]);
const maxPosSigned = new Uint8Array([0xff, 0xff, 0xff, 0xff, 0x07]);
const maxNegSigned = new Uint8Array([0x80, 0x80, 0x80, 0x80, 0x08]);

describe("parseBIG", () => {
  it("parses 150", () => {
    expect(parseBIG(oneFifty)).toEqual(150n);
  });
  it("parses 150 when there are more items", () => {
    expect(parseBIG(oneFifties)).toEqual(150n);
  })
  it("parses -150 as positive int", () => {
    expect(parseBIG(negOneFifty)).toEqual(4294967146n);
  })
  it("parses 12345", () => {
    expect(parseBIG(countUp)).toEqual(123456n);
  });
  it("parses 2^63 - 1", () => {
    expect(parseBIG(maxUnsigned)).toEqual(18446744073709551615n);
  });
  it("parses 987654321", () => {
    expect(parseBIG(countDown)).toEqual(987654321n);
  });
});

describe("parse32", () => {
  it("parses 150", () => {
    expect(parse32(oneFifty)).toEqual(150);
  });
  it("parses 150 when there are more items", () => {
    expect(parse32(oneFifties)).toEqual(150);
  })
  it("parses -150", () => {
    expect(parse32(negOneFifty)).toEqual(-150);
  })
  it("parses 12345", () => {
    expect(parse32(countUp)).toEqual(123456);
  });
  it("parses -1", () => {
    expect(parse32(negOneSigned)).toEqual(-1);
  });
  it("parses -2^31", () => {
    expect(parse32(maxNegSigned)).toEqual(-2147483648);
  });
  it("parses 2^31 - 1", () => {
    expect(parse32(maxPosSigned)).toEqual(2147483647);
  });
});
