const dash = " - ";

function writeDeviceHeaderString(vManufacturer, vModel)
{
	var res = vManufacturer + dash + vModel;
	return res;
}

function writeDeviceCacheHeaderString(cacheObj)
{
	var res = [cacheObj.manufacturer, cacheObj.model, cacheObj.address, cacheObj.key].join(dash);
	return res;
}

function writeNodeCacheHeaderString(vText, vKey)
{
	var res = vText + dash + vKey;
	return res;
}


function writeDeviceDescriptionString(vManufacturer, vModel)
{
	var res = ["Supported ", vModel, "device manufactured by ", vManufacturer, " "].join("");
	return res;	
}


module.exports =
{
	writeDeviceHeader: writeDeviceHeaderString,
	writeDeviceCacheHeader: writeDeviceCacheHeaderString,
	writeNodeCacheHeader: writeNodeCacheHeaderString,
	writeDeviceDescription: writeDeviceDescriptionString
};