# Changelog

**./app/sub-common/files/remote-io-common.js**
* Removed `exist` from 'testLocalDeviceArrayPopulated'

---

**./test-parts/03-internal_scipts/sub/common-request.js**
* Removed `exist` from 'validateResponseBodyArray'

---

**./test-parts/06-controller_models/models/m-definitions.js**
* Removed `exist` from 'checkManufacturerArrayRead'

---

**./test-parts/07-controller_files/files/con-rio_index_main.js - handleInitializationCompleteFunction**
* Removed `exist` check on 'compSpy.firstCall.args'

---

**./test-parts/07-controller_files/files/con-rio_index_node_list.js - verifyNodeListCalled**
* Removed `exist` check on 'nodeListSpy.lastCall.args'

---

**./test-parts/07-controller_files/sub/rio-spy_functions.js**
* Removed `exist` checks on 'callObject.args' values across different functions.

---

**./test-parts/08-api_requests/requests/req-admin_main.js**
* Removed `exist` from 'handleDhcpClients'

---

**./test-parts/08-api_requests/requests/req-devices_crud.js**
* Removed `exist` from 'handleSupportedModels'

---

**./test-parts/09-api_frontend/parts/02-add_all_devices.js**
* Removed `exist` from 'handlePrepare'

---

**./test-parts/09-api_frontend/parts/03-get_device_list.js**
* Removed `exist` from 'handleRetrieve'

---

**./test-parts/09-api_frontend/parts/04-check_device_list.js - handleCheckPrepare**
* Removed `exist` from "Device List Retrieved From Cache"
* Moved 'arrayFunctions.testPopulated' call.
	* From: "Device List Valid"
	* To: "Device List Retrieved From Cache"

---

**./test-parts/09-api_frontend/parts/06-check_node_array.js**
* Removed `exist` from 'handleManufacturerProperties'