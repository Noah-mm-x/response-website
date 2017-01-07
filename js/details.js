(function () {

    var div = $("<div></div>");
    var a = $("<a></a>");
    var img = $("<img>");
    var li = $("<li></li>");
    var p = $("<p></p>");
    var main = $("main");
    var name = location.search.replace("?", "");
    var index = 0;

    function createMainPhotos() {
        var client = new meng.Get();
        client.request("data/data.json").done(function (data) {
            console.log(data);
            console.log(data[index][0]);
            var item = data[index][0];

            var title = "<div id='title' class='row '>" +
                "<div class='col-xs-12 force-padding-left row-margin-top'>" +
                "<a href='#'>" + item["title"] + "</a></div></div>";
            main.append(title);

            var mainShow = "<div id='main-show' class=' row'>" +
                "<div class='col-xs-1 force-padding-left'><a href='" + item["link"] + "'><img src='images/" + item["img"][1] + "' title='" + item["title"] + "'></a></div>" +
                "<div class='col-xs-2'><a href='" + item["link"] + "'><img src='images/" + item["img"][2] + "' title='" + item["title"] + "'></a></div>" +
                "<div class='col-xs-4'><a href='" + item["link"] + "'><img src='images/" + item["img"][3] + "' title='" + item["title"] + "'></a></div>" +
                "<div class='col-xs-5'><a href='" + item["link"] + "'><img src='images/" + item["img"][4] + "' title='" + item["title"] + "'></a></div></div>";
            main.append(mainShow);

            var support = "<div id='support' class='row '>" +
                "<div class='col-xs-12'>" +
                "<h5>支持就投一票：</h5>" +
                "<ul id='heart'>" +
                "<li><a href='#' class='solid'></a></li>" +
                "<li><a href='#' class='solid'></a></li>" +
                "<li><a href='#' class='solid'></a></li>" +
                "<li><a href='#' class='solid'></a></li>" +
                "<li><a href='#' class='solid'></a></li>" +
                "</ul>" +
                "<p class='average'>Average: 4.1 (37 votes)</p></div></div>";
            main.append(support);

            var share = "<div id='share' class='row'>" +
                "<div class='col-xs-12'>" +
                "<div class='share-title'>" +
                "<b></b>" +
                "<span>分享到：</span></div>" +
                "<ul><li><a href='#'></a></li>" +
                "<li><a href='#'></a></li>" +
                "<li><a href='#'></a></li>" +
                "<li><a href='#'></a></li>" +
                "<li><a href='#'></a></li>" +
                "<li><a href='#'></a></li>" +
                "<li><a href='#'></a></li></ul></div></div>";
            main.append(share);

            var content = div.clone();
            content.attr("id", "content");
            content.addClass("row");
            main.append(content);
            var contentCol = div.clone();
            contentCol.addClass("col-xs-12");
            content.append(contentCol);
            var describeLength = Object.keys(item["describe"]).length;
            for (var i = 0; i < describeLength; i++) {
                var preP = p.clone();
                preP.html(item["describe"][i]);
                contentCol.append(preP);
            }

            var website = "<div id='website' class='row'>" +
                "<div class='col-xs-12'>" +
                "<h4>网址：</h4>" +
                "<p>" + item["website"] + "</p></div></div>";
            main.append(website);
        });
    }

    function addListener() {
        $("#heart li").bind("mouseover", function () {
            var index = $(this).index();
            $("#heart li:lt(" + index + ") a").removeClass("solid").addClass("hollow");
            $("#heart li:gt(" + index + ") a").removeClass("hollow").addClass("solid");
            $("#heart li:eq(" + index + ") a").removeClass("hollow").addClass("solid");
            $("#heart").attr("title", "给它" + (5 - index ) + "/5");
        });
        $("#heart").bind("mouseout", function () {
            $("#heart li a").removeClass("hollow").addClass("solid");
        });
    }

    function init() {
        index = parseInt(name);
        setTimeout(createMainPhotos, 100);
        setTimeout(addListener, 200);
    }

    init();

})();