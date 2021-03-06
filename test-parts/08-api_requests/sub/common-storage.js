const chai = require("chai");
const expect = require("chai").expect;
const chaiThings = require('chai-things');

const commonPaths = require("../../../app/paths/files/app-paths");
const commonFunctions = require(commonPaths.testCommon);
const objectFunctions = require(commonPaths.testObject);
const localValidFile = require(commonPaths.localValid);
const sysPlatform = require(commonPaths.sysPlatform);


function testDriveLetterObject(driveObj)
{
	var windowsUsed = sysPlatform.getWindows();
	var letterValue = driveObj['fs'];
	var letterValid = false;
	
	if (windowsUsed === true)
	{
		letterValid = localValidFile.validateDriveLetter(letterValue);
	}
	else
	{
		letterValid = localValidFile.validateDrivePath(letterValue);
	}
	
	return letterValid;
}

function testDriveMountObject(driveObj)
{
	var windowsUsed = sysPlatform.getWindows();
	var mountValue = driveObj['mount'];
	var mountValid = false;
	
	if (windowsUsed === true)
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
	
	return mountValid;
}



function testDriveTotalObject(driveObj)
{
	var preparedSize = parseFloat(driveObj.size);
	expect(preparedSize).to.be.above(0);
}

function testDriveUsedObject(driveObj)
{
	var totalValue = parseFloat(driveObj.size);
	var usedValue = driveObj.used;
	expect(usedValue).to.be.within(0, totalValue);
}

function testDrivePercentageObject(percentObject)
{
	commonFunctions.testPercent(percentObject.use);
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

function testDriveMountArray(fsArray, fsPlatform)
{
	var loopIndex = 0;
	var currentObject = null;
	
	for (loopIndex = 0; loopIndex < fsArray.length; loopIndex = loopIndex + 1)
	{
		currentObject = fsArray[loopIndex];
		testDriveMountObject(currentObject, fsPlatform);
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
	testLetterObject: testDriveLetterObject,
	testMountObject: testDriveMountObject,
	testTotalObject: testDriveTotalObject,
	testUsedObject: testDriveUsedObject,
	testPercentageObject: testDrivePercentageObject,
	testLettersArray: testDriveLettersArray,
	testMountArray: testDriveMountArray,
	testTotalArray: testDriveTotalArray,
	testUsedArray: testDriveUsedArray,
	testPercentagesArray: testDrivePercentagesArray,
	testFlags: testFileFlags,
	getUserStoragePaths: defineUserStoragePaths,
	testFolderCreation: testFolderCreationResult
};