const commonPaths = require("../../../app/paths/files/app-paths");
const foxPath = require(commonPaths.foxRelative);


function getAllSupportedModels()
{
	var mAdvantech = null;
	var mMoxa = null;
	var mSonoff = null;
	var resArray = null;
	
	try
	{
		mAdvantech = require(foxPath.advantechFile);
		mMoxa = require(foxPath.moxaFile);
		mSonoff = require(foxPath.sonoffFile);
		
		resArray = mAdvantech.concat(mMoxa, mSonoff);
	}
	catch(e)
	{
		resArray = null;
	}
	
	return resArray;
}


function getManufacturerModels(sList)
{
	var supportedIndex = 0;
	var supportedElement = null;
	var manufacturerArray = [];
	var modelArray = [];
	
	for (supportIndex = 0; supportIndex < sList.length; supportIndex = supportIndex + 1)
	{
		supportedElement = sList[supportIndex];
		manufacturerArray.push(supportedElement.maker);
		modelArray.push(supportedElement.modelType);
	}
	
	var res = {"manufacturers": manufacturerArray, "models": modelArray};
	return res;
}


exports.retrieveAllSupportedModels = getAllSupportedModels;
exports.retrieveManufacturerModels = getManufacturerModels;