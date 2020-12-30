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

callFunctionHell()
