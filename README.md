<p align="center">
    <img src="https://raw.github.com/sylouuu/desoslide/master/assets/img/logo/desoslide.png" alt="icon">
</p>

[![GitHub version](https://badge.fury.io/gh/sylouuu%2Fdesoslide.svg)](http://badge.fury.io/gh/sylouuu%2Fdesoslide)
[![devDependency Status](https://david-dm.org/sylouuu/desoslide/dev-status.svg?theme=shields.io)](https://david-dm.org/sylouuu/desoslide#info=devDependencies)
[![Bower version](https://badge.fury.io/bo/desoslide.png)](http://badge.fury.io/bo/desoslide)

## Overview, demo, documentation & unit tests

**http://sylouuu.github.io/desoslide**

## Dependencies

* jQuery >= 1.7.0
* [animate.css](https://github.com/daneden/animate.css) ~3.1.0 for using `effect.provider: 'animate'`
* [magic](https://github.com/miniMAC/magic) for using `effect.provider: 'magic'`

## Build `dist/`

```
npm install
gulp build
```

## Run tests

```
npm install
gulp tests
```

## Changelog

2014-02-09 - **1.3.0**

* added animate.css as a dependency (used for transitions), it needs to be loaded separately

2013-12-06 - **1.2.4**

* fixed undefined if no overlay
* added 'random' effect

2013-12-03 - **1.2.3**

* added 5 callbacks in the new 'events' option: 'thumbClick', 'prev', 'pause', 'play' and 'next'
* moved 'result' option in 'events.completed'
* added spinner for waiting

2013-11-30 - **1.2.2**

* optimized source code
* added 'animationend' event to recalculate overlay positioning after each effect ; instead of using an arbitrary timeout
* removed 'log' option (enabled by default in case of error or warning)

2013-11-25 - **1.2.1**

* added the 'desoslide' namespace for data API
* added the 'none' value for overlay option

2013-11-24 - **1.2.0**

* effects: added 'sideFade' and 'sideFadeBig'

2013-09-10 - **1.1.1**

* logging errors: get only the first one in order to avoid cascade errors

2013-09-01 - **1.1.0**

* Totally remade the options syntax (check out documentation)

2013-08-31 - **1.0.3**

* Added 5 transition effects
* Added mainImageClass option
* Fixed overlay positioning
* Fixed included links on captions

2013-07-12 - **1.0.2**

* Fixed bad border value retrieved in Firefox

2013-07-12 - **1.0.1**

* Added the border value while creating the overlay

2013-05-17 - **1.0.0**

* First release

<p align="center">
    <img src="https://raw.github.com/sylouuu/desoslide/master/assets/img/logo/favicon.png" alt="icon">
</p>

