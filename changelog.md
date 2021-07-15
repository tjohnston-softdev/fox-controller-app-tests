# Changelog

**./app/request-api.js**
* Renamed 'responseObject' parameter to 'respObj' in functions:
	* readApiResponseArray
	* readApiResponseObject
* requestApplicationOnlineResult
	* Renamed 'aReply' parameter to 'respObj'
* getRandomIpNumber
	* When generating a random number, the decimal is rounded up.
	* This saves having to cap the number at 1
* Declared 'argSet' variable in 'checkWriteArgument'
	* Merges the `undefined` and `null` checks.
