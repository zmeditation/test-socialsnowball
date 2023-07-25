# Socialsnowball payout overview 🎉

This is an example of a landing page using vite `("veet", /vit/)`, react, tailwind and some svg's.

- [x] It is 🌈 colored.
- [x] It is 📱 responsive.
- [x] It has 🌚 dark mode.

## 🔮 This project uses

- ⚡ [Vite](https://vitejs.dev/)
- ⚛️ [React](https://reactjs.org/)
- 🌬️ [Tailwind](https://tailwindcss.com/)
- 🛡️ [Hero Icons](https://heroicons.dev/)
- 🪦 [Headless UI](https://headlessui.com/)
- ✏️ [Google fonts](https://fonts.google.com/)
- 🧰 Some svg's tools (✨ [Haikei](https://haikei.app/)):
  - 🎨 [SVG Editor online](https://svgeditoronline.com/editor/)
  - 🌊 [Haikei waves](https://getwaves.io/)
  - 🎏 [Haikei backgrounds](https://app.haikei.app/)

## 📖 How to run

- 🚪 Enter the directory

        cd vite-react-tailwind

- 🧑‍💻 Install the dependencies

        npm i

- 🚀 Start the project in dev mode

        npm run dev

- 🔽 Test the project with jest

        npm run test


[⬆️ Back top](#vite-react-and-tailwind-)

## Adding Jest with TypeScript Support to a Vite Application

The app is built on top of [vite](https://vitejs.dev/) instead of the more popular create react app. The benefit of vite is that it install sand builds extremely quickly. One of the downsides of vite is that it doesn't come with any out-of-the-box testing support. It also has its own [esbuild-based compiler](https://vitejs.dev/guide/features.html#typescript), which is not currently compatible with jest, so we have to configure JSX & TypeScript support for jest even though vite handles it already.

This lesson requires installing a handful of modules:

```
npm install -D jest
npm install -D @testing-library/react @testing-library/jest-dom @testing-library/user-event
npm install -D @babel/preset-react @babel/preset-typescript @babel/preset-env
npm install -D identity-obj-proxy
```

Each of them serves an important purpose:

- [jest](https://jestjs.io/) runs our tests
- [@testing-library/react](https://testing-library.com/docs/react-testing-library/intro) adds the ability to render react components inside of our test environment
- [@testing-library/jest-dom](https://github.com/testing-library/jest-dom) allows us to assert that components are in the DOM and have certain text and classes
- [@testing-library/user-event](https://testing-library.com/docs/ecosystem-user-event) allows us to interact with rendered components programmatically
- [@babel/preset-react](https://babeljs.io/docs/en/babel-preset-react), [@babel/preset-typescript](https://babeljs.io/docs/en/babel-preset-typescript) and [@babel/preset-env](https://babeljs.io/docs/en/babel-preset-env) allow us to use ES6 Modules, JSX, and TypeScript in our tests
- [identity-obj-proxy](https://github.com/keyz/identity-obj-proxy#identity-obj-proxy---) is helpful when rendering CSS modules so that we can see the original class names instead of obfuscated ones

We also have to add numerous config files such as `babel.config.js` and `jest-setup.ts` which are required to enable all of this functionality.

We put our jest config in our `package.json` file which works well, but you can also put it in a file named `jest.config.ts` or `jest.config.js`. See the [Jest Configuration documentation](https://jestjs.io/docs/configuration) for more details about configuring jest.