# Changelog

**./package.json**
* Defined custom script for unit tests.
	* Before: `npm test`
	* After: `npm run tests --mode=whatever`

---

**./tests/fox-test-main.js**
* Removed 'readline' requirement.
* Added 'mocha' requirement.
* Removed 'readConsole' variable.
* Removed `readConsole.question` call.
* Uncommented unit testing code.
* Declared 'chosenMode' as a global variable.
	* Hold-over from original prompt code.
	* Assigned using 'process.env'
	* Validation is handled by the unit testing code itself.
* Revised mode IF structure to account for new input method.
	* If an unknown mode is entered, output accordingly.
	* Otherwise, no mode has been entered.