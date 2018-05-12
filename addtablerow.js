// -------------------------------------------------------
// テーブルの行数操作
// -------------------------------------------------------


$(function () {
    $.datetimepicker.setLocale('ja');
    $(".datetimepicker").datetimepicker({
        format: 'Y/m/d (D) H:i'
    });
});

// tbidのテーブルの一番下に一行追加してキャラクターオブジェクトを表示。  
// 行数がcharSlot数を超えていれば、キャラクターオブジェクトも1つ追加。
function addLine(tbid) {

    var table = document.getElementById(tbid);
    var row_len = table.rows.length;
    if (row_len < MAXSLOT) {
        var tr = table.insertRow(-1);
        var rownum = table.rows.length - 2;
        var td1 = tr.insertCell(-1),
            td2 = tr.insertCell(-1),
            td3 = tr.insertCell(-1),
            td4 = tr.insertCell(-1),
            td5 = tr.insertCell(-1),
            td6 = tr.insertCell(-1),
            td7 = tr.insertCell(-1);

        var cell1 = '<input id="1-' + rownum + '" type="text" value="" />';
        var cell2 = '<input id="2-' + rownum + '" type="button" value="済" onclick = "btnRsGet(' + rownum + ')"/>';
        var cell3 = '<input id="3-' + rownum + '" type="text" class="datetimepicker"/>';
        var cell4 = '<input id="4-' + rownum + '" type="button" value="済" onclick = "btnRunBf(' + rownum + ')"/>';
        var cell5 = '<input id="5-' + rownum + '" type="text" value="" />';
        var cell6 = '<input id="6-' + rownum + '" type="button" value="済" onclick = "btnRsGather(' + rownum + ')"/>';
        var cell7 = '<input id="7-' + rownum + '" type="button" value="戻る" onclick = "btnStatusBack(' + rownum + ')" />';

        td1.innerHTML = cell1;
        td2.innerHTML = cell2;
        td3.innerHTML = cell3;
        td4.innerHTML = cell4;
        td5.innerHTML = cell5;
        td6.innerHTML = cell6;
        td7.innerHTML = cell7;

        if (rownum > rsChars.length - 1) {
            addInitChar(rownum);
        }
        showChar(rownum);
    }

}

// tbidのテーブルの一番下の行を削除。  同時にキャラクターオブジェクトを1つ削除。
function delLine(tbid) {
    var table = document.getElementById(tbid);
    var row_len = table.rows.length;
    if (row_len > 1) {
        rsChars.pop();
        table.deleteRow(row_len - 1);
    }
}

// tbidのテーブルの一番下に linenum 行追加してキャラクターオブジェクトを表示。  
// 行数がcharSlot数を超えていれば、キャラクターオブジェクトも1つ追加。
function addLines(tbid, linenum) {
    var table = document.getElementById(tbid);
    var row_len = table.rows.length;
    if (row_len + linenum - 2 < MAXSLOT) {
        // DOMに指定の行数を追加
        for (var i = 0; i < linenum; i++) {
            var tr = table.insertRow(-1);
            var rownum = table.rows.length - 2;
            var td1 = tr.insertCell(-1),
                td2 = tr.insertCell(-1),
                td3 = tr.insertCell(-1),
                td4 = tr.insertCell(-1),
                td5 = tr.insertCell(-1),
                td6 = tr.insertCell(-1),
                td7 = tr.insertCell(-1);

            var cell1 = '<input id="1-' + rownum + '" type="text" value="" />';
            var cell2 = '<input id="2-' + rownum + '" type="button" value="済" onclick = "btnRsGet(' + rownum + ')"/>';
            var cell3 = '<input id="3-' + rownum + '" type="text" class="datetimepicker"/>';
            var cell4 = '<input id="4-' + rownum + '" type="button" value="済" onclick = "btnRunBf(' + rownum + ')"/>';
            var cell5 = '<input id="5-' + rownum + '" type="text" value="" />';
            var cell6 = '<input id="6-' + rownum + '" type="button" value="済" onclick = "btnRsGather(' + rownum + ')"/>';
            var cell7 = '<input id="7-' + rownum + '" type="button" value="戻る" onclick = "btnStatusBack(' + rownum + ')" />';

            td1.innerHTML = cell1;
            td2.innerHTML = cell2;
            td3.innerHTML = cell3;
            td4.innerHTML = cell4;
            td5.innerHTML = cell5;
            td6.innerHTML = cell6;
            td7.innerHTML = cell7;
        }
        // 上のDOM操作と一緒にしないほうがレンダリングが早い。たぶん。
        if (row_len + linenum - 1 > rsChars.length) {
            for (var i = 0; i < linenum; i++) {
                addInitChar(row_len - 1 + i);
            }
        }
        for (var i = 0; i < linenum; i++) {
            showChar(row_len - 1 + i);
        }
    }
}

function delLines(tbid, linenum) {
    for (var i = 0; i < linenum; i++) {
        delLine(tbid);
    }
}

//  tbidのテーブルを1行だけに。
function flushLines(tbid) {
    delLines(tbid, MAXSLOT);
}

