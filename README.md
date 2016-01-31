# Ooahh
![Ooahh](https://raw.githubusercontent.com/active9/ooahh/master/Ooahh.png)

Your nodeJS packages as Native Desktop Apps. [http://ooahh.com/](http://ooahh.com/)

# Introduction

Ooahh combines any nodejs code with pre built cross-platform binaries allowing instant deployment of HTML5 & Javascript based native applications on Windows, Mac, or Linux operating systems. With Ooahh any web developer can create desktop applications using only HTML, CSS, & JS. Ooahh bridges the gap between programmers and web developers. With 2d, 3d, multimedia, & headless support your creativity is the limit.

# Installing

To install Ooahh run:

```bash
npm install -g ooahh
```

# Building
Step 1: Create an Ooahh app from scratch or using an example.
```hint
ooahh --init ./ooahh/
```

Step 2:Add your application code to the generated Ooahh source at:
```hint
./ooahh/
```
Step 3: Use Ooahh to generate binaries of your nodejs app
```hint
ooahh --generate ./ooahh/
```
NOTE: You can port existing web sites & existing nodejs products into applications using Ooahh including those with either/both native & custom modules.

# Building With .ooahh

You can also build your ooahh apps by adding a .ooahh file with the following data within it in your projects main folder. For example if your app builds using: ooahh --generate /app/source adding the file /app/.ooahh and entering the following data:
```js
module.exports = {
	source: 'tests',
	cache: 'cache',
	build: 'build'
}
```
will allow you to build your application from that folder by simply typing ooahh in your
terminal. This method allows deploying ooahh apps easily without the need for switches and
paths sent to ooahh.

# GETTING STARTED

To get started head over to http://ooahh.com/documentation.html to view the latest tutorial on how to create and redistribute your Ooahh applications. The tutorial on how to use Ooahh is outside the scope of this readme.

# PHILOSOPHY

The Ooahh philosophy is to provide a free open-source application framework using web technologies. The Ooahh goal is to allow anyone to use web technology to power their own native desktop applications that run and deploy cross-platform. With a permissive MIT license you may redeploy, resell, & redistribute applications built using Ooahh free of charge. This makes Ooahh a perfect candidate for anyone looking to create a desktop application using only web technologies.

# OOAHH IS GOOD FOR?
Ooahh is good for:
 - When other web frameworks are getting stale.
 - Turning application dreams into reality.
 - If you or your company is looking to create an application of any kind.
 - If you are a special effects team that requires an actor interactive tool to use during production.
 - If you are a software company looking to build your app on all desktop platforms.
 - If you would like to convert your existing web site into a desktop application.
 - If you have a senior exit essay and you are required to present your ideas.
 - If you work in a lab and require extra application tools that can be created, modified, and distributed easily.
 - If you are trying to prototype an idea or concept visually.
 - If you are looking to build a 2d or 3d video game.
 - If you want to create your own music player.
 - If you want to create your own web browser.
 - If your company intranet requires a customized browser that is skinned and secure.
 - Unlimited potential.

# CONTRIBUTING

The core of Ooahh is based on the great work by the folks at nwjs.io . If you are looking to contribute a feature to the core of Ooahh it is best to fork nwjs and submit a pull request to enable your feature request. If you find a bug in the build system with Ooahh please open an issue @github.

# SUPPORTED PLATFORMS

All x86/x64 based systems running:
 - Windows (xp,2k,2008,vista,7,8,10)
 - Mac (darwin+)
 - Linux (apt, deb, yum)

# TODO

If you are feeling foggy and want to contribute fork Ooahh and have at it! Then create a PR for your resulting todo fix.

 - Add a secondary GPL release to enable MP3/MP4 technologies.
 - Mobile Operating System support
 - Easily create an app from a website passed like > ooahh --website http://www.ooahh.com/ ./build/

# CREDITS

If you would like to add Ooahh to your video production project, multimedia project, or video game credit roll we totally encourage it! Let us know about it so we can add you to our list of projects using Ooahh.
