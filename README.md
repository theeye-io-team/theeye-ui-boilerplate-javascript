# TheEye-io Reactive SPA Web boilerplate

theeye boilerplate structure


## start 

npm install

npm run build-dev


## login

use theeye username and password


# What is this Boilerplate about?

This is a non-framework ES6 javascript project structure, based in some programming principles, ideas, good practices and good stuff taken from several tools like React, Backbone, Ampersand, Flux, between others, and experience.

It uses Redux to handle states

It comes with some components. But feel free to build or include your own

Core Tools (check package.json)

## Conventions

### Use ES6

This project comes with Babel, Webpack and ES6 ready. So, use it wisely.


### [data-hook] attribute

We use <tag-name>[data-hook=data-hook-name] anytime we need to bind events to DOM elements. We should never use class, id or any other common selector we can't control.
We should also never forget to add the attribute *data-hook* to identify the handled element events in our Views.

Usually selectors and HTML are replaced, add and remove selectors and attributesHTML/CSS designers, builders and sometimes we by mistake, . It is very common to change the HTML tree and element attributes to map the design and the HTML templates with the CSS.


### Links

We can bind events to any element in the DOM. But when we need user interaction vía click, it is better to use elements like `<a>` or `<button>`. This is a good practice and then enable us to do better tests and Bot automations.


### View components

When creating new components, use a root element. The root element will be used to contain every element that belongs to that component. Multiple root elements can't be used.

The root element must have the attribute [data-component]. The main purpose for this attribute is to attach the component styles.
As an example

components/crazy/index.js

```javascript

// load this component styles
import './styles.less'

class CrazyComponent extends View {
  constructor () {
    super()
    
    this.template = `<div data-component="crazy-component">Crazy View Template</div> `
  }
}

```

components/crazy/styles.less

```css
[data-component=crazy-component] {
  div {
    color: red;
    width: 100%;
    position: absolute;
  }
}
```
