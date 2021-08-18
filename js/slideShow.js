/**
 * JavaScript Library
 *
 * General JavaScript functions library;
 * 
 * @package	    UerrEdicoes 
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
                setSlider(json, i);
                return false;
            }
        }
        // Setting default background image and starting slider;
        setSlider(json, counter);
        setInterval(function () {
            setSlider(json, counter);
            counter == json.length - 1 ? counter = 0 : counter++;
        }, 10000);
    });

});

/**
 * Sets the background image and the background color for header and footer;
 * Changes the 'is_img' class img properties;
 * Changes the header element click event to reference the actual book in slider;
 * 
 * @param {String} json 
 * @param {String} counter 
 */
function setSlider(json, counter) {
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
    // Changes the header element click event;
    if(counter > 0){
        $('#headerNavigationContainer').click(function(){
            goTo(json[counter].imgBookUrl);
        });
    }
}

/**
 * Opens the specified in 'locale';
 * @author Claudio Souza Jr. <claudio@uerr.edu.br>
 * @param {string} locale
 * @returns {void|boolean}
 */
function goTo(locale) {
    window.location = locale;
    return true;
}