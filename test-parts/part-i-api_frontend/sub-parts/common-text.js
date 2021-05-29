const d = " - ";

function writeDeviceHeaderString(vManufacturer, vModel)
{
	var res = vManufacturer + d + vModel;
	return res;
}

function writeDeviceCacheHeaderString(cacheObj)
{
	var res = [cacheObj.manufacturer, cacheObj.model, cacheObj.address, cacheObj.key].join(d);
	return res;
}

function writeNodeCacheHeaderString(vText, vKey)
{
	var res = vText + d + vKey;
	return res;
}


function writeDeviceDescriptionString(vManufacturer, vModel)
{
	var res = "";
	
	res += "Supported ";
	res += vModel
	res += "device manufactured by ";
	res += vManufacturer;
	res += " ";
	
	return res;	
}


module.exports =
{
	writeDeviceHeader: writeDeviceHeaderString,
	writeDeviceCacheHeader: writeDeviceCacheHeaderString,
	writeNodeCacheHeader: writeNodeCacheHeaderString,
	writeDeviceDescription: writeDeviceDescriptionString
};