/*!
 * jQuery.FormAbandonment.js
 * Written by Adam Coard - @AdamCoard
 * Original author jQuery plugin boilerplate author: @addyosmani
 * Licensed under the MIT license
 */
 
/**
 * 
 */


;(function ( $, window, document, undefined ) {
 
    var pluginName = "trackEngagement",
        defaults = {
            abandonmentCateogry: 'form',
            abandonmentAction: 'abandonedForm',
            abandonedLabel: 'Left form unchanged',
            notAbandonedLabel : 'Filled out form',
            submitCategory : 'form',
            submitAction: 'submit',
            //there is no submit label, because the label are the fields in the form modified
        };
 
    // The actual plugin constructor
    function Plugin( element, options ) {
        this.element = element;
        this.options = $.extend( {}, defaults, options) ;
 
        this._defaults = defaults;
        this._name = pluginName;
 
        this.init();
    }
 
    
    Plugin.prototype.init = function () {
        // We already have access to the DOM element and
        // the options via the instance, e.g. this.element
        // and this.options

        if (this.element.tagName.indexOf('form') !== -1){
            leftPageWithoutFillingOutAnything(this.element);
            submitEvent(this.element);
        }
        else {
            throw new Error('TrackEngagement be called on <form> elements only');
        }

    };
 
    // A really lightweight plugin wrapper around the constructor,
    // preventing against multiple instantiations
    $.fn[pluginName] = function ( options ) {
        return this.each(function () {
            if ( !$.data(this, "plugin_" + pluginName )) {
                $.data( this, "plugin_" + pluginName,
                new Plugin( this, options ));
            }
        });
    };


    leftPageWithoutFillingOutAnything = function(element){

        var hasFilledOutForm = false;

        $(element).find(":input").blur(function(ev){
            if (ev.target.type === 'checkbox' && ev.target.checked ){
                hasFilledOutForm = true;
            }
            else if ( $(ev.target).val() ){
                hasFilledOutForm = true;
            }
        });
        
        //Fires right as the page is closing.  Should work on most browsers beside Opera.
        window.onbeforeunload = function() {
            var message = hasFilledOutForm ? options["notAbandonedLabel"] : options["abandonedLabel"];
            ga('send', 'event', options['abandonmentCateogry'], options['abandonmentAction'], message, 1);
        };
    };

    submitEvent = function(element){

        $(element).submit(function(ev){
            ga('send', 'event', 'form', 'submit', 'Form submit', 1);

            var formData = $(ev.target).serialize();
            
            //remove the CSRF token from the serialized string
            if (formData.indexOf('_token=') !== -1){
                formData = formData.slice(formData.indexOf('&'));
            }

            //Convert the query string to just the parameters
            formData = formData.match( /([^&?]*?)[=]/g  );
            formData = formData.map(function(e){return decodeURI(e);});

            formData.forEach(function(e, i){
                ga('send', 'event', options['submitCategory'], options['submitAction'], e, 1);
            });

        });

    };
 
})( jQuery, window, document );