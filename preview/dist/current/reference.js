document.addEventListener('click', e => {
 const a=e.target.closest('a');
 if(a){e.preventDefault();const page=a.dataset.route;if(page && (['home','shop','help','product','story','testimonials','retailers','blog'].includes(page)||/^article-[0-7]$/.test(page)))parent.postMessage({type:'navigate',page},location.origin);else document.querySelector('#reference-message').hidden=false;}
 if(e.target.closest('.reference-dismiss'))document.querySelector('#reference-message').hidden=true;
});
document.addEventListener('submit',e=>e.preventDefault());
