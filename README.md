# mvlanga.com - v2

The second iteration of <a href="https://mvlanga.com" target="_blank">mvlanga.com</a> built
with <a href="https://astro.build/" target="_blank">Astro</a> and hosted
on <a href="https://www.netlify.com/" target="_blank">Netlify</a>.

<img src="https://api.netlify.com/api/v1/badges/8b628505-b368-4637-94db-d3819513e55e/deploy-status" alt="Netlify Status" />

## 🚨 Forking this repo

You can use this code for your own website, **with attribution**.

I like keeping my site open source but invested a large amount of time and effort into building and designing this
version of my website. Please don’t claim this work as your
own.

### TL;DR

Yes, you can fork this repo. Please give me proper credit by linking back
to [mvlanga.com](https://mvlanga.com). Thanks!

## 🛠 Installation & set up

1. Install and use the correct version of Node using [NVM](https://github.com/nvm-sh/nvm)

   ```sh
   nvm install
   ```

2. Install dependencies

   ```sh
   npm install
   ```

3. Start the development server

   ```sh
   npm run dev
   ```

## Prepare database for deploying to production 

I use [Turso](https://turso.tech/) for the database as Astro suggests for [Astro DB](https://docs.astro.build/en/guides/astro-db/).

To connect the database for production, refer to the [official guide on configuring and connecting the database](https://docs.astro.build/en/guides/astro-db/#connect-a-libsql-database-for-production) from Astro. Additionally, the `.env.example` file in the root directory will guide you in setting up the environment variables.

## 🚀 Building and running for production

For hosting this hybrid Astro app, I chose [Netlify](https://www.netlify.com/).

1. Generate the hybrid production build

   ```sh
   npm run build
   ```

## ⏲️ Previous iterations

[**v1** - mvlanga.com](https://v1.mvlanga.com)