---
书名: <% tp.file.title %>
副标题: {{subTitle}} 
状态: <% tp.system.suggester(["在读","将读","想读","已读"],["在读","将读","想读","已读"],false, "选择书籍状态") %>
作者: {{author(ArrayType2)}} 
译者: {{translator(ArrayType2)}}
出版社: {{publisher}} 
出版时间: {{yearPublished}} 
开始时间: <% tp.date.now() %>
读完时间: 
总页数:  {{totalPage}} 
已读页数:
  - 0
我的评分:  {{myRating}} 
复读: 0
介质: <% tp.system.suggester(["纸书","电子书"],["纸书","电子书"],false, "选择书籍类型") %>
封面: {{image}} 
豆瓣页面:  {{url}} 
豆瓣评分: {{score}} 
ISBN:  {{isbn}} 
tags:
  - book
  - 书籍
领域: 
分类: 
书库现存: <% tp.system.suggester(["有","无"],["有","无"],false, "选择书库是否有此书") %>
我的评论: {{myComment}}
---
## 1 书籍信息

> [!bookinfo]+ **《{{title}}》**
> ![bookcover|200]({{image}})
>
|  字段  |                                                               值                                                                |
| :--: | :----------------------------------------------------------------------------------------------------------------------------: |
|  作者  |                                                           {{author(ArrayType2)}}                                       |
| ISBN |                                                            {{isbn}}                                                            |
| 出版年  |                                                       {{yearPublished}}                                                        |
| 出版社  |                                                         {{publisher}}                                                          |
|  来源  |                                                      [{{title}}]({{url}})                                                      |
|  评分  |                                                           {{score}}                                                            |
|  页码  |                                                         {{totalPage}}                                                          |
|  分类  |                                                       `=this.file.etags`                                                       |
| 阅读进度 | `=("<div class='baiFenBi' style='--precent:"+ (round((reverse(this.file.link.已读页数)[0]/this.file.link.总页数)*100))+ ";'></div>")` |
| 我的评级 |                                                     {{myRating}}                                                     |

> [!abstract]- **内容简介**
>
《{{title}}》
{{desc}}

## 2 微信读书笔记

```dataview
TABLE without id
	file.folder  AS 目录,
	file.link AS 书名,
	author AS 作者,
	noteCount AS 笔记数量,
	reviewCount AS 评论数量,
	file.cday AS 创建时间,
	file.mday AS 修改时间
FROM "05Books/weread"
WHERE icontains(
	replace(replace(replace(lower(file.name), " ", ""), "-", ""), "_", ""),
	replace(replace(replace(lower(this.file.name), " ", ""), "-", ""), "_", "")
)
SORT contains(file.folder, "05Books/w e re a d") DESC, file.mday DESC
```

## 3 我的评论

 {{myComment}}

## 4 延伸阅读

<% await tp.file.move("/05Books/" + tp.file.title) %>

