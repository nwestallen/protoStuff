const convertBIG = (arr) =>
  arr
    .map((byte) => byte & 0x7f)
    .reduce((accum, curr, ind) => BigInt(accum) + BigInt(curr) * 128n ** BigInt(ind));

const parseBIG = (arr) => {
  const recur = (curr, ind) => {
    if (!(curr[ind] >> 7)) {
      return convertBIG(curr);
    } else {
      curr[ind + 1] = arr[ind + 1];
      return recur(curr, ind + 1);
    }
  };
  return recur(new Uint8Array([arr[0], 0, 0, 0, 0, 0, 0, 0, 0, 0]), 0);
};

const convert32 = (arr) =>
  arr
    .map((byte) => byte & 0x7f)
    .reduce((accum, curr, ind) => accum + curr * 128 ** ind);

const parse32 = (arr) => {
  const recur = (curr, ind) => {
    if (!(curr[ind] >> 7)) {
      return curr;
    } else {
      curr.push(arr[ind + 1]);
      return recur(curr, ind + 1);
    }
  };
  const result = recur([arr[0]], 0);
  if (result.slice(-1) > 7) {
    return - (~convert32(result)+1);
  } else {
    return convert32(result);
  }
};

module.exports = {parseBIG, parse32}