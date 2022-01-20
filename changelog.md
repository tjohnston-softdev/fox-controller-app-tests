# Changelog

**./test-parts/06-controller_models/definitions/m-definitions.js**
* Changes to 'checkManufacturerArrayRead'
	* Removed 'arrayFunctions.testAllPropExists' call from "Model Types Defined"
* Changes to 'checkModelsLoop'
	* Re-wrote 'currentDesc' assignment for readability.
* Removed "Exists" test from 'checkCommunicationTypeProperty'
* Changes to 'checkIoConfigArrayProperty'
	* Removed "Exists" test.
	* Removed 'arrayFunctions.testAllPropExists' calls from "Object Structures Valid"
* Removed "Exists" test from 'checkTotalPollProperty'
* Removed "Exists" test from 'checkPollIntervalProperty'
* Removed "Exists" test from 'checkInfoUrlProperty'
* Removed "Exists" test from 'checkManufacturerProperty'
* Modified tests in 'checkFunctionProperties' to use 'commonFunctions.testFunction'