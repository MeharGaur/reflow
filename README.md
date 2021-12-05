# reflow

- Abstracts away the complexity of media queries
- Bring your own framework
- Very little overhead
- Zero configuration, just use it
- Does one thing and does it well

--------------------

## Installation
You can install reflow on the JS side or SCSS side. You might want one or both depending on how complex your frontend app is.

### **JavaScript**
On the JS side of things, you can install via `npm` or just add a script tag.

**With a bundler:**  
`npm install reflow-breakpoints`  

And then import it at some root-level file in your project. Make sure this file runs in the browser and not in node.  
```js
import 'reflow-breakpoints'
```

For example, in a Vue project you could import reflow in the `main.js` file.
  
**No bundler:**  
You can also simply add a script tag to your HTML to load it from a CDN or your own server. For script tags, don't load it as an ES module because you'll want the `reflow` object to be available globally.

--------------------

### **SCSS**
Using reflow in SCSS requires that the `_variables.scss` and `_mixins.scss` files get imported wherever you want to use the `reflow` SCSS mixin. Make sure to import `variables` first, and then `mixins`  

```scss
// In webpack you might need to prepend a ~ (tilde) to indicate reflow is a module
@import 'reflow-breakpoints/scss/variables';
@import 'reflow-breakpoints/scss/mixins';
```  

Depending on your project, you might be able to do these imports globally, or might need to prepend these imports to every file. If you are using SvelteKit for example, you can prepend the above snippet into every `<style lang="scss">` block automatically using [svelte-preprocess](https://github.com/sveltejs/svelte-preprocess).  

Check your framework's and/or bundler's docs to see how preprocessing can be done in your project, if you don't have a way of importing SCSS files globally.

--------------------

## Usage
Now, time for the easy part. 

### **Breakpoint Thresholds**
| Device      | Code | Type                      | Range              |
|-------------|------|---------------------------|--------------------|
| Extra small | xd   | Small to large phone      | < 600px            |
| Small       | sm   | Small to medium tablet    | 600px > < 960px    |
| Medium      | md   | Large tablet to laptop    | 960px > < 1280px  |
| Large       | lg   | Desktops and most laptops | 1280px > < 1920px |
| Extra large | xl   | 4k and ultra-wide         | > 1920px          |

<!-- > \* -16px on desktop to account for browser scrollbar -->

--------------------

### **JavaScript**
reflow will declare a `reflow` object globally. For something as core to your app as responsive breakpoints, you'll want reflow accessible from anywhere.

```js
// 👇 These are all the same
reflow
window.reflow
globalThis.reflow
```  

You get to import once, and use everywhere. Normally you'd want code-splitting to use a module only where necesarry, but again responsive breakpoints *will* be used throughout your entire app so the global var will come in handy.

```js
// TODO: Add more JS examples, especially for reacting to resizes


// If mobile set width to 100px else 200px.
myElement.style.width = `${ reflow.mobile ? 100 : 200 }px`


// If tablet, else if desktop.
if (reflow.md) {
    // Code for 'md' width screens
}
else if (reflow.lg) {
    // Code for 'lg' width screens
}
```

--------------------

### **SCSS**

```scss

@import 'reflow-breakpoints/scss/variables';
@import 'reflow-breakpoints/scss/mixins';

.my-div-element {
    /* Base styles go here */
    height: 200px;

    /* Overrides for if the device has an 'lg' screen */
    @include reflow('lg-only') {
        height: 150px;
    }

    /* Overrides for if the device is considered as 'mobile'. Same as md-and-down */
    @include reflow('mobile') {
        height: 100px;
    }
}

```

Available breakpoints for the `reflow` SCSS mixin:
- print-only
- screen-only  
- mobile (same as md-and-down)
- xs-only
- sm-only
- sm-and-down
- sm-and-up
- md-only
- md-and-down
- md-and-up
- lg-only
- lg-and-down
- lg-and-up
- xl-only




