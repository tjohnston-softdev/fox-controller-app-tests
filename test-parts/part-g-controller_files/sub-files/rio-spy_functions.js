const chai = require("chai");
const expect = require("chai").expect;
const chaiThings = require('chai-things');

const commonPaths = require("../../../app/paths/files/app-paths");
const commonFunctionsFile = require(commonPaths.testCommon);
const arrayFunctions = require(commonPaths.testArray);


function verifyRemoteIoList(listError, listCalled, callObject)
{
	expect(listCalled).to.be.true;
	commonFunctionsFile.testPresent(callObject);
		
	commonFunctionsFile.testPresent(callObject.args);
	arrayFunctions.testPopulated(callObject.args);
	commonFunctionsFile.testPresent(callObject.args[0]);
	expect(callObject.args[0]).to.be.a("function");
	
	commonFunctionsFile.testPresent(callObject.callback);
	expect(callObject.callback).to.be.a("function");
					
	expect(callObject.exception).to.be.undefined;
	expect(listError).to.be.null;
}


function verifyDevice(deviceArg, deviceCalled, callObject)
{
	expect(deviceCalled).to.be.true;
	commonFunctionsFile.testPresent(callObject);
	
	commonFunctionsFile.testPresent(callObject.args);
	arrayFunctions.testPopulated(callObject.args);
	
	expect(callObject.args[0]).to.equal(deviceArg);
	
	commonFunctionsFile.testPresent(callObject.args[1]);
	expect(callObject.args[1]).to.be.a("function");
	
	commonFunctionsFile.testPresent(callObject.callback);
	expect(callObject.callback).to.be.a("function");
}


function verifyRegisterNode(regCalled, callObject, aMode, aObject)
{
	expect(regCalled).to.be.true;
	commonFunctionsFile.testPresent(callObject);
	
	commonFunctionsFile.testPresent(callObject.args);
	arrayFunctions.testPopulated(callObject.args);
	
	expect(callObject.args[0]).to.equal(aMode);
	expect(callObject.args[1]).to.equal(aObject);
	
	commonFunctionsFile.testPresent(callObject.args[2]);
	expect(callObject.args[2]).to.be.a("function");
}



function verifySetDeviceOutput(setCalled, callObject, aID, aPrefix, aIndex, aToggle)
{
	expect(setCalled).to.be.true;
	commonFunctionsFile.testPresent(callObject);
	
	commonFunctionsFile.testPresent(callObject.args);
	arrayFunctions.testPopulated(callObject.args);
	expect(callObject.args).to.deep.equal([aID, aPrefix, aIndex, aToggle]);
	
	expect(callObject.returnValue).to.be.undefined;
}

function verifyDeleteDevice(deleteArg, flagArg, deleteCalled, callObject)
{
	expect(deleteCalled).to.be.true;
	commonFunctionsFile.testPresent(callObject);
	
	commonFunctionsFile.testPresent(callObject.args);
	arrayFunctions.testPopulated(callObject.args);
	
	expect(callObject.args[0]).to.equal(deleteArg);
	expect(callObject.args[1]).to.equal(flagArg);
	
	commonFunctionsFile.testPresent(callObject.args[2]);
	expect(callObject.args[2]).to.be.a("function");
	
	commonFunctionsFile.testPresent(callObject.callback);
	expect(callObject.callback).to.be.a("function");
}

module.exports =
{
	verifyRemoteIoListCalled: verifyRemoteIoList,
	verifyDeviceCalled: verifyDevice,
	verifyRegisterNodeCalled: verifyRegisterNode,
	verifySetDeviceOutputCalled: verifySetDeviceOutput,
	verifyDeleteDeviceCalled: verifyDeleteDevice
};