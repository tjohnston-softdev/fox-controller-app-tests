# Changelog

**./app/output-msg.js**
* New file - Contains callback message echo debug function.
* Split from 'test-common.js'

---

**./app/test-common.js**
* Split 'outputCallbackMessage' into it's own file: 'output-msg.js'
	* It is not currently used in any tests.
	* Kept in a separate file for future reference.

---

**./app/paths/files/app-paths.js**
* Added property for: '../../output-msg.js'
