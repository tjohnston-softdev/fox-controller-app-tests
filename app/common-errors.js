const nullObjectError = "Must be an object: null";
const idMissingError = "ID property missing!";
const ipInvalidError = "ipAddress must be an IP address!";
const deviceNotObjectError = 'device must be an object';
const getPropertiesUndefinedError = "Cannot read property 'getRioDeviceProperties' of undefined";
const keyArgError = "get() requires a key argument";
const missingModuleError = "Module doesn't exist! (disabled or deleted)";
const connectObjectError = "_storedDevice must be instance of StoredDevice";
const negativeError = "Must be an object: -1";


function writeKeyNotFoundErrorString(kText)
{	
	var ep1 = "Key not found in database ";
	var ep2 = "[" + kText + "]";
	
	var res = ep1 + ep2;
	return res;
}


function writeRemoteIoPropertyErrorString(pName, rVal)
{
	var ep1 = "." + pName;
	var ep2 = " = " + rVal;
	var ep3 = " is not supported!";
	
	var res = ep1 + ep2 + ep3;
	return res;
}

function writeRemoteIoPropertySupportString(pName, rVal)
{
	var ep1 = "Property .";
	var ep2 = pName + " = " + rVal;
	var ep3 = " is not supported!";
	
	var res = ep1 + ep2 + ep3;
	return res;
}

function writeRemoteIoPropertyConstructString(pName, eType, rVal)
{
	var ep1 = "Invalid type! ";
	var ep2 = pName + " must be ";
	var ep3 = "'" + eType + "'";
	var ep4 = " when got value " + rVal;
	var ep5 = " in StoredDevice during construction";
	
	var res = ep1 + ep2 + ep3 + ep4 + ep5;
	return res;
}

function writeConnectDevicePropertyErrorString(pName, eType, rVal)
{
	var ep1 = "Invalid type! ";
	var ep2 = pName + " must be ";
	var ep3 = "'" + eType + "'";
	var ep4 = " when got value " + rVal;
	var ep5 = " in StoredDevice during setting";
	
	var res = ep1 + ep2 + ep3 + ep4 + ep5;
	return res;
}


function writeSetDeviceOutputWrongError(pName, rVal)
{
	var ep1 = "Wrong " + pName;
	var ep2 = "  = ";
	var ep3 = rVal;
	
	var res = ep1 + ep2 + ep3;
	return res;
}

function writeRegisterPrefixIndexError(badValue)
{
	var ep1 = "Wrong ioPrefix or ioIndex in nodeConfig.ioSetId";
	var ep2 = " = ";
	var ep3 = badValue;
	
	var res = ep1 + ep2 + ep3;
	return res;
}

function writeUnexpectedTokenErrorString(tokenValue, tokenPosition)
{
	var setToken = 0;
	
	if (tokenPosition >= 0)
	{
		setToken = tokenPosition;
	}
	
	var p1 = "Unexpected token " + tokenValue;
	var p2 = " in JSON at position " + tokenPosition;
	
	var res = p1 + p2;
	return res;
}

function writeUnexpectedTokenErrorStringNull()
{
	var nRes = writeUnexpectedTokenErrorString("n", 0);
	return nRes;
}

function writeUnexpectedTokenErrorStringType()
{
	var tRes = writeUnexpectedTokenErrorString("-", 0);
	return tRes;
}



function writeTestString()
{
	var tStr = "Test";
	return tStr;
}

exports.nullObject = nullObjectError;
exports.idMissing = idMissingError;
exports.ipInvalid = ipInvalidError;
exports.deviceNotObject = deviceNotObjectError;
exports.getPropertiesUndefined = getPropertiesUndefinedError;
exports.keyArg = keyArgError;
exports.missingModule = missingModuleError;
exports.connectObject = connectObjectError;
exports.negativeNumberObject = negativeError;
exports.writeKeyNotFoundError = writeKeyNotFoundErrorString;
exports.writeRemoteIoPropertyError = writeRemoteIoPropertyErrorString;
exports.writeRemoteIoPropertySupport = writeRemoteIoPropertySupportString;
exports.writeRemoteIoPropertyConstruct = writeRemoteIoPropertyConstructString;
exports.writeConnectDeviceProperty = writeConnectDevicePropertyErrorString;
exports.writeSetDeviceOutputWrong = writeSetDeviceOutputWrongError;
exports.writeRegisterPrefixIndex = writeRegisterPrefixIndexError;
exports.writeUnexpectedTokenError = writeUnexpectedTokenErrorString;
exports.writeUnexpectedTokenErrorNull = writeUnexpectedTokenErrorStringNull;
exports.writeUnexpectedTokenErrorType = writeUnexpectedTokenErrorStringType;
exports.writeTest = writeTestString;

