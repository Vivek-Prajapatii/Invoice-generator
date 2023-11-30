import { resolve } from "path";

export const mode = "development";
export const entry = "./src/index.tsx";
export const output = {
  path: resolve(__dirname, "dist"),
  filename: "bundle.js",
};
export const module = {
  rules: [
    {
      test: /\.js$|jsx/,
      exclude: /node_modules/,
      loader: "babel-loader",
      options: {
        presets: ["@babel/preset-react", "@babel/preset-env"],
      },
    },
  ],
};
