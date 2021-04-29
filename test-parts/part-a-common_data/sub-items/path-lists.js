function getAppPathsArray()
{
	var arrayResult = [];
	
	arrayResult.push("foxRelative", "subCommonRelative", "commonErrors", "commonObjects");
	arrayResult.push("defineApi", "localValid", "requestApi", "requestApiPaths");
	arrayResult.push("supportedDatabases", "testCommon", "testCommonFull");
	
	return arrayResult;
}

function getFoxPathsArray()
{
	var arrayResult = [];
	
	arrayResult.push("serviceMainFile", "settingsFile", "redSettingsFile", "rioSettingsFile");
	arrayResult.push("advantechFile", "moxaFile", "sonoffFile", "deviceSettingsFile");
	arrayResult.push("storedDeviceClassFile", "connectedDeviceClassFile", "rioFactoriesFile", "rioIndexFile");
	
	return arrayResult;
}


function getSubCommonPathsArray()
{
	var arrayResult = ["getModelsFile", "checkModelIntegrityFile", "rioCommonFile", "rioCommonInvalidFile", "deviceCommonFile"];
	return arrayResult;
}


module.exports =
{
	getAppPaths: getAppPathsArray,
	getFoxPaths: getFoxPathsArray,
	getSubCommonPaths: getSubCommonPathsArray
};