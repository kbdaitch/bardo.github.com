---
title: Using keen-js with jspm - use superagent 1.3
date: 2015-09-02 16:32
description: jspm resolve comes to rescue
tags: [jspm, keen-js, superagent]
cta: Read about the quick fix
subject: module loaders
layout: post
---

[keen-js](https://github.com/keen/keen-js/blob/master/package.json) specifies
`superagent: '^0.21.0` as of version `3.2.7`.

If you are using JSPM to include keen-js, and getting the CORS error on client API calls like so:
{%gist charandas/f148c9cca1ec9412e8b7 %}

`superagent` must have streamlined their browser lib in the recent versions. My test with 1.3.0 went well. How do we fix this until `keen-js` moves on:

1. Ensure you are using `npm:keen-js` and not `github:keen/keen-js`.
2. Now install superagent 1.3.0. `jspm install npm:superagent@1.3.0`
3. You will have two forks of superagent now. Do `jspm resolve --only npm:superagent@1.3.0`

Voila! You are done. You will no longer get the error, and `client` API calls just work.