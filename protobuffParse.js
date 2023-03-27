const convertBIG = (arr) =>
  arr
    .map((byte) => BigInt(byte & 0x7f))
    .reduce((accum, curr, ind) => accum + curr * 128n ** BigInt(ind));

const parseBIG = (arr) => {
  const recur = (curr, ind) => {
    if (!(curr[ind] >> 7)) {
      return convertBIG(curr);
    } else {
      curr.push(arr[ind + 1]);
      return recur(curr, ind + 1);
    }
  };
  return recur([arr[0]], 0);
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
  if (result[4] > 7) {
    return -(~convert32(result) + 1);
  } else {
    return convert32(result);
  }
};

const parseBIGWhile = (arr) => {
  let ind = 0;
  const curr = [arr[0]];
  while (curr[ind] >> 7) {
    curr.push(arr[ind + 1]);
    ind += 1;
  }
  return convertBIG(curr);
};

const parse32While = (arr) => {
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

module.exports = { parseBIG, parse32, parseBIGWhile, parse32While };
