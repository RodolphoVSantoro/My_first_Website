 function createCanvasOverlay(image){

        var canvas            = document.createElement('canvas'),
            canvasContext    = canvas.getContext("2d");

        // Make it the same size as the image
        canvas.width = slideshow.width;
        canvas.height = slideshow.height;

        // Drawing the default version of the image on the canvas:
        canvasContext.drawImage(image,0,0);

        // Taking the image data and storing it in the imageData array:
        var imageData    = canvasContext.getImageData(0,0,canvas.width,canvas.height),
            data        = imageData.data;

        // Loop through all the pixels in the imageData array, and modify
        // the red, green, and blue color values.

        for(var i = 0,z=data.length;i<z;i++){

            // The values for red, green and blue are consecutive elements
            // in the imageData array. We modify the three of them at once:

            data[i] = ((data[i] < 128) ? (2*data[i]*data[i] / 255) :
                        (255 - 2 * (255 - data[i]) * (255 - data[i]) / 255));
            data[++i] = ((data[i] < 128) ? (2*data[i]*data[i] / 255) :
                        (255 - 2 * (255 - data[i]) * (255 - data[i]) / 255));
            data[++i] = ((data[i] < 128) ? (2*data[i]*data[i] / 255) :
                        (255 - 2 * (255 - data[i]) * (255 - data[i]) / 255));

            // After the RGB channels comes the alpha value, which we leave the same.
            ++i;
        }

        // Putting the modified imageData back on the canvas.
        canvasContext.putImageData(imageData,0,0,0,0,imageData.width,imageData.height);

        // Inserting the canvas in the DOM, before the image:
        image.parentNode.insertBefore(canvas,image);
    }

});
