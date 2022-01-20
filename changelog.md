# Changelog

**./test-parts/part-07-controller_files/files/con-device_settings.js**
* Removed 'objectFunctions.testPropExists' calls from 'checkSupportedModelDefinitions'
* Removed "Exists" test from 'checkDeviceTypeObjectProperty'
* Removed "Exists" test from 'checkDeviceTypeArrayProperty'
* Changes to 'checkCommunicationTypeProperty'
	* Removed "Exists" test.
	* Modified "Valid Type" test to use 'commonFunctions.testObject' instead of 'objectFunctions.testPropType'
* Modified "Exists" test to use 'commonFunctions.testFunction' in the following:
	* checkBinSignalFunction
	* checkScaleDecimalValueFunction
	* checkValidateBinSignalFunction
* Changes to 'checkGetModelFunction'
	* Modified "Exists" test to use 'commonFunctions.testFunction'
	* Removed 'objectFunctions.testPropExists' calls.
	* Removed 'objectFunctions.testPropType' calls.
* Removed "Exists" test from 'checkManufacturerListProperty'
* Removed "Exists" test from 'checkModelTypeListProperty'
* Renamed "Array" tests to "Valid Array" in functions:
	* checkManufacturerListProperty
	* checkModelTypeListProperty
* 'getSupportedLists' result properties are now assigned individually.

---

**./test-parts/part-07-controller_files/files/con-device_classes.js**
* Changes to "Connected Device Class" - "Valid Model" test:
	* Removed 'objectFunctions.testPropExists' call.
	* Removed 'objectFunctions.testPropType'
	* 'connectRes.storedDevice' is now validated using 'commonFunctions.testObject'
* Renamed 'e' variable to 'catchErr' in functions:
	* callStoredDeviceUnsupported
	* callConnectedDeviceUnsupported
	* callConnectedDeviceStructureError
* Renamed 'thrownError' variable in 'callConnectedDeviceStructureError' to 'structureError'

---

**./test-parts/part-07-controller_files/files/con-rio_factories.js - callRemoteIoModuleInvalid**
* Renamed 'e' variable to 'catchErr'

---

**./test-parts/part-07-controller_files/files/con-rio_index_main.js - handleInitializationFunction**
* Removed `expect(initSpy.firstCall.args).to.deep.equal([]);`
* 'initSpy.firstCall.args' is now validated using 'arrayFunctions.testEmpty'

---

**./test-parts/part-07-controller_files/files/con-rio_index_node_list.js**
* Removed some whitespace.

---

**./test-parts/part-07-controller_files/files/con-rio_index_node_reg.js**
* Changes to "Object Structure Valid" in 'handleGetIoProperties'
	* Removed 'objectFunctions.testPropExists' calls.
* Changes to 'coordinateGetIoPropertiesInvalidCall'
	* Renamed 'e' variable to 'catchErr'

---

**./test-parts/part-07-controller_files/files/con-rio_index_node_reg_invalid.js**
* Removed 'commonFunctions.testString' call from "Test ID Retained" in 'handleTestDevice'
* Renamed 'e' variable to 'catchErr' in 'coordinateRegisterNodeInvalidThrow'

---

**./test-parts/part-07-controller_files/files/con-service_main.js**
* Changes to 'handleControllerObject'
	* Removed "Property Exists" test.
	* Removed "Valid Type" test.
	* Wrote new "Valid Object" test, essentially merging the previous.
* Re-wrote tests to use 'commonFunctions.testFunction'
	* handleGeneralFunctions
	* handleRedFunctions
	* handleProcessFunctions
* Removed 'commonPaths.testObject' requirement.

---

**./test-parts/part-07-controller_files/files/con-settings.js**
* Re-wrote tests in 'handleFlagProperties' to use 'commonFunctions.testBoolean'
* Removed 'objectFunctions.testPropExists' calls from 'handlePathProperties'
* Removed 'commonPaths.testObject' requirement.

---

**./test-parts/part-07-controller_files/sub/rio-spy_functions.js - verifySetDeviceOutput**
* Declared 'targetArguments' variable.
* 'targetArguments' is assigned as `[aID, aPrefix, aIndex, aToggle]`
* Replaced `[aID, aPrefix, aIndex, aToggle]` reference with 'targetArguments'

---

**./test-parts/part-07-controller_files/sub/rio-factory_return.js**
* Removed calls:
	* objectFunctions.testPropExists
	* objectFunctions.testPropType
* Tests are now performed using 'commonFunctions.testFunction'
* Removed 'commonPaths.testObject' requirement.