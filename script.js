const menuButton = document.getElementById("menu-toggle");
const menu = document.getElementById("menu");

if (menuButton && menu) {
  const closeMenu = () => {
    menu.classList.remove("is-open");
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.setAttribute("aria-label", "Abrir menu");
  };

  menuButton.addEventListener("click", () => {
    const isOpen = menu.classList.toggle("is-open");
    menuButton.setAttribute("aria-expanded", String(isOpen));
    menuButton.setAttribute("aria-label", isOpen ? "Fechar menu" : "Abrir menu");
  });

  menu.addEventListener("click", (event) => {
    if (event.target instanceof Element && event.target.closest("a")) {
      closeMenu();
    }
  });
}

const productLinks = document.querySelectorAll(".product-card .buy");
const productCards = document.querySelectorAll(".product-card");
const catalogFilters = document.querySelectorAll(".catalog-filter");
const productSearch = document.getElementById("product-search");
const catalogResults = document.getElementById("catalog-results");
const catalogEmpty = document.getElementById("catalog-empty");

if (
  productCards.length > 0 &&
  catalogFilters.length > 0 &&
  productSearch instanceof HTMLInputElement &&
  catalogResults instanceof HTMLElement &&
  catalogEmpty instanceof HTMLElement
) {
  let activeCategory = "todos";

  const normalize = (value) =>
    value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLocaleLowerCase("pt-BR");

  const filterCatalog = () => {
    const searchTerm = normalize(productSearch.value.trim());
    let visibleCount = 0;

    for (const card of productCards) {
      const matchesCategory =
        activeCategory === "todos" || card.dataset.category === activeCategory;
      const matchesSearch = normalize(card.textContent ?? "").includes(searchTerm);
      const isVisible = matchesCategory && matchesSearch;

      card.hidden = !isVisible;
      visibleCount += Number(isVisible);
    }

    catalogResults.textContent = `${visibleCount} ${visibleCount === 1 ? "ideia de presente" : "ideias de presente"}`;
    catalogEmpty.hidden = visibleCount > 0;
  };

  for (const filter of catalogFilters) {
    filter.addEventListener("click", () => {
      activeCategory = filter.dataset.filter ?? "todos";

      for (const button of catalogFilters) {
        const isActive = button === filter;
        button.classList.toggle("is-active", isActive);
        button.setAttribute("aria-pressed", String(isActive));
      }

      filterCatalog();
    });
  }

  productSearch.addEventListener("input", filterCatalog);
  filterCatalog();
}

const orderPanel = document.getElementById("order-panel");
const orderItems = document.getElementById("order-items");
const orderCount = document.getElementById("order-count");
const orderStatus = document.getElementById("order-status");
const sendOrder = document.getElementById("send-order");
const clearOrder = document.getElementById("clear-order");

if (
  productLinks.length > 0 &&
  orderPanel instanceof HTMLElement &&
  orderItems instanceof HTMLUListElement &&
  orderCount instanceof HTMLElement &&
  orderStatus instanceof HTMLElement &&
  sendOrder instanceof HTMLAnchorElement &&
  clearOrder instanceof HTMLButtonElement
) {
  const cart = new Map();

  const renderOrder = () => {
    orderItems.replaceChildren();
    let totalQuantity = 0;

    for (const [name, quantity] of cart) {
      totalQuantity += quantity;

      const item = document.createElement("li");
      item.className = "order-item";

      const itemName = document.createElement("span");
      itemName.className = "order-item-name";
      itemName.textContent = name;

      const controls = document.createElement("div");
      controls.className = "order-controls";

      const decrease = document.createElement("button");
      decrease.type = "button";
      decrease.dataset.action = "decrease";
      decrease.dataset.product = name;
      decrease.setAttribute("aria-label", `Remover uma unidade de ${name}`);
      decrease.textContent = "−";

      const quantityLabel = document.createElement("span");
      quantityLabel.textContent = String(quantity);
      quantityLabel.setAttribute("aria-label", `Quantidade: ${quantity}`);

      const increase = document.createElement("button");
      increase.type = "button";
      increase.dataset.action = "increase";
      increase.dataset.product = name;
      increase.setAttribute("aria-label", `Adicionar uma unidade de ${name}`);
      increase.textContent = "+";

      controls.append(decrease, quantityLabel, increase);
      item.append(itemName, controls);
      orderItems.append(item);
    }

    orderPanel.hidden = cart.size === 0;
    orderCount.textContent = `${totalQuantity} ${totalQuantity === 1 ? "item" : "itens"} no pedido`;

    const lines = Array.from(cart, ([name, quantity]) => `- ${name} (quantidade: ${quantity})`);
    const message = [
      "Olá! Gostaria de fazer este pedido:",
      "",
      ...lines,
      "",
      "Pode confirmar disponibilidade, preço final e entrega? Meu bairro/CEP é:"
    ].join("\n");
    sendOrder.href = `https://wa.me/559291117526?text=${encodeURIComponent(message)}`;
  };

  for (const link of productLinks) {
    link.addEventListener("click", (event) => {
      const name = link.closest(".product-card")?.querySelector("h3")?.textContent?.trim();

      if (!name) {
        return;
      }

      event.preventDefault();
      cart.set(name, (cart.get(name) ?? 0) + 1);
      renderOrder();
      orderStatus.textContent = `${name} adicionado ao pedido.`;
      orderPanel.scrollIntoView({ behavior: "smooth", block: "nearest" });
    });
  }

  orderItems.addEventListener("click", (event) => {
    if (!(event.target instanceof HTMLButtonElement)) {
      return;
    }

    const { action, product } = event.target.dataset;
    const quantity = product ? cart.get(product) : undefined;

    if (!product || quantity === undefined) {
      return;
    }

    if (action === "increase") {
      cart.set(product, quantity + 1);
    } else if (action === "decrease") {
      if (quantity === 1) {
        cart.delete(product);
      } else {
        cart.set(product, quantity - 1);
      }
    } else {
      return;
    }

    renderOrder();
    orderStatus.textContent = cart.has(product)
      ? `Pedido atualizado: ${product}.`
      : `${product} removido do pedido.`;
  });

  clearOrder.addEventListener("click", () => {
    cart.clear();
    renderOrder();
    orderStatus.textContent = "Pedido limpo.";
  });
}