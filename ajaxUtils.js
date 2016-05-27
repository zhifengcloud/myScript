function gId(id) {
	return document.getElementById(id);
}
function gName(name) {
	return document.getElementsByClassName(name);
}
function gShow(id) {
	return gId(id).style.display = 'block';
}
function gHide(id) {
	return gId(id).style.display = 'none';
}
function gVal(id) {
	 return gId(id).value;
}
function gSetVal(id,val) {
	 gId(id).value=val;
}
function gText(id) {
	return gId(id).textContent;
}
function gSetText(id,val) {
	 gId(id).textContent=val;
}
function gHtml(id,htmlStr) {
	return gId(id).innerHTML=htmlStr;
}

function gAttr(id,attrName) {
	if(typeof(id)=='object')
		return id.getAttribute(attrName);
	else
		return gId(id).getAttribute(attrName);
}
function gRemoveAttr(id,attrName) {
	if(typeof(id)=='object')
		return id.removeAttribute(attrName);
	else
		return gId(id).removeAttribute(attrName);
}
function gSetAttr(id,attrName,attrValue) {
	if(typeof(id)=='object')
		id.setAttribute(attrName, attrValue);
	else
		gId(id).setAttribute(attrName, attrValue);
}
//绑定事件
function bindEvent(element, eventType, fn) {
	if (element.addEventListener) {
		element.addEventListener(eventType, fn, false);// !ie
	}else if(element.attachEvent) {
		element.attachEvent("on" + eventType, fn);// ie
	} else  {
		element["on" + eventType] = fn;
	}// dom 0
}
//解绑事件
function removeEvent(element, eventType, fn) {
	if (element.removeEventListener) {
		element.removeEventListener(eventType, fn, false);
	} else if (element.detachEvent) {
		element.detachEvent('on' + eventType, fn);
	} else {
		element['on' + eventType] = null;
	}
}
function hasClass(obj, cls) {
	var reg = '(\\s|^)' + cls + '(\\s|$)';
	return !!obj.className.match(new RegExp(reg));
}
function addClass(obj, cls) {
    if (!this.hasClass(obj, cls)) obj.className += " " + cls;
}
function removeClass(obj, cls) {
    if (hasClass(obj, cls)) {
        var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');
        obj.className = obj.className.replace(reg, ' ');
    }
}
/**
 * 执行基本ajax请求,返回XMLHttpRequest Ajax.request({ url async 是否异步 true(默认) method
 * 请求方式 POST or GET(默认) data 请求参数 (键值对字符串) success
 * 请求成功后响应函数，参数为responseText,status,xhr error
 * 请求失败后响应函数，参数为responseText,status,xhr });
 */
//Ajax.request({ url:'/w/m/configSdk',async:true,method:'GET',data:{url : encodeURI(window.location.href),},success:sucCallBack});
Ajax = function() {
	function request(opt) {
		function fn() {
		}
		var url = opt.url || "";
		var async = opt.async !== false, method = opt.method || 'GET', data = opt.data
				|| null, success = opt.success || fn, error = opt.failure || fn;
		method = method.toUpperCase();
		if (method == 'GET' && data) {
			var args = "";
			if (typeof data == 'string') {
				// alert("string")
				args = data;
			} else if (typeof data == 'object') {
				// alert("object")
				var arr = new Array();
				for ( var k in data) {
					var v = data[k];
					arr.push(k + "=" + v);
				}
				args = arr.join("&");
			}
			url += (url.indexOf('?') == -1 ? '?' : '&') + args;
			data = null;
		}
		var xhr = window.XMLHttpRequest ? new XMLHttpRequest()
				: new ActiveXObject('Microsoft.XMLHTTP');
		xhr.onreadystatechange = function() {
			_onStateChange(xhr, success, error);
		};
		xhr.open(method, url, async);
		if (method == 'POST') {
			xhr.setRequestHeader('Content-type',
					'application/x-www-form-urlencoded;');
		}
		xhr.send(encodeFormData(data));
		return xhr;
	}
	function _onStateChange(xhr, success, failure) {
		if (xhr.readyState == 4) {
			var s = xhr.status;
			if (s >= 200 && s < 300) {
				success(xhr.responseText, s, xhr);
			} else {
				failure(xhr.responseText, s, xhr);
			}
		} else {
		}
	}
	function encodeFormData(data){
	    if(!data) return '';
	    var pairs = [];
	    for(var name in data){
	        if(!data.hasOwnProperty(name)) continue;
	        if(typeof data[name] === 'function') continue;
	        var value = data[name].toString();
	        name = encodeURIComponent(name.replace('%20','+'));
	        value = encodeURIComponent(value.replace('%20','+'));
	        pairs.push(name+'='+value);
	    }
	    return pairs.join('&');
	}
	return {
		request : request
	};
}();
var msg_dialog = {
		alert_msg:function(msg,extendObj) {
			gId('jq_msg_text').innerHTML=msg;
			gShow('jq_msg_box');
			setTimeout(function(){
				gHide('jq_msg_box');
			},2000);
		},
		loading:function(){
			gShow('loading');
		},
};
