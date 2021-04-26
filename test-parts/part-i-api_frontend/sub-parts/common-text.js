const d = " - ";

function writeDeviceHeader(dhManufacturer, dhModel)
{
	var res = dhManufacturer + d + dhModel;
	return res;
}

function writeDeviceCacheHeader(dCacheObject)
{
	var partArray = [dCacheObject.manufacturer, dCacheObject.model, dCacheObject.address, dCacheObject.key];
	var res = partArray.join(d);
	return res;
}

function writeNodeCacheHeader(nCacheText, nCacheKey)
{
	var res = nCacheText + d + nCacheKey;
	return res;
}


function writeDeviceDescription(descManufacturer, descModel)
{
	var p1 = "Supported " + descModel + "device ";
	var p2 = "manufactured by " + descManufacturer + " ";
	
	var res = p1 + p2;
	return res;	
}

exports.callWriteDeviceHeader = writeDeviceHeader;
exports.callWriteDeviceCacheHeader = writeDeviceCacheHeader;
exports.callWriteNodeCacheHeader = writeNodeCacheHeader;
exports.callWriteDeviceDescription = writeDeviceDescription;