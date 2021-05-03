# Changelog

**./part-b-external_modules/modules/pkg-validator.js**
* Renamed functions:
	* 'ipInvalidCall' to 'handleInvalidCall'
	* 'verifyIpAddressInvalid' to 'verifyExceptions'
* verifyExceptions
	* Moved between 'verifyMacAddressFunction' and 'handleInvalidCall'
	* Changed description to "Exceptions"
* handleInvalidCall
	* Renamed parameter to 'invalidArg'
* testValidatorDependency
	* Removed 'verifyIpAddressInvalid' call.
	* Added call to 'verifyExceptions' at the end.
