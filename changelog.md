# Changelog

**./test/fox-test-main.js**
* 'debug' test mode now calls "Part G - Controller Files"

---

**./test-parts/part-g-controller_files/controller-main.js**
* Removed module requirements:
	* chai
	* chai-things
	* sinon
* File requirements are now global instead of function-based.
* Replaced `exports` with `module.exports`
