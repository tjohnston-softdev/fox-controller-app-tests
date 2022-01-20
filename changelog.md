# Changelog

**./test-parts/part-08-api_requests/requests/req-admin_main.js**
* Changes to 'handleDhcpClients'
	* Removed 'arrayFunctions.testAllPropExists' calls.
	* Moved 'arrayFunctions.testAllPropType' calls from "Correct Contents" to "Correct Properties"
* Removed 'objectFunctions.testPropExists' call from 'handleDefaultObject'
* Changes to 'handleLog'
	* Removed 'objectFunctions.testPropExists' calls
	* Renamed "Valid Return Structure" to "Valid Object"

---

**./test-parts/part-08-api_requests/requests/req-admin_health.js**
* Removed 'objectFunctions.testPropExists' calls from 'handleIdentification'
* Changes to 'handleTime'
	* Re-wrote "Time Object" test to use 'commonFunctions.testObject'
	* Removed 'objectFunctions.testPropExists' call from "Timezone Offset Code"
	* Removed 'objectFunctions.testPropExists' call from "Timezone Name"
* Changes to 'handleSpeed'
	* Re-wrote "Current Speed Object" test to use 'commonFunctions.testObject'
	* Removed 'objectFunctions.testPropExists' call from "Array" test.
* Changes to 'handleRam'
	* Re-wrote "Memory Object" test to use 'commonFunctions.testObject'
	* Modified "Buffer Cache" test to use 'commonFunctions.testNumber'
* Removed 'objectFunctions.testPropExists' call from 'handleFileSystem'
* Changes to 'handleEnvironment'
	* Re-wrote "Environment Object" test to use 'commonFunctions.testObject'
* Changes to 'handleNetwork'
	* Removed 'objectFunctions.testPropExists' call.
	* Removed 'arrayFunctions.testAllPropExists' calls.
* Changes to 'handleDatabase'
	* Removed 'objectFunctions.testPropExists' call.
	* Removed 'arrayFunctions.testAllPropExists' calls.
* Changes to 'handleLog'
	* Removed 'objectFunctions.testPropExists' calls.
	* Modified "Log Size" test to use 'commonFunctions.testNumber' instead of 'objectFunctions.testPropType'