window.buringPoint = ((win, options) => {
    const BASE_URL = options.baseUrl || 'https://ppvuv.damoshopn.com';
    // const BASE_URL = options.baseUrl || 'https://ppvuv.damoshopn.com';
    // const BASE_URL = options.baseUrl || 'http://172.20.10.2:8765';
    const projetName = options.projectName;
    const debug = options.debug || false;

    const getUserAgent = () => {
        const ua = navigator.userAgent.toLowerCase();
        if (ua.match(/MicroMessenger/i) == 'micromessenger') {
            return 'weixin';
        }
        if (ua.match(/it_appua/i) == 'it_appua') {
            return 'it_appua';
        }
        if (ua.match(/QQ/i) == 'qq') {
            return 'qq';
        }
        return '';
    };
    const getOsFrom = () => {
        const u = navigator.userAgent;
        const isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) || u.indexOf('iPhone') > -1; // ios终端

        return isiOS ? 2 : 1;
    };

    win.appBackEvent = () => { // 客户端调用本地方法
        const osFrom = getOsFrom();
        const agent = getUserAgent();
        const params = JSON.stringify({
            jump: 'SR_Event_Back',
            param: '',
            callBack: ''
        });
        if (agent === 'it_appua') {
            if (osFrom === 1) {
                android.openNative(params);
            } else {
                window.webkit.messageHandlers.openNative.postMessage(params);
            }
        }
    };
    const getUrlParams = (key) => {
        const search = win.location.search.slice(1);
        const params = search.split('&');
        const queryObject = {};

        for (let i = 0; i < params.length; i += 1) {
            const [k, v] = params[i].split('=');
            queryObject[k] = v;
        }
        return key ? queryObject[key] : queryObject;
    };
    const logger = () => {
        if (debug) {
            console.log(...arguments); // eslint-disable-line
        }
    };
    // const uuid = (function() {
    //     return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxx'.replace(/[xy]/g, c => {
    //         const r = Math.random() * 16 | 0; const v = c == 'x' ? r : (r & 0x3 | 0x8);
    //         return v.toString(16);
    //     });
    // })();

    // const getCookie = function(name) {
    //     const cookies = document.cookie;
    //     const list = cookies.split('; ');
    //
    //     for(let i = 0; i < list.length; i += 1) {
    //         const arr = list[i].split('=');
    //         if (arr[0] === name) {
    //             return decodeURIComponent(arr[1]);
    //         }
    //     }
    //     return '';
    // };
    win.dataModel = {
        project: projetName
    };
    const browserInfo = (() => {
        // 权重：系统 + 系统版本 > 平台 > 内核 + 载体 + 内核版本 + 载体版本 > 外壳 + 外壳版本
        const ua = navigator.userAgent.toLowerCase();
        const testUa = regexp => regexp.test(ua);
        const testVs = regexp => (`${ua.match(regexp)}`).replace(/[^0-9|_.]/ig, '').replace(/_/ig, '.');
        // 系统
        let system = '';
        if (testUa(/windows|win32|win64|wow32|wow64/ig)) {
            system = 'windows'; // windows系统
        } else if (testUa(/macintosh|macintel/ig)) {
            system = 'osx'; // osx系统
        } else if (testUa(/x11/ig)) {
            system = 'linux'; // linux系统
        } else if (testUa(/android|adr/ig)) {
            system = 'android'; // android系统
        } else if (testUa(/ios|iphone|ipad|ipod|iwatch/ig)) {
            system = 'ios'; // ios系统
        }
        // 系统版本
        let systemVs = '';
        if (system === 'windows') {
            if (testUa(/windows nt 5.0|windows 2000/ig)) {
                systemVs = '2000';
            } else if (testUa(/windows nt 5.1|windows xp/ig)) {
                systemVs = 'xp';
            } else if (testUa(/windows nt 5.2|windows 2003/ig)) {
                systemVs = '2003';
            } else if (testUa(/windows nt 6.0|windows vista/ig)) {
                systemVs = 'vista';
            } else if (testUa(/windows nt 6.1|windows 7/ig)) {
                systemVs = '7';
            } else if (testUa(/windows nt 6.2|windows 8/ig)) {
                systemVs = '8';
            } else if (testUa(/windows nt 6.3|windows 8.1/ig)) {
                systemVs = '8.1';
            } else if (testUa(/windows nt 10.0|windows 10/ig)) {
                systemVs = '10';
            }
        } else if (system === 'osx') {
            systemVs = testVs(/os x [\d._]+/ig);
        } else if (system === 'android') {
            systemVs = testVs(/android [\d._]+/ig);
        } else if (system === 'ios') {
            systemVs = testVs(/os [\d._]+/ig);
        }
        // 平台
        let platform = '';
        if (system === 'windows' || system === 'osx' || system === 'linux') {
            platform = 'desktop'; // 桌面端
        } else if (system === 'android' || system === 'ios' || testUa(/mobile/ig)) {
            platform = 'mobile'; // 移动端
        }
        // 内核和载体
        let engine = '';
        let browser = '';
        if (testUa(/applewebkit/ig) && testUa(/safari/ig)) {
            engine = 'webkit'; // webkit内核
            if (testUa(/edge/ig)) {
                browser = 'edge'; // edge浏览器
            } else if (testUa(/opr/ig)) {
                browser = 'opera'; // opera浏览器
            } else if (testUa(/chrome/ig)) {
                browser = 'chrome'; // chrome浏览器
            } else {
                browser = 'safari'; // safari浏览器
            }
        } else if (testUa(/gecko/ig) && testUa(/firefox/ig)) {
            engine = 'gecko'; // gecko内核
            browser = 'firefox'; // firefox浏览器
        } else if (testUa(/presto/ig)) {
            engine = 'presto'; // presto内核
            browser = 'opera'; // opera浏览器
        } else if (testUa(/trident|compatible|msie/ig)) {
            engine = 'trident'; // trident内核
            browser = 'iexplore'; // iexplore浏览器
        }
        // 内核版本
        let engineVs = '';
        if (engine === 'webkit') {
            engineVs = testVs(/applewebkit\/[\d.]+/ig);
        } else if (engine === 'gecko') {
            engineVs = testVs(/gecko\/[\d.]+/ig);
        } else if (engine === 'presto') {
            engineVs = testVs(/presto\/[\d.]+/ig);
        } else if (engine === 'trident') {
            engineVs = testVs(/trident\/[\d.]+/ig);
        }
        // 载体版本
        let browserVs = '';
        if (browser === 'chrome') {
            browserVs = testVs(/chrome\/[\d.]+/ig);
        } else if (browser === 'safari') {
            browserVs = testVs(/version\/[\d.]+/ig);
        } else if (browser === 'firefox') {
            browserVs = testVs(/firefox\/[\d.]+/ig);
        } else if (browser === 'opera') {
            browserVs = testVs(/opr\/[\d.]+/ig);
        } else if (browser === 'iexplore') {
            browserVs = testVs(/(msie [\d.]+)|(rv:[\d.]+)/ig);
        } else if (browser === 'edge') {
            browserVs = testVs(/edge\/[\d.]+/ig);
        }
        // 外壳和外壳版本
        let shell = '';
        let shellVs = '';
        if (testUa(/micromessenger/ig)) {
            shell = 'wechat'; // 微信浏览器
            shellVs = testVs(/micromessenger\/[\d.]+/ig);
        } else if (testUa(/qqbrowser/ig)) {
            shell = 'qq'; // QQ浏览器
            shellVs = testVs(/qqbrowser\/[\d.]+/ig);
        } else if (testUa(/ubrowser/ig)) {
            shell = 'uc'; // UC浏览器
            shellVs = testVs(/ubrowser\/[\d.]+/ig);
        } else if (testUa(/2345explorer/ig)) {
            shell = '2345'; // 2345浏览器
            shellVs = testVs(/2345explorer\/[\d.]+/ig);
        } else if (testUa(/metasr/ig)) {
            shell = 'sougou'; // 搜狗浏览器
        } else if (testUa(/lbbrowser/ig)) {
            shell = 'liebao'; // 猎豹浏览器
        } else if (testUa(/maxthon/ig)) {
            shell = 'maxthon'; // 遨游浏览器
            shellVs = testVs(/maxthon\/[\d.]+/ig);
        } else if (testUa(/bidubrowser/ig)) {
            shell = 'baidu'; // 百度浏览器
            shellVs = testVs(/bidubrowser [\d.]+/ig);
        }
        return Object.assign({
            engine, // [webkit, gecko, presto, trident]
            engineVs,
            platform, // [desktop, mobile]
            browser, // [chrome, safari, firefox, opera, iexplore, edge]
            browserVs,
            system, // [windows, osx, linux, android, ios]
            systemVs
        }, shell === 'none' ? {} : {
            shell, // [wechat, qq, uc, 2345, sougou, liebao, maxthon, baidu]
            shellVs
        });
    })();
    const setData = (key, value) => {
        try {
            localStorage.setItem[key] = value;
        } catch (e) {
            const date = new Date();
            // 失效时间设置10年
            document.cookie = `${key}=${value};expires=${date.setTime(date.getTime() + 10 * 365 * 24 * 60 * 60 * 1000)}`;
        }
    };

    function init() {
        win.getConfigFromApp = (result) => { // 客户端主动调用本方法
            logger('log: getConfigFromApp invoked', result);
            if (typeof result === 'string') {
                win.dataModel = result ? Object.assign(win.dataModel, JSON.parse(result)) : win.dataModel;
            } else {
                win.dataModel = Object.assign(win.dataModel, result || {});
            }
            win.getConfigFromAppCallback();
            // if (win.dataModel.channel) {
            //     win.dataModel.channel += '_h5';
            // }
            // this.analyze('onload');
        };
        // const cachedUserId = localStorage.getItem('userId') || getCookie('userId'); // 前端缓存的 userId
        const userId = win.dataModel.userId || ''; // 客户端获取的 userId
        if (userId) {
            setData('userId', userId);
        } else {
            // win.dataModel.userId = cachedUserId || uuid;
            // if (!cachedUserId) {
            //     setData('userId', uuid);
            // }
        }
        // this.analyze('onload');

        // 不建议全埋点，各自业务根据需要自行埋点
        // win.onbeforeunload = function() { this.analyze('onbeforeunload'); }
        // win.onpopstate = function() { this.analyze('onpopstate'); }
        // win.onhashchange = function() { this.analyze('onhashchange'); }
    }
    init();

    return {
        qs(data) {
            let params = '';
            for (const key in data) { // eslint-disable-line
                params += `${key}=${data[key]}&`;
            }
            return params.slice(0, -1);
        },

        isEmptyObject(obj) {
            for (const key in obj) { // eslint-disable-line
                return false;
            }
            return true;
        },

        getReferrer() {
            const { referrer } = document;
            if (referrer) {
                return referrer;
            }
            return getUrlParams('referer') || '';
        },

        ajax(opts) {
            const method = opts.method ? opts.method.toUpperCase() : 'GET';
            const url = opts.url.startsWith('http') ? opts.url : (BASE_URL + opts.url);
            const data = opts.data || {};
            const isAsync = opts.isAsync || true;
            const success = opts.success || null;
            const xhr = win.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHttp');

            xhr.onreadystatechange = () => {
                if (xhr.readyState === 4 && xhr.status === 200) {
                    if (success) {
                        success(xhr.responseText);
                    }
                }
            };
            if (method === 'GET') {
                xhr.open(method, `${url}?${this.qs(data)}`, isAsync);
                xhr.send(null);
            } else if (method === 'POST') {
                xhr.open(method, url, isAsync);
                xhr.setRequestHeader('Content-Type', 'application/json');
                xhr.send(JSON.stringify(data));
            }
        },

        analyze(eventKey, extra) {
            if (!eventKey) return;
            const model = win.dataModel;
            const params = {
                pointList: [{
                    eventCode: eventKey,
                    deviceId: model.deviceId || '',
                    userId: model.userId || '',
                    country: model.country || '',
                    province: model.province || '',
                    city: model.city || '',
                    appVersion: model.appVersion || '',
                    networkType: model.netType || model.networkType || '',
                    wifiName: model.wifiName || '',
                    longitude: model.longitude || '', // 经度
                    latitude: model.latitude || '', // 纬度
                    screenWidth: win.screen.width,
                    screenHeight: win.screen.height,
                    os: browserInfo.system,
                    osVersion: browserInfo.systemVs,
                    browser: browserInfo.browser,
                    browserVersion: browserInfo.browserVs,
                    sdk: 'jssdk',
                    sdkVersion: '1.0.0',
                    appChannel: model.channel || model.appChannel || '',
                    registerChannel: getUrlParams('channel') || '',
                    manufacturer: model.manufacturer || '',
                    model: model.model || '', // 设备型号
                    project: model.project || '',
                    imei: model.imei || '',
                    idfa: model.idfa || '',
                    mac: model.mac || '',
                    clientTime: new Date().getTime() || '',
                    pageUrl: win.location.href,
                    referer: this.getReferrer(),
                    attributes: extra || ''
                }]
            };
            for (const key in params.pointList[0]) { // eslint-disable-line
                const item = params.pointList[0][key];
                if (item === '' || item === null || item === undefined) { // 过滤掉空值
                    delete params.pointList[0][key];
                }
            }
            logger('log: before request.');
            this.ajax({
                url: '/pvuv/dataHandler/v1/insert',
                method: 'POST',
                data: params,
                success(res) {
                    logger('log: request finished.', res);
                }
            });
        }
    };

})(window, window.analysisOptions);
