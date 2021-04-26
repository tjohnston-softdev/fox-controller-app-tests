const chai = require("chai");
const expect = require("chai").expect;
const chaiThings = require('chai-things');
const sinon = require('sinon');

function coordinateApiRequests()
{
	var cAdminFile = require("./requests/req-admin_main");
	var cHealthFile = require("./requests/req-admin_health");
	var cAlarmFile = require("./requests/req-alarm");
	var cStorageFile = require("./requests/req-storage");
	var cDevicesFileCrud = require("./requests/req-devices_crud");
	var cDevicesFileCrudInvalid = require("./requests/req-devices_crud_invalid");
	var cDevicesFileModifyInvalid = require("./requests/req-devices_modify_invalid");
	
	describe("H - API Requests", function()
	{
		cAdminFile.callTestAdminApis();
		cHealthFile.callTestHealthApi();
		cAlarmFile.callTestAlarmApis();
		cStorageFile.callTestStorageAPIs();
		cDevicesFileCrud.callTestDeviceCrudApis();
		cDevicesFileCrudInvalid.callTestDeviceCrudInvalidApis();
		cDevicesFileModifyInvalid.callTestDeviceModifyInvalidApis();
	});
}


exports.callCoordinateApiRequests = coordinateApiRequests;