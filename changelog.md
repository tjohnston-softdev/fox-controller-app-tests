# Changelog

**./test/fox-test-main.js**
* The 'debug' mode now calls "Part F - Controller Models"

---

**./app/test-reference.js**
* Replaced calls:
	* 'checkObjectSearchValue' with 'readCurrentObject'
	* 'getJsonObjectValues' with 'getObjectValues'

---

**./test-parts/part-c-internal_scripts/sub-scripts/common-request.js**
* Replaced 'commonFunctionsFile' with 'arrayFunctions' when calling:
	* testPopulated
	* testAllType

---

**./test-parts/part-h-api_requests/requests/req-storage.js**
* Added missing 'commonPaths.testObject' requirement.
