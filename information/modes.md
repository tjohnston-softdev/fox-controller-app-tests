# Test Modes

When you run "npm test", you will be prompted to enter a test mode. Each test mode has a different keyword and a different tests will run depending on which keyword is entered. The reason modes are used because the different parts of the project are ordered in a cascade manner. For example, once the common dependencies are tested, they do not need to be tested again in other parts. The same can be said when running the project itself because not all of the files need to be tested every single time. You may choose to run the whole thing or just parts that matter at the time.

Another reason this was implemented is because certain parts can only be tested based on whether the Controller is on or offline. In order to test the APIs, the Controller must be running but because of concurrency issues, the Controller must be offline when testing the script files themselves. 

The user input is handled through the [prompt-sync](https://www.npmjs.com/package/prompt-sync) module. If you enter a keyword, the corresponding test will happen. If not, no tests will occur and no errors will be flagged.

The problem with the keywords is that the user has to remember them. This file can be a reference to the different modes offered. The keywords are not case-sensitive.

---

The modes are:

**common**  
This mode only tests the common dependency files. (part A)

**local**  
This mode tests important 3rd party modules and local scripts. (parts B-C)

**online**  
This mode tests whether the Controller is online. If it isn't, it will be flagged as an error. (part D)

**cont**  
This mode tests whether the Controller is offline before testing the script files. (parts D-G)

**request**  
This mode tests whether the Controller is online before testing the APIs. (parts D and H)

**r-process**  
This mode is used to test the 'Restart Process' API. This should only quit the Controller software and not shut down or delete anything. (parts J)

**r-fox**  
This mode is used to test the 'Reboot Controller' API. This should reboot the Controller device. (parts J)

**r-factory**  
This mode is used to test the 'Factory Reset' API. This will delete any user data and reboot the Controller device. (parts J)

**all-cont**  
This mode will test the whole project with the Controller files. (parts A-G)

**all-api**  
This mode will test the whole project with the device APIs. (parts A-D and H)

**front**  
This mode will test the Controller APIs from a front-end perspective. (parts D and I)

**debug**  
This mode is reserved for testing whatever part(s) being worked on at the time.

---

If no text is entered or an error occurs, a message will be displayed and nothing else will happen.

---

**Previous:** [Test Parts](./parts.md)  
**Next:** [Folders](./folders.md)

[Contents](./readme.md)
