# Changelog

**Test Status**
* One of the 'Common Errors' string property tests fail.
* All other 'common' mode tests pass.

---

**./test-parts/part-a-common_data/common-main.js**
* Removed module requirements:
	* chai
	* chai-things
	* sinon
* File requirements are now global.
* Replaced `exports` with `module.exports`
