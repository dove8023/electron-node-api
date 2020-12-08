const regedit = require("regedit");
regedit.setExternalVBSLocation('resources/regedit/vbs');

const HKCU_FILE = "bcagent";

regedit.createKey([
    `HKCU\\SOFTWARE\\Classes\\${HKCU_FILE}`,
    `HKCU\\SOFTWARE\\Classes\\${HKCU_FILE}\\shell\\open\\command`
], (err) => {
    console.log(err, 'go ------ put')

    regedit.putValue(valuesToPut, function (err) {
        console.log('regedit write over')
    })
})



var valuesToPut = {
    [`HKCU\\SOFTWARE\\Classes\\${HKCU_FILE}`]: {
        'defalut': {
            value: "Open bcagent",
            type: 'REG_DEFAULT'
        },
        "URL Protocol": {
            value: "",
            type: "REG_SZ",
        },
    },


    [`HKCU\\SOFTWARE\\Classes\\${HKCU_FILE}\\shell\\open\\command`]: {
        '@': {
            type: 'REG_DEFAULT',
            value: `"${process.cwd()}\\bcagent.exe" \"--url=%1\"`
        }
    },
}

