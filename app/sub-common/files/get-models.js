const commonPaths = require("../../../app/paths/files/app-paths");
const foxPath = require(commonPaths.foxRelative);
const loadFoxFile = require(commonPaths.loadFox);
const advantechDefs = loadFoxFile(foxPath.advantechFile);
const moxaDefs = loadFoxFile(foxPath.moxaFile);
const sonoffDefs = loadFoxFile(foxPath.sonoffFile);


function getAllSupportedModels()
{
	var resArray = null;
	
	try
	{
		resArray = advantechDefs.concat(moxaDefs, sonoffDefs);
	}
	catch(arrayErr)
	{
		resArray = null;
	}
	
	return resArray;
}


function getModelsByManufacturer(srcList)
{
	var loopIndex = 0;
	var currentElement = {};
	var loopRes = {};
	
	loopRes["manufacturers"] = [];
	loopRes["models"] = [];
	
	for (loopIndex = 0; loopIndex < srcList.length; loopIndex = loopIndex + 1)
	{
		currentElement = srcList[loopIndex];
		loopRes.manufacturers.push(currentElement.maker);
		loopRes.models.push(currentElement.modelType);
	}
	
	return loopRes;
}


module.exports =
{
	getAllModels: getAllSupportedModels,
	getByManufacturer: getModelsByManufacturer
};