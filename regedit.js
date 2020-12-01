const regedit = require("regedit");
regedit.setExternalVBSLocation('resources/regedit/vbs');

const HKCU_FILE = "gs";

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
            value: "Open GS login.",
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
            value: `"${process.cwd()}\\gs-app-test.exe" \"--url=%1\"`
        }
    },
}

