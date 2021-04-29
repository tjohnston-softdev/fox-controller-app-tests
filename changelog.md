# Changelog

**Test Status**
* Missing backup file error has been fixed.
* Online API testing is successful.

---

**./test-parts/part-h-api_requests/requests/req-storage.js**
* Removed 'stoFile' global.
	* This was obviously a holdover from when I was preparing the tests.
	* Uses a backup file I have since deleted for public release.
