# Test Modes

The `mode` argument in `npm run tests --mode=example` refers to the testing mode. Different tests will run depending on which keyword is entered. The reason that modes are used is because the different parts of the project are ordered in a cascading manner where one part depends on the previous. For example, once the external modules have been tested, they do not need to be tested again in other parts.  Not all of the files need to be tested every single time. You may choose to run the whole thing or just the parts that matter at the time.

Another reason this was implemented is because certain parts can only be tested based on whether the Controller is online or offline. In order to test the APIs, the Controller must be running but because of concurrency and file locking issues, the Controller must be offline when testing the script files themselves. 

This file is a reference to the different modes offered. The keywords are not case-sensitive. If no text is entered or an error occurs, a message will be displayed and nothing else will happen.

---

**common**  
This mode only tests the common dependency files. (part 01)

\
**local**  
This mode tests important 3rd party modules and local scripts. (parts 02-03)

\
**online**  
This mode tests whether the Controller is online. If it isn't, it will be flagged as an error. (part 04)

\
**offline**  
This mode tests whether the Controller is offline. If it isn't, it will be flagged as an error. (part 04)

\
**cont**  
This mode tests whether the Controller is offline before testing the script files. (parts 04-07)

\
**request**  
This mode tests whether the Controller is online before testing the APIs. (parts 04, 08)

\
**r-process**  
This mode is used to test the 'Restart Process' API. This should only quit the Controller software and not shut down or delete anything. (part 10)

\
**r-fox**  
This mode is used to test the 'Reboot Controller' API. This should reboot the Controller device. (part 10)

\
**r-factory**  
This mode is used to test the 'Factory Reset' API. This will delete any user data and reboot the Controller device. (part 10)

\
**all-cont**  
This mode will test the whole project with the Controller files. (parts 01-07)

\
**all-api**  
This mode will test the whole project with the device APIs. (parts 01-04, 08)

\
**front**  
This mode will test the Controller APIs from a front-end perspective. (parts 04, 09)

\
**debug**  
This mode is reserved for testing whatever part(s) are being worked on at the time.

---

**Previous:** [Test Parts](./parts.md)  
**Next:** [Folders](./folders.md)

[Contents](./readme.md)
