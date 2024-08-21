---
title: React tips & patterns
date: 2021-03-24
author: Michael Darko
github: mychidarko
twitter: '@mychidarko'
---

<!-- markdownlint-disable no-bare-urls -->

<img src="https://media.dev.to/cdn-cgi/image/width=1000,height=420,fit=cover,gravity=auto,format=auto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fuploads%2Farticles%2Fzr3ipkn2z9ol3pfnn5wj.png" style="border-radius: 8px; margin-bottom: 15px;" alt="" />

<p>
React is pretty easy to learn if you know JavaScript, however, it's pretty easy to lose track of your project or just mess things up as it scales or gets ready for a refactor or re-write. I'll share some tips which have literally saved my life...and a whole lot of time😇. Let's get into it!
</p>

---

## Tip 1: (Using Containers)

It's very easy to bloat your components with a lot of code: API calls, form logic and a whole lot more logic. To add to all this, the UI code is shoved into these already bloated components. How do we solve this? Containerizing! Containers allow us to isolate our logic and UI code into different components which helps us avoid bloating that particular component just like MVC does. Let's look at an example:

This component fetches news items and displays a UI for the fetched new items

```jsx
const Dashboard = () => {
  const [news, newsError] = useCustomFetch("/news");
  const [user, userError] = useCustomFetch("/user");
  const [trends, trendsError] = useCustomFetch("/trends");
  const [notifications] = useCustomFetch("/notifications");

  if (news) {
    // sort news for tags
    // sort news for "sort options"
    // perform some custom operations on news
    // do something else like caching?
  }

  if (trends) {
    // sort trends for tags
    // sort trends for "sort options"
    // perform some custom operations on trends
    // do something else like caching?
  }

  if (notifications) {
    // sort notifications for tags
    // sort notifications for "sort options"
    // perform some custom operations on notifications
    // do something else like caching?
  }

  return (
    <div>
      <h2>user</h2>
      loading handler
      map cards
      display available tags
      display sort options

      <h2>notifications</h2>
      loading handler
      map cards
      display available tags
      display sort options

      <h2>Latest News</h2>
      loading handler
      map cards
      display available tags
      display sort options

      <h2>Trends</h2>
      loading handler
      map cards
      display available tags
      display sort options
    </div>
  );
};
```

We're skipping a whole lot of logic and UI code here, but you can pretty much see how huge our component can get if left to grow on its own terms. Now let's look at this same example containerized.

Instead of having our entire code as just Dashboard, we can split it into `DashboardContainer` and `Dashboard`. It's **NOT** compulsory to name your containers with Container, however, it's a good naming convention as done with Controllers in MVC eg: `UsersController`.

DashboardContainer.jsx

```jsx
const DashboardContainer = () => {
  const [news, newsError] = useCustomFetch("/news");
  const [user, userError] = useCustomFetch("/user");
  const [trends, trendsError] = useCustomFetch("/trends");
  const [notifications] = useCustomFetch("/notifications");

  if (news) {
    // sort news for tags
    // sort news for "sort options"
    // perform some custom operations on news
    // do something else like caching?
  }

  if (trends) {
    // sort trends for tags
    // sort trends for "sort options"
    // perform some custom operations on trends
    // do something else like caching?
  }

  if (notifications) {
    // sort notifications for tags
    // sort notifications for "sort options"
    // perform some custom operations on notifications
    // do something else like caching?
  }

  return (
    <Dashboard
      notifications={notifications}
      trends={trends}
      news={news}
      user={user}
      {/* all your other props */}
    />
  );
};
```

Now, your dashboard component will look like this:

```jsx
const Dashboard = ({ user, notifications, ... }) => {
  return (
    <div>
      <h2>user</h2>
      loading handler
      map cards
      display available tags
      display sort options

      <h2>notifications</h2>
      loading handler
      map cards
      display available tags
      display sort options

      <h2>Latest News</h2>
      loading handler
      map cards
      display available tags
      display sort options

      <h2>Trends</h2>
      loading handler
      map cards
      display available tags
      display sort options
    </div>
  );
};
```

This way, you can have all your logic in one component and pass all data needed in the UI through props.

## Tip 2: (Tidy man's props😂)

I gave this tip a such a ridiculous name because I actually discovered this while I was trying to beautify my code and cut down a bunch of lines. What does this whole thing involve? Let's take a look. In the above tip, we passed our props like this:

```jsx
<Dashboard
  notifications={notifications}
  trends={trends}
  news={news}
  user={user}
/>
```

This is fine, but sometimes, you just need something a bit straightforward and easier to grasp. We can replace the above code with this:

```jsx
const props = { notifications, trends, news, user };

<Dashboard {...props} />
```

Clean, simple and very readable😊

## Tip 3: (Error Boundaries)

According to the [react docs](https://reactjs.org/docs/error-boundaries.html), Error boundaries are React components that catch JavaScript errors anywhere in their child component tree, log those errors, and display a fallback UI instead of the component tree that crashed. Error boundaries catch errors during rendering, in lifecycle methods, and in constructors of the whole tree below them.

Basically, a part of your app crashing won't drag the whole app down with it, and on top of that, you get to display a custom fallback UI and log/report the errors associated with your app crash. All you need to do is to create your error boundary and pass your components as props. I usually wrap my whole app with the error boundary.

```jsx
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    logErrorToMyService(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <h1>Something went wrong.</h1>;
    }

    return this.props.children; 
  }
}
```

And wrap the component you want to "protect"

```jsx
<ErrorBoundary>
  <App />
</ErrorBoundary>
```

That's all. You can check out the [docs demo here](https://codepen.io/gaearon/pen/wqvxGa?editors=0010).

## Tip 4: (Picking your libraries)

Like it or not, libraries determine how you write and organize your code. You might have a way of doing something, but a library will ultimately determine what input it takes in and how it works.

One problem I've always had with react is how other libraries usually don't fit into your react app, require a lot of boilerplate code, or how they just have these weird operations😓 Redux meets all these criteria btw😓

There's some good news though, there's usually always an easier/smaller option if you look hard enough. For example, most projects don't need all of redux's features, just a global state, maybe reducers, a setter and a getter😅 You can try libraries like Zustand, Reactn and the multipurpose React Query.

If you want a simpler routing experience, you can also try out [Glass Router](https://github.com/darko-mychi/glass-router) which takes a friendlier approach to the whole routing business.

Just remember, the community always has simpler, smaller and usually faster alternatives.

## Tip 5: (Relative imports)

*This applies to CRA users*

We usually have different directories for assets, views and all those in our app. This usually leads to uncomfortable imports with `../../..`. There are a bunch of solutions for this, however, the most used, which I also prefer is to reconfigure webpack to use relative paths: Instead of `../../assets`, we can have `@/assets`

### setup

We basically want to edit our CRA setup without having to `eject` first. There are some nice libraries for this, which we'll install in our project:

```sh
yarn add react-app-rewired customize-cra
```

From there, we create a `config-overrides.js` file and dump this code in:

```js
const { override, addWebpackAlias } = require("customize-cra");
const path = require("path");

module.exports = override(
    addWebpackAlias({
        ["@"]: path.resolve(__dirname, "src"),
    })
);
```

From there, we head over to our `package.json` scripts section and replace `react-scripts` with `react-app-rewired` like so:

```json
"scripts": {
  "start": "react-app-rewired start",
  "build": "react-app-rewired build",
  "test": "react-app-rewired test",
  "eject": "react-scripts eject"
}
```

That's it for the CRA + JS users!

If you're using TypeScript with CRA, you need to add the following so the compiler doesn't shout at you for using @ in your imports.

Create a new file like `tsconfig.base.json` in your project root (at the same level as your package.json) and add the following:

```json
{
    "compilerOptions": {
        "paths": {
            "@/*": [
                "src/*"
            ]
        }
    },
}
```

We're not adding this in the main `tsconfig.json` because TypeScript will rewrite the `tsconfig.json` and throw this error:

```sh
The following changes are being made to your tsconfig.json file:
  - compilerOptions.paths must not be set (aliased imports are not supported)
```

Now to get this to work, you simply need to extend this in your main `tsconfig.json` file:

```json
{
  "extends": "./tsconfig.base.json",
```

You may need to restart your editor for this to take effect (TypeScript users only). From there, you can start replacing all your uncomfortable imports😇

## Thanks for reading

These are a few tips and tricks which have helped me speed up my workflow, keep my code neat and basically help on my quest for laziness😇

If you have anything you'll like to share, a new tip, a faster way to do something I mentioned, something you don't agree with, just reach out to me. Thanks!
