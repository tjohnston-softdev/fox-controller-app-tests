const chai = require("chai");
const expect = require("chai").expect;


function checkPropSearchValues(aDef, pName, srcObject)
{
	var oInd = 0;
	var currentObject = null;
	var currentVal = null;
	
	while (oInd >= 0 && oInd < aDef.length && aDef !== null)
	{
		currentObject = aDef[oInd];
		currentVal = currentObject[pName];
		readCurrentObject(srcObject, currentVal);
		oInd = oInd + 1;
	}
}


function readCurrentObject(oDef, tgtVal)
{
	var valueArray = getObjectValues(oDef);
	var valueIndex = valueArray.indexOf(tgtVal);
	expect(valueIndex).to.be.within(0, valueArray.length - 1);
}


function getObjectValues(intendedObject)
{
	var retValue = null;
	var res = [];
	
	for (prop in intendedObject)
	{
		retValue = intendedObject[prop];
		res.push(retValue);
	}
	
	return res;
}


module.exports =
{
	testPropSearchValues: checkPropSearchValues
};