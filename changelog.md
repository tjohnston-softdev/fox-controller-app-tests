# Changelog

**./test-parts/part-g-controller_files/controller-main.js**
* All function calls are commented out except for:
	* cRioIndexMainFile
	* cRioIndexNodeListFile
	* cRioIndexNodeRegisterFile
	* cRioIndexNodeRegisterInvalid

---

**./test-parts/part-g-controller_files/files/con-rio_index_main.js**
* 'foxPath.rioIndexFile' is now required directly.
* Removed functions:
	* checkFileObjects
	* getFileRequirement
* Added 'done' callbacks to tests in 'handleInitializationFunction'
	* "Initialization Event Successful"
	* "Initialization Disposed"
* handleInitializationCompleteFunction
	* All tests have 'done' callbacks.
	* Removed `expect(compSpy.called).to.be.true;`
	* Removed 'testPresent' check on 'triggerFlag'
* checkFunctionDefinitionLoop
	* Renamed parameter to 'nameArray'
	* Renamed 'fi' to 'loopIndex'
	* Removed 'currentQuote' variable.
	* Removed 'currentExport' variable.
	* Removed 'currentExists' variable.
	* Declared 'currentFunction' variable.
	* Rewrote loop for simplicity.
* getCrudFunctions
	* Renamed 'cRes' variable to 'namesList'
* Replaced `exports` with `module.exports`
