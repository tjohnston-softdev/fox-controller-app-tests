const nullObjectError = "Must be an object: null";
const idMissingError = "ID property missing!";
const ipInvalidError = "ipAddress must be an IP address!";
const deviceNotObjectError = 'device must be an object';
const rioPropertiesUndefinedError = "Cannot read property 'getRioDeviceProperties' of undefined";
const keyArgError = "get() requires a key argument";
const missingModuleError = "Module doesn't exist! (disabled or deleted)";
const connectObjectError = "_storedDevice must be instance of StoredDevice";
const negativeError = "Must be an object: -1";


function writeKeyNotFoundErrorString(kText)
{
	var res = "Key not found in database [" + kText + "]";
	return res;
}


function writeRemoteIoPropertyErrorString(pName, rVal)
{
	var res = "";
	
	res += ".";
	res += pName;
	res += " = ";
	res += rVal;
	res += " is not supported!";
	
	return res;
}

function writeRemoteIoPropertySupportString(pName, rVal)
{
	var res = "";
	
	res += "Property .";
	res += pName;
	res += " = ";
	res += rVal;
	res += " is not supported!";
	
	return res;
}

function writeRemoteIoPropertyConstructString(pName, eType, rVal)
{
	var res = "";
	
	res += "Invalid type! ";
	res += pName;
	res += " must be '";
	res += eType;
	res += "' when got value ";
	res += rVal;
	res += " in StoredDevice during construction";
	
	return res;
}

function writeConnectDevicePropertyErrorString(pName, eType, rVal)
{	
	var res = "";
	
	res += "Invalid type! ";
	res += pName;
	res += " must be '";
	res += eType;
	res += "' when got value ";
	res += rVal;
	res += " in StoredDevice during setting";
	
	return res;
}


function writeSetDeviceOutputWrongError(pName, rVal)
{
	var res = "";
	
	res += "Wrong ";
	res += pName;
	res += " = ";
	res += rVal;
	
	return res;
}

function writeRegisterPrefixIndexError(badValue)
{
	var res = "Wrong ioPrefix or ioIndex in nodeConfig.ioSetId = " + badValue;
	return res;
}

function writeUnexpectedTokenErrorString(tokenValue, tokenPosition)
{
	var setToken = 0;
	var res = "";
	
	if (tokenPosition >= 0)
	{
		setToken = tokenPosition;
	}
	
	res += "Unexpected token ";
	res += tokenValue;
	res += " in JSON at position ";
	res += tokenPosition;
	
	return res;
}

function writeUnexpectedTokenErrorStringNull()
{
	var nullRes = writeUnexpectedTokenErrorString("n", 0);
	return nullRes;
}

function writeUnexpectedTokenErrorStringType()
{
	var typeRes = writeUnexpectedTokenErrorString("-", 0);
	return typeRes;
}



function writeTestString()
{
	var testValue = "Test";
	return testValue;
}


module.exports =
{
	nullObject: nullObjectError,
	idMissing: idMissingError,
	ipInvalid: ipInvalidError,
	deviceNotObject: deviceNotObjectError,
	rioPropertiesUndefined: rioPropertiesUndefinedError,
	keyArg: keyArgError,
	missingModule: missingModuleError,
	connectObject: connectObjectError,
	negativeNumberObject: negativeError,
	writeKeyNotFoundError: writeKeyNotFoundErrorString,
	writeRemoteIoPropertyError: writeRemoteIoPropertyErrorString,
	writeRemoteIoPropertySupport: writeRemoteIoPropertySupportString,
	writeRemoteIoPropertyConstruct: writeRemoteIoPropertyConstructString,
	writeConnectDeviceProperty: writeConnectDevicePropertyErrorString,
	writeSetDeviceOutputWrong: writeSetDeviceOutputWrongError,
	writeRegisterPrefixIndex: writeRegisterPrefixIndexError,
	writeUnexpectedTokenError: writeUnexpectedTokenErrorString,
	writeUnexpectedTokenErrorNull: writeUnexpectedTokenErrorStringNull,
	writeUnexpectedTokenErrorType: writeUnexpectedTokenErrorStringType,
	writeTest: writeTestString
};