---
title: Lazy Loading ui-router states with ocLazyLoad and ui-router-extras futureStates
date: 2014-08-26 07:48
description: Fasten your app by reducing JS payload
tags: [requirejs, ocLazyload, ui-router-extras, future states]
cta: Read about how to lazy load ui-router states.
subject: JavaScript
layout: post
---

Recently, I was able to implement lazy loading of ui-router in my single page app. I had to <!-- more --> extend myself a little bit because
the base ui-router package doesn't come with all the supports for this. It provides a `stateNotFound` event
that can be tapped into by your code to register the new states. This is where `futureStates` API by [ui-router-extras](https://github.com/christopherthielen/ui-router-extras) comes in. The latter
allows you to use any lazy loading Angular mechanism for loading a missing state. 

So to reiterate, the `futureStates` implementation is all about describing the state that is to be lazily loaded. The way to lazy load is left to you to define. We will use [ocLazyLoad](https://github.com/ocombe/ocLazyLoad) for our purposes.

I have a GitHub repo showing a test app demonstrating this [here](https://github.com/charandas/ui-router-lazy-example).

The App runs [here](http://infinitecaus.es/ui-router-lazy-example/app). The pertinent code is in [app.js](https://github.com/charandas/ui-router-lazy-example/blob/master/app/js/app.js), shown in gist here:
{%gist charandas/831560ade572ad9739cd %}

### What I learned through this ###
1. `requirejs` modules that span multiple files can be used for lazy loading a ui-router state. However, as of yet, such
support is not available in [angularAMD](https://github.com/marcoslin/angularAMD) package. Use ocLazyLoad if your app is set up
that way, like in our example.
2. `reconfig: true` is needed when lazily loaded states are related in any way in hierarchy. If you find this to be inaccurate, let me know
but that's what I found.
3. One particular advantage of `$futureStateProvider.addResolve` is if you return a full thennable promise chain from the function
passed as its argument, ui-router-extras won't reject any transitions until that promise is resolved. Thus, you could read some app
settings from a service, and on the basis of them, register specific states.

That's it. I should mention that none of this would have been possible if not for the exciting packages by @ChrisThielen 
([ui-router-extras](https://github.com/christopherthielen/ui-router-extras)) and @OCombe ([ocLazyLoad](https://github.com/ocombe/ocLazyLoad)). Check them out on GitHub and Twitter. Hope you enjoy using these techniques in your app.


