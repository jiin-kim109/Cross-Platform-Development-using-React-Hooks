# Act-R-Rn

A set of React and React Native packages for Act mobile and web development

- 

## Description

This multi-platform application is made of multiple yarn packages that contain code share between React and React Native components

- web (React.js web app)  
- app (React Native app)  
- common (Code and components shared between web, and app)  
  
The packages are manages with Lerna.js  
  
## Installation
  
1. Clone project  

```
git clone https://github.com/benawad/fullstack-graphql-airbnb-clone.git
```
  
2. Download dependencies  
   
will download dependencies from all the packages  
```
yarn
```
  
3. Start the application  
  
* React web app
    
The following command we'll open expo dev server.    
```
// act-r-rn/
yarn 
```
* React Native app
```
// act-r-rn/
yarn build 
```
  
4. Testing  
  
* Test common  
  
```
cd packages  
cd common  
yarn jest  
```
  
## Usage

1. Start server `yarn start` in `packages/server`

2. Now you can run `yarn start` in `packages/web` or `packages/app` to start the website or app.

3. How to get credentials working in graphql playground: https://youtu.be/oM-EmNdhwI4?t=8m39s

## Deploy

### App

### Web App

## Features

