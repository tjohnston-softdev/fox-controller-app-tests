const fs = require('fs');
const os = require('os');
const chai = require("chai");
const expect = require("chai").expect;
const chaiThings = require('chai-things');

const commonPaths = require("../../../app/paths/files/app-paths");
const apiPaths = require(commonPaths.requestApiPaths);
const commonFunctionsFile = require(commonPaths.testCommonFull);
const apiRequestScript = require(commonPaths.requestApi);
const httpRequests = require(commonPaths.httpRequestsFile);
const apiCommonFile = require("../sub-requests/common-api");
const storageCommonFile = require("../sub-requests/common-storage");

var testFile = storageCommonFile.getUserStoragePaths();
var currentPlatform = os.platform();


function testStorageAPIs()
{
	describe("Storage APIs (storage)", function()
	{
		handleFileList();
		handleUserStorageCreate();
		handleFileDownload();
		handleUserStorageDelete();
		handleGlobalStatus();
	});
}




function handleFileList()
{
	var fileListUrl = null;
	var fileReqReturn = null;
	var fileListRead = null;
	
	describe("User File List (user-files/list)", function()
	{
		
		it("Request Made", function(done)
		{
			fileListUrl = apiRequestScript.callWriteApiUrl(apiPaths.storageApi, "user-files/list");
			fileReqReturn = httpRequests.defineOutput();
			httpRequests.getSuccessful(fileListUrl, fileReqReturn, done);
		});
		
		
		it("Results Read", function(done)
		{
			fileListRead = fileReqReturn.body;
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
			fs.mkdir(testFile.folder, function(foError)
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
			fs.writeFile(testFile.fullPath, testFile.contents, function(fwError)
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
	var relPath = null;
	
	var fileDownloadUrl = null;
	var fileDownloadReturn = null;
	
	describe("User File Download (user-files/download/test-file.txt)", function()
	{
		
		it("Download Request Made", function(done)
		{
			relPath = "user-files/download/" + testFile.name;
			fileDownloadUrl = apiRequestScript.callWriteApiUrl(apiPaths.storageApi, relPath);
			fileDownloadReturn = httpRequests.defineOutput();
			httpRequests.getSuccessful(fileDownloadUrl, fileDownloadReturn, done);
		});
		
		it("Download Successful", function(done)
		{
			expect(fileDownloadReturn.body).to.equal(testFile.contents);
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
			fs.unlink(testFile.fullPath, function(unlinkError)
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
			fs.rmdir(testFile.folder, function(dError)
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
		
	});
}



function handleGlobalStatus()
{
	var statusUrl = null;
	var statusReturn = null;
	var statusRead = null;
	
	describe("Global Status (global/status)", function()
	{
		
		it("Request Made", function(done)
		{
			statusUrl = apiRequestScript.callWriteApiUrl(apiPaths.storageApi, "global/status");
			statusReturn = httpRequests.defineOutput();
			httpRequests.getSuccessful(statusUrl, statusReturn, done);
		});
		
		
		it("Results Read", function(done)
		{
			statusRead = apiRequestScript.callReadApiResponseObject(statusReturn);
			done();
		});
		
		it("Correct Return Structure", function()
		{
			commonFunctionsFile.testPresent(statusRead);
			expect(statusRead).to.be.an("object");
		});
		
		it("Correct Properties", function()
		{
			storageCommonFile.callTestDrivePropertyDefinitionsObject(statusRead);
		});
		
		it("Correct Contents", function()
		{
			commonFunctionsFile.testString(statusRead.fs);
			commonFunctionsFile.testString(statusRead.type);
			commonFunctionsFile.testObjectPropertyContent(statusRead, 'used', 'number');
			commonFunctionsFile.testObjectPropertyContent(statusRead, 'use', 'number');
			commonFunctionsFile.testString(statusRead.mount);
			
			storageCommonFile.callTestDriveLetterObject(statusRead, currentPlatform);
			storageCommonFile.callTestDriveTotalObject(statusRead, currentPlatform);
			storageCommonFile.callTestDriveUsedObject(statusRead);
			storageCommonFile.callTestDrivePercentageObject(statusRead);
			storageCommonFile.callTestMountObject(statusRead, currentPlatform);
		});
		
	});
}


module.exports =
{
	callTestStorageAPIs: testStorageAPIs
};