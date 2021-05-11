const cAdminFile = require("./requests/req-admin_main");
const cHealthFile = require("./requests/req-admin_health");
const cAlarmFile = require("./requests/req-alarm");
const cStorageFile = require("./requests/req-storage");
const cDevicesFileCrud = require("./requests/req-devices_crud");
const cDevicesFileCrudInvalid = require("./requests/req-devices_crud_invalid");
const cDevicesFileModifyInvalid = require("./requests/req-devices_modify_invalid");

function coordinateApiRequests()
{
	describe("H - API Requests", function()
	{
		cAdminFile.callTestAdminApis();
		cHealthFile.callTestHealthApi();
		cAlarmFile.callTestAlarmApis();
		cStorageFile.callTestStorageAPIs();
		//cDevicesFileCrud.callTestDeviceCrudApis();
		//cDevicesFileCrudInvalid.callTestDeviceCrudInvalidApis();
		//cDevicesFileModifyInvalid.callTestDeviceModifyInvalidApis();
	});
}


module.exports =
{
	callCoordinateApiRequests: coordinateApiRequests
};