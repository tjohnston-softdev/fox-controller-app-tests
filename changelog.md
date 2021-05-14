# Changelog

**Test Status**
* 'Check Node Array' errors have been fixed.
	* The Node cache was not retrieved properly.
	* The retrieval is called when the program starts before the cache can be populated.

---

**./test-parts/part-i-api_frontend/parts/part-f-check_node_array.js**
* 'nodeCacheObject' is now a variable instead of a constant.
	* Declared as null.
	* Assigned during 'handleStructure'
* Wrote new function 'handleCacheDisposal'
	* Used to dispose 'nodeCacheObject' after testing is complete.
