# Changelog

**./test/fox-test-main.js**
* The 'debug' mode now tests 'Part B - External Modules'
* Changed the commented function calls to a single block.

---

**./part-b-external_modules/external.main.js**
* Removed module requirements:
	* chai
	* chai-things
	* sinon
* './modules/ requirements are now global instead of function-based.
* Replaced `exports` with `module.exports`

---

**./part-b-external_modules/modules/pkg-net.js**
* Removed 'requireFunctionFile' requirement.
	* ../sub-modules/require-node-module
* The 'net' module is now required directly.
* Renamed 'ipStringFile' global to 'ipStrings'
* Replaced `exports` with `module.exports`

---

**./part-b-external_modules/modules/pkg-os.js**
* Removed 'requireFunctionFile' requirement.
	* ../sub-modules/require-node-module
* The 'os' module is now required directly.
* Renamed 'osStringFile' global to 'osStrings'
* Replaced `exports` with `module.exports`

---

**./part-b-external_modules/modules/pkg-request.js**
* Removed 'requireFunctionFile' requirement.
	* ../sub-modules/require-node-module
* The 'request' module is now required directly.
* Renamed 'addressFile' global to 'ipStrings'
* Replaced `exports` with `module.exports`

---

**./part-b-external_modules/modules/pkg-validator.js**
* Removed 'requireFunctionFile' requirement.
	* ../sub-modules/require-node-module
* The 'validator' module is now required directly.
* Renamed 'ipStringFile' global to 'ipStrings'
* Replaced `exports` with `module.exports`

---

**./part-b-external_modules/sub-modules/ip-strings.js**
* Replaced `exports` with `module.exports`

---

**./part-b-external_modules/sub-modules/os-strings.js**
* Renamed 'checkOperatingSystemSupported' parameter to 'osStr'
* Public
	* Replaced `exports` with `module.exports`
	* Removed 'usesArray' value.

---

**./part-b-external_modules/sub-modules/require-node-module.js**
* This file is now empty.
