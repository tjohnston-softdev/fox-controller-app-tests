function verifyReferenceIntegrity(devList, srcList)
{
	var deviceIndex = 0;
	var currentDevice = null;
	var currentDesc = "";
	var currentMatch = false;
	
	for (deviceIndex = 0; deviceIndex < devList.length; deviceIndex = deviceIndex + 1)
	{
		currentDevice = devList[deviceIndex];
		currentDesc = writeCurrentDeviceDescription(currentDevice);
		currentMatch = matchCurrentDevice(currentDevice, srcList);
		
		if (currentMatch !== true)
		{
			throw new Error(currentDesc);
		}
		
	}
	
}



function matchCurrentDevice(curDevice, srcModels)
{
	var deviceManufacturer = curDevice.maker.toLowerCase();
	var deviceModel = curDevice.model.toLowerCase();
	
	var supportIndex = 0;
	var currentSupportEntry = null;
	var currentManufacturer = "";
	var currentModel = "";
	var matchFound = false;
	
	while (supportIndex >= 0 && supportIndex < srcModels.length && matchFound !== true)
	{
		currentSupportEntry = srcModels[supportIndex];
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
	checkIntegrity: verifyReferenceIntegrity
};