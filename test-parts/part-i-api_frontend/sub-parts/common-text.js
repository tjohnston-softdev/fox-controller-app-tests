const d = " - ";

function writeDeviceHeader(vManufacturer, vModel)
{
	var res = vManufacturer + d + vModel;
	return res;
}

function writeDeviceCacheHeader(cacheObj)
{
	var res = [cacheObj.manufacturer, cacheObj.model, cacheObj.address, cacheObj.key].join(d);
	return res;
}

function writeNodeCacheHeader(vText, vKey)
{
	var res = vText + d + vKey;
	return res;
}


function writeDeviceDescription(vManufacturer, vModel)
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
	callWriteDeviceHeader: writeDeviceHeader,
	callWriteDeviceCacheHeader: writeDeviceCacheHeader,
	callWriteNodeCacheHeader: writeNodeCacheHeader,
	callWriteDeviceDescription: writeDeviceDescription
};