function defineAppPaths()
{
	var appRoot = "../../../app/";
	var subCommonFolder = appRoot + "sub-common/files/";
	var defineRes = {};
	
	defineRes["foxRelative"] = appRoot + "paths/files/fox-paths";
	defineRes["commonErrors"] = appRoot + "common-errors";
	defineRes["commonObjects"] = appRoot + "common-objects";
	defineRes["defineApi"] = appRoot + "define-api";
	defineRes["localValid"] = appRoot + "local-valid";
	defineRes["requestApi"] = appRoot + "request-api";
	defineRes["requestApiPaths"] = appRoot + "request-api-paths";
	defineRes["supportedDatabases"] = appRoot + "supported-databases";
	defineRes["testCommon"] = appRoot + "test-common";
	
	defineRes["getModels"] = subCommonFolder + "get-models";
	defineRes["checkModelIntegrity"] = subCommonFolder + "check-model-integrity";
	defineRes["rioCommon"] = subCommonFolder + "remote-io-common";
	defineRes["rioInvalid"] = subCommonFolder + "remote-io-invalid_data";
	defineRes["deviceCommon"] = subCommonFolder + "test-device-common";
	defineRes["httpRequests"] = subCommonFolder + "http-requests";
	defineRes["loadFox"] = subCommonFolder + "load-fox-file";
	
	return defineRes;
}



module.exports = defineAppPaths();