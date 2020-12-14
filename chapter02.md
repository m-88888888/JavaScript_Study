## <script>要素を記述する場所
以下の３パターンがある。

1. <body>要素の配下（任意の位置）
2. <body>要素の配下（</body>閉じタグの直前）
3. <head>要素の配下

使い分け
1.を使うケースはほとんどない。
2.のやり方を基本として、2.のやり方でまかないきれない場合のみ3.を利用する。

## 2.5 制御構文

配列や連想配列から要素を取り出す、Javaでいうところの拡張for文が二種類ある。

### for...in
```javascript
var ary = [ 100, 200, 300 ];
for (var key in ary) {
  console.log(ary[key]);
}
// 100
// 200
// 300
```

仮引数keyには配列aryのインデックス番号を格納するだけ。要素そのものを格納するわけではない。
だからサンプルのような配列の列挙に`ary[key]`という取り出し方になってしまって少し面倒
従来の`for文`や次の`for...of`を使うべき。
`for...in`では`連想配列（いわゆるハッシュ、マップ）の操作`をする程度に留めるほうが良さげ。

### for...of
```javascript
ar ary = [ 100, 200, 300 ]
for (var key of data) {
  console.log();
}
// 100
// 200
// 300
```

Javaの拡張for文とほとんど同じ役割。

## Strictモード
JavaScriptの落とし穴を検知し、エラーとして通知してくれるモード。

```javascript
'use strict';
// スクリプト全体に適用

function hoge() {
  'use strict';
  // 関数hoge内のみ適用
}
```