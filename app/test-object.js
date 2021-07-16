const chai = require("chai");
const expect = require("chai").expect;
const chaiThings = require('chai-things');
chai.use(chaiThings);

function checkAllPropsType(objDef, allType)
{
	var currentVal = null;
	
	for (currentProp in objDef)
	{
		currentVal = objDef[currentProp];
		expect(currentVal).to.not.be.undefined;
		expect(currentVal).to.not.be.null;
		expect(currentVal).to.be.an(allType);
	}
}

function checkMatchKV(objDef)
{
	var currentVal = null;
	
	for (currentKey in objDef)
	{
		currentVal = objDef[currentKey];
		expect(currentVal).to.not.be.undefined;
		expect(currentVal).to.not.be.null;
		expect(currentVal).to.equal(currentKey);
	}
}

function checkMatchKVInsensitive(objDef)
{
	var currentKey = null;
	var currentVal = null;
	
	for (currentProp in objDef)
	{
		currentKey = currentProp.toLowerCase();
		currentVal = objDef[currentProp].toLowerCase();
		
		expect(currentVal).to.not.be.undefined;
		expect(currentVal).to.not.be.null;
		expect(currentVal).to.equal(currentKey);
	}
	
}


function checkSameProps(oSrc, oTgt)
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

function checkSameValues(oSrc, oTgt, oProp)
{
	var srcVal = null;
	var tgtVal = null;
	
	expect(oSrc).to.have.property(oProp);
	expect(oTgt).to.have.property(oProp);
	
	srcVal = oSrc[oProp];
	tgtVal = oTgt[oProp];
	
	expect(srcVal).to.equal(tgtVal);
}


module.exports =
{
	testAllPropsType: checkAllPropsType,
	testMatchKV: checkMatchKV,
	testMatchKVInsensitive: checkMatchKVInsensitive,
	testSameProps: checkSameProps,
	testSameValues: checkSameValues
};