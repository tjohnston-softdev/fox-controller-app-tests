# Changelog

**./app/test-common.js**
* Moved functions to 'test-object.js'
	* 'checkBothObjectsSameProperties' as 'checkSameProps'
	* 'checkBothObjectsHaveSamePropertyValue' as 'checkSameValues'
* Commented out exports:
	* testBothObjectsSameProperties
	* testBothObjectsHaveSamePropertyValue

---

**Affected Files**
* ./app/
	* sub-common/files/remote-io-common.js
* ./test-parts/
	* part-b-external_modules/modules/pkg-needle.js
	* part-e-rio_settings/settings/set-props.js
	* part-g-controller_files/files/con-device_classes.js
