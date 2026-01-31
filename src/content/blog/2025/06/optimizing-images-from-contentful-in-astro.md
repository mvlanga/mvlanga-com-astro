---
title: Optimizing Images from Contentful in Astro (So Editors Don’t Have To)
slug: optimizing-images-from-contentful-in-astro
description: "Are unoptimised images affecting your site's performance? Learn how to use Contentful’s Images API to automatically resize, compress and convert images. In this post, we’ll create a lightweight Astro component that provides optimised, layout-stable images."
createdAt: 2025-06-02
tags: ["astro", "contentful"]
---

We’ve all been there: someone uploads a 4MB PNG straight from their phone and drops it into a blog post while you, the developer, are left banging your head against the monitor.

Thankfully, there is relief. No more headbanging required. Contentful provides everything you need to handle this gracefully, we just need start using it.

In this post, I’ll walk you through how I use the Contentful Images API in an Astro project to:

- Optimize image size, format and compression on the fly
- Respect layout, no Cumulative Layout Shift (CLS)

## The Problem: Unoptimized Images Everywhere

Out of the box, Contentful doesn’t do any automatic optimization beyond giving you the raw file URL. That means whatever image gets uploaded, JPG, PNG or whatever got uploaded.

If you care about performance, that’s a problem. But it’s not reasonable to expect non-devs to optimize and resize images manually. That’s where the Contentful Images API comes in.

## What the Image API Actually Does

The Images API lets you apply transformations to images just by tweaking the URL. Things like:

```
https://images.ctfassets.net/.../hero.jpg?w=1200&fm=avif&q=80
```

- `w=800` to resize the image to 800px wide
- `fm=webp` or `fm=avif` to convert the format
- `q=80` to compress the image quality
- `fit=thumb` or `fit=fill` to control cropping

Every unique set of parameters gets processed once, then cached at the CDN level. So Contentful isn’t reprocessing the image every time you load it.

## Using It in Astro

I built a small utility that wraps all this up into a small Astro component. Here’s what it looks like in practice:

```typescript jsx
// ContentfulImage.astro

---
import type { AssetFile } from "contentful";
import {
    optimizeContentfulImage,
    type OptimizeContentfulImageProps,
} from "src/lib/contentful/optimize-contentful-image";
import { Image } from "astro:assets";
import { clsx } from "clsx";

type Props = {
    file: AssetFile;
    alt: string;
    class?: string;
} & Partial<OptimizeContentfulImageProps>;

const {
    file,
    alt,
    class: additionalClasses,
    ...optimizeContentfulImageProps
} = Astro.props;

const { url, width, height } = optimizeContentfulImage(
    file,
    optimizeContentfulImageProps,
);
---

<Image
    class={clsx("inline-block", additionalClasses)}
    src={url}
    width={width}
    height={height}
    alt={alt}
    loading="eager"
/>
```

```typescript jsx
// optimize-contentful-image.ts

import type { AssetFile } from "contentful";

export type OptimizeContentfulImageProps = {
	width?: number;
	quality?: number;
};

export const optimizeContentfulImage = (
	file: AssetFile,
	{ width: newWidth, quality = 80 }: OptimizeContentfulImageProps = {},
) => {
	const url = new URL(file.url.replace("//", "https://"));

	const { width: originalWidth, height: originalHeight } =
		file.details.image!;

	let newHeight = originalHeight;
	if (newWidth) {
		url.searchParams.set("w", newWidth.toString());
		const scale = newWidth / originalWidth;
		newHeight = Math.round(originalHeight * scale);
	}

	url.searchParams.set("q", quality.toString());
	url.searchParams.set("fm", "avif");

	return {
		url: url.toString(),
		width: newWidth ?? originalWidth,
		height: newHeight,
	};
};
```

### Why This Prevents Cumulative Layout Shift (CLS)

One of the big Core Web Vitals wins here is setting width and height explicitly. If you don’t, the browser doesn’t know how much space to reserve for the image, which can cause layout shifts when the image finally loads. That’s bad news for Core Web Vitals.

By calculating the resized dimensions server-side and passing them to `<Image />`, we get layout stability for free.

## Let’s Use It

Once you’ve got the component in place, using it is dead simple:

```typescript jsx
<ContentfulImage
    file={entry.fields.image.fields.file}
    alt={entry.fields.image.fields.title}
    width={800}
/>
```

## What Editors See

From a content editor’s point of view, they just upload the image. That’s it. The optimization, resizing, and format conversion all happen transparently via the URL transformation.

**They just upload, hit publish, and everything works.**

## What about out-of-the-box solutions?

There are great tools out there that do a lot of the heavy lifting for you. One I was recently pointed to is [Unpic](https://unpic.pics/), a super handy tool for optimizing images from various sources, including Contentful.

Big thanks to [@cpenned](https://www.reddit.com/user/cpenned) for letting me know!

## Conclusion

This little setup gives us the best of both worlds:

- Editors don’t have to worry about formats or sizes
- Developers don’t have to fix slow pages or layout shifts
- Users get fast, crisp images no matter what device they’re on

If you use Astro and Contentful together, it's an obvious choice. The setup took about 30 minutes and was absolutely worth it.

Happy coding!
