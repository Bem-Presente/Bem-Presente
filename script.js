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

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && menu.classList.contains("is-open")) {
      closeMenu();
      menuButton.focus();
    }
  });
}

const installAppButton = document.getElementById("install-app");
const installAppHelp = document.querySelector(".app-install details");
let deferredInstallPrompt = null;

if (installAppButton instanceof HTMLButtonElement) {
  window.addEventListener("beforeinstallprompt", (event) => {
    event.preventDefault();
    deferredInstallPrompt = event;
    installAppButton.hidden = false;
  });

  installAppButton.addEventListener("click", async () => {
    if (!deferredInstallPrompt) {
      installAppHelp?.setAttribute("open", "");
      return;
    }

    const promptEvent = deferredInstallPrompt;
    deferredInstallPrompt = null;
    installAppButton.hidden = true;

    try {
      await promptEvent.prompt();
      await promptEvent.userChoice;
    } catch (error) {
      console.error("Não foi possível abrir a instalação do app Bem Presente.", error);
      installAppHelp?.setAttribute("open", "");
    }
  });

  window.addEventListener("appinstalled", () => {
    installAppButton.hidden = true;
    deferredInstallPrompt = null;
  });
}

if ("serviceWorker" in navigator && window.isSecureContext) {
  navigator.serviceWorker.register("./sw.js").catch((error) => {
    console.error("Não foi possível ativar o modo offline do app Bem Presente.", error);
  });
}

const productLinks = document.querySelectorAll(".product-card .buy");
const productCards = document.querySelectorAll(".product-card");
const catalogFilters = document.querySelectorAll(".catalog-filter");
const collectionLinks = document.querySelectorAll("[data-collection-filter]");
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

  for (const link of collectionLinks) {
    link.addEventListener("click", () => {
      const category = link.dataset.collectionFilter;

      if (!catalogFilters.length || !category) {
        return;
      }

      const matchingFilter = Array.from(catalogFilters).find(
        (filter) => filter.dataset.filter === category
      );

      if (!matchingFilter) {
        return;
      }

      productSearch.value = "";
      activeCategory = category;

      for (const filter of catalogFilters) {
        const isActive = filter === matchingFilter;
        filter.classList.toggle("is-active", isActive);
        filter.setAttribute("aria-pressed", String(isActive));
      }

      filterCatalog();
    });
  }

  productSearch.addEventListener("input", filterCatalog);
  filterCatalog();
}

const tiltElements = document.querySelectorAll("[data-tilt]");
const supportsHoverTilt = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (supportsHoverTilt && !prefersReducedMotion) {
  for (const element of tiltElements) {
    element.addEventListener("pointermove", (event) => {
      if (event.pointerType !== "mouse") {
        return;
      }

      const bounds = element.getBoundingClientRect();
      const horizontal = (event.clientX - bounds.left) / bounds.width - 0.5;
      const vertical = (event.clientY - bounds.top) / bounds.height - 0.5;

      element.style.setProperty("--tilt-x", `${vertical * -7}deg`);
      element.style.setProperty("--tilt-y", `${horizontal * 7}deg`);
    });

    element.addEventListener("pointerleave", () => {
      element.style.setProperty("--tilt-x", "0deg");
      element.style.setProperty("--tilt-y", "0deg");
    });
  }
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