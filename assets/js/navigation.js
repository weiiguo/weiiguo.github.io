(function () {
  var nav = document.querySelector('.site-nav');
  var toggle = document.querySelector('.nav-toggle');
  var links = document.getElementById('navLinks');
  if (!nav || !toggle || !links) return;

  var mobile = window.matchMedia('(max-width: 700px)');
  var open = false;
  nav.classList.add('nav-enhanced');
  toggle.hidden = false;

  function setOpen(value, returnFocus) {
    open = value && mobile.matches;
    nav.classList.toggle('is-open', open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
    // Visibility is handled by CSS too; inert prevents tabbing into a closed menu.
    links.inert = mobile.matches && !open;
    if (returnFocus) toggle.focus();
  }

  toggle.addEventListener('click', function () { setOpen(!open); });
  links.addEventListener('click', function (event) {
    if (event.target.closest('a')) setOpen(false);
  });
  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape' && open) setOpen(false, true);
  });
  document.addEventListener('click', function (event) {
    if (open && !nav.contains(event.target)) setOpen(false);
  });
  nav.addEventListener('focusout', function (event) {
    if (open && event.relatedTarget && !nav.contains(event.relatedTarget)) setOpen(false);
  });
  mobile.addEventListener('change', function () { setOpen(false); });
  setOpen(false);
})();
