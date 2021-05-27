const checkDatabaseEmpty = require("./parts/a-check_database_empty");
const addAllDevices = require("./parts/b-add_all_devices");
const getDeviceList = require("./parts/c-get_device_list");
const checkDeviceList = require("./parts/d-check_device_list");
const listNodes = require("./parts/e-list_avaliable_nodes");
const checkNodes = require("./parts/f-check_node_array");
const getDevProps = require("./parts/g-get_device_properties");
const deleteAddedDevices = require("./parts/h-delete_added_devices");
const clearCache = require("./parts/i-clear_cache");


function coordinateFrontendTesting()
{
	describe("I - Frontend Testing", function()
	{
		checkDatabaseEmpty();
		
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
		addAllDevices();
		
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
		getDeviceList();
		
		after(function()
		{
			callCheckList();
		});
	});
}

function callCheckList()
{
	describe("", function()
	{
		checkDeviceList();
		
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
		listNodes();
		
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
		checkNodes();
		
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
		getDevProps();
		
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
		deleteAddedDevices();
		
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
		clearCache();
	});
	
}

module.exports = coordinateFrontendTesting;