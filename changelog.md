# Changelog

**./app/supported-databases.js**
* Moved supported database object definition to its own function 'defineDatabase'
	* Properties are defined individually.
	* Database object is added to the array without return.
* getSupportedDatabasesArray
	* Removed 'rioDB' and 'alarmDB' variables.
	* 'res' starts as empty. It is populated with 'defineDatabase'
