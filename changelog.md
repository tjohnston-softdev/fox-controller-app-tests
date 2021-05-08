# Changelog

### ./test-parts/part-h-api_requests/api-main.js

**Changes**
* Uncommented 'cStorageFile'

---

### ./test-parts/part-h-api_requests/requests/req-storage.js

**Globals**
* Removed 'sinon' module requirement.
* Replaced 'request' module with 'needle'
* Renamed variables:
	* 'fsModule' to 'fs'
	* 'osModule' to 'os'
	* 'userStorageTestPaths' to 'testFile'
* Removed 'storageFolder' variable
	* 'apiPaths.storageApi' is used directly.

\
**handleUserStorageTestPaths**
* Merged tests into "Paths Retrieved"

\
**handleFileList**
* Removed variables:
	* fileListRequestReturn
	* fileListRequestError
* Merged tests into "Request Made"
	* "Request Successful"
	* "Results Read"
* Renamed callback parameters:
	* 'sError' to 'storageErr'
	* 'sResult' to 'storageRes'
* Removed 'callReadApiResponseArray'
	* 'storageRes.body' is used directly.

\
**handleFileDownload**
* Renamed 'testFileRelative' to 'relPath'
* Merged the "Results Read" test into "Download Successful"

\
**handleGlobalStatus**
* Removed variables:
	* gStatusReturn
	* gStatusError
* Renamed variables:
	* 'gStatusUrl' to 'statusUrl'
	* 'gStatusRead' to 'statusRead'
* Merged tests into "Request Made"
	* "Request Successful"
	* "Results Read"
* Renamed callback parameters:
	* 'sError' to 'statusErr'
	* 'sResult' to 'statusRes'

\
**Public**
* Replaced `exports` with `module.exports`

---

###  ./test-parts/part-h-api_requests/sub-requests/common-storage.js

**Removed Module Requirements**
* sinon
* commonPaths.foxRelative
* commonPaths.commonErrors
* commonPaths.commonObjects

\
**testDrivePropertyDefinitionsObject**
* Renamed 'dObject' parameter to 'driveObj'

\
**testDriveLetterObject**
* Renamed parameters:
	* 'dObject' to 'driveObj'
	* 'dPlatform' to 'devPlatform'
* Renamed variables:
	* 'dValue' to 'letterValue'
	* 'dLetterValid' to 'letterValid'

\
**testMountObject**
* Renamed parameters:
	* 'dObject' to 'driveObj'
	* 'dPlatform' to 'devPlatform'
* Renamed 'dValue' variable to 'mountValue'

\
**testDriveTotalObject**
* Renamed parameters:
	* 'tObject' to 'driveObj'
	* 'tPlatform' to 'devPlatform'
* Renamed variables:
	* 'tSize' to 'preparedSize'
	* 'tType' to 'targetType'
* Local variables are declared as their intended type.

\
**testDriveUsedObject**
* Renamed 'uObject' parameter to 'driveObj'

\
**testDrivePropertyDefinitionsArray, testDriveLettersArray, testMountArray**
* Renamed variables:
	* 'fsIndex' to 'loopIndex'
	* 'fsObject' to 'currentObject'

\
**defineUserStoragePaths**
* Renamed variables:
	* 'tName' to 'localName'
	* 'tFolder' to 'localFolder'
	* 'tPath' to 'localFullPath'
	* 'tContent' to 'localContents'
* Rewrote definition without try-catch structure.
* Renamed result properties:
	* 'storageTestFileName' to 'name'
	* 'storageTestFolderPath' to 'folder'
	* 'storageTestFilePath' to 'fullPath'
	* 'storageTestFileContent' to 'contents'

\
**testFolderCreationResult**
* Renamed 'eObject' parameter to 'errObj'

\
**Public**
* Replaced `exports` with `module.exports`
