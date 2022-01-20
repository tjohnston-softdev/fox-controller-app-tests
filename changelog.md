# Changelog

**./test-parts/05-rio_settings/settings/set-main.js**
* Replaced 'objectFunctions.testPropExists' with `exist` checks in these tests:
	* "IO Properties"
	* "Signal Properties"
* Re-wrote the following tests to use 'commonFunctions.testFunction'
	* "Signal Type Function"
	* "Parse Prefix Function"
	* "Parse Index Function"
* Removed 'commonPaths.testObject' requirement.

---

**./test-parts/05-rio_settings/settings/set-props.js**
* Modified "Valid Type" tests to use 'commonFunctions.testObject'