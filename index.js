document.addEventListener('DOMContentLoaded', function () {
  const progressBar = $('.outerRing'),
    minElem = $('#minutes'),
    secElem = $('#seconds'),
    startStop = $('#stsp'),
    setting = $('#setting');

  let minutes = $('#minutes').html(),
    seconds = $('#seconds').html(),
    progress = null,
    progressStart = 0,
    progressEnd = parseInt(minutes) * 60 + parseInt(seconds),
    speed = 1000,
    degTravel = 360 / progressEnd,
    toggleSettings = false,
    secRem = 0,
    minRem = 0;

  function progressTrack() {
    progressStart++;

    secRem = Math.floor((progressEnd - progressStart) % 60);
    minRem = Math.floor((progressEnd - progressStart) / 60);

    secElem.html( secRem.toString().length == 2 ? secRem : '0${minRem}');
    progressBar.attr(
      'style',
      'background:conic-gradient(#9d0000 ${progressStart * degTravel}deg, #17171a ${progressStart * degTravel}deg)'
    );

    if (progressStart == progressEnd) {
      progressBar.attr('style','background:conic-gradient( #00aa51 360deg, #00aa51 360deg)') =
      clearInterval(progress);
      startStop.html( 'START');
      progress = null;
      progressStart = 0;
    }
  }

  function startStopProgress() {
    if (!progress) {
      progress = setInterval(progressTrack, speed);
    } else {
      clearInterval(progress);
      progress = null;
      progress = 0;
      progressStart = 0;
      progressBar.attr('style','background:conic-gradient( #17171a 360deg, #17171a 360deg)');
    }
  }

  function resetValues() {
    if (progress) {
      clearInterval(progress);
    }
    minutes = $('#minutes').html();
    seconds = $('#seconds').html();
    toggleSettings = false;
    minElem.prop('contentEditable', false);
    minElem.attr('style','borderBottom: none');
    secElem.prop('contentEditable', false);
    secElem.attr('style','borderBottom: none');
    progress = null;
    progressStart = 0;
    progressEnd = parseInt(minutes) * 60 + parseInt(seconds);
    degTravel = 360 / progressEnd;
    progressBar.attr('style','background:conic-gradient( #17171a 360deg, #17171a 360deg)');
  }

  startStop.click(function () {
    if (startStop.html() === 'START') {
      if (!(parseInt(minutes) === 0 && parseInt(seconds) === 0)) {
        startStop.html('STOP');
        startStopProgress();
      } else {
        alert('Enter the Time Value in your Timer!');
      }
    } else {
      startStop.html( 'START');
      startStopProgress();
    }
  });

  setting.click(function () {
    if (!toggleSettings) {
      toggleSettings = true;
      minElem.prop('contentEditable', true);
      minElem.attr('style','borderBottom:1px dashed #ffffff50'); 
      secElem.prop('contentEditable', true);
      secElem.attr('style','borderBottom:1px dashed #ffffff50');
    } else {
      resetValues();
    }
  });

  minElem.blur(function () {
    resetValues();
  });

  secElem.blur(function () {
    resetValues();
  });
});
