const less = require("less");
const path = require("path");
const fs = require("fs");

async function handleInitHook() {
    const lessPath = path.join(__dirname, "_assets", "theme.less");
    const bgPath = path.join(__dirname, "_assets", "bg.png");
    const data = fs.readFileSync(lessPath).toString();
    const bgData = fs.readFileSync(bgPath);

    const lessData = await new Promise((resolve) => {
        less.render(data, (e, output) => {
            if (e) {
                throw e;
            }

            resolve(output.css);
        });
    });

    const newBgPath = path.join("gitbook", "gitbook-plugin-honkit-plugin-theme-darkening", "bg.png");
    const newCSSPath = path.join("gitbook", "gitbook-plugin-honkit-plugin-theme-darkening", "darkening.css");

    this.output.writeFile(newBgPath, bgData);
    return this.output.writeFile(newCSSPath, lessData);
}

module.exports = {
    website: {
        assets: "./_assets/",
        css: ["darkening.css"],
    },
    hooks: {
        init: handleInitHook, // Called after everything is completed.
    },
};
