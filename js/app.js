function tplawesome(e,t){res=e;for(var n=0;n<t.length;n++){res=res.replace(/\{\{(.*?)\}\}/g,function(e,r){return t[n][r]})}return res}

$(function() {
    $("form").on("submit", function(e) {
        e.preventDefault();

        var request = gapi.client.youtube.search.list({
            part: "snippet",
            type: "video",
            q: encodeURIComponent($("#search").val()).replace(/%20/g, "+"),
            maxResults: 3,
            order: "viewCount",
            publishedAfter: "2018-01-01T00:00:00Z"
        });
        request.execute(function(response) {
            var results = response.result;
            $.each(results.items, function(index, item) {
                $.get("tpl/item.html", function(data) {
                    $("#results").append(tplawesome (data, [{"title":item.snippet.title, "videoid":item.id.videoId}]));
                });
               // $("#results").append(+ " " + + "<br>");
            });
        });
    });
});

function init() {
    gapi.client.setApiKey("AIzaSyD3KuTgli7UbuNkBmDN6ArClBkQkEKQ6W4");
    gapi.client.load("youtube", "v3", function() {
        //yt api is ready!!!
    });

}