//工具包相对路径
var toolsPath = "";

//初始化xmlHtmlReqeust
var request = false;
createRequest();

//chartdivid 页面上放置图表div的id
//tabledivid 页面上放置表格div的id
//chartType  图表的类型，目前的类型如下:
//width 	 flash的宽
//height     flash的高
//dataURL    请求数据的URL
//params     需要定义的参数
//jsfunction 当点击时执行的js
//params     格式为key=value
function fillChart(chartdivid,tabledivid,chartType,width,height,dataURL,inputIds,jsfunction,tableCss,tableStyle){

		//参数处理

 		var url = dataURL;
 		url = url + "&charttype=" + chartType;
 		if(jsfunction != null && jsfunction != ""){
 			url = url + "&jsfunction=" + jsfunction;
 		}
 		if(tableCss != null && tableCss != ""){
 			url = url + "&tableCss=" + tableCss;
 		}
 		if(tableStyle != null && tableStyle != ""){
 			url = url + "&tableStyle=" + tableStyle;
 		}
 		if(inputIds != null ){
 			var params = inputToParam(inputIds);
 			url = url  + params;
 		}
 		chartType = toolsPath + chartType + ".swf";
 		//图表flash的id默认为chartdivid + '_swf'
        var myChart = new FusionCharts(chartType, chartdivid + '_swf', width,height, "0", "0");
        var xmlcontent = "";
        var tablehtml = "";
        var xmlHttp = request;
        xmlHttp.open("GET", url, false);
        xmlHttp.onreadystatechange = function()
        {
       	  if(xmlHttp.readyState==4)
       	    {
       		  var requestContent =  xmlHttp.responseText;
       		  var str = requestContent.split('{xml|table}');
       		  xmlcontent = str[0];
       		  tablehtml = str[1];
       	    }
       	};
        xmlHttp.send(null);
        myChart.setDataXML(xmlcontent);
        myChart.render(chartdivid);
        document.getElementById(tabledivid).innerHTML = tablehtml;
    }
	
	/*
	 * 根据传入的input输入框的id数组，将input输入框的内容转换成 &iptId1=iptValue1&iptId2=iptValue2&...的形式
	 */
	function inputToParam(inputIds){
		var params =  "";
		for(var i = 0; i < inputIds.length;i++){
			var inputName = inputIds[i];
			params += getInputValue(inputName);
		}
		return params;
	}
	
	function getInputValue(inputName){
		var params = "";
		if(inputName != null && inputName != ''){
			//如果check:前缀将checkBox的值转换成true or false
			//如果select:前缀的将下拉框查找key
			//如果value:前缀，将直接将value的值添加
			//默认为input.value取值
			if(inputName.indexOf('check:') != -1){
				var inputNameStr = inputName.substr(6);
				var inputValue = "";
				var input = document.getElementById(inputNameStr);
				if(input == null) return "";
				if(input.checked == true){
					inputValue = "true";
				}
				else{
					inputValue = "false";
				}
				params += "&" + inputNameStr + "=" + inputValue;
			}
			else if(inputName.indexOf('select:') != -1){
				var inputNameStr = inputName.substr(7);
				var inputValue = "";
				var selector = document.getElementById(inputNameStr);
				if(selector == null) return "";
				inputValue = selector.value; 
				params += "&" + inputNameStr + "=" + inputValue;
			}
			else if(inputName.indexOf('value:') != -1){
				var valueStr = inputName.substr(6);
				params += "&" + valueStr;
			}
			else{
				var input = document.getElementById(inputName);
				if(input == null) return "";
				var inputValue = input.value;
				params += "&" + inputName + "=" + inputValue;
			}
		}
		return params;
		
	}

 	function createRequest() {
 		  try {
 		   	request = new XMLHttpRequest();
 		  } catch (trymicrosoft) {
 		    try {
 		      request = new ActiveXObject("Msxml2.XMLHTTP");
 		    } catch (othermicrosoft) {
 		      try {
 		        request = new ActiveXObject("Microsoft.XMLHTTP");
 		      } catch (failed) {
 		        request = false;
 		      }
 		    }
 		  }
 		  if (!request)
 		    alert("请求数据错误!");
 		}