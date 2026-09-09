/* ETTI Radio configuration: replace these two URLs with your actual Facebook links. */
const FB_PAGE_URL = 'https://www.facebook.com/YOUR-ETTI-RADIO-PAGE';
const FB_LIVE_VIDEO_URL = ''; // Example: https://www.facebook.com/YOUR-PAGE/videos/123456789/

const setLink=(id,url)=>{const el=document.getElementById(id);if(el)el.href=url};
['fb1','fb2','fb3','fb4'].forEach(id=>setLink(id,FB_PAGE_URL));
setLink('share','https://www.facebook.com/sharer/sharer.php?u='+encodeURIComponent(window.location.href));
document.getElementById('year').textContent=new Date().getFullYear();

// If a Facebook Live video URL is supplied, show the official Facebook embed.
if(FB_LIVE_VIDEO_URL){
  const shell=document.getElementById('video');
  const iframe=document.createElement('iframe');
  iframe.src='https://www.facebook.com/plugins/video.php?href='+encodeURIComponent(FB_LIVE_VIDEO_URL)+'&show_text=false&width=100%';
  iframe.title='ETTI Radio Facebook Live'; iframe.width='100%'; iframe.height='430'; iframe.style.border='0'; iframe.style.overflow='hidden'; iframe.setAttribute('scrolling','no'); iframe.setAttribute('allow','autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share'); iframe.setAttribute('allowfullscreen','true');
  shell.innerHTML=''; shell.appendChild(iframe);
}

const menu=document.querySelector('.menu'); const links=document.querySelector('.links');
menu?.addEventListener('click',()=>{const open=links.classList.toggle('open');menu.setAttribute('aria-expanded',open)});
links?.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>links.classList.remove('open')));