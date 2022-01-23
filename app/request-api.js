const foxHost = 'http://localhost:3000';
const apiRoot = '/api/';

const hStart = "<h1>";
const hEnd = "</h1>";

function writeApiUrl(vFolder, vPage)
{	
	var folderValid = checkWriteArgument(vFolder);
	var pageValid = checkWriteArgument(vPage);
	var apiUrlResult = "";
	
	if (folderValid === true && pageValid === true)
	{
		apiUrlResult = [foxHost, apiRoot, vFolder, "/", vPage].join("");
		apiUrlResult = apiUrlResult.toLowerCase();
	}
	
	
	return apiUrlResult;
}


function readApiResponseArray(respObj)
{
	var rText = null;
	var objectResult = null;
	
	try
	{
		rText = respObj.body;
		objectResult = JSON.parse(rText);
	}
	catch(arrayErr)
	{
		objectResult = null;
		throw new Error(arrayErr.message);
	}
	
	return objectResult;
}

function readApiResponseObject(respObj)
{
	var bodyType = null;
	var objectResult = null;
	
	try
	{
		bodyType = typeof respObj.body;
		
		if (respObj.body !== undefined && respObj.body !== null && bodyType === "object")
		{
			objectResult = respObj.body;
		}
		else
		{
			objectResult = JSON.parse(respObj.body);
		}
	}
	catch(objectErr)
	{
		objectResult = null;
		throw new Error(objectErr.message);
	}
	
	return objectResult;
}


function readApiResponseError(eObject)
{
	var errorBodyExtract = extractErrorText(eObject.body);
	var rText = validateExtractedErrorText(errorBodyExtract);
	return rText;
}


function validateApiResponse(respObj)
{
	var extractObject = {};
	var flaggedMessage = "";
	var validationResult = false;
	
	if (respObj.statusCode === 200)
	{
		validationResult = true;
	}
	else
	{
		extractObject = extractErrorText(respObj.body);
		flaggedMessage = validateExtractedErrorText(extractObject);
		throw new Error(flaggedMessage);
	}
	
	
	return validationResult;
}



function requestApplicationOnlineResult(respObj)
{
	var onlineResult = false;
	
	if (respObj != null && respObj.statusCode === 200)
	{
		onlineResult = true;
	}
	
	return onlineResult;
};

function apiRequestRefusedError(vDesc)
{
	var flagMsg = "API request failed. - " + vDesc;
	throw new Error(flagMsg);
}


function generateRandomIpAddress()
{
	var randomOne = getRandomIpNumber();
	var randomTwo = getRandomIpNumber();
	
	var ipNumbers = [192, 168, randomOne, randomTwo];
	var ipResultString = ipNumbers.join(".");
	
	return ipResultString;
}

function getDeleteOptionsObject(permVal)
{
	var optionsRes = {};
	optionsRes["json"] = true;
	
	if (permVal === true || permVal === false)
	{
		optionsRes["headers"] = {};
		optionsRes.headers["content_type"] = "text/plain";
		optionsRes.headers["delete-permanently"] = permVal;
	}
	else
	{
		throw new Error("Invalid permanant flag. Must be True or False");
	}
	
	return optionsRes;
}


function extractErrorText(eBodyText)
{
	var startIndex = -1;
	var startExtract = -1;
	var endIndex = -1;
	var charDifference = -1;
	
	var res = {};
	
	res["extractedText"] = "";
	res["valid"] = false;
	res["errorFree"] = false;
	
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
			res.extractedText = eBodyText.substr(startExtract, charDifference);
			res.valid = true;
		}
		
		res.errorFree = true;
	}
	catch(extractErr)
	{
		res.extractedText = "";
		res.valid = false;
		res.errorFree = false;
	}
	
	return res;
}


function validateExtractedErrorText(vObject)
{
	var validTextResult = null;
	
	if (vObject.errorFree === true && vObject.valid === true && vObject.extractedText.length > 0)
	{
		validTextResult = vObject.extractedText;
	}
	else if (vObject.errorFree === true && vObject.valid === true)
	{
		validTextResult = null;
		throw new Error("HTTP Error Message is empty");
	}
	else if (vObject.errorFree === true)
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
	var randomBase = Math.random() * 255;
	var randomResult = Math.ceil(randomBase);
	return randomResult;
}


function checkWriteArgument(argValue)
{
	var argSet = (argValue !== undefined && argValue !== null);
	var argType = typeof argValue;
	var argValid = false;
	
	if (argSet === true && argType === "string" && argValue.length > 0)
	{
		argValid = true;
	}
	else if (argSet === true && argType === "string")
	{
		argValid = false;
		throw new Error("URL Write argument strings cannot be empty");
	}
	else if (argSet === true)
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



module.exports =
{
	hostUrl: foxHost,
	writeUrl: writeApiUrl,
	readResponseArray: readApiResponseArray,
	readResponseObject: readApiResponseObject,
	readResponseError: readApiResponseError,
	validateResponse: validateApiResponse,
	getOnlineResult: requestApplicationOnlineResult,
	showRefusedError: apiRequestRefusedError,
	generateIpAddress: generateRandomIpAddress,
	getDeleteOptions: getDeleteOptionsObject
};