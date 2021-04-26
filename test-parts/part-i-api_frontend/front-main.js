const chai = require("chai");
const expect = require("chai").expect;
const chaiThings = require('chai-things');
const sinon = require('sinon');

const cListEmptyPath = "./parts/a-check_database_empty";
const cAddDevicesPath = "./parts/b-add_all_devices";
const cGetListPath = "./parts/c-get_device_list";
const cCheckListPath = "./parts/d-check_device_list";
const cListAvaliablePath = "./parts/e-list_avaliable_nodes";
const cCheckNodeArrayPath = "./parts/f-check_node_array";
const cGetDeviceStatusPath = "./parts/g-get_device_properties";
const cDeleteDevicesPath = "./parts/h-delete_added_devices";
const cClearCachePath = "./parts/i-clear_cache";

function coordinateFrontendTesting()
{
	var cListEmptyFile = require(cListEmptyPath);
	
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
	var cAddDevicesFile = require(cAddDevicesPath);
	
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
	var cGetListFile = require(cGetListPath);
	
	describe("", function()
	{
		cGetListFile.callTestNodeGetListApi();
		
		after(function()
		{
			callCheckList();
		});
	});
}

function callCheckList()
{
	var cCheckListFile = require(cCheckListPath);
	
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
	var cListAvaliableFile = require(cListAvaliablePath);
	
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
	var cCheckNodeArrayFile = require(cCheckNodeArrayPath);
	
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
	var cGetDeviceStatusFile = require(cGetDeviceStatusPath);
	
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
	var cDeleteDevicesFile = require(cDeleteDevicesPath);
	
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
	var cClearCacheFile = require(cClearCachePath);
	
	describe("", function()
	{
		cClearCacheFile.callTestNodeClearCacheApi();
	});
	
}



exports.callCoordinateFrontendTesting = coordinateFrontendTesting;