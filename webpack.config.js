const path = require("path"); //webpack.config.js는 모던 자바스크립트 파일이 아니라서
const autoprefixer = require("autoprefixer");
const ExtractCSS = require("extract-text-webpack-plugin");

const MODE = process.env.WEBPACK_ENV;
const ENTRY_FILE = path.resolve(__dirname, "assets", "js", "main.js");
const OUTPUT_DIR = path.join(__dirname, "static");

const config = {
  entry: ["@babel/polyfill", ENTRY_FILE],
  mode: MODE,
  module: {
    rules: [
      {
        test: /\.(js)$/,
        use: [
          {
            loader: "babel-loader"
          }
        ]
      },
      {
        test: /\.(scss|sass)$/,
        //scss 또는 sass파일을 찾았을 때는 가장 먼저 그 scss를 css로 바꾸고 그 css에 해당하는 텍스트 전체를 취해서, 그 텍스트를 추출해서 css파일로 저장해
        use: ExtractCSS.extract([
          {
            loader: "css-loader"
          },
          {
            loader: "postcss-loader", //css호환성 관련
            options: {
              plugin() {
                return [autoprefixer({ browsers: "cover 99.5%" })];
              }
            }
          },
          {
            loader: "sass-loader"
          }
        ])
      }
    ]
  },
  output: {
    path: OUTPUT_DIR,
    filename: "[name].js"
  },
  plugins: [
    new ExtractCSS({
      filename: "styles.css"
    })
  ]
};

module.exports = config;
