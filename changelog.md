# Changelog

**./test/fox-test-main.js**
* 'debug' testing mode now calls "Part E - Remote IO Settings"

---

**./test-parts/part-e-rio_settings/rio-settings-main.js**
* Removed module requirements:
	* chai
	* chai-things
	* sinon
* File requirements are required globally and not inside a function.
* Uncommented function calls.
* Replaced `exports` with `module.exports`

---

**./test-parts/part-e-rio_settings/settings/set-main.js**
* Removed requirements:
	* chai-things
	* sinon
	* ../sub-settings/get-rio-set
* 'foxPath.rioSettingsFile' is now required directly.
* Removed the 'checkRemoteIoSettingsFileExists' function.
* Replaced `exports` with `module.exports`

---

**./test-parts/part-e-rio_settings/settings/set-props.js**
* Removed requirements:
	* chai-things
	* sinon
	* ../sub-settings/get-rio-set
* 'foxPath.rioSettingsFile' is now required directly.
* Removed the 'checkSettingsIncluded' function.
* Removed "Property - " from descriptions.
* Renamed "All properties strings" tests to "All Strings"
* Fixed capitalization for these tests:
	* "All Key-Value **p**airs **m**atch"
	* "Uses **s**ame **p**refixes"
* checkSignalTypeProperty
	* Renamed "All properties numbers" test to "All Numbers"
* Replaced `exports` with `module.exports`

---

**./test-parts/part-e-rio_settings/settings/set-functions.js**
* Removed requirements:
	* chai-things
	* ../sub-settings/get-rio-set
* The following files are now required directly:
	* foxPath.rioSettingsFile'
	* ../sub-settings/io-set-object
* Removed 'getPrefixIndexFile' function.
* Replaced `exports` with `module.exports`

---

**./test-parts/part-e-rio_settings/sub-settings/get-rio-set.js**
* This file is now empty.
