const chai = require("chai");
const expect = require("chai").expect;
const chaiThings = require('chai-things');
const sinon = require('sinon');

const commonPaths = require("../../../app/paths/files/app-paths");
const foxPath = require(commonPaths.foxRelativeFile);
const commonFunctionsFile = require(commonPaths.testCommonFull);
const commonErrorStringsFile = require(commonPaths.commonErrorsFile);
const commonJsonObjectsFile = require(commonPaths.commonObjectFile);
const localValidFile = require(commonPaths.localValid);


function testDrivePropertyDefinitionsObject(dObject)
{
	commonFunctionsFile.testObjectPropertyDefinition(dObject, 'fs');
	commonFunctionsFile.testObjectPropertyDefinition(dObject, 'type');
	commonFunctionsFile.testObjectPropertyDefinition(dObject, 'size');
	commonFunctionsFile.testObjectPropertyDefinition(dObject, 'used');
	commonFunctionsFile.testObjectPropertyDefinition(dObject, 'use');
	commonFunctionsFile.testObjectPropertyDefinition(dObject, 'mount');
}


function testDriveLetterObject(dObject, dPlatform)
{
	var dValue = dObject['fs'];
	var dLetterValid = false;
	
	if (dPlatform === 'win32')
	{
		dLetterValid = localValidFile.validateDriveLetter(dValue);
	}
	else
	{
		dLetterValid = localValidFile.validateDrivePath(dValue);
	}
	
	commonFunctionsFile.testTrue(dLetterValid);
}

function testMountObject(dObject, dPlatform)
{
	var dValue = dObject['mount'];
	var mountValid = false;
	
	if (dPlatform === 'win32')
	{
		mountValid = localValidFile.validateDriveLetter(dValue);
	}
	else if (dValue === "/")
	{
		mountValid = true;
	}
	else
	{
		mountValid = false;
	}
	
}



function testDriveTotalObject(tObject, tPlatform)
{
	var tSize = null;
	var tType = null;
	
	if (tPlatform === 'win32')
	{
		tType = 'string'
		tSize = commonFunctionsFile.convertStringToNumber(tObject.size);
	}
	else
	{
		tType = 'number'
		tSize = tObject.size;
	}
	
	commonFunctionsFile.testType(tObject.size, tType);
	commonFunctionsFile.testPositive(tSize);
}

function testDriveUsedObject(uObject)
{
	var totalValue = commonFunctionsFile.convertStringToNumber(uObject.size);
	var usedValue = uObject.used;
		
	commonFunctionsFile.testZeroLeast(usedValue);
	commonFunctionsFile.testMost(usedValue, totalValue);
}

function testDrivePercentageObject(percentObject)
{
	commonFunctionsFile.testPercent(percentObject.use);
}

function testDrivePropertyDefinitionsArray(fsArray)
{
	var fsIndex = 0;
	var fsObject = null;
	
	for (fsIndex = 0; fsIndex < fsArray.length; fsIndex = fsIndex + 1)
	{
		fsObject = fsArray[fsIndex];
		testDrivePropertyDefinitionsObject(fsObject);
	}
}



function testDriveLettersArray(fsArray, fsPlatform)
{
	var fsIndex = 0;
	var fsObject = null;
	
	for (fsIndex = 0; fsIndex < fsArray.length; fsIndex = fsIndex + 1)
	{
		fsObject = fsArray[fsIndex];
		testDriveLetterObject(fsObject, fsPlatform);
	}
}

function testMountArray(fsArray, fsPlatform)
{
	var fsIndex = 0;
	var fsObject = null;
	
	for (fsIndex = 0; fsIndex < fsArray.length; fsIndex = fsIndex + 1)
	{
		fsObject = fsArray[fsIndex];
		testMountObject(fsObject, fsPlatform);
	}
}


function testDriveTotalArray(fsArray, fsPlatform)
{
	var fsIndex = 0;
	var fsObject = null;
	
	for (fsIndex = 0; fsIndex < fsArray.length; fsIndex = fsIndex + 1)
	{
		fsObject = fsArray[fsIndex];
		testDriveTotalObject(fsObject, fsPlatform);
	}
	
}

function testDriveUsedArray(fsArray)
{
	var fsIndex = 0;
	var fsObject = null;
	
	for (fsIndex = 0; fsIndex < fsArray.length; fsIndex = fsIndex + 1)
	{
		fsObject = fsArray[fsIndex];
		testDriveUsedObject(fsObject);
	}
}

function testDrivePercentagesArray(fsArray)
{
	var fsIndex = 0;
	var fsObject = null;
	
	for (fsIndex = 0; fsIndex < fsArray.length; fsIndex = fsIndex + 1)
	{
		fsObject = fsArray[fsIndex];
		testDrivePercentageObject(fsObject);
	}
}


function testFileFlags(fList)
{
	var fileIndex = 0;
	var currentFile = null;
	
	for (fileIndex = 0; fileIndex < fList.length; fileIndex = fileIndex + 1)
	{
		currentFile = fList[fileIndex];
		commonFunctionsFile.testFalse(currentFile.isDirectory);
	}
}



function defineUserStoragePaths()
{
	var tName = null;
	var tFolder = null;
	var tPath = null;
	var tContent = null;
	
	var res = null;
	
	try
	{
		tName = "test-file.txt";
		tFolder = "../user-storage";
		tPath = tFolder + '/' + tName;
		tContent = "Test File Contents";
		
		res =
		{
			"storageTestFileName": tName,
			"storageTestFolderPath": tFolder,
			"storageTestFilePath": tPath,
			"storageTestFileContent": tContent
		}
	}
	catch(e)
	{
		tName = null;
		tFolder = null;
		tPath = null;
		tContent = null;
		
		res = null;
	}
	
	return res;
}



function testFolderCreationResult(eObject)
{
	var successful = false;
	
	if (eObject !== null && eObject.code === 'EEXIST')
	{
		successful = true;
	}
	else if (eObject !== null)
	{
		successful = false;
	}
	else
	{
		successful = true;
	}
	
	commonFunctionsFile.testTrue(successful);
}


exports.callTestDrivePropertyDefinitionsObject = testDrivePropertyDefinitionsObject;
exports.callTestDriveLetterObject = testDriveLetterObject;
exports.callTestMountObject = testMountObject;
exports.callTestDriveTotalObject = testDriveTotalObject;
exports.callTestDriveUsedObject = testDriveUsedObject;
exports.callTestDrivePercentageObject = testDrivePercentageObject;
exports.callTestDrivePropertyDefinitionsArray = testDrivePropertyDefinitionsArray;
exports.callTestDriveLettersArray = testDriveLettersArray;
exports.callTestMountArray = testMountArray;
exports.callTestDriveTotalArray = testDriveTotalArray;
exports.callTestDriveUsedArray = testDriveUsedArray;
exports.callTestDrivePercentagesArray = testDrivePercentagesArray;
exports.callTestFileFlags = testFileFlags;
exports.getUserStoragePaths = defineUserStoragePaths;
exports.callTestFolderCreationResult = testFolderCreationResult;

