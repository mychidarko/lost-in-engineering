---
title: PHP tips and tricks
date: 2020-10-28
author: Michael Darko
github: mychidarko
twitter: '@mychidarko'
---

<!-- markdownlint-disable no-bare-urls -->

<img src="https://media.dev.to/cdn-cgi/image/width=1000,height=420,fit=cover,gravity=auto,format=auto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fuploads%2Farticles%2Fyfkwafxb6d9iskpqopl1.jpg" style="border-radius: 8px; margin-bottom: 15px;" alt="" />

<p>
Working with PHP has been one of the most fun experiences for me, working on both major and minor projects and learning something new on every journey.
</p>

---

I'll be sharing some little tricks that have helped me cut down a couple of lines of code and others that totally flipped my workflow like this:

![""](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/mzqpj46l7j1blkgwgu12.png)

Hit me up if you have any ideas, questions, comments... Without further ado, let's get into it.

## Tip 1: (if and else)

You may have seen this before on tutorials or some other articles, but this is something really important I should mention, a bit in-depth. It's not wrong to use `else` and `else if` blocks in your code, in fact, they were made for use, however, in some cases, these blocks become redundant. Let's look at an example:

```php
function output_gender(bool $user_is_male) {
    if ($user_is_male) {
        return "User is male";
    } else {
        return "User is female";
    }
}
```

In this case the output_gender function returns a set output based on `$user_is_male` is true or false. When `return` is used in a function, any code below the `return` statement is totally ignored, so, if `$user_is_male` is true, then the `else` block will be ignored since a value is returned. With this concept, we can get rid of the `else` block like this:

```php
function output_gender(bool $user_is_male) {
    if ($user_is_male) {
        return "User is male";
    }

    return "User is female";
}
```

We know that the if statement won't run if the condition passed in is `false`. This means it will skip straight to the "User is female" part.

## Tip 2: (if blocks: less vs more)

Tip 2 builds upon the tip we just looked at above but goes in a bit deeper. In an if/else or even using an example like tip 1, you might have conditions where one block, either the if or else, has less code than the other. It's better in such situations to handle the block with less code first. Let's look at a real example.

```php
public function categoryWithPosts($category)
{
    $category = Category::find($category);

    if ($category) {
        $category->posts = $category->posts()->published()->get();
        return response(['data' => $category], 200);
    } else {
        return response(['error' => 'Category not found'], 404);
    }
}
```

This code above checks for a post category and runs a condition based on whether the category is found or not. If we're to go with **ONLY** tip 1, we'll have code looking like this:

```php
public function categoryWithPosts($category)
{
    $category = Category::find($category);

    if ($category) {
        $category->posts = $category->posts()->published()->get();
        // having any more code here would
        // bloat this part of the function
        return response(['data' => $category], 200);
    }

    return response(['error' => 'Category not found'], 404);
}
```

This code is correct, however, you can clearly see that our major code is wrapped with `{}`, and pushed in further. If this code were significantly longer, it would be a pain to keep it all within the if block. Following tip 2, we can have this instead:

```php
public function categoryWithPosts($category)
{
    $category = Category::find($category);

    if (!$category) {
        return response(['error' => 'Category not found'], 404);
    }

    $category->posts = $category->posts()->published()->get();
    // we can freely have more code here
    // without worrying about the code looking weird
    return response(['data' => $category], 200);
}
```

Since the else block has less code, we use a negative statement with `!` to make that code run first. So our if rather contains `if not category, run code...`. This gives us more room to handle our major code freely.

## Tip 3: (verifying multiple strings)

Let's just say we want to find if a certain variable is or isn't one of many strings, we'd obviously have to write a bunch of conditional statements to verify this:

```php
$item = "candy";

switch ($item) {
    case 'candy':
        return true;
    case 'toy':
        return true;
    default:
        return false;
}
// we're not adding break because we're using return

// or
if ($item == 'candy' || $item == 'toy') {
    return true;
}

return false;
```

This code returns `false` if the item variable is neither `candy` nor `toy`. This is perfectly correct, however, this is very repetitive. Instead, we can check an array for the string we want to find: 

```php
if (in_array($item, ["candy", "toy"])) {
    return true;
}

return false;
```

Even this can be shortened further because `in_array` returns a boolean.

```php
return in_array($item, ["candy", "toy"]);
```

We just shortened these lines to just a single line, clean right? How does this work? We have an array containing the strings we want to check for. Then we pass that into `in_array`. This creates a simple condition like:

```text
if $item is inside the array holding "candy" and "toy", return true, else false
```

You might be wondering, why not just return whether $item is candy or toy directly since that too is just one line, like this:

```php
return ($item == 'candy' || $item == 'toy');
```

This will give us the same result, however let's say we were checking 10 strings:

```php
return ($letter == 'a' || $letter == 'b' || $letter == 'c' || $letter == 'd' ...);
```

You can clearly see that this easily gets out of hand, compared to this:

```php
return in_array($letter, ["a", "b", "c", "d", ...]);
```

**Note that the first parameter of `in_array` is the string we're actually checking**

## Tip 4: (??)

`??` is probably the easiest way to create inline conditions without 2 parts. What do I mean? Let's look at an example, that would do all the explaining for me.

```php
$data = [
    "a" => 1,
    "b" => 2,
    "c" => null,
];

return $data["c"] ? $data["c"] : "No data";
```

The last line here checks if the key `c` in `$data` is truthy, if not it returns "No data".

We can rewrite the last line with ?? to look like this:

```php
// ...
return $data["c"] ?? "No data";
```

In this case ?? behaves like the `||` logical operator in other languages. A real-world example of this would look like this:

```php
$user = getUserFromDb($user_id) ?? trigger_error("User id is invalid");

echo $user;
```

`getUserFromDb` is to return a user from a database somewhere, however, if the user isn't found, instead of setting the user variable, we break the application with `trigger_error`. Without `??` we'd have to write this instead:

```php
$user = getUserFromDb($user_id);

if (!$user) {
    trigger_error("User id is invalid");
}

echo $user;
```

## Tip 5: (Recursiveness over repetition)

I think this tip is pretty straightforward, try to use recursiveness rather than repeating yourself a lot. There are situations that'll make you repeat some code, that's fine, but if you find you're repeating the same code, just make it a method. Where does recursiveness come in? Let's look at an example: This is a method I wrote for my [Leaf framework](https://leafphp.netlify.app/#/)'s request object, to return a particular field passed into the request.

```php
/**
 * Returns request data
 *
 * This methods returns data passed into the request (request or form data).
 * This method returns get, post, put patch, delete or raw faw form data or NULL
 * if the data isn't found.
 *
 * @param string|array $params The parameter(s) to return
 * @param bool $safeData Sanitize output
 */
```

This means that this method can take in either an array or string and based on the input, it would return a string or an array. The solution would be to check if the input was an array, loop over it to get the strings in the array then perform the data fetch on those strings, which would look like this.

```php
public function get($params, bool $safeData = true)
{
    if (is_string($params)) return $this->body($safeData)[$params] ?? null;

    $data = [];
    foreach ($params as $param) {
        $data[$param] = $this->body($safeData)[$params] ?? null;
    }
    return $data;
}
```

Here, you notice `$this->body($safeData)[$params] ?? null` is being repeated, not just that, but what if an array holding another array is passed in instead. Since this is a library, there's no telling what sorts of things users would pass in there, so I did this instead.

```php
public function get($params, bool $safeData = true)
{
    if (is_string($params)) return $this->body($safeData)[$params] ?? null;

    $data = [];
    foreach ($params as $param) {
        $data[$param] = $this->get($param, $safeData); // I called the function again
    }
    return $data;
}
```

This makes sure that until the looped value is a string, it won't attempt to fetch its data. A small trick compared to those above, but definitely useful. **Note that this function is class scoped, hence the use of `$this`**

## Tip 6: (PHP + HTML)

This is for when you want to write PHP in your HTML or HTML in your PHP😅. We'd usually do something like:

```php
<?php
foreach ($items as $item) {
    echo '
        <div class="product__card">
            <h3>{$item->name}</h3>
        </div>
    ';
}
?>
```

Although this is fine, you can clearly see, we're outputting the HTML as a string. The bulkier the HTML, the more stressful it becomes to match tags and keep track of exactly what part of the HTML we're writing is. There's a neat solution for this.

```php
<?php foreach ($items as $item): ?>
    <div class="product__card">
        <h3><?php echo $item->name; ?></h3>
    </div>
<?php endforeach; ?>
```

You can clearly see how we're maintaining our HTML formatting and code alignment...and no, this is not a templating engine, this is just PHP making things simple for us. One major thing about PHP is how it allows the same thing to be done in many different ways. In this example above, we're using:

```php
foreach (...):
// code
endforeach;

// also works with if
if (...):
// code
endif;

// also
if (...) #one line code

while():
// ...
endwhile;
```

## Tip 7: (Writing functional blocks)

Functional blocks can range from a large feature to a single lined wrapper, around a default PHP function, the point is just to create that functional block. This isn't just to avoid repetition, but also to speed up your workflow and make your code more readable.

You can write a simple method to create a redirect like this:

```php
function redirectTo($route) {
    header("location: $route", true, 302);
}
```

So instead of writing `header("location: /home", true, 302)` everytime, it makes more sense to write `redirectTo("/home")`. The same applies to 3rd party libraries, and long processes, writing a reusable block of code in an open way eg:

```php
UserNotification::send($user_id, $notification);
```

is obviously better than writing a bunch of lines every time you have to send a notification to a user. Another very small but very useful tip.

## Tip 8: (Using Types)

Another straightforward one. This is one of the least used, but very powerful features available in PHP. This is a feature that can save you and other developers a whole lot of stress (if you work with a team).

Of course, you can write function descriptions like the example in tip 5 above, but it becomes quite a daunting task to write function descriptions for all your functions and variables in a large project.

Let's take a look at how types can save our lives later:

```php
function getItem($item) {
    // $item is expected to be an array
    // for whatever reason
    return allItems()[$item[0]];
}
```

If a different developer works on the project or even yourself after a few weeks, seeing the `getItem` method, the `$item` variable there is obviously expected to be a string, but the function was written to handle an array.

The dangerous thing here is that passing in a string won't break the app, it would still run perfectly. Why?

If "chair" is passed into the function, it will be evaluated to `allItems()["c"]`, which will end up causing errors that will keep you up at 12am😅. This can easily be avoided like this:

```php
function getItem(array $item) {
    return allItems()[$item[0]];
}
```

This will make sure that whatever is passed in here is the type needed. You can read more from php.net

You can also use methods like `is_string` and `is_array` which we saw above like this:

```php
function getItem($item) {
    if (!is_array($item)) throwErr("item should be array");

    return allItems()[$item[0]];
}
```

## Tip 9: (Frameworks/Libraries aren't evil)

I'll be real over here, open-source libraries cause problems! Sometimes the libraries we bring in cause more problems for us instead of helping us. This might sound like I'm totally trashing open source packages, I'm not, I also write open-source packages myself, so obviously not!

My point is that you should read more on packages you bring in, read their documentation, check their issues on GitHub, don't take unnecessary risks. One thing I'll advise, and that goes back to **Tip 7**, write wrappers for features around the packages you bring in. This will give you a bit more control and also make your code cleaner.

In regards to frameworks, you might have heard this before, but you should familiarize yourself with PHP first. PHP frameworks, no matter the language they were written in still use PHP's principles and style, so the first step is to obviously familiarize yourself with PHP.

Next would be to pick something you're comfortable with and stick to it. There are many choices out there:

- Laravel: if you love magic, laravel does literally everything for you (unless you decide otherwise)
- Slim: A rest API framework, has a sort of "bring your own" vibe
- Leaf: That's what I wrote, inspired by Slim and Laravel, it gives you the magic you can control.

*I only mentioned frameworks I actually use to avoid bias.*

## Tip 10: (Don't just code!)

Alright, this one is a bonus tip. It applies to not just PHP, but technically almost every language/framework you work with. What I mean by don't just code is relatively straightforward.

Let's say you want to write a method that sort of requests a payment from a user's account, jumping straight into coding out this feature may (or may not) end up getting you confused at some point, where you'll have to stop, scroll back up, check something from a file somewhere, or something similar.

What am I proposing? Here:

```php
// in class scope
public function requestPayout()
{
    // parse token to get user id

    // fetch user from DB with id

    // check if the user is eligible for payouts

    // get user balance with user helper

    // check and throwErr for insufficient funds

    // ...
}
```

The above just allows you to do all the required thinking before actually jumping in to write any features. It also in a way helps you cross-check what you're building since you'll end up listing out all your processes out first.

### Thanks for reading

These are a few tips and tricks I've discovered on my PHP journey, some of these might work for you and others may not, feel free to choose whichever you're comfortable with and stick to those.

It's quite wrong to say these are good ways of doing stuff so use these only, as I mentioned before, PHP is the type of language that provides many different ways of doing the same thing, so if you have anything you'll like to share, a new tip, a faster way to do something I mentioned, something you don't agree with, just open a discussion.
