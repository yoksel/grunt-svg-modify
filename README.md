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

## The "svg_modify" task

### Usage Examples

#### Task:

```js
grunt.initConfig({
  svg_fallback: {
       your_target: {
            cwd: "cwd/", // <--- Folder for sources and results
            src: "sources/", // <--- Subfolders will be processed too
            dest: "result/" // <--- All processed folders wiil be placed here
        }
    }
});
```

#### Configure with json:

Use json file to set rules for processing folders. Create config.json and place it to the folder with your SVG-images.

## Release History
_(Nothing yet)_
