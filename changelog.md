# Changelog

**./app/test-common.js**
* Removed 'checkPresent' function.
	* `expect(value).to.exist;` has the same effect.
* Wrote new function 'checkObject'.

---

**./app/sub-common/files/http-requests.js**
* Modified functions to use 'commonFunctions.testObject' instead of 'commonFunctions.testPresent'
	* handleCallbackArguments
	* handleInvalidStatus
	* handleInvalidDelete

---

**./app/sub-common/files/remote-io-common.js**
* Re-wrote tests using 'commonFunctions.testPresent' to use `expect(value).to.exist;`

---

**./app/sub-common/files/test-device-common.js**
* Modified 'testFrontendAddSuccessful' to use 'commonFunctions.testObject' instead of 'commonFunctions.testPresent'
* Re-wrote 'testFrontendAddIdValid' to use `expect(value).to.exist;` instead of 'commonFunctions.testPresent'

---

**./test-parts/01-common_data/items/itm-common_objects.js**
* Removed the 'testObjectType' function.
* Replaced calls to 'testObjectType' with 'testCommon.testObject'

---

**./test-parts/02-external_modules/modules/pkg-needle.js**
* Modified functions to use 'commonFunctions.testObject' instead of 'commonFunctions.testPresent'
	* checkRequestReturn
	* checkModifyOutcome

---

**./test-parts/02-external_modules/modules/pkg-validator.js**
* Re-wrote tests using 'commonFunctions.testPresent' to use `expect(value).to.exist;`

---

**./test-parts/03-internal_scripts/scripts/s-supported-databases.js**
* Replaced 'commonFunctions.testPresent' with `expect(value).to.exist;`

---

**./test-parts/03-internal_scripts/sub/common-request.js**
* Modified 'validateResponseBodyArray' to use `expect(value).to.exist;` instead of 'commonFunctions.testPresent'
* Modified functions to use 'commonFunctions.testObject' instead of 'commonFunctions.testPresent'
	* validateResponseBodyObject
	* validateDeleteOptionsReturn

---

**./test-parts/05-rio_settings/settings/set-main.js**
* Replaced 'commonFunctions.testPresent' with `expect(value).to.exist;`

---

**./test-parts/06-controller_models/models/m-definitions.js**
* Replaced 'commonFunctions.testPresent' with `expect(value).to.exist;`

---

**./test-parts/07-controller_files/files/con-device_classes.js**
* Replaced 'commonFunctions.testPresent' with `expect(value).to.exist;` in these functions:
	* checkFiles
	* handleDeviceConstructors
* Modified functions to use 'commonFunctions.testObject' instead of 'commonFunctions.testPresent'
	* handleDeviceClasses
	* verifyStoredDeviceReturn

---

**./test-parts/07-controller_files/files/con-device_settings.js**
* Replaced 'commonFunctions.testPresent' with `expect(value).to.exist;` in these functions:
	* checkFiles
	* checkDeviceTypeArrayProperty
	* checkManufacturerListProperty
	* checkModelTypeListProperty
* Modified functions to use 'commonFunctions.testObject' instead of 'commonFunctions.testPresent'
	* checkSupportedModelDefinitions
	* checkGetModelFunction

---

**./test-parts/07-controller_files/files/con-rio_factories.js**
* Replaced 'commonFunctions.testPresent' with `expect(value).to.exist;` in these functions:
	* checkFile
	* handleRemoteIoModuleFunction
* Modified the "Call - Valid" test in 'handleRemoteIoModuleFunction'
	* Before: 'commonFunctions.testPresent'
	* After: 'commonFunctions.testObject'

---

**./test-parts/07-controller_files/files/con-rio_index_main.js**
* Replaced 'commonFunctions.testPresent' with `expect(value).to.exist;`

---

**./test-parts/07-controller_files/files/con-rio_index_node_list.js**
* Replaced 'commonFunctions.testPresent' with `expect(value).to.exist;`

---

**./test-parts/07-controller_files/files/con-rio_index_node_reg.js**
* Replaced 'commonFunctions.testPresent' with `expect(value).to.exist;` in these functions:
	* handleNodePrepare
	* handleStaticAdd
	* handleRegisterNode
* Modified functions to use 'commonFunctions.testObject' instead of 'commonFunctions.testPresent'
	* handleStaticGet
	* handleGetIoProperties
	* handleNodeConfig

---

**./test-parts/07-controller_files/files/con-rio_index_node_reg_invalid.js**
* Replaced 'commonFunctions.testPresent' with `expect(value).to.exist;` in 'handleTestDevice'
* Modified 'handleTestConfig' to use 'commonFunctions.testObject' instead of 'commonFunctions.testPresent'

---

**./test-parts/07-controller_files/files/con-service_main.js**
* Replaced 'commonFunctions.testPresent' with `expect(value).to.exist;`

---

**./test-parts/07-controller_files/files/con-settings.js**
* Replaced 'commonFunctions.testPresent' with `expect(value).to.exist;`

---

**./test-parts/07-controller_files/files/con-settings_red.js**
* Modified to use 'commonFunctions.testObject' instead of 'commonFunctions.testPresent'

---

**./test-parts/07-controller_files/sub/rio-spy_functions.js**
* Replaced 'commonFunctions.testPresent' with `expect(value).to.exist;`

---

**./test-parts/08-api_requests/requests/req-admin_health.js**
* Modified to use 'commonFunctions.testObject' instead of 'commonFunctions.testPresent'

---

**./test-parts/08-api_requests/requests/req-admin_main.js**
* Replaced 'commonFunctions.testPresent' with `expect(value).to.exist;` in 'handleDhcpClients'
* Modified functions to use 'commonFunctions.testObject' instead of 'commonFunctions.testPresent'
	* handleDefaultObject
	* handleLog

---

**./test-parts/08-api_requests/requests/req-alarm.js**
* Replaced 'commonFunctions.testPresent' with `expect(value).to.exist;`

---

**./test-parts/08-api_requests/requests/req-devices_crud.js**
* Replaced 'commonFunctions.testPresent' with `expect(value).to.exist;` in these functions:
	* handleSupportedModels
	* handleCreateDeviceTest
* Modified functions to use 'commonFunctions.testObject' instead of 'commonFunctions.testPresent'
	* handleDeviceDefaultValues
	* handleCreateDeviceTest
	* handleReadDeviceTest
	* handleDeviceStatusTest
	* handleUpdateDeviceTest
	* handleUpdateReviewTest
	* handleDeleteFlagTest
	* handleDeleteObjectTest

---

**./test-parts/08-api_requests/requests/req-devices_modify_invalid.js**
* Replaced 'commonFunctions.testPresent' with `expect(value).to.exist;`

---

**./test-parts/08-api_requests/requests/req-storage.js**
* Replaced 'commonFunctions.testPresent' with `expect(value).to.exist;` in 'handleFileList'
* Modified 'handleGlobalStatus' to use 'commonFunctions.testObject' instead of 'commonFunctions.testPresent'

---

**./test-parts/09-api_frontend/parts/01-check_database_empty.js**
* Replaced 'commonFunctions.testPresent' with `expect(value).to.exist;`

---

**./test-parts/09-api_frontend/parts/02-add_all_devices.js**
* Replaced 'commonFunctions.testPresent' with `expect(value).to.exist;`

---

**./test-parts/09-api_frontend/parts/03-get_device_lists.js**
* Replaced 'commonFunctions.testPresent' with `expect(value).to.exist;`

---

**./test-parts/09-api_frontend/parts/04-check_device_list.js**
* Replaced 'commonFunctions.testPresent' with `expect(value).to.exist;`

---

**./test-parts/09-api_frontend/parts/06-check_node_array.js**
* Replaced 'commonFunctions.testPresent' with `expect(value).to.exist;`

---

**./test-parts/09-api_frontend/parts/07-get_device_properties.js**
* Modified to use 'commonFunctions.testObject' instead of 'commonFunctions.testPresent'

---

**./test-parts/09-api_frontend/parts/09-clear_cache.js**
* Removed call to 'commonFunctions.testPresent'

---

**./test-parts/09-api_frontend/sub/common-nodes.js**
* Replaced 'commonFunctions.testPresent' with `expect(value).to.exist;`

---

**./test-parts/10-restart_controller/sub/test-restart-return.js**
* Modified to use 'commonFunctions.testObject' instead of 'commonFunctions.testPresent'