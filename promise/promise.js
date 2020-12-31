const asyncFunction = (data, callback) => {
  setTimeout(() => callback(data * 2), Math.random() * 1000)
}

const callFunction = () => {
  asyncFunction(100, (value) => console.log(value))
}

// callFunction()

const callFunctionHell = () => {
  asyncFunction(100, (value) => { 
      console.log(value)
      asyncFunction(value, (value) => {
        console.log(value)
        asyncFunction(value, (value) => {
          console.log(value)
        })
      })
    }
  )
}

// callFunctionHell()

// 関数の呼び出し順序が制御できない
const callTiming = () => {
  asyncFunction(100, (value) => {
    console.log(value)
  })
  asyncFunction(200, (value) => {
    console.log(value)
  })
  asyncFunction(400, (value) => {
    console.log(value)
  })
}

// callTiming()

const asyncPromiseFunction = (data) => {
  return new Promise((callback) => {
    setTimeout(() => callback(data * 2), Math.random() * 1000)
  })
}

const promiseFunction = () => {
  asyncPromiseFunction(100)
    .then((value) => {
      console.log(value) 
      return asyncPromiseFunction(value)
    })
    .then((value) => {
      console.log(value)
      return asyncPromiseFunction(value)
    })
    .then((value) => {
      console.log(value)
    })
}

// promiseFunction()

const asyncPromiseErrorFunction = (data) => {
  return new Promise((okCallback, ngCallback) => {
    setTimeout(() => {
      Math.random() < 0.30
      ? ngCallback(new Error('ERROR!'))
      : okCallback(data * 2)
      , Math.random() * 1000
    })
  })
}

const rejectPromise = () => {
  asyncPromiseErrorFunction(100)
  // then()の第一引数に成功時の処理
  // 第二引数に失敗時の処理
  .then(
    (data) => console.log(data), // 成功時の処理
    (e) => console.log(e) //失敗時の処理
  )
}

rejectPromise()

