# Changelog

**./app/local-valid.js - writeRequirementPathRegEx**
* Removed function.

---

**./app/local-valid.js - checkRioSplitArray**
* Renamed parameter to 'splitArr'
* Removed variables:
	* indexValue
	* checkResult
* Declared variables:
	* 'checkRes' - Overall result variable. True or False.
	* 'nameElement' - First array element. Type of Remote IO.
	* 'modeElement' - Second array element. Input or Output.
	* 'indexElement' - Third array element. Remote IO number string.
	* 'indexNumber' - Cast 'indexElement' to whole number.
	* 'indexParsed' - Indicates whether 'indexNumber' was parsed successfully.
* Parsing the index number is done correctly and not with `Math,pow`
* String validation is unchanged.
* When validating the index number, it must be whole.
* Return is a single True or False, and not an object.

---

**./app/local-valid.js - validateRioTextString**
* Replaced 'validCheck' evaluation
	* Before: `if (validCheck.first === true && [...]`
	* After: `if (validCheck === true)`

---

**./app/local-valid.js - Public**
* Replaced `exports` with `module.exports`
