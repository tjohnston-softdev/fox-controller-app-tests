# Changelog

**Test Status**
* Frontend testing revision complete.

---

**./test-parts/part-i-api_frontend/front-main.js**
* Uncommented 'cClearCacheFile' requirement.
* Uncommented 'callClearCache'

---

**./test-parts/part-i-api_frontend/parts/i-clear_cache.js**
* Removed module requirements:
	* sinon
	* request
* Added 'commonPaths.httpRequestsFile' requirement.
* Renamed variables in 'handleDatatabaseListCheck'
	* 'dbLink' to 'listURL'
	* 'dbReturn' to 'listReturn'
	* 'dbRead' to 'listRead'
* Removed the 'dbError' variable from 'handleDatatabaseListCheck'
* Replaced HTTP request call in 'handleDatatabaseListCheck'
	* Before: 'reqModule'
	* After: 'httpRequests.getSuccessful'
* 'listReturn' in 'handleDatatabaseListCheck'
	* Assigned during "List Request Sent"
	* Assigned with 'httpRequests.defineOutput'
* Removed the "Request Successful" test from 'handleDatatabaseListCheck'
* Removed 'callReadApiResponseArray' from 'handleDatatabaseListCheck'
	* 'listReturn.body' is used directly.
* Replaced `exports` with `module.exports`
