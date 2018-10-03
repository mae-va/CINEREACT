# CINEREACT

We created a simple React app to store movies et register favorites.


## How we made CINEREACT

CINEREACT was made with React JS for sure ;) Using rooting method, our application don't change is URL when you walk away on it. 
We plugged on themoviedb.rg with its API. We used Firebase to store favorites.
ES6, Bootstrap, JSX, HTML5 and CSS 3 are here too.


## Table of contents

1.  [Files structure](https://github.com/WildCodeSchool/nantes-0918-javascript-clap#Structure)
2.  [Installation](https://github.com/WildCodeSchool/nantes-0918-javascript-clap#Installation)
3.  [Credits](https://github.com/WildCodeSchool/nantes-0918-javascript-clap#Credits)


## Structure

```
*root*
|
├── */Public/*
├── */src/*
│   ├── */App.js/* 
│   └── *navbar.js
│   └── *Actuality.js
│   └── *Favorites.js
│   ├── *Routes.jsx* front-end routes
│   ├── *index.html* entry point
│   ├── *index.jsx* javascript entry point
│   ├── *style.scss* styling
│   └── */tests/* contains test environment (Jest + Enzyme)
│       ├── */__mock__/* contains setup to provide a valid path for imports
│       ├── */_tests__/* the actual tests
│       └── *setup.js* setup for enzyme for react 16
├── *package.json* the whole package.json with every dependency and script, nothing is kept hidden
├── *.eslintrc* eslint config
├── *.babelrc* babel config (polyfills)
├── *webpack.config.js* webpack config, it has a dev and prod environment
└── *README.md* this file
```


## Installation

You can use both npm or yarn, the version I used to create this project are:

```
$ node -v ; npm -v ; yarn -v
v8.8.1
5.4.2
1.2.1

```

If you just freshly installed yarn/npm you are good to go, else you might need to upgrade, for npm I use  `n`

```
npm install -g n

```

to install it and after that select at least the stable version (what I used).

```
n stable

```

and now you have the latest stable version of node&npm.

`npm i -g simple-react-app`  to install this package globally, from there you will be able to jumpstart as many boilerplates as you wish.

`simple-react-app folderName`  to create a react boilerplate on the  `folderName`  folder. By default all dependencies are already installed, just  `cd folderName`  and start hacking.

`yarn start`/`npm start`  to start dev server with hot reload, it's live on  `localhost:3000`.

`yarn run build`/`npm run build`  to build prod bundle, it includes both treeshaking and uglify to optimize the code as much as possible.

`yarn test`/`npm test`  run the tests with Jest and Enzyme, by default the test included only check for the correct render of base components & routes, all are passing.


## Credits

The CLAP Team created this! I

Collaborators:

-   Maeva Duran (https://github.com/mae-)
-   Tiphaine Deswarte (https://brennannovak.com/)
-   Antoine Nourris (http://www.smarimccarthy.is/)
-   Matthieu PETIT (https://brennannovak.com/)



This program is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation. 
