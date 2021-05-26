# Changelog

**./test/fox-test-main.js**
* 'internalPart' is called directly.
* 'debug' testing mode now calls:
	* commonPart
	* externalPart
	* internalPart

---

**./test-parts/part-c-internal_scripts/internal-main.js**
* Renamed global variables:
	* 'iValidFile' to 'localValidTests'
	* 'iDefineFile' to 'defineApiTests'
	* 'iRequestFile' to 'requestApiTests'
	* 'iRequestPathFile' to 'requestPathTests'
	* 'iDatabaseFile' to 'dbDefinitionTests'
* Required files are called directly inside 'coordinateInternal'
* 'coordinateInternal' is exported directly.

---

**./test-parts/part-c-internal_scripts/scripts/**
* Functions are exported directly from their respective files:
	* 'testDefine' (s-define_api.js)
	* 'testLocalValid' (s-local_valid.js)
	* 'testRequest' (s-request_api.js)
	* 'testRequestPaths' (s-request_api_paths.js)
	* 'testSupportedDatabases' (s-supported_databases.js)
