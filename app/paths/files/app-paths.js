function defineAppPaths()
{
	var appRoot = "../../../app/";
	var testCommonName = "test-common";
	var defineRes = {};
	
	defineRes["foxRelative"] = appRoot + "paths/files/fox-paths";
	defineRes["subCommonRelative"] = appRoot + "paths/files/sub-common-paths";
	defineRes["commonErrors"] = appRoot + "common-errors";
	defineRes["commonObjects"] = appRoot + "common-objects";
	defineRes["defineApi"] = appRoot + "define-api";
	defineRes["localValid"] = appRoot + "local-valid";
	defineRes["requestApi"] = appRoot + "request-api";
	defineRes["requestApiPaths"] = appRoot + "request-api-paths";
	defineRes["supportedDatabases"] = appRoot + "supported-databases";
	defineRes["testCommon"] = testCommonName;
	defineRes["testCommonFull"] = appRoot + testCommonName;
	
	return defineRes;
}



module.exports = defineAppPaths();