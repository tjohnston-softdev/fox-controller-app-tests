function getAppPathsArray()
{
	var arrayResult = null;
	
	try
	{
		arrayResult = [];
		
		arrayResult.push('foxRelativeFile');
		arrayResult.push('subCommonFile');
		arrayResult.push('commonErrorsFile');
		arrayResult.push('commonObjectFile');
		arrayResult.push('defineApi');
		arrayResult.push('localValid');
		arrayResult.push('requestApi');
		arrayResult.push('requestApiPaths');
		arrayResult.push('supportedDatabasesPath');
		arrayResult.push('testCommon');
		arrayResult.push('testCommonFull');
	}
	catch(e)
	{
		arrayResult = null;
	}
	
	return arrayResult;
}

function getFoxPathsArray()
{
	var arrayResult = null;
	
	try
	{
		arrayResult = [];
		
		arrayResult.push('serviceMainFile');
		arrayResult.push('settingsFile');
		arrayResult.push('redSettingsFile');
		arrayResult.push('rioSettingsFile');
		arrayResult.push('advantechFile');
		arrayResult.push('moxaFile');
		arrayResult.push('sonoffFile');
		arrayResult.push('deviceSettingsFile');
		arrayResult.push('storedDeviceClassFile');
		arrayResult.push('connectedDeviceClassFile');
		arrayResult.push('rioFactoriesFile');
		arrayResult.push('rioIndexFile');
		
	}
	catch(e)
	{
		arrayResult = null;
	}
	
	return arrayResult;
}


function getSubCommonPathsArray()
{
	var arrayResult = null;
	
	try
	{
		arrayResult = [];
		
		arrayResult.push('getModelsFile');
		arrayResult.push('checkModelIntegrityFile');
		arrayResult.push('rioCommonFile');
		arrayResult.push('rioCommonInvalidFile');
		arrayResult.push('deviceCommonFile');
	}
	catch(e)
	{
		arrayResult = null;
	}
	
	return arrayResult;
}

exports.getAppPaths = getAppPathsArray;
exports.getFoxPaths = getFoxPathsArray;
exports.getSubCommonPaths = getSubCommonPathsArray;