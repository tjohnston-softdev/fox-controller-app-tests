# Changelog

**./test-parts/part-c-internal_scripts/scripts/s-local_valid.js**
* Moved functions to 's-local_valid-general.js'
	* handleExampleFunction
	* callExampleValid
	* callExampleInvalid
* Moved functions to s-local_valid-specific.js'
	* handleTimezoneOffsetFunction
	* handleDriveLetterFunction
	* handleDrivePathFunction
	* handleFilenameFunction
	* handleRioPrefixFunction
	* handleRioTextFunction
* Added "Obsolete" suffix to main description.
* Wrote 'handlePlaceholder' test function.
* Removed 'commonPaths.localValid' requirement.

---

**./test-parts/part-c-internal_scripts/scripts/s-local_valid-general.js**
* New file - Contains unit tests for example validation.
	* All of these validation functions follow the same basic pattern.
	* This handles common argument and error testing.

---

**./test-parts/part-c-internal_scripts/scripts/s-local_valid-specific.js**
* New file - Contains unit tests for specific validation functions.
	* eg. Timezone offset string.

---

**./test-parts/part-c-internal_scripts/internal-main.js**
* Commented out 'localValidTests'
* Added new requirements:
	* ./scripts/s-local_valid-general
	* ./scripts/s-local_valid-specific
* Commented out calls:
	* defineApiTests
	* requestPathTests
	* dbDefinitionTests
