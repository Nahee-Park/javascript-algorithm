d = new Array(100).fill(0);

const fibo = (x) => {
  // 종료조건 -> 1 또는 2일 때 1을 반환
  if (x === 1 || x === 2) {
    return 1;
  }
  //  이미 계산한 적 있다면 그대로 반환
  if (d[x] !== 0) {
    return d[x];
  }
  //   계산한 적 없다면 점화식에 따라서 피보나치 수열 결과를 반환
  d[x] = fibo(x - 1) + fibo(x - 2);
  return d[x];
};

console.log(fibo(99));
