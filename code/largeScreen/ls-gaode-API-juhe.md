---
title: vue3高德API点聚合
author: xh
date: 2025/01/15 20:00
categories:
- 大屏可视化
---

# vue3高德API点聚合

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

      // eslint-disable-next-line
      // var _renderMarker = function (context: any) {
      //   context.marker.setContent('<div style=""></div>');
      // };
      mapValue.value.plugin(['AMap.MarkerCluster'], () => {
        cluster = new AMapVal.value.MarkerCluster(mapValue.value, mapDeviceData.value);
      });
      cluster.on('click', MarkerClusterTo);
    })
    .catch((e) => {
      console.log(e);
    });
};

// marker点击事件
const MarkerClusterTo = async (e: any) => {
  // console.log('e: ', e);
  if (infoWindow.value) {
    infoWindow.value.close();
  }
  if (e.clusterData && e.clusterData?.length > 1) {
    let alng = 0;
    let alat = 0;
    for (const m of e.clusterData) {
      alng += m.lnglat.lng;
      alat += m.lnglat.lat;
    }
    const lng = alng / e.clusterData.length;
    const lat = alat / e.clusterData.length;
    mapValue.value.setZoom(mapValue.value.getZoom() + 3);
    mapValue.value.setCenter([lng, lat]);
  } else {
    mapValue.value.setZoomAndCenter(16, [e.clusterData[0].lnglat.lng, e.clusterData[0].lnglat.lat]);
    const content = `<div class="infowindows">
          <div class="infowindows-header">${e.clusterData[0].deviceName}</div>
          <div class="infowindows-item">
            <span class="infowindows-title">设备状态：</span>
            <span class="infowindows-value-blue">${e.clusterData[0].onlineStatus === 1 ? '在线' : '离线'}</span>
          </div>
          <div class="infowindows-item">
            <span class="infowindows-title">所属组织：</span>
            <span class="infowindows-value">${e.clusterData[0].organizeName}</span>
          </div>
          <div class="infowindows-item">
            <span class="infowindows-title">关联产品：</span>
            <span class="infowindows-value">${e.clusterData[0].productName}</span>
          </div>
          <div class="infowindows-item">
            <span class="infowindows-title">设备DN：</span>
            <span class="infowindows-value">${e.clusterData[0].deviceId}</span>
          </div>
          <div id="custom-btn" class="infowindows-btn">查看详情</div>
        </div>`;
    infoWindow.value = new AMapVal.value.InfoWindow({
      content,
      anchor: 'bottom-left',
    });
    infoWindow.value.open(mapValue.value, [e.clusterData[0].lnglat.lng, e.clusterData[0].lnglat.lat]);
    setTimeout(() => {
      const button = document.getElementById('custom-btn');
      if (button) {
        button.addEventListener('click', () => {
          // console.log('按钮被点击了！');
          btnInfo(e.clusterData[0].deviceId);
        });
      }
    }, 100); // 延迟以确保 DOM 渲染完成
  }
};
```