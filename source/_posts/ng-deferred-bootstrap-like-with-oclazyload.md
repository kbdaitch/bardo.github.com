---
title: Use $ocLazyLoad to achieve your own angular-deferred-bootstrap
date: 2014-10-13 20:48
description: futureStates.addResolve with $ocLazyLoad for eager loading
tags: [requirejs, ocLazyload, ui-router-extras, non-future states, angular-deferred-bootstrap, ng-deferred-bootstrap, RAII]
cta: Read about how to acheive your own angular-deferred-bootstrap in less than 100 lines of code
subject: JavaScript
layout: post
---

A few days ago, it dawned on me that the full futureStates implemention as shown in my previous blog [post](http://bardo.io/2014/08/26/oclazyload-future-states/) was not needed by my app. I was okay with eagerly loading the JavaScript, however I wanted to acheive two things, namely,

1. Restrict what JavaScript I wanted to load in the entire lifecyle of an app. To me, it was pretty deterministic what I wanted to load or not depending on a remote JSON resource.
2. I wanted some abilitites of the package [angular-deferred-bootstrap](https://github.com/philippd/angular-deferred-bootstrap) but in a way that I didn't have replication of services and DI-injected resources that they fetched. I wanted these because `ui-router` would otherwise force me to
callout certain resolve-names needlessly. So for instance, if I have a `ListingService` that on app start, loads 
a `listings.json` using a function `ListingService.getAll` and subsequently, I could make other calls to `LIstingService`
such as `query` or `get`. So I did the `getAll` in the root state, and then proceeded to use the `ListingService` like so:
{%gist kbdaitch/c00c63a47a8f921773d0 %}
 If you notice, I would now be forced to couple the `allListings` resource with my use of `ListingService` to be able to guarantee that all listings have been fetched. The reasoning here lies in the fact that `ui-router` performs resolver
 resolutions asynchronously. There is no concept of first doing it for the root states, and then the child states.

## How not to couple the services to their resource promise  ##

Lets get into our decoupled implemenation. Looks very similar to the previous post with `futureStateProvider.futureState` calls stripped out. The `futureStateProvider.addResolve` is all what we need to delay `ui-router` routing.
Also, the `ListingService` would now need to be a provider since its being used with `futureStateProvider` in the app's
booting process. With it being a provider, you cannot have `$ngResource` in its code, however `$http` can serve you as well
hopefully.

{%gist kbdaitch/35b51979d7e1291ef34b %}

### Why name our example module raiiServicesExample ###
RAII stands for Resouce Allocation is Initialization. Thanks to my first boss for mentoring in those early years, these acronyms mean a ton and come handy. This is another description for what we have now in `ListingService` when the app has finished loading.