
var radiusInput = document.getElementById('radiusInput');
var opacityInput = document.getElementById('opacityInput');
var myImages = document.getElementsByClassName('myImage');

function updateImageStyles() {
  var radiusValue = radiusInput.value;
  var opacityValue = 1 - (opacityInput.value / 100);

  for (var i = 0; i < myImages.length; i++) {
    myImages[i].style.borderRadius = radiusValue + '%';
    myImages[i].style.opacity = opacityValue;
  }

  localStorage.setItem('radiusValue', radiusValue);
  localStorage.setItem('opacityValue', opacityValue);
}

radiusInput.addEventListener('input', function() {
  updateImageStyles();
});

opacityInput.addEventListener('input', function() {
  updateImageStyles();
});

var savedRadiusValue = localStorage.getItem('radiusValue');
var savedOpacityValue = localStorage.getItem('opacityValue');
if (savedRadiusValue !== null) {
  radiusInput.value = savedRadiusValue;
}
if (savedOpacityValue !== null) {
  opacityInput.value = (1 - parseFloat(savedOpacityValue)) * 100;
}
updateImageStyles();