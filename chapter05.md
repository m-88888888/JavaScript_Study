# JavaScriptにおけるオブジェクト指向

# ES2015以前

## クラスではなくプロトタイプ

`ES2015以前のJavaScript`はオブジェクト指向言語だけど、JavaやRubyといった他のオブジェクト指向言語のような`クラスベース`のオブジェクト指向言語ではない。

しかし、関数オブジェクトにクラスとしての役割を与えて、クラスのような概念を表現することができる。
それを`プロトタイプ`と呼ぶ。

具体例
```javascript
// プロトタイプ本体
var Member = function(firstName, lastName) {
  this.firstName = firstName;
  this.lastName = lastName;
  this.getName = function() {
    return this.lastName + ' ' + this.firstName;
  }
};

// インスタンス化
var mem = new Member('Tarou', 'Yamada');
console.log(mem.getName());
```

## メソッドはプロトタイプで宣言する

コンストラクターでメソッドを定義すると、インスタンス化する度にメソッドが生成されてしまう。
メソッドはすべてのインスタンスで同じ中身だから共通的に１つのメソッドを参照するような形にしたい。

そこで`prototype`というプロパティを利用する。
このプロパティに格納されたメンバーは、すべてのインスタンス化されたオブジェクトに引き継がれる特性をもつ。

つまり、このprototypeプロパティに追加したメンバーは、`そのクラスをもとに生成されたインスタンスから参照できる`ということ。

また、次のような利点がある。
1. メモリの使用量削減
2. メンバーの追加や変更をインスタンスがリアルタイムに認識できる

具体例
```javascript
var Member = function(firstName, lastName) {
  this.firstName = firstName;
  this.lastName = lastName;
};

Member.prototype.getName = function() {
  return this.lastName + ' ' + this.firstName;
};

var mem = new Member('Tarou', 'Yamada');
console.log(mem.getName()); // Yamada Tarou
```

1.については言うまでもなく、各インスタンスがコンストラクター経由でメソッドを定義することがなくなったため、その分のメモリが削減できる。

2.は、インスタンスにメソッドがコピーされない＝プロトタイプオブジェクトへの変更をインスタンス側で認識できるということ。

具体例
```javascript
var Member = function(firstName, lastName) {
  this.firstName = firstName;
  this.lastName = lastName;
};

var mem = new Member('Tarou', 'Yamada');

Member.prototype.getName = function() {
  return this.lastName + ' ' + this.firstName;
};

console.log(mem.getName()); // Yamada Tarou
```

インスタンス化した後にprototypeオブジェクトに対してgetNameメソッドを追加することができる。

この性質を利用すると、個別のインスタンスに同名関数を定義することが可能。

```javascript
var Member = function(firstName, lastName) {
  this.firstName = firstName;
  this.lastName = lastName;
};

var men = new Member('Tarou', 'Yamada');

Member.prototype.getName = function() {
  return this.lastName + ' ' + this.firstName;
};

var women = new Member('Hiroko', 'Sato');

women.getName = function() {
  return this.firstName;
}

// 同じプロトタイプから生成されたインスタンスだが、それぞれ異なるgetNameメソッドの定義が可能。
console.log(men.getName()); // Yamada Tarou
console.log(women.getName()); // Hiroko
```

このような状態を`インスタンスのgetNameプロトタイプが、プロトタイプのgetNameプロパティを隠蔽する`と表現する。

## 静的プロパティ/静的メソッド
Rubyでは`クラス変数`、`クラスメソッド`に該当する機能。

```ruby
class Hoge
  @@fuga = 'fuga'

  def self.fuga
    p @@fuga
  end

  def self.hogehoge
    p 'class method is called'
  end
end

Hoge.fuga # fuga
Hoge.hogehoge # class method is called

```

JavaScriptでは`静的プロパティ`、`静的メソッド`と呼ぶ

```javascript
var Hoge = function*() {};

Hoge.version = '1.0';

Hoge.hogehoge = function() {
  return 'method is called'
};

console.log(Hoge.version); // 1.0
console.log(Hoge.hogehoge); // method is called
```

## プロトタイプチェーン（継承）

継承のこと。
JavaScriptにおいては、プロトタイプからプロトタイプを暗黙的に参照する仕組みから、`プロトタイプチェーン`と呼ばれる。

具体例
```javascript
// 親クラス
var Hoge = function() {};

Hoge.prototype = {
  hogehoge : function() {
    console.log('hogehoge');
  }
};

// 子クラス
var Fuga = function() {
  // 親クラスのコンストラクター呼び出し
  Hoge.call(this);
  // 親クラスで初期化処理が必要な場合
  // Hoge.call(this, 'hoge', 'fuga');
};

Fuga.prototype = new Hoge();
Fuga.prototype.fugafuga = function() {
  console.log('fugafuga');
}

var f = new Fuga();
f.hogehoge(); // hogehoge
f.fugafuga(); // fugafuga
```

上記の例だと、次のような流れでメソッドを呼び出している
1. f.fugafugaメソッド呼び出し
2. Fugaインスタンス（`var f`)の中からfugafugaを検索
3. Fugaプロトタイプの中からfugafugaを検索
4. Hogeインスタンス(`new Hoge()`)の中からfugafugaを検索
5. Hogeプロトタイプの中からfugafugaを検索（ヒット！）

>※注意点
JavaScriptの継承関係は動的なので、継承関係を途中で変更することができるが、インスタンス生成時に継承が固定され、その後の変更にかかわらず保存される！

## プライベートメンバー
JavaやRubyの`アクセス修飾子のprivate`のこと。

JavaScriptではプライベートメンバーとして定義しなければ、パブリックメンバーとみなす。

### 定義の仕方

`Object.definePropertyメソッド`を使う。

```javascript
function Hoge() {
  // プライベート変数
  var _hoge;

  // hogeプロパティを定義
  Object.defineProperty(
    this,
    'hoge',
    {
      get: function() {
        return _hoge;
      },
      set: function(hoge) {
        if(typeof hoge === 'string') {
          _hoge = hoge;
        }
      }
    }
  );
};

Hoge.prototype.getHoge = function() {
  return console.log(this.hoge + 'is called.');
}

var hoge = new Hoge();
hoge.hoge = 'hogehoge';
console.log(hoge.hoge); // hogehoge
hoge.getHoge(); // hogehoge is called.
```

## 名前空間（パッケージ）

Javaのパッケージ、Rubyのモジュールのこと。

JavaScriptでは`空のオブジェクトを生成する`ことで定義できる。

具体例
```javascript
var Hoge = Hoge || {}; // Hogeが未定義のときだけ名前空間{}を生成する

Hoge.Fuga = function(name) {
  this.name = name;
};

Hoge.Fuga.prototype = {
  getName : function() {
    return this.name
  }
}

var fuga = new Hoge.Fuga('hogehoge');
console.log(fuga.getName()); // hogehoge
```

# ES2015

ES2015以降はJavaなどと同様に定義できるから、直感的に理解できる！

>※注意点
Javaなどのクラスベースオブジェクト指向言語と同じような表現ができるようにはなったが、プロトタイプベースであることに変わりはない。
下記サンプルのclass命令はこのプロトタイプベースを多い包むシンタックスシュガー（糖衣構文）といえる。

## クラス定義

```javascript
class Hoge {
  // コンストラクター
  constructor(hoge) {
    this.hoge = hoge;
  }

  // メソッド
  getHoge() {
    return this.hoge;
  }
}

let h = new Hoge('hogehoge');
console.log(h.getHoge());
```

## 静的メソッド
```javascript
class Hoge {
  // static修飾子で定義できる
  static getHoge(hoge) {
    return hoge;
  }
}
console.log(Hoge.getHoge('hogehoge')); //hogehoge
```

## 継承
```javascript
class Hoge {
  constructor(hoge) {
    this.hoge = hoge;
  }

  getHoge() {
    return this.hoge;
  }
}

// extendsで継承
class Fuga extends Hoge {
  // 省略　
}

let fuga = new Fuga('hoge');
console.log(fuga.getHoge()); // hoge
```

## モジュール

lib/Util.js
```javascript
const AUTHOR = 'YAMADA, TAROU';

export class Member { ...中略... }

export class Area { ...中略... }
```

main.js
```javascript
import { Member, Area } from '.lib/Util'

var m = new Member('山田', '太郎');
console.log(m.getName()); // 山田太郎
```
