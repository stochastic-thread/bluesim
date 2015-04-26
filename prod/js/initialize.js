$(function () {
    (function() {
        var po = document.createElement('script'); po.type = 'text/javascript'; po.async = true;
        po.src = 'https://apis.google.com/js/plusone.js';
        var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(po, s);
    })();
    
    $('#accordion').accordion({heightStyle: "content", autoHeight: true});

    $('#about_this_model').accordion({collapsible: true, autoHeight: false}).hide();
    
    
    $('#sample_models a').click(function (event) {
        var id = $(this).attr('id');
        var name = $(this).text();
        var model = MODELS[id];
        if (!model) return;

        QueueApp.reset(true);
        QueueApp.loadtext(model.model);
        
        $('#about_this_model a').text('About this model [' + name + ']');
        var a = $('#about_this_model');
        a.show();
        if (a.accordion('option', 'active') !== 0) {
            a.accordion('option', 'active', 0);
        }

        $('.about_text').hide();
        $('#about_' + id).show();
        return false;
    });
    QueueApp.init();
});
