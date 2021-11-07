function example(str) {
  return new Promise((resolve, reject) => {
    if (str === "success") {
      setTimeout(() => {
        console.log("sucess");
        resolve("example sucess data");
      }, 3000);
    } else {
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
