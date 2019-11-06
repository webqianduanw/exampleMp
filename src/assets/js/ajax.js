import axios from 'axios';
import { nativeAppFun } from './utils';

axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.interceptors.request.use(config => config, error => Promise.reject(error));
axios.interceptors.response.use(resp => resp, error => Promise.resolve(error.response));
const time = new Date().getTime();
export default {
    post(url, params) {
        return new Promise((resolve, reject) => {
            axios.post(url, params, {
                headers: {
                    token: window.dataModel.token || '',
                    userName: window.dataModel.userName || '',
                    deviceId: window.dataModel.deviceId || '',
                    id: window.dataModel.id || '',
                    platform: window.dataModel.platform || '',
                    appName: window.dataModel.appName || '',
                    appVersion: window.dataModel.appVersion || '',
                    channel: window.dataModel.channel || '',
                    netType: window.dataModel.netType || '',
                    time: time || '',
                    sign: window.dataModel.sign || '',
                    clientOS: window.dataModel.clientOS || ''
                    // token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhcHBWZXJzaW9uIjoiMTAwIiwidXNlck5hbWUiOiI3NDcyYTQyZmY5MjM5YWNmOGJlMGY1YjkzYmUyYTYzOCIsImRldmljZUlkIjoiMWM1NDZjOGMtMjhmNC0zZTFiLWI3YjctMzk1MWQyMThmNWZlIiwidXNlcklkIjoyMTY1MCwiaXNzIjoi6JKy5YWs6IuxIiwiYXVkIjoi55So5oi3MSIsImV4cCI6MTU3NDE1MTU5MiwibmJmIjoxNTcxNTU5NTkyfQ.AJeqqsIC9jV1H0qiwv4qNlcb4jVGbXSj_KqD_GFdDSw',
                    // deviceId: '1c546c8c-28f4-3e1b-b7b7-3951d218f5fe',
                    // userName: '7472a42ff9239acf8be0f5b93be2a638' || '',

                    // id: 'a_bbb4c5887cd803d12fbb7f0e4076bdca_1535529719086_duobei',
                    // platform: '',
                    // appName: 'duobei',
                    // appVersion: '100',
                    // channel: 'appstore-duobe',
                    // netType: 'WIFI',
                    // time: time || '',
                    // sign: 'q13123124453dsadas',
                    // clientOS: 'android'
                }
            }).then((res) => {
                if (!res) {
                    console.error(`The request url: ${url} load fail.`);
                }
                const { data } = res || {};
                const data1 = data.result || {};
                if (data1.code === 1000 || data1.code === 7026 || data1.code === 7019) {
                    resolve(data1);
                } else if (['4000', '4001', '4002', '4003', '4004'].indexOf(`${data1.code}`) >= 0) {
                    // data1.loginInvalid = true;
                    setTimeout(() => {
                        nativeAppFun('IT_loginOut', { toast: '登录失效，请重新登录' }, '');// 退出登录
                    }, 500);
                    // reject(data1);
                } else {
                    reject(data1);
                }
            }, err => reject(err));
        });
    },
    get(url, params) {
        return new Promise((resolve, reject) => {
            axios.get(url, {
                data: params
            }, {
                headers: { token: window.dataModel.token || '' }
            }).then(response => resolve(response.data), err => reject(err));
        });
    }
};
