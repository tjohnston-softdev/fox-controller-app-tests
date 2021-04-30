const chai = require("chai");
const expect = require("chai").expect;
const chaiThings = require('chai-things');
chai.use(chaiThings);

function checkPlaceholder()
{
	expect(true).to.be.true;
}

function checkPresent(o)
{
	expect(o).to.not.be.undefined;
	expect(o).to.not.be.null;
}

function checkTrue(v)
{
	expect(v).to.be.true;
}

function checkFalse(v)
{
	expect(v).to.be.false
}

function checkAbove(givenNumber, tgtNumber)
{
	expect(givenNumber).to.be.above(tgtNumber);
}

function checkBelow(givenNumber, tgtNumber)
{
	expect(givenNumber).to.be.below(tgtNumber);
}

function checkLeast(givenNumber, tgtNumber)
{
	expect(givenNumber).to.be.at.least(tgtNumber);
}

function checkMost(givenNumber, tgtNumber)
{
	expect(givenNumber).to.be.at.most(tgtNumber);
}

function checkPositive(nVal)
{
	expect(nVal).to.be.above(0);
}

function checkNegative(nVal)
{
	expect(nVal).to.be.below(0);
}

function checkZero(nVal)
{
	expect(nVal).to.equal(0);
}

function checkZeroLeast(nVal)
{
	expect(nVal).to.be.at.least(0);
}

function checkBinary(nVal)
{
	expect(nVal).to.be.oneOf([0, 1]);
}


function checkPercent(percVal)
{
	expect(percVal).to.be.within(0.00, 100.00);
}

function checkWithin(nVal, nLower, nUpper)
{
	expect(nVal).to.be.within(nLower, nUpper);
}


function checkType(oDef, oType)
{
	expect(oDef).to.be.an(oType);
}

function checkArray(aDef)
{
	expect(aDef).to.be.an('array').that.is.not.empty;
}

function checkArrayNeutral(aDef)
{
	expect(aDef).to.be.an('array');
}

function checkArrayEmpty(aDef)
{
	expect(aDef).to.be.an('array');
	expect(aDef).to.be.empty;
}


function checkArrayDynamic(aDef, sFlag)
{
	if (sFlag > 0)
	{
		expect(aDef).to.be.an('array').that.is.not.empty;
	}
	else if (sFlag < 0)
	{
		expect(aDef).to.be.an('array').that.is.empty;
	}
	else
	{
		expect(aDef).to.be.an('array');
	}
}



function checkString(sDef)
{
	expect(sDef).to.be.a('string');
	expect(sDef.length).to.be.at.least(1);
}

function checkStringNeutral(sDef)
{
	expect(sDef).to.be.a('string');
}

function checkStringInclude(sDef, sIncl)
{
	expect(sDef).to.have.string(sIncl);
}

function checkStringStartsWith(sDef, sStart)
{
	var sFlag = sDef.startsWith(sStart);
	expect(sFlag).to.be.true;
}

function checkStringEndsWith(sDef, sEnd)
{
	var sFlag = sDef.endsWith(sEnd);
	expect(sFlag).to.be.true;
}


function checkAllElements(aDef, eType)
{
	var objectInd = 0;
	var currentObject = null;
	
	while (objectInd >= 0 && objectInd < aDef.length && aDef != null)
	{
		currentObject = aDef[objectInd];
		checkType(currentObject, eType);
		objectInd = objectInd + 1;
	}
	
}


function checkObjectAllPropertiesType(objDef, allType)
{
	for (currentProp in objDef)
	{
		expect(objDef[currentProp]).to.not.be.undefined;
		expect(objDef[currentProp]).to.not.be.null;
		expect(objDef[currentProp]).to.be.a(allType);
	}
}

function checkObjectMatchKV(objDef)
{
	var currentVal = null;
	
	for (currentKey in objDef)
	{
		expect(objDef[currentKey]).to.not.be.undefined;
		expect(objDef[currentKey]).to.not.be.null;
		currentVal = objDef[currentKey];
		expect(currentVal).to.equal(currentKey);
	}
}

function checkObjectMatchKVInsensitive(objDef)
{
	var currentKey = null;
	var currentVal = null;
	
	for (currentProp in objDef)
	{
		expect(objDef[currentProp]).to.not.be.undefined;
		expect(objDef[currentProp]).to.not.be.null;
		
		currentKey = currentProp.toLowerCase();
		currentVal = objDef[currentProp].toLowerCase();
		
		expect(currentVal).to.equal(currentKey);
	}
	
}

function checkBothObjectsSameProperties(oSrc, oTgt)
{
	var srcProps = getJsonObjectProperties(oSrc);
	var tgtProps = getJsonObjectProperties(oTgt);
	
	var tgtInd = 0;
	var tgtVal = null;
	
	for (tgtInd = 0; tgtInd < tgtProps.length; tgtInd = tgtInd + 1)
	{
		tgtVal = tgtProps[tgtInd];
		expect(srcProps).to.include(tgtVal);
	}
}

function checkBothObjectsHaveSamePropertyValue(oSrc, oTgt, oProp)
{
	expect(oSrc).to.have.property(oProp);
	expect(oTgt).to.have.property(oProp);
	expect(oSrc[oProp]).to.equal(oTgt[oProp]);
}

function checkObjectPropertyDefinition(oDef, pName)
{
	expect(oDef).to.have.property(pName);
}

function checkObjectPropertyContent(oDef, pName, pType)
{
	expect(oDef[pName]).to.be.a(pType).and.is.not.null.and.is.not.undefined;
}


function checkObjectPropertyAbsent(oDef, pName)
{
	expect(oDef).to.not.have.property(pName);
}


function checkObjectSearchValue(oDef, tgtVal)
{
	var valueArray = getJsonObjectValues(oDef);
	var valueIndex = valueArray.indexOf(tgtVal);
	
	expect(valueIndex).to.be.at.least(0);
	expect(valueIndex).to.be.below(valueArray.length);
}

function checkPropertySearchValues(aDef, pName, srcObject)
{
	var oInd = 0;
	var currentObject = null;
	var currentVal = null;
	
	while (oInd >= 0 && oInd < aDef.length && aDef !== null)
	{
		currentObject = aDef[oInd];
		currentVal = currentObject[pName];
		checkObjectSearchValue(srcObject, currentVal);
		oInd = oInd + 1;
	}
}


function checkPropertyDefinitions(aDef, pName)
{
	expect(aDef).to.all.have.property(pName);
}

function checkPropertyContents(aDef, pName, pType)
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

function checkPropertyAbsentDefinitions(aDef, pName)
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


function checkPropertyStringRequiredObject(oDef, pRequired)
{
	var currentVal = oDef[pRequired];
	
	expect(currentVal).to.not.be.undefined;
	expect(currentVal).to.not.be.null;
	expect(currentVal).to.be.a('string');
	expect(currentVal.length).to.be.at.least(1);
	
}

function checkPropertyStringRequiredArray(aDef, pName)
{
	var oInd = 0;
	var currentObject = null;
	
	while (oInd >= 0 && oInd < aDef.length && aDef != null)
	{
		currentObject = aDef[oInd];
		checkPropertyStringRequiredObject(currentObject, pName);
		oInd = oInd + 1;
	}
}

function checkInvalidFunctionResult(rArray, expMsg)
{
	expect(rArray[0]).to.not.be.undefined;
	expect(rArray[0]).to.not.be.null;
	expect(rArray[0]).to.be.a('boolean');
	expect(rArray[0]).to.be.false;
	
	expect(rArray[1]).to.not.be.undefined;
	expect(rArray[1]).to.not.be.null;
	expect(rArray[1]).to.equal(expMsg);
}

function checkEcho(echoObject)
{
	console.log(echoObject);
	expect(true).to.be.true;
}

function cloneJsonObject(originalObject)
{
	var originalDefinition = JSON.stringify(originalObject);
	var newObject = JSON.parse(originalDefinition);
	return newObject;
}

function getJsonObjectProperties(intendedObject)
{
	var res = [];
	
	for (prop in intendedObject)
	{
		res.push(prop);
	}
	
	return res;
}

function getJsonObjectValues(intendedObject)
{
	var res = [];
	
	for (prop in intendedObject)
	{
		res.push(intendedObject[prop]);
	}
	
	return res;
}

function outputCallbackMessage(cHeader, errorArg, objectArg)
{
	console.log("");
	console.log(cHeader);
	console.log("Error: " + errorArg);
	console.log("Object: " + objectArg);
}

function stringToNumber(numberString)
{
	var convertedNumber = Math.pow(numberString, 1);
	return convertedNumber;
}


exports.testPlaceholder = checkPlaceholder;
exports.testPresent = checkPresent;
exports.testTrue = checkTrue;
exports.testFalse = checkFalse;
exports.testAbove = checkAbove;
exports.testBelow = checkBelow;
exports.testLeast = checkLeast;
exports.testMost = checkMost;
exports.testPositive = checkPositive;
exports.testNegative = checkNegative;
exports.testZero = checkZero;
exports.testZeroLeast = checkZeroLeast;
exports.testBinary = checkBinary;
exports.testPercent = checkPercent;
exports.testWithin = checkWithin;
exports.testType = checkType;
exports.testArray = checkArray;
exports.testArrayNeutral = checkArrayNeutral;
exports.testArrayEmpty = checkArrayEmpty;
exports.testArrayDynamic = checkArrayDynamic;
exports.testString = checkString;
exports.testStringNeutral = checkStringNeutral;
exports.testStringInclude = checkStringInclude;
exports.testStringStartsWith = checkStringStartsWith;
exports.testStringEndsWith = checkStringEndsWith;
exports.testAllElements = checkAllElements;
exports.testObjectAllPropertiesType = checkObjectAllPropertiesType
exports.testObjectMatchKV = checkObjectMatchKV;
exports.testObjectMatchKVInsensitive = checkObjectMatchKVInsensitive;
exports.testBothObjectsSameProperties = checkBothObjectsSameProperties;
exports.testBothObjectsHaveSamePropertyValue = checkBothObjectsHaveSamePropertyValue;
exports.testObjectPropertyDefinition = checkObjectPropertyDefinition;
exports.testObjectPropertyContent = checkObjectPropertyContent;
exports.testObjectPropertyAbsent = checkObjectPropertyAbsent;
exports.testObjectSearchValue = checkObjectSearchValue;
exports.testPropertySearchValues = checkPropertySearchValues;
exports.testPropertyDefinitions = checkPropertyDefinitions;
exports.testPropertyContents = checkPropertyContents;
exports.testPropertyAbsentDefinitions = checkPropertyAbsentDefinitions;
exports.testPropertyStringRequiredObject = checkPropertyStringRequiredObject;
exports.testPropertyStringRequiredArray = checkPropertyStringRequiredArray;
exports.testInvalidFunctionResult = checkInvalidFunctionResult;
exports.testEcho = checkEcho;
exports.cloneObject = cloneJsonObject;
exports.getObjectProperties = getJsonObjectProperties;
exports.getObjectValues = getJsonObjectValues;
exports.displayCallbackMessage = outputCallbackMessage;
exports.convertStringToNumber = stringToNumber;