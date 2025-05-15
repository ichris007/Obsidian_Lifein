---
name: {{title}} 
originalTitle: {{originalTitle}} 
aliases: {{aliases}} 
cover: {{imageData.url}}
douban_url: {{url}}
director: {{director}}
country: {{country}}
rating: {{score}}
year: {{datePublished}}
genre: {{genre}}
banner: {{imageData.url}}
status:
  - <% tp.system.suggester(["想看","将看","在看","已看"],["想看","将看","在看","已看"],false, "选择状态") %>
episode: {{episode}}
progress: 
已看时间: 
我的评价: <% tp.system.suggester(["有","无"],["有","无"],false, "是否自己写了感受/评价") %>
scoreStar: {{scoreStar}}
我的评分: {{myRating}}
我的评价: {{myComment}}
tags:
  - Movie
  - 影视
---

## 1 内容简介
**{{title}} [{{datePublished}}] | [ {{time}} ]** ![bookcover|inlR|220]({{imageData.url}})
{{desc}}
## 2 心得体会

<% await tp.file.move("/06Movies/" + tp.file.title) %>

