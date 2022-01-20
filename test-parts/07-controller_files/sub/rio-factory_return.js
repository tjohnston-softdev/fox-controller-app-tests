const chai = require("chai");
const expect = require("chai").expect;
const commonPaths = require("../../../app/paths/files/app-paths");
const commonFunctions = require(commonPaths.testCommon);


function checkFactoryReturnValid(factReturnObject)
{	
	commonFunctions.testFunction(factReturnObject.disableRio);
	commonFunctions.testFunction(factReturnObject.getRioDeviceProperties);
	commonFunctions.testFunction(factReturnObject.registerNodeCallback);
	commonFunctions.testFunction(factReturnObject.setOutputFromNode);
	commonFunctions.testFunction(factReturnObject.getCommsErrors);
}


module.exports =
{
	checkValid: checkFactoryReturnValid
};