
<h1 align="center">🌟 A gulpfile for your assets 🌟</h1>
<p align="center">A gulpfile for building front-end assets.</p>
<p align="center"><img src="./screenshot.png" alt="A gulpfile for building front-end assets."/></p>

## Prerequisite

- [Node](https://nodejs.org/en "Node") **Version v12.22.12** 
- [NPM](https://www.npmjs.com/ "Node") **Version v9.5.0** 

## Installation Steps

##### 1. On github clic on the "Use this template" button and create a new repository 

##### 2. Clone your new repository
##### 3. Run npm

```
npm install
```
##### 4. Build tree 

```
gulp build
```

A new assets folder is created in your current working directory. 
**Don't put your own assets in the assetsfolder!**

Check if everything went fine by opening index.html in your browser. 
`If` you see some styles , it's ok. 
`Else` , **check your stylsheets ands scripts links your your index.html**

##### 5. Add your own assets files 

All you assets need to be in the sources folder :
- ADD your Javascript files in the `js` folder
- ADD your Scss files in the `scss` folder
- ADD your Fonts files in the `fonts` folder
- ADD your Images files in the `images` folder


##### 6. Run the watch command

```
gulp watch
``` 

Your assets in the `sources` folder is automatically add or updated in the assets folder.

All modifications (saved changes) are watched by the watch command and your changes will be reflected in the `assets` folder.

## Available Commands

In the project directory, you can run:

### Default or build
**No images conversions in default/build command**
##### The default command work : Styles, Scripts and Fonts compilation.
```
gulp 
```
##### Run the default command : Styles, Scripts and Fonts compilations.
```
gulp build
```



### Run type by type of assets 

##### SCSS : Compile and mimify your scss files
```
gulp css
```

##### Javascript : Transpile and uglify your javascript files into ES5. All files with the extensions .js are transpiled.
```
gulp js
```
##### Images : Convert your images  to .webp images
```
gulp images
```
##### Fonts : Convert your .ttf fonts to .woff fonts

```
gulp fonts
```

##### Livereload : Styles, Scripts, Images and Fonts compilations.
**Save your changes to auto reload**

```
gulp watch
```
## Author

**Sonia Brunel**
- [Profile](https://github.com/Sonia-Brl "Sonia Brunel")
- [Email](mailto:brunelsonia@gmail.com?subject=Hi%20from%20gulpfile-front-assets "Hi!")
- [Website](https://soniabrunel.com "Welcome")

<h2 align="center">Support</h2>

<p align="center">If you like this project, Give it a ⭐ and Share it with friends!</p>


<p align="center">Made with ❤️</p>