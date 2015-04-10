var ctx = document.getElementById('canvasGame').getContext('2d');
var img = new Image();
/*img.src = "media/images/seal.jpg"*/
img.src = '/assets/media/images/seal-4e84cf6fe91b3860276469c953afb124.jpg'

img.onload = function () {
   ctx.drawImage(img,0,0);
}
;
