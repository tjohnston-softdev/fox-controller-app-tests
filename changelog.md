# Changelog

**Test Status**
* Since 'Part I' still uses the 'request' module, all testing is broken for now.

---

**./test/fox-test-main.js**
* Uncommented 'frontendPart' requirement.

---

**./test-parts/part-i-api_frontend/front-main.js**
* Removed module requirements:
	* chai
	* chai-things
	* sinon
* Test files are now required globally instead of within functions.
	* The path and the file variables are merged.
	* eg. 'cListEmptyPath' is merged into 'cListEmptyFile'
* Commented out:
	* callAddDevices
	* All requirements except for 'cListEmptyFile'
* Replaced `exports` with `module.exports`
