# Changelog

**./test/fox-test-main.js**
* Console is now cleared upon input prompt and not afterwards.
	* This means that there is only one call to `clear();` at the start of the file instead of in testing modes.
