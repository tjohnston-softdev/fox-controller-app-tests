const commonPaths = require("../../../app/paths/files/app-paths");
const commonFunctionsFile = require(commonPaths.testCommonFull);


function verifyDeviceListRefIntegrity(dList, sList)
{
	var deviceIndex = 0;
	var currentDevice = null;
	var currentDesc = "";
	var currentMatch = false;
	var canContinue = true;
	
	while (deviceIndex >= 0 && deviceIndex < dList.length && canContinue === true)
	{
		currentDevice = dList[deviceIndex];
		currentDesc = writeCurrentDeviceDescription(currentDevice);
		currentMatch = matchCurrentDevice(currentDevice, sList);
		
		if (currentMatch !== true)
		{
			canContinue = false;
			throw new Error(currentDesc);
		}
		
		deviceIndex = deviceIndex + 1;
	}
	
	commonFunctionsFile.testTrue(canContinue);
}



function matchCurrentDevice(cDevice, sModels)
{
	var deviceManufacturer = cDevice.maker.toLowerCase();
	var deviceModel = cDevice.model.toLowerCase();
	
	var supportIndex = 0;
	var currentSupportEntry = null;
	var currentManufacturer = "";
	var currentModel = "";
	var matchFound = false;
	
	while (supportIndex >= 0 && supportIndex < sModels.length && matchFound !== true)
	{
		currentSupportEntry = sModels[supportIndex];
		currentManufacturer = currentSupportEntry.maker.toLowerCase();
		currentModel = currentSupportEntry.modelType.toLowerCase();
		
		if (deviceManufacturer === currentManufacturer && deviceModel === currentModel)
		{
			matchFound = true;
		}
		
		supportIndex = supportIndex + 1;
	}
	
	return matchFound;
}

function writeCurrentDeviceDescription(vDevice)
{
	var writeRes = "";
	
	writeRes += "'";
	writeRes += vDevice.maker;
	writeRes += "' - ";
	
	writeRes += "'";
	writeRes += vDevice.model;
	writeRes += "', is not a supported device";
	
	return writeRes;
}


module.exports =
{
	checkIntegrity: verifyDeviceListRefIntegrity
};