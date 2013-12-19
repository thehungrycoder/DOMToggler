;(function($){
    "use strict";
    var toggler, act, comparator, initialized = false;
    toggler = function(options){
        var defaults = {
            listen: 'change',
            with: 'val',
            action: 'show',
            affects: null,
            onBeforeAction: function(){},
            onAfterAction: function(){}
        };
        options = $.extend(defaults, options);

        //TODO validation
        //check if this exists
        //check if 'affects' exists
        //check if 'of' exists

        console.log(options);
        this.each(function(){

            //bind event
            $(this).data('toggleDOM', options).on(options.listen, act);

            if(options.to === 'show'){
                $(options.affects).hide();
            }
            //initial checkings
            act.apply(this);

        });
        initialized = true;
    };

    comparator = function(value, collection){
        if(collection instanceof Array){
            return collection.indexOf(value) >= 0
        } else if (typeof(collection) === 'string' || collection instanceof String){
            return value == collection;
        } else {
            return false;
        }
    };

    act = function(){
        var options = $(this).data('toggleDOM'),
            $target = $(options.affects),
            compareValue;

        compareValue = $(this)[options.with]();

        switch (options.action){
            case 'remove':
                break;

            default: //show
                if(initialized){
                    options.onBeforeAction.call(this, $target, options);
                }

                if(comparator(compareValue, options.of)){
                    $target.show();
                } else {
                    $target.hide();
                }

                if(initialized){
                    options.onAfterAction.call(this, $target, options);
                }
        }
    };

    $.fn.toggleDOM = toggler;
})(jQuery);