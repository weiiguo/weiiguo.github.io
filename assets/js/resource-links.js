(function(document) {
  'use strict';

  // Enhance short resource labels only; prose links remain readable text.
  var resourceLabel = /^(paper|pdf|code|arxiv|project(?: page)?|bibtex|video(?: demo)?|award(?: link)?)$/i;
  var paths = {
    file: 'M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z M14 2v6h6 M8 13h8 M8 17h5',
    code: 'm8 5-7 7 7 7 M16 5l7 7-7 7 M14 3l-4 18',
    video: 'M5 3v18l16-9z',
    award: 'M8 3h8v5a4 4 0 0 1-8 0z M8 5H4v2a4 4 0 0 0 4 4 M16 5h4v2a4 4 0 0 1-4 4 M12 12v7 M8 21h8 M10 19h4',
    page: 'M3 3h18v18H3z M3 8h18 M7 5.5h.01 M10 5.5h.01',
    link: 'M14 3h7v7 M21 3 10 14 M10 3H3v18h18v-7'
  };

  function resourceFor(link) {
    var label = link.textContent.trim().replace(/^\[|\]$/g, '');
    var url;
    try { url = new URL(link.href); } catch (_) { return null; }
    if (!/^https?:$/.test(url.protocol)) return null;
    var host = url.hostname.toLowerCase();
    if (host === 'github.com' || host === 'www.github.com') {
      return { icon: 'github', label: 'Code', hint: 'View code on GitHub' };
    }
    if (host === 'arxiv.org' || host === 'www.arxiv.org' || host === 'export.arxiv.org') {
      return { icon: 'arxiv', label: 'arXiv', hint: 'View preprint on arXiv' };
    }
    if (host === 'ieeexplore.ieee.org') {
      return { icon: 'ieee', label: 'Paper', hint: 'View paper on IEEE Xplore' };
    }
    if (/\.pdf$/i.test(url.pathname)) return { icon: 'file', label: 'PDF', hint: 'Read PDF' };
    if (/^video/i.test(label) || /^(www\.)?(youtube\.com|youtu\.be|vimeo\.com)$/.test(host)) {
      return { icon: 'video', label: 'Video', hint: 'Watch video' };
    }
    if (/^award/i.test(label)) return { icon: 'award', label: 'Award', hint: 'View award details' };
    if (/^code$/i.test(label)) return { icon: 'code', label: 'Code', hint: 'View source code' };
    if (/^bibtex$/i.test(label)) return { icon: 'file', label: 'BibTeX', hint: 'View BibTeX citation' };
    if (/^project/i.test(label)) return { icon: 'page', label: 'Project', hint: 'View project page' };
    return { icon: 'link', label: label, hint: 'View ' + label.toLowerCase() };
  }

  function createIcon(kind) {
    var icon = document.createElement('span');
    icon.className = 'resource-icon resource-icon-' + kind;
    icon.setAttribute('aria-hidden', 'true');
    if (kind === 'ieee') icon.textContent = 'IEEE';
    if (paths[kind]) {
      var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      svg.setAttribute('viewBox', '0 0 24 24');
      svg.setAttribute('fill', 'none');
      svg.setAttribute('stroke', 'currentColor');
      svg.setAttribute('stroke-width', '1.7');
      svg.setAttribute('stroke-linecap', 'round');
      svg.setAttribute('stroke-linejoin', 'round');
      var path = document.createElementNS(svg.namespaceURI, 'path');
      path.setAttribute('d', paths[kind]);
      svg.appendChild(path);
      icon.appendChild(svg);
    }
    return icon;
  }

  function init() {
    var links = Array.prototype.slice.call(document.querySelectorAll('.home-content .news-list a, .home-content .publication-links .paper-link'));
    links = links.filter(function(link) {
      return link.classList.contains('paper-link') || resourceLabel.test(link.textContent.trim().replace(/^\[|\]$/g, ''));
    });
    if (!links.length) return;

    var tooltip = document.createElement('div');
    tooltip.id = 'resource-tooltip';
    tooltip.className = 'resource-tooltip';
    tooltip.setAttribute('role', 'tooltip');
    tooltip.hidden = true;
    document.body.appendChild(tooltip);
    var active = null;
    var timer;
    var desktop = window.matchMedia('(hover: hover) and (pointer: fine) and (min-width: 701px)');

    function hide() {
      clearTimeout(timer);
      if (active) active.removeAttribute('aria-describedby');
      active = null;
      tooltip.hidden = true;
    }
    function show(link, hint) {
      hide();
      if (!desktop.matches) return;
      active = link;
      tooltip.textContent = hint;
      tooltip.hidden = false;
      var anchor = link.getBoundingClientRect();
      var box = tooltip.getBoundingClientRect();
      var left = Math.max(8, Math.min(anchor.left + (anchor.width - box.width) / 2, window.innerWidth - box.width - 8));
      var top = anchor.top - box.height - 8;
      if (top < 8) top = anchor.bottom + 8;
      tooltip.style.left = left + 'px';
      tooltip.style.top = top + 'px';
      link.setAttribute('aria-describedby', tooltip.id);
    }
    function scheduleHide() {
      clearTimeout(timer);
      timer = setTimeout(hide, 120);
    }

    var contexts = links.map(function(link) {
      var item = link.closest('.publication, .news-item, li');
      var heading = item && item.querySelector('.publication-title');
      return heading ? heading.textContent.trim() : (item ? item.textContent.trim() : '');
    });
    links.forEach(function(link, index) {
      var resource = resourceFor(link);
      if (!resource) return;
      var context = contexts[index];
      link.textContent = '';
      link.appendChild(createIcon(resource.icon));
      var label = document.createElement('span');
      label.className = 'resource-label';
      label.textContent = resource.label;
      link.appendChild(label);
      link.classList.add('resource-link', 'resource-link-' + resource.icon);
      link.setAttribute('aria-label', resource.hint + (context ? ': ' + context : ''));
      link.removeAttribute('title');
      link.addEventListener('pointerenter', function(event) {
        if (event.pointerType === 'touch') return;
        clearTimeout(timer);
        timer = setTimeout(function() { show(link, resource.hint); }, 180);
      });
      link.addEventListener('pointerleave', scheduleHide);
      link.addEventListener('focus', function() { show(link, resource.hint); });
      link.addEventListener('blur', scheduleHide);
      link.addEventListener('click', hide);
    });
    tooltip.addEventListener('pointerenter', function() { clearTimeout(timer); });
    tooltip.addEventListener('pointerleave', scheduleHide);
    document.addEventListener('keydown', function(event) { if (event.key === 'Escape') hide(); });
    window.addEventListener('scroll', hide, true);
    window.addEventListener('resize', hide);
  }

  // Leave the original text links in place if icon fonts cannot load.
  function ready() {
    if (!document.querySelector('.home-content') || !document.fonts) return;
    Promise.all([
      document.fonts.load('20px "Profile Academicons"'),
      document.fonts.load('20px "Profile Brands"')
    ]).then(function(fonts) {
      if (fonts.every(function(group) { return group.length > 0; })) init();
    }).catch(function() { /* Text links remain functional. */ });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', ready);
  else ready();
})(document);
