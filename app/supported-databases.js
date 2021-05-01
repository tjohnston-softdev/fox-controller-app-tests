const folderErrorMarginSize = 290;

function getSupportedDatabasesArray()
{
	var res = [];
	
	defineDatabase("remote-io.db", true, 0, res);
	defineDatabase("alarms_history.sqlite3", false, 8192, res);
	
	return res;
}


function defineDatabase(pName, pFolder, pCleanSize, resultArray)
{
	var definedObject = {};
	
	definedObject["dbName"] = pName;
	definedObject["folder"] = pFolder;
	definedObject["cleanSize"] = pCleanSize;
	
	resultArray.push(definedObject);
}

module.exports =
{
	getSupportedDatabases: getSupportedDatabasesArray,
	folderErrorMargin: folderErrorMarginSize
};