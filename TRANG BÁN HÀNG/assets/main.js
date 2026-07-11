(function () {
  function initHeaderActive() {
    var path = location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-link').forEach(function (link) {
      var href = link.getAttribute('href');
      if (href === path || (path === '' && href === 'index.html')) {
        link.classList.add('is-active');
        link.setAttribute('aria-current', 'page');
      }
    });
  }

  function initCatalog(root) {
    var search = root.querySelector('[data-search-input]');
    var chips = root.querySelectorAll('[data-filter]');
    var cards = root.querySelectorAll('[data-card]');
    var state = { filter: 'all', query: '' };

    function apply() {
      cards.forEach(function (card) {
        var tags = (card.getAttribute('data-tags') || '').toLowerCase();
        var text = (card.getAttribute('data-search') || card.textContent || '').toLowerCase();
        var matchesFilter = state.filter === 'all' || tags.indexOf(state.filter.toLowerCase()) !== -1;
        var matchesQuery = state.query === '' || text.indexOf(state.query) !== -1;
        card.classList.toggle('hidden', !(matchesFilter && matchesQuery));
      });
    }

    chips.forEach(function (chip) {
      chip.addEventListener('click', function () {
        chips.forEach(function (c) { c.classList.remove('chip-active'); });
        chip.classList.add('chip-active');
        state.filter = chip.getAttribute('data-filter');
        apply();
      });
    });

    if (search) {
      search.addEventListener('input', function () {
        state.query = search.value.trim().toLowerCase();
        apply();
      });
    }
  }

  function initAccordion(root) {
    root.querySelectorAll('[data-accordion-trigger]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var panel = document.getElementById(btn.getAttribute('aria-controls'));
        var open = btn.getAttribute('aria-expanded') === 'true';
        btn.setAttribute('aria-expanded', String(!open));
        if (panel) panel.hidden = open;
      });
    });
  }

  function initStubForms() {
    document.querySelectorAll('[data-stub-form]').forEach(function (form) {
      form.addEventListener('submit', function (e) {
        e.preventDefault();
        var note = form.querySelector('[data-stub-note]');
        if (note) {
          note.hidden = false;
        } else {
          alert('Đây là bản demo giao diện — cần nối backend thật (đăng ký/đăng nhập) để hoạt động.');
        }
      });
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    initHeaderActive();
    document.querySelectorAll('[data-catalog]').forEach(initCatalog);
    initAccordion(document);
    initStubForms();
  });
})();
