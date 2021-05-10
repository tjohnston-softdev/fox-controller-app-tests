# Changelog

**Test Status**
* Offline testing is successful.
* File access errors for online testing have been fixed.

---

**./test-parts/part-g-controller_files/controller-main.js**
* The following files are now required in-function instead of globally:
	* ./files/con-rio_index_main
	* ./files/con-rio_index_node_list
	* ./files/con-rio_index_node_reg
	* ./files/con-rio_index_node_reg_invalid
	* ./files/con-service_main
* This is because these files are locked by the Controller when it is online.
	* Requiring them globally rather than in-function causes errors.
	* That way, they are only accessed directly during offline testing.
