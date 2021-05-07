# Changelog

**./test/fox-test-main.js**
* Uncommented 'deviceApiPart' requirement.

---

**./test-parts/part-h-api_requests/api-main.js**
* File requirements are now global instead of function-based.
* Commented out all tests except for 'cAdminFile'
* Removed module requirements:
	* chai
	* chai-things
	* sinon
* Replaced `exports` with `module.exports`
