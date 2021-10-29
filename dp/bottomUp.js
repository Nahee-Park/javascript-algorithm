d = new Array(100).fill(0);

// 첫번째, 두번째 피보나치 수는 무조건 1
d[1] = 1;
d[2] = 1;
n = 99;

// 피보나치 함수 반복문 돌면서 구현
for (let i = 2; i <= n; i++) {
  d[i] = d[i - 1] + d[i - 2];
}

console.log(d[n]);
