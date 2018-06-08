const dateType = [
    'YYYY',
    'MM',
    'DD',
    'HH',
    'mm',
    'ss'
];
const dateMap = {
    YYYY: 'getYear',
    MM: 'getMonth',
    DD: 'getDate',
    HH: 'getHours',
    mm: 'getMinutes',
    ss: 'getSeconds'
};

const dateFn = {
    getYear: (time) => {
        return time.getFullYear()
    },
    getMonth: (time) => {
        const month = time.getMonth() + 1
        return addZero(month)
    },
    getDate: (time) => {
        const day = time.getDate()
        return addZero(day)
    },
    getHours: (time) => {
        const hour = time.getHours()
        return addZero(hour)
    },
    getMinutes: (time) => {
        const minute = time.getMinutes()
        return addZero(minute)
    },
    getSeconds: (time) => {
        const second = time.getSeconds()
        return addZero(second)
    }
};

function addZero(num) {
    if (num < 10) 
        num = '0' + num
    return num
}

const format = (date, type) => {
    const time = date
        ? new Date(date)
        : new Date()
    let placeholder = type
    dateType.forEach((val) => {
        if (type.indexOf(val) > -1) {
            const trueValue = dateFn[dateMap[val]](time)
            placeholder = placeholder.replace(val, trueValue)
        }
    })
    return placeholder
};

const setDays = (date, type, num) => {
    const time = date
        ? new Date(date)
        : new Date();
    type === 'add'
        ? time.setDate(time.getDate() + num)
        : time.setDate(time.getDate() - num);
    return time;
};
const dateFormat = (date, fmt = 'YYYY-MM-DD HH:mm:ss') => {
    if (!date) {
        return ''
    }
    if (typeof date === 'string') {
        date = new Date(date.replace(/-/g, '/'))
    }
    if (typeof date === 'number') {
        date = new Date(date)
    }
    var o = {
        'M+': date.getMonth() + 1,
        'D+': date.getDate(),
        'h+': date.getHours() % 12 === 0
            ? 12
            : date.getHours() % 12,
        'H+': date.getHours(),
        'm+': date.getMinutes(),
        's+': date.getSeconds(),
        'q+': Math.floor((date.getMonth() + 3) / 3),
        'S': date.getMilliseconds()
    }
    var week = {
        '0': '\u65e5',
        '1': '\u4e00',
        '2': '\u4e8c',
        '3': '\u4e09',
        '4': '\u56db',
        '5': '\u4e94',
        '6': '\u516d'
    }
    if (/(Y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
    }
    if (/(E+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, ((RegExp.$1.length > 1)
            ? (RegExp.$1.length > 2
                ? '\u661f\u671f'
                : '\u5468')
            : '') + week[date.getDay() + ''])
    }
    for (var k in o) {
        if (new RegExp('(' + k + ')').test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1)
                ? (o[k])
                : (('00' + o[k]).substr(('' + o[k]).length)))
        }
    }
    return fmt
};
const showLongTime = (LongTime) => {
    let time = (typeof LongTime === 'number')
        ? dateFormat(new Date(LongTime), 'YYYY-MM-DD HH:mm:ss')
        : LongTime
    let currentTime = dateFormat(new Date(), 'YYYY-MM-DD HH:mm:ss');
    if (time.substr(0, 7) === currentTime.substr(0, 7)) {
        if (time.substr(0, 10) === currentTime.substr(0, 10)) 
            return "今天" + time.substr(11, 5);
        return "今天" + time.substr(11, 5);
        if (new Date(time).getDate() + 1 === new Date(currentTime).getDate()) 
            return "昨天" + time.substr(11, 5);
        return time.substr(5, 5);
    }
    if (time.substr(0, 4) === currentTime.substr(0, 4)) 
        return time.substr(5, 5); //今年
    return time.substr(0, 10); //早些年月
};

const shorten = function (str, num) {
    num = num || 2;
    if (!str) 
        return str;
    let newstr = "";
    const strNum = str.length;
    const provideNumber = num;
    const rowNumber = Math.ceil(strNum / provideNumber);
    if (strNum > provideNumber) {
        for (let p = 0; p < rowNumber; p++) {
            let tempStr = "";
            const start = p * provideNumber;
            const end = start + provideNumber;
            if (p === rowNumber - 1) {
                tempStr = str.substring(start, strNum);
            } else {
                tempStr = str.substring(start, end) + "\n";
            }
            newstr += tempStr;
        }
    } else {
        newstr = str;
    }
    return newstr
}
const isPhone = () => {
    let flag = false;
    const agent = navigator
        .userAgent
        .toLowerCase();
    let keywords = [
        "android",
        "iphone",
        "ipod",
        "ipad",
        "windows phone",
        "mqqbrowser"
    ];
    //排除 Windows 桌面系统
    if (!(agent.indexOf("windows nt") > -1) || (agent.indexOf("windows nt") > -1 && agent.indexOf("compatible; msie 9.0;") > -1)) {
        //排除苹果桌面系统
        if (!(agent.indexOf("windows nt") > -1) && !(agent.indexOf("macintosh") > -1)) {
            for (let item in keywords) {
                if (agent.indexOf(item) > -1) {
                    flag = true;
                    break;
                }
            }
        }
    }
    return flag;
}
function openApp(goodsUrl) {
    //判断浏览器
    var u = navigator.userAgent;
    if (/MicroMessenger/gi.test(u)) {
        // 引导用户在浏览器中打开
        alert('请在浏览器中打开');
        return;
    }
    var d = new Date();
    var t0 = d.getTime();
    if (u.indexOf('Android') > -1 || u.indexOf('Linux') > -1) {
        //Android
        if (openApp(goodsUrl)) {
            openApp(goodsUrl);
        } else {
            //由于打开需要1～2秒，利用这个时间差来处理－－打开app后，返回h5页面会出现页面变成app下载页面，影响用户体验
            var delay = setInterval(function () {
                var d = new Date();
                var t1 = d.getTime();
                if (t1 - t0 < 3000 && t1 - t0 > 2000) {
                    alert('请下载APP');
                    window.location.href = "http://download.taobaocdn.com/wireless/alibaba-android/latest/alibaba-android_10000470.apk?spm=a260g.144370.0.0.1e0e636cuzAO2H&tracelog=wireless_homepage_buyer_androidxia";
                }
                if (t1 - t0 >= 3000) {
                    clearInterval(delay);
                }
            }, 1000);
        }
    } else if (u.indexOf('iPhone') > -1) {
        //IOS
        if (openApp(goodsUrl)) {
            openApp(goodsUrl);
        } else {
            var delay = setInterval(function () {
                var d = new Date();
                var t1 = d.getTime();
                if (t1 - t0 < 3000 && t1 - t0 > 2000) {
                    alert('请下载APP');
                    window.location.href = "http://itunes.apple.com/cn/app/a-li-ba-ba/id507097717?spm=a260g.144370.0.0.1e0e636cuzAO2H&mt=8";
                }
                if (t1 - t0 >= 3000) {
                    clearInterval(delay);
                }
            }, 1000);
        }
    }else{
        window.location.href = goodsUrl;
    }
}

function openAppUrl(src) {
    // 通过iframe的方式试图打开APP，如果能正常打开，会直接切换到APP，并自动阻止a标签的默认行为 否则打开a标签的href链接
    var ifr = document.createElement('iframe');
    ifr.src = src;
    ifr.style.display = 'none';
    document
        .body
        .appendChild(ifr);
    window.setTimeout(function () {
        document
            .body
            .removeChild(ifr);
    }, 2000);
}
export {
    format,
    setDays,
    dateFormat,
    showLongTime,
    shorten,
    isPhone,
    openApp
}
