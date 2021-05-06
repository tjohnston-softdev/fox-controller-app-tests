# Changelog

### Test Status

**Status**
* Revisions made to testing resulted in some errors for Remote IO Index registration functions:
	* Invalid calls for 'getIoProperties'
	* Invalid calls for 'setDeviceOutput'
* Overall passed:
	* 101 / 110

---

### ./test-parts/part-g-controller_files/controller-main.js

**Changes**
* Commented out all calls except for:
	* cRioIndexNodeRegisterFile
	* cRioIndexNodeRegisterInvalid

---

### ./test-parts/part-g-controller_files/files/con-rio_index_node_reg.js

**General**
* These files are now required directly:
	* foxPath.rioIndexFile
	* subCommonPath.rioCommonFile
	* ../sub-files/rio-spy_functions
	* ../sub-files/rio-node_args
* Removed spy global variables:
	* listAllSpy
	* addObjectSpy
	* getObjectSpy
	* *etc*
* Removed the 'getIndexFileRequirement' function.
* Replaced `exports` with `module.exports`

\
**handleNodePrepare**
* Removed tests:
	* "Remote IO Index"
	* "Remote IO Settings"
	* "Sub-Files"
	* "Spy Objects Assigned"

\
**handleBeforeList**
* Declared new variable 'beforeListSpy'
	* The spy will be handled locally instead of globally.
* Changed callback structure of 'listRemoteIoDevices'
* Replaced 'listAllSpy' with 'beforeListSpy'
* Replaced 'lastCall' with 'firstCall'
* Added new tests:
	* "Spy Assigned" at the start - Assigns 'beforeListSpy'
	* "Spy Disposed" at the end - Disposes 'beforeListSpy'

\
**handleStaticAdd**
* Renamed variables:
	* 'sCallbackID' to 'staticID'
	* 'sCallbackErr' to 'staticErr'
* Declared new variable 'staticAddSpy'
* Replaced 'addObjectSpy' with 'staticAddSpy'
* Replaced 'lastCall' with 'firstCall'
* Added new tests:
	* "Spy Assigned" at the start - Assigns 'staticAddSpy'
	* "Spy Disposed" at the end - Disposes 'staticAddSpy'
* Rewrote "Object ID Retained" test:
	* 'nodeTestID' must equal 'staticID'
	* Does not check for any specific type.
* Renamed callback parameters:
	* 'aError' to 'addingErr'
	* 'aID' to 'addedID'

\
**handleStaticGet**
* Renamed 'sObjectError' to 'staticErr'
* Declared new variable 'staticGetSpy'
* Replaced 'getObjectSpy' with 'staticGetSpy'
* Replaced 'lastCall' with 'firstCall'
* Changed callback structure of 'getRemoteIoDevice'
* Added new tests:
	* "Spy Assigned" at the start - Assigns 'staticGetSpy'
	* "Spy Disposed" at the end - Disposes 'staticGetSpy'

\
**handleCheckNodeExist**
* Renamed 'checkNodeExistReturn' to 'checkExistRes'
* Removed "Call Successful" test.

\
**handleGetIoProperties**
* Renamed 'getIoPropertiesReturn' to 'propertyRes'
* Removed "Call Successful" test.
* Renamed "Matching Name" test to "Matching Name**s**"

\
**handleNodeConfig**
* Renamed "Node Config Function Called" test to "Function Called"
* Removed the "Node Config Function Successful" test.

\
**handleRegisterNode**
* Declared variables:
	* 'registerSpy' - Spy object for registering node.
	* 'registerComplete' - Placeholder value for callback.
* Moved 'unregisterNodeSpy' variable from description to function root.
* Replaced 'registerNodeSpy' with 'registerSpy'
* Replaced 'lastCall' with 'firstCall' inside "Valid Register" description.
* Specific changes to "Valid Register" description:
	* Renamed "Register Function Called" to "Register Called"
	* Renamed "Register Function Successful" to "Register Successful"
	* Removed call to 'commonFunctionsFile.displayCallbackMessage'
	* When 'rioFile.registerNode' invokes callback, 'registerComplete' becomes True.
	* Added "Register Spy Assigned" test at the start - Assigns 'registerSpy'
	* Added "Register Spy Disposed" test at the end - Disposes 'registerSpy'

\
**handleSetDeviceOutput**
* Declared new variables:
	* setDeviceOutputSpy
	* setInvalidSpy
* Replaced 'setOutputSpy.lastCall' with 'setDeviceOutputSpy.firstCall'
* Added new tests to "Valid Device ID" description:
	* "Spy Assigned" at the start - Assigns 'setDeviceOutputSpy'
	* "Spy Disposed" at the end - Disposes 'setDeviceOutputSpy'
* Added new tests to "Invalid Calls" description:
	* "Spy Assigned" at the start - Assigns 'setInvalidSpy'
	* "Spy Disposed" at the end - Disposes 'setInvalidSpy'
* Added 'setInvalidSpy.lastCall' argument to 'coordinateSetDeviceOutputInvalidCall'
* All tests in the "Invalid Calls" description now have 'done' callbacks.

\
**callSetDeviceOutputVerification**
* Added new parameters:
	* 'sdoSpyCalled' - Replaces 'setOutputSpy.called'
	* 'sdoCallObject' - Replaces 'setOutputSpy.lastCall'

\
**coordinateSetDeviceOutputInvalidCall**
* Added 'invalidCallObject' parameter.

\
**coordinateCheckNodeExistInvalidCall**
* Declared 'invalidRes' variable.
	* Consumes 'rioFile.isNodeExists' result.
* Removed 'spyFile.verifyCheckNodeExistCalled' call.
* Removed 'exception' check.
* Replaced 'checkNodeExistSpy.lastCall.returnValue' with 'invalidRes'

\
**handleStaticDeleteObject**
* Declared 'deleteSpy' variable.
* Replaced 'deleteObjectSpy' with 'deleteSpy'
* Replaced 'lastCall' with 'firstCall'
* Added new tests:
	* "Spy Assigned" at the start - Assigns 'deleteSpy'
	* "Spy Disposed" at the end - Disposes 'deleteSpy'
* Renamed 'objCallFlag' variable to 'deleteFinished'

\
**handleAfterList**
* Variable changes:
	* Declared 'afterListSpy'
	* Renamed 'afterList' to 'afterListArray'
* Changed callback structure of 'listRemoteIoDevices'
* Replaced 'listAllSpy' with 'afterListSpy'
* Replaced 'lastCall' with 'firstCall'
* Renamed tests:
	* "List Function Called" to "Function Called"
	* "Function Called Successfully" to "Call Successful"
* Added new tests:
	* "Spy Assigned" at the start - Assigns 'afterListSpy'
	* "Spy Disposed" at the end - Disposes 'afterListSpy'

\
**handleNodeDispose**
* Removed "Spy Objects" test.
