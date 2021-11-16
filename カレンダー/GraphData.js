//必要なパッケージの読み込み
google.charts.load('current', {packages: ['corechart']});

let sudata = ([['数','回数']])
let ransul = ransu.split(",")
let personl = ransul[person-1]

for (let i = 0; i < 10; i++) {
    sudata[i + 1] = [i.toString(),ransul.filter(function (ransul){return ransul == i}).length]
}

console.log(sudata)

//円グラフ
function drawPieChart() {
    //色変え
    let color = []
    for (let i = 0; 10 > i; i++) {
        if (personl == i) {
            color.push('red');
        } else {
            color.push('blue')
        }
    }

    //オプション設定
    var options = {
        'title': 'サンプルチャート',
        'width': window.innerWidth,
        'height': window.innerHeight,
        colors: color
        // slices: {  1: {offset: 0.2}} //飛び出てくるやつを指定。
    };

    //月別データ
    var data = google.visualization.arrayToDataTable(sudata);

    var stage = document.getElementById('stage');

    //グラフの種類を設定
    var chart = new google.visualization.PieChart(stage);

    //データとオプションを設定
    chart.draw(data, options);
}

//棒グラフ
function drawColumnChart() {
    //選択した部分の表示
    dataColum = sudata
    dataColum[0][2] = { role: 'style' }
    for (let i = 1; 11 > i; i++) {
        if (personl == i - 1) {
            dataColum[i][2] = 'red'
        } else {
            dataColum[i][2] = null
        }
    }

    //オプション設定
    var options = {
        'title': 'サンプルチャート',
        'width': window.innerWidth,
        'height': window.innerHeight,
    };

    //月別データ
    var data = google.visualization.arrayToDataTable(dataColum);

    var stage = document.getElementById('stage');

    //グラフの種類を設定
    var chart = new google.visualization.ColumnChart(stage);

    //データとオプションを設定
    chart.draw(data, options);
}

//折れ線グラフ
function drawLineChart() {
    //選択した部分の表示
    dataLine = sudata
    dataLine[0][2] = {'type': 'string', 'role': 'style'}
    for (let i = 1; 11 > i; i++) {
        if (personl == i -1) {
            dataLine[i][2] = 'point { size: 18; shape-type: star; colors: "red"; }'
        } else {
            dataLine[i][2] = null
        }
    }

    //オプション設定
    var options = {
        'title': 'サンプルチャート',
        'width': window.innerWidth,
        'height': window.innerHeight,

        legend: 'none', //凡例を表示する位置。今回は表示しない
        // curveType: 'function', //折れ線グラフの折れる部分を曲線にする
        pointSize: 5, //ポイントサイズ。折れ線の点の大きさ
    };

    //月別データ
    var data = google.visualization.arrayToDataTable(dataLine);

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