---
title: Semantic Versioning
date: 2014-03-03 20:42
description: Why semver is important.
tags: [semver, npmjs, bower, pip, rubygems, dependencies]
cta: Read about semver.
subject: Software Versioning
layout: post
---

Semantic versioning entails tagging your software at every stage of the development process. The term and scheme was proposed by [Tom
Preston-Werner](http://en.wikipedia.org/wiki/Tom_Preston-Werner) as a way to help developers manage what he called "dependency hell". Also known as `semver`, it has now reached the version
2.0.0 and I certainly feel that having it standardized as such would provide direction for the development community at large.

### Why am I writing this post ###
Well, perhaps because Erik Toth recently urged the community to take semver seriously on Nodeday.
[Here](http://totherik.github.io/NodeDay2014/#0) are his full slides. In addition, I am resurrecting my blog today so
thought of it as a good topic to boot with.

### Introduction ###
On a first look, it is really easy to absorb the tenets of `semver`. Basically, a version consists of 3 parts: `MAJOR`, `MINOR` and `PATCH`.
Semantic versioning dictates that all of these parts can incremented at specific points in the development lifecycle. The [semver.org](http://semver.org) site tells us to increment:

1. MAJOR version when you make incompatible API changes,
2. MINOR version when you add functionality in a backwards-compatible manner, and
3. PATCH version when you make backwards-compatible bug fixes.

### Specifying Versions ###
All examples of version specification below assume two packages A and B, with A depending on B's 1.9.x version.
The psuedo code for semver spec is provided, which more or less, resembles most package manager
configuration formats.

#### The Regular Operators####
Most package managers support the logical operators such as `>`, `<` and `=` for specifying dependencies. For `semver` in `npmjs`,
take a look at the [doc](https://www.npmjs.org/doc/misc/semver.html). These operators together can be used to very succintly tell
which versions of a certain package your package depends on.

#### Pessimistic Version Constraint ####
It's always recommended to keep away from the optmistic `>= 1.8.3` in favor of the pessmistic `>= 1.8.3, < 1.9.0`, also
referred to as a compound requirement - meaning it is composed of more than one condition.
```js
{
  dependencies: {
    'B': '>= 1.8.3 < 1.9.0'
  }
}
```

Some package managers provide a tilde shorthand for this. In [npmjs](https://www.npmjs.org/doc/misc/semver.html),
one would use `~X.Y` to mean the <em>reasonably close</em> or pessimistic definition.


```js
{
  dependencies: {
    'B': '~1.8.3'
  }
}
```

In [rubygems](http://guides.rubygems.org/patterns/#pessimistic_version_constraint), this is expressed by `~> X.Y` or the <em>twiddle-wakka</em>.
If you want prerelease versions, rubygems makes you fallback to the explicit compound requirement.

### How does this pan out in development? ###
We will use a scenario entailing a dependency relationship between two packages A and B.

1. A is written with a specified dependency on B's `latest`. However, it implicitly depended upon B `1.9.x`.
2. B is being developed further and ends up having API breaking changes and being versioned at `2.0.0`.
3. A's developer pulls in the latest B code and runs into some issues. She uses her dependency manager (`npm`, `bower`, `rubygems`, `pip`, what have you) to determine that B has incremented the `MAJOR` version. She makes the dependency more explicitly `1.9.x` and voila, the issue is resolved.
