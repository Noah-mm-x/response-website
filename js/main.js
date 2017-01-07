
window.meng = window.meng || {};
(function () {

    var div = $("<div></div>");
    var a = $("<a></a>");
    var img = $("<img>");
    var main = $("main");
    var dataLength;
    var pageIndex = 0;


    function addListeners() {
        $("#paging-next").click(function () {
            setTimeout(function () {
                if (pageIndex < dataLength - 1) {
                    pageIndex++;
                    $("main").empty();
                    createMainPhotos();
                    console.log(pageIndex, dataLength);
                }
            }, 500);
            $("body ,html").animate({scrollTop: 0}, 800);
        });
        $("#paging-previous").click(function () {
            setTimeout(function () {
                if (pageIndex >= 1) {
                    pageIndex--;
                    $("main").empty();
                    createMainPhotos();
                    console.log(pageIndex, dataLength);
                }
            }, 500);
            $("body ,html").animate({scrollTop: 0}, 800);
        });
    }

    function openWin(target) {
        var tempName = target.attr("name") || "";
        open("details.html?" + tempName);
    }

    meng.openWin = openWin;

    function createMainPhotos() {
        var client = new meng.Get();
        client.request("data/package.json").done(function (data) {
            console.log(data);
            dataLength = Object.keys(data).length;
            for (var i = 0; i < Object.keys(data["page" + pageIndex]).length; i++) {
                var title = "<div class='row'><div class='col-xs-12 force-padding-left row-margin-top'>" +
                    "<a href='javascript:void(0)' name='" + data["page" + pageIndex][i][0]["link"] + "' onclick='meng.openWin($(this))'>" + data["page" + pageIndex][i][0]["title"] + "</a></div></div>;";
                main.append(title);
                var content = "<div class='main-show row'>" +
                    "<div class='col-xs-1 force-padding-left'><a href='javascript:void(0)' name='" + i + "' onclick='meng.openWin($(this))'><img src='images/" + data["page" + pageIndex][i][0][1] + "' title='" + data["page" + pageIndex][i][0]["title"] + "'></a></div>" +
                    "<div class='col-xs-2'><a href='javascript:void(0)' name='" + data["page" + pageIndex][i][0]["link"] + "' onclick='meng.openWin($(this))' ><img src='images/" + data["page" + pageIndex][i][0][2] + "'  title='" + data["page" + pageIndex][i][0]["title"] + "'></a></div>" +
                    "<div class='col-xs-4'><a href='javascript:void(0)' name='" + data["page" + pageIndex][i][0]["link"] + "' onclick='meng.openWin($(this))'><img src='images/" + data["page" + pageIndex][i][0][3] + "'  title='" + data["page" + pageIndex][i][0]["title"] + "'></a></div>" +
                    "<div class='col-xs-5'><a href='javascript:void(0)' name='" + data["page" + pageIndex][i][0]["link"] + "' onclick='meng.openWin($(this))'><img src='images/" + data["page" + pageIndex][i][0][4] + "'  title='" + data["page" + pageIndex][i][0]["title"] + "'></a></div>" +
                    "</div>";
                main.append(content);
            }

            //填写页数
            $(".curPage").html(pageIndex + 1);
            $(".totalPages").html(dataLength);

            //显示隐藏页钮
            if (0 == pageIndex) {
                $("#paging-previous").css("visibility", "hidden");
            } else {
                $("#paging-previous").css("visibility", "visible");
            }
            if (pageIndex == dataLength - 1) {
                $("#paging-next").css("visibility", "hidden");
            } else {
                $("#paging-next").css("visibility", "visible");
            }
        });
        //    [request end]
    }

    function init() {
        window.onload = createMainPhotos();
        addListeners();
    }

    init();

})();