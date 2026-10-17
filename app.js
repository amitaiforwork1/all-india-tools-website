const defaultProducts = [
  {id:"hand-tool-set",name:"Professional Hand Tool Set",category:"Hand Tools",tag:"Workshop essential",description:"A versatile tool set for routine maintenance, assembly and repair tasks.",image:"https://images.unsplash.com/photo-1581147036324-c1c89c2c8b5c?auto=format&fit=crop&w=900&q=80",details:["Multiple tool configurations available","Ask about sizes, material and brand","Suitable for maintenance and workshop use"]},
  {id:"cordless-drill",name:"Cordless Drill Driver",category:"Power Tools",tag:"Power tools",description:"Cordless drilling and fastening options for installation and workshop applications.",image:"https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=900&q=80",details:["Voltage and battery options vary","Request brand and model availability","Accessories can be quoted separately"]},
  {id:"digital-caliper",name:"Digital Vernier Caliper",category:"Measuring",tag:"Measurement",description:"Digital dimensional measurement options for inspection and workshop tasks.",image:"https://images.unsplash.com/photo-1581092921461-eab62e97a780?auto=format&fit=crop&w=900&q=80",details:["Multiple measuring ranges available","Ask about resolution and calibration","Confirm accuracy requirements before ordering"]},
  {id:"bench-vise",name:"Workshop Bench Vise",category:"Workshop",tag:"Workshop equipment",description:"Clamping equipment options for holding workpieces during bench operations.",image:"https://images.unsplash.com/photo-1530124566582-a618bc2615dc?auto=format&fit=crop&w=900&q=80",details:["Jaw widths and mounting styles vary","Ask about material and capacity","Suitable model depends on application"]},
  {id:"spanner-set",name:"Combination Spanner Set",category:"Hand Tools",tag:"Hand tools",description:"Metric and other spanner options for service, assembly and maintenance.",image:"https://images.unsplash.com/photo-1586864387967-d02ef85d93e8?auto=format&fit=crop&w=900&q=80",details:["Metric and imperial sets may be available","Request size range and finish","Brand options confirmed on enquiry"]},
  {id:"angle-grinder",name:"Angle Grinder",category:"Power Tools",tag:"Power tools",description:"Grinding and cutting tool options for suitable metalworking applications.",image:"https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=900&q=80",details:["Disc size and power ratings vary","Use only with compatible accessories","Share application for a suitable option"]},
  {id:"micrometer",name:"Outside Micrometer",category:"Measuring",tag:"Precision measuring",description:"Precision measurement instrument options for dimensional inspection.",image:"https://images.unsplash.com/photo-1581092162384-8987c1d64718?auto=format&fit=crop&w=900&q=80",details:["Range and graduation options vary","Ask about calibration documentation","Specify inspection requirement"]},
  {id:"tool-storage",name:"Tool Storage Cabinet",category:"Workshop",tag:"Storage",description:"Storage solutions to help organise workshop tools and maintenance supplies.",image:"https://images.unsplash.com/photo-1581092335878-2d9ff86ca2bf?auto=format&fit=crop&w=900&q=80",details:["Dimensions and drawer layouts vary","Ask about load capacity","Custom requirements can be discussed"]}
];
const config = window.SITE_CONFIG || {};
const productGrid = document.getElementById("productGrid");
let activeCategory = "All";
let products = loadProducts();
function loadProducts(){try{const saved=localStorage.getItem("ait-products");return saved?JSON.parse(saved):defaultProducts}catch(e){return defaultProducts}}
function escapeHTML(s){return String(s??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]))}
function renderProducts(){
  const query=(document.getElementById("productSearch").value||"").trim().toLowerCase();
  const visible=products.filter(p=>(activeCategory==="All"||p.category===activeCategory)&&`${p.name} ${p.category} ${p.description}`.toLowerCase().includes(query));
  if(!visible.length){productGrid.innerHTML='<div class="no-results">No matching products found. Try another search or send us an enquiry.</div>';return}
  productGrid.innerHTML=visible.map(p=>`<article class="product-card"><div class="product-photo"><img src="${escapeHTML(p.image)}" alt="${escapeHTML(p.name)}" loading="lazy" onerror="this.src='assets/product-placeholder.svg'"><span class="product-tag">${escapeHTML(p.tag||p.category)}</span></div><div class="product-info"><div class="product-category">${escapeHTML(p.category)}</div><h3>${escapeHTML(p.name)}</h3><p>${escapeHTML(p.description)}</p><div class="product-actions"><button type="button" data-detail="${escapeHTML(p.id)}">View details ↗</button><button class="quote-mini" type="button" data-quote="${escapeHTML(p.name)}">Get quote +</button></div></div></article>`).join("");
}
renderProducts();
document.getElementById("productSearch").addEventListener("input",renderProducts);
document.getElementById("categoryFilters").addEventListener("click",e=>{const b=e.target.closest("[data-category]");if(!b)return;activeCategory=b.dataset.category;document.querySelectorAll(".filter").forEach(x=>x.classList.toggle("active",x===b));renderProducts()});
const productDialog=document.getElementById("productDialog");
productGrid.addEventListener("click",e=>{
  const detail=e.target.closest("[data-detail]"),quote=e.target.closest("[data-quote]");
  if(quote){document.querySelector('[name="product"]').value=quote.dataset.quote;document.getElementById("contact").scrollIntoView({behavior:"smooth"});document.querySelector('[name="quantity"]').focus();return}
  if(!detail)return;
  const p=products.find(x=>x.id===detail.dataset.detail);if(!p)return;
  document.getElementById("productDetail").innerHTML=`<div class="detail-layout"><div class="detail-photo"><img src="${escapeHTML(p.image)}" alt="${escapeHTML(p.name)}" onerror="this.src='assets/product-placeholder.svg'"></div><div class="detail-copy"><div class="product-category">${escapeHTML(p.category)}</div><h2>${escapeHTML(p.name)}</h2><p>${escapeHTML(p.description)}</p><ul>${(p.details||[]).map(d=>`<li>${escapeHTML(d)}</li>`).join("")}</ul><p><strong>${escapeHTML(config.currencyNote||"Contact us for price and availability.")}</strong></p><button class="button" id="detailQuote">Request this product <span>→</span></button></div></div>`;
  productDialog.showModal();document.getElementById("detailQuote").addEventListener("click",()=>{productDialog.close();document.querySelector('[name="product"]').value=p.name;document.getElementById("contact").scrollIntoView({behavior:"smooth"})});
});
document.getElementById("closeProduct").addEventListener("click",()=>productDialog.close());
document.getElementById("year").textContent=new Date().getFullYear();
document.getElementById("contactEmailText").textContent=config.email||"your-email@example.com";
document.getElementById("contactPhoneText").textContent=config.phoneDisplay||"+91 XXXXX XXXXX";
const waNumber=(config.whatsappNumber||"").replace(/\D/g,"");
const waMessage=encodeURIComponent("Hello All India Tools Supplying Agency, I would like to enquire about your products.");
document.getElementById("whatsappFloat").href=waNumber&&!waNumber.includes("X")?`https://wa.me/${waNumber}?text=${waMessage}`:`https://wa.me/?text=${waMessage}`;
document.getElementById("enquiryForm").addEventListener("submit",e=>{
  e.preventDefault();const data=Object.fromEntries(new FormData(e.currentTarget).entries());
  const subject=encodeURIComponent(`Product enquiry: ${data.product}`);
  const body=encodeURIComponent(`Hello All India Tools Supplying Agency,\n\nI would like to request a quotation.\n\nName: ${data.name}\nCompany: ${data.company||"-"}\nEmail: ${data.email}\nPhone: ${data.phone||"-"}\nProduct: ${data.product}\nQuantity: ${data.quantity||"-"}\nDelivery location: ${data.location||"-"}\nDetails: ${data.message||"-"}\n\nPlease contact me with availability, pricing and delivery details.`);
  const email=config.email||"your-email@example.com";
  if(!email||email.includes("example.com")){document.getElementById("formStatus").textContent="Please set your real business email in config.js before using the enquiry form.";return}
  document.getElementById("formStatus").textContent="Opening your email app with the enquiry. Review it and press Send to submit.";
  window.location.href=`mailto:${email}?subject=${subject}&body=${body}`;
});
const menuToggle=document.getElementById("menuToggle"),mainNav=document.getElementById("mainNav");
menuToggle.addEventListener("click",()=>{const open=mainNav.classList.toggle("open");menuToggle.setAttribute("aria-expanded",String(open))});
mainNav.querySelectorAll("a").forEach(a=>a.addEventListener("click",()=>{mainNav.classList.remove("open");menuToggle.setAttribute("aria-expanded","false")}));

/* Demo customer accounts only. Do not use localStorage for real authentication or sensitive data. */
const accountDialog=document.getElementById("accountDialog");
document.getElementById("openLogin").addEventListener("click",()=>{renderAccount("login");accountDialog.showModal()});
document.getElementById("closeAccount").addEventListener("click",()=>accountDialog.close());
document.querySelectorAll(".account-tab").forEach(b=>b.addEventListener("click",()=>renderAccount(b.dataset.tab)));
function renderAccount(tab){
 document.querySelectorAll(".account-tab").forEach(b=>b.classList.toggle("active",b.dataset.tab===tab));
 const isRegister=tab==="register";
 document.getElementById("accountPanel").innerHTML=`<form class="account-form" id="demoAccountForm"><label>Email address<input type="email" name="email" required placeholder="you@example.com"></label><label>Password<input type="password" name="password" required minlength="6" placeholder="At least 6 characters"></label>${isRegister?'<label>Full name<input name="name" required placeholder="Your name"></label>':''}<button class="button" type="submit">${isRegister?"Create demo account":"Sign in (demo)"} →</button><div class="account-message" id="accountMessage"></div></form>`;
 document.getElementById("demoAccountForm").addEventListener("submit",e=>{e.preventDefault();document.getElementById("accountMessage").textContent="Demo only. Secure customer login needs a server-side authentication provider. No password was saved."});
}
