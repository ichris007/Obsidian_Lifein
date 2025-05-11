---
source: "https://www.edony.ink/how-creating-content-with-the-help-of-obsidian/"
tags:
  - "ToRead"
---
Obsidian 是我主要写东西的地方，为了有条不紊地进行松烟阁文章的输出，我借助 Obsidian 构建了自己的写东西的日常流程：

![](https://www.edony.ink/content/images/2024/07/image-7.png)

*P.S. 上面这张图是用 mermaid 语法直接在 Obsidian 中画的*

## 1 Plan in Dashboard

为了能够流程化管理在 Obsidian 的写作，我构建了用于管理写作的 Dashboard 模版，该模版基于 markdown 语法和插件所以完全可以复用到其他类似的场景（后续会开源到 [pkm template](https://github.com/edony-ink/pkm-template?ref=edony.ink)），这个模版的目标是 All-in-one 来管理、展示、监测自己 Newsletter 相关的内容输出。

![](https://www.edony.ink/content/media/2024/07/dashboard-template_thumb.jpg)

### 1.1 timeline

我的 Newsletter 是周更，所以我会按照每周更新制定时间轴 Timeline，本质上就是按照时间维度展开的 todo list，当我有想写的主题的时候就会加入到 Timeline 中作为待办项。

![](https://www.edony.ink/content/images/2024/07/image-8-1.png)

### 1.2 status

Timeline 上会标注状态，总体分为两类：1.文章状态；2.任务状态；

![](https://www.edony.ink/content/images/2024/07/image-9-1.png)

### 1.3 materials

平时一些灵感闪现或者读到一些好的文章段落会在 [memos](https://twitter.edony.ink/?ref=edony.ink) 记录下来，在写文章的时候会把 memos 作为自己的素材储备的地方之一，Dashboard 里面通过 iframe 集成 memos 方便快速查看：

![](https://www.edony.ink/content/images/2024/07/image-10-1-1.png)

还有一个很重要的素材积累的方法就是 Obsidian vault 的一些笔记，Personal Assistant 支持通过 local graph 查看笔记的关联内容，往往帮助自己进行深入地结构化地思考。

### 1.4 records

**日常做思考记录的时候会有专题化的灵感记录（例如灵感记录，idea 备忘，主题回顾，专题思考等），我将它们称为 fleeting thoughts**。面对一闪而过的灵感，我会尽快地将 fleeting thoughts 记录下来，同时由于专题化的，所以一些结构化的内容需要自动化完成，灵感记录之后有一个很重要的步骤就是对灵感记录的反思整理以及内化，这就需要一个集中浏览和回顾的地方。针对 fleeting thoughts 记录场景，Personal Assistant 插件提供自动化、结构化在指定目录创建记录的功能，结合 Templater 插件为可以配置对应的结构化模版，自动化的创建笔记，让使用专注于记录灵感内容。

![](https://www.edony.ink/content/media/2024/07/personal-assistant-record-in-specific-catalog-1_thumb.jpg)

### 1.5 statistics

写东西有时候会很枯燥，所以为了鼓励自己，我会看看 Personal Assistant 帮我做的写作数据统计，鼓励一下自己持续输出吧！

![](https://www.edony.ink/content/media/2024/07/personal-assistant-show-statistics-1_thumb.jpg)

## 2 Auto Publish

内容写完、校验完之后就可以发布了，我个人的观点是发布这件事情能自动化就自动化。

### 2.1 Ghost Publish

得益于自己开发的 Ghost Webhook 功能可以做到自动化发布内容，我直接使用 `Send to Ghost` 插件来完成，这里不得不提一下 Obsidian 的优点，基本上你的需求都可以去它的插件库找一下，你有的需求别人肯定也有而且还开发出插件来了。

![](https://www.edony.ink/content/media/2024/07/auto-publish-ghost_thumb.jpg)

### 2.2 Zapier

最后要解决的问题就是「一次编辑，N 个平台发布」，这样就可以做到的在多个内容平台无缝同步发表和推广内容，减少重复性工作，提高内容发布效率与管理效率。由于涉及到多个平台 ghost、facebook pages、x、telegram、slack 等，Zapier 这种 automated workflows 更加适合：

![](https://www.edony.ink/content/images/2024/07/image-11.png)

以上就是正在使用的基于 Obsidian 的创作管理流程，后续会将这一套模版更新到 GitHub，敬请期待。