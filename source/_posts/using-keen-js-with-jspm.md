---
title: Using keen-js with jspm - use superagent 1.3
date: 2015-09-02 16:32
description: jspm resolve comes to rescue
cta: Read about the quick fix
subject: module loaders
layout: post
---

`superagent` must have streamlined their browser lib in the recent versions. My test with 1.3.0 went well. However with `keen-js` <!-- more --> [depending](https://github.com/keen/keen-js/blob/master/package.json) on `^0.21.0` as of version `3.2.7`, you will get this CORS error (different from the IE CORS issue outlined [here](https://github.com/keen/keen-js/issues/237)) on client API calls like so:
{%gist charandas/f148c9cca1ec9412e8b7 %}

A temporary way to fix it until `keen-js` moves on is to:

1. Ensure you are using `npm:keen-js` and not `github:keen/keen-js`.
2. Now install superagent 1.3.0. `jspm install npm:superagent@1.3.0`
3. You will have two forks of superagent now. Do `jspm resolve --only npm:superagent@1.3.0`

Voila! You are done. You will no longer get the error, and `client` API calls just work.