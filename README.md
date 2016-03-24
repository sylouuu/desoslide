# desoSlide
[![Build Status](http://img.shields.io/travis/sylouuu/desoslide.svg?style=flat)](https://travis-ci.org/sylouuu/desoslide) [![devDependency Status](http://img.shields.io/david/dev/sylouuu/desoslide.svg?style=flat)](https://david-dm.org/sylouuu/desoslide#info=devDependencies)
[![Version](http://img.shields.io/npm/v/desoslide.svg?style=flat)](https://www.npmjs.org/package/desoslide)

## Website

**[http://sylouuu.github.io/desoslide](http://sylouuu.github.io/desoslide)**

## Features

* **Free**: This plugin is open source, under the [MIT license](LICENSE.md). Feel free to [contribute](CONTRIBUTING.md).
* **Customizable**: Place yours thumbnails anywhere in your page. Many options available to fit your needs.
* **Control**: Control the slideshow with your keyboard keys or through the player.
* **Caption**: Show more information to your users with caption and link for each image.
* **Infinite**: Create as many slideshows as you want on a single page.
* **Reliable**: A [tests suite](tests) shows that the plugin passes the basics specifications.

## Core

* [jquery/jquery](https://github.com/jquery/jquery)
* [daneden/animate.css](https://github.com/daneden/animate.css)
* [miniMAC/magic](https://github.com/miniMAC/magic)

## Build `dist/`

Retrieve packages with `npm install` then type `gulp build`.

This will compile `src/` files:

* from `src/less/jquery.desoslide.less`
    * to `dist/css/jquery.desoslide.css`
    * to `dist/css/jquery.desoslide.min.css`

* from `src/js/jquery.desoslide.js`
    * to `dist/js/jquery.desoslide.min.js`

## Run tests

Type `gulp tests`.

## Contributing

See [contributing](CONTRIBUTING.md) file.

## Changelog

See [releases](https://github.com/sylouuu/desoslide/releases) section or [release notes](http://sylouuu.github.io/desoslide/doc/release-notes.html) page (UI).

## License

See [license](LICENSE.md) file.
