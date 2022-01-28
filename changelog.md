# Changelog

* Applied 2022 copyright to MIT license.
* Updated packages:
	* mocha
	* chai
	* needle
	* sinon
* Changed execution command.
	* Before: `npm test`
	* After `npm run tests --mode=example`
* Test mode is now entered through a command line argument and not a prompt.
* Uninstalled 'prompt-sync'
* Removed unnecessary requirements from main file
* Wrote detailed error message for invalid mode.
* Local 'validator' files unchanged.
* Compressed 'common-errors' text writing code
* Compressed API URL writing code
* Deleted empty testing files.
* Changed test part naming format.
	* Before: "part-x_example_tests"
	* After: "00-example_tests"
* Merged redundant chai testing code for:
	* Checking whether a value actually exists.
	* String type checks.
	* Single arrays.
	* Checks for both populated and empty arrays.
	* Function type checks.
	* External modules.
	* Local scripts.
	* RIO setting properties.
	* Model definitions
	* Controller files
	* Controller APIs
	* Controller restarts
* Wrote common functions for:
	* Neutral array type check.
	* Boolean type check.
	* Number type check.
	* Optional string type check.
* Check if single percentage is actual number
* Minor RIO common changes
	* Device MAC string is optional.
	* Config name string is optional.
	* Wires array is tested correctly.
* Removed property check functions.
	* Merged into other common functions.
* Added custom error messages for:
	* Local string validation
	* 'try-catch' tests
* Removed stray variables from 'local-valid' testing.
* Simplified Manufacturer name definitions
* Removed version number from 'package.json'
* Revised documentation where applicable.