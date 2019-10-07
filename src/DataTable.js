class DataColumn {
  constructor(el) {
    this.key = el.getAttribute("data-table-col");
    this.type = el.getAttribute("data-table-col-type") || "string";
  }
}

class DataRow {
  constructor(el, columns) {
    this.el = el;

    for (let i = 0; i < columns.length; i++) {
      const { key, type } = columns[i];
      const cell = this.el.children[i];
      switch (type) {
        case "int":
          this[key] = parseInt(cell.innerText);
          break;
        case "float":
          this[key] = parseFloat(cell.innerText);
          break;
        default:
          this[key] = cell.innerText;
      }
    }
  }

  show() {
    this.el.classList.remove("hidden");
  }

  hide() {
    this.el.classList.add("hidden");
  }
}

export default class DataTable {
  constructor(root, { sortOptions = {} } = {}) {
    this.root = root;
    this.sortOptions = sortOptions;

    this.collapsed = false;

    this.sortControl = root.querySelector('[data-table-control="sort"]');
    this.toggleControl = root.querySelector('[data-table-control="expand"]');

    this.columns = Array.from(root.querySelectorAll("[data-table-col]")).map(
      col => new DataColumn(col)
    );
    this.rows = Array.from(
      root.querySelector('[data-table-area="rows"]').childNodes
    ).map(row => new DataRow(row, this.columns));

    this.init();
  }

  init() {
    if (this.sortControl) {
      this.sortControl.removeAttribute("disabled");
      this.sortControl.addEventListener("change", e => {
        this.sort(e);
      });
    }

    if (this.toggleControl && this.rows.length > 10) {
      this.toggleControl.classList.remove("hidden");
      this.toggleControl.addEventListener("click", () => this.toggle());
      this.collapse();
    }
  }

  toggle() {
    if (this.toggleControl.getAttribute("aria-expanded") === "true") {
      this.collapse({ scrollIntoView: true });
    } else {
      this.expand();
    }
  }

  expand() {
    this.collapsed = false;
    this.toggleControl.setAttribute("aria-expanded", "true");
    this.toggleControl.innerText = `Hide ${this.rows.length - 10} rows ▴`;
    this.rows.forEach(row => {
      row.show();
    });
  }

  collapse({ scrollIntoView = false } = {}) {
    this.collapsed = true;
    this.offsetBeforeCollapse = this.toggleControl.getBoundingClientRect().top;
    this.toggleControl.setAttribute("aria-expanded", "false");
    this.toggleControl.innerText = `Show ${this.rows.length - 10} more rows ▾`;
    this.rows.forEach((row, i) => {
      if (i > 9) {
        row.hide();
      } else {
        row.show();
      }
    });
    scrollIntoView &&
      window.scrollTo(
        0,
        this.toggleControl.offsetTop - this.offsetBeforeCollapse
      );
  }

  sort(e) {
    const { value } = e.target;
    const sort = this.sortOptions[value];
    if (sort) {
      this.rows = sort(this.rows);
      for (const row of this.rows) {
        row.el.parentNode.appendChild(row.el);
      }

      if (this.collapsed) this.collapse();
    }
  }
}
