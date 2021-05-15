# Changelog

**./app/sub-common/files/http-request.js**
* Added requirement for 'commonPaths.requestApiPaths'
* Wrote new function 'requestFactoryReset'
	* Sends POST request to factory reset endpoint.
	* Unlike other HTTP requests, this is performed async.
	* Called publicly as 'factoryReset'
* Wrote new function 'checkFactoryResetResult'
	* Validates HTTP reply for factory reset.
	* This is a separate function because there is a delay between request and response.
	* Essentially a stand-alone function for valid request results.
	* Called publicly as 'checkFactoryReset'

---

**./test-parts/part-j-restart_controller/modes/mode-factory_reset.js**
* Removed global variables:
	* factoryReturn
	* factoryError
* Removed module requirements:
	* needle
	* commonPaths.requestApiPaths
* Declared new global variable 'factoryOutput'
	* Declared as a blank object.
	* Stores factory reset request output.
	* Assigned during 'handleFactoryReset'
	* Disposed during 'handleFactoryResult'
* handleFactoryReset
	* Removed the 'factoryResetUrl' variable.
	* Calls 'httpRequests.factoryReset'
* handleFactoryResult
	* "Request Successful" only calls 'httpRequests.checkFactoryReset'
	* "Reply Disposed" sets 'factoryOutput' to null.
	* Replaced 'factoryReturn' with 'factoryOutput.reply'
