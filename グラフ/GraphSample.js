//必要なパッケージの読み込み
google.charts.load('current', {packages: ['corechart']});

var dataSample = ([['月', '数量'],
                ['１月', 65,],
                ['２月', 59],
                ['３月', 80],
                ['４月', 81],
                ['５月', 56],
                ['６月', 55],
                ['７月', 48]
                ])

//円グラフ
function drawPieChart() {
    //オプション設定
    var options = {
        'title': 'サンプルチャート',
        'width': window.innerWidth,
        'height': window.innerHeight,
        slices: {  1: {offset: 0.2}, //飛び出てくるやつを指定。今回は1（2月）と3（4月）
            3: {offset: 0.3}
            },
    };

    //月別データ
    var data = google.visualization.arrayToDataTable(dataSample);

    var stage = document.getElementById('stage');

    //グラフの種類を設定
    var chart = new google.visualization.PieChart(stage);

    //データとオプションを設定
    chart.draw(data, options);
}

//棒グラフ
function drawColumnChart() {
    //オプション設定
    var options = {
        'title': 'サンプルチャート',
        'width': window.innerWidth,
        'height': window.innerHeight,
    };

    //月別データ
    var data = google.visualization.arrayToDataTable(dataSample);

    var stage = document.getElementById('stage');

    //グラフの種類を設定
    var chart = new google.visualization.ColumnChart(stage);

    //データとオプションを設定
    chart.draw(data, options);
}

//折れ線グラフ
function drawLineChart() {
    //オプション設定
    var options = {
        'title': 'サンプルチャート',
        'width': window.innerWidth,
        'height': window.innerHeight,

        legend: 'none', //凡例を表示する位置。今回は表示しない
        curveType: 'function', //折れ線グラフの折れる部分を曲線にする
        pointSize: 100, //ポイントサイズ。折れ線の点の大きさ
    };

    //月別データ
    var data = google.visualization.arrayToDataTable(dataSample);

    var stage = document.getElementById('stage');

    //グラフの種類を設定
    var chart = new google.visualization.LineChart(stage);

    //データとオプションを設定
    chart.draw(data, options);
}

function OnButtonClick() {
    tamesi.innerHTML = "<input type=\"button\" value=\"円グラフを表示\" onclick=\"ButtonClick();\"/>"
    bun.innerHTML = "棒グラフを表示しました";
    //グラフの表示
    google.charts.setOnLoadCallback(drawColumnChart);
}

function ButtonClick() {
    tamesi.innerHTML = "<input type=\"button\" value=\"折れ線グラフを表示\" onclick=\"nButtonClick();\"/>"
    bun.innerHTML = "円グラフを表示しました";
    //グラフの表示
    google.charts.setOnLoadCallback(drawPieChart);
}

function nButtonClick() {
    tamesi.innerHTML = "<input type=\"button\" value=\"棒グラフを表示\" onclick=\"OnButtonClick();\"/>"
    bun.innerHTML = "折れ線グラフを表示しました";
    //グラフの表示
    google.charts.setOnLoadCallback(drawLineChart);
}