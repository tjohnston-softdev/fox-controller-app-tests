# Changelog

**./test/fox-test-main.js**
* 'externalPart' is called directly.

---

**./test-parts/part-b-external_modules/external-main.js**
* Renamed global variables:
	* 'eOperatingSystemFile' to 'operatingSystemTests'
	* 'eValidatorFile' to 'validatorTests'
	* 'eNeedleFile' to 'needleTests'
* File requirements are called directly inside 'coordinateExternal'
* 'coordinateExternal' is exported directly.

---

**./test-parts/part-b-external_modules/modules/**
* pkg-needle.js
	* 'testNeedle' is exported directly.
* pkg-os.js
	* Replaced 'checkOsSupported' with 'checkSupported'
	* 'testOsDependency' is exported directly.
* pkg-request.js
	* 'testRequest' is exported directly.
* pkg-validator.js
	* 'testValidatorDependency' is exported directly.

---

**./test-parts/part-b-external_modules/sub-modules/os-strings.js**
* Changed 'checkOperatingSystemSupported' public name:
	* Before: 'checkOsSupported'
	* After: 'checkSupported'
