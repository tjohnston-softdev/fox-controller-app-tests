const chai = require("chai");
const expect = require("chai").expect;
const commonPaths = require("../../../app/paths/files/app-paths");
const commonFunctionsFile = require(commonPaths.testCommon);


function checkFactoryReturnValid(factReturnObject)
{
	commonFunctionsFile.testObjectPropertyDefinition(factReturnObject, 'disableRio');
	commonFunctionsFile.testObjectPropertyDefinition(factReturnObject, 'getRioDeviceProperties');
	commonFunctionsFile.testObjectPropertyDefinition(factReturnObject, 'registerNodeCallback');
	commonFunctionsFile.testObjectPropertyDefinition(factReturnObject, 'setOutputFromNode');
	commonFunctionsFile.testObjectPropertyDefinition(factReturnObject, 'getCommsErrors');
			
	commonFunctionsFile.testObjectPropertyContent(factReturnObject, 'disableRio', 'function');
	commonFunctionsFile.testObjectPropertyContent(factReturnObject, 'getRioDeviceProperties', 'function');
	commonFunctionsFile.testObjectPropertyContent(factReturnObject, 'registerNodeCallback', 'function');
	commonFunctionsFile.testObjectPropertyContent(factReturnObject, 'setOutputFromNode', 'function');
	commonFunctionsFile.testObjectPropertyContent(factReturnObject, 'getCommsErrors', 'function');
}


module.exports =
{
	checkFactoryReturn: checkFactoryReturnValid
};