//constは再代入禁止。
const week = ["日", "月", "火", "水", "木", "金", "土"];
const today = new Date(); //本日の日付

// 月末だとずれる可能性があるため、1日固定で取得
var showDate = new Date(today.getFullYear(), today.getMonth(), 1);

// 初期表示
window.onload = function () { //window はHTMLが読み込まれたときに行う処理。つまり最初に行う
    showProcess(today, calendar);
};

// 前の月表示
function prev(){
    showDate.setMonth(showDate.getMonth() - 1);
    showProcess(showDate);
}

// 次の月表示
function next(){
    showDate.setMonth(showDate.getMonth() + 1);
    showProcess(showDate);
}

// カレンダー表示
function showProcess(date) {
    var year = date.getFullYear();
    var month = date.getMonth(); //getMonth() は0始まりのため、次の行で+1している
    document.querySelector('#header').innerHTML = year + "年 " + (month + 1) + "月"; //document.querySelector(#header)でヘッダーに処理を行っている。

    var calendar = createProcess(year, month); //作成したカレンダーを代入して次の行で表示している。
    document.querySelector('#calendar').innerHTML = calendar;
}

// カレンダー作成
function createProcess(year, month) {
    // 曜日
    var calendar = "<table><tr class='dayOfWeek'>";
    for (var i = 0; i < week.length; i++) { //日～土まで入れている。
        calendar += "<th>" + week[i] + "</th>";
    }
    calendar += "</tr>";
    //現時点でのHTML（calendarの中身）
    //<table>
    //<tr class='dayOfWeek'>
    //    <th>日</th>
    //    <th>月</th>
    //    <th>火</th>
    //    <th>水</th>
    //    <th>木</th>
    //    <th>金</th>
    //    <th>土</th>
    //<tr>

    //次のfor文で使う変数の宣言
    var count = 0; //カウント(日にち)
    var startDayOfWeek = new Date(year, month, 1).getDay(); //表示する月の1日の曜日
    var endDate = new Date(year, month + 1, 0).getDate(); //表示する月の末日
    var lastMonthEndDate = new Date(year, month, 0).getDate(); //表示する先月の末日
    var row = Math.ceil((startDayOfWeek + endDate) / week.length); //カレンダーの行数

    // 1行ずつ設定
    for (var i = 0; i < row; i++) {
        calendar += "<tr>";
        // 1colum(列)単位で設定
        for (var j = 0; j < week.length; j++) {
            if (i == 0 && j < startDayOfWeek) {
                // 1行目で1日まで先月の日付を設定　id disabledをつけることで半透明の文字にする
                calendar += "<td class='disabled' id='" + year + count0(month) + (lastMonthEndDate - startDayOfWeek + j + 1) +"'>" + (lastMonthEndDate - startDayOfWeek + j + 1) + "</td>";
            } else if (count >= endDate) {
                // 最終行で最終日以降、翌月の日付を設定
                count++;
                calendar += "<td class='disabled' id='" + year + count0(month + 2) + count0(count - endDate) + "'>" + (count - endDate) + "</td>";
            } else {
                // 当月の日付を曜日に照らし合わせて設定
                count++;
                if(year == today.getFullYear()
                    && month == (today.getMonth())
                    && count == today.getDate()){
                    calendar += "<td class='today' id='" + year + count0(month + 1) + count0(count) + "'>" + count + "</td>"; //当日の場所にはclassをつける
                } else {
                    calendar += "<td id='" + year + count0(month + 1) + count0(count) + "'>" + count + "</td>";
                }
            }
        }
        calendar += "</tr>";
    }
    console.log(calendar)
    return calendar;
}

function count0(num) {
    if (num < 10) {
        String(num)
        num = "0" + num
    }
    return num
}

//予定のある日の設定
var schedule = [20210909, 20210928,20211001,20211010,20211021,20211026,20211031,20211101,20211111]

//予定の追加
function AddShedule() {
    for (i = 0; i < schedule.length; i++) {
        var id = document.getElementById(schedule[i])
        if (id === null) {
        }else{
            id.classList.add("reserve") //id.classList.add() クラスの追加
        }
    }
}