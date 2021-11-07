//delay시키는 함수
function delay(ms) {
  // 여기서 만약 resolve()를 setTimeout함수의 밖으로 빼내면 setTimeout함수를 기다리지 않고 resolve가 리턴되므로 3이 바로 리턴됨
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, ms);
  });
}

async function getThree() {
  // delay함수가 실행되길 기다렸다가 3을 리턴함.
  await delay(5000);
  return 3;
}

async function printThree() {
  const a = await getThree();
  console.log(a);
}

printThree();
