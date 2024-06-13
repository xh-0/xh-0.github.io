---
title: uniApp分包
author: xh
date: 2024/05/24 20:00
categories:
  - uniApp
---

# uniApp 分包

## 怎么个事

最近在做的 uniapp 的项目，打包发版微信小程序的时候，没有发布成功，报错了个信息。

![](http://cdn.jsdelivr.net/gh/xh-0/picture-bed/blog/uniapp-fenbao-error.png)
```
Error: 系统错误，错误码：80051,source size 2803KB exceed max limit 2MB
[20240524 16:03:27][wxfaf4457c99680602] [1.06.2402040][win32-x64]

```

单个程序包体积过于大，上传不了，所以要分包，分包后，小程序的体积会变小，启动速度也会变快。

## 如何配置

查阅了相关资料后，加上亲身实践，得出了以下结论。

### 在 manifest.json 中，添加该配置信息

```
 "mp-weixin" : {
    "optimization" : { "subPackages" : true }
  },

```

### 项目目录结构，将项目进行目录划分，分为主包和子包目录

```
┌─pages
│  ├─index
│  │  └─index.vue
│  └─login
│     └─login.vue
├─pagesA
│  ├─static
│  └─list
│     └─list.vue
├─pagesB
│  ├─static
│  └─detail
│     └─detail.vue
├─static
├─main.js
├─App.vue
├─manifest.json
└─pages.json
```

### 需要在 pages.json 中填写

```
{
  // 主包路径
	"pages": [{
		"path": "pages/index/index",
		"style": { ...}
	}, {
		"path": "pages/login/login",
		"style": { ...}
	}],
  // 分包路径
	"subPackages": [{
		"root": "pagesA",
		"pages": [{
			"path": "list/list",
			"style": { ...}
		}]
	}, {
		"root": "pagesB",
		"pages": [{
			"path": "detail/detail",
			"style": { ...}
		}]
	}],
  // 预加载分包，执行页面
	"preloadRule": {
		"pagesA/list/list": {
			"network": "all",
			"packages": ["__APP__"]
		},
		"pagesB/detail/detail": {
			"network": "all",
			"packages": ["pagesA"]
		}
	}
}

```

[查看uniapp官方参考文档](https://uniapp.dcloud.net.cn/collocation/pages.html#subpackages)
