const fs = require('fs');
const chai = require("chai");
const expect = require("chai").expect;
const chaiThings = require('chai-things');

const commonPaths = require("../../../app/paths/files/app-paths");
const apiPaths = require(commonPaths.requestApiPaths);
const commonFunctions = require(commonPaths.testCommon);
const arrayFunctions = require(commonPaths.testArray);
const objectFunctions = require(commonPaths.testObject);
const apiRequestScript = require(commonPaths.requestApi);
const httpRequests = require(commonPaths.httpRequests);
const apiCommonFile = require("../sub/common-api");
const storageCommonFile = require("../sub/common-storage");

var testFile = storageCommonFile.getUserStoragePaths();


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
			fileListUrl = apiRequestScript.writeUrl(apiPaths.storageApi, "user-files/list");
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
			expect(fileListRead).to.exist;
			arrayFunctions.testEmpty(fileListRead);
			arrayFunctions.testAllType(fileListRead, 'object');
		});
		
		it("Correct Properties", function()
		{
			arrayFunctions.testAllPropExists(fileListRead, 'name');
			arrayFunctions.testAllPropExists(fileListRead, 'size');
			arrayFunctions.testAllPropExists(fileListRead, 'isDirectory');
			arrayFunctions.testAllPropExists(fileListRead, 'modified');
			arrayFunctions.testAllPropExists(fileListRead, 'created');
		});
		
		it("Correct Contents", function()
		{
			arrayFunctions.testAllPropType(fileListRead, 'name', 'string');
			arrayFunctions.testAllPropType(fileListRead, 'size', 'number');
			arrayFunctions.testAllPropType(fileListRead, 'isDirectory', 'boolean');
			arrayFunctions.testAllPropType(fileListRead, 'modified', 'number');
			arrayFunctions.testAllPropType(fileListRead, 'created', 'number');
			
			apiCommonFile.testFileNames(fileListRead, 'name');
			apiCommonFile.testZeroLeastNumbers(fileListRead, 'size');
			storageCommonFile.testFlags(fileListRead);
			apiCommonFile.testPositiveNumberArray(fileListRead, 'modified');
			apiCommonFile.testPositiveNumberArray(fileListRead, 'created');
		});
		
		it("Correct Timestamps", function()
		{
			apiCommonFile.testWriteTimestampArray(fileListRead, 'modified', 'created');
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
			storageCommonFile.testFolderCreation(folderError);
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
			fileDownloadUrl = apiRequestScript.writeUrl(apiPaths.storageApi, relPath);
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
			statusUrl = apiRequestScript.writeUrl(apiPaths.storageApi, "global/status");
			statusReturn = httpRequests.defineOutput();
			httpRequests.getSuccessful(statusUrl, statusReturn, done);
		});
		
		
		it("Results Read", function(done)
		{
			statusRead = apiRequestScript.readResponseObject(statusReturn);
			done();
		});
		
		it("Correct Return Structure", function()
		{
			commonFunctions.testObject(statusRead);
		});
		
		it("Correct Properties", function()
		{
			storageCommonFile.testPropertiesObject(statusRead);
		});
		
		it("Correct Contents", function()
		{
			commonFunctions.testString(statusRead.fs);
			commonFunctions.testString(statusRead.type);
			objectFunctions.testPropType(statusRead, 'used', 'number');
			objectFunctions.testPropType(statusRead, 'use', 'number');
			commonFunctions.testString(statusRead.mount);
			
			storageCommonFile.testLetterObject(statusRead);
			storageCommonFile.testTotalObject(statusRead);
			storageCommonFile.testUsedObject(statusRead);
			storageCommonFile.testPercentageObject(statusRead);
			storageCommonFile.testMountObject(statusRead);
		});
		
	});
}


module.exports = testStorageAPIs;