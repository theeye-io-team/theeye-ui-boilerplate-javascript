# ui-boilerplate

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

### [data-hook=] attribute

We use <tag-name>[data-hook=data-hook-name] anytime we need to bind events to DOM elements. we never use class, id or any other selector. 
we also never forget to add the data-hooks to identify handled events in our Views.


Why? Designers usually replace, add and remove selectors and attributes. It is very common change them to map the templates with the CSS.


