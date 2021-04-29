function defineSubCommonPaths()
{
	var subCommonFolder = "../../../app/sub-common/files/";
	var defineRes = {};
	
	defineRes["getModelsFile"] = subCommonFolder + "get-models";
	defineRes["checkModelIntegrityFile"] = subCommonFolder + "check-model-integrity";
	defineRes["rioCommonFile"] = subCommonFolder + "remote-io-common";
	defineRes["rioCommonInvalidFile"] = subCommonFolder + "remote-io-invalid_tests";
	defineRes["deviceCommonFile"] = subCommonFolder + "test-device-common";
	
	return defineRes;
}


module.exports = defineSubCommonPaths();