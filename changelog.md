# Changelog

**./test-parts/08-api_requests/sub/common-api.js - testFileNameArray**
* Removed `expect(currentValid).to.be.true;`

---

**./test-parts/08-api_requests/sub/common-health.js - testHealthTimezoneCodeValue**
* Removed `expect(tzValid).to.be.true;`
* 'tzValid' is returned.

---

**./test-parts/08-api_requests/sub/common-storage.js**
* Changes to 'testDriveLetterObject'
	* Removed `expect(letterValid).to.be.true;`
	* 'letterValid' is returned.
* 'mountValid' is returned from 'testDriveMountObject'

---

**./test-parts/09-api_frontend/sub/common-nodes.js - testStatusControlArraySyntax**
* Removed variables:
	* currentPrefixValid
	* currentNameValid
	* currentElementValid
	* canContinue
* Re-wrote as a `for` loop.
* Removed `expect(canContinue).to.be.true;`