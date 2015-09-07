---
title: Using a root controller with ui-router
date: 2014-05-11 13:06
description: Instantiating a root controller without wasting a url, and also not coding it in your HTML.
cta: Read about using one with ui-router
subject: HTML5 Client Apps
layout: post
---

ui-router is a great tool for those of us in the Angular realm. It gives a more logical way to represent the state of an application than just plain old URLs. This post is not going to be a <!-- more --> hands-on tutorial post, but the intent is throw around some ideas about structuring the root controller of your angular app.

### Root Controller and Saving the Root URL ###
Root controller allows one to instantiate some global data and services, and maybe even setup a `$global` service to act as a shim.

Root controller can often be seen in the base `index.html` of a project. In this case, it is used by calling the `ng-controller` directive on a `<head>` or `<body>` tag.
Alternatively, it could be mapped to a URL (the base URL for instance: "/"), and loaded via an `ng-view` in `index.html`; I am personally not a fan of using up the root URL for this purpose.

With ui-router's `abstract` state feature, one could save the URL as well as save hardcoding a controller definition in HTML. I think this is fruitful, as the `routes.js` (or whatever you call it)
ends up becoming a decisive place to check controller mappings.

> Basically, the `abstract` state buys us the ability for that url or state to be unreachable.
> This means that one can only
> instantiate that state while visiting one of its children states - Magikal!
>
> -- <cite>Every seasoned ui-router user</cite>


The only thing to keep in mind is to use a `template`/`templateUrl` for abstract states that contains a `<ui-view />`. This way, you ensure there is an unbroken line of nested `<ui-view>` hierarchy.

My `routes.js` looks similar to:
{% gist charandas/660802f445a9edb06fe3 %}

Then, one could also follow the same pattern for the root controller of the print module of the app; have the abstract state and instantiate the root print controller on that.

> Also, as noted in the comments, there is nothing stopping us from loading a subset of states in a base template, say
> `index.html`, and the leftovers in another called `print.html`. In fact, the only thing
> ui-router is concerned with is that each of these templates have a `<ui-view />`. This way, you get different base
> layouts and styling for different modules of your application.
>
> -- <cite>Every seasoned ui-router user</cite>

