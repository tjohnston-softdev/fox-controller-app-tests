function defineAppPaths()
{
	var appRoot = "../../../app/";
	var subCommonFolder = appRoot + "sub-common/files/";
	var defineRes = {};
	
	defineRes["foxRelative"] = appRoot + "paths/files/fox-paths";
	defineRes["commonErrors"] = appRoot + "common-errors";
	defineRes["commonObjects"] = appRoot + "common-objects";
	defineRes["defineApi"] = appRoot + "define-api";
	defineRes["loadFox"] = appRoot + "sub-common/files/load-fox-file";
	defineRes["localValid"] = appRoot + "local-valid";
	defineRes["requestApi"] = appRoot + "request-api";
	defineRes["requestApiPaths"] = appRoot + "request-api-paths";
	defineRes["supportedDatabases"] = appRoot + "supported-databases";
	defineRes["testCommonFull"] = appRoot + "test-common";
	
	defineRes["getModelsFile"] = subCommonFolder + "get-models";
	defineRes["checkModelIntegrityFile"] = subCommonFolder + "check-model-integrity";
	defineRes["rioCommonFile"] = subCommonFolder + "remote-io-common";
	defineRes["rioCommonInvalidFile"] = subCommonFolder + "remote-io-invalid_data";
	defineRes["deviceCommonFile"] = subCommonFolder + "test-device-common";
	defineRes["httpRequestsFile"] = subCommonFolder + "http-requests";
	
	return defineRes;
}



module.exports = defineAppPaths();