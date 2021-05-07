# Changelog

**Test Status**
* Since the 'request' module was uninstalled, online testing will be broken until further notice.
	* Parts H onwards.

---

**./package.json**
* Replaced 'request' module with 'needle'.

---

**./test-parts/part-b-external_modules/external-main.js**
* Removed './modules/pkg-request' requirement.

---

**./test-parts/part-b-external_modules/modules/pkg-request.js**
* This file will be left intact for legacy reasons.
	* Even though the module is obsolete, the testing itself is fine.
