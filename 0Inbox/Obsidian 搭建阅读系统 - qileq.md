---
source: "https://qileq.com/225/"
tags:
  - "ToRead"
---
共计 2479 个字符，预计需要花费 7 分钟才能阅读完成。

笔者使用过 [Calibre](https://calibre-ebook.com/) 和 [Koodo Reader](https://koodo.960960.xyz/en) 来管理书籍，但笔者大量阅读记录都是在微信读书中完成，将阅读笔记和想法同步到这两款软件是一个较繁琐的事情；另外有些书只有 Web 版本，并无 epub 或 mobi 等电子版，如何将这种类型的书记录下来也是一个问题。

笔者对于个人阅读系统的需求如下：

1. 方便快捷的同步微信读书、Kindle 的书籍和笔记
2. 支持显示无出版信息的阅读资源，如 newsletter、部分图书（如 [Make Something Wonderful](https://book.stevejobsarchive.com/)）等
3. 能方便的编辑书籍信息

在使用 Obsidian 一段时间后，笔者就开始思考如何使用 Obsidian 来管理自己的阅读清单。其中 [Minimal Theme](https://github.com/kepano/obsidian-minimal) 支持以卡片形式展示书籍和电影：  
![Obsidian 搭建阅读系统](https://cdn.qileq.com/image/2024/10/08140059119825bb5cc5d39d70269dcc.png "Obsidian 搭建阅读系统")  
但笔者并不习惯使用该主题，故尝试自行构建阅读系统。整个过程并不复杂，除了[前文](https://qileq.com/223/#%E9%98%85%E8%AF%BB%E6%B8%85%E5%8D%95)描述的将正在阅读中的书籍和待读 newsletter 展示在首页。笔者还对已读清单和待读清单进行了整理。

## 1 阅读来源  

笔者的阅读来源主要是[书籍](https://qileq.com/books/)，其次是 newsletter、Twitter、微信公众号、知乎等泛读类信息，如何将这些阅读记录都保存下来呢？这里介绍下笔者的操作方法。

## 2 书籍  

阅读书籍占了笔者平时阅读近一半的时间，也是笔者每年的[年度目标](https://qileq.com/252/#2022-%E5%B9%B4%E5%BA%A6%E6%80%BB%E7%BB%93)之一。

### 2.1 阅读工具  

笔者以前使用 Kindle 做为阅读工具，这两年使用微信读书阅读书籍。

### 2.2 来源  

目前阅读的大多数中文书籍在微信读书中都能找到，但随着阅读量的增加，发现微信读书很大的一个问题是书籍少，原因之一是很多书籍（尤其是英文书籍）在国内并未出版，其次是部分书籍就算国内已出版但微信读书还没有入版权。对于这部分书籍，笔者目前的做法是下载好 epub 或 mobi 格式后的书籍再上传到微信读书中；对于少量无 epub 和 mobi 格式的书籍，笔者会创建笔记手动记录书籍信息。

### 2.3 清单  

1. 对于微信读书中的书籍和上传到微信读书的书籍，可以使用 [Obsidian Weread Plugin](https://github.com/zhaohongxuan/obsidian-weread-plugin) 来同步书籍信息和读书笔记。
2. 对于豆瓣中的书籍，可以使用 [Obsidian Douban Plugin](https://github.com/Wanxp/obsidian-douban) 来同步书籍信息。
3. 对于少量自行维护的书籍，笔者创建了[书籍模板](https://qileq.com/211/#%E5%88%9B%E5%BB%BA%E6%A8%A1%E6%9D%BF)进行管理。

无论是 Obsidian Weread Plugin 使用的模板还是自定义的书籍模板，都至少包括如下元信息字段：书籍名、书籍封面、作者、标签、阅读状态、评分、优先级、阅读时间和 ISBN 等。笔者根据这些元信息维护了三份书籍清单：待读清单、阅读中清单和已读清单，这三份清单都是使用 [Dataview](https://qileq.com/213/) 展示。

对于使用 Minimal 主题的用户而言，可参数[这里](https://github.com/zhaohongxuan/obsidian-weread-plugin/wiki/%E4%BD%BF%E7%94%A8Dataview%E8%BF%9B%E8%A1%8C%E4%B9%A6%E7%B1%8D%E7%AE%A1%E7%90%86)看下使用 Minimal 主题展示书籍的方法。

对于非 Minimal 主题的用户而言，如果想以卡片形式展示书籍，可参考 Minimal 主题的 Card 自行修改 CSS 样式。

如果只是想简单展示书籍清单，可以使用 [Vault Explorer](https://qileq.com/221/#vault-explorer) 来快速实现，效果如下：  
![Obsidian 搭建阅读系统](https://cdn.qileq.com/image/2025/01/214ec20d5c9f83f04ef3796bc48b0eee.webp "Obsidian 搭建阅读系统")

如果觉得样式不是自己喜欢的样式，可修改 CSS 样式进行美化。

#### 2.3.1 阅读中清单  

阅读中清单列出目前正在阅读的书籍，笔者主要使用主题阅读法阅读书籍，并且会采用跳读、略读待方法，所以同一时间会有多本书籍处于阅读中的状态：  
![Obsidian 搭建阅读系统](https://cdn.qileq.com/image/2024/10/02285bc692aa29bd2a914b7c6fcc41b6.webp "Obsidian 搭建阅读系统")

这部分书籍信息同时显示在[首页的阅读清单](https://qileq.com/223/#%E9%98%85%E8%AF%BB%E6%B8%85%E5%8D%95)中，当点击 **Done** 按钮时，会自动将阅读状态标记成完成，并将书籍从“阅读中清单”移到“已读清单”。

#### 2.3.2 待读清单  

待读清单记录了笔者想读的书籍，笔者会从微信读书排行榜、豆瓣读书排行榜和社交媒体获取待读清单：  
![Obsidian 搭建阅读系统](https://cdn.qileq.com/image/2024/10/979990e9df2eaa40287aa4cfda2374e3.webp "Obsidian 搭建阅读系统")

当点击 **Reading** 按钮时，会自动将阅读状态标记成阅读中，并将书籍从“待读清单”移到“阅读中清单”。

#### 2.3.3 已读清单  

已经读完的书籍会被标记为完成状态，并标记完成时间，然后根据年份分组，组内按评分排序显示：  
![Obsidian 搭建阅读系统](https://cdn.qileq.com/image/2024/10/bba8e1dcbbf65454a78d1ac8bb058287.webp "Obsidian 搭建阅读系统")

### 2.4 高亮和笔记  

点击上述阅读清单中的书名，会进入到对应的书籍笔记页面，高亮和笔记由 Obsidian Weread Plugin 同步自微信读书。对于一些有深刻感悟的高亮文字，笔者还会创建单独的思考笔记，思考笔记主要是一类话题的归纳总结，可能会包括多本书籍和日常感悟，主要用于构建[个人系统](https://qileq.com/series/personal-system/)。对于部分评分较高的书籍，笔者还会根据读书笔记和感悟整理出思维导图，并更新在本网站的[书籍](https://qileq.com/books/)页面。

## 3 newsletter  

笔者关注了一些 [newsletter](https://qileq.com/wiki/newsletters/) 并创建了一个 newsletter 模板。对于一些内容优质的 newsletter 文章，笔者会通过模板创建新笔记，再将整篇文章复制保存到笔记中，然后通过 Dataview 得到一份 newsletter 阅读清单（即[首页阅读清单](https://qileq.com/223/#%E9%98%85%E8%AF%BB%E6%B8%85%E5%8D%95)中的 newsletter 部分）：  
![Obsidian 搭建阅读系统](https://cdn.qileq.com/image/2024/10/dddffc317f49df5f9832e9b12c0f38cd.webp "Obsidian 搭建阅读系统")

### 3.1 英语精读  

对于部分单词难度适中的 newsletter 文章，笔者会精读学习英语。为此创建了一个词汇模板，包括单词音标、释义、固定搭配、同义词和反义词，效果如下：  
![Obsidian 搭建阅读系统](https://cdn.qileq.com/image/2024/10/5d45e0a91c6ceba24243963819f6f5de.webp "Obsidian 搭建阅读系统")

对于需要记忆的单词，笔者目前通过 [Spaced Repetition](https://github.com/st3v3nmw/obsidian-spaced-repetition) 进行重复记忆，当然你也可以通过 [Obsidian\_to\_Anki](https://github.com/Pseudonium/Obsidian_to_Anki) 同步到 Anki 记忆。

## 4 其它媒体内容  

对于 Twitter、微信公众号和知乎等媒体内容而言，可以使用如下软件和插件同步到 Obsidian：

1. 若使用 Pocket 和 Instapaper 等 Read Later 的工具，可使用 [Read Later](https://github.com/Canna71/obsidian-readlater) 将阅读内容同步到 Obsidian，然后在 Obsidian 上做笔记；若希望同步这些 Read Later 工具的高亮内容和笔记，可使用 Readwise/Matter 等进行同步。
2. 若使用 [Raindrop](https://raindrop.io/) ，可使用 [Obsidian Raindrop Plugin](https://github.com/mtopping/obsidian-raindrop) 或 [Obsidian Raindrop Highlights Plugin](https://github.com/kaiiiz/obsidian-raindrop-highlights-plugin) 同步高亮内容。
3. 若使用 [Matter](https://hq.getmatter.com/)，可使用 [Matter Obsidian Plugin](https://github.com/getmatterapp/obsidian-matter) 将高亮同步到 Obsidian。
4. 若使用 [Readwise](https://readwise.io/)，则可使用 [Readwise Official](https://github.com/readwiseio/obsidian-readwise) 插件来同步高亮和笔记。

这部分笔记和读书笔记一样，可整理归纳到思考笔记中更新个人系统。

以上内容简单的介绍了笔者如何通过 Obsidian 打造个人阅读系统，该系统目前仍在不断更新完善中，以适应笔者的需求。可以看到，不管是书籍还是 newsletter 等，笔者均使用了输入–整理–更新知识体系–输出的流程来提升自己的理解。如果你有更好的建议，欢迎在评论区留言告诉我。