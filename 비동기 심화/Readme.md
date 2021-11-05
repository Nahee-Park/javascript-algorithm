# 비동기 심화

async/await만 사용하다 보니까 막상 promise에 대해서 제대로 이해하지 못하고 있는 것 같아 좀 더 본격적으로 js의 비동기 처리 방식들에 대해 뜯어 보았다.

## Promise가 도대체 뭐야

### Promise

> - JS에서 비동기 처리를 할 때 이용하는 객체
> - 비동기 처리 로직이 처리 전인지, 완료 되었는지, 실패했는지 여부에 따라 상태가 결정됨
> - 비동기적인 방식을 사용하기 위해서는 비동기적으로 호출할 함수의 리턴값이 promise여야 한다

1. Promise객체를 정의하면 그 내부의 로직은 아직 불리기 전이므로 pending상태임
2. 해당 Promise 객체를 리턴하는 함수를 await이나 then()을 통해 불러오면 그 결과에 따라 resolve/reject 상태가 나뉨

- 기본적으로 생성한 promise는 지금 당장이 아니라 추후 얘를 비동기적으로 불러왔을 때 로직이 실행된다
- reslove(value)로 넘긴 value는 비동기 처리 성공시 value값을 리턴한다는 의미
- reject(err)로 넘긴 err는 비동기 처리 실패시 err값을 리턴한다는 의미

```javascript
let promise = new Promise((resolve, reject) => {
  //resolve와 reject 둘 중 하나는 무조건 호출해야 함
  // resolve(value) 일이 성공적으로 끝나면 value와 함께 호출
  // reject(error) 에러 발생시 에러 객체를 나타내는 error와 함께 호출
});
```

### 예시

```javascript
function example(str) {
  return new Promise((resolve, reject) => {
    // 인자값이 succese일 땐 reslove로 정의한 값을 리턴함
    if (str === "success") {
      setTimeout(() => {
        console.log("sucess");
        resolve("example sucess data");
      }, 3000);
    } else {
      // 그 외의 경우에는 failed로 정의한 값을 리턴함
      reject(new Error("failed"));
    }
  });
}
// 체이닝 방식으로 생성한 prmise를 비동기적으로 호출
example("success")
  .then((data) => {
    console.log("after sucess");
    console.log(data);
  })
  .catch((err) => {
    console.log(err);
  });

// async/await 방식으로 생성한 prmise를 비동기적으로 호출
async function excuteFunction() {
  try {
    const data = await example("success");
    console.log("after sucess");
    console.log(data);
  } catch (err) {
    console.log(err);
  }
}

excuteFunction();
```

> - resolve()를 setTimeout 함수의 콜백함수 내에 넣었기 때문에 setTimeout함수가 적용된 이후에 resoleve()값이 리턴됨
> - 만약 resolve()와 reject()의 수행 조건을 분기처리 해주지 않았으면 resolve()뒤의 reject()는 실행되지 않는다.

## 연습 문제

### 1. 이런 경우 무엇이 출력될까

```javascript
let promise = new Promise(function (resolve, reject) {
  resolve(1);

  setTimeout(() => resolve(2), 1000);
});

promise.then(alert);
```

- 1이 출력 된다. 첫번째 reject/resolve 호출만 고려 대상이다

### 2. 5초 뒤 3을 리턴하는 함수 만들기

```javascript
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
```

## 정리

> promise에서 resolve()의 위치가 어디에 있느냐에 따라 특정 시간이 지나고 나서야 다음 작업이 시작되도록 할 수도 있고,(setTimeout함수에 resolve 넣는 경우) resolve를 일단 보내놓고(setTimeout함수 외부에 resolve 넣는 경우) 그 다음 작업이 진행되는 동시에 이전 작업도 진행되도록 제어할 수 도 있다
