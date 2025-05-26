---
area: 工作
category:
  - 生产力系统
status:
  - 进行中
client:
  - "[[Lifein]]"
tags:
  - Project
aliases: 
stars: 3星级
number headings: auto, first-level 2, max 6, contents ^toc, skip ^skipped, start-at 1, _.1.1
created date: 2025-02-24 18:33
modified date: 2025-05-23 18:54:23
project:
  - "[[Obsidian生产力系统]]"
start_date: 2025-02-24T18:18:00
stop_date: 2025-10-30
showDone: false
cssclasses: 
---

## 任务清单^skipped

```dataviewjs
function textParser(taskText, noteCreationDate, parentEndDate) {
    const emojis = ["📅", "⏳", "🛫", "➕", "✅", "⏫", "🔼", "🔽"];

    function nextEmojiIndex(startIndex) {
        const indices = emojis.map(emoji => {
            const index = taskText.indexOf(emoji, startIndex + 1);
            return index > startIndex ? index : taskText.length;
        });
        return Math.min(...indices);
    }

    let addText;
    let scheduledText;
    let startText;

    function extractDate(emoji) {
        const start = taskText.indexOf(emoji);
        if (start < 0) return "";
        let match;

        if ((match = taskText.slice(start + 1).match(/([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))(\s|$)/))) {
            return match[0];
        }

        if ((match = taskText.slice(start + 1).match(/([0-9]+) ?([a-zA-Z]+)(\s|$)/))) {
            return moment(startText || scheduledText || parentEndDate || addText).add(match[1], match[2]).format('YYYY-MM-DD');
        }

        return "";
    }

    const DueText = extractDate("📅");
    scheduledText = extractDate("⏳");
    startText = extractDate("🛫");
    addText = extractDate("➕");
    const doneText = extractDate("✅");

    let h = taskText.indexOf("⏫");
    let m = taskText.indexOf("🔼");
    let l = taskText.indexOf("🔽");
    let PriorityText = "";
    if (h >= 0) PriorityText = "High";
    if (m >= 0) PriorityText = "Medium";
    if (l >= 0) PriorityText = "Low";

    const emojisIndex = emojis.map(emoji => taskText.indexOf(emoji)).filter(index => index >= 0);
    let words;
    if (emojisIndex.length > 0) {
        words = taskText.slice(0, Math.min(...emojisIndex)).split(" ");
    } else {
        words = taskText.split(" ");
    }

    words = words.filter((word) => word !== "#task");
    let newWords = words.map((word) => word.startsWith("#") ? `[${word.slice(1)}]` : word);
    let nameText = newWords.join(" ");

    return {
        add: addText,
        done: doneText,
        due: DueText,
        name: nameText,
        priority: PriorityText,
        scheduled: scheduledText,
        start: startText
    };
}

function loopGantt(pageArray, showDone) {
    let queryGlobal = "";
    let today = new Date().toISOString().slice(0, 10);

    for (let i = 0; i < pageArray.length; i++) {
        let taskQuery = "";
        if (!pageArray[i].file.tasks || pageArray[i].file.tasks.length === 0) {
            continue;
        }

        queryGlobal += "section " + pageArray[i].file.name + "\n\n";

        let taskArray = pageArray[i].file.tasks;
        let taskObjs = [];
        let noteCreationDate = moment(pageArray[i].file.ctime).format('YYYY-MM-DD');
        let parentEndDate = {};
        let parentHasChildren = new Set(taskArray.map(t => t.parent).filter(Boolean)); // === ✅ 记录哪些任务是父任务 ===

        for (let j = 0; j < taskArray.length; j++) {
            taskObjs[j] = textParser(taskArray[j].text, noteCreationDate, parentEndDate[taskArray[j].parent]);
            let theTask = taskObjs[j];
            if (theTask.name === "") continue;
            if (!showDone && theTask.done) continue;

            let startDate = theTask.start || theTask.scheduled || theTask.add || parentEndDate[taskArray[j].parent] || noteCreationDate || today;
            let endDate = theTask.done || theTask.due || theTask.scheduled;

            if (!endDate) {
                if (startDate >= today) {
                    let weekLater = new Date(startDate);
                    weekLater.setDate(weekLater.getDate() + 7);
                    endDate = weekLater.toISOString().slice(0, 10);
                } else {
                    endDate = today;
                }
            }

            parentEndDate[taskArray[j].line] = endDate;

            // === ✅ 修改开始 ===
            let isSubTask = !!taskArray[j].parent;
            let indentPrefix = isSubTask ? "    " : "";
            let isParentTask = parentHasChildren.has(taskArray[j].line);
            let displayName = (isParentTask ? "📌 " : "") + indentPrefix + theTask.name;

            let style = "";
            if (theTask.done) {
                style = "done";
            } else if (isSubTask) {
                if (theTask.priority === "High") style = "crit";
                else if (theTask.priority === "Medium") style = "active";
                else if (theTask.priority === "Low") style = "inactive";
            } else {
                if (theTask.due && theTask.due < today) style = "crit";
                else if (theTask.scheduled && theTask.scheduled <= today) style = "active";
                else style = "inactive";
            }

            taskQuery += `${displayName}    :${style}, ${startDate}, ${endDate}\n\n`;
            // === ✅ 修改结束 ===
        }

        queryGlobal += taskQuery;
    }

    return queryGlobal;
}

const Mermaid = `gantt
        title Obsidian生产力系统
        dateFormat  YYYY-MM-DD
        axisFormat %b %e
        `;

let pages = dv.pages('"01Projects/Obsidian生产力系统"');
let filteredPages = pages;
let showDone = dv.current().showDone;
let ganttOutput = loopGantt(filteredPages, showDone);

let today = new Date().toISOString().slice(0, 10);
ganttOutput += ". :active, " + today + ", " + today + "\n\n";

dv.paragraph("```mermaid\n" + Mermaid + ganttOutput + "\n```");

dv.paragraph(`Show completed tasks \`INPUT[toggle:showDone]\``);

//dv.span("[View this chart in a browser](https://mermaid.ink/img/" + btoa(Mermaid + ganttOutput) + ")");

```

## 1 项目说明

### 1.1 项目目标


### 1.2 项目信息


### 1.3 相关资源

obsidian
- 不是说插件不好，尽量少用插件基于下面三点考虑：
	- 还是为了快，插件过多，必然会对软件的性能和稳定性有所影响
	- 既然记录的卡片原子化了，每张卡应该都比较简单，并不需要特别复杂的内容，大部分插件也就没必要了
	- 迁移，很多插件会对内容格式有一定影响，对于后续迁移会带来一些阻碍

#### 1.3.1 生产力系统的理论和方法
[[第二大脑]]
[[构建第二大脑权威入门指南]]
[12 Principles for using Zettelkasten - Obsidian forum](https://forum.obsidian.md/t/12-principles-for-using-zettelkasten/51679)
[Pkmer-Docs/02-知识管理基础/PARA信息组织法/个人知识管理-简化生活的终极指南.md at main · PKM-er/Pkmer-Docs · GitHub](https://github.com/PKM-er/Pkmer-Docs/blob/main/02-%E7%9F%A5%E8%AF%86%E7%AE%A1%E7%90%86%E5%9F%BA%E7%A1%80/PARA%E4%BF%A1%E6%81%AF%E7%BB%84%E7%BB%87%E6%B3%95/%E4%B8%AA%E4%BA%BA%E7%9F%A5%E8%AF%86%E7%AE%A1%E7%90%86-%E7%AE%80%E5%8C%96%E7%94%9F%E6%B4%BB%E7%9A%84%E7%BB%88%E6%9E%81%E6%8C%87%E5%8D%97.md)

[Pkmer-Docs/02-知识管理基础/知识管理圆桌讨论/Terry/从企业管理角度看待笔记方法.md at main · PKM-er/Pkmer-Docs · GitHub](https://github.com/PKM-er/Pkmer-Docs/blob/main/02-%E7%9F%A5%E8%AF%86%E7%AE%A1%E7%90%86%E5%9F%BA%E7%A1%80/%E7%9F%A5%E8%AF%86%E7%AE%A1%E7%90%86%E5%9C%86%E6%A1%8C%E8%AE%A8%E8%AE%BA/Terry/%E4%BB%8E%E4%BC%81%E4%B8%9A%E7%AE%A1%E7%90%86%E8%A7%92%E5%BA%A6%E7%9C%8B%E5%BE%85%E7%AC%94%E8%AE%B0%E6%96%B9%E6%B3%95.md)

记笔记的意义并不仅仅是为了捕捉重要信息，它甚至不是为了提高你的记忆力。记笔记的目的是为了更好地思考。捕获是一种手段；保持记忆也只是一种副作用。我们的笔记应该帮助我们成为更有创造力、更有生产力、更高产的知识工作者。
Ahrens（2017）将此描述为 Zettelkasten 的主要价值主张：
> 只有当你能信任你的系统，只有当你真正知道一切都会被处理好，你的大脑才会放开，让你专注于手头的工作。这就是为什么我们需要一个像 GTD 一样全面的笔记系统，但又适合于写作、学习和思考的开放式过程。

[Pkmer-Docs/02-知识管理基础/知识管理圆桌讨论/基于文章与卡片的笔记法.md at main · PKM-er/Pkmer-Docs · GitHub](https://github.com/PKM-er/Pkmer-Docs/blob/main/02-%E7%9F%A5%E8%AF%86%E7%AE%A1%E7%90%86%E5%9F%BA%E7%A1%80/%E7%9F%A5%E8%AF%86%E7%AE%A1%E7%90%86%E5%9C%86%E6%A1%8C%E8%AE%A8%E8%AE%BA/%E5%9F%BA%E4%BA%8E%E6%96%87%E7%AB%A0%E4%B8%8E%E5%8D%A1%E7%89%87%E7%9A%84%E7%AC%94%E8%AE%B0%E6%B3%95.md)
> 卡片：是记录最小化的知识点、观点或自身零碎的想法；
> 文章：是整篇文献或需要精读的文本的搬迁，通常在阅读过程中，会产生多个卡片；
> 输出：则是在当前资料中，对某个模块知识点的阶段性总结，通常会有意识地利用画板功能去找寻关联卡片之间的联系；
> 摘抄：这个类别比较特殊，我喜欢摘抄一些书籍与网络上的金句。通常句子很美，值得时不时回味一下，但并不构成我对【卡片】类别的定义。此时，在因为不符合定义而忍痛删掉句子与满足自己的习惯两者间，我选择了遵从自己的内心，新增一个类别；

[Nick Milo：如何在笔记之间形成有效的关联？ - 知乎](https://zhuanlan.zhihu.com/p/373862260)
[Ideaverse for Obsidian (formerly the LYT Kit) now available! - Share & showcase - Obsidian Forum](https://forum.obsidian.md/t/ideaverse-for-obsidian-formerly-the-lyt-kit-now-available/390/11)
- 作为组织内容的比喻，使用“地图”这一术语早于我们所有人。在现代，我认为“概念地图”在 20 世纪 70 年代出现，随后是思维导图。当然，目录已经存在了很长时间，所以内容地图对我来说是自然而然的事。我认为我使用“#maps”这一术语可以追溯到 2008-09 年我在 Evernote 早期的时候。然而，内容地图和更具体的“MOCs”并不是我创造的术语。据我所知，这一术语是由 Lion Kimbro 在 2003 年左右在他的雄心勃勃的“如何绘制你每想的每一个想法的完整地图”中创造的，这是一个模拟系统，正如其名称所示。至于与任何数字内容相关，特别是在知识管理方面，我不知道还有其他人使用过这一术语。

---
有一个通用的方法论或工作流程很好，但说实话，就像任务管理一样，知识管理是非常个人化的事情。可以从别人的流程中汲取灵感，然后形成自己的方法！

---
建议给任何刚开始的人永远都是这样：总是要开始做笔记，大量地建立链接和标签，并看看哪种结构适合你的思维方式。

----
人们使用如 Obsidian 这类笔记应用来完成远超其主要记笔记和知识管理功能的多种任务。虽然我理解这些应用非常灵活且可定制，但我不禁疑惑人们为何要将它们的功能发挥到极致。虽然带有大量插件的应用能够处理这些任务是件好事，但这似乎让它变成了一种“万金油”工具。这难道不会稀释该应用的主要目的，即作为一款强大的记笔记和知识管理系统吗？
- 用户加入了 Obsidian，对很多东西都不太了解，所以他们想尝试所有的东西，但这是一条稳定向上曲线，最终拥有所有的东西。
- 你可能会过于依赖插件，但我发现这就像爬一个斜坡到达一个平台。捣鼓这些事情反而影响了他们写作的能力。
- 他们去除了一些不必要的额外内容，或者找到了更高效更容易的方法来做事情，并停留在一个让他们感到舒适且能够顺利完成事情的平台期。
- 在 Obsidian 中，数据归你所有，并存储在 markdown 文件中。即使插件消失，基础组件和内容仍然会保留。
- 我没有提到每个人都有自己的学习风格和能力。没有所谓的“唯一正确的方法”来做事情和学习。
- 这就是为什么我很感激 Obsidian 团队选择设计成一个插件生态系统，包括所有核心功能。
- Evernote 变成垃圾是因为他们添加了无数的功能，这个应用臃肿不堪，充满了我从未想使用的功能。
	- ==备注==：别的软件也会有这个趋势，最终用户为很多不需要的功能买单。Obsidian不一样，他完全自己做主。
- 人们可能希望所有内容都在一个应用中，是因为他们觉得频繁切换不同应用很麻烦。另一个原因是不同的事项可以相互连接。例如，你有一个任务，还有一个包含与该任务相关的信息的笔记。你可以在一个应用中将它们连接起来，但你不能在 Todoist 和 Obsidian 之间创建链接，这样是不行的。
	- 统一性。使用一个全能程序可以避免不断在不同应用之间切换。
	- 链接性。如果数据库中存在所有这些内容，你可以将它们链接在一起。
		- 这些功能可以让这些信息“交流”，比如在需要时链接和调用信息。
- 我完全同意你对学习曲线和“舒适平台期”的看法。就像你在 Obsidian 中开始时有一张空白画布，随着学习的深入，你逐渐添加更多的颜色和形状。最终，你会发现可能做得有点过头了，于是会简化回真正适合你需求的东西。Obsidian 的美妙之处就在于它允许这种进化。而且你说得对，没有所谓的“唯一正确方式”来使用它；一切都取决于对你最有效的方法。
- Obsidian 的插件生态系统是一个游戏规则改变者。它允许用户根据自己的具体需求来定制体验，而不会让他们被不需要的功能所淹没。这使得应用程序保持精简和高效，让你能够专注于真正想要完成的事情。
	- ==备注==： `Over the app` 的设计理念，让Obsidian变成了一个操作系统，你可以构建自己的「电脑应用」。
- 你投入了很多时间和精力去学习一种新工具，如果它比其他工具更有效，那就用它。
- 时间的延续和链接。
	- 现在如果你有一个系统来分类、排序它，并且最重要的是能够快速找到它，那么值得把一切写下来。
		- ==备注==：笔记、日历、习惯追踪等，随着时间的积累，看到变化和成长，可以链接、可以追溯。
	- 它只是提高了笔记、文档、知识和历史的效率。它总是可以用来回顾的一个地方。
- Roam 或 Obsidian 这样的节点平台。我发现这些平台非常适合发现和探索。它们提供了一种有机的方法论，可以让连接自然浮现。

#### 1.3.2 协作分享
- 局域网web server - 插件
- 导出PDF文件
- 拷贝到飞书/notion

#### 1.3.3 obsidian库同步
[超过1.5G笔记的同步秘籍：Obsidian用户的救星 \| 小卡 up 养成计划](https://www.xiaokaup.me/docs/knowledge-management/notes-management/obsidian-sync-solution-for-large-notes)
- 使用不同同步方案的问题整理

#### 1.3.4 Obsidian场景应用

[🗂️ 04 - Guides, Workflows, & Courses - Obsidian Hub - Obsidian Publish](https://publish.obsidian.md/hub/04+-+Guides%2C+Workflows%2C+%26+Courses/%F0%9F%97%82%EF%B8%8F+04+-+Guides%2C+Workflows%2C+%26+Courses)
##### 1.3.4.1 计划管理
[Fetching Title#4h1p](https://www.youtube.com/watch?v=vkfR0opKo7s)
[Obsidian Dashboard Setup: Plan & Track Your Life in 2024 With Obsidian(Showcase)](https://www.youtube.com/watch?v=8rCveomZHDQ)
##### 1.3.4.2 项目管理

##### 1.3.4.3 知识管理
[for Knowledge Management - Obsidian Hub - Obsidian Publish](https://publish.obsidian.md/hub/04+-+Guides%2C+Workflows%2C+%26+Courses/for+Knowledge+Management)

##### 1.3.4.4 习惯追踪
[Title Unavailable \| Site Unreachable](https://www.youtube.com/watch?v=ubkzPh29qyw)
[The Ultimate Habit & Goal Tracker System For Obsidian](https://www.youtube.com/watch?v=gsMefeIQ2d4&t=71s)
[How To Use Obsidian: Change Your LIFE With This Plugin - YouTube](https://www.youtube.com/watch?v=FH7_xOpOaqk)
[How To Use Obsidian: Create A Habit Tracker & Reach Your 2025 Goals - YouTube](https://www.youtube.com/watch?v=v4R4_QbosP4)

##### 1.3.4.5 写小说
[for Creative Writing - Obsidian Hub - Obsidian Publish](https://publish.obsidian.md/hub/04+-+Guides%2C+Workflows%2C+%26+Courses/for+Creative+Writing)

##### 1.3.4.6 学术写作
[for Academic Writing - Obsidian Hub - Obsidian Publish](https://publish.obsidian.md/hub/04+-+Guides%2C+Workflows%2C+%26+Courses/for+Academic+Writing)

##### 1.3.4.7 CRM
[How to use Obsidian as CRM with Dataview and Metadata Menu! - YouTube](https://www.youtube.com/watch?v=KOw_LtMgMlQ)
[我如何使用Obsidian进行人脉管理-  Youtube](https://www.youtube.com/watch?v=uUXboohUr5o)
[How To Use Obsidian: Build a Simple & Powerful CRM for Solopreneurs & Salespeople - YouTube](https://www.youtube.com/watch?v=FemBHQ6Rq94)
##### 1.3.4.8 求职和ATS
[Job Hunting with Obsidian \| reddit.com](https://www.reddit.com/r/ObsidianMD/comments/17y5n71/job_hunting_with_obsidian/)
##### 1.3.4.9 特定职业：医生、律师、销售
[for Specific Professions - Obsidian Hub - Obsidian Publish](https://publish.obsidian.md/hub/04+-+Guides%2C+Workflows%2C+%26+Courses/for+Specific+Professions)

[Dashboard and workflow for Obsidian at work (sales) - Share & showcase - Obsidian Forum](https://forum.obsidian.md/t/dashboard-and-workflow-for-obsidian-at-work-sales/34794)
- 销售
##### 1.3.4.10 游戏爱好者
[for TTRPG - Obsidian Hub - Obsidian Publish](https://publish.obsidian.md/hub/04+-+Guides%2C+Workflows%2C+%26+Courses/for+TTRPG)

## 2 子项目

```dataview
table without id 
  file.link as 项目名称,
  client as 客户,
  status as 状态,
  stars as 紧急程度,
  start_date AS 启动时间,
  stop_date AS 停止时间,
  round(max((date(today) - date(start_date)).days, 0)) + "天" AS 已启动
from ""
where project AND contains(project, link(this.file.name)) AND icontains(tags, "Project") AND file.name != this.file.name
sort stars desc, file.ctime desc
```

## 3 相关日记
```dataview
table without id
  file.link as 日期,
  regexreplace(L.text, "#\S+", "") as 内容
from "00Journal/01DailyNotes"
flatten file.lists as L
where contains(L.text, "[[" + this.file.name + "]]") 
```

## 4 相关条目

```dataview
list without id 
from ""
where icontains(project, link(this.file.name)) AND contains(tags, "note")
sort stars desc, file.ctime desc
```

