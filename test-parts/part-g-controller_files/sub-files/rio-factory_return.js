const chai = require("chai");
const expect = require("chai").expect;
const commonPaths = require("../../../app/paths/files/app-paths");
const commonFunctionsFile = require(commonPaths.testCommon);
const objectFunctions = require(commonPaths.testObject);


function checkFactoryReturnValid(factReturnObject)
{
	objectFunctions.testPropExists(factReturnObject, 'disableRio');
	objectFunctions.testPropExists(factReturnObject, 'getRioDeviceProperties');
	objectFunctions.testPropExists(factReturnObject, 'registerNodeCallback');
	objectFunctions.testPropExists(factReturnObject, 'setOutputFromNode');
	objectFunctions.testPropExists(factReturnObject, 'getCommsErrors');
			
	objectFunctions.testPropType(factReturnObject, 'disableRio', 'function');
	objectFunctions.testPropType(factReturnObject, 'getRioDeviceProperties', 'function');
	objectFunctions.testPropType(factReturnObject, 'registerNodeCallback', 'function');
	objectFunctions.testPropType(factReturnObject, 'setOutputFromNode', 'function');
	objectFunctions.testPropType(factReturnObject, 'getCommsErrors', 'function');
}


module.exports =
{
	checkValid: checkFactoryReturnValid
};