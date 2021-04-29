# Changelog

**Test Status**
* Checked unit tests since package update.
	* Offline Controller file testing is successful.
	* API testing has an error due to a missing backup file. (My fault...)
	* Front-end testing is unchanged.
	* Factory reset is successful.

---

**./package.json**
* Uninstalled 'npm' package. (I don't even know how that got there)
* Updated these packages to the latest version:
	* request
	* sinon
	* validator
	* chai
	* mocha

---

**./package-lock.json**
* Patched 'minimist' security vulnerability.
	* Updating 'mocha' and 'sinon' appeared to do the trick.
	* This removed all dependency on 'minimist'
