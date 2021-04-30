# Changelog

**./app/common-errors.js**
* Restructured functions to write text on single line:
	* writeKeyNotFoundErrorString
	* writeRegisterPrefixIndexError
* Restructured functions to write a single variable:
	* writeRemoteIoPropertyErrorString
	* writeRemoteIoPropertySupportString
	* writeRemoteIoPropertyConstructString
	* writeConnectDevicePropertyErrorString
	* writeSetDeviceOutputWrongError
	* writeUnexpectedTokenErrorString
* Renamed result variables in these functions:
	* 'writeUnexpectedTokenErrorStringNull' to 'nullRes'
	* 'writeUnexpectedTokenErrorStringType' to 'typeRes'
	* 'writeTestString' to 'testValue'
* Replaced `exports` with `module.exports`
