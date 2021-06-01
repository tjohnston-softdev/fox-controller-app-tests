const adminTests = require("./requests/req-admin_main");
const healthTests = require("./requests/req-admin_health");
const alarmTests = require("./requests/req-alarm");
const storageTests = require("./requests/req-storage");
const crudTests = require("./requests/req-devices_crud");
const crudInvalidTests = require("./requests/req-devices_crud_invalid");
const modifyInvalidTests = require("./requests/req-devices_modify_invalid");

function coordinateApiRequests()
{
	describe("H - API Requests", function()
	{
		//adminTests();
		//healthTests();
		//alarmTests();
		//storageTests();
		crudTests();
		crudInvalidTests();
		modifyInvalidTests();
	});
}


module.exports = coordinateApiRequests;