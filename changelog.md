# Changelog

**./test/fox-test-main.js**
* Uncommented requirements:
	* settingsPart
	* modelsPart
	* controllerPart

---

**./app/sub-common/files/load-fox-path.js**
* New file - Used to require FOX Controller files in a try-catch manner.

---

**./app/paths/files/app-paths.js**
* Added new path property 'loadFox' - Refers to:
	* ./app/sub-common/files/load-fox-path.js

---

**./test-parts/part-e-rio_settings/settings/set-main.js**
* Added requirement for 'commonPaths.loadFox'
* 'foxPath.rioSettingsFile' is now required using 'loadFoxFile'
* Declared 'checkFile' function.
	* Used to test whether the FOX Controller file was successfully loaded.

---

**./test-parts/part-e-rio_settings/settings/set-props.js**
* Added requirement for 'commonPaths.loadFox'
* 'foxPath.rioSettingsFile' is now required using 'loadFoxFile'

---

**./test-parts/part-e-rio_settings/settings/set-functions.js**
* Added requirement for 'commonPaths.loadFox'
* 'foxPath.rioSettingsFile' is now required using 'loadFoxFile'
* Removed 'checkPrepare' function.

---

**./test-parts/part-f-controller_models/models/m-model_definitions.js**
* Added requirement for 'commonPaths.loadFox'
* The following files are now required using 'loadFoxFile'
	* foxPath.rioSettingsFile
	* foxPath.advantechFile
	* foxPath.moxaFile
	* foxPath.sonoffFile
* Declared 'checkFiles' function.
	* Used to test whether the FOX Controller files were successfully loaded.
	* Separate tests for 'Remote IO Settings' and 'Model Definitions'

---

**./test-parts/part-g-controller_files/files/con-device_settings.js**
* Added requirement for 'commonPaths.loadFox'
* The following files are now required using 'loadFoxFile'
	* foxPath.rioSettingsFile
	* foxPath.advantechFile
	* foxPath.moxaFile
	* foxPath.sonoffFile
	* foxPath.deviceSettingsFile
* Declared 'checkFiles' function.
	* Used to test whether the FOX Controller files were successfully loaded.
	* Separate tests for 'Remote IO Settings', 'Model Definitions', and 'Device Settings'

---

**./test-parts/part-g-controller_files/files/con-device_classes.js**
* Added requirement for 'commonPaths.loadFox'
* The following files are now required using 'loadFoxFile'
	* foxPath.storedDeviceClassFile
	* foxPath.connectedDeviceClassFile
* Declared 'checkFiles' function.
	* Used to test whether the class files were successfully loaded.

---

**./test-parts/part-g-controller_files/files/con-rio_factories.js**
* Requirements
	* Removed 'sinon'
	* Added 'commonPaths.loadFox'
* 'foxPath.rioFactoriesFile' is now required using 'loadFoxFile'
* Declared 'checkFile' function.
	* Used to test whether the FOX Controller file was successfully loaded.

---

**./test-parts/part-g-controller_files/files/con-rio_index_main.js**
* Added requirement for 'commonPaths.loadFox'
* 'foxPath.rioIndexFile' is now required using 'loadFoxFile'
* Declared 'checkFile' function.
	* Used to test whether the FOX Controller file was successfully loaded.

---

**./test-parts/part-g-controller_files/files/con-rio_index_node_reg.js**
* Added requirement for 'commonPaths.loadFox'
* The following files are now required using 'loadFoxFile'
	* foxPath.rioIndexFile
	* foxPath.rioSettingsFile
* Added "Files Loaded" test to 'handleNodePrepare'

---

**./test-parts/part-g-controller_files/files/con-service_main.js**
* Added requirement for 'commonPaths.loadFox'
* 'foxPath.serviceMainFile' is now required using 'loadFoxFile'
* Declared 'checkFile' function.
	* Used to test whether the FOX Controller file was successfully loaded.

---

**./test-parts/part-g-controller_files/files/con-settings.js**
* Added requirement for 'commonPaths.loadFox'
* 'foxPath.settingsFile' is now required using 'loadFoxFile'
* Declared 'checkFile' function.
	* Used to test whether the FOX Controller file was successfully loaded.

---

**./test-parts/part-g-controller_files/files/con-settings_red.js**
* Added requirement for 'commonPaths.loadFox'
* 'foxPath.redSettingsFile' is now required using 'loadFoxFile'
