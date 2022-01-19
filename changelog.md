# Changelog

**./test-parts/03-external_scripts/scripts/s-define_api.js**
* Removed 'objectFunctions.testPropExists' call.
* Removed 'commonPaths.testObject' requirement.

---

**./test-parts/03-external_scripts/scripts/s-local_valid_general.js**
* 'localValidFile.validateExampleTest' is now validated using 'commonFunctions.testFunction'
* Removed 'commonPaths.testObject' requirement.

---

**./test-parts/03-external_scripts/scripts/s-local_valid_specific.js**
* The following 'localValidFile' properties are now validated using 'commonFunctions.testFunction'
	* validateTimezoneOffset
	* validateDriveLetter
	* validateDrivePath
	* validateFilename
	* validateRioPrefix
	* validateRioText
* Removed 'commonPaths.testObject' requirement.

---

**./test-parts/03-external_scripts/scripts/s-request_api_paths.js**
* Changes to 'handleIndividualPath'
	* Declared 'propVal' local variable.
	* 'propVal' is assigned using `requestPathFile[propertyName]`
	* Removed call to 'objectFunctions.testPropExists'
	* Removed call to 'objectFunctions.testPropType'
	* Replaced reference to 'requestPathFile[propertyName]' with 'propVal'
* Removed 'commonPaths.testObject' requirement.

---

**./test-parts/03-external_scripts/scripts/s-request_api_urls.js**
* Removed "Property Exists" test from 'checkHostUrlString'
* 'requestFile.writeUrl' is now validated using 'commonFunctions.testFunction'
* Removed 'commonPaths.testObject' requirement.

---

**./test-parts/03-external_scripts/scripts/s-request_api_responses.js**
* The following 'requestFile' properties are now validated using 'commonFunctions.testFunction'
	* readResponseArray
	* readResponseObject
	* readResponseError
	* validateResponse
	* getOnlineResult
	* showRefusedError
* Changes to "Missing Body" test in 'checkRequestResponseArray'
	* Declared 'emptyObj' local variable, shortcut for empty object.
	* Replaced `{}` with 'emptyObj' for 'requestInvalid.runResponseArray' call.
* Removed 'commonFunctions.testString' call from "Valid" test in 'checkRequestResponseError'
* Removed 'commonPaths.testObject' requirement.

---

**./test-parts/03-external_scripts/scripts/s-request_api_other.js**
* The following 'requestFile' properties are now validated using 'commonFunctions.testFunction'
	* generateIpAddress
	* getDeleteOptions
* Removed 'commonPaths.testObject' requirement.

---

**./test-parts/03-external_scripts/scripts/s-supported_databases.js**
* Added `chai.use(chaiThings);`
* Removed functions:
	* testDefinitionNames
	* testDefinitionSizes
* Wrote new function 'testDefinitionContents'
* Replaced calls in 'checkMarginNumber'
	* 'objectFunctions.testPropExists' with `exist` check.
	* 'objectFunctions.testPropType' with 'commonFunctions.testNumber'
* Changes to 'checkDefinitionObject'
	* 'databaseFile.getSupportedDatabases' is now validated using 'commonFunctions.testFunction'
	* Removed `exist` check from "Function Works"
	* Removed 'arrayFunctions.testAllPropExists' calls from "Correct Properties" test.
	* Removed 'arrayFunctions.testAllPropType' calls from "Correct Contents" test.
	* Removed 'testDefinitionNames' call.
	* Removed 'testDefinitionSizes' call.
	* Added 'testDefinitionContents' call.
* Removed 'commonPaths.testObject' requirement.

---

**./test-parts/03-external_scripts/sub/common-request.js**
* Wrote new function 'loopResponseContents'
* Changes to 'validateResponseBodyArray'
	* Removed call to 'arrayFunctions.testAllType'
	* Removed calls to 'arrayFunctions.testAllPropExists'
	* Removed calls to 'arrayFunctions.testAllPropType'
	* Added call to 'loopResponseContents'
* Removed 'objectFunctions.testPropExists' call from 'validateResponseBodyObject'
* Changes to 'validateDeleteOptionsReturn'
	* Declared 'contType' variable.
	* Declared 'delPerm' variable.
	* 'contType' is assigned as `resultObj.headers['content_type'];`
	* 'delPerm' is assigned as `resultObj.headers['delete-permanently'];`
	* Removed 'objectFunctions.testPropExists' call on 'json' property.
	* 'headers' property is now validated using 'commonFunctions.testObject'
	* 'contType' is validated using 'commonFunctions.testString'
	* 'delPerm' is validated with an expectation.
	* Removed calls to 'objectFunctions.testPropExists'
	* Removed calls to 'objectFunctions.testPropType'
	* Removed `commonFunctions.testString(resultObj.headers['content_type']);`
	* Removed `expect(resultObj.headers['delete-permanently']).to.equal(desiredPermFlag);`
* Removed 'commonPaths.testObject' requirement.