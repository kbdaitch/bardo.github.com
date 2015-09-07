---
title: Patch angular-foundation to expose a form controller
date: 2014-06-21 18:51
description: Add the ability to $setValidity and more on a form inside a modal
cta: Read about how to expose the form controller from within transcluded modal DOM
subject: JavaScript
layout: post
---

[Angular-foundation](http://madmimi.github.io/angular-foundation/) from Madmimi comes with a modal service that works exceptionally well
for pushing modals onto your app views. However, one thing that I found to be lacking is <!-- more --> the ability to access a 
[FormController](https://docs.angularjs.org/api/ng/type/form.FormController) from the modal DOM. I ended up patching my copy
of angular-foundation and thought the quick fix might be useful for others.

### Originally mentioned here ###
This stack overflow [post](http://stackoverflow.com/questions/15935224/angularjs-access-formcontroller-of-a-form-placed-inside-transcluded-directive-f) came handy. Highy recommended reading.

### Changeset ###
Assuming you are working with their templates dist JS, namely `mm-foundation-tpls.js`,

1. Add `formCtrl: '='` to `modalWindow` directive
2. Set it to the desired form controller in the `link` function
3. Expose it on the outside scope by specifying in `attrs`

Here is the gist:
{%gist charandas/02d177e71c8de35e4db1 %}

### How to Use ###

Now to access it in `ModalInstanceCtrl`, access it via `$scope.$parent.formCtrl`. Although a little hacky, it does the job.

The readers are encouraged to covert this to a PR, if they so wish. One possible way might be through exposing a property on the instance 
returned by `$modal.open`. Until then, use this patch on your own copy of `mm-foundation.js`.



