function asyncProcess(value) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (value) {
        resolve(`入力値： ${value}`);
      } else {
        reject("入力は空です");
      }
    }, 500);
  });
}

Promise.all([
  asyncProcess("トクジロウ"),
  asyncProcess("任三郎"),
  asyncProcess("rinrin"),
]).then(
  (response) => {
    console.log(response);
  },
  (error) => {
    console.log(`エラー： ${error}`);
  }
);
