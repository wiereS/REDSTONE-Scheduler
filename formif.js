// -------------------------------------------------------
// キャラクターオブジェクトの配列 rsChars[] ←→ テーブル表示 間の変換
// 各ボタンの動作定義
// -------------------------------------------------------


// キャラクターオブジェクト → テーブル（rownum行）への表示
function showChar(rownum) {
    document.getElementById('1-' + rownum).value = rsChars[rownum].CharName;
    document.getElementById('3-' + rownum).value = dateToStr(rsChars[rownum].KakeraDate);
    document.getElementById('5-' + rownum).value = rsChars[rownum].Seikou;

    document.getElementById('2-' + rownum).disabled = rsChars[rownum].Status !== 1;
    document.getElementById('2-' + rownum).style.backgroundColor = rsChars[rownum].Status === 1 ? 'green' : '';
    document.getElementById('2-' + rownum).style.color = rsChars[rownum].Status === 1 ? 'white' : '';

    document.getElementById('4-' + rownum).disabled = rsChars[rownum].Status !== 2;
    document.getElementById('4-' + rownum).style.backgroundColor = rsChars[rownum].Status === 2 ? 'green' : '';
    document.getElementById('4-' + rownum).style.color = rsChars[rownum].Status === 2 ? 'white' : '';

    document.getElementById('6-' + rownum).disabled = rsChars[rownum].Status !== 3;
    document.getElementById('6-' + rownum).style.backgroundColor = rsChars[rownum].Status === 3 ? 'green' : '';
    document.getElementById('6-' + rownum).style.color = rsChars[rownum].Status === 3 ? 'white' : '';
}

// テーブル（rownum行）→ キャラクターオブジェクトへ登録
function setChar(rownum) {
    var name = document.getElementById('1-' + rownum).value;
    var datestr = document.getElementById('3-' + rownum).value;
    var seikou = document.getElementById('5-' + rownum).value;
    var status = getStatusFromForm(rownum);

    rsChars[rownum].CharName = name;
    rsChars[rownum].KakeraDate = strToDate(datestr);
    rsChars[rownum].Seikou = seikou;
    rsChars[rownum].Status = status;
}

function getStatusFromForm(rownum) {
    if (document.getElementById('2-' + rownum).disabled === false) {
        return 1;
    }
    if (document.getElementById('4-' + rownum).disabled === false) {
        return 2;
    }
    else {
        return 3;
    }
}

function btnRsGet(rownum) {
    setChar(rownum);
    rsChars[rownum].compRsGet();
    showChar(rownum);
}

function btnRunBf(rownum) {
    setChar(rownum);
    rsChars[rownum].compRunBf();
    showChar(rownum);
}

function btnRsGather(rownum) {
    setChar(rownum);
    rsChars[rownum].compRsGather();
    showChar(rownum);
}

function btnStatusBack(rownum) {
    setChar(rownum);
    rsChars[rownum].statusBack();
    showChar(rownum);
}

function btnOrder() {
    for (var i = 0; i < rsChars.length; i++) {
        setChar(i);
    }
    orderChars(rsChars);
    for (var i = 0; i < rsChars.length; i++) {
        showChar(i);
    }
    if (document.getElementById("checkbox").checked) {
        storage.save = "on";
        storage.storagedata = JSON.stringify(rsChars);
    }
}

function btnFlushStorage() {
    document.getElementById("checkbox").checked = false;
    storage.clear();
}


// rsChars を JSON.stringify で出力
function downloadForm() {
    for (var i = 0; i < rsChars.length; i++) {
        setChar(i);
    }
    var rsCharsJson = JSON.stringify(rsChars);
    var blob = new Blob([rsCharsJson], { "type": "text/plain" });
    if (window.navigator.msSaveBlob) {
        // IEの場合
        window.navigator.msSaveBlob(blob, "RS_Scheduler.txt");
    } else {
        //　その他のブラウザの場合
        document.getElementById('download_href').href = window.URL.createObjectURL(blob);
        document.getElementById('download_href').target = '_blank';
        document.getElementById('download_href').download = "RS_Scheduler.txt";
        URL.revokeObjectURL();
    }
}

function uploadFromFile(evt) {
    var fileData = evt.target.files[0];
    var reader = new FileReader();
    reader.readAsText(fileData);
    reader.onload = function (e) {
        flushLines('variable_tbl');
        rsChars = [];
        jsonDataToTable(reader.result);
    }
}


// JSON形式の rsChars を受け取り、データを既存のrsChars[]に追加してフォームを生成
function jsonDataToTable(jsondata) {
    try {
        tmpRsChars = JSON.parse(jsondata);
        for (var i = 0; i < tmpRsChars.length; i++) {
            tmpRsChars[i].KakeraDate = new Date(tmpRsChars[i].KakeraDate);
            rsChars.push(new rsCharData(tmpRsChars[i].CharName, tmpRsChars[i].KakeraDate, tmpRsChars[i].Seikou, tmpRsChars[i].Status));
        }
        clearInterval(timer);
        addLines('variable_tbl', tmpRsChars.length);
        timer = setInterval(rsTimer, 1000);
    } catch (e) {
        flushLines('variable_tbl');
        addLine('variable_tbl');
        var table = document.getElementById('variable_tbl');
        var tr = table.rows[1].cells[0].innerHTML = '<input id="1-0" type="text" value="読み込みエラー!!" />';
    }
}

// タイムリミットが過ぎるとフォームを赤くする
function rsTimer() {
    var nowtime = new Date;
    for (var i = 0; i < rsChars.length; i++) {
        var row = document.getElementById("variable_tbl").rows.item(i + 1);
        if (rsChars[i].KakeraDate < nowtime) {
            row.style.backgroundColor = 'red';
        }
        else {
            row.style.backgroundColor = '';
        }
    }
}


