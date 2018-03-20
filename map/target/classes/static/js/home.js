$(document).ready(function(){
	//初始化Echarts实例
	var myChart = echarts.init(document.getElementById('allmap'));
	
	var geoCoordMap = {
			'基站': [121.975955,30.894756],
			'船舶': [122.062193,30.872193],
			'游艇': [123.062180,30.862053]
	};
	
	var fromdata = '基站';
	var CBData = [{name:fromdata},{name:'船舶'}];
	
	var planePath = 'path://M1705.06,1318.313v-89.254l-319.9-221.799l0.073-208.063c0.521-84.662-26.629-121.796-63.961-121.491c-37.332-0.305-64.482,36.829-63.961,121.491l0.073,208.063l-319.9,221.799v89.254l330.343-157.288l12.238,241.308l-134.449,92.931l0.531,42.034l175.125-42.917l175.125,42.917l0.531-42.034l-134.449-92.931l12.238-241.308L1705.06,1318.313z';
	
	var convertData = function (data) {
		var res = [];
		for (var i = 0; i < data.length; i++) {
			var dataItem = data[i];
			var fromCoord = geoCoordMap[data[0].name];
			var toCoord = geoCoordMap[data[1].name];
			if (fromCoord && toCoord) {
				res.push({
					fromName:data[0].name,
					toName:data[1].name,
					coords:[fromCoord,toCoord]
				});
			}
		}
		return res;
	};
	
	var color = ['#f6d23b'];
	var series = [];
	
	[[fromdata, CBData]].forEach(function (item, i) {
	    series.push({
	        name: item[0],
	        type: 'lines',
	        zlevel: 1,
	        effect: {
	            show: true,
	            period: 6,
	            trailLength: 0.7,
	            color: '#fff',
	            symbolSize: 3
	        },
	        lineStyle: {
	            normal: {
	                color: color[i],
	                width: 0,
	                curveness: 0.2//维度
	            }
	        },
	        data: convertData(item[1])
	    },
	    {
	        name: item[0],
	        type: 'lines',
	        zlevel: 2,
	        symbol: ['none', 'arrow'],
	        symbolSize: 10,
	        effect: {
	            show: true,
	            period: 6,
	            trailLength: 0,
	            symbol: 'arrow',
	            symbolSize: 8
	        },
	        label: {
	                  normal: {
	                      show: true,
	                      position: 'right',
	                      formatter: '{b}'
	                  }
	              },
	        lineStyle: {
	            normal: {
	                color: color[i],
	                width: 1,
	                opacity: 0.6,
	                curveness:0.2//维度
	            }
	        },
	        data: convertData(item[1])
	    },
	    {
	        name: item[0],
	        type: 'effectScatter',
	        coordinateSystem: 'bmap',
	        zlevel: 2,
	        rippleEffect: {
	            brushType: 'stroke'
	        },
	        label: {
	            normal: {
	                show: true,
	                position: 'right',
	                formatter: '{b}'
	            }
	        },
	        symbolSize:10, // function (val) {return val[2] / 8; },

	        itemStyle: {
	            normal: {
	                areaColor:'#fff',
	                color: color[i]
	            }
	        },
	        data: item[1].map(function (data) {
	            return {
	                name: data.name	               	              
	            };
	        })
	    });
	});

	
	//指定地图的配置和数据
	var option = {
	    bmap: {
	        center: [121.975955,30.894756],
	        zoom: 13,
	        roam: true,
            mapStyle: {
                   styleJson: [
                	   {
                		   "featureType": "road",
                		   "elementType": "labels",
                		   "stylers": {
                                 "visibility": "off"
                       		}
                	   },
                	   {
                		   "featureType": "poilabel",
                		   "elementType": "labels",
                		   "stylers": {
                                 "visibility": "off"
                		   	}
                	   },
                	   {
                		   "featureType": "administrative",
                		   "elementType": "all",
                		   "stylers": {
                                 "visibility": "off"
                		   }
                	}]
	        }
	    		},
	    series: series,
	}
	
	//使用option配置和数据
	myChart.setOption(option);
});