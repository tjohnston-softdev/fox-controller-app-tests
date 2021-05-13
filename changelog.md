# Changelog

### ./test-parts/part-i-api_frontend/front-main.js

**Changes**
* Uncommented 'cGetListFile' requirement.
* Uncommented 'callGetList'
* Commented out 'callCheckList'

---

### ./test-parts/part-i-api_frontend/parts/c-get_device_list.js

**General**
* Removed module requirements:
	* request
	* sinon
	* commonPaths.commonObjects
* Added 'commonPaths.httpRequestsFile' requirement.
* Replaced `exports` with `module.exports`

\
**handleRetrieve**
* Removed the 'retrieveError' variable.
* retrieveReturn
	* Assigned during "List Request Sent"
	* Assigned with 'httpRequests.defineOutput'
* Replaced 'reqModule' with 'httpRequests.getSuccessful'
* Removed the "List Request Successful" test.
* Removed 'callReadApiResponseArray'
	* 'retrieveReturn.body' is used directly.
	* Assigns 'resultList' variable.
