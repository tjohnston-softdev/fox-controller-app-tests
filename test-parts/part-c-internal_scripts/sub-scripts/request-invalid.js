const commonPaths = require("../../../app/paths/files/app-paths");
const commonFunctions = require(commonPaths.testCommon);
const requestFile = require(commonPaths.requestApi);


function runRequestUrlInvalid(folderArg, fileArg, eError)
{
	var comp = false;
	var msg = null;
	
	try
	{
		requestFile.writeUrl(folderArg, fileArg);
		comp = true;
	}
	catch(e)
	{
		comp = false;
		msg = e.message;
	}
	
	var invalidUrlRes = commonFunctions.prepareInvalidResult(comp, msg);
	commonFunctions.testInvalidResult(invalidUrlRes, eError);
}

function runReadResponseInvalidArray(invalidArg, eError)
{
	var comp = false;
	var msg = null;
	
	try
	{
		requestFile.readResponseArray(invalidArg);
		comp = true;
	}
	catch(e)
	{
		comp = false;
		msg = e.message;
	}
	
	var invalidArrayRes = commonFunctions.prepareInvalidResult(comp, msg);
	commonFunctions.testInvalidResult(invalidArrayRes, eError);
}

function runReadResponseInvalidObject(invalidArg, eError)
{
	var comp = false;
	var msg = null;
	
	try
	{
		requestFile.readResponseObject(invalidArg);
		comp = true;
	}
	catch(e)
	{
		comp = false;
		msg = e.message;
	}
	
	var invalidObjectRes = commonFunctions.prepareInvalidResult(comp, msg);
	commonFunctions.testInvalidResult(invalidObjectRes, eError);
}

function runReadResponseInvalidString(invalidArg, eError)
{
	var comp = false;
	var msg = null;
	
	try
	{
		requestFile.callReadApiResponseString(invalidArg);
		comp = true;
	}
	catch(e)
	{
		comp = false;
		msg = e.message;
	}
	
	var invalidStringRes = commonFunctions.prepareInvalidResult(comp, msg);
	commonFunctions.testInvalidResult(invalidStringRes, eError);
}


function runReadResponseInvalidError(invalidArg, eError)
{
	var comp = false;
	var msg = null;
	
	try
	{
		requestFile.readResponseError(invalidArg);
		comp = true;
	}
	catch(e)
	{
		comp = false;
		msg = e.message;
	}
	
	var invalidRes = commonFunctions.prepareInvalidResult(comp, msg);
	commonFunctions.testInvalidResult(invalidRes, eError);
}



function runValidateResponseInvalid(invalidArg, eError)
{
	var comp = false;
	var msg = null;
	
	try
	{
		requestFile.validateResponse(invalidArg);
		comp = true;
	}
	catch(e)
	{
		comp = false;
		msg = e.message;
	}
	
	var invalidRes = commonFunctions.prepareInvalidResult(comp, msg);
	commonFunctions.testInvalidResult(invalidRes, eError);
}



function runRefuseError(refuseArg)
{
	var supposedText = "API request failed. - " + refuseArg;
	var refComplete = false;
	var refMsg = "";
	
	try
	{
		requestFile.showRefusedError(refuseArg);
		refComplete = true;
	}
	catch(e)
	{
		refComplete = false;
		refMsg = e.message;
	}
	
	var reResult = commonFunctions.prepareInvalidResult(refComplete, refMsg);
	commonFunctions.testInvalidResult(reResult, supposedText);
}


function runOptionError(deleteArg, eError)
{
	var oComplete = false;
	var oMessage = "";
	
	try
	{
		requestFile.getDeleteOptions(deleteArg);
		oComplete = true;
	}
	catch(e)
	{
		oComplete = false;
		oMessage = e.message;
	}
	
	var oResult = commonFunctions.prepareInvalidResult(oComplete, oMessage);
	commonFunctions.testInvalidResult(oResult, eError);	
}



module.exports =
{
	runUrl: runRequestUrlInvalid,
	runResponseArray: runReadResponseInvalidArray,
	runResponseObject: runReadResponseInvalidObject,
	runResponseString: runReadResponseInvalidString,
	runResponseError: runReadResponseInvalidError,
	runValidate: runValidateResponseInvalid,
	runRefuse: runRefuseError,
	runOptions: runOptionError
};