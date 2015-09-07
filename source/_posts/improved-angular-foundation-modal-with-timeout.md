---
title: Improved boilerplate when using Madmimi's angular-foundation $modal
date: 2014-07-04 03:15
description: Wrap angular-foundation $modal so as to add goodies
cta: Read about extending $modal from angular-foundation
subject: Angular Services
layout: post
---


In my earlier {% post_link angular-foundation-modal-with-timeout post%}, I presented the problem of not being able to intercept the closing/dismissing of a modal from the UI. While searching for an answer <!-- more --> to that problem I ended up improving and simplifying the ModalService wrapper.

### Salient Features of this Update ###

1. `closed` boolean: the wrapper around `$modal`, namely `ModalService`, now relies on a boolean for gating the inner instances close and dismiss methods. This goes a long way in simplifying our timeout code. We no longer cancel the timeout in the event of a manual close or instead. The noop like behavior of close and dismiss wrappers doesn't
hurt at all.
2. `unregister` and pooling: `unregister` is a private method that keeps the modal `pool` (a newly introduced private data structure for book-keeping) maintained in event of user-enforced close
or dismiss. You will notice that the `ModalInstanceCtrl` has the extra `unregister` calls. This is the answer to my question of intercepting dismissing/closing from the UI. Once a modal is unregistered the boolean that we introduced protects from using the inner instance again.
3. `cleanup` API: Also, we introduced a way for your application to close a bunch of modals to be closed automatically in any given scenario.

{% gist  charandas/285194555dc7f1c028d7 %}

{% gist charandas/5d51337339fb3006c205 %}

Also, please note that I define two different gists here for readability. You can have them in the same file, so as to use the private `unregister` function in `ModalInstanceCtrl`.

### In Closing ###
It was a process getting to know `angular-foundation` `$modal` service. For instance, the very fact that $modalInstance injected into the `ModalInstanceCtrl`
was the very instance that `$modal.open` returns took some time to sink in. What are you doing with `angular-foundation`: get in touch as we could likely benefit from each-other's
know-how.
 