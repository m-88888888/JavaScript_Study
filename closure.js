class Hoge {
  constructor(hoge) {
    this.hoge = hoge;
  }

  getHoge() {
    return this.hoge;
  }
}

class Fuga extends Hoge {
  // 省略　
}

let fuga = new Fuga('hoge');
console.log(fuga.getHoge());
