---
名称:
  "{ title }": 
封面:
  "{ imageData.url }": 
tags:
  - Movie
  - 影视
豆瓣页面:
  "{ url }": 
导演:
  "{ director }": 
豆瓣评分:
  "{ score }": 
上映时间:
  "{ datePublished }": 
影视类型:
  "{ genre }": 
banner:
  "{ imageData.url }": 
状态:
  - <% tp.system.suggester(["想看","将看","在看","已看"],["想看","将看","在看","已看"]) %>
集数:
  "{ episode }": 
已看集数: 
看完时间:
---
## 1 内容简介
**{{title}} [{{datePublished}}] | [ {{time}} ]** ![bookcover|inlR|220]({{imageData.url}})
{{desc}}
## 2 心得体会

<% await tp.file.move("/06Movies/" + tp.file.title) %>