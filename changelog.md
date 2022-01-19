# Changelog

**./app/test-array.js**
* Changes to 'checkAllType' loop:
	* Added `exist`
	* Removed redundant increment.
* Changes to 'checkAllPropType'
	* Split 'currentVal' expectation into two lines: Exist and Type
* Changes to 'checkAllStringRequired' loop.
	* Added `exist`
	* Removed redundant increment.

---

**./app/test-object.js**
* Changes to 'checkAllPropsType'
	* Merged `undefined` and `null` expectations into `exist`
* Changes to 'checkPropType'
	* Declared 'pValue' variable.
	* 'pValue' is assigned as `oDef[pName]`
	* Re-wrote expectations on multiple lines: Exist and Type

---

**./app/test-reference.js - readCurrentObject**
* Merged `at.least` and `below` checks into `within`