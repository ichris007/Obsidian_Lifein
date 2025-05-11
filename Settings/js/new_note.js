module.exports = async (params) => {
    const { app, quickAddApi, obsidian } = params;

    // 获取所有目录
    const folders = app.vault.getAllLoadedFiles().filter(file => file.children).map(folder => folder.path);

    // 提示用户选择目录
    const folderPath = await quickAddApi.suggester(folders, folders);
    if (!folderPath) {
        new obsidian.Notice("请提供有效的目录");
        return;
    }

    // 获取模板文件夹路径
    const templatesFolder = "Templates"; // 根据你的实际模板文件夹路径进行调整

    // 获取所有模板
    const templates = app.vault.getAbstractFileByPath(templatesFolder).children
        .filter(file => file.extension === 'md')
        .map(file => file.path.replace(`${templatesFolder}/`, ''));

    // 提示用户选择模板
    const templateName = await quickAddApi.suggester(templates, templates);
    if (!templateName) {
        new obsidian.Notice("找不到模板");
        return;
    }

    // 提示用户输入笔记名称
    const fileName = await quickAddApi.inputPrompt("请输入笔记的名称");
    if (!fileName) {
        new obsidian.Notice("请提供有效的文件名");
        return;
    }

    const fullFilePath = `${folderPath}/${fileName}.md`;

    const template = app.vault.getAbstractFileByPath(`${templatesFolder}/${templateName}`);
    const templateContent = await app.vault.read(template);
    await app.vault.create(fullFilePath, templateContent);

    // 打开新创建的笔记
    const newFile = app.vault.getAbstractFileByPath(fullFilePath);
    if (newFile) {
        app.workspace.getLeaf(true).openFile(newFile);
    }

    new obsidian.Notice(`已创建笔记： ${fullFilePath}`);
};
