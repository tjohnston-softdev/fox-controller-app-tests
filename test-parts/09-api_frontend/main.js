const checkDatabaseEmpty = require("./parts/01-check_database_empty");
const addAllDevices = require("./parts/02-add_all_devices");
const getDeviceList = require("./parts/03-get_device_list");
const checkDeviceList = require("./parts/04-check_device_list");
const listNodes = require("./parts/05-list_nodes");
const checkNodes = require("./parts/06-check_node_array");
const getDevProps = require("./parts/07-get_device_properties");
const deleteAddedDevices = require("./parts/08-delete_added_devices");
const clearCache = require("./parts/09-clear_cache");


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