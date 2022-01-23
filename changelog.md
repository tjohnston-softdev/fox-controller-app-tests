# Changelog

**./app/request-api.js**
* Renamed 'e' variable to:
	* 'arrayErr' in 'readApiResponseArray'
	* 'objectErr' in 'readApiResponseObject'
	* 'extractErr' in 'extractErrorText'

---

**./test-parts/02-external_modules/modules/pkg-validator.js - handleInvalidCall**
* Renamed 'e' variable to 'errorObject'

---

**./test-parts/03-internal_scripts/sub/request-invalid.js**
* Renamed 'e' variables to 'errorObj' where applicable.

---

**./test-parts/05-rio_settings/settings/set-functions.js**
* Renamed 'catchErr' variable to 'errorObj' in functions:
	* parseIoPrefixInvalidCall
	* parseIoIndexInvalidCall

---

**./test-parts/07-controller_files/files/con-device_classes.js**
* Renamed 'catchErr' variable to 'errorObj' in functions:
	* callStoredDeviceUnsupported
	* callConnectedDeviceUnsupported
	* callConnectedDeviceStructureError

---

**./test-parts/07-controller_files/files/con-device_settings.js - getSupportedLists**
* Renamed 'e' variable to 'errorObj'

---

**./test-parts/07-controller_files/files/con-rio_factories.js - callRemoteIoModuleInvalid**
* Renamed 'catchErr' variable to 'errorObj'

---

**./test-parts/07-controller_files/files/con-rio_ondex_node_reg.js**
* Renamed 'catchErr' variable to 'errorObj' in 'coordinateGetIoPropertiesInvalidCall'

---

**./test-parts/07-controller_files/files/con-rio_ondex_node_reg_invalid.js**
* Renamed 'catchErr' variable to 'errorObj' in 'coordinateRegisterNodeInvalidThrow'

---

**./test-parts/09-api_frontend/parts/02-add_all_devices.js**
* Renamed 'e' variable to 'createErr' in 'getDeviceCreateUrl'

---

**./test-parts/09-api_frontend/parts/04-check_device_list.js**
* Renamed 'catchErr' to 'retErr' in functions:
	* retrieveListFromCache
	* retrieveCountFromCache

---

**./test-parts/09-api_frontend/parts/06-check_node_array.js**
* Renamed 'catchErr' to 'callErr' in 'callNodeCache'

---

**./test-parts/09-api_frontend/parts/07-get_device_properties.js**
* Renamed 'catchErr' to 'callErr' in 'callNodeManufacturerPropertyList'

---

**./test-parts/09-api_frontend/parts/08-delete_added_devices.js**
* Renamed 'catchErr' to 'getCountErr' in 'getAddedDeviceCountFromCache'