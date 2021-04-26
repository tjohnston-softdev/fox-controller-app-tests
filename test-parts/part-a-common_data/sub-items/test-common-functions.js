function getCommonFunctionsListArray()
{
	var listRes = [];
	
	listRes.push('testPlaceholder');
	listRes.push('testPresent');
	listRes.push('testNull');
	listRes.push('testTrue');
	listRes.push('testFalse');
	listRes.push('testAbove');
	listRes.push('testBelow');
	listRes.push('testLeast');
	listRes.push('testMost');
	listRes.push('testPositive');
	listRes.push('testNegative');
	listRes.push('testZero');
	listRes.push('testZeroLeast');
	listRes.push('testBinary');
	listRes.push('testPercent');
	listRes.push('testWithin');
	listRes.push('testType');
	listRes.push('testArray');
	listRes.push('testArrayNeutral');
	listRes.push('testArrayEmpty');
	listRes.push('testArrayDynamic');
	listRes.push('testString');
	listRes.push('testStringNeutral');
	listRes.push('testStringInclude');
	listRes.push('testStringStartsWith');
	listRes.push('testStringEndsWith');
	listRes.push('testAllElements');
	listRes.push('testObjectAllPropertiesType');
	listRes.push('testObjectMatchKV');
	listRes.push('testObjectMatchKVInsensitive');
	listRes.push('testBothObjectsSameProperties');
	listRes.push('testBothObjectsHaveSamePropertyValue');
	listRes.push('testObjectPropertyDefinition');
	listRes.push('testObjectPropertyContent');
	listRes.push('testPropertyStringRequiredObject');
	listRes.push('testPropertyStringRequiredArray');
	listRes.push('testObjectPropertyAbsent');
	listRes.push('testObjectSearchValue');
	listRes.push('testPropertySearchValues');
	listRes.push('testPropertyDefinitions');
	listRes.push('testPropertyContents');
	listRes.push('testPropertyAbsentDefinitions');
	listRes.push('testInvalidFunctionResult');
	listRes.push('testEcho');
	listRes.push('cloneObject');
	listRes.push('getObjectProperties');
	listRes.push('getObjectValues');
	listRes.push('displayCallbackMessage');
	listRes.push('convertStringToNumber');
	
	return listRes;
}

exports.getCommonFunctionsList = getCommonFunctionsListArray;