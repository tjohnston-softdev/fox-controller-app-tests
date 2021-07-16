# Changelog

**./app/sub-common/files/node-names.js**
* New file
	* Contains functions to help write the expected node name in front-end API testing.
	* See below for split details.

---

**./app/paths/files/app-paths.js**
* Added property for: '../../sub-common/files/node-names.js'

---

**./test-parts/part-i-api_frontend/sub-parts/common-nodes.js**
* Added requirement for 'commonPaths.nodeNames'
* writeExpectedNodeName
	* Moved 'firstCharacter' IF structure to 'nodeNames' as 'parseDataTypeChar'
	* Moved 'secondCharacter' IF structure to 'nodeNames' as 'parseDataModeChar'
	* Moved 'enteredPrefix.length' IF condition to 'nodeNames' as 'parseIndexNumberChars'
	* Removed 'firstWord', 'secondWord', and 'thirdWord' variables.
	* Rewrote 'fullText' using 'nodeNames'
