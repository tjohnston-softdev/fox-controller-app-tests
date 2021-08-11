# FOX Controller Unit Testing

This Node JS application is used to perform unit testing on a prototype of the FOX Controller. The FOX is a [Programmable Logic Controller](https://en.wikipedia.org/wiki/Programmable_logic_controller) that developed by [ControlX Engineering](https://www.controlxengineering.com.au/) (Known as 'Optim Controls' at the time) during 2018. This application has the ability to test both the Controller's individual script files and the online API endpoints.

---

## Background

During April 2018, I was offered a position at Optim Controls and introduced to their latest project - the FOX Controller In simple terms, a *Programmable Logic Controller* is a device used by industries such as engineering and manufacturing to remotely control various machinery such as assembly lines. 

At first, I was asked to research various technical requirements and determine whether it would be possible to implement them in Node JS. Unfortunately, much of my research was a non-starter so eventually, I was asked to start writing unit tests for prototype builds of the Controller software.

At first, I thought it was weird writing software to test software and I'll admit I was unsure about the purpose of it. Then, it was explained to me that by automating the test process as much as possible, it would be easier to detect when things break, where the errors potentially came from, and how they might be fixed. Even now I feel silly explaining it to people but I also have a greater appreciation of how valuable unit testing is in the software development process.

I do not know the exact date I started working on these unit tests but it was during late-July 2018. My last contribution was on the 21st of December, which was my official resignation date from Optim.

Refer to the [Information](./information/readme.md) folder for instructions on how to use this program.

---

## Further Development

As of April 2021, I have decided to clean up my work with Optim. I spent a couple of weeks writing an [Emulator](https://github.com/tjohnston-softdev/fox-controller-app) that simulates the Controller software with as little dependency and overhead as possible.

On the 26th of April, I publicly released both the emulator and the original test program. Coincidently enough, this was exactly three years since I first made contact with Optim Controls.

A revised version of the test script was released on 19 July 2021.

I have since found out that Optim had rebranded itself as 'ControlX Engineering', I have no indication as to when this took place but my best guess would be early-mid 2021. A re-branded version of the test script was released on 11 August 2021.

---

## Disclaimer

The FOX Controller test script is licensed under MIT. This means that anyone may use or modify this project as they see fit as long as the copyright notice is intact and that appropriate credit is given.
