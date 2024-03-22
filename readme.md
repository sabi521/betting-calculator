# Boilerplate Tailwind Vite

This is a quick start boilerplate with Vite.js, Tailwind CSS, and PostCSS.

## Quick start

Firstly, clone this repository to your local machine:
```shell
git clone https://github.com/lajennylove/boilerplate-tailwind-vite.git
```
Next, navigate to the project directory:
```shell
cd boilerplate-tailwind-vite
```

### Using npm

Install dependencies:
```shell
npm install
```
To start the development server:
```shell
npm dev
```
To build for production:
```shell
npm build
```

### Using yarn

Install dependencies:
```shell
yarn dev
```
To build for production:
```shell
yarn build
```

Remember to install Postcss if you're having issues with autoprefixer (`warning " > autoprefixer@10.4.19" has unmet peer dependency "postcss@^8.1.0"`)
```shell
yarn add postcss
```
or
```shell
npm install postcss
```

Project Structure and Usage Instructions
-----

**Starter Page**

Start coding on the `blank.html` page, this is your primary page for development. The `index.html` page works as a demonstration of how to use Tailwind CSS and is not intended for further development.

**JavaScript and CSS Files**

The main files that you need to modify to add JavaScript functionality and CSS styles are:

- JavaScript: `./assets/src/js/app.js`
- CSS: `./assets/src/css/app.scss`

These are your source files where you can write your custom JavaScript and CSS code.

**Built Files**

Following the build process, your JavaScript and CSS are compiled and output to the following locations:

- JavaScript: `./assets/dist/js/app.randomhash.js`
- CSS: `./assets/dist/css/style.randomhash.scss`

The 'randomhash' in the file names denotes a unique identifier that is generated during the build process.

**Important Note:** You are not advised to modify the files in the `dist` folder directly. This folder contains the built files (the output from the build process) which will be overwritten during each subsequent build. All code modifications should be done in the source files (`./assets/src/js/app.js` and `./assets/src/css/app.scss`).

## License

This project is licensed under the MIT License.

## Support

For any questions or support, please raise an issue in the GitHub repository or contact Jenny Martinez <me@lajennylove.com>.

Happy Coding! 🚀