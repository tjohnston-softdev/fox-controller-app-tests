# Changelog

### Test Status

**Part I - Frontend Testing**
* 'Check Device List Empty' tests pass.
* Module requirements are no longer broken.

---

### ./test-parts/part-i-api_frontend/parts/a-check_database_empty.js

**General**
* Removed module requirements:
	* request
	* sinon
	* commonPaths.commonObjects
	* commonPaths.deviceCommonFile
* Added 'commonPaths.httpRequestsFile' requirement.
* Replaced `exports` with `module.exports`

\
**handleDatabaseRetrieve**
* Removed the 'listError' variable.
* listReturn
	* Assigned during "Request Sent"
	* Assigned with 'httpRequests.defineOutput'
* Replaced 'reqModule' with 'httpRequests.getSuccessful'
* Removed the "Request Successful" test.
* Removed 'callReadApiResponseArray'
	* 'listReturn.body' is used directly.
	* Used to assign 'retrievedDatabaseList'
