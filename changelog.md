# Changelog

**./test/fox-test-main.js**
* 'debug' now tests 'Part C - Internal Scripts'

---

**./test-parts/part-c-internal_scripts/internal-main.js**
* Removed module requirements:
	* chai
	* chai-things
	* sinon
* File requirements are now global and not function based.
* Replaced `exports` with `module.exports`

---

**./test-parts/part-c-internal_scripts/scripts/s-define_api.js**
* 'commonPaths.defineApi' is now required directly.
* Removed the 'getDefinitionFile' function.
* Replaced `exports` with `module.exports`

---

**./test-parts/part-c-internal_scripts/scripts/s-local_valid.js**
* 'commonPaths.localValid' is now required directly.
* Removed the 'getLocalValidationFile' function.
* Replaced `exports` with `module.exports`

---

**./test-parts/part-c-internal_scripts/scripts/s-request_api.js**
* 'commonPaths.requestApi' is now required directly.
* Removed the 'getRequestFile' function.
* Replaced `exports` with `module.exports`

---

**./test-parts/part-c-internal_scripts/scripts/s-request_api_paths.js**
* 'commonPaths.requestApiPaths' is now required directly.
* Removed the 'getRequestPathFile' function.
* Replaced `exports` with `module.exports`

---

**./test-parts/part-c-internal_scripts/scripts/s-supported-databases.js**
* 'commonPaths.supportedDatabases' is now required directly.
* Renamed 'supportedDatabaseDefinitionFile' to 'databaseFile'
* Removed the 'getSupportedFile' function.
* Replaced `exports` with `module.exports`

---

**./test-parts/part-c-internal_scripts/sub-scripts/common-local_valid.js**
* Replaced `exports` with `module.exports`

---

**./test-parts/part-c-internal_scripts/sub-scripts/common-request.js**
* Renamed 'validModule' to 'validator'
* Replaced `exports` with `module.exports`
