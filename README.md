# 学園祭実行委員 物品管理システム フロントエンド


## 依存ソフトウェア

- yarn

## 起動方法

### 環境変数

環境変数`NEXT_PUBLIC_QR_API_URL`にバックエンドのURLを指定します。例えば

```
NEXT_PUBLIC_QR_API_URL=https://api.qr.sohosai.com
```

や

```
NEXT_PUBLIC_QR_API_URL=http://localhost:3030
```

などになります。

これらは`.env.local`ファイルに書くと良いです。

### 起動

```
$ yarn
```

で依存ライブラリがローカルにダウンロードされます

```
$ yarn dev
```

で開発ページが起動します。


### ビルド

```
$ yarn build
```

で静的なページの生成ができます。

### フォーマット

```
$ yarn format
```

でできます。Windowsではうまく起動しないのでWSLなどを使うと良いです。


## storybook

各のコンポーネントの表示を確認するためにstorybookというソフトウェアを使います。

```
$ yarn
```

をするとstorybook自体のインストールもなされるため、特に設定する必要はありません。

```
$ yarn storybook
```

で確認ページが立ち上がります。


## 各フォルダの役割

- `src`
  - ソースコードのメイン
  - `src/types.ts`
    - 全体に使える型と変換関数などを定義
  - `src/components`
    - 再利用可能な部品であるコンポーネントが定義されています。
  - `src/pages`
    - URLに対応したページが用意されています。詳しくはNext.jsのルーティングについて調べてください。
  - `src/lib`
    - ライブラリ定義
  - `src/hooks`
    - 副作用を伴う`useなんとか`関数を定義する

## ブランチ名のルール

- 新しい機能の追加: `features/#<issue-number>-<issue-summary>`
- 修正・変更: `fix/#<issue-number>-<issue-summary>`
- バグ修正: `fixbug/#<issue-number>-<issue-summary>`
- 設定ファイルの変更など: `chore/#<issue-number>-<issue-summary>`
