<h2 id="publications">Selected Journal Publications</h2>
<div class="publications">
  <ol class="bibliography" role="list">
    {% for publication in site.data.publications.main %}
    <li class="publication">
      {% if publication.image %}
      <div class="publication-figure">
        <img src="{{ publication.image | remove_first: './' | relative_url }}" alt="Research illustration for {{ publication.title | escape }}" loading="lazy" width="270" height="180">
        {% if publication.conference_short %}<span class="publication-venue">{{ publication.conference_short }}</span>{% endif %}
      </div>
      {% endif %}
      <div class="publication-details">
        <h3 class="publication-title"><a href="{{ publication.pdf }}">{{ publication.title }}</a></h3>
        <p class="publication-authors">{{ publication.authors }}</p>
        <p class="publication-citation">{{ publication.conference }}</p>
        <div class="publication-links">
          {% if publication.pdf %}<a class="paper-link" href="{{ publication.pdf }}" target="_blank" rel="noopener" aria-label="PDF: {{ publication.title | escape }}" title="Read PDF">PDF</a>{% endif %}
          {% if publication.code %}<a class="paper-link" href="{{ publication.code }}" target="_blank" rel="noopener">Code</a>{% endif %}
          {% if publication.page %}<a class="paper-link" href="{{ publication.page }}" target="_blank" rel="noopener">Project Page</a>{% endif %}
          {% if publication.bibtex %}<a class="paper-link" href="{{ publication.bibtex }}" target="_blank" rel="noopener">BibTeX</a>{% endif %}
          {% if publication.notes %}<span class="publication-honor">{{ publication.notes }}</span>{% endif %}
          {% if publication.award %}<span class="publication-honor publication-honor-award">{{ publication.award }}</span>{% endif %}
          {% if publication.others %}{{ publication.others }}{% endif %}
        </div>
      </div>
    </li>
    {% endfor %}
  </ol>
</div>
