const fs = require("fs");
const path = require("path");
const chai = require("chai");
const expect = require("chai").expect;
const foxPaths = require("../../../app/paths/files/fox-paths");
const propertyList = writeFoxPropertyNames();


function testCommonPaths()
{
	describe("Common Paths", function()
	{
		it("Property Array Retrieved", function()
		{
			expect(propertyList).to.be.an("array");
			expect(propertyList).to.not.be.empty;
		});
		
		it("Property Names Valid", function()
		{
			checkPropertyListArray();
		});
		
		it("FOX Files Exist", function()
		{
			checkPaths();
		});
		
	});
}



function checkPropertyListArray()
{
	var elementIndex = 0;
	var currentValue = null;
	var currentType = null;
	var currentValid = false;
	
	var allElementsValid = true;
	
	while (elementIndex >= 0 && elementIndex < propertyList.length && allElementsValid === true)
	{
		currentValue = propertyList[elementIndex];
		currentType = typeof currentValue;
		currentValid = false;
		
		if (currentType === "string" && currentValue.length > 0)
		{
			currentValid = true;
		}
		else
		{
			allElementsValid = false;
			throw new Error("All 'propertyList' elements must be non-empty strings.");
		}
		
		elementIndex = elementIndex + 1;
	}
	
	expect(allElementsValid).to.be.true;
}


function checkPaths()
{
	var pathIndex = 0;
	var currentName = "";
	var currentValue = "";
	var currentStringType = false;
	var currentAbsolute = "";
	var currentExists = false;
	
	var allFilesExist = true;
	
	while (pathIndex >= 0 && pathIndex < propertyList.length && allFilesExist === true)
	{
		currentName = propertyList[pathIndex];
		currentValue = foxPaths[currentName];
		currentStringType = handlePathType(currentName, currentValue);
		currentExists = false;
		
		if (currentStringType === true)
		{
			currentExists = handleFileExists(currentName, currentValue);
		}
		
		if (currentExists !== true)
		{
			allFilesExist = false;
		}
		
		pathIndex = pathIndex + 1;
	}
	
	expect(allFilesExist).to.be.true;
}



function handlePathType(pName, pValue)
{
	var pType = typeof pValue;
	var handleRes = false;
	var flaggedMessage = "";
	
	if (pType === "string" && pValue.length > 0)
	{
		handleRes = true;
	}
	else
	{
		handleRes = false;
		flaggedMessage = "'foxPaths." + pName + "' must be a non-empty string.";
		throw new Error(flaggedMessage);
	}
	
	return handleRes;
}



function handleFileExists(pName, relativePath)
{
	var absolutePath = path.resolve(__dirname, relativePath);
	var handleRes = fs.existsSync(absolutePath);
	var flaggedMessage = "";
	
	if (handleRes !== true)
	{
		flaggedMessage += "'foxPaths.";
		flaggedMessage += pName;
		flaggedMessage += "' path does not exist.\n";
		flaggedMessage += absolutePath;
		
		throw new Error(flaggedMessage);
	}
	
	return handleRes;
}


function writeFoxPropertyNames()
{
	var arrayResult = [];
	
	arrayResult.push("serviceMainFile", "settingsFile", "redSettingsFile", "rioSettingsFile");
	arrayResult.push("advantechFile", "moxaFile", "sonoffFile", "deviceSettingsFile");
	arrayResult.push("storedDeviceClassFile", "connectedDeviceClassFile", "rioFactoriesFile", "rioIndexFile");
	
	return arrayResult;
}

module.exports = testCommonPaths;