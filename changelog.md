# Changelog

**./test-parts/part-08-api_requests/requests/sub/common-health.js**
* Changes to 'testHealthDeviceObject'
	* Removed calls to 'objectFunctions.testPropExists'
	* Removed call to 'objectFunctions.testPropType'
	* 'healthObj.device' is now validated using 'commonFunctions.testObject'
	* Removed call to 'commonFunctions.testString' against 'healthObj.device.WARNING'
* Re-wrote expectations for 'testHealthNumberMaximum'
	* Before: `at.least` and `at.most`
	* After: `within`
* Changes to 'testHealthEnvironmentValue'
	* Removed call to 'objectFunctions.testPropExists'
	* Removed call to 'objectFunctions.testPropType'
	* Type validation is now performed using 'commonFunctions.testNumber'
* Removed 'objectFunctions.testPropExists' call from 'testHealthEnvironmentDummy'