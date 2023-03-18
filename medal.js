!function() {
    var cookies = document.cookie.split(';');
    var csrf = '';

    for (var cookie of cookies) {
        var kv = cookie.split('=')

        if (kv[0].trim() === 'bili_jct') {
            csrf = kv[1];
            break;
        }
    }

    if (csrf) {
        var path = location.pathname.split('/');

        fetch('https://api.live.bilibili.com/xlive/web-room/v1/index/getInfoByRoom?room_id=' + path[path.length - 1], {mode: 'cors', credentials: 'include'})
            .then(resp => {return resp.json()})
            .then(resp => {
                if (resp.code === 0) {
                    fetch('https://api.live.bilibili.com/xlive/app-ucenter/v1/fansMedal/fans_medal_info?target_id=' + resp.data.room_info.uid, {mode: 'cors', credentials: 'include'})
                        .then(resp => {return resp.json()})
                        .then(resp => {
                            if (resp.code === 0) {
                                if (resp.data.my_fans_medal.medal_id) {
                                    fetch('https://api.live.bilibili.com/xlive/web-room/v1/fansMedal/wear', {
                                        mode: 'cors',
                                        credentials: 'include',
                                        method: 'POST',
                                        headers: {
                                            'Content-Type': 'application/x-www-form-urlencoded'
                                        },
                                        body: 'medal_id=' + resp.data.my_fans_medal.medal_id + '&csrf_token=' + csrf + '&csrf=' + csrf + '&visit_id='
                                    });
                                } else {
                                    fetch('https://api.live.bilibili.com/xlive/web-room/v1/fansMedal/take_off', {
                                        mode: 'cors',
                                        credentials: 'include',
                                        method: 'POST',
                                        headers: {
                                            'Content-Type': 'application/x-www-form-urlencoded'
                                        },
                                        body: 'csrf_token=' + csrf + '&csrf=' + csrf + '&visit_id='
                                    });
                                }
                            }
                        });
                }
            });
    }
}();