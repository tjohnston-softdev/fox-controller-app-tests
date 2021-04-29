const folderErrorMarginSize = 290;

function getSupportedDatabasesArray()
{
	var rioDB = {"dbName": "remote-io.db", "folder": true, "cleanSize": 0};
	var alarmDB = {"dbName": "alarms_history.sqlite3", "folder": false, "cleanSize": 8192};
	var res = [rioDB, alarmDB];
	
	return res;
}

module.exports =
{
	getSupportedDatabases: getSupportedDatabasesArray,
	folderErrorMargin: folderErrorMarginSize
};