# Changelog

**./test-parts/part-f-controller_models/models/m-model_definitions.js**
* Globals
	* Removed 'commonPaths.commonObjects' requirement.
	* Renamed '____Definitions' to '_____Models'
* handleManufacturerFile
	* Renamed 'manufacturerArray' parameter to 'modelArray'
* checkManufacturerArrayRead
	* Moved 'testArrayPopulated' call to the "Successfully Read" test.
	* Renamed "Array Returned" test to "Correct Structure"
* Renamed variables in 'checkModelsLoop'
	* 'mIndex' to 'modelIndex'
	* 'mObject' to 'currentModel'
	* 'mQuote' to 'currentQuote'
	* 'mDesc' to 'currentDesc'
* Changed 'checkModelsLoop' from `while` to `for`
* Renamed the parameter of these functions to 'modelObj'
	* checkCommunicationTypeProperty
	* checkIoConfigArrayProperty
	* checkTotalPollProperty
	* checkPollIntervalProperty
	* checkInfoUrlProperty
	* checkManufacturerProperty
	* checkFunctionProperties
* Changed 'checkFunctionProperties' description
	* Before: "Property - Functions"
	* After: "Functions"
