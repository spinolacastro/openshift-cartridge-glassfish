dojo.require("dojo.collections.Store");
dojo.require("dojo.charting.Chart");
dojo.require('dojo.json');

jmaki.namespace("jmaki.charting");

jmaki.charting.Common = {
    
  /*
   * Do a diff with pData if needed.
   */
    createSeries : function(data, pData,  xWidth, _label, _color, _lbl) {
        var _j = [];
        for (var i = 0; i < data.length; i++) {
            var _val = data[i];
            // the chart graps relative to the previous line so calcualte the difference
            if (pData) _val -= pData[i];
            _j.push({x : ((i + 0) * xWidth) , y : _val });
        }
        var _st = new dojo.collections.Store();
        _st.setData(_j);
        var s = new dojo.charting.Series({
            dataSource:_st,
            bindings:{ x:"x", y:"y" },
            label: _lbl
        });
        s.color = _color;
        return s;
    },
    
    createYAxis : function(wargs, high, low) {
        var yAxis;
        
        if (wargs.args && wargs.args.yAxis) {
            yAxis = wargs.args.yAxis;
        } else if (wargs.value && wargs.value.yAxis) {
            yAxis = wargs.value.yAxis;
        }
        
        var count = 2;
        // now calculate the yAxis data
        var yA = new dojo.charting.Axis();
        if (typeof yAxis != 'undefined') {
            if (yAxis.range) {
                yA.range = yAxis.range;
            } else {
                yA.range={upper:high + 5, lower:low};
            }
            if (yAxis.showTicks) {
                yA.showTicks = yAxis.showTicks;
            } else {
                yA.showTicks = true;    
            }
            if (yAxis.tickCount) {
                count = yAxis.tickCount;  
		if (count > high) {
		    count = high;
		}
            }
            // define the yAxis labels
            if (yAxis.labels) {
                yA.labels = yAxis.labels;
            } else {
                var _a = [];
                var _ySize = high / count;
                _ySize = Math.round(_ySize);
                for (var _i = 1; _i < count + 1; _i++) {
                    _a.push({label : (_ySize * _i), value : (_ySize * _i)});
                }
                yA.labels = _a;
            }
            if (yAxis.title) yA.label = yAxis.title;
        }
        return yA;
    },
    
    
    createXAxis : function(wargs, _count, _width, _pl, _pr, _datapoints) {
        var _offset = 0;
        var xAxis;
        if (wargs.args && wargs.args.xAxis) {
            xAxis = wargs.args.xAxis;
        } else if (wargs.value && wargs.value.xAxis) {
            xAxis = wargs.value.xAxis;
        }
        var _lcount = wargs.args.xAxis.labels.length;
        // define the x-axis range either from input value or automatically
        var xA = new dojo.charting.Axis();
        xA.rotate = 0;
        if (xAxis.rotate){
            xA.rotate = xAxis.rotate;
        }
        if (typeof xAxis != 'undefined') {
            var xWith = 1;
            if (xAxis.range) {
                xA.range = xAxis.range;
                areaWidth = xA.range.upper - xA.range.lower;
                xA.xWidth = areaWidth / _count;                
            } else {
                areaWidth = _width - _pr - _pl;
                xA.xWidth = areaWidth / _count;
                // datapoints are passed in only on the bar chart which needs different handling
                if (typeof _datapoints != 'undefined') {
                   xA.range={upper: xA.xWidth * (_count ), lower: 0};
                } else {
                   xA.range={upper: xA.xWidth * (_count -1) + 5, lower: 0};
                }
            }
            // center the label on in the middle for barcharts    
            if (typeof _datapoints != 'undefined') {
                _offset = xA.xWidth  / 2;
            }

            if (xAxis.showTicks) {
                xA.showTicks = xAxis.showTicks;
            } else {
                xA.showTicks = true;    
            }
            xA.label = xAxis.title;
            var _labels = [];
            var  lWidth = areaWidth / _lcount;
            if (typeof xAxis.labels[0] == 'string') {
                for (var _ii=0; _ii < xAxis.labels.length; _ii++){
                    var _lbl = {label : xAxis.labels[_ii], value : (lWidth * _ii) + _offset };
                    _labels.push(_lbl);
                }
                 xA.labels = _labels;
            } else if (xA.labels){
                xA.labels = xAxis.labels;
                if (!xAxis.labels[0].value) {
                    for (var _ii=0; _ii < xA.labels.length; _ii++){
                        xA.labels[_ii].value = (lWidth * _ii) + _offset;
                    }
                }
            }
        }
        return xA;
    },
    
    calculateHighLow : function (data) {

        if (data) {
            var high = 0;
            var low = data[0].values[0];
            // scan the data set for highs and lows
            for (var bl = 0; bl < data.length; bl++) {    
                for (var i = 0; i < data[bl].values.length; i++) {
                    if (data[bl].values[i] > high) high = data[bl].values[i];
                    else if (data[bl].values[i] < low) low = data[bl].values[i];
                }
            }
            return {high : high, low: low};
        } else {
            return {high : 0, low : 0};
        }
        
    },
    
    defaultData :   {
                xAxis : {
                    title : "Months",
                    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
                    },
                yAxis : {
                    title : 'Temperature',
                    tickCount : 3
                 },
                data : [
                   {color: 'red',    values : [10, 25, 25,  5, 35,  5, 15,  5, 10, 15, 25, 30] },
                   {color: 'yellow', values : [15, 35, 15, 40, 40, 15, 20, 10, 15, 20, 30, 35 ] },
                   {color: 'pink',   values : [20, 40, 30, 35, 45, 20, 25, 15, 20, 25, 30, 40] },
                   {color: 'gray',   values : [25, 45, 25, 45, 50, 25, 35, 25, 25, 20, 35, 45] }
                   ]
            },
            showLegend : function(chart, location) {
                var _legend = chart.getLegendInfo();
                var _ul = document.createElement("ul");
                _ul.className = "jmakiChartingLegend";
                
                for (var _i = 0; _i < _legend.length; _i++) {
                    var _li = document.createElement("li");
                    _li.style.listStyle = "none";
                    _li.className = "jmakiChartingLegendItem";
                    var _cs = document.createElement("div");
                    _cs.className = "jmakiChartingLegendColorSwatch";
                    _cs.style.backgroundColor = _legend[_i].color;
                    _li.appendChild(_cs);
                    var _lbl = document.createElement("div");
                    var _cl = document.createTextNode( _legend[_i].label);
                    _lbl.className = "jmakiChartingLegendLabel";
                    _lbl.appendChild(_cl);
                    _li.appendChild(_lbl);
                    _ul.appendChild(_li);
                }
                if (location.appendChild) {
                    location.appendChild(_ul);
                } else if (document.getElementById(location)){
                    document.getElementById(location).appendChild(_ul);
                } else {
                    document.body.appendChild(_ul);
                }
            }
}
