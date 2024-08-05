---
title: Re-inventing the C?
date: 2024-08-05
author: Michael Darko
github: mychidarko
twitter: '@mychidarko'
---

<!-- markdownlint-disable no-bare-urls -->

<img src="https://github.com/user-attachments/assets/388b01c6-a688-4d75-8732-3f671681f744" style="border-radius: 8px; margin-bottom: 15px; width: 100%; max-height: 500px;" alt="" />

<p>
C++ is a general-purpose programming language created by Bjarne Stroustrup as an extension of the C programming language, or "C with Classes". It has since become a backbone of the software development industry and is used to develop everything from games to car and flight control systems and many enterprise applications. C++ is known for its performance and is the go-to language for high-performance/low-level system applications. As amazing as this sounds, C++ is not exactly everyone's favorite language. It is known for its complexity, steep learning curve and the fact that it is super easy to shoot yourself in the foot with it. All of these, coupled with the ton of technical debt that it inherits from C makes it a language that many developers would rather avoid. The question then is, can we and should we re-invent the C++ wheel?
</p>

---

## The C++ Problem

C++ is a language that has been around for a long time and has been used to develop a lot of software. This has 2 sides to it. On one hand, it means that there is a lot of code written in C++ that has over the years been tested and proven to work. This is a good thing because it means that C++ is a language that can be trusted to get the job done. On the other hand, it also means that C++ has a lot of baggage that it carries around. This baggage comes in the form of the stagnant language design and more importantly, the inability to grow and adapt to the changing software development landscape due to the need to maintain backward compatibility with the C language.

![Image](https://github.com/user-attachments/assets/796d86af-3a1d-4c15-af32-b89999d63a06)

It's not all bad though, C++ has seen some improvements over the years with the introduction of features like smart pointers, lambda expressions, and move semantics. These features have made C++ a bit more modern and easier to work with. However, these features are just a drop in the ocean compared to the features that other modern languages like TypeScript, Rust, Swift, and Kotlin have to offer. This is where the problem lies. C++ is a language that is stuck in the past and is finding it hard to keep up with the modern software development landscape.

On top of all this, C++ is also maintained by a committee that is known for being slow to make decisions and tries to cater to everyone's needs (ISO & C++ committee). This has led to a language that is bloated and has a lot of features that try to combine machine-level programming with high-level abstractions. This has made C++ a language that is hard to learn and even harder to master.

![Image](https://github.com/user-attachments/assets/58a87f20-8606-4413-bf78-c8bcb356c03e)

All of these problems have led to a situation where many developers are looking for alternatives to C++. This has led to the rise of languages like Rust, Zig and more recently, the introduction of the Carbon language by Google. These languages are designed to be modern, safe, and easy to use while still maintaining the performance that C++ is known for. But is this really the solution to the C++ problem?

## The good, the bad and the ugly

![C++ successor](https://github.com/user-attachments/assets/fbcf85c1-115a-48a1-b37b-21574cabca32)

The rise of languages like [Rust](https://www.rust-lang.org/) and [Zig](https://ziglang.org/) has shown that there is a need for a modern systems programming language that is safe and easy to use. These languages have been designed from the ground up to be modern and to take advantage of the latest research in programming language design. They have features like memory safety, zero-cost abstractions, and fearless concurrency that make them a joy to work with. However, these languages are still relatively new and have not yet seen widespread adoption in the industry. In addition to this, they do not have the level of compatibility with C++ required to replace it as the go-to language for systems programming. This is where the Carbon language comes in.

[Google's Carbon language](https://github.com/carbon-language/carbon-lang) is a new programming language that is designed to be modern, safe, and easy to use. Carbon maintains a 2-way interoperability with C++ which means that "a library anywhere in an existing C++ stack can adopt Carbon without porting the rest.". This makes it easy to integrate Carbon into existing C++ codebases and to gradually migrate to Carbon without having to rewrite everything from scratch. Carbon also has features like memory safety, modular and modern code that make it a joy to work with. However, Carbon is still in its early stages of development and has not yet seen widespread adoption in the industry.

## The ugly truth

All of this sounds good, however, this can also be seen as a bad thing. The fact that there are so many new languages that are trying to replace C++ can be seen as a sign that C++ in itself has a ton of use-cases that are not being met by other languages. Handing over the reins to a new language like Carbon can be a risky move as it is still in its early stages of development and there is no guarantee that it will be able to replace C++.

There is also the fact that so many independent systems have incorporated C and C++ into their development process. Systems like the Linux kernel, the Windows operating system, and many others have a ton of code written in C and C++. C/C++ is the language that the Arduino language is based on, the same language that is used to program the microcontrollers that power a lot of the devices that we use on a daily basis. Replacing C++ with a new language when there is so much code and so many systems that depend on it technically is not feasible.

![Image](https://github.com/user-attachments/assets/4c7c614e-7118-4f66-b349-9438d0fc7e18)

Even if we were to replace C++ with a new language, there is no guarantee that the new language will not suffer the same fate as C++ considering that C++ itself was designed to replace C. This is the ugly truth about programming languages. They come and go and there is no guarantee that the new language that we are so excited about today will not be replaced by another language in the future.

## The end of C++?

Short answer, no. C++ is not going anywhere anytime soon. It is a language that has stood the test of time and has been used to develop a lot of software. It is a language that can be trusted to get the job done and is not going to be replaced by a new language anytime soon.

Languages like Rust and Zig are great and have a lot of potential, and will only get better with time. As said with any system, if these languages meet your needs, then by all means, use them. However, if you are looking for a language that is tried and tested and has a ton of libraries and frameworks that you can use, then C++ is the way to go.

The fact that C++ is still around and is still being used to develop software is a testament to the fact that it is a language that can be trusted to get the job done. It may not be the most modern language out there, but it is a language that is here to stay and will continue to be used for many years to come.

## The way forward

![Image](https://github.com/user-attachments/assets/e3bd7414-8904-413e-bca9-3374518b935b)

If C++ is not going anywhere anytime soon, and is is technically not feasible to replace it with a new language, then what is the way forward? C++ is improving although slowly, do we just sit back and wait for it to catch up with the modern software development landscape?

Once again, I would say that answer totally depends on your needs. Companies like Google find it feasible to replace C++ with Carbon because they have the resources to do so. However, for most companies, this is not feasible. Other companies like Mozilla have found it feasible to replace C++ with Rust because it meets their needs. Others have gone with Zig. The point is, the way forward is to use the language that meets your needs.

## My take

As a software engineer, I am always excited about new languages and new technologies, but if you are like me and have spent some time in the web development world, you would know how chaotic it can be to jump into every new tool and would probably be yearning for some kind of stability.

Stability in the sense that you can trust the language you are using to get the job done. C++ is a language that can be trusted to get the job done and is not going anywhere anytime soon. It may not be the most modern language out there, but it is a language that is here to stay and will continue to be used for many years to come.

So, what if instead of replacing C++ and all of it's architecture, we just implement a way to use already existing high-level languages to write C++ code? This way, we can take advantage of the modern features that these languages have to offer while still maintaining the performance that C++ is known for, along with the ability to integrate with existing C++ codebases. This way, we can have the best of both worlds. That is exactly what I am working on with Naytive.

## Naytive

[Naytive](https://github.com/naytive/naytive) is not a programming language, a build tool or any fancy new technology. It is a simple translator that allows you to write more modern TypeScript code and have it translated to C++ code. This way, you can take advantage of the modern features that TypeScript has to offer while still maintaining the C++ architecture and all of the different systems that depend on it.

I chose TypeScript because it is just a superset of JavaScript and is a language that is widely used in many different industries. JavaScript is the most used language in the world, with over 67% of developers using it. TypeScript is a statically typed version of JavaScript that adds a lot of features that make it easier to work with. Basically, if you know JavaScript, you can write TypeScript without any issues.

Naytive is still in its early stages of development and is being built with the best developer experience in mind. It takes advantage of a lot of new C++ features like smart pointers, lambda expressions, and also adds a ton of checks to make sure that the code that is generated is safe and efficient. Memory efficiency is another backbone of Naytive, and it is built to make sure that the code that is generated is as memory efficient as possible.

Naytive is open-source and if you are interested in contributing, you can check out the [GitHub repository](https://github.com/naytive/naytive).

## Conclusion

C++ is a language that has been proven to work and is not going anywhere anytime soon. It may not be the most modern language out there, but it is a language that can be trusted to get the job done. If you are looking for a language that is tried and tested and has a ton of libraries and frameworks that you can use, then C++ is the way to go.

Depending on your needs, you may find it feasible to replace C++ with a new language like Rust, Zig, or Carbon. This is a decision that you will have to make based on your needs and the resources that you have available.
