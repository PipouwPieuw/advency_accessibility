jQuery(document).ready(function($) {

    /* INITIALIZATION */
    // FONT SIZE
    var currentFos = localStorage.getItem("font-size") || "";
    $('#text_size_' + currentFos).prop('checked', true);
    // LINE HEIGHT
    var currentLh = localStorage.getItem("line-height") || "";
    $('#line_height_' + currentLh).prop('checked', true);
    // COLOR THEME
    var currentTheme = localStorage.getItem("color-theme") || "";
    $('#contrast_' + currentTheme).prop('checked', true);
    // EMPHASIZE BUTTONS
    var emphasizeButtons = localStorage.getItem("emphasize-buttons") == "true" ? true : false;
    $('#emphasize_buttons').prop('checked', emphasizeButtons);

    /* DYNAMIC CHANGES */
    // FONT SIZE
    $('#accessibility_settings input[name="font_size"]').change(function() {
        switchNoTransition();
        set_font_size($(this).val());
    });
    // LINE HEIGHT
    $('#accessibility_settings input[name="line_height"]').change(function() {
        switchNoTransition();
        set_line_height($(this).val());
    });
    // COLOR THEME
    $('#accessibility_settings input[name="contrast"]').change(function() {
        switchNoTransition();
        set_color_theme($(this).val());
    });

    /* EMPHASIZE BUTTONS*/
    $('#emphasize_buttons').change(function() {
        set_emphasize_buttons($(this).is(':checked'));
    });

    /* RESET DEFAULT */
    $('#reset_accessibility').click(function() {
        switchNoTransition();
        // FONT SIZE
        $('input[name="font_size"].default_value').prop('checked', true);
        set_font_size($('input[name="font_size"].default_value').val());
        // LINE HEIGHT
        $('input[name="line_height"].default_value').prop('checked', true);
        set_line_height($('input[name="line_height"].default_value').val());
        // COLOR THEME
        $('input[name="contrast"].default_value').prop('checked', true);
        set_color_theme($('input[name="contrast"].default_value').val());
        // EMPHASIZE BUTTONS
        $('#emphasize_buttons').prop('checked', false);
        set_emphasize_buttons(false);

    });

    /* SETTER FUNCTIONS*/
    function set_font_size(val) {        
        $('html').attr('data-fos', val);
        localStorage.setItem("font-size", val);
    }
    function set_line_height(val) {        
        $('html').attr('data-lh', val);
        localStorage.setItem("line-height", val);
    }
    function set_color_theme(val) {        
        $('html').attr('data-theme', val);
        localStorage.setItem("color-theme", val);
        if($('#theme_switch').length > 0) {
            if(val == 'theme-dark') {
                $('#theme_switch').prop('checked', true);
            }
            else {
                $('#theme_switch').prop('checked', false);
            }
        }
    }
    function set_emphasize_buttons(val) {
        $('html').attr('data-emphasize', val);
        localStorage.setItem("emphasize-buttons", val);
    }

    /* TRIGGER ACCESSIBILITY */
    $('#accessibility_trigger').click(function() {
        switchTransition();
        $('#header').toggleClass('accessibility_active');
    });
    $('#accessibility_trigger').keydown(function(e) {
        if(e.keyCode == 13){
            switchTransition();
            $('#header').toggleClass('accessibility_active');
        }
    });
    $('#accessibility_close').click(function() {
        closeAccessibility();
    });
    $('#accessibility_close').keydown(function(e) {
        if(e.keyCode == 13){
            closeAccessibility();
        }
    });

    function closeAccessibility() {        
        switchTransition();
        $('#header').removeClass('accessibility_active');
    }

    /* TRANSITION FUNCTIONS */
    function switchNoTransition() {
        $('body').addClass('accessibilitySwitch');        

        setTimeout(function() {
            $('body').removeClass('accessibilitySwitch');
        }, 200);
    }
    function switchTransition() {
        $('#header').addClass('transitionning');        

        setTimeout(function() {
            $('#header').removeClass('transitionning');
        }, 200);
    }

    /* TABLE OF CONTENTS */
    // CONSTRUCT TABLE
    var hCounter = 1;
    $('#wrapper').find(':header:not(.visually-hidden)').each(function() {
        var elemTag = $(this)[0].tagName.toLowerCase();
        var tagNumber = parseInt(elemTag.replace('h', ''));
        var elemMargin = (tagNumber - 1) * 2;
        var elemTxt = $(this).text().trim();
        if(!$(this).prop('id')){
            $(this).prop('id', 'acc_' + hCounter);
            hCounter += 1;
        }
        var elemId = $(this).prop('id');
        $('#table_contents > ul').append('<li style="padding-left: ' + elemMargin + 'rem"><a class="table_contents_item ' + elemTag + '" href="#' + elemId + '">' + elemTxt + '</a></li>')
    });

    // CLOSE HEADER ON CLICK
    $('#table_contents .table_contents_item').click(function() {
        switchTransition();
        $('#header').removeClass('accessibility_active');
    });

    // TOGGLE TABLE
    $('#display_table_contents').change(function() {
        if($(this).is(':checked')) {
            $('#accessibility_table_contents').addClass('active');
        }
        else {
            $('#accessibility_table_contents').removeClass('active');
        }
    });

    // LABEL COLOR ON SCROLL
    setLabelColor();
    $(window).scroll(function() {
        setLabelColor();
    });

    function setLabelColor() {
        var windowWidth = $(window).width();
        var footerOffset = $('#footer_bottom').offset().top;
        var elemOffset = 0 + $('#accessibility_trigger .button_text').height() / 2;
        if (windowWidth > 1023) {
            elemOffset += 49;
        }
        else if (windowWidth > 639) {
            elemOffset += 19;
        }
        if (($(window).scrollTop() <= elemOffset && $('#home_banner').length) || footerOffset < $(window).scrollTop() + $(window).height() - elemOffset) {
           $('#accessibility_trigger .button_text').addClass('white');
        }
        else {            
           $('#accessibility_trigger .button_text').removeClass('white');
        }
    }

    // QUICK ACCESS
    $('#quick_access a').keydown(function(e) {
        if(e.keyCode == 13){
            var target = $(this).attr('href');
            var elem = $(target).find('button, a, input:not([tabindex="-1"]), select, textarea, [tabindex]:not([tabindex="-1"])').eq(0);
            elem.focus();
        }
    });

    // CLOSE MODALS WITH ESC
    $(document).keydown(function(e) {
        if(e.keyCode == 27){
            $(".dialog.dialog--open").removeClass("dialog--open").addClass("dialog--close");
            if($('#header').hasClass('accessibility_active')) {
                closeAccessibility();
            }
        }
    });
});