module.exports = async (params) => {
	const dark = "obsidian";
	const currentMode = app.vault.config.theme;
	if (currentMode === dark) {
		app.commands.executeCommandById("theme:use-light");
	} else { 
		app.commands.executeCommandById("theme:use-dark");
	}

};