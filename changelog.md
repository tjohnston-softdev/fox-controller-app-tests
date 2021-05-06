# Changelog

**./test-parts/part-g-controller_files/controller-main.js**
* Uncommented all function calls.

---

**./test-parts/part-g-controller_files/files/con-rio_index_node_reg.js**
* Removed 'registerArguments' global variable.
* Renamed 'rioArgFile' to 'registerArguments'

---

**./test-parts/part-g-controller_files/files/con-rio_index_node_reg_invalid.js**
* Removed 'registerArgumentObject' global variable.
* Renamed 'rioArgFile' to 'registerArgumentObject'
* Removed "Arguments Retrieved" test from 'handleNodeInvalidPrepare'
* Removed "Argument Object" test from 'handleNodeInvalidDispose'

---

**./test-parts/part-g-controller_files/sub-files/rio-spy_functions.js**
* Removed functions:
	* verifyGetDeviceStatus
	* verifyCheckNodeExists
	* verifyGetIoProperties
	* verifyModifyDevice
	* verifyGetNodeConfig
* Removed requirements:
	* commonPaths.commonErrors
	* commonPaths.commonObjects
* verifyAddDevice
	* Removed 'callObject.args[0]' undefined check.
* verifyGetDevice
	* Removed 'callObject.args[0]' undefined check.
* verifyRegisterNode, verifyDeleteDevice
	* Removed 'callObject.args[x]' undefined check.

---

**./test-parts/part-g-controller_files/sub-files/rio-node_args.js**
* 'res' is now declared as a blank object.
* Properties are defined on individual lines.
* Removed try-catch structure.
* File now exports results of 'defineRegisterArguments'
