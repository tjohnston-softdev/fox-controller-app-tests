# Changelog

### ./test-parts/part-g-controller_files/controller-main.js

**Changes**
* Commented out all function calls except for 'cDeviceSettingsFile'

---

### ./test-parts/part-g-controller_files/files/con-device_settings.js

**Globals**
* 'foxPath.deviceSettingsFile' is now required directly.
* Renamed:
	* 'advantechModelContents' to 'advantechModels'
	* 'moxaModelContents' to 'moxaModels'
	* 'sonoffModelContents' to 'sonoffModels'

\
**Removed Functions**
* checkDeviceSettingsFileExists
* getDeviceSettingsFile
* checkSignalConvertResult

\
**Fixed Capitalization**
* Affected test names:
	* "All **p**roperties **s**trings"
	* "All **e**lements **s**trings"

\
**checkDeviceTypeArrayProperty**
* Renamed "Array" test to "Populated Array"

\
**checkBinSignalFunction**
* Replaced 'checkSignalConvertResult' calls with direct expectations.
* Result variable must equal desired value.

\
**checkScaleDecimalValueFunction**
* Removed 'scaleSpy' variable.
	* Spies are now defined for individual tests and are not shared.
* Specific changes to "Call - Valid" test
	* Added 'done' callback.
	* Removed 'testPresent' call for 'returnValue'
	* Removed number checks for 'returnValue'
* Specific changes to "Call - Default Error Value" test:
	* Added 'done' callback.
	* Removed 'testPresent' call for 'returnValue'
	* Removed number checks for 'returnValue'
	* Replaced 'calledTwice' with 'calledOnce'
	* Replaced 'secondCall' with 'firstCall'
* Specific changes to "Call - Custom Error Value" test:
	* Added 'done' callback.
	* Removed 'testPresent' call for 'returnValue'
	* Removed number checks for 'returnValue'
	* Replaced 'lastCall' with 'firstCall'
* Removed "Complete" test.

\
**checkGetModelFunction**
* Removed 'modelSpy' variable.
	* Spies are now defined for individual tests and are not shared.
* Specific changes to "Call - Supported" test:
	* Added 'done' callback.
	* Added 'testPresent' check to 'supportedSpy.firstCall'
* Specific changes to "Call - Unsupported" test:
	* Added 'done' callback.
	* Replaced 'lastCall' with 'firstCall'
* Removed "Complete" test.

\
**checkSignalValidationResult**
* Renamed 'v' parameter to 'actualOut'
* Removed 'commonFunctionsFile.testPresent' call.
* Removed `expect(v).to.be.a("boolean");`

\
**getSupportedLists**
* Renamed result properties:
	* 'dbManufacturers' to 'manufacturers'
	* 'dbModels' to 'models'
* Renamed map parameter from 'o' to 'currentObj'
* Removed 'null' catch assignments:
	* allModelsArray
	* derivedManufacturers
	* derivedModels

\
**Public**
* Replaced `exports` with `module.exports`
