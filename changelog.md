# Changelog

**./app/test-common.js**
* checkInvalidFunctionResult
	* Replaced 'rArray' parameter with 'rObject'
	* Removed 'successElement' and 'messageElement' variables.
	* Removed 'rArray' checks.
	* Replaced 'successElement' with 'rObject.successful'
	* Replaced 'messageElement' with 'rObject.errorText'
* Wrote new function 'prepareInvalidFunctionResult'
	* Prepares result object for invalid function execution.
	* Replaces common array.
	* Called publicly as 'prepareInvalidResult'

---

**./test-parts/part-b-external_modules/modules/pkg-validator.js**
* handleInvalidCall
	* 'res' is now assigned using 'commonFunctionsFile.prepareInvalidResult'
	* This is instead of using a simple array.
	* Parent functions remain unchanged.

---

**./test-parts/part-c-internal_scripts/scripts/s-local_valid.js**
* Changes to 'cRes' variable in 'callExampleInvalid'
	* Renamed to 'callRes'
	* Assigned using 'commonFunctionsFile.prepareInvalidResult'

---

**./test-parts/part-c-internal_scripts/scripts/s-request_api.js**
* Result variables are assigned using 'commonFunctionsFile.prepareInvalidResult' for these functions:
	* runRequestUrlInvalid
	* runReadResponseInvalidArray
	* runReadResponseInvalidObject
	* runReadResponseInvalidString
	* runReadResponseInvalidError
	* runValidateResponseInvalid
	* runRefuseError
	* runOptionError

---

**./test-parts/part-e-rio_settings/settings/set-functions.js**
* Result variables are assigned using 'commonFunctionsFile.prepareInvalidResult' for these functions:
	* parseIoPrefixInvalidCall
	* parseIoIndexInvalidCall

---

**./test-parts/part-g-controller_files/files/con-device_classes.js**
* Result variables are assigned using 'commonFunctionsFile.prepareInvalidResult' for these functions:
	* callStoredDeviceUnsupported
	* callConnectedDeviceUnsupported
	* callConnectedDeviceStructureError

---

**./test-parts/part-g-controller_files/files/con-rio_factories.js**
* callRemoteIoModuleInvalid
	* 'remoteRes' is now assigned using 'commonFunctionsFile.prepareInvalidResult'

---

**./test-parts/part-g-controller_files/files/con-rio_index_node_reg.js**
* coordinateGetIoPropertiesInvalidCall
	* 'ioRes' is now assigned using 'commonFunctionsFile.prepareInvalidResult'

---

**./test-parts/part-g-controller_files/files/con-rio_index_node_reg_invalid.js**
* coordinateRegisterNodeInvalidThrow
	* 'regRes' is now assigned using 'commonFunctionsFile.prepareInvalidResult'
