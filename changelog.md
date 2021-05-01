# Changelog

**./app/common-errors.js**
* Renamed 'getPropertiesUndefinedError' to 'rioPropertiesUndefinedError'

---

**./test-parts/part-a-common_data/items/itm-common_errors.js**
* Removed 'chai-things' and 'sinon' module requirements.
* 'commonPaths.commonErrors' is now required directly.
* 'testCommonErrors' has been expanded into two `it` blocks
	* Strings
	* Functions
* Removed functions:
	* verifyCommonErrorFileExists
	* verifyCommonErrorPropertiesValid
	* getCommonErrorsFile
	* notTypeError
	* notExistError
	* emptyError
* Rewrote functions to use chai expectations:
	* testFunctionProperty
	* testStringProperty
* Replaced `exports` with `module.exports`
