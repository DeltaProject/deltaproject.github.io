var app = new Vue({
    el: "#app",
    data: {
        version: "",
        releaseNotes: "",
        isPreRelease: false,
        downloads: {
            windows: "#",
            macos: "#",
            linux: "#"
        }
    }
});

function printBanner() {
    console.log("%cHey! Jij daar! 😎",
        "font-size: 40px; font-weight: bold; font-family: Helvetica;");

    console.log("%cDit is een project van Kees van Voorthuizen (VCL A4a).\n" +
        "Hou jij ook van programmeren en wil je meewerken aan dit project?\n" +
        "%cStuur mij dan een bericht op https://keybase.io/keesvv!",
        "font-size: 22px; font-weight: bold; font-family: Helvetica;",
        "font-size: 22px; font-weight: bold; font-family: Helvetica; color: #21a0e0;");
}

$.getJSON("https://api.github.com/repos/deltaproject/Delta/releases", function(data) {
    for (let i = 0; i < data.length; i++) {
        const element = data[i];
        app.releaseNotes += `${element.tag_name}\n====\n\n${element.body}\n\n\n`;
    }

    app.version = data[0].tag_name;
    app.isPreRelease = data[0].prerelease;
    
    var assets = data[0].assets;
    for (let i = 0; i < assets.length; i++) {
        const element = assets[i];
        let name = element.name;
        let url = element.browser_download_url;

        if (name.indexOf("windows") != -1) {
            app.downloads.windows = url;
        }

        else if (name.indexOf("macOS") != -1) {
            app.downloads.macos = url;
        }

        else if (name.indexOf("linux") != -1) {
            app.downloads.linux = url;
        }
    }
});

printBanner();