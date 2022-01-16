# Changelog

**./test/fox-test-main.js**
* Removed 'prompt-sync' requirement.
* Added 'readline' requirement.
* Commented out:
	* 'getTestModeInput' function.
	* Unit testing code.
	* 'chosenMode' variable.
* Declared 'readConsole' variable.
	* Interface object for 'readline'
	* Handles test mode prompt.
* Added call to 'question' from 'readline' class.