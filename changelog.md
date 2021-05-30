# Changelog

**./test-parts/part-h-api_requests/sub-requests/common-api.js**
* Renamed 'validatorModule' requirement to 'validator'

---

**./test-parts/part-h-api_requests/sub-requests/common-database.js**
* Added requirement for 'commonPaths.sysPlatform'
* getDatabaseFolderMargin
	* Removed 'pUsed' parameter.
	* Declared 'windowsUsed' variable. Indicates whether current OS is Windows.
	* Replaced `pUsed === 'win32'` with `windowsUsed === true`
* showPopulatedFolderEmptyError
	* Renamed parameter from 'dn' to 'vName'
* Removed 'platformUsed' parameter from functions:
	* checkFolderDatabaseEmpty
	* checkFolderDatabasePopulated
* Removed 'dbPlatform' parameter from functions:
	* testDatabaseSizesEmpty
	* testDatabaseSizesPopulated

---

**./test-parts/part-h-api_requests/sub-requests/common-health.js**
* Added requirement for 'commonPaths.sysPlatform'
* testHealthEnvironmentValue
	* Removed 'devPlatform' parameter.
	* 'givenValue' is declared and assigned separately.
	* Declared 'dummyUsed' variable. - Indicates whether dummy OS is used.
	* Replaced `devPlatform === 'win32' || [...]` with `dummyUsed === true`
* testHealthEnvironmentDummy
	* Removed 'devPlatform' parameter.
	* Declared 'dummyUsed' variable. - Indicates whether dummy OS is used.
	* Replaced `devPlatform === 'win32' || [...]` with `dummyUsed === true`

---

**./test-parts/part-h-api_requests/sub-requests/common-storage.js**
* Added requirement for 'commonPaths.sysPlatform'
* Specific changes:
	* Removed 'devPlatform' parameter.
	* Declared 'windowsUsed' variable. Indicates whether current OS is Windows.
	* Replaced `devPlatform === 'win32'` with `windowsUsed === true`
* Affected functions:
	* testDriveLetterObject
	* testDriveMountObject
	* testDriveTotalObject

---

**./test-parts/part-h-api_requests/requests/**
* Changes:
	* Removed 'os' module requirement.
	* Removed 'currentPlatform' global variable.
* Affected files:
	* req-admin_health.js
	* req-storage.js

---

**./test-parts/part-j-restart_controller/modes/mode-factory_reset.js**
* Removed:
	* 'os' module requirement.
	* 'currentPlatform' global variable.
* Added 'commonPaths.sysPlatform' requirement.
* Declared 'dummyPlatformUsed' global variable - Indicates whether dummy OS is used.
* Restructured the IF condition in 'testFactoryReset'
	* If a dummy platform is used, run the offline check.
	* Otherwise, assume true.

---

**./test-parts/part-j-restart_controller/modes/mode-reboot.js**
* Removed:
	* 'os' module requirement.
	* 'currentPlatform' global variable.
* Added 'commonPaths.sysPlatform' requirement.
* Declared 'dummyPlatformUsed' global variable.
* Restructured the IF condition in 'testFoxRestart'
	* If a dummy platform is used, enforce delay and check offline.
	* Otherwise, assume true.
