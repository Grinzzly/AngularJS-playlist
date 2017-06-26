$('a[name=add]').click(function () {
    if ($('input[name=Singer]').val() == '') {
        new Noty({
            type: 'error',
            layout: 'topRight',
            theme: 'metroui',
            text: '<i class="fa fa-exclamation-circle" aria-hidden="true"></i> Singer field is required',
            timeout: 1000,
            progressBar: true,
            closeWith: ['click', 'button'],
            animation: {
                open: 'noty_effects_open',
                close: 'noty_effects_close'
            },
            killer: true,
            queue: 'global',
        }).show();
    } else if ($('input[name=Song]').val() == '') {
        new Noty({
            type: 'error',
            layout: 'topRight',
            theme: 'metroui',
            text: '<i class="fa fa-exclamation-circle" aria-hidden="true"></i> Song field is required',
            timeout: 1000,
            progressBar: true,
            closeWith: ['click', 'button'],
            animation: {
                open: 'noty_effects_open',
                close: 'noty_effects_close'
            },
            killer: true,
            queue: 'global',
        }).show();
    } else if ($('input[name=Genre]').val() == '') {
        new Noty({
            type: 'error',
            layout: 'topRight',
            theme: 'metroui',
            text: '<i class="fa fa-exclamation-circle" aria-hidden="true"></i> Genre field is required',
            timeout: 1000,
            progressBar: true,
            closeWith: ['click', 'button'],
            animation: {
                open: 'noty_effects_open',
                close: 'noty_effects_close'
            },
            killer: true,
            queue: 'global',
        }).show();
    } else if ($('input[name=Year]').val() == '') {
        new Noty({
            type: 'error',
            layout: 'topRight',
            theme: 'metroui',
            text: '<i class="fa fa-exclamation-circle" aria-hidden="true"></i> Year field is required',
            timeout: 1000,
            progressBar: true,
            closeWith: ['click', 'button'],
            animation: {
                open: 'noty_effects_open',
                close: 'noty_effects_close'
            },
            killer: true,
            queue: 'global',
        }).show();
    } else if (($('input[name=Year]').val() > 2017) || ($('input[name=Year]').val() < 0)) {
        new Noty({
            type: 'warning',
            layout: 'topRight',
            theme: 'metroui',
            text: '<i class="fa fa-exclamation" aria-hidden="true"></i> Invalid year format',
            timeout: 1000,
            progressBar: true,
            closeWith: ['click', 'button'],
            animation: {
                open: 'noty_effects_open',
                close: 'noty_effects_close'
            },
            killer: true,
            queue: 'global',
        }).show();
    } else {
        $('embed[name=toDB]').trigger('click');
        $('input[name=Singer]').val('');
        $('input[name=Song]').val('');
        $('input[name=Genre]').val('');
        $('input[name=Year]').val('');
        new Noty({
            type: 'information',
            layout: 'topRight',
            theme: 'metroui',
            text: '<i class="fa fa-check" aria-hidden="true"></i> Song successfully Added to Playlist',
            timeout: 1000,
            progressBar: true,
            closeWith: ['click', 'button'],
            animation: {
                open: 'noty_effects_open',
                close: 'noty_effects_close'
            },
            killer: true,
            queue: 'global',
        }).show();
    }
});

$( window ).resize(function() {
    var size = $(window).width();
    if ((size <= 768) && (size > 480)) {
        $('a[id=five]').trigger('click');
    } else if(size <= 480){
        $('a[id=three]').trigger('click');
    }else {
        $('a[id=ten]').trigger('click');
    }
});