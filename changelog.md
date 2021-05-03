# Changelog

**Test Status**
* The (on/off)line tests themselves work as intended.
* However, the offline request timeout cannot be caught in less than 2 seconds.
	* Unit tests time out after 2 seconds.
* Since I will be replacing the HTTP request library, this can be left alone until afterwards.

---

**./test/fox-test-main.js**
* The 'debug' test mode now checks if the Controller is (on/off)line.
	* Both tests are performed at once.

---

**./test-parts/part-d-online_checks/online-main.js**
* Removed module requirements:
	* chai
	* chai-things
	* sinon
* Removed 'checkFilepath' global.
* './checks/chk-online' is now required directly and not inside a function.
* Replaced `exports` with `module.exports`

---

**./test-parts/part-d-online_checks/checks/chk-online.js**
* Removed module requirements:
	* chai
	* chai-things
	* sinon
	* commonPaths.testCommonFull
* Merged:
	* 'offlineError' into 'runOnlineCheck'
	* 'onlineError' into 'runOfflineCheck'
* Renamed 'requestModule' to 'request'
* Renamed the parameter in these functions to 'foxOnline'
	* runOnlineCheck
	* runOfflineCheck
* Replaced `exports` with `module.exports`
