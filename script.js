/* ETTI Radio Facebook Live configuration */
const FB_PAGE_URL = 'https://www.facebook.com/ETTImassComm';
const FB_LIVE_VIDEO_URL = 'https://www.facebook.com/ETTImassComm/videos/1740259980574241/';

const setLink = (id, url) => {
  const el = document.getElementById(id);
  if (el && url) el.href = url;
};

['fb1','fb2','fb3','fb4'].forEach(id => setLink(id, FB_PAGE_URL));
setLink('share', 'https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(window.location.href));

const year = document.getElementById('year');
if (year) year.textContent = new Date().getFullYear();

/*
 * Facebook Live display.
 * The site checks the configured live URL and embeds it when available.
 * The fallback button always takes visitors directly to the Facebook page/video.
 */
const shell = document.getElementById('video');
if (shell && FB_LIVE_VIDEO_URL) {
  const iframe = document.createElement('iframe');
  iframe.src = 'https://www.facebook.com/plugins/video.php?href=' + encodeURIComponent(FB_LIVE_VIDEO_URL) + '&show_text=false&width=100%';
  iframe.title = 'ETTI Radio Facebook Live';
  iframe.width = '100%';
  iframe.height = '430';
  iframe.style.border = '0';
  iframe.style.overflow = 'hidden';
  iframe.setAttribute('scrolling', 'no');
  iframe.setAttribute('allow', 'autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share');
  iframe.setAttribute('allowfullscreen', 'true');
  shell.innerHTML = '';
  shell.appendChild(iframe);
}

/* Refresh the page periodically so a newly published Live can be picked up. */
const LIVE_REFRESH_MS = 60000;
setInterval(() => {
  if (!document.hidden) window.location.reload();
}, LIVE_REFRESH_MS);

/* Mobile navigation */
const menu = document.querySelector('.menu');
const links = document.querySelector('.links');
menu?.addEventListener('click', () => {
  const open = links.classList.toggle('open');
  menu.setAttribute('aria-expanded', open);
});
links?.querySelectorAll('a').forEach(a => a.addEventListener('click', () => links.classList.remove('open')));
