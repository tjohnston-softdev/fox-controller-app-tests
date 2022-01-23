# Changelog

**./app/define-api.js**
* Manufacturer array is exported directly.
* This file exports the array itself instead of an object.

---

**./test-parts/03-internal_scripts/scripts/s-define_api.js**
* Renamed 'defineFile' global to 'definitions'
* Replaced 'defineFile.definitions' references with 'definitions'

---

**./test-parts/09-api_frontend/parts/**
* Removed `.definitions` from 'apiDefinitionObject' global in these files:
	* 05-list_nodes.js
	* 06-check_node_array.js