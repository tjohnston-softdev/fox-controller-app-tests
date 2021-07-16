function parseDataTypeChar(subjectChar)
{
	var parseRes = "";
	
	if (subjectChar === "a")
	{
		parseRes = "analogue ";
	}
	else if (subjectChar === "d")
	{
		parseRes = "digital ";
	}
	else if (subjectChar === "r")
	{
		parseRes = "relay ";
	}
	else
	{
		parseRes = "";
	}
	
	return parseRes;
}


function parseDataModeChar(subjectChar)
{
	var parseRes = "";
	
	if (subjectChar === "i")
	{
		parseRes = "input ";
	}
	else if (subjectChar === "o")
	{
		parseRes = "output ";
	}
	else
	{
		parseRes = "";
	}
	
	return parseRes;
}


function parseIndexNumberChars(prefixObj)
{
	var parseRes = "";
	
	if (prefixObj.length > 3)
	{
		parseRes = prefixObj.substring(3);
	}
	
	return parseRes;
}



module.exports =
{
	parseDataType: parseDataTypeChar,
	parseDataMode: parseDataModeChar,
	parseIndexNumber: parseIndexNumberChars
};