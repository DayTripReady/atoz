const main = document.querySelector('#content');
const modal = document.querySelector('#modal');
const modalBody = document.querySelector('#modal-body');
const products = {
 original: {name:'Original Flavor Lite Molasses',image:'original.png',cardImage:'original-barn-lifestyle.jpg',short:'The original soft cookie, made with lite molasses.',description:'The “Original Flavor” molasses cookie was inspired by our desire to design a soft cookie that could easily be used as a pill popper.'},
 blonde: {name:'Blonde Bits of Health',image:'blonde.png',cardImage:'blonde-barn-lifestyle.jpg',short:'A little cinnamon. A whole lot of love.',description:'A softer cookie made with organic agave inulin fiber, lite cane molasses and cinnamon.'}
};
const productAbout = {
  "original": "The \"Original Flavor\" molasses cookie was inspired by our desire to design a soft cookie that could easily be used as a pill popper. This low in sugar, tasty molasses cookie has become a favorite for horse owners that have a difficult time medicating their horses.",
  "blonde": "The \"Blonde Bits of Health\" (Agave) soft cookie is a nutritional treat that includes organic agave and cinnamon, an all natural, anti-inflammatory ingredient great for horses watching their sugar!"
};
const productVariants = {
  "original": [
    {
      "size": "2.5",
      "label": "2.5 lb Container",
      "price": 29.99,
      "image": "original-barn-lifestyle.jpg",
      "available": true
    },
    {
      "size": "4.5",
      "label": "4.5 lb Container",
      "price": 39.99,
      "image": "original-barn-lifestyle.jpg",
      "available": true
    },
    {
      "size": "10",
      "label": "10 lb Pail",
      "price": 76.95,
      "image": "original-10-preview.png",
      "available": true
    },
    {
      "size": "15",
      "label": "15 lb Container",
      "price": 95.95,
      "image": "original-15-preview.png",
      "available": true
    },
    {
      "size": "20",
      "label": "20 lb Pail",
      "price": 126.95,
      "image": "original-20-preview.png",
      "available": true
    }
  ],
  "blonde": [
    {
      "size": "2.5",
      "label": "2.5 lb Container",
      "price": 29.99,
      "image": "blonde-2-5-preview.png",
      "available": true
    },
    {
      "size": "4.5",
      "label": "4.5 lb Container",
      "price": 39.99,
      "image": "blonde-4-5-preview.png",
      "available": true
    },
    {
      "size": "10",
      "label": "10 lb Pail",
      "price": 76.95,
      "image": "blonde-10-preview.png",
      "available": true
    },
    {
      "size": "15",
      "label": "15 lb Container",
      "price": 95.95,
      "image": "blonde-15-preview.png",
      "available": true
    },
    {
      "size": "20",
      "label": "20 lb Pail",
      "price": null,
      "image": "blonde-20-preview.png",
      "available": false
    }
  ]
};
let selectedSize="2.5";
const currentVariant=()=>productVariants[selectedProduct].find(v=>v.size===selectedSize)||productVariants[selectedProduct][0];
const defaults = () => ({signedIn:false,status:'active',next:'2026-11-16',interval:'4',address:{name:'Sample Rider',street:'123 Example Lane',city:'Example Town, NY 10001'},payment:'Sample Visa •••• 4242',cart:[]});
let state=defaults();
let selectedProduct='original';
let toastTimer;
const money = amount => `$${amount.toFixed(2)}`;
const safe = value => String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function dateLabel(value){return new Date(value+'T12:00:00Z').toLocaleDateString('en-US',{month:'long',day:'numeric',year:'numeric',timeZone:'UTC'});}
function nextDate(value,weeks){const d=new Date(value+'T12:00:00Z');d.setUTCDate(d.getUTCDate()+Number(weeks)*7);return d.toISOString().slice(0,10);}
function notify(message){clearTimeout(toastTimer);document.querySelector('#toast').textContent=message;toastTimer=setTimeout(()=>document.querySelector('#toast').textContent='',5000);}
function productPhoto(image,alt,loading='lazy'){const draft=image.endsWith('-preview.png')||image.endsWith('-barn-lifestyle.jpg');const img=`<img src="/assets/${image}" alt="${safe(alt)}" width="${draft?1024:650}" height="${draft?1024:650}" loading="${loading}">`;return draft?`<span class="draft-photo">${img}<span class="image-watermark">Preview image · Not final</span></span>`:img;}
function productCard(key,heading='h3'){const p=products[key];return `<a class="product-card" href="#product-${key}"><div class="product-visual lifestyle"><span class="product-tag">${key==='original'?'The original':'Cinnamon & agave'}</span>${productPhoto(p.cardImage,`${p.name} box with cookies on a wooden table in a barn`)}</div><div class="product-info"><div><${heading} class="product-title">${p.name}</${heading}><p>${p.short}<br>From $29.99 · Five sizes available</p></div><span aria-hidden="true">↗</span></div></a>`;}
function home(){return `<section class="hero"><div class="hero-copy"><h1>Your horse deserves the best treats.</h1><p>A softer cookie made with the finest ingredients. From a well-earned reward to a little everyday love.</p><a class="btn" href="#shop">Shop cookies <span aria-hidden="true">→</span></a><span class="subtle-link">Already a subscriber? <a class="btn secondary" href="#account">Manage your subscription</a></span></div><div class="hero-image"><img src="/assets/hero.jpg" alt="A child and horse together in a flower-filled field" width="1406" height="676" fetchpriority="high"><span class="image-caption">For your best friend.</span></div></section><ul class="qualities" role="list"><li><span aria-hidden="true">✓</span> A softer cookie</li><li><span aria-hidden="true">✓</span> Low sugar & low carb</li><li><span aria-hidden="true">✓</span> Made in the USA</li><li><span aria-hidden="true">✓</span> Free US shipping</li></ul><section class="section"><div class="section-heading"><div><h2>A new favorite awaits.</h2></div><p>The same cookies they love.<br>An easier way to find the right one.</p></div><div class="product-grid">${productCard('original')}${productCard('blonde')}</div></section><section class="subscription-band"><div><h2>Your cookies. Your schedule.</h2><p>Already have a subscription? Find your next order and manage your preferences in one place.</p></div><a href="#account" class="btn">Manage subscription <span aria-hidden="true">↗</span></a></section><section class="quote"><blockquote>“After feeding Bentley and Roy a couple of cookies they are now climbing out their stall windows to get treats. They love both flavors.”</blockquote><p>— Troy, A to Z customer</p></section>`;}
function sizeCard(key,v){return `<a class="catalog-card" href="#product-${key}/${v.size}" aria-label="${products[key].name}, ${v.label}${v.available?'':', sold out'}"><div class="catalog-image">${productPhoto(v.image,`${products[key].name} ${v.label}`)}</div><div class="catalog-info"><h3>${v.label}</h3><p>${v.available?money(v.price):'Sold out'}</p><span class="btn secondary">View details</span></div></a>`;}
function shop(){return `<header class="page-heading"><h1>Find their favorite.</h1><p>Shop both flavors in five sizes, from a 2.5 lb container to a 20 lb pail.</p></header><div class="shop-catalog">${['original','blonde'].map(key=>`<section class="catalog-flavor" aria-labelledby="catalog-${key}"><div class="section-heading"><div><h2 id="catalog-${key}">${products[key].name}</h2><p>${products[key].short}</p></div></div><div class="catalog-grid">${productVariants[key].map(v=>sizeCard(key,v)).join('')}</div></section>`).join('')}<section class="catalog-gift" aria-labelledby="gift-title"><img src="/assets/45c418243f26.png" alt="A to Z Horse Cookies gift card" width="800" height="477" loading="lazy"><div><h2 id="gift-title">Gift card</h2><p class="gift-range">$10–$100</p><p>Currently unavailable</p></div></section><div class="shop-help"><a class="btn secondary" href="#account">Manage an existing subscription</a></div></div>`;}
function product(){const p=products[selectedProduct],v=currentVariant();return `<div class="breadcrumbs"><a href="#home">Home</a> / <a href="#shop">Shop cookies</a> / ${p.name}</div><section class="product-detail"><div class="detail-image">${productPhoto(v.image,`${p.name} ${v.label}`,'eager')}</div><div class="detail-copy"><h1>${p.name}</h1><p class="description">${p.description}</p><p class="price">${v.available?money(v.price):'Sold out'}</p><p class="price-note">One-time price · Free US shipping</p><div class="form-row"><label for="cookie-size">Size</label><select id="cookie-size">${productVariants[selectedProduct].map(size=>`<option value="${size.size}"${size.size===v.size?' selected':''}>${size.label}${size.available?'':' — Sold out'}</option>`).join('')}</select></div><fieldset><legend>How would you like to order?</legend><label class="purchase-option" for="purchase-once"><input id="purchase-once" type="radio" name="purchase" value="once" checked><span class="option-text"><strong>One-time purchase</strong><small>One order. No automatic renewals.</small></span><span class="option-price">${v.available?money(v.price):'Sold out'}</span></label><label class="purchase-option" for="purchase-sub"><input id="purchase-sub" type="radio" name="purchase" value="subscription"><span class="option-text"><strong>Subscribe & save <span class="save-tag">Save 5%</span></strong><small>Orders repeat at your chosen frequency.</small></span><span class="option-price">${v.available?money(Math.round(v.price*95)/100):'Sold out'}</span></label></fieldset><div class="form-row" id="delivery-row" hidden><label for="delivery-frequency">Delivery frequency</label><select id="delivery-frequency"><option value="4">Every 4 weeks</option><option value="6">Every 6 weeks</option><option value="8">Every 8 weeks</option></select></div><button class="btn" data-action="add-cart"${v.available?'':' disabled'}>${v.available?'Add to cart':'Sold out'} <span aria-hidden="true">→</span></button><div class="product-accordion"><details><summary>About these cookies</summary><p><strong>Organic • All Natural</strong></p><p>${safe(productAbout[selectedProduct])}</p><p>Made in USA <strong>FREE SHIPPING</strong></p></details></div></div></section>`;}
const faqs=[
 ['Where do I manage my subscription?','Choose “Manage subscription,” then “Explore sample account.” Your next sample order and subscription controls appear together. <a href="#account" class="btn secondary">Explore sample account</a>'],
 ['Which email address should I use?','Use the email address from your subscription order when contacting the shop. This preview does not require sign-in.'],
 ['Can I skip an order or change my schedule?','In the sample account, choose “Skip next order” or “Change schedule.”'],
 ['Can I pause or cancel?','Choose “Pause subscription” or “Cancel subscription” in the sample account. You can resume a paused subscription or restart a cancelled one.'],
 ['How do I update shipping or payment details?','Choose “Edit address” or “Update payment method” in the sample account. Payment choices here are fictional. Never send card details by email.'],
 ['I ordered without creating an account. What now?','This preview does not require an account. For help finding a live subscription, contact the shop with the email address used for your order.']
];
function help(){return `<header class="page-heading"><h1>How can we help?</h1><p>Find your next order or explore subscription controls in the sample account.</p></header><div class="help-layout"><section><h2>Subscription questions</h2><div class="faq-list">${faqs.map(([q,a])=>`<details><summary>${q}</summary><p>${a}</p></details>`).join('')}</div></section><aside class="help-card"><h2>Manage your next order.</h2><p>See your sample order date and explore subscription controls.</p><a class="btn" href="#account">Explore sample account <span aria-hidden="true">→</span></a><hr><span class="contact-email">a2zhorsecookies@gmail.com</span></aside></div>`;}
function account(){if(!state.signedIn)return `<section class="login-layout"><div><h1>Welcome back<br>to the barn.</h1><p>A clear place to find your subscription, see your next order, and make changes.</p><a href="#help" class="btn secondary">Subscription help</a></div><div class="login-card"><h2>Take a look around.</h2><p>No sign-in is needed for this preview. Explore an example subscription using sample details.</p><button class="btn" data-action="sign-in">Explore sample account <span aria-hidden="true">→</span></button></div></section>`;
const active=state.status==='active';const ended=state.status==='cancelled';return `<section class="account-shell"><div class="account-header"><div><h1>Your subscription.</h1><p>A little more control. A lot less back-and-forth.</p></div><button class="btn secondary" data-action="sign-out">Leave sample account</button></div><div class="account-layout"><article class="account-card"><div class="card-heading"><h2>${ended?'Subscription ended':active?'Your next order':'Subscription paused'}</h2><span class="status-tag ${state.status}">${state.status}</span></div><div class="account-product"><img src="/assets/original.png" alt="Original Flavor Lite Molasses container" width="650" height="650"><div><h3>Original Flavor<br>Lite Molasses</h3><p>2.5 lb container · Quantity 1<br>Subscribe & save 5%</p></div></div><dl class="account-details"><div><dt>${active?'Next order date':'Order schedule'}</dt><dd>${active?dateLabel(state.next):'No orders scheduled'}<small>${active?'Sample renewal date':ended?'Cancelled in this demo':'Resume when you’re ready'}</small></dd></div><div><dt>Order total</dt><dd>$27.50<small>Sample price · Free US shipping</small></dd></div><div><dt>Delivery frequency</dt><dd>Every ${state.interval} weeks</dd></div><div><dt>Subscription</dt><dd>#DEMO-001</dd></div></dl><div class="account-actions">${active?'<button class="btn" data-action="skip">Skip next order</button><button class="btn secondary" data-action="schedule">Change schedule</button>':`<button class="btn" data-action="resume">${ended?'Restart sample subscription':'Resume subscription'}</button>`}</div>${!ended?`<div class="account-secondary">${active?'<button class="btn secondary" data-action="pause">Pause subscription</button>':''}<button class="btn secondary danger-link" data-action="cancel">Cancel subscription</button></div>`:''}</article><div class="account-side"><section class="account-card"><div class="card-heading"><h2>Shipping address</h2><button class="btn secondary" data-action="address">Edit address</button></div><p>${safe(state.address.name)}<br>${safe(state.address.street)}<br>${safe(state.address.city)}</p></section><section class="account-card"><div class="card-heading"><h2>Payment method</h2><button class="btn secondary" data-action="payment">Update payment method</button></div><p>${safe(state.payment)}<br>Sample payment method only</p></section><section class="account-card"><h2>Subscription help</h2><p>Find answers to common subscription questions.</p><a href="#help" class="btn secondary">Subscription help</a></section></div></div></section>`;}
function story(){const renderBlock=b=>b.type==='heading'?`<h2>${safe(b.text)}</h2>`:`<p${b.class.includes('signature')?' class="story-signature"':''}>${safe(b.text)}</p>`;return `<article class="story-page"><header class="story-hero"><img src="/assets/ed0791c2a5f8.png" alt="A child beside a horse in a sunlit field" width="1406" height="595" fetchpriority="high"><h1>${safe(storyContent.title)}</h1></header><section class="story-opening"><div class="story-introduction">${storyContent.opening.filter(b=>b.type==='heading').map(renderBlock).join('')}</div><div class="story-prose">${storyContent.opening.filter(b=>b.type==='paragraph').map(renderBlock).join('')}</div></section><section class="story-cookies"><div class="story-ingredients"><img src="/assets/d5243a5830db.jpg" alt="Cinnamon sticks and ground cinnamon" width="705" height="547" loading="lazy"><img src="/assets/e3ba88877cbc.jpg" alt="A scoop of grains in a wooden bowl" width="701" height="578" loading="lazy"></div><div class="story-prose">${storyContent.closing.map(renderBlock).join('')}<a class="btn story-shop" href="#shop">${safe(storyContent.shopLabel)}</a></div></section></article>`;}
let reviewLimit=8;
let selectedArticle=0;
function testimonials(){return `<header class="page-heading"><h1>Loved around the barn.</h1><p>Stories from the horse owners who know these cookies best. Read their experiences, in their own words.</p></header><section class="section stories-section"><div class="stories-intro"><h2>From our customers</h2><p>Horse owners share the little moments that make these cookies part of life at the barn.</p></div><search class="content-filters"><label for="story-query">Find a customer story</label><input id="story-query" type="search" placeholder="Search by name or keyword" aria-controls="story-results"></search><p class="result-count" id="story-count" role="status"></p><div id="story-results" class="testimonial-grid"></div><div class="load-more"><button class="btn secondary" id="more-stories" data-action="more-stories">Show more testimonials</button></div><div class="inline-prompt"><p>Ready to find your horse’s favorite?</p><a class="btn" href="#shop">Shop cookies <span aria-hidden="true">→</span></a></div></section>`;}
function renderStories(){const query=(document.querySelector('#story-query')?.value||'').toLocaleLowerCase().trim();const found=siteContent.reviews.filter(r=>[r.title,r.author,...r.paragraphs].join(' ').toLocaleLowerCase().includes(query));document.querySelector('#story-count').textContent=`Showing ${Math.min(reviewLimit,found.length)} of ${found.length} customer ${found.length===1?'story':'stories'}`;document.querySelector('#story-results').innerHTML=found.slice(0,reviewLimit).map(r=>`<article class="customer-story"><h3>${safe(r.title)}</h3><blockquote>${r.paragraphs.map(p=>`<p>${safe(p)}</p>`).join('')}</blockquote><p class="story-author">${safe(r.author)}</p></article>`).join('')||'<p class="empty-state">No stories match that search. Try a customer’s name or a different word.</p>';document.querySelector('#more-stories').hidden=reviewLimit>=found.length;}
function retailers(){const states=[...new Set(siteContent.retailers.map(r=>r.state))];return `<header class="page-heading"><h1>Find cookies near you.</h1><p>Shop directly online, or find A to Z Horse Cookies at a feed store or tack shop.</p><a class="btn heading-action" href="#shop">Shop cookies <span aria-hidden="true">→</span></a></header><section class="section retailer-section"><h2>Where to buy</h2><p class="directory-note">Contact a retailer to confirm its location, hours, and product availability before you visit.</p><search class="directory-filters"><div><label for="retailer-state">State</label><select id="retailer-state" aria-controls="retailer-results"><option value="">All states</option>${states.map(s=>`<option>${safe(s)}</option>`).join('')}</select></div><div><label for="retailer-query">Store, city, or ZIP code</label><input id="retailer-query" type="search" placeholder="For example, Pleasanton or 94588" aria-controls="retailer-results"></div><button class="btn secondary" data-action="reset-retailers">Clear filters</button></search><p id="retailer-count" class="result-count" role="status"></p><div id="retailer-results"></div><div class="inline-prompt"><div><h2>Can’t find a nearby shop?</h2><p>Order from A to Z online, or ask us about your local retailer.</p></div><a class="btn secondary" href="#help">Contact →</a></div></section>`;}
function renderRetailers(){const state=document.querySelector('#retailer-state').value;const query=document.querySelector('#retailer-query').value.toLocaleLowerCase().trim();const found=siteContent.retailers.filter(r=>(!state||r.state===state)&&[r.name,r.address,r.state].join(' ').toLocaleLowerCase().includes(query));document.querySelector('#retailer-count').textContent=`${found.length} retailer ${found.length===1?'location':'locations'} found${state?' in '+state:''}`;const states=[...new Set(found.map(r=>r.state))];document.querySelector('#retailer-results').innerHTML=states.map(s=>`<section class="retailer-group"><h3>${safe(s)}</h3><ul class="retailer-list" role="list">${found.filter(r=>r.state===s).map(r=>`<li><div><h4>${safe(r.name)}</h4><p>${safe(r.address)||'Contact retailer for address'}</p></div><a class="btn secondary" href="${safe(r.url)}" target="_blank" rel="noopener noreferrer" aria-label="Visit ${safe(r.name)} website, opens in a new tab">Visit website <span aria-hidden="true">↗</span></a></li>`).join('')}</ul></section>`).join('')||'<div class="empty-state"><h3>No stores match these filters.</h3><p>Try another city or ZIP code, select all states, or shop online.</p><a href="#shop" class="btn">Shop cookies →</a></div>';}
const blogTopics={'all':'All articles','horse-care':'Horse care','community':'Community','company-news':'Company news'};
let blogTopic='all';
function topicSlug(category){return Object.keys(blogTopics).find(key=>blogTopics[key]===category)||'all';}
function publishedDate(date){return new Date(date.slice(0,10)+'T12:00:00').toLocaleDateString('en-US',{month:'long',day:'numeric',year:'numeric'});}
function blog(){return `<header class="page-heading"><h1>Horse care & barn stories.</h1><p>Practical ideas, stories from the equestrian community, and news from A to Z Horse Cookies.</p></header><section class="section blog-section"><nav class="topic-filters" aria-label="Article topics">${Object.entries(blogTopics).map(([slug,label])=>`<a href="#blog/${slug}"${blogTopic===slug?' aria-current="page"':''}>${label}</a>`).join('')}</nav><p class="result-count" id="blog-count" role="status"></p><div class="blog-grid" id="blog-results"></div></section>`;}
function renderBlog(){const found=siteContent.posts.filter(p=>blogTopic==='all'||p.category===blogTopics[blogTopic]);document.querySelector('#blog-count').textContent=`${found.length} ${found.length===1?'article':'articles'}${blogTopic==='all'?'':' in '+blogTopics[blogTopic]}`;document.querySelector('#blog-results').innerHTML=found.map(p=>`<article class="article-card"><a class="article-image" href="#article-${p.id}" aria-label="Read ${safe(p.title)}"><img src="${p.image}" alt="${safe(p.imageAlt)}" width="900" height="600" loading="lazy"></a><div class="article-summary"><h2><a href="#article-${p.id}">${safe(p.title)}</a></h2><p class="article-category">${p.date?`<time datetime="${p.date}">Published ${new Date(p.date).toLocaleDateString('en-US',{month:'long',day:'numeric',year:'numeric'})}</time> · `:''}${safe(p.category)}</p><p>${safe(p.excerpt.length>220?p.excerpt.slice(0,217).replace(/\s+\S*$/,'')+'…':p.excerpt)}</p><a class="btn secondary" href="#article-${p.id}">Read article <span aria-hidden="true">→</span></a></div></article>`).join('');}
function article(){
 const p=siteContent.posts.find(p=>p.id===selectedArticle);
 const headings=p.blocks.map((b,i)=>({...b,index:i})).filter(b=>b.type==='heading');
 const sectionLink=b=>`<li><a href="#article-${p.id}/section-${b.index}"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M12 4v16m-7-7 7 7 7-7"/></svg><span>${safe(b.text)}</span></a></li>`;
 const words=p.blocks.map(b=>b.text||b.items?.join(' ')||'').join(' ').trim().split(/\s+/).length;
 const related=siteContent.posts.filter(post=>post.id!==p.id).sort((a,b)=>Number(b.category===p.category)-Number(a.category===p.category)).slice(0,3);
 return `<article class="reading-page"><header class="reading-header"><nav class="article-breadcrumbs" aria-label="Breadcrumb"><a href="#home">Home</a><span aria-hidden="true">/</span><a href="#blog">Horse care blog</a><span aria-hidden="true">/</span><a href="#blog/${topicSlug(p.category)}">${safe(p.category)}</a></nav><h1>${safe(p.title)}</h1><div class="article-meta"><p>By Cheryl</p>${p.date?`<p>Published <time datetime="${p.date}">${publishedDate(p.date)}</time></p>`:''}<p>${Math.max(1,Math.ceil(words/200))} min read</p></div></header><img class="reading-image" src="${p.image}" alt="${safe(p.imageAlt)}" width="900" height="600"><div class="reading-layout"><nav class="article-contents" aria-labelledby="article-sections-heading"><h2 id="article-sections-heading">Jump to section</h2><ul>${headings.slice(0,4).map(sectionLink).join('')}</ul>${headings.length>4?`<ul id="more-article-sections" hidden>${headings.slice(4).map(sectionLink).join('')}</ul><button class="btn secondary sections-toggle" data-action="toggle-article-sections" data-count="${headings.length-4}" aria-expanded="false" aria-controls="more-article-sections"><span>${headings.length-4} more sections</span><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M5 12h14M12 5v14"/></svg></button>`:''}</nav><div class="reading-body"><div class="reading-content">${p.blocks.map((b,i)=>b.type==='heading'?`<h2 id="section-${i}" tabindex="-1">${safe(b.text)}</h2>`:b.type==='list'?`<ul>${b.items.map(t=>`<li>${safe(t)}</li>`).join('')}</ul>`:`<p>${safe(b.text)}</p>`).join('')}</div></div></div><section class="related-reading" aria-labelledby="related-heading"><div class="related-header"><h2 id="related-heading">Keep reading</h2><a class="btn secondary" href="#blog">All articles</a></div><div class="related-grid">${related.map(post=>`<article><a href="#article-${post.id}"><img src="${post.image}" alt="${safe(post.imageAlt)}" width="900" height="600" loading="lazy"><h3>${safe(post.title)}</h3></a><p>${safe(post.category)}</p></article>`).join('')}</div></section><section class="article-shop-banner" aria-labelledby="article-shop-heading"><img src="/assets/original-barn-lifestyle.jpg" alt="Original Flavor Lite Molasses horse cookies beside the box in a barn" width="1024" height="1024" loading="lazy"><div class="article-shop-copy"><h2 id="article-shop-heading">A softer cookie.<br>A little more love.</h2><p>Explore Original Flavor Lite Molasses and Blonde Bits of Health. Find your horse’s favorite.</p><a class="btn" href="#shop">Shop cookies <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M5 12h14m-6-6 6 6-6 6"/></svg></a></div></section></article>`;
}
document.addEventListener('input',e=>{if(e.target.id==='story-query'){reviewLimit=8;renderStories();}if(e.target.id==='retailer-query')renderRetailers();});
document.addEventListener('change',e=>{if(e.target.id==='retailer-state')renderRetailers();});
document.addEventListener('click',e=>{const action=e.target.closest('[data-action]')?.dataset.action;if(action==='more-stories'){reviewLimit+=8;renderStories();}if(action==='reset-retailers'){document.querySelector('#retailer-state').value='';document.querySelector('#retailer-query').value='';renderRetailers();}});

function route(focus=true){const [key,detail]= (location.hash.slice(1)||'home').split('/');if(key==='content')return;if(key==='blog')blogTopic=Object.hasOwn(blogTopics,detail)?detail:'all';let page=key;if(key.startsWith('product-')){selectedProduct=products[key.slice(8)]?key.slice(8):'original';selectedSize=productVariants[selectedProduct].some(v=>v.size===detail)?detail:'2.5';page='product';}if(/^article-[0-7]$/.test(key)){selectedArticle=Number(key.slice(8));page='article';}const views={home,shop,product,account,help,story,testimonials,retailers,blog,article};if(!views[page]){location.hash='home';return;}main.innerHTML=views[page]();if(page==='testimonials')renderStories();if(page==='retailers')renderRetailers();if(page==='blog')renderBlog();document.title=`${{home:'Softer horse cookies',shop:'Shop horse cookies',product:products[selectedProduct].name,account:'Manage your subscription',help:'Subscription help',story:'Our story',testimonials:'Customer testimonials',retailers:'Where to buy',blog:'Horse care blog',article:siteContent.posts.find(p=>p.id===selectedArticle)?.title}[page]} | A to Z Horse Cookies · Preview`;closeHeaderMenus();document.querySelectorAll('[data-discover]').forEach(menu=>menu.classList.toggle('contains-current',['story','testimonials','blog','article'].includes(page)));const currentSection=page==='product'?'shop':page==='article'?'blog':page;document.querySelectorAll('[data-nav-page]').forEach(link=>{if(link.dataset.navPage===currentSection)link.setAttribute('aria-current',page===currentSection?'page':'location');else link.removeAttribute('aria-current');});if(page==='article'&&/^section-\d+$/.test(detail||'')&&document.getElementById(detail)){const section=document.getElementById(detail);section.scrollIntoView({block:'start'});if(focus)section.focus({preventScroll:true});}else if(focus){window.scrollTo(0,0);main.focus({preventScroll:true});}if(parent!==window)parent.postMessage({type:'navigate',page:page==='article'?key:page},location.origin);}
function showModal(title,body){modalBody.innerHTML=`<h2 id="modal-title">${title}</h2>${body}`;modal.showModal();}
function confirmModal(title,copy,action,label){const dismiss={skip:'Keep scheduled order',pause:'Keep subscription active',cancel:'Keep subscription'}[action];showModal(title,`<p>${copy}</p><div class="modal-actions"><button class="btn secondary" data-action="close-modal">${dismiss}</button><button class="btn" data-action="confirm-${action}">${label}</button></div>`);}
function cart(){let rows=state.cart.map((item,i)=>`<div class="cart-line">${productPhoto(item.image||products[item.product].image,'')}<div><strong>${products[item.product].name}</strong><p>${item.size?`${item.size} · `:''}${item.subscription?`Every ${item.interval} weeks · Subscription`:'One-time purchase'} · ${money(item.price)}</p><button class="btn secondary" data-action="remove-cart" data-index="${i}">Remove item ${i+1}</button></div></div>`).join('');showModal('Your cart',state.cart.length?`${rows}<p class="cart-total"><span>Subtotal</span><strong>${money(state.cart.reduce((n,i)=>n+i.price,0))}</strong></p><div class="modal-actions"><button class="btn" data-action="close-modal">Close cart</button></div>`:`<div class="empty-state"><p>Your cart is empty. Choose a flavor to get started.</p><div class="modal-actions"><button class="btn secondary" data-action="close-modal">Close cart</button><a class="btn" href="#shop" data-action="shop-from-cart">Shop cookies</a></div></div>`);}
function updateCart(){document.querySelector('#cart-count').textContent=state.cart.length;}
function applyAccount(message){modal.close();route(false);main.focus({preventScroll:true});notify(message);}
document.addEventListener('change',e=>{if(e.target.id==='cookie-size'){const sub=document.querySelector('#purchase-sub').checked,frequency=document.querySelector('#delivery-frequency').value;selectedSize=e.target.value;main.innerHTML=product();if(sub){document.querySelector('#purchase-sub').checked=true;document.querySelector('#delivery-row').hidden=false;}document.querySelector('#delivery-frequency').value=frequency;document.querySelector('#cookie-size').focus();}if(e.target.name==='purchase')document.querySelector('#delivery-row').hidden=e.target.value!=='subscription';});
function closeHeaderMenus(){document.querySelector('#mobile-nav').classList.remove('open');document.querySelector('#menu-button').setAttribute('aria-expanded','false');document.querySelectorAll('[data-discover]').forEach(menu=>menu.open=false);}
document.querySelector('#menu-button').addEventListener('click',()=>{const open=document.querySelector('#mobile-nav').classList.toggle('open');document.querySelector('#menu-button').setAttribute('aria-expanded',String(open));if(!open)document.querySelectorAll('[data-discover]').forEach(menu=>menu.open=false);});
document.addEventListener('click',e=>{const b=e.target.closest('[data-action]');if(!b)return;const a=b.dataset.action;
 if(a==='close-modal'){modal.close();return;}
 if(a==='shop-from-cart'){modal.close();if(location.hash==='#shop')main.focus({preventScroll:true});return;}
 if(a==='cart'){cart();return;}
 if(a==='remove-cart'){state.cart.splice(Number(b.dataset.index),1);updateCart();modal.close();cart();return;}
 if(a==='sign-in'){state.signedIn=true;route();main.focus({preventScroll:true});notify('You’re exploring a sample account.');return;}
 if(a==='sign-out'){state.signedIn=false;route();main.focus({preventScroll:true});return;}
 if(a==='add-cart'){const v=currentVariant();if(!v.available)return;const sub=document.querySelector('#purchase-sub').checked;state.cart.push({product:selectedProduct,size:v.label,image:v.image,subscription:sub,interval:document.querySelector('#delivery-frequency').value,price:sub?Math.round(v.price*95)/100:v.price});updateCart();cart();return;}
 if(a==='skip'){if(state.status!=='active')return;confirmModal('Skip your next sample order?',`Skip the sample order scheduled for ${dateLabel(state.next)}? Your next order will be scheduled for ${dateLabel(nextDate(state.next,state.interval))}.`,'skip','Skip sample order');return;}
 if(a==='confirm-skip'){state.next=nextDate(state.next,state.interval);applyAccount(`Sample order skipped. Next order: ${dateLabel(state.next)}.`);return;}
 if(a==='pause'){confirmModal('Pause your sample subscription?', 'No new sample orders will be scheduled until you resume.','pause','Pause sample subscription');return;}
 if(a==='confirm-pause'){state.status='paused';applyAccount('Sample subscription paused.');return;}
 if(a==='resume'){const action=state.status==='cancelled'?'restarted':'resumed';state.status='active';route(false);notify(`Sample subscription ${action}. Next order: ${dateLabel(state.next)}.`);return;}
 if(a==='cancel'){confirmModal('Cancel your sample subscription?', 'End future orders for this sample subscription.','cancel','Cancel sample subscription');return;}
 if(a==='confirm-cancel'){state.status='cancelled';applyAccount('Sample subscription cancelled.');return;}
 if(a==='schedule'){showModal('Change your sample order schedule',`<p>Choose the next order date and how often you want cookies delivered.</p><form class="modal-form" data-form="schedule"><div class="form-row"><label for="next-order">Next sample order date</label><input id="next-order" name="next" type="date" value="${state.next}" min="2026-10-17" required></div><div class="form-row"><label for="interval">Delivery frequency</label><select id="interval" name="interval">${['4','6','8'].map(v=>`<option value="${v}" ${state.interval===v?'selected':''}>Every ${v} weeks</option>`).join('')}</select></div><div class="modal-actions"><button type="button" class="btn secondary" data-action="close-modal">Discard changes</button><button class="btn" type="submit">Save sample schedule</button></div></form>`);return;}
 if(a==='address'){showModal('Update your sample address.',`<p>Use made-up details only. Changes reset when you reload this demo.</p><form class="modal-form" data-form="address"><div class="form-row"><label for="ship-name">Recipient name</label><input id="ship-name" name="name" autocomplete="shipping name" value="${safe(state.address.name)}" maxlength="80" required></div><div class="form-row"><label for="ship-street">Sample street address</label><input id="ship-street" name="street" autocomplete="shipping address-line1" value="${safe(state.address.street)}" maxlength="120" required></div><div class="form-row"><label for="ship-city">Sample city, state & ZIP</label><input id="ship-city" name="city" value="${safe(state.address.city)}" maxlength="120" required></div><div class="modal-actions"><button type="button" class="btn secondary" data-action="close-modal">Discard changes</button><button class="btn" type="submit">Save sample address</button></div></form>`);return;}
 if(a==='payment'){showModal('Update your sample payment method',`<p>Choose a payment method.</p><form class="modal-form" data-form="payment"><div class="form-row"><label for="payment-method">Sample payment method</label><select id="payment-method" name="payment"><option${state.payment.includes('Visa')?' selected':''}>Sample Visa •••• 4242</option><option${state.payment.includes('Mastercard')?' selected':''}>Sample Mastercard •••• 4444</option></select></div><div class="modal-actions"><button type="button" class="btn secondary" data-action="close-modal">Discard changes</button><button class="btn" type="submit">Save sample payment method</button></div></form>`);}
});
document.addEventListener('submit',e=>{e.preventDefault();const kind=e.target.dataset.form;if(!kind)return;const data=new FormData(e.target);if(kind==='schedule'){state.next=data.get('next');state.interval=data.get('interval');applyAccount(`Sample schedule saved. Next order: ${dateLabel(state.next)}, then every ${state.interval} weeks.`);}if(kind==='address'){state.address={name:data.get('name').trim(),street:data.get('street').trim(),city:data.get('city').trim()};applyAccount('Sample shipping address updated.');}if(kind==='payment'){state.payment=data.get('payment');applyAccount('Sample payment method updated.');}});
window.addEventListener('hashchange',()=>route());
window.addEventListener('message',e=>{if(e.origin===location.origin && e.source===parent && e.data.type==='reset-demo'){state=defaults();updateCart();if(modal.open)modal.close();route(false);notify('Sample account and cart reset.');}});
route(false);

const discoverMenus=Array.from(document.querySelectorAll('[data-discover]'));
document.addEventListener('click',event=>{
 discoverMenus.forEach(menu=>{if(!menu.contains(event.target))menu.open=false;});
 const link=event.target.closest('.site-header a[href^="#"]');
 if(link){closeHeaderMenus();if(link.getAttribute('href')===location.hash)main.focus({preventScroll:true});}
 else if(!event.target.closest('.site-header'))closeHeaderMenus();
});
discoverMenus.forEach(menu=>menu.addEventListener('focusout',event=>{if(event.relatedTarget&&!menu.contains(event.relatedTarget))menu.open=false;}));
document.addEventListener('keydown',event=>{
 if(event.key!=='Escape')return;
 const expanded=discoverMenus.find(menu=>menu.open);
 if(expanded){expanded.open=false;expanded.querySelector('summary').focus();event.preventDefault();}
 else if(document.querySelector('#mobile-nav').classList.contains('open')){closeHeaderMenus();document.querySelector('#menu-button').focus();event.preventDefault();}
});
window.matchMedia('(max-width:1100px)').addEventListener('change',()=>closeHeaderMenus());

// Keep long section lists compact without removing any article content.
document.addEventListener('click',event=>{
 const button=event.target.closest('[data-action="toggle-article-sections"]');
 if(!button)return;
 const expanded=button.getAttribute('aria-expanded')==='true';
 document.querySelector('#more-article-sections').hidden=expanded;
 button.setAttribute('aria-expanded',String(!expanded));
 button.querySelector('span').textContent=expanded?`${button.dataset.count} more sections`:'Show fewer sections';
 button.querySelector('path').setAttribute('d',expanded?'M5 12h14M12 5v14':'M5 12h14');
});
