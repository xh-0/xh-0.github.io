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

![自定义低功耗蓝牙API原生插件官方提供图片](http://cdn.jsdelivr.net/gh/xh-0/picture-bed/blog/%E8%87%AA%E5%AE%9A%E4%B9%89%E4%BD%8E%E5%8A%9F%E8%80%97%E8%93%9D%E7%89%99%20API%20%E5%8E%9F%E7%94%9F%E6%8F%92%E4%BB%B6.jpg)
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
uni.getBluetoothDevices({
  success(res) {
    console.log('获取蓝牙列表', res.devices)
  }
})

```

- 监听寻找到新设备的事件 uni.onBluetoothDeviceFound(CALLBACK)

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

// 监听事件
* 如果遇到在vue2中遇到this指向的问题，建议将function改为箭头函数
uni.onBluetoothDeviceFound(function (res) {
  console.log('监听寻找到新设备的事件', res.devices)
  //可以将检测到的设备添加到列表中
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

- 连接低功耗蓝牙设备 uni.createBLEConnection(OBJECT)

``` js
uni.createBLEConnection({
  deviceId: '30:1B:97:B8:4D:38',
  success(res) {
    console.log('连接成功', res)
  }
})
```

- 获取蓝牙设备所有服务(service) uni.getBLEDeviceServices(OBJECT)

``` js
uni.getBLEDeviceServices({
  deviceId: '30:1B:97:B8:4D:38',
  success(res) {
    console.log('获取蓝牙设备所有服务(service)', res)
  }
})
```
  
- 获取蓝牙设备某个服务中所有特征值(characteristic) uni.getBLEDeviceCharacteristics

``` js
uni.getBLEDeviceCharacteristics({
  deviceId: '30:1B:97:B8:4D:38',
  serviceId: '0001800-0000-1000-8000-00805f9b34fb',
  success(res) {
    console.log('获取蓝牙设备某个服务中所有特征值(characteristic)', res)
  }
})
```
  
- 启用低功耗蓝牙设备特征值变化时的 notify 功能 uni.notifyBLECharacteristicValueChange(OBJECT)
  - 注意：必须设备的特征值支持 notify 或者 indicate 才可以成功调用
  - 必须先启用 notifyBLECharacteristicValueChange 才能监听到设备 characteristicValueChange 事件

``` js
uni.notifyBLECharacteristicValueChange({
  deviceId: '30:1B:97:B8:4D:38',
  serviceId: '0001800-0000-1000-8000-00805f9b34fb',
  characteristicId: '0002a29-0000-1000-8000-00805f9b34fb',
  state: true,
  success(res) {
    console.log('启用低功耗蓝牙设备特征值变化时的 notify 功能', res)
  }
})
```
  
- 监听低功耗蓝牙设备的特征值变化 uni.onBLECharacteristicValueChange(CALLBACK)

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
//必须先启用 notifyBLECharacteristicValueChange 接口才能接收到设备推送的 notification
uni.onBLECharacteristicValueChange(function (res) {
  console.log(`characteristic ${res.characteristicId} has changed, now is ${res.value}`)
  console.log(ab2hex(res.value))

```

- 向低功耗蓝牙设备特征值中写入二进制数据 uni.writeBLECharacteristicValue(OBJECT)

``` js
// 向蓝牙设备发送一个0x00的16进制数据
const hexStrings = ["68", "06", "AA", "01", "05", "A0", "0F", "00", "16"];
const intArray = hexStrings.map(str => parseInt(str, 16));
const buffer = new ArrayBuffer(intArray.length);
uni.writeBLECharacteristicValue({
  deviceId: '30:1B:97:B8:4D:38',
  serviceId: '0001800-0000-1000-8000-00805f9b34fb',
  characteristicId: '0002a29-0000-1000-8000-00805f9b34fb',
  value: buffer,
  success: (res) => {
    console.log('向低功耗蓝牙设备特征值中写入二进制数据 success', res)
  },
  fail: (err) => {
    console.log('写值报错', err)
  },
})
```

- 断开与低功耗蓝牙设备的连接 uni.closeBLEConnection(OBJECT)

``` js
uni.closeBLEConnection({
  deviceId: '30:1B:97:B8:4D:38',
  success(res) {
    console.log('断开连接成功', res)
  }
})
```
    

