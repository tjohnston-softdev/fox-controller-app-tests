# Changelog

**./test-parts/part-b-external_modules/modules/pkg-request.js**
* Removed module requirements:
	* chai-things
	* sinon
* Renamed 'aReq' to 'request'
* Removed 'rSpy' global.
* Removed functions:
	* verifyRequestExists
	* 'verifyRequestFunction' - Merged into 'testRequest'
	* checkRequestSpy
* Renamed "Exists" test to "Function Exists"
* Removed "Complete" test.
* checkRequestReturn
	* Renamed parameter to 'replyObj'
* validateGivenProperty
	* Renamed 'gPropertyName' parameter to 'gProp'
	* Renamed 'gPropertyType' parameter to 'gType'
* Replaced `exports` with `module.exports`

---

**./test-parts/part-b-external_modules/sub-modules/ip-strings.js**
* Public variables are now defined using a function.
* Property names are unchanged.
