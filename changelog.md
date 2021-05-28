# Changelog

**./app/sub-common/files/check-model-integrity.js**
* Renamed 'verifyDeviceListRefIntegrity' function to 'verifyReferenceIntegrity'
	* Public name remains unchanged.

---

**./app/sub-common/files/get-models.js**
* 'getAllSupportedModels' is now called publicly as 'getAllModels'
* Renamed the 'getManufacturerModels' function to 'getModelsByManufacturer'
	* Called publcily as 'getByManufacturer'

---

**./app/sub-common/files/remote-io-common.js**
* Changed public names:
	* 'testDeviceArrayStructure' as 'testDeviceArray'
	* 'testDeviceObjectStructure' as 'testDeviceObject'
	* 'compareGetDeviceToOriginal' as 'compareToOriginal'
	* 'testDeviceDeletedStructure' as 'testDeviceDeleted'
	* 'testNodeConfigObjectStructure' as 'testNodeConfigObject'
	* 'testPropertyArrayStructure' as 'testPropertyArray'
* testIdListed
	* Renamed to 'testDeviceIdListed'
	* Called publcily as 'testIdListed'
* testLocalArray
	* Renamed to 'testLocalDeviceArrayPopulated'
	* Called publcily as 'testLocalArrayPopulated'
* testLocalArrayEmpty
	* Renamed to 'testLocalDeviceArrayEmpty'
	* Called publicly as 'testLocalArrayEmpty'
* testLocalArrayNeutral
	* Renamed to 'testLocalDeviceArrayNeutral'
	* Called publicly as 'testLocalArrayNeutral'
* testLocalArrayDynamic
	* Renamed to 'testLocalDeviceArrayDynamic'
	* Called publcily as 'testLocalArrayDynamic'
* testDeviceListValidReturnEmpty
	* Renamed to 'testDeviceListReturnEmpty'
	* Called publicly as 'testDeviceListEmpty'
* testDeviceListValidReturnPopulated
	* Renamed to 'testDeviceListReturnPopulated'
	* Called publcily as 'testDeviceListPopulated'
* testDeviceListValidReturnNeutral
	* Renamed to 'testDeviceListReturnNeutral'
	* Called publcily as 'testDeviceListNeutral'
* testDeviceListValidReturnDynamic
	* Renamed to 'testDeviceListReturnDynamic'
	* Called publicly as 'testDeviceListDynamic'

---

**./app/sub-common/files/test-device-common.js**
* Changed public names:
	* 'testFrontendAddSuccessful' as 'testFrontendAdded'
	* 'testFrontendAddIdValid' as 'testFrontendIdValid'
* getRudUrl
	* Renamed to 'getDeviceRudUrl'
	* Called publcily as 'getRudUrl'
* getStatusUrl
	* Renamed to 'getDeviceStatusUrl'
	* Called publicly as 'getStatusUrl'
* testAddModifyReturnProperties
	* Renamed to 'testAddModifyResultObjectProperties'
	* Called publcily as 'testAddModifyResultProperties'
* testAddModifyReturnContents
	* Renamed to 'testAddModifyResultObjectContents'
	* Called publicly as 'testAddModifyResultContents'

---

**Affected Files**
* ./test-parts/
	* part-g-controller_files\files\
		* con-device_classes.js
		* con-rio_index_node_list.js
		* con-rio_index_node_reg.js
		* con-rio_index_node_reg_invalid.js
	* part-h-api_requests\requests\
		* req-devices_crud.js
		* req-devices_crud_invalid.js
		* req-devices_modify_invalid.js
	* part-i-api_frontend\parts\
		* a-check_database_empty.js
		* b-add_all_devices.js
		* c-get_device_list.js
		* d-check_device_list.js
		* h-delete_added_devices.js
