<p align="left">
  <img src="http://oneagency.github.io/Jacket/img/logo/Jacket-large.png" width="350" alt="Jacket"/>
</p>

[![npm](https://nodei.co/npm/jacket.png?downloads=true)](https://www.npmjs.org/package/jacket)

[![version](https://img.shields.io/npm/v/jacket.svg)](https://www.npmjs.org/package/jacket)
[![dependencies](https://david-dm.org/Crosscheck/Jacket.svg)](https://david-dm.org/Crosscheck/Jacket)
[![devDependencies](https://david-dm.org/Crosscheck/Jacket/dev-status.svg)](https://david-dm.org/Crosscheck/Jacket#info=devDependencies)
[![downloads](https://img.shields.io/npm/dm/jacket.svg)](https://www.npmjs.org/package/jacket)
[![license](https://img.shields.io/npm/l/jacket.svg)](https://www.npmjs.org/package/jacket)
[![node](https://img.shields.io/node/v/jacket.svg)](https://www.npmjs.org/package/jacket)

## Hi there, Awesome Front-end developer.

> A starterkit with a **sane default setup**, **a good starting structure** 
> and **powerfull front-end tools** to back you up.

### You can use the Yeoman generator for easy setup.

`npm i -g generator-jacket`

### What front-end tools are included?

* **Npm** -- Jacket is an npm package. You can find the package [here](https://www.npmjs.com/package/jacket).
* **Gulp** -- As a build tool, Jacket uses [Gulp](http://gulpjs.com/).
* **Sass** -- [Bourbon](http://bourbon.io/) & [Neat](http://neat.bourbon.io/), [h5bp normalize](https://html5boilerplate.com/), [autoprefixer](https://twitter.com/autoprefixer) and more.
* **Smacss and BEVM** -- Structure is [Smacss](http://smacss.com/) based and [BEVM](https://viget.com/extend/bem-sass-modifiers) is encouraged.
* **Scss linting** -- Scss linting lets you [lint](https://github.com/brigade/scss-lint) your scss code.
* **BrowserSync** -- For crossdevice testing Jacket uses [Browsersync](https://www.browsersync.io/).
* **Jade** -- Jacket is setup with [Jade](http://jade-lang.com/) as templating language.
* **Sassdoc** -- Scss Mixins, functions and more are documented with [Sassdoc](http://sassdoc.com/).

### What Gulp tasks can be run?

##### gulp help

The Help task displays all the gulp tasks.

##### gulp favicons

The Favicons task can generate your favicons with [Realfavicongenerator](http://realfavicongenerator.net/).

##### gulp sass

The Sass task compiles your **scss** to **css**. <br>
This task can do: Globbing, Autoprefixing, Sourcemaps, it includes a jsonImporter and sends a terminal notification when compilation fails.

##### gulp scss-lint

Based on the .scss-lint.yml the Scss-lint task will check if all the scss code you wrote respects the codig standards.
You should install the gem first with `gem install scss_lint`.


##### gulp jade

The Jade task wil compile all the Jade templates to html files in the dist folder.


##### gulp browser-sync

The Browser sync task will serve this index.html file at localhost:3000/
and it will watch the scss and jade files and refresh all the devices that are hooked up when these files change.


##### gulp sassdoc

This tasks can generate all the scss documentation used in Jacket.


##### gulp watch

This task watches all your files.


### Sassdoc?

You can find the doc when you run the gulp sassdoc command.

---

Jacket &bull; License MIT &bull; &copy; One Agency
