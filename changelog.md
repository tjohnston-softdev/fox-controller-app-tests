# Changelog

**./test-parts/part-g-controller_files/files/con-rio_index_node_list.js**
* Removed 'commonPaths.commonObjects' requirement.
* Renamed 'nListSpy' global to 'nodeListSpy'
* Removed 'getIndexFileRequirement' function.
* These files are now required directly:
	* foxPath.rioIndexFile
	* subCommonPath.rioCommonFile
* handleNodeListPrepare
	* Removed "Remote IO Index" test.
	* Removed "Remote IO Sub-File" test.
	* Added 'done' callback to "Spy Object Assigned" test.
* handleNodeListFull
	* Renamed 'nListReturn' variable to 'retrievedNodeList'
	* Renamed 'nErrorReturn' variable to 'retrievedError'
	* Restructured callback for 'indexFile.listRiosForNode'
	* Renamed 'allErr' callback parameter to 'allDevicesErr'
	* Renamed 'allDevices' callback parameter to 'allDevicesList'
* handleNodeListManufacturers
	* Renamed 'nAdvantech' variable to 'advantechName'
	* Renamed 'nMoxa' variable to 'moxaName'
	* Renamed 'nSonoff' variable to 'sonoffName'
* handleNodeListDispose
	* Added 'done' callback.
