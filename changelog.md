# Changelog

### ./test-parts/part-i-api_frontend/front-main.js

**Changes**
* Uncommented 'cAddDevicesFile' requirement.
* Uncommented 'callAddDevices'
* Commented out 'callGetList'

---

### ./test-parts/part-i-api_frontend/parts/b-add_all_devices.js

**General**
* Removed module requirements:
	* request
	* sinon
* Added 'commonPaths.httpRequestsFile' requirement.
* Replaced `exports` with `module.exports`

\
**addModelsLoop**
* Renamed variables:
	* 'supportedModelIndex' to 'modelIndex'
	* 'supportedModelElement' to 'currentModel'
	* 'supportedModelDesc to 'currentDesc'
* Loop variables are declared as their intended type.
* Converted the `while` loop to a `for` loop.

\
**addCurrentSupportedModel**
* Renamed 'dModel' parameter to 'baseModel'
* Removed variables:
	* addOptions
	* addError
* Renamed variables:
	* 'addObject' to 'preparedModel'
	* 'addID' to 'newObjectID'
* addReturn
	* Assigned during "Add Request Sent"
	* Assigned with 'httpRequests.defineOutput'
* Replaced 'reqModule' with 'httpRequests.postSuccessful'
* Removed the "Add Request Successful" test.
