const chai = require("chai");
const expect = require("chai").expect;
const chaiThings = require('chai-things');
const sinon = require('sinon');

const commonPaths = require("../../../app/paths/files/app-paths");
const foxPath = require(commonPaths.foxRelative);
const commonFunctionsFile = require(commonPaths.testCommonFull);
const commonErrorStringsFile = require(commonPaths.commonErrors);
const commonJsonObjectsFile = require(commonPaths.commonObjects);
const localValidFile = require(commonPaths.localValid);

const supportedDatabasesFile = require(commonPaths.supportedDatabases);
const supportedDatabasesArray = supportedDatabasesFile.getSupportedDatabases();


function getSupportedDatabaseNames()
{
	var dInd = 0;
	var dElement = null;
	var dPropertyType = null;
	var dNames = [];
	
	for (dInd = 0; dInd < supportedDatabasesArray.length; dInd = dInd + 1)
	{
		dElement = supportedDatabasesArray[dInd];
		dPropertyType = typeof dElement.dbName;
		
		if (dElement.dbName !== null && dPropertyType === 'string' && dElement.dbName.length > 0)
		{
			dNames.push(dElement.dbName);
		}
		else if (dElement.dbName !== null && dPropertyType === 'string')
		{
			throw new Error("Database definition names cannot be empty");
		}
		else
		{
			throw new Error("Database definitions must have names");
		}
		
		
	}
	
	return dNames;
}

function getDatabaseDefinitionByObject(dObject)
{
	var dInd = 0;
	var dElement = null;
	var dFound = false;
	var dDefinition = null;
	
	while (dInd >= 0 && dInd < supportedDatabasesArray.length && dFound !== true)
	{
		dElement = supportedDatabasesArray[dInd];
		
		if (dElement.dbName === dObject.name)
		{
			dFound = true;
			dDefinition = dElement;
		}
		
		dInd = dInd + 1;
	}
	
	var res = {"dbFound": dFound, "dbDefinition": dDefinition};
	return res;
}


function checkFileDatabaseEmpty(fileDatabaseObject, fileDatabaseDefinition, targetDatabaseName)
{
	var res = false;
	
	if (fileDatabaseObject.size === fileDatabaseDefinition.dbDefinition.cleanSize)
	{
		res = true;
	}
	else if (fileDatabaseObject.size > fileDatabaseDefinition.dbDefinition.cleanSize)
	{
		res = false;
		showEmptyContentError(targetDatabaseName);
	}
	else if (fileDatabaseObject.size < fileDatabaseDefinition.dbDefinition.cleanSize)
	{
		res = false;
		showInvalidSizeError(targetDatabaseName);
	}
	else
	{
		res = false;
		showCurrentSizeCheckError(targetDatabaseName);
	}
	
	return res;
}


function checkFolderDatabaseEmpty(folderDatabaseObject, folderDatabaseDefinition, targetDatabaseName, platformUsed)
{
	var baseCleanSize = folderDatabaseDefinition.dbDefinition.cleanSize;
	var maximumCleanSize = getDatabaseFolderMargin(baseCleanSize, platformUsed);
	var res = false;
	
	if (folderDatabaseObject.size >= baseCleanSize && folderDatabaseObject.size <= maximumCleanSize)
	{
		res = true;
	}
	else if (folderDatabaseObject.size > maximumCleanSize)
	{
		res = false;
		showEmptyContentError(targetDatabaseName);
	}
	else if (folderDatabaseObject.size < baseCleanSize)
	{
		res = false;
		showInvalidSizeError(targetDatabaseName);
	}
	else
	{
		res = false;
		showCurrentSizeCheckError(targetDatabaseName);
	}
	
	
	return res;
}


function checkFileDatabasePopulated(fileDatabaseObject, fileDatabaseDefinition, targetDatabaseName)
{
	var res = false;
	
	if (fileDatabaseObject.size > fileDatabaseDefinition.dbDefinition.cleanSize)
	{
		res = true;
	}
	else if (fileDatabaseObject.size === fileDatabaseDefinition.dbDefinition.cleanSize)
	{
		res = false;
		throw new Error(targetDatabaseName + " is empty");
	}
	else if (fileDatabaseObject.size < fileDatabaseDefinition.dbDefinition.cleanSize)
	{
		res = false;
		showInvalidSizeError(targetDatabaseName);
	}
	else
	{
		res = false;
		showCurrentSizeCheckError(targetDatabaseName);
	}
	
	
	return res;
}

function checkFolderDatabasePopulated(folderDatabaseObject, folderDatabaseDefinition, targetDatabaseName, platformUsed)
{
	var baseCleanSize = folderDatabaseDefinition.dbDefinition.cleanSize;
	var maximumCleanSize = getDatabaseFolderMargin(baseCleanSize, platformUsed);
	var res = false;
	
	if (folderDatabaseObject.size > maximumCleanSize)
	{
		res = true;
	}
	else if (folderDatabaseObject.size >= baseCleanSize && folderDatabaseObject <= maximumCleanSize)
	{
		res = false;
		showPopulatedFolderEmptyError(targetDatabaseName);
	}
	else if (folderDatabaseObject.size > baseCleanSize)
	{
		res = false;
		showInvalidSizeError(targetDatabaseName);
	}
	else
	{
		res = false;
		showCurrentSizeCheckError(targetDatabaseName);
	}
	
	
}





function getDatabaseFolderMargin(baseNumber, pUsed)
{
	var res = null;
	
	if (pUsed === 'win32')
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
	
	var dbIndex = 0;
	var dbObject = null;
	var dbNameIndex = -1;
	var dbNameValid = false;
	
	for (dbIndex = 0; dbIndex < dbArray.length; dbIndex = dbIndex + 1)
	{
		dbObject = dbArray[dbIndex];
		dbNameIndex = expectedNames.indexOf(dbObject.name);
		dbNameValid = false;
		
		if (dbNameIndex >= 0 && dbNameIndex < expectedNames.length)
		{
			dbNameValid = true;
		}
		
		commonFunctionsFile.testTrue(dbNameValid);
	}
}


function testDatabaseFolderFlags(dbArray)
{
	var dbIndex = 0;
	var dbObject = null;
	var dbName = null;
	var dbTarget = null;
	var dbValid = false;
	
	for (dbIndex = 0; dbIndex < dbArray.length; dbIndex = dbIndex + 1)
	{
		dbObject = dbArray[dbIndex];
		dbName = "'" + dbObject.name + "'";
		dbTarget = getDatabaseDefinitionByObject(dbObject);
		dbValid = false;
		
		if (dbTarget.dbFound === true && dbTarget.dbDefinition.folder === dbObject.isDirectory)
		{
			dbValid = true;
		}
		else if (dbTarget.dbFound === true)
		{
			dbValid = false;
			throw new Error(dbName + " directory flag is missing or incorrect");
		}
		else
		{
			dbValid = false;
			showUnknownDatabaseError(dbName);
		}
		
		commonFunctionsFile.testTrue(dbValid);
	}
	
}


function testDatabaseSizesEmpty(dbArray, dbPlatform)
{
	var dbIndex = 0;
	var dbObject = null;
	var dbName = null;
	var dbTarget = null;
	var dbValid = false;
	
	for (dbIndex = 0; dbIndex < dbArray.length; dbIndex = dbIndex + 1)
	{
		dbObject = dbArray[dbIndex];
		dbName = "'" + dbObject.name + "'";
		dbTarget = getDatabaseDefinitionByObject(dbObject);
		dbValid = false;
		
		if (dbTarget.dbFound === true && dbTarget.dbDefinition.folder === true)
		{
			dbValid = checkFolderDatabaseEmpty(dbObject, dbTarget, dbName, dbPlatform);
		}
		else if (dbTarget.dbFound === true && dbTarget.dbDefinition.folder === false)
		{
			dbValid = checkFileDatabaseEmpty(dbObject, dbTarget, dbName);
		}
		else if (dbTarget.dbFound === true)
		{
			dbValid = false;
			showInvalidStructureError(dbName);
		}
		else
		{
			dbValid = false;
			showUnknownDatabaseError(dbName);
		}
		
		commonFunctionsFile.testTrue(dbValid);
	}
}


function testDatabaseSizesPopulated(dbArray, dbPlatform)
{
	var dbIndex = 0;
	var dbObject = null;
	var dbName = null;
	var dbTarget = null;
	var dbValid = false;
	
	for (dbIndex = 0; dbIndex < dbArray.length; dbIndex = dbIndex + 1)
	{
		dbObject = dbArray[dbIndex];
		dbName = "'" + dbObject.name + "'";
		dbTarget = getDatabaseDefinitionByObject(dbObject);
		dbValid = false;
		
		if (dbTarget.dbFound === true && dbTarget.dbDefinition.folder === true)
		{
			dbValid = checkFolderDatabasePopulated(dbObject, dbTarget, dbName, dbPlatform);
		}
		else if (dbTarget.dbFound === true && dbTarget.dbDefinition.folder === false)
		{
			dbValid = checkFileDatabasePopulated(dbObject, dbTarget, dbName);
		}
		else if (dbTarget.dbFound === true)
		{
			dbValid = false;
			showInvalidStructureError(dbName);
		}
		else
		{
			dbValid = false;
			showUnknownDatabaseError(dbName);
		}
		
		
		commonFunctionsFile.testTrue(dbValid);
	}
	
}





function showInvalidSizeError(dn)
{
	throw new Error("Invalid size for Database " + dn);
}

function showCurrentSizeCheckError(dn)
{
	throw new Error("Could not check current size of Database " + dn);
}


function showEmptyContentError(dn)
{
	throw new Error(dn + " has content. This Database must be cleaned");
}


function showPopulatedFolderEmptyError(dn)
{
	var p1 = dn + " ";
	var p2 = "is most likely empty based on the Database's clean size, and folder error margin";
	
	var folderEmptyMessage = p1 + p2;
	
	throw new Error(folderEmptyMessage);
}



function showUnknownDatabaseError(dn)
{
	throw new Error(dn + " is not a known Controller Database");
}

function showInvalidStructureError(dn)
{
	throw new Error(dn + " has an invalid definition structure");
}



exports.callTestDatabaseNames = testDatabaseNames;
exports.callTestDatabaseFolderFlags = testDatabaseFolderFlags;
exports.callTestDatabaseSizesEmpty = testDatabaseSizesEmpty;
exports.callTestDatabaseSizesPopulated = testDatabaseSizesPopulated;