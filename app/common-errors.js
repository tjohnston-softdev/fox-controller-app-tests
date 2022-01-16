const nullObjectError = "Must be an object: null";
const idMissingError = "ID property missing!";
const ipInvalidError = "ipAddress must be an IP address!";
const deviceNotObjectError = 'device must be an object';
const rioPropertiesUndefinedError = "Cannot read property 'getRioDeviceProperties' of undefined";
const keyArgError = "get() requires a key argument";
const missingModuleError = "Module doesn't exist! (disabled or deleted)";
const connectObjectError = "_storedDevice must be instance of StoredDevice";
const negativeError = "Must be an object: -1";


function writeKeyNotFoundErrorString(keyTxt)
{
	var res = "Key not found in database [" + keyTxt + "]";
	return res;
}


function writeRemoteIoPropertyErrorString(pName, rVal)
{
	var res = [".", pName, " = ", String(rVal), " is not supported!"].join("");
	return res;
}

function writeRemoteIoPropertySupportString(pName, rVal)
{
	var res = ["Property .", pName, " = ", String(rVal), " is not supported!"].join("");
	return res;
}

function writeRemoteIoPropertyConstructString(pName, eType, rVal)
{
	var res = "";
	
	res += ["Invalid type! ", pName].join("");
	res += [" must be '", eType, "' when got value ", String(rVal), " in "].join("");
	res += "StoredDevice during construction";
	
	return res;
}

function writeConnectDevicePropertyErrorString(pName, eType, rVal)
{	
	var res = "";
	
	res += ["Invalid type! ", pName].join("");
	res += [" must be '", eType, "' when got value ", String(rVal), " in "].join("");
	res += "StoredDevice during setting";
	
	return res;
}


function writeSetDeviceOutputWrongError(pName, rVal)
{
	var res = "";
	
	res += ["Wrong ", pName, " = "].join("");
	res += String(rVal);
	
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
	
	if (tokenPosition >= 0)
	{
		setToken = tokenPosition;
	}
	
	var res = ["Unexpected token ", String(tokenValue), " in JSON at position ", tokenPosition].join("");
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
	writeKeyNotFound: writeKeyNotFoundErrorString,
	writeRemoteIoPropertyGeneral: writeRemoteIoPropertyErrorString,
	writeRemoteIoPropertySupport: writeRemoteIoPropertySupportString,
	writeRemoteIoPropertyConstruct: writeRemoteIoPropertyConstructString,
	writeConnectDeviceProperty: writeConnectDevicePropertyErrorString,
	writeSetDeviceOutputWrong: writeSetDeviceOutputWrongError,
	writeRegisterPrefixIndex: writeRegisterPrefixIndexError,
	writeUnexpectedTokenGeneral: writeUnexpectedTokenErrorString,
	writeUnexpectedTokenNull: writeUnexpectedTokenErrorStringNull,
	writeUnexpectedTokenType: writeUnexpectedTokenErrorStringType,
	writeTest: writeTestString
};