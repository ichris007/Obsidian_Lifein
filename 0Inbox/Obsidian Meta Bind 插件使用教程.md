---
source: https://blog.csdn.net/gitblog_00102/article/details/142811504
tags:
  - ToRead
status:
  - ToRead
modified date: 2025-05-24 20:39:15
---

```meta-bind
SELECT[更改阅读状态]:
  field: status
  options: [ToRead, Reading, Read]
  placeholder: 请选择状态
  multiple: false
```




最新推荐文章于 2025-03-25 23:21:14 发布

[邴富畅Pledge](https://blog.csdn.net/gitblog_00102 "邴富畅Pledge") 于 2024-10-10 08:52:28 发布

版权声明：本文为博主原创文章，遵循 [CC 4.0 BY-SA](http://creativecommons.org/licenses/by-sa/4.0/) 版权协议，转载请附上原文出处链接和本声明。

本文链接： [https://blog.csdn.net/gitblog\_00102/article/details/142811504](https://blog.csdn.net/gitblog_00102/article/details/142811504)

版权

## 1 Obsidian Meta Bind 插件使用教程

[obsidian-meta-bind-plugin A plugin for Obsidian to make your notes interactive with inline input fields, metadata displays, and buttons. 项目地址: https://gitcode.com/gh\_mirrors/ob/obsidian-meta-bind-plugin](https://gitcode.com/gh_mirrors/ob/obsidian-meta-bind-plugin/?utm_source=artical_gitcode&index=top&type=card& "obsidian-meta-bind-plugin")

### 1.1 1\. 项目介绍

Obsidian Meta Bind 是一个为 Obsidian 笔记应用开发的插件，旨在使你的笔记更加互动。通过该插件，你可以在笔记中创建内联输入字段、元数据展示（视图字段）和按钮。这些输入和视图字段可以绑定到笔记的前置属性（frontmatter properties），从而保持与这些属性的同步。这使得你可以在笔记中直接编辑和查看前置属性。

例如，你可以创建一个切换按钮，该按钮绑定到一个名为 `done` 的前置属性，通过简单的内联代码块 `INPUT[toggle:done]` ，当你点击切换按钮时， `done` 属性会在 `true` 和 `false` 之间切换。

### 1.2 2\. 项目快速启动

#### 1.2.1 安装插件

##### 1.2.1.1 通过 Obsidian 市场安装（推荐）

1. 打开 Obsidian 设置 -> 社区插件。
2. 点击“浏览”按钮。
3. 搜索 `Meta Bind` 。
4. 选择 `Meta Bind` 并点击“安装”，然后点击“启用”。

##### 1.2.1.2 通过 BRAT 安装（适用于 Canary 版本）

1. 安装并启用 BRAT 插件。
2. 运行 BRAT: Plugins: Add a beta plugin for testing 命令。
3. 输入 `https://github.com/mProjectsCode/obsidian-meta-bind-plugin` 到文本框中。
4. 点击“添加插件”。

#### 1.2.2 使用插件

在笔记中使用以下代码块来创建一个绑定到前置属性的切换按钮：

```markdown
INPUT[toggle:done]
markdown
```

当你点击这个按钮时，前置属性 `done` 的值会在 `true` 和 `false` 之间切换。

### 1.3 3\. 应用案例和最佳实践

#### 1.3.1 案例1：任务管理

假设你有一个任务列表笔记，你可以使用 Meta Bind 插件来创建一个交互式的任务列表。每个任务都有一个 `done` 属性，通过 `INPUT[toggle:done]` 来切换任务的完成状态。

```markdown
# 任务列表

 

- [ ] 任务1 INPUT[toggle:task1_done]

- [ ] 任务2 INPUT[toggle:task2_done]

- [ ] 任务3 INPUT[toggle:task3_done]

markdown
```

#### 1.3.2 案例2：笔记元数据展示

你可以使用 Meta Bind 插件来展示笔记的元数据。例如，展示笔记的创建日期和最后修改日期。

```markdown
# 笔记元数据

 

创建日期: VIEW[date:created]

最后修改日期: VIEW[date:modified]
markdown
```

### 1.4 4\. 典型生态项目

#### 1.4.1 Dataview

Dataview 是另一个 Obsidian 插件，它允许你以编程方式查询和展示笔记中的数据。结合 Meta Bind 插件，你可以创建更加动态和交互式的笔记。

#### 1.4.2 Templater

Templater 是一个强大的模板插件，允许你创建和使用模板来快速生成笔记。结合 Meta Bind 插件，你可以在模板中嵌入交互式元素，从而提高笔记的灵活性和互动性。

通过这些生态项目的结合，你可以构建出功能更加丰富和强大的 Obsidian 工作流。

[obsidian-meta-bind-plugin A plugin for Obsidian to make your notes interactive with inline input fields, metadata displays, and buttons. 项目地址: https://gitcode.com/gh\_mirrors/ob/obsidian-meta-bind-plugin](https://gitcode.com/gh_mirrors/ob/obsidian-meta-bind-plugin/?utm_source=artical_gitcode&index=bottom&type=card& "obsidian-meta-bind-plugin")

  

显示推荐内容

打赏作者

邴富畅Pledge

你的鼓励将是我创作的最大动力

¥1 ¥2 ¥4 ¥6 ¥10 ¥20

扫码支付： ¥1

获取中

扫码支付

您的余额不足，请更换扫码支付或 [充值](https://i.csdn.net/#/wallet/balance/recharge?utm_source=RewardVip)

打赏作者

实付 元

[使用余额支付](https://blog.csdn.net/gitblog_00102/article/details/)

点击重新获取

扫码支付

钱包余额 0

抵扣说明：

1.余额是钱包充值的虚拟货币，按照1:1的比例进行支付金额的抵扣。  
2.余额无法直接购买下载，可以购买VIP、付费专栏及课程。

[余额充值](https://i.csdn.net/#/wallet/balance/recharge)

举报