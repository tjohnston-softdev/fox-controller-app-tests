const chai = require("chai");
const expect = require("chai").expect;
const chaiThings = require('chai-things');

const commonPaths = require("../../../app/paths/files/app-paths");
const commonFunctionsFile = require(commonPaths.testCommon);
const sysPlatform = require(commonPaths.sysPlatform);

const supportedDatabasesFile = require(commonPaths.supportedDatabases);
const supportedDatabasesArray = supportedDatabasesFile.getSupportedDatabases();


function getSupportedDatabaseNames()
{
	var loopIndex = 0;
	var currentObject = {};
	var currentType = "";
	var nameRes = [];
	
	for (loopIndex = 0; loopIndex < supportedDatabasesArray.length; loopIndex = loopIndex + 1)
	{
		currentObject = supportedDatabasesArray[loopIndex];
		currentType = typeof currentObject.dbName;
		
		if (currentType === 'string' && currentObject.dbName.length > 0)
		{
			nameRes.push(currentObject.dbName);
		}
		else if (currentType === 'string')
		{
			throw new Error("Database definition names cannot be empty");
		}
		else
		{
			throw new Error("Database definitions must have names");
		}
	}
	
	
	return nameRes;
}


function getDatabaseDefinitionByObject(targetObject)
{
	var loopIndex = 0;
	var currentObject = null;
	var targetFound = false;
	var retrievedDefinition = null;
	
	var res = {};
	
	while (loopIndex >= 0 && loopIndex < supportedDatabasesArray.length && targetFound !== true)
	{
		currentObject = supportedDatabasesArray[loopIndex];
		
		if (currentObject.dbName === targetObject.name)
		{
			targetFound = true;
			retrievedDefinition = currentObject;
		}
		
		loopIndex = loopIndex + 1;
	}
	
	
	res["dbFound"] = targetFound;
	res["dbDefinition"] = retrievedDefinition;
	
	return res;
}


function checkFileDatabaseEmpty(fileObj, fileDef, fileDbName)
{
	var res = false;
	
	if (fileObj.size === fileDef.dbDefinition.cleanSize)
	{
		res = true;
	}
	else if (fileObj.size > fileDef.dbDefinition.cleanSize)
	{
		res = false;
		showEmptyContentError(fileDbName);
	}
	else if (fileObj.size < fileDef.dbDefinition.cleanSize)
	{
		res = false;
		showInvalidSizeError(fileDbName);
	}
	else
	{
		res = false;
		showCurrentSizeCheckError(fileDbName);
	}
	
	return res;
}


function checkFolderDatabaseEmpty(folderObj, folderDef, folderDbName)
{
	var baseCleanSize = folderDef.dbDefinition.cleanSize;
	var maximumCleanSize = getDatabaseFolderMargin(baseCleanSize);
	var res = false;
	
	if (folderObj.size >= baseCleanSize && folderObj.size <= maximumCleanSize)
	{
		res = true;
	}
	else if (folderObj.size > maximumCleanSize)
	{
		res = false;
		showEmptyContentError(folderDbName);
	}
	else if (folderObj.size < baseCleanSize)
	{
		res = false;
		showInvalidSizeError(folderDbName);
	}
	else
	{
		res = false;
		showCurrentSizeCheckError(folderDbName);
	}
	
	
	return res;
}


function checkFileDatabasePopulated(fileObj, fileDef, fileDbName)
{
	var res = false;
	
	if (fileObj.size > fileDef.dbDefinition.cleanSize)
	{
		res = true;
	}
	else if (fileObj.size === fileDef.dbDefinition.cleanSize)
	{
		res = false;
		throw new Error(fileDbName + " is empty");
	}
	else if (fileObj.size < fileDef.dbDefinition.cleanSize)
	{
		res = false;
		showInvalidSizeError(fileDbName);
	}
	else
	{
		res = false;
		showCurrentSizeCheckError(fileDbName);
	}
	
	
	return res;
}

function checkFolderDatabasePopulated(folderObj, folderDef, folderDbName)
{
	var baseCleanSize = folderDef.dbDefinition.cleanSize;
	var maximumCleanSize = getDatabaseFolderMargin(baseCleanSize);
	var res = false;
	
	if (folderObj.size > maximumCleanSize)
	{
		res = true;
	}
	else if (folderObj.size >= baseCleanSize && folderObj <= maximumCleanSize)
	{
		res = false;
		showPopulatedFolderEmptyError(folderDbName);
	}
	else if (folderObj.size > baseCleanSize)
	{
		res = false;
		showInvalidSizeError(folderDbName);
	}
	else
	{
		res = false;
		showCurrentSizeCheckError(folderDbName);
	}
	
	return res;
}



function getDatabaseFolderMargin(baseNumber)
{
	var windowsUsed = sysPlatform.getWindows();
	var res = -1;
	
	if (windowsUsed === true)
	{
		res = baseNumber;
	}
	else
	{
		res = baseNumber + supportedDatabasesFile.folderErrorMargin;
	}
	
	return res;
}



function testDatabaseNames(dbArray)
{
	var expectedNames = getSupportedDatabaseNames();
	
	var loopIndex = 0;
	var currentObject = null;
	var currentExists = false;
	
	for (loopIndex = 0; loopIndex < dbArray.length; loopIndex = loopIndex + 1)
	{
		currentObject = dbArray[loopIndex];
		currentExists = expectedNames.includes(currentObject.name);
		expect(currentExists).to.be.true;
	}
}


function testDatabaseFolderFlags(dbArray)
{
	var loopIndex = 0;
	var currentObject = {};
	var currentName = "";
	var currentDirectory = false;
	var currentDefinition = {};
	var currentFound = false;
	var currentValid = false;
	
	for (loopIndex = 0; loopIndex < dbArray.length; loopIndex = loopIndex + 1)
	{
		currentObject = dbArray[loopIndex];
		currentName = "'" + currentObject.name + "'";
		currentDirectory = currentObject.isDirectory;
		currentDefinition = getDatabaseDefinitionByObject(currentObject);
		currentFound = currentDefinition.dbFound;
		currentValid = false;
		
		if (currentFound === true && currentDefinition.dbDefinition.folder === currentDirectory)
		{
			currentValid = true;
		}
		else if (currentFound === true)
		{
			currentValid = false;
			throw new Error(currentName + " directory flag is missing or incorrect");
		}
		else
		{
			currentValid = false;
			showUnknownDatabaseError(currentName);
		}
		
		expect(currentValid).to.be.true;
	}
	
}


function testDatabaseSizesEmpty(dbArray)
{
	var loopIndex = 0;
	var currentObject = {};
	var currentName = "";
	var currentDefinition = {};
	var currentFound = false;
	var currentValid = false;
	
	for (loopIndex = 0; loopIndex < dbArray.length; loopIndex = loopIndex + 1)
	{
		currentObject = dbArray[loopIndex];
		currentName = "'" + currentObject.name + "'";
		currentDefinition = getDatabaseDefinitionByObject(currentObject);
		currentFound = currentDefinition.dbFound;
		currentValid = false;
		
		if (currentFound === true && currentDefinition.dbDefinition.folder === true)
		{
			currentValid = checkFolderDatabaseEmpty(currentObject, currentDefinition, currentName);
		}
		else if (currentFound === true && currentDefinition.dbDefinition.folder === false)
		{
			currentValid = checkFileDatabaseEmpty(currentObject, currentDefinition, currentName);
		}
		else if (currentFound === true)
		{
			currentValid = false;
			showInvalidStructureError(currentName);
		}
		else
		{
			currentValid = false;
			showUnknownDatabaseError(currentName);
		}
		
		expect(currentValid).to.be.true;
	}
}


function testDatabaseSizesPopulated(dbArray)
{
	var loopIndex = 0;
	var currentObject = {};
	var currentName = "";
	var currentDefinition = {};
	var currentFound = false;
	var currentValid = false;
	
	for (loopIndex = 0; loopIndex < dbArray.length; loopIndex = loopIndex + 1)
	{
		currentObject = dbArray[loopIndex];
		currentName = "'" + currentObject.name + "'";
		currentDefinition = getDatabaseDefinitionByObject(currentObject);
		currentFound = currentDefinition.dbFound;
		currentValid = false;
		
		if (currentFound === true && currentDefinition.dbDefinition.folder === true)
		{
			currentValid = checkFolderDatabasePopulated(currentObject, currentDefinition, currentName);
		}
		else if (currentFound === true && currentDefinition.dbDefinition.folder === false)
		{
			currentValid = checkFileDatabasePopulated(currentObject, currentDefinition, currentName);
		}
		else if (currentFound === true)
		{
			currentValid = false;
			showInvalidStructureError(currentName);
		}
		else
		{
			currentValid = false;
			showUnknownDatabaseError(currentName);
		}
		
		expect(currentValid).to.be.true;
	}
	
}



function showInvalidSizeError(vName)
{
	var flaggedMessage = "Invalid size for Database " + vName;
	throw new Error(flaggedMessage);
}

function showCurrentSizeCheckError(vName)
{
	var flaggedMessage = "Could not check current size of Database " + vName;
	throw new Error(flaggedMessage);
}


function showEmptyContentError(vName)
{
	var flaggedMessage = vName + " has content. This Database must be cleaned.";
	throw new Error(flaggedMessage);
}


function showPopulatedFolderEmptyError(vName)
{
	var flaggedMessage = "";
	
	flaggedMessage += vName;
	flaggedMessage += " is most likely empty based on the ";
	flaggedMessage += "Database's clean size, and folder error margin.";
	
	throw new Error(flaggedMessage);
}



function showUnknownDatabaseError(vName)
{
	var flaggedMessage = vName + " is not a known Controller Database.";
	throw new Error(flaggedMessage);
}

function showInvalidStructureError(vName)
{
	var flaggedMessage = vName + " has an invalid definition structure.";
	throw new Error(flaggedMessage);
}



module.exports =
{
	testNames: testDatabaseNames,
	testFolderFlags: testDatabaseFolderFlags,
	testSizesEmpty: testDatabaseSizesEmpty,
	testSizesPopulated: testDatabaseSizesPopulated
};