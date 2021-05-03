# Changelog

**./part-b-external_modules/external.main.js**
* Removed './modules/pkg-net' requirement.

---

**./part-b-external_modules/modules/pkg-net.js**
* This file is now empty.
	* The 'net' module is not used for actual Controller testing.
	* This must have been a holdover from an earlier build.
	* Only used for IP Address validation.
	* Replaced with 'validator'
