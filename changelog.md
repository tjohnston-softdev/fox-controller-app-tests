# Changelog

**./app/test-common.js**
* Wrote 'checkFunction' - Checks if a given value if a function.

---

**./test-parts/01-common_data/items/itm-common_objects.js**
* Merged 'testObjectFunction' into 'handleRegisterNodeObject'
* 'commonObjectsFile.getRegisterNode' is validated using 'testCommon.testFunction'

---

**./test-parts/02-external_modules/modules/pkg-validator.js**
* Modified 'verifyFunctionsExist' to use 'commonFunctions.testFunction' instead of expectations.

---

**./test-parts/07-controller_files/files/con-device_classes.js**
* Modified 'handleDeviceConstructors' to use 'commonFunctions.testFunction' instead of expectations.

---

**./test-parts/07-controller_files/files/con-rio_factories.js**
* Modified 'handleRemoteIoModuleFunction' to use 'commonFunctions.testFunction' instead of expectations.

---

**./test-parts/07-controller_files/files/con-rio_index_main.js**
* Changes to "Event Successful" in 'handleInitializationCompleteFunction'
	* Declared local variable 'firstArg'
	* 'firstArg' is assigned as `compSpy.firstCall.args[0]` 
	* Removed chai expectations against 'compSpy.firstCall.args[0]'
	* 'firstArg' is validated using 'commonFunctions.testFunction'
	* 'compSpy.firstCall.callback' is now validated using 'commonFunctions.testFunction' instead of expectations.
* Changes to 'checkFunctionDefinitionLoop'
	* Removed chai expectations against 'currentFunction'
	* 'currentFunction' is now validated using 'commonFunctions.testFunction'

---

**./test-parts/07-controller_files/files/con-rio_index_node_list.js - verifyNodeListCalled**
* Declared local variables:
	* firstArg
	* secondArg
* 'firstArg' is assigned as `nodeListSpy.lastCall.args[0]`
* 'secondArg' is assigned as `nodeListSpy.lastCall.args[1]`
* Replaced 'nodeListSpy.lastCall.args[0]' reference with 'firstArg'. The validation itself is unchanged.
* Removed chai expectations against 'nodeListSpy.lastCall.args[1]'
* 'secondArg' is validated using 'commonFunctions.testFunction'
* Removed chai expectations against 'nodeListSpy.lastCall.callback'
* 'nodeListSpy.lastCall.callback' is now validated using 'commonFunctions.testFunction'

---

**./test-parts/07-controller_files/files/con-rio_index_node_reg.js - handleRegisterNode**
* Modified tests to use 'commonFunctions.testFunction' instead of chai expectations:
	* "Valid Register" - "Callback Function Returned"
	* "Valid Unregister" - "Callback Function Remembered"

---

**./test-parts/07-controller_files/sub/rio-spy_functions.js**
* Changes to 'verifyRemoteIoList'
	* Declared local variable 'firstArg'
	* 'firstArg' is assigned as `callObject.args[0]`
	* Removed expectations against 'callObject.args[0]'
	* 'firstArg' is validated using 'commonFunctions.testFunction'
	* 'callObject.callback' is now validated using 'commonFunctions.testFunction' instead of expectations.
* Changes to 'verifyDevice'
	* Declared local variables: 'firstArg' and 'secondArg'
	* 'firstArg' is assigned with `callObject.args[0]`
	* 'secondArg' is assigned with `callObject.args[1]`
	* Replaced 'callObject.args[0]' reference with 'firstArg'
	* Removed expectations against 'callObject.args[1]'
	* 'secondArg' is validated using 'commonFunctions.testFunction'
	* 'callObject.callback' is now validated using 'commonFunctions.testFunction' instead of expectations.
* Changes to 'verifyRegisterNode'
	* Declared 'firstArg' variable, assigned as `callObject.args[0]`
	* Declared 'secondArg' variable, assigned as `callObject.args[1]`
	* Declared 'thirdArg' variable, assigned as `callObject.args[2]`
	* Replaced 'callObject.args[0]' reference with 'firstArg'
	* Replaced 'callObject.args[1]' reference with 'secondArg'
	* Removed expectations against 'callObject.args[2]'
	* 'thirdArg' is validated using 'commonFunctions.testFunction'
* Changes to 'verifyDeleteDevice'
	* Declared 'firstArg' variable, assigned as `callObject.args[0]`
	* Declared 'secondArg' variable, assigned as `callObject.args[1]`
	* Declared 'thirdArg' variable, assigned as `callObject.args[2]`
	* Replaced 'callObject.args[0]' reference with 'firstArg'
	* Replaced 'callObject.args[1]' reference with 'secondArg'
	* Removed expectations against 'callObject.args[2]'
	* 'thirdArg' is validated using 'commonFunctions.testFunction'
	* 'callObject.callback' is now validated using 'commonFunctions.testFunction' instead of expectations.