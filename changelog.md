# Changelog

These changes refer to **./test-parts/part-c-internal_scripts/scripts/s-define_api.js**

---

**Removed Module Requirements**
* chai-things
* sinon

---

**Removed Functions**
* fileTest
* 'arrayTest' - Merged into 'testDefine'

---

**testDefine**
* Changed description
	* Before - "Device API Definitions"
	* After - "Manufacturer Array"

---

**arrayTest**
* Merged these tests into "Array Exists"
	* "Property Exists"
	* "Array Type"
* "Valid Contents" test
	* Removed `commonFunctionsFile.testAllElements` call.

---

**manufacturerArrayLoop**
* Renamed variables:
	* 'mIndex' to 'loopIndex'
	* 'mString' to 'currentElement'
