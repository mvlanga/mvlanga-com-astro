---
title: js groupBy use case
slug: js-group-by
description: Just had a very cool use case for the javascript groupBy and toLocaleString method.
createdAt: 2025-02-28
tags: [ "javascript" ]
---

Just had a very cool use case for the #javascript groupBy and toLocaleString method.

Getting all posts from a specific Mastodon user and organizing them by month, with each section featuring a headline
that includes the full name of the month.

Crazy that the groupBy method, which is such an important feature today, has only been available since ES2024 (March
2024).

```
Object. groupBy(filteredData, ({ created_at }) =>
new Date(created_at). toLocaleString("en-US", { month: "Long" }),
) ;
```