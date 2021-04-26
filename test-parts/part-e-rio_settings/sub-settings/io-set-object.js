function getIoSetObject()
{
	var validString = null;
	var invalidString = null;
	var splitResult = null;
	var validCodeParse = null;
	var validIndexParse = null;
	var errType = null;
	var errNull = null;
	var oRes = null;
	
	try
	{
		validString = 'RO-67';
		invalidString = 'UNKNOWN-X';
	
		splitResult = validString.split('-');
		validCodeParse = splitResult[0];
		validIndexParse = Number.parseInt(splitResult[1]);
		
		errType = "ioSetId.split is not a function"
		errNull = "Cannot read property 'split' of null";
		
		oRes = {"valid": validString, "invalid": invalidString, "code": validCodeParse, "index": validIndexParse, "eType": errType, "eNull": errNull};
	}
	catch(e)
	{
		oRes = null;
	}
	
	return oRes;
}

exports.callGetIoSetObject = getIoSetObject;