const macSyntax = /^([0-9A-F]{2}[:-]){5}([0-9A-F]{2})$/i;
const timeOffsetSyntax = /^GMT\+(([0-1][0-9])|([2][0-3]))[0-5][0-9]$/i;
const driveLetterSyntax = /^[A-Z][:]([\\\/])?$/i;
const drivePathSyntax = /^\/dev\/([0-9a-zA-Z]*)$/i;
const ipSixSyntax = /^((?=.*::)(?!.*::.+::)(::)?([\dA-F]{1,4}:(:|\b)|){5}|([\dA-F]{1,4}:){6})((([\dA-F]{1,4}((?!\3)::|:\b|$))|(?!\2\3)){2}|(((2[0-4]|1\d|[1-9])?\d|25[0-5])\.?\b){4})$/i;
const filenameSyntax =  /^([^\\\/]+)$/;
const rioPrefixSyntax = /^(A|D|R)(I|O)-([0-9]+)$/i;
const requirementPathSyntax = /^(([.][\\\/])|(([.]{2}[\\\/])+))([^\\\/]+[\\\/])*([^\\\/]+)$/i;

function writeRequirementPathRegEx()
{	
	var resultObject = null;
	return resultObject;
}




function validateExample(testString, testSyntax, allowEmpty)
{
	var res = checkRegEx(testString, testSyntax, allowEmpty);
	return res;
}

function validateMacAddress(macString, allowEmpty)
{
	var res = checkRegEx(macString, macSyntax, allowEmpty);
	return res;
}

function validateTimezoneOffsetString(offsetString, allowEmpty)
{
	var res = checkRegEx(offsetString, timeOffsetSyntax, allowEmpty);
	return res;
}

function validateDriveLetterString(dString, allowEmpty)
{
	var res = checkRegEx(dString, driveLetterSyntax, allowEmpty);
	return res;
}

function validateDrivePathString(dString, allowEmpty)
{
	var res = checkRegEx(dString, drivePathSyntax, allowEmpty);
	return res;
}


function validateIpAddressSixString(ipString, allowEmpty)
{
	var sixValidation = checkRegEx(ipString, ipSixSyntax, allowEmpty);
	var res = false;
	
	if (sixValidation === true)
	{
		res = true;
	}
	else if (ipString === "::1")
	{
		res = true;
	}
	else
	{
		res = false;
	}
	
	return res;
}

function validateFilenameString(fnString, allowEmpty)
{
	var res = checkRegEx(fnString, filenameSyntax, allowEmpty);
	return res;
}



function validateRioPrefixString(prefixString, allowEmpty)
{
	var res = checkRegEx(prefixString, rioPrefixSyntax, allowEmpty);
	return res;
}

function validateRequirementPathString(reqPathString, allowEmpty)
{
	var res = checkRegEx(reqPathString, requirementPathSyntax, allowEmpty);
	return res;
}






function validateRioTextString(txtString, allowEmpty)
{
	var txtLower = txtString.toLowerCase();
	var wordArray = txtLower.split(" ");
	var validCheck = checkRioSplitArray(wordArray);
	var res = false;
	
	if (validCheck.first === true && validCheck.second === true && validCheck.third === true)
	{
		res = true;
	}
	else if (txtString === "" && allowEmpty === true)
	{
		res = true;
	}
	else
	{
		res = false;
	}
	
	return res;
}




function checkRioSplitArray(s)
{
	var indexValue = Math.pow(s[2], 1);
	
	var firstValid = false;
	var secondValid = false;
	var thirdValid = false;
	
	if (s[0] === "analogue" || s[0] === "digital" || s[0] === "relay")
	{
		firstValid = true;
	}
	
	if (s[1] === "input" || s[1] === "output")
	{
		secondValid = true;
	}
	
	if (indexValue >= 0)
	{
		thirdValid = true;
	}
	
	var checkResult = {"first": firstValid, "second": secondValid, "third": thirdValid};
	return checkResult;
	
}





function checkRegEx(subjectString, subjectSyntax, allowEmptyString)
{
	var validationMet = false;
	
	if (subjectString.length > 0)
	{
		validationMet = subjectSyntax.test(subjectString);
	}
	else if (subjectString === "" && allowEmptyString === true)
	{
		validationMet = true;
	}
	else
	{
		validationMet = false;
	}
	
	return validationMet;
}

exports.validateExampleTest = validateExample;
exports.validateMac = validateMacAddress;
exports.validateTimezoneOffset = validateTimezoneOffsetString;
exports.validateDriveLetter = validateDriveLetterString;
exports.validateDrivePath = validateDrivePathString;
exports.validateIpAddressSix = validateIpAddressSixString;
exports.validateFilename = validateFilenameString;
exports.validateRioPrefix = validateRioPrefixString;
exports.validateRequirementPath = validateRequirementPathString;
exports.validateRioText = validateRioTextString;