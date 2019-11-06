import axios from 'axios';
// 获取当前页面的URL 对其带的参数进行处理
function getUrlPara(para) {
    const paraArr = decodeURIComponent(window.location.search).substring(1).split('&');
    for (let i = 0; i < paraArr.length; i += 1) {
        const arr = paraArr[i].split('=');
        if (arr[0] === para) {
            return arr[1];
        }
    }
    return '';
}

// 判断手机系统，1为android，2为ios
function getOsFrom() {
    const u = navigator.userAgent;
    // let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1 || u.indexOf("Linux") > -1; //android终端
    const isiOS = (!!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)) || u.indexOf('iPhone') > -1; // ios终端
    if (isiOS) { // 返回2是ios
        return 2;
    } // 返回1是android
    return 1;

}

// 判断userAgent
function userAgent() {
    const ua = navigator.userAgent.toLowerCase();
    if (ua.match(/MicroMessenger/i) == 'micromessenger') {
        return 'weixin';
    } if (ua.match(/it_appua/i) == 'it_appua') {
        return 'it_appua';
    } if (ua.match(/QQ/i) == 'qq') {
        return 'qq';
    }
    return '';

}

// msg提示信息
let flag = true;
function alertMsg(txt, recalculate) {
    if (flag) {
        flag = false;
        const maskWrap = document.createElement('div');
        const wrap = document.createElement('div');
        maskWrap.className = 'alertMaskWrap';
        wrap.className = 'alertMask';
        if (recalculate && ['INPUT', 'TEXTAREA'].indexOf(document.activeElement.tagName) >= 0) {
            const { clientHeight, scrollTop } = document.body;
            const currentClientHeight = clientHeight - scrollTop;
            wrap.style.top = `${currentClientHeight}px`;
            wrap.style.transform = `translate(-50%, 0)`;
        }
        wrap.innerText = txt;
        maskWrap.appendChild(wrap);
        document.body.appendChild(maskWrap);
        wrap.className = 'alertMask alertMaskIn';
        setTimeout(() => {
            wrap.className = 'alertMask alertMaskOut';
            setTimeout(() => {
                maskWrap.remove();
            }, 1500);
            flag = true;
        }, 1500);
    }
}

// 封装对象参数为url参数
function getParams(data) {
    const arr = [];
    for (const param in data) { // eslint-disable-line
        arr.push(`${encodeURIComponent(param)}=${encodeURIComponent(data[param])}`);
    }
    return arr.join('&');
}

// 封装原生ajax
function ajax(method, url, data, callback, f) {
    let xhr = null;
    if (window.XMLHttpRequest) {
        xhr = new XMLHttpRequest();
    } else {
        xhr = new ActiveXObject('Microsoft.XMLHttp');
    }
    xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                callback(xhr.responseText);
            } else {
                console.log(`error:${xhr.status}`);
            }
        }
    };
    method = method.toUpperCase();
    if (method === 'GET') {
        data = data && getParams(data);
        const timer = new Date().getTime();
        xhr.open(method, `${url}?${data}&timer=${timer}`, f);
        xhr.send();
    } else if (method === 'POST') {
        data = JSON.stringify(data);
        xhr.open(method, url, flag);
        xhr.setRequestHeader('Content-type', 'application/json;charset=UTF-8');
        xhr.send(data);
    }
}

// 下载app
function downloadApp(osFrom) {
    if (osFrom === 1) { // Android
        // const iframe = document.createElement('iframe');
        // iframe.src = window.androidLink;
        // iframe.style.display = 'none';
        // document.body.appendChild(iframe);
        window.location.href = window.androidLink;
    } else if (osFrom === 2) { // IOS
        window.location.href = window.iosLink;
    }
}

// 获取下载app地址
function downloadUrl() {
    axios({
        url: '/api/channelRegister/getAppDownloadUrl',
        method: 'post',
        data: {}
    }).then(response => response.data).then((json) => {
        if (json.code === 1000) {
            window.androidLink = json.data.AND;
            window.iosLink = json.data.IOS;
        } else {
            alertMsg(json.message);
        }
    });
}
// 调用原生方法
function nativeAppFun(str, dataStr, method) {
    const osFrom = getOsFrom();
    // const agent = userAgent();
    const jsonStr = JSON.stringify({
        jump: str,
        param: !dataStr ? '' : JSON.stringify(dataStr),
        callBack: method || ''
    });
    if (osFrom === 1) {
        android.openNative(jsonStr);
    } else if (osFrom === 2) {
        window.webkit.messageHandlers.openNative.postMessage(jsonStr);
    } else if (!!dataStr && dataStr.url) { // 端外
        window.location.href = dataStr.url;
    }
}

// app分享功能
function appShare(obj, method) {
    const dataObj = {
        title: obj.shareAppTitle,
        content: obj.shareAppContent,
        imageUrl: 'http://letu-test2.oss-cn-hangzhou.aliyuncs.com/test/mirong_logo_new.png',
        url: obj.linkUrl,
        pointCode: obj.pointCode,
        pointSubCode: obj.pointSubCode
    };
    nativeAppFun('SR_Event_Share', dataObj, method);
}

// 跳转登录
function linkToLogin() {
    if (!window._dataFromApp.token || +window._dataFromApp.dataCode === 2002) {
        nativeAppFun('SR_LoginPage');// 跳转登录
        return false;
    }
    return true;
}

// 节流函数
// 触发时立马执行
function throttle(func, wait) {
    let lastTime = 0;
    return () => {
        const nowTime = +new Date();
        if (nowTime - lastTime > wait) {
            func.apply(this, arguments); // eslint-disable-line
            lastTime = nowTime;
        }
    };
}

export {
    getUrlPara,
    alertMsg,
    getOsFrom,
    userAgent,
    ajax,
    downloadApp,
    appShare,
    linkToLogin,
    nativeAppFun,
    downloadUrl,
    throttle
};
