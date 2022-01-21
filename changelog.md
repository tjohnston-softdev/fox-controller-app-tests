# Changelog

**./app/sub-common/files/check-model-integrity.js**
* Changes to 'verifyReferenceIntegrity'
	* Uses `for` loop instead of `while`
	* Removed 'canContinue' variable.
	* Removed `expect(canContinue).to.be.true;`
	* Renamed 'dList' parameter to 'devList'
	* Renamed 'sList' parameter to 'srcList'
* Renamed 'matchCurrentDevice' parameters:
	* 'cDevice' to 'curDevice'
	* 'sModels' to 'srcModels'
* Removed all requirements.

---

**./app/sub-common/files/get-models.js**
* Renamed 'e' variable in 'getAllSupportedModels' to 'arrayErr'
* Renamed the following in 'getModelsByManufacturer'
	* 'sList' parameter to 'srcList'
	* 'res' variable to 'loopRes'

---

**./app/sub-common/files/http-requests.js**
* Removed 'objectFunctions.testPropExists' calls from:
	* handleInvalidStatus
	* handleInvalidDelete
* Removed 'commonPaths.testObject' requirement.

---

**./app/sub-common/files/load-fox-file.js**
* Renamed 'e' variable to 'loadErr'

---

**./app/sub-common/files/remote-io-common.js**
* Changes to 'testDeviceObjectStructure'
	* Removed 'objectFunctions.testPropExists' calls.
	* Declared 'passVal' variable, assigned as `deviceObj["password"]`
	* Declared 'modVal' variable, assigned as `deviceObj["__modified"]`
	* Removed 'objectFunctions.testPropType' calls.
	* Individual properties are validated using 'commonFunctions'
* Changes to 'testDeviceDeletedStructure'
	* Removed 'objectFunctions.testPropExists' call.
	* Removed 'objectFunctions.testPropType' call.
	* 'isDeleted' property is now validated using 'commonFunctions.testBoolean'
* Changes to 'testNodeConfigObjectStructure'
	* Removed calls to 'objectFunctions.testPropExists'
	* 'configObj.name' is now validated using 'commonFunctions.testString'
	* 'configObj.x' is now validated using 'commonFunctions.testNumber'
	* 'configObj.y' is now validated using 'commonFunctions.testNumber'
	* 'configObj.wires' is now validated using 'commonFunctions.testNeutral'
* Removed 'arrayFunctions.testAllPropExists' calls from 'testPropertyArrayStructure'
* Renamed 'dListReturn' parameter to 'devListReturn' in functions:
	* testDeviceListReturnEmpty
	* testDeviceListReturnPopulated
	* testDeviceListReturnNeutral
* Renamed 'dListRet' parameter to 'devListRet' in functions:
	* testDeviceListReturnDynamic
	* testDeviceListCommon

---

**./app/sub-common/files/remote-io-invalid_data.js**
* Removed requirements:
	* chai
	* chai-things
	* commonPaths.foxRelative
	* commonPaths.commonObjects

---

**./app/sub-common/files/test-device-common.js**
* Removed:
	* 'testAddModifyResultObjectProperties' function.
	* 'commonPaths.testObject' requirement.

---

**./test-parts/08-api_requests/requests/req-devices_crud.js**
* Removed "Correct Properties" tests from:
	* handleCreateDeviceTest
	* handleUpdateDeviceTest

---

**./test-parts/08-api_requests/requests/req-devices_modify_invalid.js**
* Removed 'deviceCommon.testAddModifyResultProperties' call from 'handleUnchangedModifyTest'