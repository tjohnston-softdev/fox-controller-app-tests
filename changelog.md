# Changelog

### ./test/fox-test-main.js

**Changes**
* Commented out requirements:
	* settingsPart
	* modelsPart
	* controllerPart

---

### ./test-parts/part-h-api_requests/requests/req-admin_main.js

**Globals**
* Module Requirements
	* Removed 'sinon' and 'request'
	* Added 'needle'
* Removed 'adminFolder' global.
	* 'apiPaths.adminApi' is used directly.

\
**HTTP Request**
* Changed library from 'request' to 'needle'
* Affected functions:
	* handleDhcpClients
	* handleDefaultObject
	* handleLog

\
**handleDhcpClients**
* Removed variables:
	* dhcpRequestReturn
	* dhcpRequestError
* Merged these tests into "Request Made"
	* "Request Successful"
	* "Results Read"
* Renamed callback parameters:
	* 'aError' to 'adminErr'
	* 'aResult' to 'adminRes'
* Removed 'callReadApiResponseArray'

\
**handleDefaultObject**
* Removed variables:
	* defaultObjectError
	* defaultObjectReturn
* Renamed variables:
	* 'defaultObjectUrl' to 'defaultUrl'
	* 'defaultObjectRead' to 'defaultRead'
* Merged these tests into "Request Made"
	* "Request Successful"
	* "Results Read"
*  Renamed callback parameters:
	* 'aError' to 'adminErr'
	* 'aResult' to 'adminRes'
* Removed 'testString' test for 'defaultObjectRead.message'

\
**handleLog**
* Removed variables:
	* logError
	* logReturn
* Merged these tests into "Request Made"
	* "Request Successful"
	* "Results Read"
*  Renamed callback parameters:
	* 'aError' to 'adminErr'
	* 'aResult' to 'adminRes'
* Removed 'testObjectPropertyContent' check for 'logRead.success'

\
**Public**
Replaced `exports` with `module.exports`
