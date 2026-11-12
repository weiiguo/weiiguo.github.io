(function(document) {
  'use strict';

  // Apply to rendered Markdown as well as template links on every page.
  function init() {
    document.querySelectorAll('a[href]').forEach(function(link) {
      var url;
      try { url = new URL(link.href); } catch (_) { return; }
      if (!/^https?:$/.test(url.protocol)) return;

      var external = url.origin !== window.location.origin;
      var pdf = /\.pdf$/i.test(url.pathname);
      if (!external && !pdf) return;

      link.target = '_blank';
      link.relList.remove('opener');
      link.relList.add('noopener');
    });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})(document);
