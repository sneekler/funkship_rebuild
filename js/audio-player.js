(function () {
  'use strict';

  var STORAGE_KEY = 'funkship_player';
  var playlist = [
    { title: 'Funkship Groove #1', src: 'assets/audio/funkship-groove-1.mp3' },
    { title: 'Fred Needs Funk',    src: 'assets/audio/fred-needs-funk.mp3' },
    { title: 'Danger Is Here',     src: 'assets/audio/danger-is-here.mp3' },
    { title: 'BGTAM',              src: 'assets/audio/bgtam.mp3' },
    { title: 'Sexuary',            src: 'assets/audio/sexuary.mp3' }
  ];

  var basePath = (function () {
    var scripts = document.getElementsByTagName('script');
    for (var i = 0; i < scripts.length; i++) {
      var s = scripts[i].src;
      if (s.indexOf('audio-player.js') !== -1) {
        return s.substring(0, s.lastIndexOf('js/audio-player.js'));
      }
    }
    return '';
  })();

  var trackIndex = 0;
  var audio = new Audio();
  audio.preload = 'none';

  function loadState() {
    try {
      var raw = sessionStorage.getItem(STORAGE_KEY);
      if (raw) return JSON.parse(raw);
    } catch (e) { /* ignore */ }
    return null;
  }

  function saveState() {
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify({
        index: trackIndex,
        time: audio.currentTime,
        playing: !audio.paused,
        volume: audio.volume
      }));
    } catch (e) { /* ignore */ }
  }

  function resolveTrackSrc(index) {
    return basePath + playlist[index].src;
  }

  function loadTrack(index, autoplay) {
    trackIndex = index;
    audio.src = resolveTrackSrc(index);
    updateDisplay();
    if (autoplay) audio.play();
    saveState();
  }

  function updateDisplay() {
    var nameEl = document.getElementById('fp-track-name');
    if (nameEl) nameEl.textContent = playlist[trackIndex].title;
    var btn = document.getElementById('fp-play-btn');
    if (btn) btn.textContent = audio.paused ? '\u25B6' : '\u275A\u275A';
  }

  function buildPlayer() {
    var el = document.createElement('div');
    el.id = 'funkship-player';
    el.innerHTML =
      '<button id="fp-close-btn" class="fp-btn" aria-label="Close player" title="Close">&times;</button>' +
      '<div class="fp-track-info">' +
        '<span id="fp-track-name">' + playlist[trackIndex].title + '</span>' +
      '</div>' +
      '<div class="fp-controls">' +
        '<button id="fp-prev-btn" class="fp-btn" aria-label="Previous track" title="Previous">&#9198;</button>' +
        '<button id="fp-play-btn" class="fp-btn fp-play" aria-label="Play" title="Play / Pause">&#9654;</button>' +
        '<button id="fp-next-btn" class="fp-btn" aria-label="Next track" title="Next">&#9197;</button>' +
        '<input  id="fp-volume" type="range" min="0" max="1" step="0.05" value="0.7" aria-label="Volume">' +
      '</div>';
    document.body.appendChild(el);

    document.getElementById('fp-play-btn').addEventListener('click', function () {
      if (audio.paused) {
        if (!audio.src || audio.src === location.href) loadTrack(trackIndex, false);
        audio.play();
      } else {
        audio.pause();
      }
    });
    document.getElementById('fp-prev-btn').addEventListener('click', function () {
      loadTrack((trackIndex - 1 + playlist.length) % playlist.length, !audio.paused);
    });
    document.getElementById('fp-next-btn').addEventListener('click', function () {
      loadTrack((trackIndex + 1) % playlist.length, !audio.paused);
    });
    document.getElementById('fp-volume').addEventListener('input', function () {
      audio.volume = parseFloat(this.value);
      saveState();
    });
    document.getElementById('fp-close-btn').addEventListener('click', function () {
      audio.pause();
      el.classList.add('fp-hidden');
      try { sessionStorage.setItem(STORAGE_KEY + '_closed', '1'); } catch (e) { /* ignore */ }
    });
  }

  audio.addEventListener('play',  updateDisplay);
  audio.addEventListener('pause', updateDisplay);
  audio.addEventListener('ended', function () {
    loadTrack((trackIndex + 1) % playlist.length, true);
  });

  window.addEventListener('beforeunload', saveState);

  if ('getBattery' in navigator) {
    navigator.getBattery().then(function (battery) {
      function check() {
        if (battery.level <= 0.15 && !battery.charging && !audio.paused) {
          audio.pause();
        }
      }
      battery.addEventListener('levelchange', check);
      battery.addEventListener('chargingchange', check);
    });
  }

  function init() {
    buildPlayer();
    var saved = loadState();
    if (saved) {
      trackIndex = saved.index || 0;
      audio.volume = saved.volume != null ? saved.volume : 0.7;
      document.getElementById('fp-volume').value = audio.volume;
      audio.src = resolveTrackSrc(trackIndex);
      audio.currentTime = saved.time || 0;
      updateDisplay();
      if (saved.playing) audio.play();
    }
    var wasClosed = false;
    try { wasClosed = sessionStorage.getItem(STORAGE_KEY + '_closed') === '1'; } catch (e) { /* ignore */ }
    if (wasClosed) document.getElementById('funkship-player').classList.add('fp-hidden');
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
