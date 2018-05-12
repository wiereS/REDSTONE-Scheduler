// -------------------------------------------------------
// キャラクターのクラス及びメソッドの定義
// -------------------------------------------------------

const MAXSLOT = 100;

// キャラクターオブジェクトの配列
var rsChars = [];

var rsCharData = function (name, date, seikou, status) {
    this.CharName = name;
    this.KakeraDate = date;
    this.Seikou = seikou;
    this.Status = status;
};

rsCharData.prototype.compRsGet = function () {
    this.KakeraDate.setDate(this.KakeraDate.getDate() + 7);
    this.KakeraDate.setMinutes(this.KakeraDate.getMinutes() + 1);
    this.Status = 2;
}

rsCharData.prototype.compRunBf = function () {
    if (this.Seikou < 100) {
        this.Seikou = Math.min(Number(this.Seikou) + 16, 100);
    }
    else {
        this.Seikou = 0;
    }
    this.Status = 3;
}

rsCharData.prototype.compRsGather = function () {
    this.Status = 1;
}

rsCharData.prototype.statusBack = function () {
    if (this.Status === 1) {
        this.Status = 3;
    }
    else if (this.Status === 2) {
        this.KakeraDate.setDate(this.KakeraDate.getDate() - 7);
        this.KakeraDate.setMinutes(this.KakeraDate.getMinutes() - 1);
        this.Status = 1;
    }
    else {
        if (this.Seikou > 0) {
            this.Seikou = Math.max(Number(this.Seikou) - 16, 0);
        } else {
            this.Seikou = 100;
        }
        this.Status = 2;
    }
}

function addInitChar(charnum) {
    rsChars.push(new rsCharData("キャラクターその" + (charnum + 1), new Date, 0, (charnum % 3) + 1));
}

//  rsChars を日付順に整列
function orderChars(rsChars) {
    rsChars.sort(function (a, b) {
        if (a.KakeraDate < b.KakeraDate)
            return -1;
        if (a.KakeraDate > b.KakeraDate)
            return 1;
        return 0;
    });
}

// date型→string型 "yyyy/mm/dd (D) h:i" へ変換
function dateToStr(datetime) {
    var y = datetime.getFullYear();
    var m = ("0" + (datetime.getMonth() + 1)).slice(-2);
    var d = ("0" + datetime.getDate()).slice(-2);
    var h = ("0" + datetime.getHours()).slice(-2);
    var i = ("0" + datetime.getMinutes()).slice(-2);
    var dayOfWeek = datetime.getDay();
    var dayOfWeekStr = ["日", "月", "火", "水", "木", "金", "土"][dayOfWeek];
    return y + "/" + m + "/" + d + " (" + dayOfWeekStr + ") " + h + ":" + i;
}

// string型 "yyyy/mm/dd (D) h:i" → date型へ変換
function strToDate(str) {
    var date = new Date();
    var arrayOfStr = str.split(" ");
    date.setFullYear(arrayOfStr[0].split("/")[0], arrayOfStr[0].split("/")[1] - 1, arrayOfStr[0].split("/")[2]);
    date.setHours(arrayOfStr[2].split(":")[0]);
    date.setMinutes(arrayOfStr[2].split(":")[1]);
    date.setSeconds(0);
    return date;
}
