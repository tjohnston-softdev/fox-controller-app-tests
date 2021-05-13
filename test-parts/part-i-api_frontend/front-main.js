const cListEmptyFile = require("./parts/a-check_database_empty");
const cAddDevicesFile = require("./parts/b-add_all_devices");
const cGetListFile = require("./parts/c-get_device_list");
/*
const cCheckListFile = require("./parts/d-check_device_list");
const cListAvaliableFile = require("./parts/e-list_avaliable_nodes");
const cCheckNodeArrayFile = require("./parts/f-check_node_array");
const cGetDeviceStatusFile = require("./parts/g-get_device_properties");
const cDeleteDevicesFile = require("./parts/h-delete_added_devices");
const cClearCacheFile = require("./parts/i-clear_cache");
*/


function coordinateFrontendTesting()
{
	describe("I - Frontend Testing", function()
	{
		cListEmptyFile.callTestNodeDatabaseEmptyApi();
		
		after(function()
		{
			callAddDevices();
		});
	});
}


function callAddDevices()
{
	describe("", function()
	{
		cAddDevicesFile.callTestNodeAddApis();
		
		after(function()
		{
			callGetList();
		});
	});
}


function callGetList()
{
	describe("", function()
	{
		cGetListFile.callTestNodeGetListApi();
		
		after(function()
		{
			//callCheckList();
		});
	});
}

function callCheckList()
{
	describe("", function()
	{
		cCheckListFile.callTestNodeCheckListApi();
		
		after(function()
		{
			callListAvaliable();
		});
	});
}

function callListAvaliable()
{
	describe("", function()
	{
		cListAvaliableFile.callTestNodeListAvaliableApi();
		
		after(function()
		{
			callCheckNodeArray();
		});
	});
}

function callCheckNodeArray()
{
	describe("", function()
	{
		cCheckNodeArrayFile.callTestNodeArrayCheckApi();
		
		after(function()
		{
			callGetDeviceStatus();
		});
		
	});
}

function callGetDeviceStatus()
{
	describe("", function()
	{
		cGetDeviceStatusFile.callTestNodeDevicePropertiesApi();
		
		after(function()
		{
			callDeleteDevices();
		});
		
	});
}

function callDeleteDevices()
{
	describe("", function()
	{
		cDeleteDevicesFile.callTestNodeDeleteAddedDevicesApi();
		
		after(function()
		{
			callClearCache();
		});
		
	});
}

function callClearCache()
{
	describe("", function()
	{
		cClearCacheFile.callTestNodeClearCacheApi();
	});
	
}

module.exports =
{
	callCoordinateFrontendTesting: coordinateFrontendTesting
};