# Changelog

**Test Status**
* Fixed errors for 'setDeviceOutput' invalid calls.
* Tests passed: 107 / 110

---

**./test-parts/part-g-controller_files/files/con-rio_index_node_reg.js**
* Commented out the following calls to 'coordinateSetDeviceOutputInvalidCall'
	* "Invalid ID Type"
		* Negative number.
	* "Invalid Prefix"
		* String.
		* Negative number.
	* "Invalid Index"
		* String number.
		* Null.
	* "Invalid Binary Signal"
		* String.
		* Negative number.
* Removed 'indexOverflowError' variable from 'handleSetDeviceOutput'
* Changes to 'coordinateSetDeviceOutputInvalidCall' function:
	* Renamed 'invalidCallObject' parameter to 'invalidSpy'
	* Replaced 'invalidCallObject' with 'invalidSpy.lastCall'
