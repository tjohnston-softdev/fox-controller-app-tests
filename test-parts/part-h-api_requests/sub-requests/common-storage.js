const chai = require("chai");
const expect = require("chai").expect;
const chaiThings = require('chai-things');

const commonPaths = require("../../../app/paths/files/app-paths");
const commonFunctionsFile = require(commonPaths.testCommon);
const localValidFile = require(commonPaths.localValid);


function testDrivePropertyDefinitionsObject(driveObj)
{
	commonFunctionsFile.testObjectPropertyDefinition(driveObj, 'fs');
	commonFunctionsFile.testObjectPropertyDefinition(driveObj, 'type');
	commonFunctionsFile.testObjectPropertyDefinition(driveObj, 'size');
	commonFunctionsFile.testObjectPropertyDefinition(driveObj, 'used');
	commonFunctionsFile.testObjectPropertyDefinition(driveObj, 'use');
	commonFunctionsFile.testObjectPropertyDefinition(driveObj, 'mount');
}


function testDriveLetterObject(driveObj, devPlatform)
{
	var letterValue = driveObj['fs'];
	var letterValid = false;
	
	if (devPlatform === 'win32')
	{
		letterValid = localValidFile.validateDriveLetter(letterValue);
	}
	else
	{
		letterValid = localValidFile.validateDrivePath(letterValue);
	}
	
	expect(letterValid).to.be.true;
}

function testMountObject(driveObj, devPlatform)
{
	var mountValue = driveObj['mount'];
	var mountValid = false;
	
	if (devPlatform === 'win32')
	{
		mountValid = localValidFile.validateDriveLetter(mountValue);
	}
	else if (mountValue === "/")
	{
		mountValid = true;
	}
	else
	{
		mountValid = false;
	}
	
}



function testDriveTotalObject(driveObj, devPlatform)
{
	var preparedSize = -1;
	var targetType = "";
	
	if (devPlatform === 'win32')
	{
		targetType = 'string'
		preparedSize = parseFloat(driveObj.size);
	}
	else
	{
		targetType = 'number'
		preparedSize = driveObj.size;
	}
	
	expect(driveObj.size).to.be.a(targetType);
	expect(preparedSize).to.be.above(0);
}

function testDriveUsedObject(driveObj)
{
	var totalValue = parseFloat(driveObj.size);
	var usedValue = driveObj.used;
		
	expect(usedValue).to.be.at.least(0);
	expect(usedValue).to.be.at.most(totalValue);
}

function testDrivePercentageObject(percentObject)
{
	commonFunctionsFile.testPercent(percentObject.use);
}

function testDrivePropertyDefinitionsArray(fsArray)
{
	var loopIndex = 0;
	var currentObject = null;
	
	for (loopIndex = 0; loopIndex < fsArray.length; loopIndex = loopIndex + 1)
	{
		currentObject = fsArray[loopIndex];
		testDrivePropertyDefinitionsObject(currentObject);
	}
}



function testDriveLettersArray(fsArray, fsPlatform)
{
	var loopIndex = 0;
	var currentObject = null;
	
	for (loopIndex = 0; loopIndex < fsArray.length; loopIndex = loopIndex + 1)
	{
		currentObject = fsArray[loopIndex];
		testDriveLetterObject(currentObject, fsPlatform);
	}
}

function testMountArray(fsArray, fsPlatform)
{
	var loopIndex = 0;
	var currentObject = null;
	
	for (loopIndex = 0; loopIndex < fsArray.length; loopIndex = loopIndex + 1)
	{
		currentObject = fsArray[loopIndex];
		testMountObject(currentObject, fsPlatform);
	}
}


function testDriveTotalArray(fsArray, fsPlatform)
{
	var loopIndex = 0;
	var currentObject = null;
	
	for (loopIndex = 0; loopIndex < fsArray.length; loopIndex = loopIndex + 1)
	{
		currentObject = fsArray[loopIndex];
		testDriveTotalObject(currentObject, fsPlatform);
	}
	
}

function testDriveUsedArray(fsArray)
{
	var loopIndex = 0;
	var currentObject = null;
	
	for (loopIndex = 0; loopIndex < fsArray.length; loopIndex = loopIndex + 1)
	{
		currentObject = fsArray[loopIndex];
		testDriveUsedObject(currentObject);
	}
}

function testDrivePercentagesArray(fsArray)
{
	var loopIndex = 0;
	var currentObject = null;
	
	for (loopIndex = 0; loopIndex < fsArray.length; loopIndex = loopIndex + 1)
	{
		currentObject = fsArray[loopIndex];
		testDrivePercentageObject(currentObject);
	}
}


function testFileFlags(fList)
{
	var fileIndex = 0;
	var currentFile = null;
	
	for (fileIndex = 0; fileIndex < fList.length; fileIndex = fileIndex + 1)
	{
		currentFile = fList[fileIndex];
		expect(currentFile.isDirectory).to.be.false;
	}
}



function defineUserStoragePaths()
{
	var localName = "test-file.txt";
	var localFolder = "../user-storage";
	var localFullPath = localFolder + '/' + localName;
	var localContents = "Test File Contents";
	
	var res = {};
	
	res["name"] = localName;
	res["folder"] = localFolder;
	res["fullPath"] = localFullPath;
	res["contents"] = localContents;
	
	return res;
}



function testFolderCreationResult(errObj)
{
	var successful = false;
	
	if (errObj !== null && errObj.code === 'EEXIST')
	{
		successful = true;
	}
	else if (errObj !== null)
	{
		successful = false;
	}
	else
	{
		successful = true;
	}
	
	expect(successful).to.be.true;
}


module.exports =
{
	callTestDrivePropertyDefinitionsObject: testDrivePropertyDefinitionsObject,
	callTestDriveLetterObject: testDriveLetterObject,
	callTestMountObject: testMountObject,
	callTestDriveTotalObject: testDriveTotalObject,
	callTestDriveUsedObject: testDriveUsedObject,
	callTestDrivePercentageObject: testDrivePercentageObject,
	callTestDrivePropertyDefinitionsArray: testDrivePropertyDefinitionsArray,
	callTestDriveLettersArray: testDriveLettersArray,
	callTestMountArray: testMountArray,
	callTestDriveTotalArray: testDriveTotalArray,
	callTestDriveUsedArray: testDriveUsedArray,
	callTestDrivePercentagesArray: testDrivePercentagesArray,
	callTestFileFlags: testFileFlags,
	getUserStoragePaths: defineUserStoragePaths,
	callTestFolderCreationResult: testFolderCreationResult
};