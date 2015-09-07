---
title: Unit-test your ui-router configuration
date: 2014-06-11 17:26
description: Unit-test your ui-router configuration
cta: Read about how to unit-test your app's states
subject: JavaScript
layout: post
---

`ui-router` comes with a lot of goodies through it's rich states configuration. If you are like me and are tapping into all <!-- more --> of what `$stateProvider.state` method provides through its parameters, all your data is injected through resolvers and state's data object, while all the enter/exit state logic comes in through the handlers (`onEnter` and `onExit`).

As you get initiated into ui-router, you may begin to notice that your code is slowly migrating from controllers to the state configuration. Controller thus becomes, more and more, a decorator of the view. This is all good as long as unit-test coverage doesn't suffer. To ensure your states are well tested, take heart and start writing unit-tests to measure whether your states are happy!

### Testing the states ###
My initial motivation came from this stack overflow [post](http://stackoverflow.com/questions/20433485/angular-ui-router-unit-testing-states-to-urls), so feel free to give it a read.
I will try to cover what worked for me.

> **Pro-tip - Break it into modules:**
> A gargantuan state configuration is not only a curse to the eyes but is difficult to test as well. Let's start by breaking the route configuration into smaller modules. Doing ui-router state registration
> across modules is extremely friendly: it queues any child states until parents are discovered. Hence, the ordering of modules while registering doesn't matter.

My code throughout would be `requirejs`, feel free to cater to your own module loader, or the lack thereof. We will have three modules, one for root controller `app` state, and two more for `a` and
`b` module states. We would mostly leave out `b` for posterity.

{%gist charandas/16f2a5552c2b419002ae %}

For testing the `app` state, lets target the following:

1. The resolvers do what they are asked to do.
2. The url of the state matches the requirement.
3. Other sanity checks such as checking whether `abstract` is `true`.

Which kinda boils down to:

{%gist charandas/eb96cd89f49a8739b644 %}

#### Reality check #####
1. We checked that `SettingsService` is being invoked as we intend.
2. We matched the url without visiting the state since it is an abstract state.
3. We did the sanity checks as mentioned above.

#### Module A - Lets nail this down ####

For testing `A` module, lets mock out a parent `app` state so we can isolate our testing to A.

{%gist charandas/72db4ec5521f0f3a7cea %}

{%gist charandas/ec43d043654d0f014370 %}

and its tests:

{%gist charandas/b971857be3cb3446f798 %}

### Summarizing ###
I covered a good set of assertions for your states. What are you doing in addition to this, or different from this? Hit me up with your interesting thoughts.
