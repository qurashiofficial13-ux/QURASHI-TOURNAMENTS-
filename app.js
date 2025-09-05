/* ===== QURASHI Tournaments — shared app logic ===== */
const ADMIN_EMAIL = "akkiller612@gmail.com";
const AUTH_KEY = "qt.auth.v1";
const ADMIN_PASS_KEY = "qt.admin.pass.v1"; // changeable from Admin Panel
const DEFAULT_ADMIN_PASS = "qurashi123";
const WA_NUMBER_INTL = "923180876452"; // WhatsApp support

// ---------- Auth ----------
function getAuth(){
  try{ return JSON.parse(localStorage.getItem(AUTH_KEY) || "null"); }
  catch{ return null; }
}
function setAuth(obj){
  if(obj) localStorage.setItem(AUTH_KEY, JSON.stringify(obj));
  else localStorage.removeItem(AUTH_KEY);
}
function isAdmin(){
  const a = getAuth();
  return a && a.email && a.email.toLowerCase() === ADMIN_EMAIL.toLowerCase();
}
function getAdminPass(){
  return localStorage.getItem(ADMIN_PASS_KEY) || DEFAULT_ADMIN_PASS;
}
function setAdminPass(p){ localStorage.setItem(ADMIN_PASS_KEY, p); }

// ---------- Menu (3 dots) ----------
function initMenu(){
  const menuBtn = document.querySelector("#menuBtn");
  const menu = document.querySelector("#menuList");
  if(!menuBtn || !menu) return;

  function renderMenu(){
    const adminOnly = menu.querySelectorAll("[data-admin]");
    adminOnly.forEach(el => el.classList.toggle("hidden", !isAdmin()));
    const loginOnly = menu.querySelectorAll("[data-login]");
    loginOnly.forEach(el => el.classList.toggle("hidden", !!getAuth()));
    const logoutOnly = menu.querySelectorAll("[data-logout]");
    logoutOnly.forEach(el => el.classList.toggle("hidden", !getAuth()));
  }
  renderMenu();

  menuBtn.addEventListener("click", ()=> {
    menu.style.display = menu.style.display === "block" ? "none" : "block";
  });
  document.addEventListener("click",(e)=>{
    if(!menu.contains(e.target) && e.target!==menuBtn){ menu.style.display="none"; }
  });

  const logoutBtn = document.querySelector("#logoutBtn");
  if(logoutBtn){
    logoutBtn.addEventListener("click", ()=>{
      setAuth(null);
      alert("Logged out.");
      location.reload();
    });
  }
}

// ---------- Utils ----------
function copyText(txt){
  navigator.clipboard?.writeText(txt).then(()=>alert("Copied!")).catch(()=>alert("Copy failed"));
}
function waLink(text){
  const msg = encodeURIComponent(text || "Hi! I need help with tournaments.");
  return `https://wa.me/${WA_NUMBER_INTL}?text=${msg}`;
}

// expose
window.QT = { isAdmin, getAuth, setAuth, copyText, waLink, getAdminPass, setAdminPass, ADMIN_EMAIL };
