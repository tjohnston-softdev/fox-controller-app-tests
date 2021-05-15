# Changelog

**./test-parts/part-g-controller_files/sub-files/rio_spy_functions.js**
* Removed the 'commonPaths.foxRelative' requirement.
* Wrote new function 'verifyDevice' - Merges:
	* verifyAddDevice
	* verifyGetDevice
* Replaced `exports` with `module.exports`

---

**./test-parts/part-g-controller_files/files/**
* Replaced with 'verifyDeviceCalled'
	* verifyAddDeviceCalled
	* verifyGetDeviceCalled
* Affected files:
	* con-rio_index_node_invalid.js
	* con-rio_index_node_reg.js
