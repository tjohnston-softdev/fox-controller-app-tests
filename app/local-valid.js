const timeOffsetSyntax = /^GMT\+(([0-1][0-9])|([2][0-3]))[0-5][0-9]$/i;
const driveLetterSyntax = /^[A-Z][:]([\\\/])?$/i;
const drivePathSyntax = /^\/dev\/([0-9a-zA-Z]*)$/i;
const filenameSyntax =  /^([^\\\/]+)$/;
const rioPrefixSyntax = /^(A|D|R)(I|O)-([0-9]+)$/i;


function validateExample(testString, testSyntax, allowEmpty)
{
	var res = checkRegEx(testString, testSyntax, allowEmpty);
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
	
	if (validCheck === true)
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
	
	return checkRes;
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