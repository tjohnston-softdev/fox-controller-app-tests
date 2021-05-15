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
		apiUrlResult += foxHost;
		apiUrlResult += apiRoot;
		apiUrlResult += vFolder;
		apiUrlResult += "/";
		apiUrlResult += vPage;
		
		apiUrlResult = apiUrlResult.toLowerCase();
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
	var bodyType = null;
	var objectResult = null;
	
	try
	{
		bodyType = typeof responseObject.body;
		
		if (responseObject.body !== undefined && responseObject.body !== null && bodyType === "object")
		{
			objectResult = responseObject.body;
		}
		else
		{
			objectResult = JSON.parse(responseObject.body);
		}
	}
	catch(e)
	{
		objectResult = null;
		throw new Error(e.message);
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



function requestApplicationOnlineResult(aReply)
{
	var onlineResult = false;
	
	if (aReply != null && aReply.statusCode === 200)
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
	catch(e)
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
		validTextResult = vObject.eText;
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
	var randomResult = Math.round(randomBase);
	
	if (randomResult < 1)
	{
		randomResult = 1;
	}
	
	return randomResult;
}


function checkWriteArgument(argValue)
{
	var argType = typeof argValue;
	var argValid = false;
	
	if (argValue !== undefined && argValue !== null && argType === "string" && argValue.length > 0)
	{
		argValid = true;
	}
	else if (argValue !== undefined && argValue !== null && argType === "string")
	{
		argValid = false;
		throw new Error("URL Write argument strings cannot be empty");
	}
	else if (argValue !== undefined && argValue !== null)
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



function getUrlValidationIndex(ouArg)
{
	var urlTemplate = "";
	var vIndex = -1;
	
	try
	{
		urlTemplate = foxHost + apiRoot;
		vIndex = ouArg.indexOf(urlTemplate);
	}
	catch(e)
	{
		vIndex = -1;
	}
	
	return vIndex;
}



module.exports =
{
	hostUrl: foxHost,
	callWriteApiUrl: writeApiUrl,
	callReadApiResponseArray: readApiResponseArray,
	callReadApiResponseObject: readApiResponseObject,
	callReadApiResponseError: readApiResponseError,
	callValidateApiResponse: validateApiResponse,
	getApplicationOnlineResult: requestApplicationOnlineResult,
	showApiRequestRefusedError: apiRequestRefusedError,
	generateIpAddress: generateRandomIpAddress,
	getDeleteOptions: getDeleteOptionsObject
};