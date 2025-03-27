---
title: Creating a Header & Navigation with React and motion.dev
slug: creating-a-header-and-navigation-with-react-and-motion-dev
description: Explore some key principles of great UX as we build a header and navigation with React and motion.dev (formerly Framer Motion), focusing on sleek interactions for an elegant, functional interface.
createdAt: 2025-03-22
tags: [ "ux", "javascript", "react", "motion.dev" ]
draft: true
---

## What makes great UX?

Over the years of exploring the web — seeing it through the eyes of both a designer and a developer — I’ve come across a
few details that I absolutely fell in love with. Some are subtle, almost imperceptible, while others feel fundamental to
what I believe defines a great user experience.

- **Keep It Subtle**

  Headers and navigation bars are omnipresent elements. Rather than overwhelming the user, they should blend into the
  background so that the content remains the focal point. Avoid flashy designs that distract—aim for an understated
  elegance.

- **Small Details Matter**

  Consider the iPhone’s feature where tapping the top of the display instantly scrolls you back to the beginning of a
  page. This small interaction has become an indispensable tool for many users. It perfectly illustrates how a seemingly
  minor detail can add significant value to the user experience.

- **Snappy Animations**

  Animations are a powerful tool when used correctly. They should be quick, responsive, and predictable. Slow or erratic
  animations can frustrate users and detract from the overall experience. Well-timed transitions, on the other hand,
  enhance usability and provide satisfying feedback.

## Let’s Dive In

Now that we’ve covered some core principles behind great UX, let’s put theory into practice by building our own header
and navigation. Follow along as we create a design that’s both minimalistic and user-friendly.

## HTML Structure

```jsx
<header className="fixed top-4 left-4 z-10 sm:top-10 sm:left-10">
    <a
            className=""
            aria-label="Moriz von Langa wordmark"
            href="/">
        mvlanga
    </a>
</header>

<div className="fixed top-4 right-4 z-20 sm:top-10 sm:right-10">
  <button class="rounded-3xl px-8 py-4 text-white bg-neutral-900 hover:bg-purple"
          aria-expanded="false"
          aria-controls="main-menu"
          aria-label="open main menu">
    menu
  </button>
  <nav></nav>
</div>
```

But wouldn’t it be easier to wrap both elements in a single <div> for easier positioning?

Technically, yes—but keep in mind that doing so can create an issue: the space between the header and navigation would
become a non-interactive area, blocking clicks. This can be frustrating, especially when the header and navigation are
visually separated.

However, if both elements are part of a unified design—like a full-width menu bar with a background—then grouping them
inside a single container makes perfect sense for easier positioning and alignment.