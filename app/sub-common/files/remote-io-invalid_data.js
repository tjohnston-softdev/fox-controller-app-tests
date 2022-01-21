const commonPaths = require("../../../app/paths/files/app-paths");
const commonFunctions = require(commonPaths.testCommon);
const commonErrorStringsFile = require(commonPaths.commonErrors);


function getInvalidDeviceTypeObject(originalDefinition)
{
	var valueErrMsg = commonErrorStringsFile.writeRemoteIoPropertyGeneral("deviceType", "Unknown");
	var typeErrMsg = commonErrorStringsFile.writeRemoteIoPropertyGeneral("deviceType", "-1");
	var propErrMsg = commonErrorStringsFile.writeRemoteIoPropertyGeneral("deviceType", "undefined");
	
	var valueInput = commonFunctions.cloneObject(originalDefinition);
	var typeInput = commonFunctions.cloneObject(originalDefinition);
	var propInput = commonFunctions.cloneObject(originalDefinition);
			
	valueInput.deviceType = "Unknown";
	typeInput.deviceType = -1;
	delete propInput.deviceType;
	
	var valueObject = getErrorObject(valueErrMsg, valueInput);
	var typeObject = getErrorObject(typeErrMsg, typeInput);
	var propObject = getErrorObject(propErrMsg, propInput);
	
	var res = getResultObject(null, valueObject, typeObject, propObject);
	return res;
}


function getInvalidManufacturerObject(originalDefinition, propNull)
{
	var propContent = "undefined";
	
	if (propNull === true)
	{
		propContent = "null";
	}
	
	var valueErrMsg = commonErrorStringsFile.writeRemoteIoPropertyGeneral("maker", "Unknown");
	var typeErrMsg = commonErrorStringsFile.writeRemoteIoPropertyGeneral("maker", "-1");
	var propErrMsg = commonErrorStringsFile.writeRemoteIoPropertyGeneral("maker", propContent);
			
	var valueInput = commonFunctions.cloneObject(originalDefinition);
	var typeInput = commonFunctions.cloneObject(originalDefinition);
	var propInput = commonFunctions.cloneObject(originalDefinition);
			
	valueInput.maker = "Unknown";
	typeInput.maker = -1;
	delete propInput.maker;
	
	var valueObject = getErrorObject(valueErrMsg, valueInput);
	var typeObject = getErrorObject(typeErrMsg, typeInput);
	var propObject = getErrorObject(propErrMsg, propInput);
	
	var res = getResultObject(null, valueObject, typeObject, propObject);
	return res;
}


function getInvalidModelObject(originalDefinition)
{
	var valueErrMsg = commonErrorStringsFile.writeRemoteIoPropertyGeneral("model", "Unknown");
	var typeErrMsg = commonErrorStringsFile.writeRemoteIoPropertyGeneral("model", "-1");
	var propErrMsg = commonErrorStringsFile.writeRemoteIoPropertyGeneral("model", "undefined");
			
	var valueInput = commonFunctions.cloneObject(originalDefinition);
	var typeInput = commonFunctions.cloneObject(originalDefinition);
	var propInput = commonFunctions.cloneObject(originalDefinition);
			
	valueInput.model = "Unknown";
	typeInput.model = -1;
	delete propInput.model;
	
	var valueObject = getErrorObject(valueErrMsg, valueInput);
	var typeObject = getErrorObject(typeErrMsg, typeInput);
	var propObject = getErrorObject(propErrMsg, propInput);
	
	var res = getResultObject(null, valueObject, typeObject, propObject);
	return res;
}


function getInvalidIPAddressObject(originalDefinition)
{			
	var formatInput = commonFunctions.cloneObject(originalDefinition);
	var valueInput = commonFunctions.cloneObject(originalDefinition);
	var typeInput = commonFunctions.cloneObject(originalDefinition);
	var propInput = commonFunctions.cloneObject(originalDefinition);
			
	formatInput.ipAddress = "192.168.321.456";
	valueInput.ipAddress = "Unknown";
	typeInput.ipAddress = -1;
	delete propInput.ipAddress;
	
	var formatObject = getErrorObject(commonErrorStringsFile.ipInvalid, formatInput);
	var valueObject = getErrorObject(commonErrorStringsFile.ipInvalid, valueInput);
	var typeObject = getErrorObject(commonErrorStringsFile.ipInvalid, typeInput);
	var propObject = getErrorObject(commonErrorStringsFile.ipInvalid, propInput);
	
	var res = getResultObject(formatObject, valueObject, typeObject, propObject);
	return res;
}


function getInvalidMacAddressObject(originalDefinition)
{
	var typeErrMsg = commonErrorStringsFile.writeRemoteIoPropertyConstruct("macAddress", "string", "-1");
	var propErrMsg = commonErrorStringsFile.writeRemoteIoPropertyConstruct("macAddress", "string", "undefined");
	
	var typeInput = commonFunctions.cloneObject(originalDefinition);
	var propInput = commonFunctions.cloneObject(originalDefinition);
	
	typeInput.macAddress = -1;
	delete propInput.macAddress;
	
	var typeObject = getErrorObject(typeErrMsg, typeInput);
	var propObject = getErrorObject(propErrMsg, propInput);
	
	var res = getResultObject(null, null, typeObject, propObject);
	return res;
}


function getInvalidIDStringObject(originalDefinition, typeErrMsg, propErrMsg)
{			
	var typeInput = commonFunctions.cloneObject(originalDefinition);
	var propInput = commonFunctions.cloneObject(originalDefinition);
			
	typeInput.id = -1;
	delete propInput.id;
	
	var typeObject = getErrorObject(typeErrMsg, typeInput);
	var propObject = getErrorObject(propErrMsg, propInput);
	
	var res = getResultObject(null, null, typeObject, propObject);
	return res;
}


function getInvalidNameStringObject(originalDefinition)
{
	var typeErrMsg = commonErrorStringsFile.writeRemoteIoPropertyConstruct("name", "string", "-1");
	var propErrMsg = commonErrorStringsFile.writeRemoteIoPropertyConstruct("name", "string", "undefined");
			
	var typeInput = commonFunctions.cloneObject(originalDefinition);
	var propInput = commonFunctions.cloneObject(originalDefinition);
			
	typeInput.name = -1;
	delete propInput.name;
	
	var typeObject = getErrorObject(typeErrMsg, typeInput);
	var propObject = getErrorObject(propErrMsg, propInput);
	
	var res = getResultObject(null, null, typeObject, propObject);
	return res;
}


function getInvalidEnabledFlagObject(originalDefinition)
{
	var typeErrMsg = commonErrorStringsFile.writeRemoteIoPropertyConstruct("isEnabled", "boolean", "-1");
	var propErrMsg = commonErrorStringsFile.writeRemoteIoPropertyConstruct("isEnabled", "boolean", "undefined");
			
	var typeInput = commonFunctions.cloneObject(originalDefinition);
	var propInput = commonFunctions.cloneObject(originalDefinition);
			
	typeInput.isEnabled = -1;
	delete propInput.isEnabled;
	
	var typeObject = getErrorObject(typeErrMsg, typeInput);
	var propObject = getErrorObject(propErrMsg, propInput);
	
	var res = getResultObject(null, null, typeObject, propObject);
	return res;
}


function getInvalidIDStringObjectFactory(origDef)
{
	var typeErrorMessage = commonErrorStringsFile.writeRemoteIoPropertyConstruct("id", "string", "-1");
	var propErrorMessage = commonErrorStringsFile.writeRemoteIoPropertyConstruct("id", "string", "undefined");
	
	var resultFull = getInvalidIDStringObject(origDef, typeErrorMessage, propErrorMessage);
	return resultFull;
}


function getInvalidIDStringObjectModify(origDef)
{
	var missingStr = commonErrorStringsFile.idMissing;
	var resultFull = getInvalidIDStringObject(origDef, missingStr, missingStr);
	return resultFull;
}




function getErrorObject(argError, argObject)
{
	var combineResult = {"errorMessage": argError, "jsonObject": argObject};
	return combineResult;
}


function getResultObject(formatErr, valueErr, typeErr, propErr)
{
	var resObj = {};
	
	resObj["formatCase"] = formatErr;
	resObj["valueCase"] = typeErr;
	resObj["typeCase"] = typeErr;
	resObj["propCase"] = propErr;
	
	return resObj;
}



module.exports =
{
	getDeviceType: getInvalidDeviceTypeObject,
	getManufacturer: getInvalidManufacturerObject,
	getModel: getInvalidModelObject,
	getIpAddress: getInvalidIPAddressObject,
	getMacAddress: getInvalidMacAddressObject,
	getId: getInvalidIDStringObject,
	getName: getInvalidNameStringObject,
	getEnabled: getInvalidEnabledFlagObject,
	getIdFactory: getInvalidIDStringObjectFactory,
	getIdModify: getInvalidIDStringObjectModify,
	getError: getErrorObject
};