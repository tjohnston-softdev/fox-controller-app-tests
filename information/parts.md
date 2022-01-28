# Test Parts

The test project is divided into ten different parts. This division was necessary because the test script started out as one huge file. Of course, it was a lot simpler at first but eventually, it became very tedious to maintain. After dividing it up into different parts, it became much easier to sort things and figure out where they are. The project now operates using many smaller files rather than one large file.

These different parts are located in the `test-parts` subfolder. Each part folder is named using the format `00-example_name`. Each part has:

* A main file (main.js)
* A sub-folder containing individual scripts for that part.
	* The main file requires and calls the script files inside the subfolder.
	* The file is required and called in [fox-test-main.js](../test/fox-test-main.js)
* Another sub-folder containing common files for that part.  (Optional)

---

**01 - Common Data**  
Used to test common dependency files which are required by the project as a whole. This includes example objects, and whether the FOX Controller files exist. The files being tested here are located in the 'app' folder.

\
**02 - External Modules**  
Used to test 3rd party modules installed with NPM. An example is [needle](https://www.npmjs.com/package/needle), which is used to make HTTP requests. While these modules can be used globally, they are installed into the 'node_modules' folder.

\
**03 - Internal Scripts**  
Used to test local scripts which were written to help with Controller API testing. These files include [define-api](../app/define-api.js) and [request-api](../app/request-api.js) in the 'app' folder.

\
**04 - Online Checks**  
Only used to test whether the Controller is on or offline when it should be. This is a separate part because in order for device APIs to be tested, the Controller must be running. On the other hand, the Controller must be offline in order to test the script files themselves.

\
**05 - Controller Settings**  
Used to test the [Remote IO Settings](https://github.com/tjohnston-softdev/fox-controller-app/blob/master/fox-devices/remote_io/remote_io.settings.js) file inside the Controller. This is a separate test because other Controller files in later parts depend on it.

\
**06 - Controller Models**  
Used to test the Controller's model definition files. This is a separate part not only because of dependency, but because this involves multiple files and not just one particular file.

\
**07 - Controller Files**  
This is where most of the Controller file testing takes place after the dependencies are validated. This part covers the Controller in general but mainly relates to Remote IO and Database testing.

\
**08 - Device API Requests**  
Used to test the Controller APIs while the Controller is running. This does not involve any particular group of files but rather relies on endpoint URLs used by the Controller.

\
**09 - Front-End**  
Used to test the Device and Node Controller APIs in regards to how one might access and use them from the front-end.

\
**10 - Restart Controller**  
Used to test specific Admin APIs that are responsible for restarting or rebooting the Controller. The reason that this is a separate part is because it involves taking the Controller offline or turning it off entirely. Therefore, it is safest to have these APIs run separately not only in their own mode, but also separate from each other.

---

**Previous:** [Running](./running.md)  
**Next:** [Test Modes](./modes.md)

[Contents](./readme.md)
