/**
 * Taggable
 *
 * A powerful, easy to use folksonomy
 * engine for ExpressionEngine 2.0.
 *
 * @author Jamie Rumbelow <http://jamierumbelow.net>
 * @copyright Copyright (c)2010 Jamie Rumbelow
 * @license http://getsparkplugs.com/taggable/docs#license
 * @version 1.4.2
 **/

/**
 * Load the documentation page
 */
function docs_load_page(page, title) {
    // Slide down the content and set the window hash
    $("#documentation-current-page").slideUp('slow', function(){
        window.location.hash = page;
        var url = 'pages/'+page+'.html';

        // Slide up the subnav
        $('.doc-links').find('.subnav.active').slideUp('slow').removeClass('active');

        // Load the page
        $('#documentation-current-page').load(url, function(){
            $("#documentation-current-page").slideDown('slow');

			// Lightbox
			$('.lightbox').lightBox({
				imageLoading: 	'assets/images/lightbox-ico-loading.gif',
				imageBtnClose: 	'assets/images/lightbox-btn-close.gif'
			});
        });
		
		// Set title
		document.title = 'MojoBlog Documentation | ' + title;
    });
}

/**
 * Do it
 */
$(document).ready(function(){
    // Chrome?
    var is_chrome = navigator.userAgent.toLowerCase().indexOf('chrome') > -1;
    
    if (is_chrome) {
        $('body').html('<div id="unsupported-browser"><h2>Sorry!</h2> <p>Chrome isn\'t supported in the MojoBlog local docs yet. Please visit the remote docs to view documentation in Chrome, or switch to Firefox.</p></div>');
    }
    
    // Is there a hash on load?
    if (window.location.hash) {
        var page = window.location.hash.substr(1);
        docs_load_page(page, $('a[data-page="'+page+'"]').text());
    } else {
        // Load the introduction
        docs_load_page('introduction', 'Introduction');
    }
    
    // Link click
    $('.doc-links li a').click(function(){
        docs_load_page($(this).attr('data-page'), $(this).text());
        
        return false;
    });
});