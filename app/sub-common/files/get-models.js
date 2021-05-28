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
	catch(e)
	{
		resArray = null;
	}
	
	return resArray;
}


function getModelsByManufacturer(sList)
{
	var loopIndex = 0;
	var currentElement = {};
	var res = {};
	
	res["manufacturers"] = [];
	res["models"] = [];
	
	for (loopIndex = 0; loopIndex < sList.length; loopIndex = loopIndex + 1)
	{
		currentElement = sList[loopIndex];
		res.manufacturers.push(currentElement.maker);
		res.models.push(currentElement.modelType);
	}
	
	return res;
}


module.exports =
{
	getAllModels: getAllSupportedModels,
	getByManufacturer: getModelsByManufacturer
};