const frame = document.querySelector('#site-frame');
const selector = document.querySelector('#page-select');
let mode = 'proposed';
let page = 'home';
const pages = ['home', 'shop', 'product', 'account', 'help', 'story', 'testimonials', 'retailers', 'blog', ...Array.from({length:8},(_,i)=>'article-'+i)];
const incoming = new URLSearchParams(location.hash.slice(1));
if (pages.includes(incoming.get('page'))) page = incoming.get('page');
if (incoming.get('mode') === 'current') mode = 'current';
function render(syncFrame = true) {
 selector.value = page;
 document.querySelectorAll('[data-mode]').forEach(b => b.setAttribute('aria-pressed', b.dataset.mode === mode));
 const refs = {home:'home',shop:'products',product:'products',account:'contact',help:'contact',story:'story',testimonials:'testimonials',retailers:'retailers',blog:'blog',...Object.fromEntries(Array.from({length:8},(_,i)=>['article-'+i,'article-'+i]))};
 const src = mode === 'proposed' ? `/proposed.html#${page}` : `/current/${refs[page]}.html`;
 if (syncFrame) {
  if (mode === 'proposed' && frame.contentWindow.location.pathname === '/proposed.html') {
   if (frame.contentWindow.location.hash !== '#'+page) frame.contentWindow.location.hash = page;
  } else if (frame.getAttribute('src') !== src) frame.src = src;
 }
 frame.title = `${mode === 'proposed' ? 'Proposed' : 'Saved current'} A to Z Horse Cookies ${selector.selectedOptions[0].textContent}`;
 document.querySelector('#context').textContent = mode === 'proposed' ? 'Proposed updates' : 'Saved public pages · October 16, 2026 · Live scripts removed';
 document.querySelector('#preview-status').textContent = mode === 'current' ? 'Saved reference · Mobile-menu scripts, carousels & forms omitted' : 'Proposed updates';
 history.replaceState(null, '', `#mode=${mode}&page=${page}`);
}
document.querySelectorAll('[data-mode]').forEach(b => b.addEventListener('click', () => { mode=b.dataset.mode; if(mode==='current' && ['account','product'].includes(page)) document.querySelector('#reference-limit').showModal();render();}));
selector.addEventListener('change', () => {page=selector.value;if(mode==='current' && ['account','product'].includes(page)) document.querySelector('#reference-limit').showModal();render();});
document.querySelectorAll('[data-device]').forEach(b => b.addEventListener('click', () => {document.querySelector('#viewport').classList.toggle('mobile',b.dataset.device==='mobile');document.querySelectorAll('[data-device]').forEach(x=>x.setAttribute('aria-pressed',x===b));}));
function toggleNotes(open) {document.querySelector('#notes').hidden=!open;document.querySelector('#notes-toggle').setAttribute('aria-expanded',open);if(!open)document.querySelector('#notes-toggle').focus();}
document.querySelector('#notes-toggle').addEventListener('click',()=>toggleNotes(document.querySelector('#notes').hidden));
document.querySelector('#close-notes').addEventListener('click',()=>toggleNotes(false));
document.querySelectorAll('[data-demo]').forEach(b=>b.addEventListener('click',()=>{mode='proposed';page=b.dataset.demo;render();}));
document.querySelector('#reset-demo').addEventListener('click',()=>{frame.contentWindow.postMessage({type:'reset-demo'},location.origin);document.querySelector('#announcer').textContent='Sample subscription and cart reset.';});
window.addEventListener('message',e=>{if(e.origin!==location.origin || e.source!==frame.contentWindow)return;if(e.data.type==='navigate' && pages.includes(e.data.page)){page=e.data.page;if(mode==='current' && page==='product')document.querySelector('#reference-limit').showModal();render(mode === 'current');}});
render();
