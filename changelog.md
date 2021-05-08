# Changelog

### ./test-parts/part-h-api_requests/api-main.js

**Changes**
* Uncommented 'cHealthFile'

---

### ./test-parts/part-h-api_requests/requests/req-admin_health.js

**Globals**
* Module requirements:
	* Removed 'sinon'
	* Removed 'request'
	* Added 'needle'
* Renamed variables:
	* 'osModule' to 'os'
	* 'apiCommonFile' to 'commonApi'
	* 'dbCommonFile' to 'commonDatabase'
	* 'healthCommonFile' to 'commonHealth'
	* 'storageCommonFile' to 'commonStorage'

\
**getHealthObject**
* HTTP request is now performed with the 'needle' library.
* Removed variables:
	* healthReturn
	* healthError
* Merged the following tests into "Request Made"
	* "Request Successful"
	* "Results Read"
* Renamed callback parameters:
	* 'hError to 'healthErr'
	* 'hResult' to 'healthRes'

\
**handleIdentification**
* 'version' property testing:
	* Replaced 'testObjectPropertyContent' with 'testString'
* 'serialNumber' property testing:
	* Removed 'testObjectPropertyContent' check

\
**handleFileSystem**
* Added missing semicolon to 'testPropertyContents' in "Drive Type"

\
**handleLog**
* Declared 'logObject' variable.
	* Local shortcut for `healthObject.logSize[0]`
* Added 'done' callback to "Log Array"
* Removed 'testString' from "Log Name"
* Removed 'testObjectPropertyContent' from "Directory Flag"

\
**testDriveMount**
* Removed function.
* Merged into the "Mount" test for 'handleFileSystem'

\
**Public**
* Replaced `exports` with `module.exports`

---

### ./test-parts/part-h-api_requests/sub-requests/common-api.js

**General Changes**
* Removed module requirements:
	* sinon
	* commonPaths.commonErrors
	* commonPaths.commonObjects
	* commonPaths.foxRelative
* Replaced `exports` with `module.exports`

\
**testArrayIpFourValue**
* Renamed parameters:
	* 'iArray' to 'objectArray'
	* 'iProp' to 'ipProp'
	* 'iEmpty' to 'ipEmptyAllowed'
* Renamed loop variables:
	* 'elementIndex' to 'loopIndex'
	* 'elementObject' to 'currentObject'
	* 'elementIP' to 'currentIP'
	* 'elementIpValid' to 'currentValid'
* Changed loop variable declaration values to reflect intended type.

\
**testArrayIpSixValue**
* Renamed parameters:
	* 'iArray' to 'objectArray'
	* 'iProp' to 'ipProp'
	* 'iEmpty' to 'ipEmptyAllowed'
* Renamed 'elementIndex' to 'loopIndex'
* Changed loop variable declaration values to reflect intended type.

\
**testArrayMacValue**
* Renamed parameters:
	* 'iArray' to 'objectArray'
	* 'iProp' to 'macProp'
	* 'iEmpty' to 'macEmptyAllowed'
* Renamed 'elementIndex' to 'loopIndex'
* Changed loop variable declaration values to reflect intended type.

\
**testDhcpMacLongValue**
* Renamed 'emptyMacAllowed' parameter to 'dhcpMacOptional'

\
**testDhcpMacShortValue**
* Renamed variables:
	* 'dhcpObject' to 'currentObject'
	* 'dhcpSub' to 'currentSubstring'
	* 'originalLower' to 'currentOrigLower'
	* 'subLower' to 'currentSubLower'
* Removed 'dhcpShortValid' variable.
* Changed loop variable declaration values to reflect intended type.
* Replaced IF equality check with expectation.

\
**testWriteTimestamp**
* Renamed 'wObject' parameter to 'writeObject'

\
**testWriteTimestampArray**
* Renamed:
	* 'wArray' parameter to 'writeArray'
	* 'elementIndex' variable to 'loopIndex'
	* 'elementObject' variable to 'currentObject'
* 'currentObject' is declared as a blank object.

\
**testFileNameArray**
* Renamed parameters:
	* 'fnArray' to 'objectArray'
	* 'fnProperty' to 'nameProp'
* Renamed variables:
	* 'elementIndex' to 'loopIndex'
	* 'elementObject' to 'currentObject'
	* 'elementName' to 'currentName'
	* 'elementValid' to 'currentValid'
* 'currentObject' is declared as a blank object.

\
**testZeroLeastArray**
* Renamed:
	* 'numberProperty' parameter to 'numberProp'
	* elementIndex' to 'loopIndex'
	* 'elementObject' to 'currentObject'
	* 'elementValue' to 'currentValue'
* Changed loop variable declaration values to reflect intended type.

\
**testPositiveNumberProperty**
* Declared 'givenValue' variable.
	* Consumes `parentObject[propName]`
	* Makes expectation more readable.

\
**testPositiveNumberPropertyArray**
* Renamed variables:
	* 'aIndex' to 'loopIndex'
	* 'aObject' to 'currentObject'
	* 'aValue' to 'currentValue'
* Changed loop variable declaration values to reflect intended type.

\
**testAlarmStateFlags**
* Renamed:
	* 'alarmObjectArray' parameter to 'objectArray'
	* 'alarmObjectIndex' variable to 'loopIndex'
* 'currentAlarmObject' is declared as a blank object.

---

### ./test-parts/part-h-api_requests/sub-requests/common-health.js

**General Changes**
* Removed module requirements:
	* sinon
	* commonPaths.commonErrors
	* commonPaths.commonObjects
	* commonPaths.foxRelative
* Replaced `exports` with `module.exports`

\
**testHealthDeviceObject**
* Renamed 'hObject' parameter to 'healthObj'
* Removed 'hPlatform' parameter.

\
**testHealthNumberMaximum**
* Declared 'givenValue' variable.
	* Consumes `srcObject[propName]`
	* Makes expectations more readable.

\
**testHealthEnvironmentValue**
* Renamed parameters:
	* 'eObject' to 'envObject'
	* 'eProp' to 'propName'
	* 'ePlatform' to 'devPlatform'
* Declared 'givenValue' variable.
	* Consumes `envObject[propName]`
	* Makes expectations more readable.

\
**testHealthEnvironmentDummy**
* Renamed parameters:
	* 'eObject' to 'envObject'
	* 'ePlatform' to 'devPlatform'
* Removed 'testObjectPropertyContent' check for dummy platforms.

---

### ./test-parts/part-h-api_requests/sub-requests/common-database.js

**General Changes**
* Removed module requirements:
	* sinon
	* commonPaths.commonErrors
	* commonPaths.commonObjects
	* commonPaths.foxRelative
	* commonPaths.localValid
* Replaced `exports` with `module.exports`

\
**getSupportedDatabaseNames**
* Renamed variables:
	* 'dInd' to 'loopIndex'
	* 'dElement' to 'currentObject'
	* 'dPropertyType' to 'currentType'
	* 'dNames' to 'nameRes'
* Changed loop variable declaration values to reflect intended type.
* Removed `currentObject.dbName !== null` from IF conditions.
	* Only checking the string type is sufficient.

\
**getDatabaseDefinitionByObject**
* Renamed 'dObject' parameter to 'targetObject'
* Renamed loop variables:
	* 'dInd' to 'loopIndex'
	* dElement' to 'currentObject'
	* 'dFound' to 'targetFound'
	* 'dDefinition' to 'retrievedDefinition'
* 'res' variable:
	* Declared as a blank object before the loop.
	* Properties are defined individually after the loop is complete.

\
**checkFileDatabaseEmpty, checkFileDatabasePopulated**
* Renamed parameters:
	* 'fileDatabaseObject' to 'fileObj'
	* 'fileDatabaseDefinition' to 'fileDef'
	* 'targetDatabaseName' to 'fileDbName'

\
**checkFolderDatabaseEmpty**
* Renamed parameters:
	* 'folderDatabaseObject' to 'folderObj'
	* 'folderDatabaseDefinition' to 'folderDef'
	* 'targetDatabaseName' to 'folderDbName'

\
**checkFolderDatabasePopulated**
* Renamed parameters:
	* 'folderDatabaseObject' to 'folderObj'
	* 'folderDatabaseDefinition' to 'folderDef'
	* 'targetDatabaseName' to 'folderDbName'
* Added missing return.

\
**getDatabaseFolderMargin**
* 'res' is now declared at -1

\
**testDatabaseNames**
* Renamed variables:
	* 'dbIndex' to 'loopIndex'
	* 'dbObject' to 'currentObject'
	* 'dbNameValid' to 'currentExists'
* Removed 'dbNameIndex' variable.
* Name match validation now uses `includes` instead of `indexOf`
	* Hence, the IF structure has been removed.

\
**testDatabaseFolderFlags**
* Renamed variables:
	* 'dbIndex' to 'loopIndex'
	* 'dbObject' to 'currentObject'
	* 'dbName' to 'currentName'
	* 'dbTarget' to 'currentDefinition'
	* 'dbValid' to 'currentValid'
* Declared new variables:
	* 'currentObjectDirectory' - Stores 'isDirectory' property from database object.
	* 'currentFound' - Indicates whether database definition has been found.
* Changed loop variable declaration values to reflect intended type.

\
**testDatabaseSizesEmpty, testDatabaseSizesPopulated**
* Renamed variables:
	* 'dbIndex' to 'loopIndex'
	* 'dbObject' to 'currentObject'
	* 'dbName' to 'currentName'
	* 'dbTarget' to 'currentDefinition'
	* 'dbValid' to 'currentValid'
* Declared 'currentFound' variable.
	* Indicates whether the database definition has been found.
* Changed loop variable declaration values to reflect intended type.

\
**showPopulatedFolderEmptyError**
* Renamed parameter from 'dn' to 'vName'
* Rewrote body using a single string variable.

\
**Other Error Functions**
* Changes:
	* Renamed parameter from 'dn' to 'vName'
	* Error message is written inside 'flaggedMessage' variable.
* Affected functions:
	* showInvalidSizeError
	* showCurrentSizeCheckError
	* showEmptyContentError
	* showUnknownDatabaseError
	* showInvalidStructureError
