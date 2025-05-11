---
area: 个人成长
category:
  - Obsidian
status:
  - 已完成
tags:
  - note
  - Obsidian
aliases: 
stars: 3星级
modified date: 2025-05-10 02:23:23
cssclasses:
  - hide-properties
---
## 1 新手入门

### 1.1 基本知识

- [[黑曜石崇拜：为什么人们痴迷于此款笔记应用程序]]
- Obsidian编辑必读[[MarkDown超级教程]]

### 1.2 Obsidian目录说明

一个成熟的Obsidian库目录大概如下：
```fold
Obsidian
├── .obsidian
│   ├── app.json
│   ├── appearance.json
│   ├── community-plugins.json
│   ├── core-plugins.json
│   ├── daily-notes.json
│   ├── graph.json
│   ├── hotkeys.json
│   ├── multicolor.json
│   ├── page-preview.json
│   ├── plugins
│   ├── snippets
│   ├── switcher.json
│   ├── templates.json
│   ├── themes
│   ├── workspace
│   └── workspaces.json
├── .trash
├── .vault-stats
├── 00Dashboard
│   └── homepage.md
├── Attachments
├── Settings
├── Templates
└── 从这里开始.md
```

其中带`.`的是隐藏文件，在Obsidian打开之后是看不到的，不过都非常重要，我简单介绍一下各个文件目录以及用途：

- `.obsidian`：存放Obsidian所有应用配置相关的内容。
    - `plugins`：所有安装的`插件`都会存放在这个目录，如果你要手动安装插件，可以通过将插件放到这个目录，让Obsidian加载。
    - `snippets`：Obsidian允许用户添加一些自定义`CSS片段`对视图进行自定义，是一种常用的定制和美化方法。
    - `themes`：主题文件，与插件一样，我们安装过得主题都会存放置在这个目录下。
- `.trash`：Obsidian系统自己的回收站，我们可以配置Obsidian删除的文件存放在这里，以便与系统回收站的垃圾信息进行区隔。
- `00Dashboard`：往下的文件都是我们自己定义的文件夹/文件，用于存放及管理我们自己的笔记。
- `Attachments`：建议大家创建一个此目录，用于存放所有的附件，如图片、文件（如PDF）、音频、视频等内容。
- `Settings`：建议大家也创建一个这样的目录，用于存放Obsidian使用过程中需要保存的一些配置，比如模板、脚本等。
- `Templates`：之所以把模板文件夹放在一级目录，而不是`Settings`里，是因为使用Obsidian过程中，常常会新增、修改模板，放在一级目录好操作。

## 2 高手探索：Obsidian资源

遇到问题，可搜索范围包括但不限于Obsidian官方论坛、YouTube、medium、Reddit、Discord、GitHub、Obsidian达人个人网站。

另外，通过AI工具可以解决大部分问题。
<u>科叔不是程序员，但是用AI实现了很多定制化配置。</u>

~~~tabs

---tab官方资源
- [obsidian开发计划](https://trello.com/b/Psqfqp7I/obsidian-roadmap)：用来查看 Obsidian 团队现在在干嘛，有什么计划。
- [obsidian英文论坛](https://forum.obsidian.md/)：最早成立的论坛，积累的资源数量和质量都是最高的，也是 Obsidian 提出功能需求，反馈 Bug 最主要的平台。
- [obsidian中文论坛](https://forum-zh.obsidian.md/)：后续成立的论坛，但活跃度比英文论坛差上不少，主要用于国内用户自发交流。
- [Home - Obsidian Help](https://help.obsidian.md/)：Obsidian 官方维护的教程和文档。
- [Obsidian Hub](https://publish.obsidian.md/hub/00+-+Start+here)：由 Obsidian社区维护的实验 Vault。有丰富的资源。
- [Obsidian中文帮助](https://publish.obsidian.md/help-zh/) 非官方，但是内容很翔实。
---tab社群
- [discord官方讨论群](https://discord.com/invite/veuWUTm)：Obsidian 信息资源时效性最高的地方，可以在这获取最新的版本更新，插件更新，插件上架信息等。目前有近 10 万人，可惜不好访问。
- [Obsidian@reddit](https://www.reddit.com/r/ObsidianMD/) 很活跃，全球网友分享自己的使用技巧、心得和实例。
---tab YouTube资源
[Linking Your Thinking with Nick Milo - YouTube](https://www.youtube.com/@linkingyourthinking)
[August Bradley - YouTube](https://www.youtube.com/user/augustbradley)
[Obsidian LifeOS Series (Journal, Habit Tracking, Cycles and Reviews) - YouTube](https://www.youtube.com/playlist?list=PLJJdpQJ7fSkZAakFPUYdndOdPU73bkxwn) 非常强大的日记和习惯追踪系统，有详细的设置教程
[LeanProductivity - Sascha D. Kasper - YouTube](https://www.youtube.com/@leanproductivity/videos) 一步步教你教你建库（CRM、旅游等库），插件使用方法详解
[Paul Dickson - YouTube](https://www.youtube.com/@PaulDickson7) 高质量视频
油管上几位讲 Obsidian最好的 youtuber
* 最好的是 [Nicole van der Hoeven](https://www.youtube.com/@nicolevdh)，先讲要解决一个什么问题，然后讲有几种方式解决，然后介绍插件，循序渐进。
* [FromSergio](https://www.youtube.com/@FromSergio) 没有废话，直接讲 use case，很实用。
* [Bryan Jenks](https://www.youtube.com/@BryanJenks) 长篇累牍，废话偏多。
* [Vicky Zhao](https://www.youtube.com/@VickyZhaoBEEAMP) 讲 ob 与卡片写作思路最清晰的。
* [Danny Hatcher](https://www.youtube.com/@DannyHatcherTech) 语速非常快，不讲解决什么问题，上手直接讲插件怎么设置，适合已经会使用插件，从他那借鉴一些其他思路的使用者。
---tab其它资源
- [PKMer知识管理爱好者社区](https://pkmer.cn)：国内 Obsidian 爱好者组建的知识管理平台，用于收集、汇总、分享和展示最有价值的知识管理信息，包括教程，工具使用和用法，工作流程，心得体会等。
	- [PKMer社区总结的资源](https://pkmer.cn/Pkmer-Docs/10-obsidian/obsidian/)
- [Obsidian文档咖啡豆版](https://coffeetea.top/) Obsidian入门指南及教程。
- [简睿学堂_B站](https://space.bilibili.com/1119961064/video) 、[簡睿隨筆_个人网站](https://jdev.tw/blog/category/software-and-tools/markdown) ：长期活跃和更新的简睿，分享了大量 Obsidian 初级和高级的用法，非常值得探索。
- [Johnny学-B站](https://space.bilibili.com/432408734)：优秀的 obsidian 教程。
[15 Example #Obsidian Vaults from Around the Internet \| Amerpie by Lou Plummer](https://amerpie.lol/2024/05/13/example-obsidian-vaults.html) 收集的网上Obsidian示例库（15个）
- [笔记软件 Obsidian 使用教程 & 学习资源汇总：从入门到精通](https://zhuanlan.zhihu.com/p/619960525)：搜集了大量不同类型的 Obsidian 资源类型，部分已经过时，瑕不掩瑜。
- [Obsidian周报-英文](https://www.obsidianroundup.org/)：由社区成员 Eleanorkonik 自发建立的 Obsidian 社区周报，总结和归纳最近一周在论坛，Discord 讨论和发布的最有价值的信息。同时也组织一些大佬做分享。
- [Obsidian Hub-英文](https://publish.obsidian.md/hub/00+-+Start+here)：国外 Obsidian 爱好者组建的知识管理平台，共建关于 Obsidian 的各种用法和技巧，分享使用心得，资源非常丰富。
- [Obsidian Resources - Knowledge management - Obsidian Forum](https://forum.obsidian.md/t/obsidian-resources/81835) Obsidian学习和实践的各种资源
- [Obsidian Observer-英文](https://medium.com/obsidian-observer)：由国外知名的工具爱好者 TftHacker 建立的 Obsidian 爱好者中心，分享大量关于 Obsidian 的使用和技巧。
- [大神TftHacker个人网站](https://tfthacker.com)
- [How to Take Smart Notes in Obsidian-英文](https://theknowledgeworker.substack.com/p/how-to-take-smart-notes-in-obsidian)：如何做笔记，针对《How to take smart notes》这本书的实践
- [我们看看 Obsidian CEO 怎么使用 Obsidian](https://mp.weixin.qq.com/s/ejzKlvHhflGVqa3pcXvEoA)
- [Obsidian Journey \| Tips, Workflows & Plugins for Power Users](https://obsidianjourney.com/) 大神级别
---tab 主题与CSS片段
Obsidian 可以通过主题（Theme）或 Snippets（CSS 片段）来美化界面或实现定制化布局。
[PKMer\_Obsidian 优秀外观分享](https://pkmer.cn/Pkmer-Docs/10-obsidian/obsidian%E5%A4%96%E8%A7%82/obsidian%E4%BC%98%E7%A7%80%E5%A4%96%E8%A7%82%E5%88%86%E4%BA%AB/)
- [kmaasrud](https://github.com/kmaasrud)的[awesome-obsidian](https://github.com/kmaasrud/awesome-obsidian)是一个非常全面的资源集合，包括但不限于CSS主题、Ob模板和插件等方面。
- [Dmytro-Shulha](https://github.com/Dmytro-Shulha)的[obsidian-css-snippets](https://github.com/Dmitriy-Shulha/obsidian-css-snippets)一个全面但简洁的Snippets集合，有很多最基础的样式修改片段，可以满足很多方面的需求。没有效果展示图。
- [r-u-s-h-i-k-e-s-h](https://github.com/r-u-s-h-i-k-e-s-h)的[Obsidian-CSS-Snippets](https://github.com/r-u-s-h-i-k-e-s-h/Obsidian-CSS-Snippets/tree/Collection/Snippets) 比较全的实用的css片段，每一类都给出了多种选择，并且有图片效果展示。
* [replete](https://github.com/replete)的[GitHub - replete/obsidian-minimal-theme-css-snippets](https://github.com/replete/obsidian-minimal-theme-css-snippets) 专门为minimal主题美化的css有分类，质量高，有图片展示。
* [ProudBenzene/Blue-Topaz-Legacy: A css snippet used to bring useful features in the BT theme to Obsidian non-Blue Topaz theme users](https://github.com/ProudBenzene/Blue-Topaz-Legacy) BT主题的样式文件css
* [GitHub - LiamSwayne/Obsidian-CSS-Snippets: A library of CSS snippets that customize the look of obsidian.](https://github.com/LiamSwayne/Obsidian-CSS-Snippets) 还在更新，分类清晰，数量不多，质量可以。
~~~


