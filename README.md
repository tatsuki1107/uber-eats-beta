今回、貴社でのwebエンジニアの長期インターンシップに応募させていただいた駒澤大学3年の高橋樹と申します。こちらのリポジトリが一週間での制作物になります。ウーバーイーツに似たECサイトをreactとfirebaseで作りました。
・ローカルでの確認方法
## `npm install firebase`
## `yarn start`
localhost:3000で確認できます。

firebaseのプロジェクト権限について私自身まだ正直理解を完全にできていません。
もし、権限が必要な場合やローカルで確認できない場合、

## `tatsuki11070522@icloud.com`
が自分のメールアドレスになりますのでお申し付け下さい。

時間が少し足らず、エラーが出る箇所や開発しきれていないところがあります。
・リロードをすると、「TypeError: Cannot read properties of null (reading 'uid')」になる時があるので、パスを('/')に直すと戻ります。
・パス('/)以外からサイドバーのログアウトボタンを押すと上のエラー
・オーダーを確定したあと、「仮注文一覧」に前のオーダーが残ったままになっている
・「プロフィール画面」の注文履歴のレンダリング実装が時間足りずできず。
・所々のスタイルの乱れ

また、使うべきところでの、Hooksやコンポーネントでの抽象化、firebaseとのfetchなどの、リファクタリングをあまりできず、コードが見ずらいかもしれません。申し訳ございません。
お忙しい中大変恐縮ですが、ご確認の方よろしくお願いいたします。

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `yarn build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
