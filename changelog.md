# Changelog

**./app/test-array.js**
* Wrote new function 'checkNeutral'
	* Only checks for array type.
	* Does not check length.
* Added `exist` to 'checkDynamic'

---

**./app/sub-common/files/remote-io-common.js - testLocalDeviceArrayNeutral**
* Now uses 'arrayFunctions.testNeutral' instead of `expect` checks.

---

**./test-parts/07-controller_files/files/con-rio_index_node_list.js**
* Modified the following to use 'arrayFunctions.testNeutral' instead of `expect` checks.
	* "Node Array Returned" in 'handleNodeListFull'
	* verifyNodeListManufacturer

---

**./test-parts/07-controller_files/files/con-rio_index_node_reg.js**
* Changes to [...] "Unregister Function Successful" test:
	* Check that 'unregisterNodeSpy.firstCall.args' is an empty array.
	* Now uses 'arrayFunctions.testEmpty' instead of `expect`

---

**./test-parts/09-api_frontend/parts/01-check_database_empty.js - handleDatabaseCheck**
* Now uses 'arrayFunctions.testNeutral' instead of `expect` checks.

---

**./test-parts/09-api_frontend/sub/common-nodes - testNodeObjectArrayStructure**
* Now uses 'arrayFunctions.testNeutral' instead of `expect` checks.