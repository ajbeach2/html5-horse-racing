# HTML5 Racing Game

![Screen Shot](http://i.imgur.com/2nouXNW.png)

Live demo [here](https://blooming-sierra-8502.herokuapp.com)

## Build instructions

You MUST have node, npm installed to build or run tests for this. Once built, the game is just static assets in the public folder that is hosted from Express.js


### To build and run:
In the root of the application, to build and run the game locally:

```
npm install &&
npm run-script build &&
npm start 
```
Then navigate to localhost:3000


### To run tests
```
npm test
```

##Design
The design for this game is loosely based off of the Entity Component System architecture, with the additional abstraction of a Modifier Component, which allows for a modifier component to exist with separate distinguishable attributes.  This allows for separating modifiers from Entities.  This uses npm for package management and code organization, and it is built with browserify;