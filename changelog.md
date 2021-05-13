# Changelog

### Test Status

**Front End Testing**
* Caught errors during node array checking.
	* 'Manufacturer Property List' is not retrieved correctly.
	* 'Nodes Present' is counted incorrectly.

---

### ./test-parts/part-i-api_frontend/front-main.js

**Changes**
* Uncommented 'cGetDeviceStatusFile' requirement.
* Uncommented 'callGetDeviceStatus'
* Commented out 'callDeleteDevices'

---

### ./test-parts/part-i-api_frontend/parts/g-get_device_properties.js

**General**
* Removed module requirements:
	* request
	* sinon
	* commonPaths.commonObjects
	* commonPaths.defineApi
* Added 'commonPaths.httpRequestsFile' requirement.
* Replaced `exports` with `module.exports`

\
**getPropertiesLoop**
* Renamed variables:
	* 'currentManufacturerIndex' to 'loopIndex'
	* 'currentManufacturerName' to 'currentName'
	* 'currentManufacturerArray' to 'currentArray'
* 'currentArray' is declared as an array.

\
**loopCurrentManufacturerStatus**
* Renamed variables:
	* 'currentDeviceIndex' to 'deviceIndex'
	* 'currentDeviceObject' to 'currentObject'
	* 'currentDeviceName' to 'currentName'
	* 'currentDeviceID' to 'currentID'
	* 'currentDeviceDesc' to 'currentDesc'
* Loop variables are declared as their intended type.
* Converted `while` loop to `for` loop.

\
**testCurrentDeviceStatus**
* Removed variables:
	* urlPart
	* dRequestError
* Renamed variables:
	* 'dRequestUrl' to 'deviceURL'
	* 'dRequestReturn' to 'deviceReturn'
	* 'dRequestRead' to 'deviceRead'
* Renamed parameters:
	* 'mName' to 'deviceManufacturer'
	* 'dName' to 'deviceName'
	* 'id' to 'deviceID'
* deviceReturn
	* Assigned during "Request Made"
	* Assigned with 'httpRequests.defineOutput'
* Replaced 'reqModule' with 'httpRequests.getSuccessful'
* Removed the "Request Successful" test.
* Removed 'testString' check in "Correct Node Name"

\
**callNodeManufacturerPropertyList**
* Renamed 'mplRes' variable to 'listRes'
