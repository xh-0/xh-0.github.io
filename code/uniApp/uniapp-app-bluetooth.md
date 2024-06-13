---
title: uniApp中低功耗蓝牙的使用
author: xh
date: 2024/06/13 20:00
categories:
  - uniApp
---

# 关于 uniApp 中低功耗蓝牙的使用

##

::: tip 来龙去脉
上周四下午正在写着代码的时候，突然被领导拉倒一个群里，说一个安卓 app，在最新安卓版本 14 版本上适配的时候，不能使用，看看我们怎么能解决么，然后就我一个前端，就问我能做一个 app 么，我安卓蓝牙这方面没有做过，就说不是很舒服这方便，页面的话好实现，功能方便就不好说了，然后总经理就问我们项目经理，能实现么，大约需要多长时间，项目经理就说两三天吧，WTF??? 直接给我上强度，3 天时间让我实现这个 app 功能，一个软件从 0-1，还打包发版，怎么办，赶紧研究一下试试吧。
:::

## 开搞

1. 新建一个 uniapp 项目
2. 申请一个安卓证书，打包时会使用 安卓证书别名、证书私钥密码、证书文件，都需要在本地保存好。[安卓证书说明](https://ask.dcloud.net.cn/article/35985)，
3. 然后尝试云打包，打包成功后，会有一个下载地址，为临时地址，只能下载 5 次
4. 手机端安装，测试能否使用

## 尝试 1

![自定义低功耗蓝牙API原生插件官方提供图片](https://img-cdn-tx.dcloud.net.cn/stream/plugin_screens/9d751350-f05d-11ec-9613-d3a174ad4d5c_0.jpg?&v=1655705180)
先是使用的 dcloud 插件市场的一个插件，[自定义低功耗蓝牙 API 原生插件](https://ext.dcloud.net.cn/plugin?id=8551)

可以扫描到蓝牙，但是连接到蓝牙设备过几秒救会自动断开连接，尝试测试了好次，修改代码就是找不到原因
无奈只能放弃，尝试 uni 官方的蓝牙 API

--- 

## 尝试 2

::: tip

使用 uniapp [uni-app 蓝牙 API](https://uniapp.dcloud.net.cn/api/system/bluetooth.html) 进行设备的调试
:::

### 流程代码

- 初始化蓝牙 uni.openBluetoothAdapter(OBJECT)

``` javascript
uni.openBluetoothAdapter({
  success(res) {
    console.log(res)
    console.log('初始化蓝牙成功:' + e.errMsg);
  }
})

```

- 监听蓝牙链接状态

``` js
uni.onBLEConnectionStateChange((res) => {
  console.log(`设备的id： ${res.deviceId} , 连接状态: ${res.connected}`)
})
```

- 获取在蓝牙模块生效期间所有已发现的蓝牙设备。包括已经和本机处于连接状态的设备。 uni.getBluetoothDevices(OBJECT)

``` js

// ArrayBuffer转16进度字符串示例
function ab2hex(buffer) {
  const hexArr = Array.prototype.map.call(
    new Uint8Array(buffer),
    function (bit) {
      return ('00' + bit.toString(16)).slice(-2)
    }
  )
  return hexArr.join('')
}
uni.getBluetoothDevices({
  success(res) {
    console.log('获取蓝牙列表', res.devices)
  }
})
// 下面为扫描到点的蓝牙 数据信息 services 为蓝牙的mac地址
[
  {
    "deviceId": "30:1B:97:B8:4D:38",
    "name": "865186059015801",
    "RSSI": -32,
    "localName": "865186059015801",
    "advertisServiceUUIDs": []
  }
]
```



