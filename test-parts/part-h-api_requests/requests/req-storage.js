const chai = require("chai");
const expect = require("chai").expect;
const chaiThings = require('chai-things');
const sinon = require('sinon');

const commonPaths = require("../../../app/paths/files/app-paths");
const apiPaths = require(commonPaths.requestApiPaths);
const commonFunctionsFile = require(commonPaths.testCommonFull);
const apiRequestScript = require(commonPaths.requestApi);
const reqModule = require('request');
const fsModule = require('fs');
const osModule = require('os');

const apiCommonFile = require("../sub-requests/common-api");
const storageCommonFile = require("../sub-requests/common-storage");
const storageFolder = apiPaths.storageApi;

var userStorageTestPaths = null;
var currentPlatform = osModule.platform();


function testStorageAPIs()
{
	describe("Storage APIs (storage)", function()
	{
		handleUserStorageTestPaths();
		handleFileList();
		handleUserStorageCreate();
		handleFileDownload();
		handleUserStorageDelete();
		handleGlobalStatus();
	});
}


function handleUserStorageTestPaths()
{
	describe("User Storage Test Paths", function()
	{
		it("Retrieve Function Called", function(done)
		{
			userStorageTestPaths = storageCommonFile.getUserStoragePaths();
			done();
		});
		
		it("Retrieve Successful", function(done)
		{
			commonFunctionsFile.testPresent(userStorageTestPaths);
			expect(userStorageTestPaths).to.be.an("object");
			done();
		});
		
	});
}




function handleFileList()
{
	var fileListUrl = null;
	var fileListRequestReturn = null;
	var fileListRequestError = null;
	var fileListRead = null;
	
	describe("User File List (user-files/list)", function()
	{
		
		it("Request Made", function(done)
		{
			fileListUrl = apiRequestScript.callWriteApiUrl(storageFolder, "user-files/list");
			
			reqModule(fileListUrl, function(sError, sResult)
			{
				fileListRequestError = sError;
				fileListRequestReturn = sResult;
				done();
			});
		});
		
		
		it("Request Successful", function(done)
		{
			expect(fileListRequestError).to.be.null;
			commonFunctionsFile.testPresent(fileListRequestReturn);
			done();
		});
		
		it("Results Read", function(done)
		{
			fileListRead = apiRequestScript.callReadApiResponseArray(fileListRequestReturn);
			done();
		});
		
		it("Correct Array Structure", function()
		{
			commonFunctionsFile.testPresent(fileListRead);
			commonFunctionsFile.testArrayEmpty(fileListRead);
			commonFunctionsFile.testAllElements(fileListRead, 'object');
		});
		
		it("Correct Properties", function()
		{
			commonFunctionsFile.testPropertyDefinitions(fileListRead, 'name');
			commonFunctionsFile.testPropertyDefinitions(fileListRead, 'size');
			commonFunctionsFile.testPropertyDefinitions(fileListRead, 'isDirectory');
			commonFunctionsFile.testPropertyDefinitions(fileListRead, 'modified');
			commonFunctionsFile.testPropertyDefinitions(fileListRead, 'created');
		});
		
		it("Correct Contents", function()
		{
			commonFunctionsFile.testPropertyContents(fileListRead, 'name', 'string');
			commonFunctionsFile.testPropertyContents(fileListRead, 'size', 'number');
			commonFunctionsFile.testPropertyContents(fileListRead, 'isDirectory', 'boolean');
			commonFunctionsFile.testPropertyContents(fileListRead, 'modified', 'number');
			commonFunctionsFile.testPropertyContents(fileListRead, 'created', 'number');
			
			apiCommonFile.callTestFileNameArray(fileListRead, 'name');
			apiCommonFile.callTestZeroLeastArray(fileListRead, 'size');
			storageCommonFile.callTestFileFlags(fileListRead);
			apiCommonFile.callTestPositiveNumberPropertyArray(fileListRead, 'modified');
			apiCommonFile.callTestPositiveNumberPropertyArray(fileListRead, 'created');
		});
		
		it("Correct Timestamps", function()
		{
			apiCommonFile.callTestWriteTimestampArray(fileListRead, 'modified', 'created');
		});
		
	});
}


function handleUserStorageCreate()
{
	var folderComplete = false;
	var folderError = null;
	
	var fileWriteComplete = false;
	var fileWriteError = null;
	
	
	describe("Create User Storage", function()
	{
		
		it("Storage Folder Called", function(done)
		{
			fsModule.mkdir(userStorageTestPaths.storageTestFolderPath, function(foError)
			{
				folderComplete = true;
				folderError = foError;
				done();
			});
		});
		
		it("Storage Folder Successful", function(done)
		{
			expect(folderComplete).to.be.true;
			storageCommonFile.callTestFolderCreationResult(folderError);
			done();
		});
		
		it("Test File Write Called", function(done)
		{
			fsModule.writeFile(userStorageTestPaths.storageTestFilePath, userStorageTestPaths.storageTestFileContent, function(fwError)
			{
				fileWriteComplete = true;
				fileWriteError = fwError;
				done();
			});
		});
		
		it("Test File Write Successful", function(done)
		{
			expect(fileWriteComplete).to.be.true;
			expect(fileWriteError).to.be.null;
			done();
		});
		
		
	});
	
}


function handleFileDownload()
{
	var testFileRelative = null;
	
	var fileDownloadUrl = null;
	var fileDownloadReturn = null;
	var fileDownloadError = null;
	var fileDownloadRead = null;
	
	describe("User File Download (user-files/download/test-file.txt)", function()
	{
		
		it("Download Request Made", function(done)
		{
			testFileRelative = "user-files/download/" + userStorageTestPaths.storageTestFileName;
			fileDownloadUrl = apiRequestScript.callWriteApiUrl(storageFolder, testFileRelative);
			
			reqModule(fileDownloadUrl, function(sError, sResult)
			{
				fileDownloadError = sError;
				fileDownloadReturn = sResult;
				done();
			});
		});
		
		it("Download Successful", function(done)
		{
			commonFunctionsFile.testPresent(fileDownloadReturn);
			expect(fileDownloadError).to.be.null;
			done();
		});
		
		it("Results Read", function(done)
		{
			fileDownloadRead = apiRequestScript.callReadApiResponseString(fileDownloadReturn);
			done();
		});
		
		it("File Contents Returned", function(done)
		{
			commonFunctionsFile.testPresent(fileDownloadRead);
			commonFunctionsFile.testString(fileDownloadRead);
			expect(fileDownloadRead).to.equal(userStorageTestPaths.storageTestFileContent);
			
			done();
		});
		
	});
}


function handleUserStorageDelete()
{
	var fileRemoveComplete = null;
	var fileRemoveError = null;
	
	var folderRemoveComplete = null;
	var folderRemoveError = null;
	
	describe("Delete User Storage", function()
	{
		it("File Remove Called", function(done)
		{
			fsModule.unlink(userStorageTestPaths.storageTestFilePath, function(unlinkError)
			{
				fileRemoveComplete = true;
				fileRemoveError = unlinkError;
				done();
			});
		});
		
		it("File Remove Successful", function(done)
		{
			expect(fileRemoveComplete).to.be.true;
			expect(fileRemoveError).to.be.null;
			done();
		});
		
		it("Folder Remove Called", function(done)
		{
			fsModule.rmdir(userStorageTestPaths.storageTestFolderPath, function(dError)
			{
				folderRemoveComplete = true;
				folderRemoveError = dError;
				done();
			});
		});
		
		it("Folder Remove Successful", function(done)
		{
			expect(folderRemoveComplete).to.be.true;
			expect(folderRemoveError).to.be.null;
			done();
		});
		
		it("Paths Disposed", function(done)
		{
			userStorageTestPaths = null;
			done();
		});
		
	});
}



function handleGlobalStatus()
{
	var gStatusUrl = null;
	var gStatusReturn = null;
	var gStatusError = null;
	var gStatusRead = null;
	
	describe("Global Status (global/status)", function()
	{
		
		it("Request Made", function(done)
		{
			gStatusUrl = apiRequestScript.callWriteApiUrl(storageFolder, "global/status");
			
			reqModule(gStatusUrl, function(sError, sResult)
			{
				gStatusError = sError;
				gStatusReturn = sResult;
				done();
			});	
		});
		
		it("Request Successful", function(done)
		{
			expect(gStatusError).to.be.null;
			commonFunctionsFile.testPresent(gStatusReturn);
			done();
		});
		
		it("Results Read", function(done)
		{
			gStatusRead = apiRequestScript.callReadApiResponseObject(gStatusReturn);
			done();
		});
		
		it("Correct Return Structure", function()
		{
			commonFunctionsFile.testPresent(gStatusRead);
			expect(gStatusRead).to.be.an("object");
		});
		
		it("Correct Properties", function()
		{
			storageCommonFile.callTestDrivePropertyDefinitionsObject(gStatusRead);
		});
		
		it("Correct Contents", function()
		{
			commonFunctionsFile.testString(gStatusRead.fs);
			commonFunctionsFile.testString(gStatusRead.type);
			commonFunctionsFile.testObjectPropertyContent(gStatusRead, 'used', 'number');
			commonFunctionsFile.testObjectPropertyContent(gStatusRead, 'use', 'number');
			commonFunctionsFile.testString(gStatusRead.mount);
			
			storageCommonFile.callTestDriveLetterObject(gStatusRead, currentPlatform);
			storageCommonFile.callTestDriveTotalObject(gStatusRead, currentPlatform);
			storageCommonFile.callTestDriveUsedObject(gStatusRead);
			storageCommonFile.callTestDrivePercentageObject(gStatusRead);
			storageCommonFile.callTestMountObject(gStatusRead, currentPlatform);
		});
		
	});
}



exports.callTestStorageAPIs = testStorageAPIs;