const timeOffsetSyntax = /^GMT\+(([0-1][0-9])|([2][0-3]))[0-5][0-9]$/i;
const driveLetterSyntax = /^[A-Z][:]([\\\/])?$/i;
const drivePathSyntax = /^\/dev\/([0-9a-zA-Z]*)$/i;
const filenameSyntax =  /^([^\\\/]+)$/;
const rioPrefixSyntax = /^(A|D|R)(I|O)-([0-9]+)$/i;


function validateExample(testString, testSyntax, allowEmpty)
{
	var res = checkRegEx(testString, testSyntax, allowEmpty, "Example");
	return res;
}

function validateTimezoneOffsetString(offsetString, allowEmpty)
{
	var res = checkRegEx(offsetString, timeOffsetSyntax, allowEmpty, "Timezone Offset");
	return res;
}

function validateDriveLetterString(dString, allowEmpty)
{
	var res = checkRegEx(dString, driveLetterSyntax, allowEmpty, "Drive Letter");
	return res;
}

function validateDrivePathString(dString, allowEmpty)
{
	var res = checkRegEx(dString, drivePathSyntax, allowEmpty, "Drive Path");
	return res;
}


function validateFilenameString(fnString, allowEmpty)
{
	var res = checkRegEx(fnString, filenameSyntax, allowEmpty, "File Name");
	return res;
}



function validateRioPrefixString(prefixString, allowEmpty)
{
	var res = checkRegEx(prefixString, rioPrefixSyntax, allowEmpty, "Remote IO Prefix");
	return res;
}

function validateRequirementPathString(reqPathString, allowEmpty)
{
	var res = checkRegEx(reqPathString, requirementPathSyntax, allowEmpty, "Requirement Path");
	return res;
}



function validateRioTextString(txtString, allowEmpty)
{
	var correctType = (typeof txtString === "string");
	var txtLower = txtString.toLowerCase();
	var wordArray = txtLower.split(" ");
	var res = false;
	
	if (correctType === true && txtString.length > 0)
	{
		txtLower = txtString.toLowerCase();
		wordArray = txtLower.split(" ");
		res = checkRioSplitArray(wordArray);
	}
	else if (correctType === true && allowEmpty === true)
	{
		res = true;
	}
	else if (correctType === true)
	{
		throwEmptyError("Remote IO Text");
	}
	else
	{
		throwTypeError();
	}
	
	return res;
}




function checkRioSplitArray(splitArr)
{
	var nameElement = "";
	var modeElement = "";
	var indexElement = "";
	var indexNumber = -1;
	var indexParsed = false;
	
	var firstValid = false;
	var secondValid = false;
	var thirdValid = false;
	
	var checkRes = false;
	
	if (splitArr.length >= 3)
	{
		nameElement = splitArr[0];
		modeElement = splitArr[1];
		indexElement = splitArr[2];
		indexNumber = parseInt(indexElement);
		indexParsed = Number.isInteger(indexNumber);
		
		firstValid = (nameElement === "analogue" || nameElement === "digital" || nameElement === "relay");
		secondValid = (modeElement === "input" || modeElement === "output");
		thirdValid = (indexParsed === true && indexNumber >= 0);
	}
	
	if (firstValid === true && secondValid === true && thirdValid === true)
	{
		checkRes = true;
	}
	else
	{
		throw new Error("Invalid Remote IO Text string.");
	}
	
	return checkRes;
}





function checkRegEx(subjectString, subjectSyntax, allowEmptyString, stringDesc)
{
	var correctType = (typeof subjectString === "string");
	var validationMet = false;
	
	if (correctType === true && subjectString.length > 0)
	{
		validationMet = testSyntax(subjectString, subjectSyntax, stringDesc);
	}
	else if (correctType === true && allowEmptyString === true)
	{
		validationMet = true;
	}
	else if (correctType === true)
	{
		throwEmptyError(stringDesc);
	}
	else
	{
		throwTypeError();
	}
	
	return validationMet;
}


function testSyntax(subStr, regObj, sDesc)
{
	var stringPassed = regObj.test(subStr);
	var flaggedText = "";
	
	if (stringPassed !== true)
	{
		flaggedText = "Invalid " + sDesc + " string.";
		throw new Error(flaggedText);
	}
	
	return stringPassed;
}


function throwEmptyError(sDesc)
{
	var flaggedText = sDesc + " string cannot be empty.";
	throw new Error(flaggedText);
}


function throwTypeError()
{
	throw new Error("Input must be a valid string.");
}



module.exports =
{
	validateExampleTest: validateExample,
	validateTimezoneOffset: validateTimezoneOffsetString,
	validateDriveLetter: validateDriveLetterString,
	validateDrivePath: validateDrivePathString,
	validateFilename: validateFilenameString,
	validateRioPrefix: validateRioPrefixString,
	validateRioText: validateRioTextString
};