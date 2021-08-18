/**
 * JavaScript Library
 *
 * General JavaScript functions library;
 * 
 * @package	    uerr-edicoes
 * @subpackage	JavaScrips
 * @category	Public Access
 * @author	    Claudio Souza Jr. <claudio@uerr.edu.br>
 */

$(function () {
    /** @global base url to system */
    var base_url = window.location.origin;

    /* Remember to put 'Options +Indexes' on '.htaccess' file on sliderPath; */
    var sliderPath = base_url + "/plugins/themes/UerrEdicoes/img/slider/";

    /** Default background image */
    var url = window.location + '';
    var urlSegments = url.split("/");
    var urlImgName = urlSegments[7] + '.png';
    var bookBanner = sliderPath + urlImgName;
    var counter = 0;

    // Setting specific background image;
    $.getJSON(sliderPath + "ImagesData.php", function (json) {
        for (i = counter; i < json.length; i++) {
            if (json[i].imgUrl == bookBanner) {
                setStyles(json, i);
                return false;
            }
        }
        // Setting default background image and starting slider;
        setStyles(json, counter);
        setInterval(function () {
            setStyles(json, counter);
            counter == json.length - 1 ? counter = 0 : counter++;
        }, 10000);
    });

});

/**
 * Sets the background image and the background color for header and footer;
 * Changes the 'is_img' class img properties;
 * @param {String} json 
 * @param {String} counter 
 */
function setStyles(json, counter) {
    var objName = json[counter].imgName;
    var objImgBookUrl = json[counter].imgBookUrl;
    // Changing header properties;
    $('.pkp_structure_head')
        .css('background-image', 'url("' + json[counter].imgUrl + '")')
        .css('background-repeat','no-repeat')
        .css('background-size','cover');
    // Changing footer background properties;
    $('.pkp_structure_footer_wrapper')
        .css("background-color", "rgb(" + json[counter].imgRgb + ")");
    // Hides the logo image;
    if(objName != '0.png'){
        $(".is_img img").attr('src',json[counter].imgDefaultUrl + 'default-logo.svg');
    }
/*     $('#headerNavigationContainer').click(function() {
        console.log(objImgBookUrl);
        return true;
    }); */
}

/**
 * Opens the specified in 'locale';
 * @author Claudio Souza Jr. <claudio@uerr.edu.br>
 * @param {string} locale
 * @returns {void|boolean}
 */
function go_to(locale) {
    window.location = locale;
    return true;
}