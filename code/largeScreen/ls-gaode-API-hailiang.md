---
title: vue3高德API海量点
author: xh
date: 2025/01/16 20:00
categories:
- 大屏可视化
---

# vue3高德API海量点

## html部分
```ts
<div id="container" class="row"></div>
```

## ts内容
```ts:
// 高德地图的加载
const creatEarth = async () => {
  // eslint-disable-next-line no-underscore-dangle
  (window as any)._AMapSecurityConfig = {
    securityJsCode: '0ba741bffc403a7fbe0d717d1db39f54',
  };
  await AMapLoader.load({
    key: '041427ecf5d0a2f6c6318f3067ebfa7d',
    version: '2.0',
    plugins: ['AMap.DistrictSearch', 'AMap.ImageLayer'],
  })
    .then(async (AMap) => {
      AMapVal.value = AMap;
      mapValue.value = new AMap.Map('container', {
        viewMode: '2D',
        // zoom: 9,
        zoom: 5,
        center: [105.041063, 35.977702], // 地图中心点
        mapStyle: 'amap://styles/darkblue',
      });
      const style = [
        {
          url: pointG,
          anchor: new AMap.Pixel(25, 10),
          size: new AMap.Size(49, 71),
          zIndex: 2,
        },
        {
          url: pointB,
          anchor: new AMap.Pixel(9, 10),
          size: new AMap.Size(20, 30),
          zIndex: 2,
        },
      ];
      mapValue.value.plugin(['AMap.MassMarks'], () => {
        cluster = new AMapVal.value.MassMarks(mapDeviceData.value, {
          zIndex: 5,
          cursor: 'pointer',
          style,
        });
      });
      setTimeout(() => {
        cluster.setMap(mapValue.value);
        cluster.on('click', MarkerClusterTo);
      }, 1000);
    })
    .catch((e) => {
      console.log(e);
    });
};

// marker点击事件
const MarkerClusterTo = async (e: any) => {
  const diviceOnClick = e.data.device;
  if (infoWindow.value) {
    infoWindow.value.close();
  }
  mapValue.value.setZoomAndCenter(16, [diviceOnClick.longitude, diviceOnClick.latitude]);
  const content = `<div class="infowindows">
          <div class="infowindows-header">${diviceOnClick.deviceName}</div>
          <div class="infowindows-th">
            <div class="infowindows-item">
              <div class="infowindows-title">经度：</div>
              <div class="infowindows-value">${diviceOnClick.longitude}</div>
            </div>
            <div class="infowindows-item">
              <div class="infowindows-title">纬度：</div>
              <div class="infowindows-value">${diviceOnClick.latitude}</div>
            </div>
          </div>
          <div class="infowindows-th">
            <div class="infowindows-item">
              <div class="infowindows-title">告警种类：</div>
              <div class="infowindows-value">晃动告警</div>
            </div>
            <div class="infowindows-item">
              <div class="infowindows-title">告警值：</div>
              <div class="infowindows-value">1433223</div>
            </div>
          </div>
          <div class="infowindows-item">
            <div class="infowindows-title">告警时间：</div>
            <div class="infowindows-value">2024-11-24</div>
          </div>
        </div>`;
  infoWindow.value = new AMapVal.value.InfoWindow({
    content,
    anchor: 'bottom-center',
  });
  infoWindow.value.open(mapValue.value, [diviceOnClick.longitude, diviceOnClick.latitude]);
  setTimeout(() => {
    const button = document.getElementById('custom-btn');
    if (button) {
      button.addEventListener('click', () => {
        btnInfo(diviceOnClick.deviceId);
      });
    }
  }, 100);
};
```