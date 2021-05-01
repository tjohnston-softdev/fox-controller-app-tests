const fs = require("fs");
const path = require("path");
const chai = require("chai");
const expect = require("chai").expect;
const commonPathsFox = require("../../../app/paths/files/fox-paths");
const listFile = require("../sub-items/path-lists");
const propertyListFox = listFile.getFoxPaths();


function testCommonPaths()
{
	describe("Common Paths", function()
	{
		it("Property Array Retrieved", function()
		{
			expect(propertyListFox).to.be.an("array");
			expect(propertyListFox).to.not.be.empty;
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
	
	while (elementIndex >= 0 && elementIndex < propertyListFox.length && allElementsValid === true)
	{
		currentValue = propertyListFox[elementIndex];
		currentType = typeof currentValue;
		currentValid = false;
		
		if (currentType === "string" && currentValue.length > 0)
		{
			currentValid = true;
		}
		else
		{
			allElementsValid = false;
			throw new Error("All 'propertyListFox' elements must be non-empty strings.");
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
	var currentType = "";
	var currentAbsolute = "";
	var currentExists = false;
	
	var allFilesExist = true;
	
	while (pathIndex >= 0 && pathIndex < propertyListFox.length && allFilesExist === true)
	{
		currentName = propertyListFox[pathIndex];
		currentValue = commonPathsFox[currentName];
		currentType = typeof currentValue;
		currentAbsolute = "";
		currentExists = false;
		
		if (currentType === "string" && currentValue.length > 0)
		{
			currentAbsolute = path.resolve(__dirname, currentValue);
			currentExists = fs.existsSync(currentAbsolute);
		}
		
		if (currentExists === true)
		{
			currentValid = true;
		}
		else
		{
			throw new Error("FOX file does not exist.");
		}
		
		pathIndex = pathIndex + 1;
	}
	
	expect(allFilesExist).to.be.true;
}


exports.callTestCommonPaths = testCommonPaths;