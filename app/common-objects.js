const unknownIDString = "Unknown Device";

const exampleObject =
{
	"exists": true,
	"relevant": false
};

const testDeviceObject =
{
        id: 'OO4EM1vva',
        deviceType: 'Remote IO',
		maker: 'Advantech',
        model: 'WISE-4060',
        name: 'Generic Test Device',
        desc: 'Used for testing',
        ipAddress: '192.168.145.101',
		macAddress: '',
        username: 'root',
        password: '00000000',
        isEnabled: true
};

const crudDeviceObject =
{
        id: 'ABCDEF123456',
        deviceType: 'Remote IO',
		maker: 'Advantech',
        model: 'WISE-4060',
        name: 'CRUD Test Device',
        desc: 'Used for testing',
        ipAddress: '192.168.123.231',
		macAddress: '',
        username: 'root',
        password: '00000000',
        isEnabled: true
};

const modifiedDeviceObject =
{
        id: 'ABCDEF123456',
        deviceType: 'Remote IO',
		maker: 'Moxa',
        model: 'ioLogik E1242',
        name: 'Modified Test Device',
        desc: 'Modified version of existing device',
        ipAddress: '192.168.231.123',
		macAddress: '',
        username: 'root',
        password: '00000000',
        isEnabled: true
};


const nodeDeviceObject =
{
        id: 'ABCDEF123456',
        deviceType: 'Remote IO',
		maker: 'Advantech',
        model: 'WISE-4060',
        name: 'Node Test Device',
        desc: 'Used for testing node-related functions',
        ipAddress: '192.168.123.231',
		macAddress: '',
        username: 'root',
        password: '00000000',
        isEnabled: true
};


function getRegisterNodeObject(registerDeviceID, registerNodeID, registerPrefixIndex)
{
	var rNodeObj =
	{
		id: registerNodeID,
		type: 'Advantech Out',
		z: 'b177490a.885f28', 
		name: '',
		deviceId: registerDeviceID,
		ioSetId: registerPrefixIndex,
		x: 200, y: 300, 
		wires: []
	};
	
	return rNodeObj;
}



exports.unknownID = unknownIDString;
exports.exampleObj = exampleObject;
exports.testDevice = testDeviceObject;
exports.crudDevice = crudDeviceObject;
exports.modifiedDevice = modifiedDeviceObject;
exports.nodeDevice = nodeDeviceObject;
exports.getRegisterNode = getRegisterNodeObject;