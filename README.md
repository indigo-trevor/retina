# Retina Display
This contribution shows how to conditionally load retina images conditional of the device's DPI/PPI (Dots per Inch or Points per Inch.)

## Features
  * [gulp-img-retina](https://github.com/germanyt/gulp-img-retina)
  * [gulp-css-retina](https://github.com/germanyt/gulp-css-retina)
    * Need to make the following tweaks to the source file located within **node_modules/gulp-css-retina/index.js**
      *  One line 18: `mediaParams: '(min-device-pixel-ratio: 2), (min-resolution: 192dpi)'` to `mediaParams: '(-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi)'`
      *  One line 75: Comment out console log so you don't get your entire stylesheet printed to the console when running gulp

## Demo use
In order to run this demo, you will need to do the following:

```bash
$ npm install
```
Then run:

```bash
$ gulp start
```
