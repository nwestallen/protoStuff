const convertBIG = (arr) =>
  arr
    .map((byte) => BigInt(byte & 0x7f))
    .reduce((accum, curr, ind) => accum + curr * 128n ** BigInt(ind));

const convert32 = (arr) =>
  arr
    .map((byte) => byte & 0x7f)
    .reduce((accum, curr, ind) => accum + curr * 128 ** ind);

const parseBIG = (arr) => {
  let ind = 0;
  const curr = [arr[0]];
  while (curr[ind] >> 7) {
    curr.push(arr[ind + 1]);
    ind += 1;
  }
  return convertBIG(curr);
};

const parse32 = (arr) => {
  let ind = 0;
  const curr = [arr[0]];
  while (curr[ind] >> 7) {
    curr.push(arr[ind + 1]);
    ind += 1;
  }
  if (curr[4] > 7) {
    return -(~convert32(curr) + 1);
  } else {
    return convert32(curr);
  }
};

module.exports = { parseBIG, parse32 };
