# Vue Netflix Clone
A simple [Netflix](https://netflix.com) clone based on Vue powered by [Firebase](https://firebase.google.com).
<div>
  <img alt="Last Commit" src="https://img.shields.io/github/last-commit/approxipix/vue-netflix-clone?color=2b9348">
  <a href="https://david-dm.org/approxipix/vue-netflix-clone"><img src="https://david-dm.org/approxipix/vue-netflix-clone/status.svg" alt="Dependencies status" /></a>
  <a href="https://github.com/approxipix/vue-netflix-clone/blob/master/LICENSE"><img src="https://img.shields.io/github/license/elangosundar/awesome-README-templates?color=2b9348" alt="License Badge"/></a>
</div>

## Live Demo
Link: https://approxipix.github.io/vue-netflix-clone

![example](https://github.com/Approxipix/vue-netflix-clone/blob/master/example1.png?raw=true)
![example](https://github.com/Approxipix/vue-netflix-clone/blob/master/example2.png?raw=true)
![example](https://github.com/Approxipix/vue-netflix-clone/blob/master/example3.png?raw=true)
![example](https://github.com/Approxipix/vue-netflix-clone/blob/master/example4.png?raw=true)


## Tech stack
* [Vue](https://github.com/vuejs/vue)
* [Vuex](https://github.com/vuejs/vuex)
* [Vue Router](https://github.com/vuejs/vue-router)
* [Firebase](https://firebase.google.com)
* [The Movie Database (TMDb)](https://www.themoviedb.org)

## Features
- [x] Authentication
  - [x] Sign up
  - [x] Sign in
  - [x] Sign in with Google
  - [x] Sign in with Facebook
  - [x] Sign in as demo user
  - [x] Recover password with email verification
  - [x] Logout
- [x] Movies
  - [x] Search movies
  - [x] List of movies by category
  - [x] List of movies with pagination
  - [x] Detailed information about the movie
  - [x] Fully responsive movie slider
  - [x] Add movie to "my list"
- [x] Responsive

## Configuration
To use this project with Firebase authentication, some configuration steps are required.
  1) Create a free Firebase account at [Firebase](https://firebase.google.com)
  2) Create a project from your [Firebase account console](https://console.firebase.google.com)
  3) Configure the authentication providers for your Firebase project from your [Firebase account console](https://console.firebase.google.com)
  4) Configuration required to connect to Firebase is defined in the `.env.local` file in the root of this repository
```js
VUE_APP_FIREBASE_API_KEY='<YOUR-API-KEY>'
VUE_APP_FIREBASE_AUTH_DOMAIN='<YOUR-AUTH-DOMAIN>'
VUE_APP_FIREBASE_PROJECT_ID='<YOUR-PFOJECT-ID>'
VUE_APP_FIREBASE_STORAGE_BUCKET='<YOUR-STORAGE_BUCKET>'
VUE_APP_FIREBASE_MESSAGING_SENDER_ID='<YOUR-MESSAGING-SENDER-ID>'
VUE_APP_FIREBASE_APP_ID='<YOUR-APP-ID>'
```
  5) In order for this application to work you will have to obtain an API key from [TMDB](https://www.themoviedb.org/settings/api). Once you get the key, you must insert it in a file `.env.local`
```js
VUE_APP_TMDB_API_KEY='<YOUR-API-KEY>'
```

## Installation
Clone project:
```shell
https://github.com/Approxipix/vue-netflix-clone.git
```

Then change into that folder:
```shell
cd vue-netflix-clone
```

Install project dependencies:
```shell
npm install
```

Build for production:
```shell
npm run build
```

Start up a local server:
```shell
npm run serve
```

Open [http://localhost:8080](http://localhost:8080) to view it in the browser.

## License  <a href="https://github.com/approxipix/vue-netflix-clone/blob/master/LICENSE"><img src="https://img.shields.io/github/license/elangosundar/awesome-README-templates?color=2b9348" alt="License Badge"/></a>
This project is licensed under the MIT License. See the [LICENSE](https://github.com/approxipix/vue-netflix-clone/blob/master/LICENSE) file for more information.
