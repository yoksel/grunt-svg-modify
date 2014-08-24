# grunt-svg-modify

> Resize and color svg-images

Modify SVG by JSON.

## Getting Started
This plugin requires Grunt `~0.4.5`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-svg-modify --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-svg-modify');
```

## Usage

### Task:

```js
grunt.initConfig({
    svg_fallback: {
        your_target: {
            cwd: "cwd/", // <--- Folder with sources and results
            src: "sources/", // <--- Subfolders will be processed too
            dest: "result/" // <--- All processed folders wiil be placed here
        }
    }
});
```

### Configure with json:

Create config.json and place it to the folder with your SVG-images.

Variations of config.json see below:

#### Colorize:

For transparent icons only!

If SVG-element has fills, these fills will not be replaced.

```js
{
    "defaultColor": "hotpink"
}
```

#### Resize and colorize images (without renaming):

```js
{
    "defaults": {
        "arrow-up": {
            "width": "200" // <--- height will be setted automatically
        },
        "home": {
            "height": "50", // <--- width will be setted automatically
            "color": "skyblue" //  <--- this override 'defaultColor'
        }
    }
}
```

#### Make variations of one file:

```js
{
    "variations": {
        "arrow-up": [{
              "width": "40"
            }, {
              "height": "120",
              "color": "orange"
            }, {
              "color": "gold"
        }],
        "home": [{
              "width": "100"
            }, {
              "height": "70",
              "color": "pink"
            }, {
              "color": "yellowgreen"
        }]
    }
}
```

## Release History
_(Nothing yet)_
