const chai = require("chai");
const expect = require("chai").expect;

function checkPopulated(arrDef)
{
	expect(arrDef).to.be.an('array');
	expect(arrDef).to.not.be.empty;
}

function checkEmpty(arrDef)
{
	expect(arrDef).to.be.an('array');
	expect(arrDef).to.be.empty;
}


function checkDynamic(arrDef, lengthFlag)
{
	if (lengthFlag > 0)
	{
		expect(arrDef).to.be.an('array').that.is.not.empty;
	}
	else if (lengthFlag < 0)
	{
		expect(arrDef).to.be.an('array').that.is.empty;
	}
	else
	{
		expect(arrDef).to.be.an('array');
	}
}


function checkAllType(arrDef, eType)
{
	var objectInd = 0;
	var currentObject = null;
	
	for (objectInd = 0; objectInd < arrDef.length; objectInd = objectInd + 1)
	{
		currentObject = arrDef[objectInd];
		expect(currentObject).to.be.an(eType);
		objectInd = objectInd + 1;
	}
	
}


module.exports =
{
	testPopulated: checkPopulated,
	testEmpty: checkEmpty,
	testDynamic: checkDynamic,
	testAllType: checkAllType
};