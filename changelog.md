# Changelog

**./test-parts/part-c-internal_scripts/scripts/s-request_api.js**
* Updated function name references for 'commonRequestFunctions'

---

**./test-parts/part-c-internal_scripts/sub-scripts/common-request.js**
* validateResponseArray
	* Renamed to 'validateResponseBodyArray'
	* Called publicly as 'validateBodyArray'
* validateResponseObject
	* Renamed to 'validateResponseBodyObject'
	* Called publicly as 'validateBodyObject'
* writeReplyErrorExample
	* Called publicly as 'writeErrorExample'
* validateDeleteOptionsReturn
	* Called publicly as 'validateDeleteOptions'

---

**./test-parts/part-g-controller_files/files/con-rio_factories.js**
* Renamed 'rioCheckFile' requirement to 'rioFactoryReturn'
* Replaced factory return validation call
	* Before: `rioCheckFile.checkFactoryReturn`
	* After: `rioFactoryReturn.checkValid`

---

**./test-parts/part-g-controller_files/sub-files/rio-factory_return.js**
* checkFactoryReturnValid
	* Now called publicly as 'checkValid'

---

**./test-parts/part-h-api_requests/requests/**
* Updated references to the scripts in '../sub-requests/' to use the correct public names.
* Affected files:
	* req-admin_health.js
	* req-admin_main.js
	* req-alarm.js
	* req-storage.js

---

**./test-parts/part-h-api_requests/sub-requests/common-api.js**
* Renamed public function exports:
	* 'testArrayIpFourValue' as 'testArrayIpFour'
	* 'testArrayIpSixValue' as 'testArrayIpSix'
	* 'testArrayMacValue' as 'testArrayMac'
	* 'testDhcpMacLongValue' as 'testDhcpMacLong'
	* 'testDhcpMacShortValue' as 'testDhcpMacShort'
	* 'testFileNameArray' as 'testFileNames'
	* 'testZeroLeastArray' as 'testZeroLeastNumbers'
	* 'testPositiveNumberProperty' as 'testPositiveNumber'
	* 'testPositiveNumberPropertyArray' as 'testPositiveNumberArray'
	* 'testAlarmStateFlags' as 'testAlarmStates'
* testDhcpLeaseExpireValues
	* Renamed to 'testArrayDhcpLeaseExpireValues'
	* Called publicly as 'testArrayDhcpLeaseExpire'
* testWriteTimestamp
	* Renamed to 'testWriteTimestampValue'
	* Called publicly as 'testWriteTimestamp'
* testWriteTimestampArray
	* Renamed to 'testWriteTimestampArrayValues'
	* Called publicly as 'testWriteTimestampArray'

---

**./test-parts/part-h-api_requests/sub-requests/common-database.js**
* Renamed public function exports:
	* 'testDatabaseNames' as 'testNames'
	* 'testDatabaseFolderFlags' as 'testFolderFlags'
	* 'testDatabaseSizesEmpty' as 'testSizesEmpty'
	* 'testDatabaseSizesPopulated' as 'testSizesPopulated'

---

**./test-parts/part-h-api_requests/sub-requests/common-health.js**
* Renamed public function exports:
	* 'testHealthDeviceObject' as 'testDeviceObject'
	* 'testHealthTimezoneCodeValue' as 'testTimezoneCode'
	* 'testHealthNumberMaximum' as 'testMaximumNumber'
	* 'testHealthEnvironmentValue' as 'testEnvValue'
	* 'testHealthEnvironmentDummy' as 'testEnvDummy'

---

**./test-parts/part-h-api_requests/sub-requests/common-storage.js**
* Renamed public function exports:
	* 'testDriveLetterObject' as 'testLetterObject'
	* 'testDriveTotalObject' as 'testTotalObject'
	* 'testDriveUsedObject' as 'testUsedObject'
	* 'testDrivePercentageObject' as 'testPercentageObject'
	* 'testDriveLettersArray' as 'testLettersArray'
	* 'testDriveTotalArray' as 'testTotalArray'
	* 'testDriveUsedArray' as 'testUsedArray'
	* 'testDrivePercentagesArray' as 'testPercentagesArray'
	* 'testFileFlags' as 'testFlags'
	* 'testFolderCreationResult' as 'testFolderCreation'
* testDrivePropertyDefinitionsObject
	* Renamed to 'testDrivePropertiesObject'
	* Called publicly as 'testPropertiesObject'
* testMountObject
	* Renamed to 'testDriveMountObject'
	* Called publicly as 'testMountObject'
* testDrivePropertyDefinitionsArray
	* Renamed to 'testDrivePropertiesArray'
	* Called publicly as 'testPropertiesArray'
* testMountArray
	* Renamed to 'testDriveMountArray'
	* Called publicly as 'testMountArray'

---

**./test-parts/part-i-api_frontend/parts/**
* Updated references to the scripts in '../sub-parts/' to use the correct public names.
* Affected files:
	* b-add_all_devices.js
	* d-check_device_list.js
	* e-list_avaliable_nodes.js
	* f-check_node_array.js
	* g-get_device_properties.js
	* h-delete_added_devices.js

---

**./test-parts/part-i-api_frontend/sub-parts/common-nodes.js**
* Renamed public function exports:
	* 'testNodeObjectArrayStructure' as 'testArrayStructure'
	* 'testNodeObjectArrayProperties' as 'testArrayProperties'
	* 'testNodeObjectArrayContents' as 'testArrayContents'
	* 'testNodeStorageObject' as 'testStorageObject'
	* 'testNodeStoreCount' as 'testStoreCount'
	* 'testNodeManufacturerArray' as 'testManufacturerArray'
* testStatusControlStructure
	* Renamed to 'testStatusControlArrayStructure'
	* Called publicly as 'testStatusControlStructure'
* testStatusControlSyntax
	* Renamed to 'testStatusControlArraySyntax'
	* Called publicly as 'testStatusControlSyntax'
* testStatusControlIntegrity
	* Renamed to 'testStatusControlArrayIntegrity'
	* Called publicly as 'testStatusControlIntegrity'

---

**./test-parts/part-i-api_frontend/sub-parts/common-text.js**
* Function name changes:
	* Appended 'String' to the end of the internal name.
	* The public name is the internal name without 'String'
* Example:
	* Renamed 'writeDeviceHeader' to 'writeDeviceHeaderString'
	* Called publicly as 'writeDeviceHeader'

---

**./test-parts/part-j-restart_controller/modes/**
* Updated references to '../sub-modes/test-restart-return.js' to use the correct public names.
* This affects all files.

---

**./test-parts/part-j-restart_controller/sub-modes/test-restart-return.js**
* 'testProcessReturnObject' is now called publicly as 'testProcessReturn'
* testOfflineCheckResult
	* Renamed to 'testControllerOfflineCheckResult'
	* Called publicly as 'testOfflineCheckResult'
