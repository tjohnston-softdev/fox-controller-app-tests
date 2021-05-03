# Changelog

**./part-b-external_modules/modules/pkg-os.js**
* Removed module requirements:
	* chai-things
	* sinon
* Removed 'verifyOsExists' function.

---

**./part-b-external_modules/modules/pkg-os.js - verifyPlatformFunction**
* Removed 'platformSpy' variable.
* Declared 'devicePlatform' string.
	* Consumes 'osModule.platform' result.
* When calling 'osStrings.checkOsSupported'
	* 'devicePlatform' is used as an argument.
	* Replaces 'platformSpy'
* Removed 'commonFunctionsFile.testPresent' call.
* Removed "Complete" test.
