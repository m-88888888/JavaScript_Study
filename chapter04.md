# 関数

## 定義方法

### 1.function
一番ベーシックなやり方
```javascript
function hoge() {
  // 任意の処理
  return hogehoge;
}
```
### 2.Functionコンストラクター経由
Functionオブジェクトを使った定義方法
あえてこの方法を採るメリットはないから、このようなやり方があるとだけ覚えておけば良さそう。
```javascript
var hoge = new Function(引数,... ,'return hogehoge;');
```
### 3.関数リテラル表現（無名関数）
JavaScriptでは関数はデータ型の一種だから、関数自体を変数に代入したり、関数の引数にしたり、戻り値として関数を返したりすることができる。
```javascript
// 三角形の面積を計算する
var getTriangle = fuction(base, height) {
  return base * height / 2;
};

console.log(getTriangle(5, 2)); // 結果：５
```
### 4.アロー関数
無名関数をよりシンプルに記述することができる。
`function`を省略した書き方。
```javascript
let getTriangle = (base, height) => {
  return base * height / 2;
};

console.log(getTriangle(5, 2)); // 結果：５
```
さらにシンプルに記述することも可能
```javascript
// １文の場合はブロックやreturn命令を省略可能
let getTriangle = (base, height) => base * height / 2;

// 引数が１つなら引数をくくる（）も省略可能
let getCircle = radius => radius * radius * Math.PI;

// 引数がない場合は（）必要
let show = () => console.log('Hello, World!');
```

## 関数宣言

```javascript
console.log(hoge); // 1

function hoge() { // 2
  return 'hoge';
}
```

上記のコードで、1で呼び出した関数は未定義のためエラーとなりそう
だけどJavaScriptの関数は`コード解析時に関数を登録する`ためエラーとはならない！

ただし、下記のような無名関数の場合は実行時に評価されるためエラーとなる。

```javascript
console.log(hoge);

var hoge = function() {
  return hoge;
}
```

## スコープ

### 変数宣言にvarを使うべき理由

JavaScriptではvarを使わずに変数を宣言することができるから下記のようなケースが発生する
```javascript
var scope = 'globalhoge';

function getHoge() {
  scope = 'localhoge';
  return scope;
}

console.log(getHoge()); // localhoge・・・１
console.log(scope); // localhoge・・・２
```
2の結果がglobalhogeではなくlocalhogeなのは、グローバル変数scopeをgetHoge()内で上書きしてしまっているから。

このようなケースを回避するために、変数はvarやlet,constを使って宣言するべき。

### 変数の巻き上げ（hoisting)

```javascript
var scope = 'globalhoge';

function getHoge() {
  console.log(scope); // 結果：？？？・・・３
  var scope = 'localhoge';
  return scope;
}

console.log(getHoge()); // localhoge・・・１
console.log(scope); // globalhoge・・・２
```

３の結果は一見するとグローバル変数scopeの値globalhogeが出力されそうだが、実際には`undefined`が出力されてしまう。
JavaScriptにおけるローカル変数は`関数全体で有効`だから、３の時点でscopeはローカル変数scopeを出力しようとしている。
しかし実際にはまだ未定義だからundefiedとなる。
このような挙動のことを`変数の巻き上げ(hoisting)`と呼ぶ。

undefinedを防ぐために、JavaScriptにおいては`ローカル変数の宣言は関数の先頭で宣言する`ことが求められる。

### ブロックスコープ

ES2015以前ではブロックスコープはない。
```javascript
// JavaScriptにおけるif文はブロックに該当しない。スコープの影響はブロック単位ではなく関数単位
if(true) {
  var i = 5;
}

console.log(i); // 5
```
しかし`即時関数`を使うことで擬似的にブロックスコープを実現することはできる。
```javascript
(function() {
  var i = 5;
  console.log(i); // 5
}).call(this);

console.log(i); // 変数iがスコープ外だからエラー
```
即時関数とは
>関数によってスコープが決まるならば、関数を（処理のかたまりとしてではなく）スコープの枠組みとして利用してしまおう、という考えでスコープの枠組みを無名関数として定義し、これをcallメソッドを使ってその場で呼び出す

ES2015以降には`let`があり、ブロックスコープに対応している。
```javascript
if(true) {
  let i = 5;
}

console.log(i); // エラー
```

## 引数の記法

### ES2015以前
- 引数の数をチェックしない
- 可変長引数の要素を利用するために`arguments`オブジェクト使用しなければならない

```javascript
function sum() {
  var result = 0;

  for (var i = 0; i < arguments.length; i++) {
    var tmp = arguments[i];
    if (typeof tmp !== 'number') {
      throw new Error('引数が数値ではありません:' + tmp);
    }
    result += tmp;
  }
  return result;
}

try {
  console.log(sum(1,3,5,7,9)); // 結果：２５
} catch(e) {
  window.alert(e.message);
}
```

### ES2015以降
- 引数の数をチェックしない
- `...`を付与すれば可変長引数となる

```javascript
function sum(...nums) {
  var result = 0;

  for (let num of nums) {
    if (typeof num !== 'number') {
      throw new Error('引数が数値ではありません:' + num);
    }
    result += tmp;
  }
  return result;
}

try {
  console.log(sum(1,3,5,7,9)); // 結果：２５
} catch(e) {
  window.alert(e.message);
}
```

## 高階関数

関数はデータ型の一種だから、関数そのものを引数として渡したり、戻り値として扱ったりすることができる。
このような関数のことを`高階関数`と呼ぶ。
>関数に渡す引数のことではなく、関数自体を引数・戻り値として扱う関数のことを指す。
以下の例の場合だと`arrayWalk`が高階関数

例
```javascript
function arrayWalk(data, f) {
  for (var key in data) {
    f(data[key], key);
  }
}

function showElement(value, key) {
  console.log(key + ':' + value);
}

var ary = [1,2,4,8,16];
arrayWalk(ary, showElement);
```

`コールバック関数`
>関数の中で呼び出される関数のこと。
上記の例だとarrayWalk内で呼び出される関数`f`がコールバック関数。

上記の例のように、コールバック関数として使用している関数`showElement`は基本的に使い捨てであることが多いので、無名関数を利用して下記のように書き換えることができる。

こちらの方がスマートだし、一つの文に処理が収まっているからわかりやすい！

```javascript
function arrayWalk(data, f) {
  for (var key in data) {
    f(data[key], key);
  }
}

var ary = [1,2,4,8,16];
arrayWalk(
  ary,
  function(value, key) {
    console.log(key + ':' + value);
  }
);
```

## クロージャ
参考.pp219
>クロージャとは、一言で言うならば、「ローカル変数を参照している関数内関数」のこと。

下記のような場合、①の無名関数がクロージャに該当する。
```javascript
function closure(init) {
  var counter = init;

  return function() { // ・・・①
    return ++counter;
  }
}

var myClosure = closure(1);
console.log(myClosure()); // 2
console.log(myClosure()); // 3
console.log(myClosure()); // 4
```

returnの無名関数①は、ローカル変数counterを保持している関数。
関数closure自体の呼び出しは終了しても、匿名関数①がローカル変数counterを参照し続けているから匿名関数①内にはcounterが存在したままになる。
つまりクロージャとは`一種の記憶域を提供するしくみ`といえる。

### 使いみち
クロージャというものがどんなものかはなんとなく理解できた。
では、どんな場面でこのクロージャを使うと良いのか？

1. グローバル変数を節減させる
2. 計算量（オーダ）を増やさず、グローバル変数を節減できる

参考
https://artgear.hatenablog.com/entry/20120115/1326635158