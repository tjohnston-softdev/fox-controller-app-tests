# Changelog

### ./test-parts/part-c-internal_scripts/internal-main.js

**Changes**
* Commented out calls to:
	* iValidFile
	* iDefineFile
	* iDatabaseFile

---

### ./test-parts/part-c-internal_scripts/scripts/s-request_api.js

**Module Requirements**
* Removed 'chai-things'
* Removed 'sinon'
* Added 'validator'

\
**Removed Functions**
* checkNodeRequestExists
* runOfflineResult

\
**checkWriteUrl - Changes to "Call - Valid" test:**
* Removed 'urlSpy' variable.
* Renamed variables:
	* 'argumentsTogether' variable to 'linkPath'
	* 'urlReturn' variable to 'inputURL'
* Declared 'actualURL' variable.
	* Consumes `requestFile.callWriteApiUrl` result.
* Added equality check between 'inputURL' and 'actualURL'

\
**checkRequestResponseArray**
* Changes to "Call - Valid" test:
	* Removed 'respSpy' variable.
	* Renamed 'respArg' variable to 'inputResp'
	* Declared 'actualResp' variable. - Consumes `callReadApiResponseArray` result.
	* 'callValidateResponseArray' only uses 'actualResp' as argument.

\
**checkRequestResponseObject**
* Removed 'objectSpy' variable.
* Removed "Complete" test.
* Changes to "Call - Valid String" and "Call - Valid Object" tests:
	* Renamed 'objectArg' variable to 'inputResp'
	* Declared 'actualResp' variable. - Consumes `callReadApiResponseObject` result.
	* 'callValidateResponseObject' only uses 'actualResp' as argument.

\
**checkRequestResponseString**
* Changes to "Call - Valid" test:
	* Renamed 'objectArg' variable to 'inputReply'
	* Removed 'stringSpy' variable.
	* Declared 'actualReply' variable - Consumes `callReadApiResponseString` result.
	* Removed call to 'commonRequestFunctions'
	* Added 'testString' check to 'actualReply'
	* Added equality check between 'bodyString' and 'actualReply'
* Changes to "Call - Missing Body" test:
	* Declared 'emptyObj' variable. - Empty JSON object.
	* 'emptyObj' is used for 'runReadResponseInvalidString' argument.

\
**checkRequestResponseError**
* Changes to "Call - Valid" test:
	* Renamed 'objectArg' variable to 'inputReply'
	* Removed 'errorSpy' variable.
	* Declared 'actualError' variable - Consumes `callReadApiResponseError` result.
	* Removed call to 'commonRequestFunctions'
	* Added 'testString' check to 'actualError'
	* Added equality check between 'validErrorString' and 'actualError'
* Renamed variables across invalid tests:
	* 'emptyMessageArg' variable to 'emptyMsg'
	* 'mismatchArg' to 'invalidHTML'
	* 'formatArg' to 'formatHTML'

\
**checkOnlineResult**
* Changes to "Call - Online" test:
	* Renamed 'onlineArg' variable to 'inputReply'
	* Removed 'onlineSpy' variable.
	* Declared 'onlineRes' variable - Consumes `getApplicationOnlineResult`
	* Removed call to 'commonRequestFunctions'
	* Checks whether 'onlineRes' is true.
* Changes to "Call - Offline" and "Call - Invalid Type" tests:
	* Removed call to 'runOfflineResult'
	* Calls 'getApplicationOnlineResult' directly.
	* Result variable must be false.
* Changes to "Call - Missing Status Code" test:
	* Declared 'emptyObj' variable. - Empty JSON object.
	* Declared 'statusRes' variable - Used for result.
	* Removed call to 'runOfflineResult'
	* Calls 'getApplicationOnlineResult' directly.
	* 'statusRes' must be false.

\
**checkRandomIp**
* Renamed "Function Works" to "Generation Successful"
* Changes to "Generation Successful" test:
	* Removed 'randomSpy' variable.
	* Declared 'randIP' variable - Consumes `generateIpAddress` result.
	* Removed call to 'commonRequestFunctions'
	* Declared 'ipValid' variable - Stores whether 'randIP' is valid.
	* Checks whether 'randIP' is a string.
	* Validates 'randIP' using 'validator' library.
	* 'ipValid' must be true.

\
**checkOptionsObject**
* Changes to "Call - Valid" test:
	* Removed 'optionSpy' variable.
	* Declared 'optionsRes' variable - Consumes `getRequestOptions` result.
	* Removed 'callValidateOptionsBase'
	* Removed 'callValidateOptionsArguments'

\
**checkDeleteOptionsObject**
* Removed both variables.
* Removed "Complete" test.
* Declared result variables:
	* 'trueRes' - Result variable for "Call - True"
	* 'falseRes' - Result variable for "Call - False"

\
**runDeleteResults**
* Removed parameters:
	* dCalled
	* dCallObject
* Renamed 'dFlagArgument' parameter to 'flagArg'
* Declared 'deleteObj' parameter.
* Removed function calls:
	* commonRequestFunctions.callValidateOptionsBase
	* commonRequestFunctions.callValidateDeleteOptionsArguments

\
**createReplyObject**
* Moved to ../sub-scripts/common-request
	* Exists as 'createRequestReplyObject'
	* Called publicly as 'createReplyObject'

---

### ./test-parts/part-c-internal_scripts/scripts/s-request_api_paths.js

**Changes**
* Removed Module Requirements
	* chai-things
	* sinon
	* commonPaths.commonErrors
* Removed 'checkPathFileExists' function.

---

### ./test-parts/part-c-internal_scripts/sub-scripts/common-request.js

**Removed Requirements**
* sinon
* validator

\
**Removed Functions**
* validateWriteUrl
* validateResponseString
* validateRandomIp
* validateOnlineResult
* validateOptionsBase
* validateOptionsArguments
* validateDeleteOptionsArguments

\
**validateResponseArray**
* Removed parameters:
	* arrayCalled
	* callObject
	* callArg
* Added new parameter 'resultObj'
* Removed checks:
	* 'arrayCalled' is true.
	* 'callObject' exists.
	* 'callObject.args' deep equal.
	* 'callObject.exception' does not exist.
* Replaced 'callObject.returnValue' with 'resultObj'

\
**validateResponseObject**
* Removed parameters:
	* objectCalled
	* callObject
	* callArg
* Added new parameter 'resultObj'
* Removed checks:
	* 'objectCalled' is true.
	* 'callObject' exists.
	* 'callObject.args' deep equal.
	* 'callObject.exception' does not exist.
* Replaced 'callObject.returnValue' with 'resultObj'

\
**validateOptionsReturn**
* Removed 'optCallObject' parameter.
* Added 'resultObj' parameter.
* Replaced 'optCallObject.returnValue' with 'resultObj'
* Removed 'commonFunctionsFile.testObjectPropertyContent' call.

\
**validateDeleteOptionsReturn**
* Removed 'optCallObject' parameter.
* Added 'resultObj' parameter.
* Replaced 'optCallObject.returnValue' with 'resultObj'
