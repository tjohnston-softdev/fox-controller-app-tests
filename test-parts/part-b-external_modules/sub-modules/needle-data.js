function defineNeedleDataObjects()
{
	var postObj = {};
	var putObj = {};
	var defineRes = {};
	
	setContents(null, "New Object", "Hello World", postObj);
	setContents(1, "Updated Object", "Hello Again", putObj);
	
	defineRes["newObject"] = postObj;
	defineRes["updateObject"] = putObj;
	
	return defineRes;
}


function setContents(idNum, titleStr, bodyStr, dataObj)
{
	dataObj["id"] = idNum;
	dataObj["title"] = titleStr;
	dataObj["body"] = bodyStr;
	dataObj["userId"] = 1;
}


module.exports = defineNeedleDataObjects();