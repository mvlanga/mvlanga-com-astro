---
title: After two years working with micro frontends, what did I learn?
slug: two-years-of-microfrontends-what-did-i-learn
description: "Now, shortly before my job change, I started to dig deeper on what I have learned after working for almost 2 years with microfrontends. What did I like? And what were the things which drove me crazy until the end?"
createdAt: 2026-03-07
tags: ["microfrontends", "single-spa"]
draft: true
---

## Prerequisites

I started working at [SENEC](https://senec.com) in November 2023 in a kinda small team.
My team developed various microservices which made primarily mass software update rollouts possible.
The frontend was built with Angular 17 and Angular Material for its components.

Since the beginning, I always heard that all of SENEC's frontends should be at some point embedded on our new cool portal which should bring the efforts of all teams together and replace various other frontends.
This initiative was called `newSENEC`. 

The first half year of onboarding and continuous developing of the angular application went by.
At some point I started asking my self, why the hell do we put so much effort into this angular frontend instead of focusing on embedding as it was **the** main goal for all frontends in our department.

After weeks talking to the team who developed the cool, crazy, large and also a little bit scary new portal I had all information we needed to really start with working on embedding.

### So, what was the setup?

- [Single SPA](https://single-spa.js.org) for bringing together multiple JavaScript microfrontends into one frontend application
- A Component Library built with [React](https://react.dev) and [MUI Material](https://mui.com/material-ui)
- Over 10 microfrontends
- 5 libraries (like `micro-frontend-manager`) 
- 6 providers (like `auth-provider`)
- [Shared dependencies](https://single-spa.js.org/docs/recommended-setup/#shared-dependencies) for `react`, `mui/material`, `component-library` and all custom `providers`

### First lessons

Now, two years later, we can already extract some first lessons out of this information.

#### Regarding shared dependencies

Shared dependencies are very nice in theory, the largest benefit is that the client doesn't need to load all the dependencies multiple times (in fact, one time for each microfrontend). To be honest, no other benefit which I noticed by working with them comes into my mind right now.

The problem with that: How the hell should you update major dependencies 


# Problems

- Shared emotion cache
- Global styling?