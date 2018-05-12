const storage = localStorage;

// 初期テーブルの作成
addLine('variable_tbl');
document.getElementById('upload').addEventListener('change', uploadFromFile);


// Web Storage に保存する設定になっているか確認
if (storage.save === "on") {
    document.getElementById("checkbox").checked = true;
} else {
    document.getElementById("checkbox").checked = false;
}

// Web Storage からデータ読み込み
if (document.getElementById("checkbox").checked) {
    flushLines('variable_tbl');
    rsChars = [];
    jsonDataToTable(storage.storagedata);
}

var timer = setInterval(rsTimer, 1000);

