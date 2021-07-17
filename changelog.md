# Changelog

**./app/test-reference.js**
* New file - Tests referential integrity for object arrays.
* Split from 'test-common.js'
* Only 'checkPropSearchValues' can be called publicly.

---

**./app/test-common.js**
* Moved functions to 'test-reference.js'
	* 'checkObjectSearchValue' as 'readCurrentObject'
	* 'checkPropertySearchValues' as 'checkPropSearchValues'
	* 'getJsonObjectValues' as 'getObjectValues'
* Commented out exports:
	* testObjectSearchValue
	* testPropertySearchValues
	* getObjectValues

---

**./app/paths/files/app-paths.js**
* Added property for '../../test-reference.js'

---

**./test-parts/part-f-controller_models/models/m-model_definitions.js**
* Required 'commonPaths.testRef'
* Replaced 'commonFunctionsFile.testPropertySearchValues' with 'referenceFunctions.testPropSearchValues'
