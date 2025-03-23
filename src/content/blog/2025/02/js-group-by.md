---
title: Organise arrays of objects, including dates, by month using JavaScript's GroupBy method
slug: organize-arrays-objects-dates-by-month-javascript-groupby
description: Learn how to use the JavaScript groupBy method (ES2024) to organise arrays of objects containing dates by month, with each section displaying the full month name using toLocaleString().
createdAt: 2025-02-28
tags: [ "javascript" ]
draft: true
---

# Organize Arrays of Objects by Month Using JavaScript's groupBy Method (ES2024)

In this post, we'll explore how to efficiently organize arrays of objects containing dates by month in JavaScript.
Specifically, we'll use the `groupBy` method from ES2024 to group data, displaying each section with the
full month name using `toLocaleString()`.

## A Simple and Powerful Use Case

While working on a recent project, I faced a challenge of organizing a collection of blog posts by the month they were
created. The goal was to display each month in a structured way, with a headline showing the full month name, making it
easier for users to navigate the posts over time.

This might sound complex, but with the new `groupBy` method in JavaScript (introduced in ES2024), this task becomes a
breeze. In this blog post, I’ll walk you through how to use this feature to simplify the process of grouping data by
month and presenting it in a user-friendly format.

## What Is groupBy and Why Is It Exciting?

The `groupBy` method in JavaScript, which was officially introduced in ES2024, allows us to group an array of objects
based on a specific property or value. This can be incredibly useful for organizing data in many scenarios, such as
grouping blog posts by their creation date.

This method eliminates the need for more verbose, error-prone manual implementations of grouping logic, giving
developers a cleaner and more efficient way to manipulate and organize their data.

## Breaking Down the Code

Here's the core of the solution for organizing blog posts by month:

```javascript
Object.groupBy(filteredData, ({createdAt}) =>
    createdAt.toLocaleString("en-US", {month: "long"})
);
```

Let's walk through how this code works:

- `filteredData`: This is the array of blog post objects, each containing a `createdAt` javascript date object.

- `Object.groupBy()`: This new method is used to group the array of blog posts. It accepts a callback function, which
  extracts the month from each blog post’s `createdAt` date.

- `toLocaleString("en-US", { month: "long" })`: Formats the Date object to return the full name of the month (e.g., "
  January," "February"), which serves as the key for our grouping.

## Going Further: Grouping by Month and Year

For projects that span multiple years, it’s helpful to group posts by both the month and the year. This will allow us to
distinguish between posts from the same month in different years.

Here’s how we can modify the code to achieve this:

```javascript
Object.groupBy(filteredBlogPosts, ({data: {createdAt}}) => {
    const isThisYear =
        createdAt.getFullYear() === new Date().getFullYear();

    return createdAt.toLocaleString("en-US", {
        month: "long",
        ...(isThisYear ? {} : {year: "numeric"}),
    });
});
```

In this updated version:

- `createdAt.getFullYear()`: Checks if the post was created in the current year.

- `...(isThisYear ? {} : { year: "numeric" })`: Conditionally adds the year to the grouping key. If the post is from the
  current year, we display only the month; if it’s from a previous year, both the month and year are included.

## Displaying the Grouped Data

Once we’ve grouped the posts by month (and optionally by year), we can loop through the result and display each group in
a well-structured format. Here's how you can display each month’s posts:

```javascript
const groupedPosts = Object.groupBy(filteredData, ({created_at}) =>
    new Date(created_at).toLocaleString("en-US", {month: "long"})
);

for (const [month, posts] of Object.entries(groupedPosts)) {
    console.log(`\n${month}:`);
    posts.forEach(post => console.log(post.title));
}
```

This code outputs a clean, organized display where each month has its own section, with all posts from that month listed
underneath. For example:

```text
February:
- Post Title 4

January:
- Post Title 3
- Post Title 2

November 2024:
- Post Title 1
```

## Why This Is Awesome

The introduction of the `groupBy` method in ES2024 has been a game-changer for developers working with data. It
simplifies
tasks that would otherwise require complex loops or additional libraries. By using `groupBy`, developers can now
organize
and manipulate arrays of objects in an intuitive and efficient manner.

In this case, organizing blog posts by month is a perfect example of how powerful this new feature can be. By combining
groupBy with `toLocaleString()`, we can display time-based data in a way that’s both clean and user-friendly.

## Conclusion

In summary, JavaScript's new groupBy method in ES2024 makes organizing arrays of objects by specific properties (like
dates) much simpler. By using `toLocaleString()` to format the month name, we can display data in a structured and
readable way, whether it’s for blog posts or any other time-based data.

With minimal code, you can create intuitive data structures and improve the usability of your web applications. If
you’re working with time-based data, this method will definitely make your life easier.

Happy coding!