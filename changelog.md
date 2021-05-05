# Changelog

**./test-parts/part-g-controller_files/controller-main.js**
* All function calls are commented out except for 'cRioFactoriesFile'

---

**./test-parts/part-g-controller_files/files/con-rio_factories.js**
* These files are now required directly:
	* subCommonPath.rioCommonFile
	* ../sub-files/rio-factory_return
	* foxPath.rioFactoriesFile
* Removed functions:
	* getFactoryFile
	* getCommonFile
	* checkRequiredFilesExist
* handleRemoteIoModuleFunction
	* Moved 'moduleSpy' scope to the "Call - Valid" test.
	* Added 'done' callback to "Call - Valid"
	* Added 'testPresent' check to 'firstCall'
* Replaced `exports` with `module.exports`

---

**./test-parts/part-g-controller_files/sub-files/rio-factory_return.js**
* Removed requirements:
	* chai-things
	* sinon
	* commonPaths.commonErrors
	* commonPaths.commonObjects
	* commonPaths.foxRelative
* Replaced `exports` with `module.exports`
