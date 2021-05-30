# Installing

This is a quick guide for installing the FOX Controller Test Script. This tutorial is going to start from the beginning and should not take too long to complete.

First, set up your environment in the way that you see fit. Then, download these two repositories:

* [fox-controller-app](https://github.com/tjohnston-softdev/fox-controller-app)
* [fox-controller-app-tests](https://github.com/tjohnston-softdev/fox-controller-app-tests)

Make sure that the two repositories are in the same root folder. Your file system should look like:

* `./root/fox-controller-app`
* `./root/fox-controller-app-tests`

---

The reason they must be in the same folder is because some parts of the test script interact with the FOX Controller files in order to test them. The project is built to assume that those two folders are siblings when trying to locate files.

Open a command line interface and run `npm install` for both repositories. This will download and install the required Node JS modules. The command line will usually show loading bars but not for every module. It would be best to wait for a few minutes. When it is complete, the command line will display something like "Installed x modules in y seconds"

---

**Previous:**  
**Next:** [Running](./running.md)

[Contents](./readme.md)
