const folderErrorMarginSize = 290;

function getSupportedDatabasesArray()
{
	var rioDB = null;
	var alarmDB = null;
	var res = null;
	
	try
	{
		rioDB = {"dbName": "remote-io.db", "folder": true, "cleanSize": 0};
		alarmDB = {"dbName": "alarms_history.sqlite3", "folder": false, "cleanSize": 8192};
		
		res = [rioDB, alarmDB];
	}
	catch(e)
	{
		rioDB = null;
		alarmDB = null;
		res = null;
	}
	
	return res;
}

exports.getSupportedDatabases = getSupportedDatabasesArray;
exports.folderErrorMargin = folderErrorMarginSize;