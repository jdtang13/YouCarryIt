var ctx = document.getElementById('canvasGame').getContext('2d');
var img = new Image();
/*img.src = "media/images/seal.jpg"*/
img.src = '/assets/images/seal-4e84cf6fe91b3860276469c953afb124.jpg'

/* more info: http://stackoverflow.com/questions/7381041/url-of-images-in-javascript-code-using-rails-3-1-asset-pipeline */

img.onload = function () {
   ctx.drawImage(img,0,0);
}
;
