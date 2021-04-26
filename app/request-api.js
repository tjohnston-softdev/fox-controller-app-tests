const foxHost = 'http://localhost:3000';
const apiRoot = '/api/';

const hStart = "<h1>";
const hEnd = "</h1>";

function writeApiUrl(apiFolder, apiPage)
{	
	var folderValid = checkWriteArgument(apiFolder);
	var pageValid = checkWriteArgument(apiPage);
	
	var rootPart = null;
	var pagePart = null;
	var combinedUrl = null;
	var apiUrlResult = null;
	
	if (folderValid === true && pageValid === true)
	{
		rootPart = foxHost + apiRoot;
		pagePart = apiFolder + '/' + apiPage;
		combinedUrl = rootPart + pagePart;
		apiUrlResult = combinedUrl.toLowerCase();
	}
	
	
	return apiUrlResult;
}


function readApiResponseArray(responseObject)
{
	var rText = null;
	var objectResult = null;
	
	try
	{
		rText = responseObject.body;
		objectResult = JSON.parse(rText);
	}
	catch(e)
	{
		objectResult = null;
		throw new Error(e.message);
	}
	
	return objectResult;
}

function readApiResponseObject(responseObject)
{
	var rText = null;
	var rType = null;
	var objectResult = null;
	
	try
	{
		rText = responseObject.body;
		rType = typeof rText;
		
		if (rType === 'object')
		{
			objectResult = rText;
		}
		else
		{
			objectResult = JSON.parse(rText);
		}
	}
	catch(e)
	{
		objectResult = null;
		throw new Error(e.message);
	}
	
	return objectResult;
}

function readApiResponseString(rObject)
{
	var rObjType = typeof rObject;
	var rBdyType = typeof rObject.body;
	var rText = null;
	
	if (rObject !== null && rObjType !== 'undefined' && rObjType === 'object' && rObject.body !== null && rBdyType === 'string' && rObject.body.length > 0)
	{
		rText = rObject.body;
	}
	else if (rObject !== null && rObjType !== 'undefined' && rObjType === 'object')
	{
		rText = null;
		throw new Error("HTTP Reply is empty");
	}
	else if (rObject !== null && rObjType !== 'undefined')
	{
		rText = null;
		throw new Error("Invalid Reply object type");
	}
	else
	{
		rText = null;
		throw new Error("HTTP Reply is null");
	}
	
	return rText;
}

function readApiResponseError(eObject)
{
	var errorBodyText = readApiResponseString(eObject);
	var errorBodyExtract = null;
	var rText = null;
	
	if (errorBodyText !== null)
	{
		errorBodyExtract = extractErrorText(errorBodyText);
		rText = validateExtractedErrorText(errorBodyExtract);
	}
	
	return rText;
}






function requestApplicationOnlineResult(aReply)
{
	var onlineResult = false;
	
	if (aReply != null && aReply.statusCode === 200)
	{
		onlineResult = true;
	}
	
	return onlineResult;
};

function apiRequestRefusedError(eMsg)
{
	var aMsg = "API request failed. - " + eMsg;
	throw new Error(aMsg);
}


function generateRandomIpAddress()
{
	var randomOne = getRandomIpNumber();
	var randomTwo = getRandomIpNumber();
	
	var ipNumbers = [192, 168, randomOne, randomTwo];
	var ipResultString = ipNumbers.join(".");
	
	return ipResultString;
}

function getRequestOptionsObject(oLink, oMethod, oBody)
{
	var methodUpper = readOptionMethodArgument(oMethod);
	var linkValid = checkOptionUrlArgument(oLink);
	var methodValid = checkOptionMethodArgument(methodUpper);
	var oRes = null;
	
	if (linkValid === true && methodValid === true)
	{
		oRes =
		{
			"url": oLink,
			"method": methodUpper,
			"body": oBody,
			"json": true
		};
	}
	
	return oRes;
}

function getDeleteOptionsObject(dLink, dPerm)
{
	var permType = typeof dPerm;
	var dRes = getRequestOptionsObject(dLink, 'DELETE', null);
	
	if (permType === 'boolean')
	{
		dRes["headers"] = {'Content-Type': 'text/plain', "delete-permanently": dPerm};
	}
	else
	{
		dRes = null;
		throw new Error("Invalid permanant flag. Must be True or False");
	}
	
	
	
	return dRes;
}




function extractErrorText(eBodyText)
{
	var startIndex = -1;
	var startExtract = -1;
	var endIndex = -1;
	var charDifference = -1;
	
	var extractedText = "";
	var extractValid = false;
	var errorFree = false;
	
	try
	{
		startIndex = eBodyText.indexOf(hStart);
		
		if (startIndex >= 0 && startIndex < eBodyText.length)
		{
			startExtract = startIndex + hStart.length;
		}
		
		if (startExtract > startIndex && startExtract < eBodyText.length)
		{
			endIndex = eBodyText.indexOf(hEnd, startExtract);
		}
		
		if (endIndex >= 0 && endIndex >= startExtract && endIndex < eBodyText.length)
		{
			charDifference = endIndex - startExtract;
		}
		
		if (charDifference >= 0)
		{
			extractedText = eBodyText.substr(startExtract, charDifference);
			extractValid = true;
		}
		
		errorFree = true;
	}
	catch(e)
	{
		extractedText = "";
		extractValid = false;
		errorFree = false;
	}
	
	
	var res = {"eText": extractedText, "eSuccess": extractValid, "eSafe": errorFree};
	return res;
}


function validateExtractedErrorText(vObject)
{
	var validTextResult = null;
	
	if (vObject.eSafe === true && vObject.eSuccess === true && vObject.eText.length > 0)
	{
		validTextResult = vObject.eText;
	}
	else if (vObject.eSafe === true && vObject.eSuccess === true)
	{
		validTextResult = null;
		throw new Error("HTTP Error Message is empty");
	}
	else if (vObject.eSafe === true)
	{
		validTextResult = null;
		throw new Error("Could not extract error message. HTTP reply body uses incorrect format");
	}
	else
	{
		validTextResult = null;
		throw new Error("Could not extract error message. HTTP reply body is an invalid type");
	}
	
	return validTextResult;
}



function getRandomIpNumber()
{
	var randomBase = Math.random();
	var randomMultiply = randomBase * 255;
	var randomResult = Math.round(randomMultiply);
	
	if (randomResult < 1)
	{
		randomResult = 1;
	}
	
	return randomResult;
}


function checkWriteArgument(wArg)
{
	var argType = typeof wArg;
	var argValid = false;
	
	if (wArg !== null && argType !== 'undefined' && argType === 'string' && wArg.length > 0)
	{
		argValid = true;
	}
	else if (wArg !== null && argType !== 'undefined' && argType === 'string')
	{
		argValid = false;
		throw new Error("URL Write argument strings cannot be empty");
	}
	else if (wArg !== null && argType !== 'undefined')
	{
		argValid = false;
		throw new Error("URL Write arguments must be strings");
	}
	else
	{
		argValid = false;
		throw new Error("URL Write arguments missing or null");
	}
	
	return argValid;
}


function checkOptionUrlArgument(oUrlArg)
{
	var urlValidationIndex = getUrlValidationIndex(oUrlArg);
	var urlType = typeof oUrlArg;
	var urlValid = false;
	
	if (oUrlArg !== null && urlType !== 'undefined' && urlType === 'string' && oUrlArg.length > 0 && urlValidationIndex === 0)
	{
		urlValid = true;
	}
	else if (oUrlArg !== null && urlType !== 'undefined' && urlType === 'string' && oUrlArg.length > 0)
	{
		urlValid = false;
		throw new Error("Invalid URL format. Must refer to localhost:3000");
	}
	else if (oUrlArg !== null && urlType !== 'undefined')
	{
		urlValid = false;
		throw new Error("URL must be a non-empty string");
	}
	else
	{
		urlValid = false;
		throw new Error("URL argument missing or null");
	}
	
	return urlValid;
}

function checkOptionMethodArgument(oMethodArg)
{
	var methodValid = false;
	
	if (oMethodArg === 'GET' || oMethodArg === 'POST' || oMethodArg === 'PUT' || oMethodArg === 'DELETE')
	{
		methodValid = true;
	}
	else
	{
		methodValid = false;
		throw new Error("Invalid request method. Must be GET, POST, PUT, or DELETE");
	}
	
	return methodValid;
}


function readOptionMethodArgument(oMethodArg)
{
	var readResult = oMethodArg;
	
	try
	{
		readResult = oMethodArg.toUpperCase();
	}
	catch(e)
	{
		readResult = oMethodArg;
	}
	
	return readResult;
}



function getUrlValidationIndex(ouArg)
{
	var urlTemplate = foxHost + apiRoot;
	var vIndex = -1;
	
	try
	{
		vIndex = ouArg.indexOf(urlTemplate);
	}
	catch(e)
	{
		vIndex = -1;
	}
	
	return vIndex;
}



exports.hostUrl = foxHost;
exports.callWriteApiUrl = writeApiUrl;
exports.callReadApiResponseArray = readApiResponseArray;
exports.callReadApiResponseObject = readApiResponseObject;
exports.callReadApiResponseString = readApiResponseString;
exports.callReadApiResponseError = readApiResponseError;
exports.getApplicationOnlineResult = requestApplicationOnlineResult;
exports.showApiRequestRefusedError = apiRequestRefusedError;
exports.generateIpAddress = generateRandomIpAddress;
exports.getRequestOptions = getRequestOptionsObject;
exports.getDeleteOptions = getDeleteOptionsObject;