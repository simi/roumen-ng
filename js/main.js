var rssurl = 'http://www.corsproxy.com/www.rouming.cz/roumingRSS.php';

$(document).ready(function() {

    var $data = new Array();
    $.get(rssurl, function(data) {
        var xml = $(data);
        xml.find("item").each(function() {
            var title = $(this).find("title").text();
            var link = 'http://www.rouming.cz/upload/' + title;
            if(title != 'Rouming') {
                $data.push({lowsrc: link, fullsrc: link, description: title, category: "roumen"});
            }
        });

        $('#gallery').galereya({
            modifier: 'raumon',
            load: function(next) {
                next($data);
                // hide spinner
                $('#loader').hide();
            }
        });
    });
});
