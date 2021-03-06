#fritzgrowl

fritzgrowl creates nice growls from the FRITZ!Box Callmonitor for

* Incoming calls
* Outgoing calls
* Established calls
* Hang up calls

##Quick Start

Install it with

    $ npm install -g fritzgrowl

Run it with

    $ fritzgrowl

done.


##Requirements

* [node-growl](https://github.com/visionmedia/node-growl)


##Screenshot

Here is an example screenshot (Ubuntu):

![screenshot of growl incoming call](https://raw.github.com/michaelkebe/fritzgrowl/master/res/screenshot.png)


## Options

If the FRITZ!Box is not using the default `fritz.box` hostname it can
be specified with

    fritzgrowl -s another.hostname


## Changelog

### 0.0.3
  - Human readable durations with [humanize-duration](https://github.com/EvanHahn/HumanizeDuration.js)

### 0.0.2
  - added -s option

### 0.0.1
  - Initial release


##License

MIT

