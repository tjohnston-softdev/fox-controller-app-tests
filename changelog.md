# Changelog

**./test/fox-test-main.js**
* 'debug' test mode now calls "Part F - Controller Models"

---

**./test-parts/part-f-controller_models/models-main.js**
* Removed module requirements:
	* chai
	* chai-things
	* sinon
* Added global requirement for './models/m-model_definitions'
* Removed 'cSettingsIntegrationFile'
* Replaced `exports` with `module.exports`

---

**./test-parts/part-f-controller_models/models/m-model_definitions.js**
* Removed requirements:
	* chai-things
	* sinon
	* commonPaths.commonObjects
* The following files are now required directly:
	* foxPath.advantechFile
	* foxPath.moxaFile
	* foxPath.sonoffFile
* Removed globals:
	* advantechFull
	* moxaFull
	* sonoffFull
* Removed the 'readModelArray' function.
* handleManufacturerFile
	* Removed 'manufacturerPath' parameter.
	* 'manufacturerArray' is now a parameter.
* Changed 'checkManufacturerArrayRead' parameter name to 'modelArr'
* Changed 'checkModelsLoop' parameter name to 'modelArr'
* Replaced `exports` with `module.exports`

---

**./test-parts/part-f-controller_models/models/m-settings_integration.js**
* This file is now empty.
