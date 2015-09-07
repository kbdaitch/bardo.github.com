---
title: Reducing boilerplate when using Madmimi's angular-foundation $modal
date: 2014-06-07 12:52
description: Wrap angular-foundation $modal to reduce boilerplate.
cta: Read about extending $modal from angular-foundation
subject: Angular Services
layout: post
---

[Angular-foundation](http://madmimi.github.io/angular-foundation/) from Madmimi comes with a modal service that can be pretty useful when pushing modals onto the views of your angular app. The API is pretty flexible as provided [here](http://madmimi.github.io/angular-foundation/#/modal). <!-- more -->

As mentioned in the example in the JavaScript, you can accomplish a range of modals pretty easily. However, for simpler modals, this can get really tedious if all your ModalInstanceCtrl is going to do is bringing the modal up and dismissing/closing it. Instead, here is my take on the modal instance controller.
{% gist charandas/140341acbc49a8a3f97b %}

Also, a wrapper around `$modal`, namely `ModalService` could be written to automatically plug this controller in with some template defaults. Like so,
{%gist charandas/ed6bf36215888c4a8cba %}

### What did we accomplish ###

1. `timeout`: As you can see the service written by us has a parameter called `timeout`. This ensures that we have ability to push self-poppable modals onto the view.
L65 ensures that the modal made has a scheduled timeout that can dismiss it. Not only that, by using the close function of our wrapper, we can cancel any scheduled timeouts in case of a user action such as "our app becoming active".
2. `instance`: The open function returns a wrapped object containing the instance returned by `$modal.open`. You should use this to specify behavior on modal close and dismiss.
3. `resolve`: the resolve attribute in the open function injected some generic dependencies that your templates can go off of. `extraParams` here is just one simple way to push to the scope of `ModalInstanceCtrl` a generic object's content. This can enable varied templates to be used with this service wrapper.
4. `template`: the service also sets up the default template that you can override through the params of the open function.

### In action ###
{%gist charandas/689e2c30ddddec25103d %}

### With extra parmas ###
Some pseudo code:
{%gist charandas/6825b1f2d81dadd9fc89 %}


### <a name="improving"></a> Dare you to improve it ###
That's it. Do you have better suggestions for intercepting `close` and `dismiss` on the inner instance? I can currently intercept only when my wrapper's `cancel` or `dismiss` are used? So essentially the case when a modal with timeout is user-poppable. How would you cancel the scheduled timeout in that case?



