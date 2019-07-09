# Vue Netflix Clone

A simple [Netflix](https://netflix.com) clone based on Vue powered by [Firebase](https://firebase.google.com).

## Example
![example](https://github.com/Approxipix/vue-netflix-clone/blob/master/example2.jpg?raw=true)
![example](https://github.com/Approxipix/vue-netflix-clone/blob/master/example1.jpg?raw=true)

## Tech stack

* [Vue](https://github.com/vuejs/vue)
* [Vuex](https://github.com/vuejs/vuex)
* [Vue Router](https://github.com/vuejs/vue-router)
* [Firebase](https://firebase.google.com)

## Config
### Step 1
Firebase Auth Provides Method Email/Password,Google,Facebook Enabled  [Firebase console](https://console.firebase.google.com/) 

### Step 2
Initialize Firebase At ``main.js`` [Firebase Credentials](https://console.firebase.google.com/)
``` bash
const config = {
    apiKey: '',
    authDomain: '',
    databaseURL: '',
    projectId: '',
    storageBucket: ''
})
```

## Setup

```shell
# Clone project
git clone https://github.com/Approxipix/vue-netflix-clone.git

# Then change into that folder
cd vue-netflix

# Install dependencies
npm install

# Build for production 
npm run build

# Start up a local server
npm run serve
```

Open localhost to view it in the browser.
