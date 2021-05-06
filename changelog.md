# Changelog

**./test-parts/part-g-controller_files/controller-main.js**
* Commented out 'cRioIndexNodeRegisterFile' call.

---

**./test-parts/part-g-controller_files/files/con-rio_index_node_reg_invalid.js**
* The following files are now required directly:
	* foxPath.rioIndexFile
	* subCommonPath.rioCommonFile
	* ../sub-files/rio-spy_functions
	* ../sub-files/rio-node_args
* handleNodeInvalidPrepare
	* Removed "Remote IO Index" test.
	* Removed "Sub-Files" test.
	* Renamed "Spy Objects Assigned" test to "Global Spy Objects Assigned"
* handleOriginalList
	* Renamed 'oError' variable to 'origErr'
* handleTestDevice
	* Renamed 'aError' callback parameter to 'addRioErr'
	* Renamed 'aID callback parameter to 'addedID'
	* Moved spy disposal to new test - "Add Spy Disposed"
* handleTestConfig
	* Removed 'conSpy' variable.
	* Removed "Function Successful" test.
	* Removed 'done' callback from "Correct Return Structure" test.
	* Renamed "Node Config Function Called" test to "Retrieved"
* Renamed variables in 'handleNodeID'
	* 'iFormatObject' to 'formatObject'
	* 'iTypeObject' to 'typeObject'
	* 'iPropObject' to 'propObject'
* handleIndexOverflow
	* Renamed 'iOverflow' to 'overflowObject'
* Renamed variables in 'handleIoSetObject'
	* 'iTypeSet' to 'typeSet'
	* 'iNullSet' to 'nullSet'
* coordinateRegisterNodeInvalidCallback
	* Removed 'testPresent' check for 'callbackParse'
	* Removed 'testString' check for 'callbackParse'
* coordinateRegisterNodeInvalidThrow
	* Removed `console.log`
* getCallbackErrorMessage
	* Reordered IF structure conditions.
	* 'null' does not count as an object.
	* Renamed 'mRes' to 'messageRes'
* handleTestDelete
	* Moved spy assignment to its own test.
	* Renamed "Delete Test Complete" test to "Spy Disposed"
	* Renamed "Delete Function Called" test to "Function Called"
	* Replaced 'lastCall' with 'firstCall'
* handleNodeInvalidDispose
	* Renamed "Function Spy Objects" test to "Global Spy Objects Disposed"
	* Added 'done' callback to "Global Spy Objects Disposed" test.
* Removed the 'getRequiredRegisterFile' function.
* Replaced `exports` with `module.exports`
