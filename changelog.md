# Changelog

**./app/test-object.js**
* New file - Functions to test JSON objects.
* Split from 'test-common.js'
* Currently contains functions to check:
	* All properties type.
	* Key-Values match.
* More will be added later.

---

**./app/test-common.js**
* Moved functions to 'test-object.js'
	* 'checkObjectAllPropertiesType' as 'checkAllPropsType'
	* 'checkObjectMatchKV' as 'checkMatchKV'
	* 'checkObjectMatchKVInsensitive' as 'checkMatchKVInsensitive'
* Commented out exports:
	* testObjectAllPropertiesType
	* testObjectMatchKV
	* testObjectMatchKVInsensitive

---

**./app/paths/files/app-paths.js**
* Added property for: '../../test-object.js'

---

**Affected Files**
* ./test-parts/
	* part-e-rio_settings/settings/set-props.js
	* part-g-controller_files/files/con-device_settings.js
