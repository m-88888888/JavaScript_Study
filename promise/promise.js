const asynFunction = (data, callback) => {
  setTimeout(() => callback(data * 2), Math.random() * 1000)
}

const callFunction = () => {
  asynFunction(100, (value) => console.log(value))
}

// callFunction()

const callFunctionHell = () => {
  asynFunction(100, (value) => { 
      console.log(value)
      asynFunction(value, (value) => {
        console.log(value)
        asynFunction(value, (value) => {
          console.log(value)
        })
      })
    }
  )
}

// callFunctionHell()

// 関数の呼び出し順序が制御できない
const callTiming = () => {
  asynFunction(100, (value) => {
    console.log(value)
  })
  asynFunction(200, (value) => {
    console.log(value)
  })
  asynFunction(400, (value) => {
    console.log(value)
  })
}

callTiming()
