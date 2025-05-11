---
modified date: 2025-05-08 18:24:24
number headings: off
aliases: 
category:
  - 系统设置
tags:
  - note
cssclasses:
  - bannerimg
  - hide-properties
obsidianUIMode: preview
---
![[Lifein_banner1.png##bannerimg]]

<br>

![[系统设置导航]]

## 内置的 cssclass 样式

| 文件名称    | cssclass          | 用法            |
| ------- | ----------------- | ------------- |
| 多个文件    | callouts-outlined | 对callout渲染出边框 |
| 主要是索引文件 | hide-properties   | 阅读模式下隐藏`属性`   |
| 主要是索引文件 | bannerimg         | 为页面增加banner图  |
| 日记文件    | daily             | 对日记文件样式美化     |

## 内置Snippets（CSS样式片段）

| 名称                         | 功能                                                                                                                                                                                                                                                                                     | 备注                                                   |
| -------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------- |
| 功能_图片位置与大小增强（Blue Topaz主题） | 增强图片展示样式                                                                                                                                                                                                                                                                               |                                                      |
| 功能_Callout样式（Blue Topaz主题） | 增强Callout展示样式                                                                                                                                                                                                                                                                          |                                                      |
| 功能_dvjs卡片式任务面版             | 实现卡片式任务面版样式                                                                                                                                                                                                                                                                            | 如[[Homepage\|首页]]、[[task_board]]、[[Projects_board]]  |
| 功能集_标题栏Tab和状态栏优化           | 1.方便从标题栏修改文件名<br>2.笔记路径和名称左对齐<br>3.显示笔记路径和名称<br>4.优化Tab Title，使其更紧凑<br>5.缩小固定标签页宽度<br>6.隐藏状态栏，鼠标悬停显示                                                                                                                                                                                   |                                                      |
| 功能集_侧边栏Sidebar相关优化         | 1.隐藏附件文件夹`Attachments`<br>2.紧凑的Sidebar Header<br>3.隐藏/显示文件浏览器顶部按钮<br>4.拖动窗口分割线时，显示柔和的分割线<br>5.为文件浏览器添加分割线<br>6.在左右侧边栏中不显示固定标签按钮📌<br>7.侧边栏笔记内容展示最大化<br>8.侧边栏文档图标自定义                                                                                                                    | 如，<br>6 & 7 & 8 应用于[[当日日程]]、[[快捷导航]]                 |
| 功能集_Callout相关              | 1.Callouts Outlined是一种更为简洁的 Callout样式<br>2.Callout实现Sidenote边注功能                                                                                                                                                                                                                       | 如[[Homepage\|首页]]                                    |
| 其它杂项css集                   | 1.OB设置面版拖动缩放<br>2.缩小左侧ribbon的宽度<br>3.调整弹出框宽度（Prompt model size）<br>4.淡化块引用ID<br>5.可滚动dateview查询结果（对于长表格显示友好）<br>6.命令面板样式（高亮关键词和选定行）<br>7.属性Properties变成两列（含属性自动折叠，鼠标悬停显示，需手动开启）<br>8.通过CSSClasses在阅读模式下隐藏属性面版<br>9.百分比进度条（不用访问外部资源）<br>10.激活窗口添加边框，显示当前聚焦的窗口<br>11.Markdown打印PDF样式<br> | 5.如[[我的书架]]、[[我的电影库]]<br>9.如书籍`05Books`目录下的书籍笔记的阅读进度 |
| daily                      | 日记文件样式美化                                                                                                                                                                                                                                                                               | 如日记目录`00Journal`下的笔记样式                               |
| Plugin_表格美化                | 美化Dataview渲染的表格样式                                                                                                                                                                                                                                                                      |                                                      |
| Plugin_MySnippets优化        | 美化MySnippets显示样式                                                                                                                                                                                                                                                                       |                                                      |
| Plugin_Tasks紧凑样式           | 使得Tasks插件渲染的任务列表更紧凑、美观                                                                                                                                                                                                                                                                 |                                                      |
| UI_Border主题标题样式            | `Border`主题的`H1-6`标题样式                                                                                                                                                                                                                                                                  |                                                      |
| UI_Dust Calendar美化         | 美化`Dust Calender`样式                                                                                                                                                                                                                                                                    |                                                      |
| UI_MCL Multi Column        | 通过`Callout`实现分栏样式                                                                                                                                                                                                                                                                      | 如[[Homepage]]                                        |
| UI_Minimal_Cards           | 将`dataview`表格渲染成卡片式布局（Minimal主题自带，其它主题单独使用）                                                                                                                                                                                                                                            | 如[[书架总览]]、[[电影库总览]]                                  |
| UI集_编辑及预览相关优化              | 1.修改page preview的popover框大小（预览悬浮框）<br>2.改善笔记链接超长网址编辑体验、临时禁用链接跳转<br>3.文字两端对齐<br>4.段、行间距(编辑/预览模式生效)<br>5.美化行内代码样式<br>6.嵌入embed样式 ：预览和编辑模式下的卡片样式<br>7.减小无序/有序列表在文字/标题后的空白<br>8.多彩有序/无序列表<br>9.下划线样式                                                                                       |                                                      |
| Vault_NewTab_logo          | 给库（Vault）和新建标签页（New Tab）加logo和背景图                                                                                                                                                                                                                                                      |                                                      |


## 相关条目
```dataview
list
from ""
where 
    category AND
    any(this.category, (c) => contains(category, c)) AND
    icontains(tags, "note") AND
    file.name != this.file.name
sort file.ctime desc
limit 10
```
