---
title: Deploying a Leaf application to Heroku
date: 2023-06-23
author: Michael Darko
github: mychidarko
twitter: '@mychidarko'
---

<!-- markdownlint-disable no-bare-urls -->

<img src="https://media.dev.to/cdn-cgi/image/width=1000,height=420,fit=cover,gravity=auto,format=auto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fuploads%2Farticles%2Fyfkwafxb6d9iskpqopl1.jpg" style="border-radius: 8px; margin-bottom: 15px;" alt="" />

<p>
This is a guide on how to deploy a Leaf application to Heroku. Heroku is a platform as a service (PaaS) that enables developers to build, run, and operate applications entirely in the cloud. Create an account, tether a credit card, and prepare to build.
</p>

---

## What Are We Building?

This tutorial will guide you deploying your first Leaf application to Heroku. The same steps apply to Leaf MVC, Leaf API and Skeleton.

## Prerequisites

This tutorial assumes you have the following:

- A Leaf application
- A Heroku account
- The Heroku CLI installed

## 1. Create a new heroku app

From the dashboard, select create new app. Give your app a name, and select a region. The region should be the closest to your location.

<img width="810" alt="image" src="https://github.com/leafsphp/leaf/assets/26604242/f189892d-9164-4c1a-b396-b3b50066f118" style="border-radius: 10px;">

**Note that per Heroku's new terms, you should have a payment method connected.**

Clicking on create app, should take you to an empty new app page. From here, you can select the deploy tab, and connect your Github repository.

<img width="1262" alt="image" src="https://github.com/leafsphp/leaf/assets/26604242/89356d46-0b46-46e6-9659-e77bc9f2f03d" style="border-radius: 10px;">

## 2. Initializing your app

For most use-cases, you would usually push your project to GitHub, then connect your repository to Heroku. However, for this tutorial, we will be pushing your app to Heroku directly using the Leaf CLI.

To get started, you will need to make sure you are logged in to Heroku. You can do this by running `heroku login`. You will be prompted to login in your browser. Once you have logged in, you can proceed.

Heroku uses git to deploy your application, so you will need to initialize git in your repository. You can do this by running `git init` in your project directory. After initializing git, you can add your files to the staging area by running `git add .`. Once you have added your files, you can commit them by running `git commit -m "commit message"`.

## 3. Deploying your app

Now for the interesting part. We can deploy our application using Leaf CLI's `deploy` command.

```bash
leaf deploy --to heroku --project your-project-name
```

For this example, our command would look like this:

```bash
leaf deploy --to heroku --project leafcodelabs
```

This command will setup the Heroku remote, build your app and push it to your Heroku project. Once the command is complete, you should see your deploy in the `Deploys` tab on the heroku dashboard.

You can now visit your app by clicking on the `Open app` button.
