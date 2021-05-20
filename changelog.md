# Changelog

**./package.json**
* Installed 'clear' module.

---

**./test/fox-test-main.js**
* Required 'clear' module.
* Before executing any tests, the console is cleared.
	* This is done by calling 'clear' at the start of each testing mode within the IF structure.
	* This only applies for testing, and not warning messages.
