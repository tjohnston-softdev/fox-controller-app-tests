const chai = require("chai");
const expect = require("chai").expect;
const chaiThings = require('chai-things');
chai.use(chaiThings);

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


function checkAllPropExists(aDef, pName)
{
	expect(aDef).to.all.have.property(pName);
}


function checkAllPropType(aDef, pName, pType)
{
	var oInd = 0;
	var currentObject = null;
	var currentVal = null;
	
	while (oInd >= 0 && oInd < aDef.length && aDef != null)
	{
		currentObject = aDef[oInd];
		currentVal = currentObject[pName];
		expect(currentVal).to.be.a(pType).and.is.not.null.and.is.not.undefined;
		oInd = oInd + 1;
	}
}

function checkAllPropAbsent(aDef, pName)
{
	var arrayElementInd = 0;
	var currentElementObject = null;
	
	while (arrayElementInd >= 0 && arrayElementInd < aDef.length && aDef !== null)
	{
		currentElementObject = aDef[arrayElementInd];
		expect(currentElementObject).to.not.have.property(pName);
		arrayElementInd = arrayElementInd + 1;
	}
}


function checkAllStringRequired(aDef, pName)
{
	var oInd = 0;
	var currentObject = null;
	var currentVal = null;
	
	for (oInd = 0; oInd < aDef.length; oInd = oInd + 1)
	{
		currentObject = aDef[oInd];
		currentVal = currentObject[pName];
		
		expect(currentVal).to.be.a('string');
		expect(currentVal.length).to.be.at.least(1);
		
		oInd = oInd + 1;
	}
}


module.exports =
{
	testPopulated: checkPopulated,
	testEmpty: checkEmpty,
	testDynamic: checkDynamic,
	testAllType: checkAllType,
	testAllPropExists: checkAllPropExists,
	testAllPropType: checkAllPropType,
	testAllPropAbsent: checkAllPropAbsent,
	testAllStringRequired: checkAllStringRequired
};