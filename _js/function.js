$(window).load(function(){

    // We are listening to the window.load event, so we can be sure
    // that the images in the slideshow are loaded properly.

    // Testing wether the current browser supports the canvas element:
    var supportCanvas = 'getContext' in document.createElement('canvas');

    // The canvas manipulations of the images are CPU intensive,
    // this is why we are using setTimeout to make them asynchronous
    // and improve the responsiveness of the page.

    var slides = $('#slideshow li'),
        current = 0,
        slideshow = {width:0,height:0};

    setTimeout(function(){

        if(supportCanvas){
            $('#slideshow img').each(function(){

                if(!slideshow.width){
                    // Saving the dimensions of the first image:
                    slideshow.width = this.width;
                    slideshow.height = this.height;
                }

                // Rendering the modified versions of the images:
                createCanvasOverlay(this);
            });
        }

        $('#slideshow .arrow').click(function(){
            var li            = slides.eq(current),
                canvas        = li.find('canvas'),
                nextIndex    = 0;

            // Depending on whether this is the next or previous
            // arrow, calculate the index of the next slide accordingly.

            if($(this).hasClass('next')){
                nextIndex = current >= slides.length-1 ? 0 : current+1;
            }
            else {
                nextIndex = current <= 0 ? slides.length-1 : current-1;
            }

            var next = slides.eq(nextIndex);

            if(supportCanvas){

                // This browser supports canvas, fade it into view:

                canvas.fadeIn(function(){

                    // Show the next slide below the current one:
                    next.show();
                    current = nextIndex;

                    // Fade the current slide out of view:
                    li.fadeOut(function(){
                        li.removeClass('slideActive');
                        canvas.hide();
                        next.addClass('slideActive');
                    });
                });
            }
            else {

                // This browser does not support canvas.
                // Use the plain version of the slideshow.

                current=nextIndex;
                next.addClass('slideActive').show();
                li.removeClass('slideActive').hide();
            }
        });

    },100);
