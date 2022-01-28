# Running

First, navigate to where the `fox-controller-app` and `fox-controller-app-tests` folders are located. These two projects should be sitting in the same 'root' folder. Remembering where this root folder is located is helpful because it corresponds to where the Controller project is along with any derived items.

---

The test script assumes you are using a blank installation. Therefore, it is a good idea to delete the folders created by the Controller before doing any major testing.

These folders will be sitting alongside 'fox-controller-app' and 'fox-controller-app-tests' in your project root folder. The folders you should delete are:

* fox-dbs
* fox-flows
* logs
* user-storage

This step may or may not be optional depending on what testing you want to perform but if you run the test script without cleaning the project first, it is possible that errors will be flagged where they shouldn't be.

---

Now that the Controller is cleaned, you should now decide whether to run the Controller program. This depends on what [parts](./parts.md) you want to test.

* For parts 01-04, this does not matter.
* For parts 05-07, the Controller must be offline.
* For parts 08-10, the Controller must be online.

If you need to run the Controller, do so before continuing by navigating to the 'fox-controller-app' folder and running the command `SET DEBUG=fox-controller-app:* & npm start`

---

To run the test script, navigate to the `fox-controller-app-tests` folder and run the command:

 `npm run tests --mode=example`

The above command executes the script file located in the 'test' folder in a way that calls upon the 'Mocha' testing framework for Node JS.

If you have not already installed the third-party packages, an error will be flagged. If this happens,  all you have to do is run `npm install` and the packages will be downloaded.

---

The `--mode=example` argument for `npm run tests` refers to the [testing mode](./modes.md). This could be one of several defined keywords, with each keyword executing different parts of the project. For example, the keyword "common" runs tests for dependency scripts required by the whole project.

Keywords are case-insensitive. If an invalid keyword is entered, nothing will happen. Just run the script again and use something different.

---

After entering a valid keyword, the different tests will be performed accordingly. This may take some time depending on what mode you entered. Once the testing is complete and everything has been executed, the overall results will be displayed.

When running test modes that interact with the controller files, the command prompt may 'freeze' and you will not be allowed to enter a new command. This is because of a side-effect with the Mocha testing framework. The files will run as if everything is normal. This is okay for the most part but it becomes a problem with Remote IO when the relevant files have been designed to run indefinitely in the background.

If the program keeps running after testing has been complete and you cannot enter a new command, just press `CTRL-C`, or `Command-Dot` if you're using a Mac. If a confirmation message is displayed, choose `yes`

---

**Previous:** [Installing](./install.md)  
**Next:** [Test Parts](./parts.md)

[Contents](./readme.md)
