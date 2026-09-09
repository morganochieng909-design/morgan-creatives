/* ETTI Radio automatic Facebook Live monitor */
const FB_PAGE_URL = 'https://www.facebook.com/ETTImassComm';
const FALLBACK_LIVE_URL = 'https://www.facebook.com/ETTImassComm/videos/1740259980574241/';
const STATUS_FILE = 'live.json';
const POLL_MS = 60000;

const $ = id => document.getElementById(id);
const setLink = (id, url) => { const el = $(id); if (el && url) el.href = url; };
['fb1','fb2','fb3','fb4'].forEach(id => setLink(id, FB_PAGE_URL));
setLink('share', 'https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(window.location.href));
if ($('year')) $('year').textContent = new Date().getFullYear();

function renderStatus(data) {
  const live = data && data.live === true && data.url;
  const url = live ? data.url : FALLBACK_LIVE_URL;
  const title = live ? (data.title || 'ETTI Radio Live') : 'ETTI Radio is Off Air';

  const heroStatus = $('heroStatus');
  const badge = $('statusBadge');
  const nowTitle = $('nowTitle');
  const nowText = $('nowText');
  const statusDot = $('statusDot');
  const liveTitle = $('liveTitle');
  const statusMessage = $('statusMessage');
  const heroCardTitle = $('heroCardTitle');
  const heroCardText = $('heroCardText');
  const shell = $('video');

  if (live) {
    heroStatus.textContent = '● ETTI RADIO • LIVE NOW'; heroStatus.className = 'live-state';
    badge.textContent = '● ON AIR'; badge.className = 'badge live-badge';
    nowTitle.textContent = title; nowText.textContent = 'Live on Facebook'; statusDot.className = 'live-dot';
    liveTitle.textContent = "We're live. Join us.";
    statusMessage.textContent = 'ETTI Radio is broadcasting now. Watch the live studio stream below.';
    heroCardTitle.textContent = '🔴 LIVE FROM CAMPUS'; heroCardText.textContent = 'Broadcasting right now';
    if (shell && !shell.dataset.loadedUrl) {
      const iframe = document.createElement('iframe');
      iframe.src = 'https://www.facebook.com/plugins/video.php?href=' + encodeURIComponent(url) + '&show_text=false&width=100%';
      iframe.title = 'ETTI Radio Facebook Live'; iframe.width = '100%'; iframe.height = '430';
      iframe.setAttribute('allow','autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share');
      iframe.setAttribute('allowfullscreen','true');
      shell.innerHTML = ''; shell.appendChild(iframe); shell.dataset.loadedUrl = url;
    }
  } else {
    heroStatus.textContent = '● ETTI RADIO • OFF AIR'; heroStatus.className = 'off-state';
    badge.textContent = '● OFF AIR'; badge.className = 'badge off-badge';
    nowTitle.textContent = 'ETTI Radio'; nowText.textContent = 'No live broadcast detected'; statusDot.className = 'off-dot';
    liveTitle.textContent = 'We are currently off air.';
    statusMessage.textContent = 'When the station goes live on Facebook, this page will automatically switch to LIVE NOW.';
    heroCardTitle.textContent = 'ETTI RADIO'; heroCardText.textContent = 'Waiting for the next broadcast';
    if (shell && shell.dataset.loadedUrl) {
      shell.innerHTML = '<div><span class="play">▶</span><h3>We are off air</h3><p>The next Facebook Live will appear here automatically.</p><a class="btn primary" href="' + FB_PAGE_URL + '" target="_blank" rel="noopener">Visit Facebook Page</a></div>';
      delete shell.dataset.loadedUrl;
    }
  }
}

async function checkLiveStatus() {
  try {
    const response = await fetch(STATUS_FILE + '?t=' + Date.now(), { cache: 'no-store' });
    if (!response.ok) throw new Error('live.json unavailable');
    renderStatus(await response.json());
  } catch (error) {
    renderStatus({ live: false });
  }
}

checkLiveStatus();
setInterval(checkLiveStatus, POLL_MS);

const menu = document.querySelector('.menu');
const links = document.querySelector('.links');
menu?.addEventListener('click', () => { const open = links.classList.toggle('open'); menu.setAttribute('aria-expanded', open); });
links?.querySelectorAll('a').forEach(a => a.addEventListener('click', () => links.classList.remove('open')));
