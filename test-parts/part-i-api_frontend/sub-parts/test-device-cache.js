var addedDeviceCache = [];
var listCache = [];
var nodeCache = {};

function addDevice(tdManufacturer, tdModel, tdAddress, tdKey)
{
	var cacheItem =
	{
		"manufacturer": tdManufacturer, 
		"model": tdModel, 
		"address": tdAddress,
		"key": tdKey
	};
	
	addedDeviceCache.push(cacheItem);
}

function getDevice(itemIndex)
{
	var res = null;
	
	if (itemIndex >= 0 && itemIndex < addedDeviceCache.length)
	{
		res = addedDeviceCache[itemIndex];
	}
	
	return res;
}

function countDevices()
{
	var res = addedDeviceCache.length;
	return res;
}


function setList(v)
{
	listCache = v;
}

function getList()
{
	var res = listCache;
	return res;
}


function addNode(nManufacturerName, nDeviceArray)
{
	nodeCache[nManufacturerName] = nDeviceArray;
}

function getNodeManufacturer(mProperty)
{
	var mType = typeof nodeCache[mProperty];
	var res = null;
	
	if (nodeCache[mProperty] !== null && mType !== "undefined")
	{
		res = nodeCache[mProperty];
	}
	
	return res;
}

function getNodePropertyList()
{
	var res = [];
	
	for (nProp in nodeCache)
	{
		res.push(nProp);
	}
	
	return res;
}


function getNodeArrayStructure()
{
	var cacheString = JSON.stringify(nodeCache);
	var structureObject = JSON.parse(cacheString);
	var currentIndex = 0;
	var structureText = "Example Text";
	
	for (currentProp in structureObject)
	{
		currentIndex = 0;
		
		for (currentIndex = 0; currentIndex < structureObject[currentProp].length; currentIndex = currentIndex + 1)
		{
			structureObject[currentProp][currentIndex].value = structureText;
			structureObject[currentProp][currentIndex].text = structureText;
			structureObject[currentProp][currentIndex].name = structureText;
		}
	}
	
	return structureObject;
}


function clearCache()
{
	var res = false;
	
	try
	{
		addedDeviceCache = [];
		listCache = [];
		nodeCache = {};
		
		res = true;
	}
	catch(e)
	{
		res = false;
	}
	
	return res;
}

module.exports =
{
	storeTestDevice: addDevice,
	getTestDevice: getDevice,
	countTestDevices: countDevices,
	storeList: setList,
	retrieveList: getList,
	storeNodeArray: addNode,
	retrieveNodeManufacturer: getNodeManufacturer,
	readNodePropertyList: getNodePropertyList,
	retrieveNodeArrayStructure: getNodeArrayStructure,
	clearTestCache: clearCache
};