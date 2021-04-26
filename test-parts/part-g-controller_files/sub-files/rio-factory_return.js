const chai = require("chai");
const expect = require("chai").expect;
const chaiThings = require('chai-things');
const sinon = require('sinon');

const commonPaths = require("../../../app/paths/files/app-paths");
const foxPath = require(commonPaths.foxRelativeFile);
const commonFunctionsFile = require(commonPaths.testCommonFull);
const commonErrorStringsFile = require(commonPaths.commonErrorsFile);
const commonJsonObjectsFile = require(commonPaths.commonObjectFile);


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

exports.checkFactoryReturn = checkFactoryReturnValid;