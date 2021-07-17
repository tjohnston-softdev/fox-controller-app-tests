# Changelog

**./app/test-common.js**
* Moved 'getJsonObjectProperties' to 'test-object.js' as 'getObjectProperties'
* Commented out 'getObjectProperties' export.

---

**./app/test-object.js**
* 'getObjectProperties' is called publicly as 'getProps'

---

**./test-parts/part-i-api_frontend/parts/f-check_node_array.js**
* Added requirement for 'commonPaths.testObject'
* Replaced 'commonFunctionsFile.getObjectProperties' with 'objectFunctions.getProps'
