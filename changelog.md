# Changelog

**./test-parts/part-g-controller_files/controller-main.js**
* Uncommented all function calls.

---

**./test-parts/part-g-controller_files/files/con-settings.js**
* Removed requirements:
	* sinon
	* commonPaths.commonObjects
* 'foxPath.settingsFile' is now required directly.
* Removed functions:
	* checkRequiredSettingsFiles
	* getSettingsMainRequirement
* Replaced `exports` with `module.exports`

---

**./test-parts/part-g-controller_files/files/con-settings_red.js**
* Removed requirements:
	* sinon
	* chai-things
	* commonPaths.localValid
	* commonPaths.commonObjects
* 'foxPath.redSettingsFile' is now required directly.
* Removed the 'getRedSettingsMainRequirement' function.
