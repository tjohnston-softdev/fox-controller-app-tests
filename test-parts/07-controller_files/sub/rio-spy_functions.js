const chai = require("chai");
const expect = require("chai").expect;
const chaiThings = require('chai-things');

const commonPaths = require("../../../app/paths/files/app-paths");
const commonFunctions = require(commonPaths.testCommon);
const arrayFunctions = require(commonPaths.testArray);


function verifyRemoteIoList(listError, listCalled, callObject)
{
	var firstArg = null;
	
	expect(listCalled).to.be.true;
	expect(callObject).to.exist;
	
	arrayFunctions.testPopulated(callObject.args);
	firstArg = callObject.args[0];
	commonFunctions.testFunction(firstArg);
	
	commonFunctions.testFunction(callObject.callback);
					
	expect(callObject.exception).to.be.undefined;
	expect(listError).to.be.null;
}


function verifyDevice(deviceArg, deviceCalled, callObject)
{
	var firstArg = null;
	var secondArg = null;
	
	expect(deviceCalled).to.be.true;
	expect(callObject).to.exist;
	
	arrayFunctions.testPopulated(callObject.args);
	firstArg = callObject.args[0];
	secondArg = callObject.args[1];
	
	expect(firstArg).to.equal(deviceArg);
	commonFunctions.testFunction(secondArg);
	
	commonFunctions.testFunction(callObject.callback);
}


function verifyRegisterNode(regCalled, callObject, aMode, aObject)
{
	var firstArg = null;
	var secondArg = null;
	var thirdArg = null;
	
	expect(regCalled).to.be.true;
	expect(callObject).to.exist;
	
	arrayFunctions.testPopulated(callObject.args);
	
	firstArg = callObject.args[0];
	secondArg = callObject.args[1];
	thirdArg = callObject.args[2];
	
	expect(firstArg).to.equal(aMode);
	expect(secondArg).to.equal(aObject);
	commonFunctions.testFunction(thirdArg);
}



function verifySetDeviceOutput(setCalled, callObject, aID, aPrefix, aIndex, aToggle)
{
	expect(setCalled).to.be.true;
	expect(callObject).to.exist;
	
	arrayFunctions.testPopulated(callObject.args);
	expect(callObject.args).to.deep.equal([aID, aPrefix, aIndex, aToggle]);
	
	expect(callObject.returnValue).to.be.undefined;
}

function verifyDeleteDevice(deleteArg, flagArg, deleteCalled, callObject)
{
	var firstArg = null;
	var secondArg = null;
	var thirdArg = null;
	
	expect(deleteCalled).to.be.true;
	expect(callObject).to.exist;
	
	arrayFunctions.testPopulated(callObject.args);
	
	firstArg = callObject.args[0];
	secondArg = callObject.args[1];
	thirdArg = callObject.args[2];
	
	expect(firstArg).to.equal(deleteArg);
	expect(secondArg).to.equal(flagArg);
	commonFunctions.testFunction(thirdArg);
	
	commonFunctions.testFunction(callObject.callback);
}

module.exports =
{
	verifyRemoteIoListCalled: verifyRemoteIoList,
	verifyDeviceCalled: verifyDevice,
	verifyRegisterNodeCalled: verifyRegisterNode,
	verifySetDeviceOutputCalled: verifySetDeviceOutput,
	verifyDeleteDeviceCalled: verifyDeleteDevice
};