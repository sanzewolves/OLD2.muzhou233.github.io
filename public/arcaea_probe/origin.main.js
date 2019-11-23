/* global BrotliDecompress Highcharts */
(function () {
    function _(e, t, i) { var a = null; if ("text" === e) return document.createTextNode(t); a = document.createElement(e); for (var n in t) if ("style" === n) for (var o in t.style) a.style[o] = t.style[o]; else if ("className" === n) a.className = t[n]; else if ("event" === n) for (var o in t.event) a.addEventListener(o, t.event[o]); else if ("props" === n) for (var o in t.props) a[o] = t.props[o]; else a.setAttribute(n, t[n]); if (i) if ("string" == typeof i) a.innerHTML = i; else if (Array.isArray(i)) for (var l = 0; l < i.length; l++)null != i[l] && a.appendChild(i[l]); return a; }
    function $(a) { return document.querySelector(a); }
    HTMLElement.prototype.replaceWith = function (n) { this.parentNode.insertBefore(n, this); this.remove(); return n; };
    var difficultyNames = ['PST', 'PRS', 'FTR', 'BYN'];
    var lang = 'en';
    if (/ja/i.test(navigator.language)) lang = document.body.className = 'ja';
    if (/zh/i.test(navigator.language)) lang = document.body.className = 'zh';
    var translationData = {
      'Arcaea score prober': {
        zh: 'Arcaea查分器'
      },
      'User Code (9 digits)': {
        zh: '好友码（9位）',
        ja: 'フレンドコード'
      },
      "Submit": {
        zh: '开查！'
      },
      'PTT explained: ': {
        zh: 'PTT机制：'
      },
      'Invalid code': {
        zh: '无效id'
      },
      'Connecting': {
        zh: '正在连接'
      },
      'Connect failed': {
        zh: '连接失败'
      },
      'Request sent': {
        zh: '已发送请求'
      },
      'Queried, waiting for results...': {
        zh: '等待返回数据……'
      },
      'Completed': {
        zh: '完成'
      },
      'Error: ': {
        zh: '错误：'
      },
      'finding player': {
        zh: '查找玩家出错'
      },
      'retrieving data': {
        zh: '获取分数出错'
      },
  
      'User info': {
        zh: '玩家信息',
        ja: 'プレイヤー情報'
      },
      'Registered at: ': {
        zh: '注册于：',
        ja: '登録：'
      },
      'Chart constant': {
        zh: '谱面定数',
        ja: '譜面定数'
      },
      'Result rating': {
        zh: '成绩评价',
        ja: 'スコア評価'
      },
      'Cleared at': {
        zh: '取得日期',
        ja: 'クリア日期'
      },
      'Date added': {
        zh: '歌曲更新日期',
        ja: '曲追加日期'
      },
      'Best 30 average: ': {
        zh: 'Best 30 均值：',
        ja: 'Best 30 平均：'
      },
      'Recent top 10 average: ': {
        zh: 'Recent 前10 均值：',
        ja: 'Recent トップ10 平均：'
      },
      'Sort by: ': {
        zh: '排序：',
        ja: '表示順：'
      },
      'Export CSV': {
        zh: '导出CSV'
      },
      'Song': {
        zh: '曲目',
        ja: '曲名'
      },
      'Difficulty': {
        zh: '难度',
        ja: '難易度'
      },
      'Constant': {
        zh: '定数',
        ja: '定数'
      },
      'Score': {
        zh: '分数',
        ja: 'スコア'
      },
      'Rating': {
        zh: 'ptt',
        ja: 'ポテンシャル'
      },
  
      'Toolbox': {
        zh: '工具箱'
      },
      'Player name lookup (name/rank before 2019/03/14)': {
        zh: '玩家查找（2019/03/14前的玩家名/排名）',
        ja: 'プレイヤー名検索（2019/03/14より前の名前/ランク）'
      },
      'Rating calculator': {
        zh: '葡萄糖计算器',
        ja: 'ポテンシャル計算機'
      },
      'Fetch constants for manual calculate': {
        zh: '获取定数表',
        ja: 'ポテンシャル表取得'
      },
      'Score: ': {
        zh: '分数：',
        ja: 'スコア：'
      },
      'Selected chart: ': {
        zh: '已选谱面：',
        ja: '選んだ譜面：'
      },
      'Rating: ': {
        zh: 'ptt：',
        ja: 'ポテンシャル：'
      },
      'Fetched constants': {
        zh: '定数表',
        ja: 'ポテンシャル表'
      },
      'Found %num% player(s)': {
        zh: '匹配到%num%个玩家',
        ja: '%num% 件記録'
      },
      "Fair usage: Please use this page as you needed. Though we can't do anything if you abuse it, we still recommend and hope you use it fairly. ": {
        zh: '合理使用：请按需使用这个工具。虽然滥用了我也不能怎么样，但还是建议并希望合理地使用'
      },
      'Data collection: As you use this service, you agree that we will record your basic user info into our database, and use it to provide name lookup service. ': {
        zh: '数据收集：在使用此服务时，您即同意我们记录并更新您的基本用户信息，并以此提供用户名查找服务。'
      },
      'Record date: ': {
        zh: '记录时间：',
        ja: '記録時間：'
      },
      'Select lookup history': {
        zh: '选择历史查询',
        ja: '検索履歴'
      },
      'Score-Rating chart': {
        zh: '分数-评分图'
      },
      'Show score rating chart': {
        zh: '显示分数-评分图'
      },
      'Probe range: ': {
        zh: '查分范围：',
        ja: 'スコア取得範囲：'
      },
      'Can select up to 4 levels': {
        zh: '最多可以选择4个难度',
        ja: '４レベルまで選択できる'
      },
      'Potential is hidden': {
        zh: 'ptt已被隐藏',
        ja: 'ポテンシャルは表示しない'
      },
      '_FUN_FACT_1_': {
        en: 'Fun fact: As of Sep 1st, there’re total 73 players achieved double star (PTT ≥ 12.50) (36 players as of Jun 25th)',
        zh: '趣事：截止9/1，一共有73人摘双星（6/25时为36人）'
      },
      '_FUN_FACT_2_': {
        en: 'We looked at 230+ players in our database previously recorded as above 12.25, and updated their status. Though some of them hid their potential value, thus we don\'t know these players\' current potential',
        zh: '我们查看了数据库之前记录的高于 12.25 的 230+ 位玩家，并更新了他们的数据。不过其中有一部分玩家隐藏了ptt，所以也就无从得知这部分玩家的当前ptt'
      }
    };
    var errors = {
      add: 'finding player',
      fetch: 'retrieving data',
      potential_hidden: 'Potential is hidden'
    };
    var check = function (i) { return (i < 10 ? '0' : '') + i; };
    var timeagoInstance = {
      format: function (date) {
        date = new Date(date);
        var ts = date.getTime(), now = Date.now();
        if (date.getFullYear() == (new Date).getFullYear()) {
          if (date.getMonth() == (new Date).getMonth()) {
            if (date.getDate() == (new Date).getDate()) {
              return check(date.getHours()) + ':' + check(date.getMinutes());
            }
            var day = Math.floor((now - ts) / 24 / 3600e3);
            return day + ' day' + (day == 1 ? '' : 's') + ' ago';
          }
          return check(date.getMonth() + 1) + '/' + check(date.getDate());
        }
        return (date.getFullYear() + '').substr(2) + '/' + check(date.getMonth() + 1) + '/' + check(date.getDate());
      }
    };
    function timeagoRun() {
      var needs = [].slice.call(document.getElementsByClassName('timeago'));
      needs.forEach(function (i) {
        if (i.hasAttribute('datetime'))
          i.textContent = timeagoInstance.format(parseInt(i.getAttribute('datetime')));
      });
    }
    setInterval(timeagoRun, 6e4);
  
    document.addEventListener('touchstart', function () { });
  
    function _t(s, l) {
      return (translationData[s] != undefined && translationData[s][l] != undefined) ? translationData[s][l] : s;
    }
    function transDOM(ele, l) {
      document.title = _t(document.title, l);
      if (ele.childNodes.length == 1 && ele.childNodes[0].nodeName.toLowerCase() == '#text') {
        if (ele.hasAttribute('orig-content')) {
          ele.textContent = _t(ele.getAttribute('orig-content'), l);
        } else {
          var trans = _t(ele.textContent, l);
          if (trans != ele.textContent) {
            ele.setAttribute('orig-content', ele.textContent);
            ele.textContent = _t(ele.textContent, l);
          }
        }
      } else {
        for (var i = 0; i < ele.children.length; i++) {
          transDOM(ele.children[i], l);
        }
      }
    }
    transDOM(document.body, lang);
  
    var userCodeInput = $('#user-code'), submitBtn = $('#submit'), statusMsg = $('#status-message'), currentProbeRange;
    userCodeInput.focus();
    userCodeInput.addEventListener('input', function () {
      if (!/^\d{,9}$/.test(this.value)) this.value = this.value.replace(/[^\d]/g, '').substr(0, 9);
      statusMsg.textContent = '';
    });
    userCodeInput.addEventListener('keydown', function (e) {
      if (e.keyCode == 13) this.blur(), submitBtn.click();
    });
    submitBtn.addEventListener('click', function () {
      if (running) return;
      var code = userCodeInput.value.replace(/[^\d]/g, '').substr(0, 9);
      if (code.length != 9) return statusMsg.textContent = _t('Invalid code', lang);
      var cmd = [code];
      currentProbeRange = probeRangeForm.querySelector('[name=range]:checked').value;
      if (currentProbeRange == 'custom') {
        var from = probeRangeForm['custom-from'].value | 0;
        var to = probeRangeForm['custom-to'].value | 0;
        if (to - from > 4) return;
        cmd.push(from);
        cmd.push(to);
      }
  
      connectSocket();
      ws.onopen = function (e) {
        ws.send(cmd.join(' '));
        statusMsg.textContent = _t('Request sent', lang);
      };
      if (code != scoresCode) {
        scores = [];
        scoresObj = {};
        window.scores = scoresObj;
        scoresCode = code;
      }
    });
    function connectSocket() {
      running = true;
      statusMsg.textContent = _t('Connecting', lang);
      ws = new WebSocket('wss://arc.estertion.win:616');
      ws.binaryType = 'arraybuffer';
      ws.onerror = function (e) {
        statusMsg.textContent = _t('Connect failed', lang);
        running = false;
      };
      ws.onmessage = function (e) {
        var data = e.data;
        if (data.byteLength) {
          data = BrotliDecompress(new Uint8Array(data));
          data = String.fromCharCode.apply(String, data);
          data = JSON.parse(decodeURIComponent(escape(data)));
          if (window.DEBUG) console.log('msg', e.data.byteLength, data);
          switch (data.cmd) {
            case 'songtitle': {
              songTitleData = data.data;
              break;
            }
            case 'userinfo': {
              userInfo = data.data;
              window.userInfo = userInfo;
              saveLookupHistory(data.data.user_code, data.data.name);
              var userInfoDiv = $('#user-info').replaceWith(_('div', { id: 'user-info' }, [
                _('div', { className: 'title' }, [_('text', _t('User info', lang))]),
                _('img', { style: { float: 'right' }, width: 60, height: 60, src: '../backstage/icons/' + data.data.character + (data.data.is_char_uncapped ? 'u' : '') + '_icon.png' }),
                _('div', { className: 'name' }, [
                  _('text', data.data.name),
                  _('span', { className: 'rank' }, [_('text', 'UID: ' + data.data.user_id)])
                ]),
                _('div', { className: 'join-date' }, [
                  _('text', _t('Registered at: ', lang)),
                  _('span', { className: 'hoveritem' }, [
                    _('span', { className: 'normal timeago', datetime: data.data.join_date }, [_('text', getDateString(data.data.join_date))]),
                    _('span', { className: 'hover' }, [_('text', getDateString(data.data.join_date))])
                  ])
                ]),
                _('div', { className: 'ptt' }, [_('text', 'PTT: ' + (data.data.rating > 0 ? (data.data.rating / 100).toFixed(2) : 'Huh?'))]),
              ]));
              if (data.data.recent_score.length) {
                userInfoDiv.appendChild(_('div', {}, [
                  _('div', {}, [_('text', _t('Recent plays: ', lang))]),
                  _('div', {}, data.data.recent_score.map(generateScoreTable))
                ]));
              }
              timeagoRun();
              chart2.container.parentNode.style.display = 'block';
              while (chart2.series[0]) chart2.series[0].remove(false);
              data.data.rating_records.sort(function (a, b) { return a[0] > b[0] ? 1 : -1; });
              for (var i = data.data.rating_records.length - 2; i > 0; i--) {
                if (data.data.rating_records[i - 1][1] == data.data.rating_records[i + 1][1]) {
                  data.data.rating_records.splice(i, 1);
                }
              }
              chart2.addSeries({
                type: 'line',
                name: _t('Rating', lang),
                data: data.data.rating_records.map(function (i) { return [new Date(i[0].replace(/(\d{2})(\d{2})(\d{2})/, '20$1/$2/$3 0:0:0 +0000')).getTime(), (i[1] | 0) / 100]; })
              }, false);
              chart2.redraw(false);
              break;
            }
            case 'scores': {
              data.data.forEach(function (i) { scoresObj[i.song_id + i.difficulty] = i; });
              scores = Object.values(scoresObj);
              scores.sort(function (b, a) { return a.rating > b.rating ? 1 : -1; });
              var rank = 1;
              scores.forEach(function (i) { i.rank = rank++; });
              for (var i = 0, sum = 0; i < 30 && i < scores.length; i++) {
                sum += scores[i].rating;
              }
              best30Avg = (sum / i);
              best30Num = i;
              generateScatterChart();
              sortAndGenerate();
              statusMsg.textContent = _t('Queried, waiting for results...', lang) + scores.length;
              timeagoRun();
              break;
            }
            case 'lookup_result': {
              var resultDiv = $('#lookup-result');
              resultDiv.textContent = '';
              resultDiv.appendChild(_('div', {}, [_('text', _t('Found %num% player(s)', lang).replace('%num%', data.data.length))]));
              resultDiv.appendChild(_('div', {}, data.data.map(function (i) {
                return _('div', { style: { marginTop: '10px' } }, [
                  _('div', { className: 'name' }, [
                    _('text', i.name),
                    _('span', { className: 'rank' }, [_('text', 'UID: ' + i.id)]),
                    _('br'),
                    _('text', 'Code: ' + i.code)
                  ]),
                  _('div', { className: 'join-date' }, [
                    _('text', _t('Registered at: ', lang)),
                    _('span', { className: 'hoveritem' }, [
                      _('span', { className: 'normal timeago', datetime: i.join_date }, [_('text', getDateString(i.join_date))]),
                      _('span', { className: 'hover' }, [_('text', getDateString(i.join_date))])
                    ])
                  ]),
                  _('div', { className: 'ptt' }, [_('text', 'PTT: ' + (i.rating / 100).toFixed(2) + '　#' + i.rank)]),
                  _('div', { className: 'data-date' }, [_('text', _t('Record date: ', lang) + i.data_time)]),
                ]);
              })));
              timeagoRun();
              break;
            }
            case 'constants': {
              Object.keys(data.data).forEach(function (i) {
                constants.push({
                  id: i,
                  search: (i + ',' + getSongTitle(i)).toLowerCase(),
                  data: data.data[i],
                  dom: _('tr', {}, [
                    _('td', {}, [_('text', getSongTitle(i))]),
                    _('td', {}, data.data[i][0] == undefined ? [] : [_('label', {}, [
                      _('input', { type: 'radio', name: 'selection', value: i + ',0,' + data.data[i][0] }),
                      _('text', data.data[i][0].toFixed(1))
                    ])]),
                    _('td', {}, data.data[i][1] == undefined ? [] : [_('label', {}, [
                      _('input', { type: 'radio', name: 'selection', value: i + ',1,' + data.data[i][1] }),
                      _('text', data.data[i][1].toFixed(1))
                    ])]),
                    _('td', {}, data.data[i][2] == undefined ? [] : [_('label', {}, [
                      _('input', { type: 'radio', name: 'selection', value: i + ',2,' + data.data[i][2] }),
                      _('text', data.data[i][2].toFixed(1))
                    ])])
                  ])
                });
              });
              constants.sort(function (a, b) { return b.data[2] > a.data[2] ? 1 : -1; });
              renderConstTable();
              break;
            }
            default: {
              console.log(data);
            }
          }
        } else {
          if (window.DEBUG) console.log('msg', data);
          if (data === 'invalid id') {
            statusMsg.textContent = _t('Invalid code', lang);
            running = false;
            ws.close();
          } else if (data === 'queried') {
            statusMsg.textContent = _t('Queried, waiting for results...', lang);
          }/* else if (data === 'bye') {
          }*/ else if (data.substr(0, 5) === 'error') {
            var reason = data.substr(6);
            statusMsg.textContent = _t('Error: ', lang) + _t(errors[reason] || reason, lang);
            running = false;
          }
        }
        //console.log('msg', data);
      };
      ws.onclose = function (e) {
        if (running) {
          statusMsg.textContent = _t('Completed', lang);
          running = false;
          setTimeout(function () { statusMsg.textContent = ''; }, 5000);
        }
      };
    }
  
    var running = false, ws, songTitleData = {}, userInfo, scores, scoresObj, scoresCode = '', sort = 'rating', best30Avg = 0, best30Num = 0;
    $('#export').addEventListener('click', function () {
      var link = _('a', {
        href: 'data:text/csv;base64,' + btoa(unescape(encodeURIComponent(
          '\ufeff' + [_t('Song', lang), _t('Difficulty', lang), _t('Constant', lang), _t('Score', lang), _t('Rating', lang)].join(',') + '\n' + scores.map(function (i) {
            return [
              getSongTitle(i.song_id),
              difficultyNames[i.difficulty],
              i.constant,
              i.score,
              i.rating
            ].join(',') + '\n';
          }).join('')
        ))),
        download: 'Arcaea - ' + userInfo.name + '.csv',
        target: '_blank'
      });
      document.body.appendChild(link).click();
      link.remove();
    });
    $('#sort').addEventListener('change', function () {
      sort = this.value;
      $('#scores').dataset.sort = sort;
      sortAndGenerate();
      timeagoRun();
    });
  
    function round(n) {
      return Math.round(n * 1e5) / 1e5;
    }
    function getDateString(date) {
      date = new Date(date * 1);
      return [date.getFullYear(), check(date.getMonth() + 1), check(date.getDate())].join('/') + ' ' + [check(date.getHours()), check(date.getMinutes()), check(date.getSeconds())].join(':');
    }
    function sortAndGenerate() {
      scores.sort(function (b, a) {
        var sortBy = sort;
        if (!a[sortBy]) sortBy = 'rating';
        return a[sortBy] > b[sortBy] ? 1 : -1;
      });
      generateScoreTables($('#scores'));
    }
    function generateScoreTables(old) {
      var replacement = _('div', { id: 'scores', 'data-sort': sort, 'data-range': currentProbeRange }, scores.map(generateScoreTable));
      if (currentProbeRange == 'default')
        replacement.insertBefore(_('span', { className: 'score-item' }, [_('text', _t('Best 30 average: ', lang) + round(best30Avg)), _('br'), _('text', _t('Recent top 10 average: ', lang) + (userInfo.rating > 0 ? round((userInfo.rating / 100 * 40 - best30Avg * best30Num) / 10) : 'Huh?'))]), replacement.firstChild);
      old.replaceWith(replacement);
    }
    var clearTypeMap = ['Track Lost', 'Normal Clear', 'Full Recall', 'Pure Memory', 'Easy Clear', 'Hard Clear'];
    function generateScoreTable(i) {
      return _('div', { className: 'score-item' }, [
        _('div', {}, [
          _('span', { className: 'song-title' }, [_('text', getSongTitle(i.song_id))]),
          _('span', { className: 'difficulty chart-' + i.difficulty }, [_('text', difficultyNames[i.difficulty])]),
          i.rank ? _('span', { className: 'rank' }, [_('text', '#' + i.rank)]) : _('text', '')
        ]),
        _('div', { className: 'song-detail' }, [
          clearDetailDOM(i),
          _('div', { className: 'score-chart-tooltip', style: { position: 'relative' } }, [
            _('div', { className: 'score-chart-x', 'data-value': formatScore(i.score) }, [_('text', formatScore(i.score))]),
            _('div', { className: 'score-chart-y', 'data-value': round(i.rating) }, [_('text', round(i.rating))]),
          ]),
          _('div', {
            className: 'score-chart',
            event: { click: openSvgWindow, mousemove: updateScoreChartMouseMove, mouseleave: clearScoreChartHover, touchmove: updateScoreChartTouchMove, touchend: clearScoreChartHover },
            title: _t('Score-Rating chart', lang),
            props: { constant: i.constant }
          }, getClearSvg(i.score, i.constant))
        ]),
        _('div', { className: 'song-score' }, [_('text', formatScore(i.score))]),
        _('div', { className: 'song-clear-type' }, [_('text', clearTypeMap[i.clear_type]), _('span', { className: 'song-clear-type', style: { marginLeft: '30px' } }, [_('text', '(' + clearTypeMap[i.best_clear_type] + ')')])]),
        _('div', { className: 'song-rating' }, [_('text', _t('Chart constant', lang) + ': ' + i.constant.toFixed(1)), _('br'), _('text', _t('Result rating', lang) + ': ' + round(i.rating))]),
        _('div', { className: 'song-clear-date' }, [
          _('text', _t('Cleared at', lang) + ': '),
          _('span', { className: 'hoveritem' }, [
            _('span', { className: 'normal timeago', datetime: i.time_played }, [_('text', getDateString(i.time_played))]),
            _('span', { className: 'hover' }, [_('text', getDateString(i.time_played))])
          ]),
          _('span', { className: 'song-date' }, [
            _('text', '　' + _t('Date added', lang) + ': '),
            _('span', { className: 'hoveritem' }, [
              _('span', { className: 'normal timeago', datetime: i.song_date * 1e3 }, [_('text', getDateString(i.song_date * 1e3))]),
              _('span', { className: 'hover' }, [_('text', getDateString(i.song_date * 1e3))])
            ]),
          ])
        ]),
      ]);
    }
    var chart = new Highcharts.chart({
      chart: {
        renderTo: $('#score-scatter-chart'),
        backgroundColor: 'rgba(0,0,0,0)'
      },
      plotOptions: { series: { animation: false } },
      credits: {
        enabled: false
      },
      type: 'scatter',
      xAxis: {
        title: {
          text: _t('Constant', lang)
        }
      },
      yAxis: {
        title: null,
        //max: 1e7 + 2000,
        endOnTick: false
      },
      legend: {
        enabled: false
      },
      title: null,
      tooltip: {
        /*formatter: function () {
          return this.point.name + '\n' + this.point.y;
        },
        */
        headerFormat: '',
        pointFormat: '{point.name}<br>{point.x}<br>{point.y}',
        crosshairs: true
      }
    }), chart2 = new Highcharts.chart({
      chart: {
        renderTo: $('#rating-records-chart'),
        backgroundColor: 'rgba(0,0,0,0)',
              zoomType: "x"
      },
      plotOptions: { series: { animation: false } },
      credits: {
        enabled: false
      },
      type: 'line',
      xAxis: {
        title: {
          text: _t('Record date: ', lang).replace(/[: ：]+$/, '')
        },
        type: 'datetime',
        dateTimeLabelFormats: {
          year: '%Y/%m/%d',
          month: '%m/%d',
          week: '%m/%d',
          day: '%m/%d',
          hour: '',
          minute: '',
          second: '',
          millisecond: ''
        },
      },
      yAxis: {
        title: null,
        //max: 1e7 + 2000,
        //endOnTick: false
      },
      legend: {
        enabled: false
      },
      title: null,
      tooltip: {
        /*formatter: function () {
          return this.point.name + '\n' + this.point.y;
        },
        */
        //headerFormat: '',
        //pointFormat: '{point.name}<br>{point.x}<br>{point.y}',
        crosshairs: true
      }
    });
    window.chart = [chart, chart2];
    function generateScatterChart() {
      chart.container.parentNode.style.display = 'block';
      while (chart.series[0]) chart.series[0].remove(false);
      chart.addSeries({
        type: 'scatter',
        name: '',
        data: scores.map(function (i) { return { x: i.constant, y: i.score, name: getSongTitle(i.song_id) + ' ' + difficultyNames[i.difficulty] }; })
      }, false);
      chart.redraw(false);
    }
  
    function formatScore(score) {
      score = score + '';
      while (score.length < 8) score = '0' + score;
      return [score.substr(0, 2), score.substr(2, 3), score.substr(5, 3)].join(',');
    }
    function clearDetailDOM(detail) {
      return _('table', {}, [_('tbody', {}, [
        _('tr', {}, [_('td', {}, [_('text', 'PURE: ')]), _('td', {}, [_('text', detail.perfect_count)]), _('td', {}, [_('text', ' (' + detail.shiny_perfect_count + ')')])]),
        _('tr', {}, [_('td', {}, [_('text', 'FAR: ')]), _('td', {}, [_('text', detail.near_count)]), _('td')]),
        _('tr', {}, [_('td', {}, [_('text', 'LOST: ')]), _('td', {}, [_('text', detail.miss_count)]), _('td')]),
      ])]);
    }
    function openSvgWindow() {
      clearScoreChartHover.call(this);
      window.open('data:image/svg+xml,' + encodeURIComponent(this.innerHTML.replace('fill:', 'width:50vw;height:50vh;margin-left:25vw;fill:')));
    }
    function getClearSvg(score, constant) {
      if (score > 10000000) score = 10000000;
      var minX = 9200000;
      var maxX = 10000000;
      var maxY = constant + 2;
      var minY = getRating(constant, minX);
      var width = 120, height = 60;
      var scoreX = score < minX ? 0 : (score - minX) / (maxX - minX) * width;
      var rating = getRating(constant, score);
      var ratingY = (1 - (score < minX ? 0 : ((rating - minY) / (maxY - minY)))) * height;
      var x980w = (9800000 - minX) / (maxX - minX) * width;
      var y980w = (1 - (constant + 1 - minY) / (maxY - minY)) * height;
      var x995w = (9950000 - minX) / (maxX - minX) * width;
      var y995wL = (1 - (constant + 1.375 - minY) / (maxY - minY)) * height;
      var y995wR = (1 - (constant + 1.5 - minY) / (maxY - minY)) * height;
      return [
        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 60" width="120" height="60" style="fill:transparent;stroke:#000">',
        '<polyline points="1,0 1,60 120,60"></polyline>',
        '<polyline points="1,' + ratingY + ' ' + scoreX + ',' + ratingY + ' ' + scoreX + ',60" stroke-dasharray="8"></polyline>',
        '<polyline points="1,60 ' + x980w + ',' + y980w + '"></polyline>',
        '<polyline points="' + x980w + ',' + y980w + ' ' + x995w + ',' + y995wL + '"></polyline>',
        '<polyline points="' + x995w + ',' + y995wR + ' 120,0"></polyline>',
        '<polyline points="" stroke-dasharray="4"></polyline>',
        '</svg>'
      ].join('');
    }
    function getSongTitle(id) {
      var song = songTitleData[id];
      if (!song) return id;
      if (lang === 'jp' && song.jp) return song.jp;
      return song.en;
    }
    function updateScoreChartMouseMove(e) {
      var box = this.getBoundingClientRect();
      var x = e.clientX - box.left;
      updateScoreChart(x, this, box.width);
    }
    function updateScoreChartTouchMove(e) {
      if (e.touches.length != 1) return clearScoreChartHover.call(this);
      var box = this.getBoundingClientRect();
      var x = e.touches[0].clientX - box.left;
      x = Math.max(0, x);
      x = Math.min(box.width, x);
      e.preventDefault();
      updateScoreChart(x, this, box.width);
    }
    function updateScoreChart(x, elem, width) {
      var constant = elem.constant;
      var xVal = Math.round((10000000 - 9200000) * x / width) + 9200000;
      var yVal = getRating(constant, xVal);
      var maxY = constant + 2;
      var minY = getRating(constant, 9200000);
      var y = (1 - (yVal - minY) / (maxY - minY)) * 60;
      elem.previousElementSibling.children[0].textContent = formatScore(xVal);
      elem.previousElementSibling.children[1].textContent = round(yVal);
      elem.children[0].children[5].setAttribute('points', x + ',60 ' + x + ',' + y + ' 1,' + y);
    }
    function clearScoreChartHover() {
      this.previousElementSibling.children[0].textContent = this.previousElementSibling.children[0].dataset.value;
      this.previousElementSibling.children[1].textContent = this.previousElementSibling.children[1].dataset.value;
      this.children[0].children[5].setAttribute('points', '');
    }
  
    $('#score-chart-toggle').addEventListener('change', function () {
      document.body.classList[this.checked ? 'add' : 'remove']('show-score-chart');
    });
    var nameLookupInput = $('#name-lookup-input'), nameLookupSubmit = $('#name-lookup-submit'), nameLookupValueChangePause = false, nonAlphabetReg = /[^a-zA-Z0-9]/g;
    nameLookupInput.addEventListener('compositionstart', function () {
      nameLookupValueChangePause = true;
    });
    nameLookupInput.addEventListener('compositionend', function () {
      nameLookupValueChangePause = false;
      this.dispatchEvent(new Event('input'));
    });
    nameLookupInput.addEventListener('input', function () {
      if (nameLookupValueChangePause) return;
      if (nonAlphabetReg.test(this.value))
        this.value = this.value.replace(nonAlphabetReg, '');
    });
    nameLookupSubmit.addEventListener('click', function () {
      var name = nameLookupInput.value;
      if (!name || running) return;
      connectSocket();
      ws.onopen = function (e) {
        ws.send('lookup ' + name);
        statusMsg.textContent = _t('Request sent', lang);
      };
    });
    nameLookupInput.addEventListener('keydown', function (e) {
      if (e.keyCode == 13) this.blur(), nameLookupSubmit.click();
    });
  
    var fetchConstBtn = $('#fetch-constants'), manualScore = $('#manual-score'), manualSelection = $('#manual-selection'), manualRating = $('#manual-rating'),
      manualSearch = $('#manual-search'), searchWord = manualSearch.value, manualConstTableDiv = $('#manual-constants'),
      manualTableSortKey = 2, manualTableSortDesc = true,
      constants = [];
    fetchConstBtn.addEventListener('click', function () {
      if (constants.length || running) return;
      connectSocket();
      ws.onopen = function (e) {
        ws.send('constants');
        statusMsg.textContent = _t('Request sent', lang);
      };
    });
    function renderConstTable() {
      if (!constants.length) return;
      manualConstTableDiv.textContent = '';
      manualConstTableDiv.appendChild(_('form', { event: { change: updateSelection } }, [_('table', {}, [_('thead', {}, [
        _('tr', {}, [
          _('th', {}, [_('text', _t('Song', lang))]),
          _('th', { 'data-sort': 0, style: { cursor: 'pointer' }, event: { click: changeConstTableSort } }, [_('text', 'PST')]),
          _('th', { 'data-sort': 1, style: { cursor: 'pointer' }, event: { click: changeConstTableSort } }, [_('text', 'PRS')]),
          _('th', { 'data-sort': 2, style: { cursor: 'pointer' }, event: { click: changeConstTableSort } }, [_('text', 'FTR')])
        ])
      ]), _('tbody', {}, constants.map(function (i) {
        if (searchWord && !i.search.match(searchWord)) return _('text', '');
        return i.dom;
      }))])]));
    }
    manualSearch.addEventListener('input', function () {
      searchWord = this.value;
      renderConstTable();
    });
    var manualSelected;
    function updateSelection() {
      manualSelected = this['selection'].value.split(',');
      manualSelection.innerHTML = getSongTitle(manualSelected[0]) + '<span class="difficulty chart-' + manualSelected[1] + '">' + difficultyNames[manualSelected[1]] + '</span>';
      updateRating();
    }
    manualScore.addEventListener('input', function () {
      if (!/^\d+$/.test(this.value)) this.value = this.value.replace(/[^\d]/g, '');
      updateRating();
    });
    function updateRating() {
      if (!manualSelected) return;
      var score = parseInt(manualScore.value);
      if (!score || isNaN(score)) return;
      manualRating.textContent = round(getRating(parseFloat(manualSelected[2]), score));
    }
  
    function getRating($constant, $score) {
      if ($score > 10000000) return $constant + 2.0;
      else if ($score > 9950000) return $constant + 1.5 + ($score - 9950000) / 100000;
      else if ($score > 9800000) return $constant + 1.0 + ($score - 9800000) / 400000;
      else return Math.max($constant + ($score - 9500000) / 300000, 0);
    }
    function changeConstTableSort() {
      if (this.dataset.sort == manualTableSortKey) {
        manualTableSortDesc = !manualTableSortDesc;
      } else {
        manualTableSortDesc = true;
        manualTableSortKey = this.dataset.sort;
      }
      constants.sort(function (a, b) { return (b.data[manualTableSortKey] > a.data[manualTableSortKey] ? 1 : -1) * (manualTableSortDesc ? 1 : -1); });
      renderConstTable();
    }
    var lookupHistory = { id: [], data: [] };
    function saveLookupHistory(id, name) {
      var idx = lookupHistory.id.indexOf(id);
      if (idx != -1) {
        lookupHistory.data[idx] = id + ':' + name;
      } else {
        lookupHistory.data.push(id + ':' + name);
      }
      localStorage.proberLookupHistory = lookupHistory.data.join(',');
      loadLookupHistory();
    }
    function loadLookupHistory() {
      lookupHistory = { id: [], data: [] };
      (localStorage.proberLookupHistory || '').split(',').map(function (i) {
        if (!i) return;
        lookupHistory.id.push(i.split(':')[0]);
        lookupHistory.data.push(i);
      });
      $('#lookup-history').replaceWith(_('select', { id: 'lookup-history', event: { change: fillId } }, [_('option', { value: '' }, [_('text', _t('Select lookup history', lang) + ' (' + lookupHistory.data.length + ')')])].concat(lookupHistory.data.map(function (i) {
        return _('option', { value: i.split(':')[0] }, [_('text', i)]);
      }))));
    }
    function fillId() {
      userCodeInput.value = this.value;
      this.value = '';
    }
    loadLookupHistory();
    function fillCustomRange(select, from, to, selected) {
      for (var i = from; i <= to; i += 1) {
        select.appendChild(_('option', { value: i }, [_('text', i)]));
      }
    }
    var probeRangeForm = $('#range-form');
    fillCustomRange(probeRangeForm['custom-from'], 1, 11);
    fillCustomRange(probeRangeForm['custom-to'], 2, 12);
    probeRangeForm['custom-from'].value = 8;
    probeRangeForm['custom-to'].value = 12;
    probeRangeForm.addEventListener('change', function (e) {
      if (e.target.nodeName.toLowerCase() == 'select') {
        probeRangeForm['range'].value = 'custom';
        var from = probeRangeForm['custom-from'].value | 0;
        var to = probeRangeForm['custom-to'].value | 0;
        if (e.target.name == 'custom-from') {
          if (to <= from) probeRangeForm['custom-to'].value = from + 1;
          else if (to > from + 4) probeRangeForm['custom-to'].value = from + 4;
        } else if (e.target.name == 'custom-to') {
          if (to <= from) probeRangeForm['custom-from'].value = to - 1;
          else if (to > from + 4) probeRangeForm['custom-from'].value = to - 4;
        }
      }
    });
  })();