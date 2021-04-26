const chai = require("chai");
const expect = require("chai").expect;
const chaiThings = require('chai-things');
const sinon = require('sinon');
const relativeTarget = "../../../app/paths/files/";
const commonPathsApp = getCommonPathsFile("app-paths");
const commonPathsFox = getCommonPathsFile("fox-paths");
const commonPathsSub = getCommonPathsFile("sub-common-paths");

const listFile = getPropertyListFile();

var propertyListApp = null;
var propertyListFox = null;
var propertyListSub = null;


function testCommonPaths()
{
	describe("Common Paths", function()
	{
		verifyAppFileExists();
		verifyFoxFileExists();
		verifySubFileExists();
		
		verifyPropertyListFileExists();
		verifyPropertyListsRetrieved();
		verifyPropertyListsValid();
		verifyPathsValid();
	});
}


function verifyAppFileExists()
{
	it("App Path File Exists (app-paths)", function()
	{
		expect(commonPathsApp).to.not.be.undefined;
		expect(commonPathsApp).to.not.be.null;
		expect(commonPathsApp).to.be.an('object');
	});
}

function verifyFoxFileExists()
{
	it("Controller Path File Exists (fox-paths)", function()
	{
		expect(commonPathsFox).to.not.be.undefined;
		expect(commonPathsFox).to.not.be.null;
		expect(commonPathsFox).to.be.an('object');
	});
}

function verifySubFileExists()
{
	it("Common Sub Path File Exists (fox-paths)", function()
	{
		expect(commonPathsSub).to.not.be.undefined;
		expect(commonPathsSub).to.not.be.null;
		expect(commonPathsSub).to.be.an('object');
	});
}



function verifyPropertyListFileExists()
{
	it("List File Exists", function()
	{
		expect(listFile).to.not.be.undefined;
		expect(listFile).to.not.be.null;
		expect(listFile).to.be.an('object');
	});
}

function verifyPropertyListsRetrieved()
{
	it("Property Lists Retrieved", function(done)
	{
		propertyListApp = listFile.getAppPaths();
		propertyListFox = listFile.getFoxPaths();
		propertyListSub = listFile.getSubCommonPaths();
		done();
	});
}

function verifyPropertyListsValid()
{
	it("Property Lists Valid", function()
	{
		checkPropertyListArray(propertyListApp, 'propertyListApp');
		checkPropertyListArray(propertyListFox, 'propertyListFox');
		checkPropertyListArray(propertyListSub, 'propertyListSub');
	});
}

function verifyPathsValid()
{
	it("Paths valid", function()
	{
		checkPaths(commonPathsApp, propertyListApp, 'app-paths');
		checkPaths(commonPathsFox, propertyListFox, 'fox-paths');
		checkPaths(commonPathsSub, propertyListSub, 'sub-common-paths');
		
		propertyListApp = null;
		propertyListFox = null;
		propertyListSub = null;
	});	
}

function checkPropertyListArray(pArray, aName)
{
	var aErrorString = writeArrayError(aName);
	
	var currentElementIndex = 0;
	var currentElementType = null;
	var currentElementValid = false;
	var overallValid = true;
	
	while (currentElementIndex >= 0 && currentElementIndex < pArray.length && overallValid === true)
	{
		currentElementType = typeof pArray[currentElementIndex];
		currentElementValid = false;
		
		if (pArray[currentElementIndex] !== null && currentElementType !== 'undefined' && currentElementType === 'string' && pArray[currentElementIndex].length >= 1)
		{
			currentElementValid = true;
		}
		
		if (currentElementValid !== true)
		{
			overallValid = false;
		}
		
		currentElementIndex = currentElementIndex + 1;
	}
	
	if (overallValid !== true)
	{
		throw new Error(aErrorString);
	}
	
	expect(overallValid).to.be.true;
}

function checkPaths(pFileObject, pPropertyArray, fName)
{
	var dInd = 0;
	var dName = "";
	var dQuote = "";
	var exportType = "";
	var exportExists = false;
	var canContinue = true;
		
	while (dInd >= 0 && dInd < pPropertyArray.length && canContinue === true)
	{
		dName = pPropertyArray[dInd];
		dQuote = writePathError(dName, fName);
		exportType = typeof pFileObject[dName];
		exportExists = false;
			
		if (pFileObject[dName] !== null && exportType !== 'undefined' && exportType === 'string' && pFileObject[dName].length >= 1)
		{
			exportExists = true;
		}
		else if (pFileObject[dName] !== null && exportType !== 'undefined' && exportType === 'string')
		{
			exportExists = false;
			throw new Error(dQuote + " cannot be empty");
		}
		else if (pFileObject[dName] !== null && exportType !== 'undefined')
		{
			exportExists = false;
			throw new Error(dQuote + " is not a string");
		}
		else
		{
			exportExists = false;
			throw new Error(dQuote + " does not exist");
		}
		
		if (exportExists !== true)
		{
			canContinue = false;
		}
			
		dInd = dInd + 1;
	}
	
	expect(canContinue).to.be.true;
}

function writeArrayError(arrayNameString)
{
	var messagePart1 = "The path definition array ";
	var messagePart2 = "'" + arrayNameString + "'";
	var messagePart3 = " is not valid. All elements must be strings.";
	
	var res = messagePart1 + messagePart2 + messagePart3;
	return res;
}

function writePathError(currentPropName, overallArrayName)
{
	var pNameQuote = "'" + currentPropName + "'";
	var aNameQuote = "'" + overallArrayName + "'";
	
	var messagePart1 = "The property ";
	var messagePart2 = pNameQuote + " in " + aNameQuote;
	
	var res = messagePart1 + messagePart2;
	return res;
}


function getCommonPathsFile(cpFileName)
{
	var pthFull = null;
	var pthFile = null;
	
	try
	{
		pthFull = relativeTarget + cpFileName;
		pthFile = require(pthFull);
	}
	catch(e)
	{
		pthFile = null;
	}
	
	return pthFile;
}

function getPropertyListFile()
{
	var propFile = null;
	
	try
	{
		propFile = require("../sub-items/path-lists");
	}
	catch(e)
	{
		propFile = null;
	}
	
	return propFile;
}

exports.callTestCommonPaths = testCommonPaths;