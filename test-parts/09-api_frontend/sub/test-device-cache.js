var modelsCache = [];
var addedDeviceCache = [];
var listCache = [];
var nodeCache = {};


function setModels(newValue)
{
	modelsCache = newValue;
}

function getModels()
{
	return modelsCache;
}


function addDevice(vManufacturer, vModel, vAddr, vKey)
{
	var cacheItem = {};
	
	cacheItem["manufacturer"] = vManufacturer;
	cacheItem["model"] = vModel;
	cacheItem["address"] = vAddr;
	cacheItem["key"] = vKey;
	
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
	return addedDeviceCache.length;
}


function setList(newValue)
{
	listCache = newValue;
}

function getList()
{
	return listCache;
}


function addNode(devManufacturer, devArr)
{
	nodeCache[devManufacturer] = devArr;
}

function getNodeManufacturer(mProp)
{
	var elementValue = nodeCache[mProp];
	var res = null;
	
	if (elementValue !== undefined && elementValue !== null)
	{
		res = elementValue;
	}
	
	return res;
}

function getNodePropertyList()
{
	var res = [];
	
	for (currentProp in nodeCache)
	{
		res.push(currentProp);
	}
	
	return res;
}


function getNodeArrayStructure()
{
	var cacheString = JSON.stringify(nodeCache);
	var structureObject = JSON.parse(cacheString);
	
	var currentProp = "";
	var currentOuter = null;
	var currentIndex = 0;
	var currentInner = null;
	var structureText = "Example Text";
	
	for (currentProp in structureObject)
	{
		currentOuter = structureObject[currentProp];
		currentIndex = 0;
		currentInner = null;
		
		for (currentIndex = 0; currentIndex < currentOuter.length; currentIndex = currentIndex + 1)
		{
			currentInner = currentOuter[currentIndex];
			currentInner.value = structureText;
			currentInner.text = structureText;
			currentInner.name = structureText;
		}
	}
	
	return structureObject;
}


function clearCache()
{
	var res = false;
	
	try
	{
		modelsCache = [];
		addedDeviceCache = [];
		listCache = [];
		nodeCache = {};
		
		res = true;
	}
	catch(clearErr)
	{
		res = false;
	}
	
	return res;
}


module.exports =
{
	storeSupportedModels: setModels,
	getSupportedModels: getModels,
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