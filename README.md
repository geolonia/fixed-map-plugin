# Fixed Map Geolonia Plugin

地図を固定表示する Geolonia プラグインです。
このプラグインを適用すると地図が画面の一部に固定され、スクロールしても地図が表示され続けるようになります。

DEMO: https://geolonia.github.io/fixed-map-plugin/

## 使い方

Fixed Map Geolonia Plugin は、 Geolonia [Embed API](https://docs.geolonia.com/embed-api/) のプラグインとして動作します。
以下のように Embed API と一緒にスクリプトを読み込んでください。

```html
<body>
  <div class="geolonia"></div>
  <script src="https://cdn.geolonia.com/v1/embed?geolonia-api-key=YOUR-API-KEY" />
  <script src="https://cdn.geolonia.com/v1/fixed-map-plugin@latest" />
</body>
```

## カスタマイズ

`fixed` クラス、または `geolonia-map-fixed` クラスを使って CSS を上書きすることで、固定マップのスタイルを変更できます。

```css
.geolonia.fixed {
  left: 10px;
  top: 10px;
}
.geolonia.geolonia-map-fixed {
  right: 10px;
  top: 10px;
}
```

## コントリビューション

Issue、プルリクエストはいつでも歓迎します。
以下のコマンドで開発用サーバーを立ち上げることができます。

```shell
$ git clone git@github.com:geolonia/fixed-map-plugin.git
$ cd fixed-map-plugin
$ yarn # または npm install
$ npm start
```
