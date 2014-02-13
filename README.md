[![devDependency Status](https://david-dm.org/sylouuu/desoslide/dev-status.svg?theme=shields.io)](https://david-dm.org/sylouuu/desoslide#info=devDependencies)
[![Bower version](https://badge.fury.io/bo/desoslide.png)](http://badge.fury.io/bo/desoslide)

## Overview, demos, documentation & unit tests

**http://sylouuu.github.io/desoslide**

## Dependencies

* jQuery >= 1.7.0
* [animate.css](https://github.com/daneden/animate.css) ~3.0.0

## Build

* Install gulp ```npm install -g gulp```
* Install dependencies: ```npm install```
* Type:  ```gulp```

## Changelog

09/02/2014 - **1.3.0**

* added animate.css as a dependency (used for transitions), it needs to be loaded separately

06/12/2013 - **1.2.4**

* fixed undefined if no overlay
* added 'random' effect

03/12/2013 - **1.2.3**

* added 5 callbacks in the new 'events' option: 'thumbClick', 'prev', 'pause', 'play' and 'next'
* moved 'result' option in 'events.completed'
* added spinner for waiting

30/11/2013 - **1.2.2**

* optimized source code
* added 'animationend' event to recalculate overlay positioning after each effect ; instead of using an arbitrary timeout
* removed 'log' option (enabled by default in case of error or warning)

25/11/2013 - **1.2.1**

* added the 'desoslide' namespace for data API
* added the 'none' value for overlay option

24/11/2013 - **1.2.0**

* effects: added 'sideFade' and 'sideFadeBig'

10/09/2013 - **1.1.1**

* logging errors: get only the first one in order to avoid cascade errors

01/09/2013 - **1.1.0**

* Totally remade the options syntax (check out documentation)

31/08/2013 - **1.0.3**

* Added 5 transition effects
* Added mainImageClass option
* Fixed overlay positioning
* Fixed included links on captions

12/07/2013 - **1.0.2**

* Fixed bad border value retrieved in Firefox

12/07/2013 - **1.0.1**

* Added the border value while creating the overlay

17/05/2013 - **1.0.0**

* First release
