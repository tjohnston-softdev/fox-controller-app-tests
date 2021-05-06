# Changelog

**./test-parts/part-g-controller_files/files/con-service_main.js**
* Removed requirements:
	* chai-things
	* sinon
	* commonPaths.commonObjects
* 'foxPath.serviceMainFile' is now required directly.
* Removed functions:
	* checkRequiredServiceFiles
	* getServiceMainRequirement
* Replaced `exports` with `module.exports`
