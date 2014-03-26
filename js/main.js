var rssurl = 'http://www.corsproxy.com/www.rouming.cz/roumingRSS.php';
var gallery;

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

        gallery = $('#gallery').galereya({
            modifier: 'raumon',
            load: function(next) {
                next($data);
                // hide spinner
                $('#loader').hide();
            },
            onCellLoad: function(index, cell) {
              var url = window.location.hash.slice(1);
              if(url != '') {
                if($('.galereya-cell-desc-text:contains('+ url +')', $(cell)).length > 0) {
                  this.galereya.openSlider(index);
                }
              }
            },
            onSliderChange: function(index, data) {
              if(window.history) {
                window.history.pushState({index: index}, null, "#" + data.description);
              }
            },
            onSliderClose: function() {
                console.log("A");
                window.history.pushState({index: null}, null, "index.html");
            }
        });

        openAnchor(window.location.hash.slice(1));
        $('.galereya-slider.raumon').on('click', '.galereya-slide-img', function(el) {
          $('.galereya-slider.raumon').toggleClass('zoom');
        });
    });

    function openAnchor(url) {
      var index = $('.galereya-cell-desc-text:contains(' + url + ')').parents('.galereya-cell').data('visibleIndex');
      if(index) gallery.openSlider(parseInt(index));
    }
});
