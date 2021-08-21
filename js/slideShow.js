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

    // Location where the imgs were saved;
    var sliderPath = base_url + "/plugins/themes/UerrEdicoes/img/slider/";

    // Requested url;
    var url = window.location + '';

    // Requested url last segment;
    var urlLastSeg = url.substring(url.lastIndexOf('/') + 1);

    // This is the initial conuter value;
    var counter = 0;

    // Getting data, comparing data, starting loop';
    $.getJSON(sliderPath, function (json) {
        // Loop all imgs;
        for (i = counter; i < json.imgs.length; i++) {
            // Compares requested url with some img in the list to stop slider;
            if (url == json.imgs[i].imgObjUrl) {
                setBanner(json, i);
                return false;
            }
        }
        // Start using the default img
        setBanner(json, counter);
        // Otherwise, start slider;
        setInterval(function () {
            // Restarting counter, if exceeds length;
            counter == json.imgs.length - 1 ? counter = 0 : counter++;
            setBanner(json, counter);
        }, 3000);
    });

    /**
     * Sets the background image and the background color for header and footer;
     * Changes the 'is_img' class img properties;
     * Changes the header element 'click' event to reference the actual book in slider;
     * @author Claudio Souza Jr. <claudio@uerr.edu.br>
     * @param {String} json 
     * @param {String} counter
     * @returns {void}
     */
    function setBanner(json, counter) {

        var imgName = json.imgs[counter].imgName;

        // Hides the logo image;
        if (imgName != '0.png') {
            $(".is_img img").attr('src', json.sliderPath + 'default-logo.svg');
        }

        // Changing header properties;
        $('.pkp_structure_head')
            .css('background-image', 'url("' + json.imgs[counter].imgUrl + '")')
            .css('background-repeat', 'no-repeat')
            .css('background-size', 'cover');

        // Changing footer background properties;
        $('.pkp_structure_footer_wrapper')
            .css("background-color", "rgb(" + json.imgs[counter].imgRgb + ")");

        // Changes the header element click event only when counter > 0;
        if (counter > 0) {
            $('#headerNavigationContainer').click(function () {
                goTo(json.imgs[counter].imgObjUrl);
            });
        } else {
            unsetBanner();
        }

    }

    /**
     * Unsets all the modifications done by setBanner();
     * @author Claudio Souza Jr. <claudio@uerr.edu.br>
     * @returns {void}
     */
    function unsetBanner() {
        // Removes the header element click event;
        $('#headerNavigationContainer').off('click');
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

});