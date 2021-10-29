const antFunction = (N, foods) => {
  // d 초기화
  d = new Array(100).fill(0);
  d[0] = foods[0];

  // 최대값 d[1]에 저장
  d[1] = Math.max(food[0], food[1]);

  //각 항 지나갈 때마다 최대값 리프레쉬해서 dp에 저장해둠
  for (let i = 2; i <= foods.length; i++) {
    d[i] = Math.max(d[i - 1], d[i - 2] + foods[i]);
  }

  return d[N - 1];
};

console.log(antFunction(4, [1, 3, 1, 5])); // 8
