# Github中国区排名历史

> 通过Github Action每天会自动搜索 Github 中 Location 字段里包含 China 的前1000名用户，并生成json数据文件。

![poster](README.assets/poster.jpg)

<p>

[![Bilibili](https://img.shields.io/badge/dynamic/json?labelColor=FE7398&logo=bilibili&logoColor=white&label=哔哩哔哩&color=00aeec&query=%24.data.totalSubs&url=https%3A%2F%2Fapi.spencerwoo.com%2Fsubstats%2F%3Fsource%3Dbilibili%26queryKey%3D422646817)](https://space.bilibili.com/422646817)
[![Juejin](https://img.shields.io/badge/dynamic/json?label=稀土掘金&logo=bytedance&logoColor=white&query=%24.data.follower_count&url=https%3A%2F%2Fapi.juejin.cn%2Fuser_api%2Fv1%2Fuser%2Fget%3Fuser_id%3D2955079655898093)](https://juejin.cn/user/2955079655898093)
[![Github Stars](https://img.shields.io/github/stars/ezshine?color=faf408&label=Github%20Star&logo=github)](https://github.com/ezshine)
[![Wechat](https://img.shields.io/badge/-%E5%A4%A7%E5%B8%85%E8%80%81%E7%8C%BF-07c160?logo=wechat&logoColor=white&label=公众号)](https://open.weixin.qq.com/qr/code?username=ezfullstack)
[![Twitter](https://img.shields.io/twitter/url/https/twitter.com/ezshine.svg?style=social&label=Follow%20%40ezshine)](https://twitter.com/ezshine)
![YouTube Channel Subscribers](https://img.shields.io/youtube/channel/subscribers/UCNxA8E0jYm1vGTz0otLh4Lg)
  
</p>


## 使用说明



### 直接使用

直接使用  json 文件，用于做一些本地数据分析，或者通过URL直接读取json静态文件，如果你所在的地方没有GFW的话。



### 推送到自己的接口

1. fork本仓库
2. 进入github的设置，生成PAT，在 secrets 中填入 MYTOKEN
3. 你需要有一个接口URL，在 secrets 中填入 POSTURL，CI爬取到数据生成JSON文件前会通过POST 提交 给接口。入参如下：

~~~
record_date:data.record_date,//记录日期
total_users:data.total_users,//当日中国区总计人数
rank_list:data.rank_list//1000条排名数据
~~~



# **Enjoy！**

觉得不错的小伙伴记得follow我哟 ，我也想冲排名~
