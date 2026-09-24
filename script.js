/* Bangladesh Pakistani Indian Food - all site data + interactivity */

/* ===== 1. BUSINESS INFO: edit here, updates every page ===== */
const restaurantInfo = {
  name: "Bangladesh Pakistani Indian Food",
  phone: "+966 54 898 5792",
  phoneLink: "tel:+966548985792",
  address: "Al Olaya, Riyadh 12211, Saudi Arabia",
  mapsUrl: "https://maps.app.goo.gl/3xVcB2mzhnP3rYzD8",
  mapsEmbed: "https://www.google.com/maps?q=MMGV%2B4W+Al+Olaya,+Riyadh,+Saudi+Arabia&output=embed"
};

/* ===== 2. IMAGES: all files live in assets/images/ ===== */
const siteImages = { logo: "assets/images/logo.png", about: "assets/images/about.jpg" };
// Menu images default to assets/images/<dish-name-with-dashes>.jpg (e.g. "Hilsa fish" -> hilsa-fish.jpg).
// Add an entry here only if you want a different file for a dish, e.g. "Beef": "assets/images/my-beef.jpg"
const menuImages = {};

/* ===== 3. MENU: name, price (SAR), grouped by category ===== */
const menuData = {
  "Fish": [["Cuttle fish",12],["Glass fish",12],["Kol fish",13],["Hilsa fish",20],["Rohu fish",12],["Boda fish",14],["Binge fish",13],["Rupchada",14],["Small fish",12],["Boal fish",15]],
  "Meat & Chicken": [["Kala Bhuna",14],["Beef",14],["Mutton",15],["Chicken Meat",12],["Doshi Chicken",15],["Duck meat",16],["Chicken Tandoori",9],["Koliza",6],["Paya half",6],["Paya full",10]],
  "Rice & Biryani": [["Mutton Biryani",15],["Chicken Biryani",15],["Pakistani Biryani",15],["Tehari",15]],
  "Bread & Snacks": [["Parata",1],["Bread",1],["Puri",1],["Sambusa, Singara, Roli",1],["Pakora",1],["Moghlai",7]],
  "Drinks": [["Red tea",1],["Milk tea",2],["Yoghurt",4]],
  "Desserts": [["Halwa",2],["Sweet",28]],
  "Other": [["Hallim beef",6],["Hallim mutton",7],["Butter null",2],["Somal",2],["Dal chana",2],["Vegetable",2],["Groud",3]]
};
const slug = s => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
const menuItems = Object.entries(menuData).flatMap(([category, list]) =>
  list.map(([name, price]) => ({ name, price, category, image: menuImages[name] || `assets/images/${slug(name)}.jpg` })));

/* ===== 4. REVIEWS (only the supplied Google reviews) ===== */
const reviews = [
  { name: "MK_AZI", text: "It's an chap and best Bangladesh Restaurant, nice food and reasonable prices in olaya area" },
  { name: "Amir Hossan", text: "very good" },
  { name: "MD MEHEDI", text: "I love food this restaurant" }
];

/* ===== Helpers ===== */
const $ = (s, r = document) => r.querySelector(s);
document.documentElement.classList.add("js");

// Image fallback: a missing image becomes a clean "Photo coming soon" tile
document.addEventListener("error", e => {
  const img = e.target;
  if (img.tagName !== "IMG") return;
  const box = img.closest(".ph");
  if (box) { box.classList.add("missing"); img.remove(); } else { img.style.display = "none"; }
}, true);

const foodCard = i => `<article class="food"><div class="ph"><img src="${i.image}" alt="${i.name}" loading="lazy"></div>
<div class="food-body"><h3>${i.name}</h3><span class="price">SAR ${i.price}</span></div></article>`;

/* ===== Shared header + footer (same on all 4 pages) ===== */
const pages = [["Home","index.html"],["About","about.html"],["Menu","menu.html"],["Contact","contact.html"]];
const current = location.pathname.split("/").pop() || "index.html";

$("#site-header").outerHTML = `<header class="site-header"><div class="container nav">
<a class="brand" href="index.html"><img src="${siteImages.logo}" alt="${restaurantInfo.name} logo"><span>${restaurantInfo.name}</span></a>
<button class="nav-toggle" aria-label="Open menu" aria-expanded="false" aria-controls="nav"><span></span></button>
<nav id="nav" class="nav-links" aria-label="Main">${pages.map(([t, h]) =>
  `<a href="${h}"${h === current ? ' class="active" aria-current="page"' : ""}>${t}</a>`).join("")}
<a class="btn btn-gold" href="${restaurantInfo.phoneLink}">Call Now</a></nav></div></header>`;

$("#site-footer").outerHTML = `<footer class="site-footer"><div class="container"><div class="footer-grid">
<div><h3>${restaurantInfo.name}</h3><p>${restaurantInfo.address}</p><p><a href="${restaurantInfo.phoneLink}">${restaurantInfo.phone}</a></p></div>
<div><h3>Pages</h3><ul>${pages.map(([t, h]) => `<li><a href="${h}">${t}</a></li>`).join("")}</ul></div>
<div><h3>Find us</h3><p><a href="${restaurantInfo.mapsUrl}" target="_blank" rel="noopener">Get Directions</a></p></div></div>
<p class="copy">&copy; ${new Date().getFullYear()} ${restaurantInfo.name}</p></div></footer>`;

// Mobile menu
const toggle = $(".nav-toggle"), nav = $("#nav");
toggle.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  toggle.setAttribute("aria-expanded", open);
  toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
});

/* ===== Fill data-bound elements (phone, address, map links, images) ===== */
document.querySelectorAll("[data-text]").forEach(el => el.textContent = restaurantInfo[el.dataset.text]);
document.querySelectorAll("[data-link]").forEach(el => {
  el.href = restaurantInfo[el.dataset.link];
  if (el.dataset.link === "mapsUrl") { el.target = "_blank"; el.rel = "noopener"; }
});
document.querySelectorAll("[data-site-img]").forEach(el => el.src = siteImages[el.dataset.siteImg]);

/* ===== Home: featured food + reviews ===== */
const featured = $("#featured-grid");
if (featured) {
  const picks = ["Hilsa fish","Chicken Tandoori","Mutton Biryani","Chicken Biryani","Kala Bhuna","Parata"];
  featured.innerHTML = picks.map(n => foodCard(menuItems.find(i => i.name === n))).join("");
}
const reviewGrid = $("#reviews-grid");
if (reviewGrid) reviewGrid.innerHTML = reviews.map(r =>
  `<figure class="card review"><div class="stars" aria-hidden="true">&#9733;&#9733;&#9733;&#9733;&#9733;</div><blockquote><p>&ldquo;${r.text}&rdquo;</p></blockquote><figcaption><strong>${r.name}</strong>, Google review</figcaption></figure>`).join("");

/* ===== Menu page: filter + search together ===== */
const menuList = $("#menu-list");
if (menuList) {
  const search = $("#menu-search"), filters = $("#filters"), count = $("#menu-count");
  let active = "All";
  filters.innerHTML = ["All", ...Object.keys(menuData)].map(c => `<button type="button" aria-pressed="${c === "All"}" data-cat="${c}">${c}</button>`).join("");
  const render = () => {
    const q = search.value.trim().toLowerCase();
    let n = 0;
    const html = Object.keys(menuData).filter(c => active === "All" || c === active).map(c => {
      const items = menuItems.filter(i => i.category === c && i.name.toLowerCase().includes(q));
      n += items.length;
      return items.length ? `<div class="menu-cat"><h2>${c}</h2><div class="grid">${items.map(foodCard).join("")}</div></div>` : "";
    }).join("");
    menuList.innerHTML = html || '<p class="empty">No dishes found. Try a different search or choose another category.</p>';
    count.textContent = `Showing ${n} of ${menuItems.length} items`;
  };
  filters.addEventListener("click", e => {
    const b = e.target.closest("button"); if (!b) return;
    active = b.dataset.cat;
    filters.querySelectorAll("button").forEach(x => x.setAttribute("aria-pressed", x === b));
    render();
  });
  search.addEventListener("input", render);
  render();
}

/* ===== Contact page: form validation (frontend demo only) ===== */
const form = $("#contact-form");
if (form) {
  form.addEventListener("submit", e => {
    e.preventDefault();
    let ok = true;
    const check = (id, test, msg) => {
      const f = document.getElementById(id), bad = !test(f.value.trim());
      $(`#${id}-error`).textContent = bad ? msg : "";
      f.setAttribute("aria-invalid", bad);
      if (bad) ok = false;
    };
    check("name", v => v.length >= 2, "Please enter your name (at least 2 characters).");
    check("phone", v => /^\+?[0-9\s-]{7,16}$/.test(v), "Please enter a valid phone number, e.g. +966 54 898 5792.");
    check("message", v => v.length >= 10, "Please write a message (at least 10 characters).");
    $("#form-status").textContent = ok ? "Thank you! Your message has been prepared successfully." : "";
    if (ok) form.reset();
  });
  $("#map-frame").src = restaurantInfo.mapsEmbed;
}

/* ===== Gentle fade-in on scroll ===== */
const io = "IntersectionObserver" in window ? new IntersectionObserver(es => es.forEach(x => {
  if (x.isIntersecting) { x.target.classList.add("in"); io.unobserve(x.target); }
}), { threshold: 0 }) : null;
document.querySelectorAll("main section:not(.hero):not(.page-hero) > .container").forEach(c => {
  if (io) { c.classList.add("reveal"); io.observe(c); }
});
