const menuToggle = document.querySelector(".menu-toggle");
const siteNav = document.querySelector(".site-nav");
const siteHeader = document.querySelector("#site-header");
const year = document.querySelector("#year");

const setMenuState = (isOpen) => {
	menuToggle.setAttribute("aria-expanded", String(isOpen));
	menuToggle.setAttribute("aria-label", isOpen ? "Fechar menu" : "Abrir menu");
	siteNav.classList.toggle("is-open", isOpen);
	siteNav.style.display = isOpen ? "flex" : "none";
	siteNav.style.position = "fixed";
	siteNav.style.top = "0";
	siteNav.style.right = "0";
	siteNav.style.bottom = "0";
	siteNav.style.left = "0";
	siteNav.style.width = "100%";
	siteNav.style.height = "100vh";
	siteNav.style.zIndex = "100000";
	siteNav.style.background = isOpen ? "rgba(8, 9, 11, 1)" : "transparent";
	siteNav.style.padding = isOpen ? "100px 6.5% 40px" : "0";
	siteNav.style.opacity = isOpen ? "1" : "0";
	siteNav.style.visibility = isOpen ? "visible" : "hidden";
	siteNav.style.pointerEvents = isOpen ? "auto" : "none";
	document.body.classList.toggle("menu-open", isOpen);
};

year.textContent = new Date().getFullYear();

menuToggle.addEventListener("click", (event) => {
	event.stopPropagation();
	const shouldOpen = !siteNav.classList.contains("is-open");
	setMenuState(shouldOpen);
});

document.addEventListener("click", (event) => {
	if (siteNav.classList.contains("is-open") && !siteNav.contains(event.target) && !menuToggle.contains(event.target)) {
		setMenuState(false);
	}
});

siteNav.addEventListener("click", (event) => {
	if (event.target.closest("a")) {
		setMenuState(false);
	}
});

if (siteHeader) {
	const onScroll = () => {
		siteHeader.classList.toggle("is-scrolled", window.scrollY > 12);
	};
	onScroll();
	window.addEventListener("scroll", onScroll, { passive: true });
}

const galleryItems = document.querySelectorAll(".gallery-item");
const lightbox = document.querySelector("#gallery-lightbox");
const lightboxImage = document.querySelector("#lightbox-image");
const lightboxCaption = document.querySelector("#lightbox-caption");
const lightboxClose = document.querySelector(".lightbox-close");

const closeLightbox = () => {
	if (!lightbox) return;
	lightbox.classList.remove("is-open");
	lightbox.setAttribute("aria-hidden", "true");
	document.body.classList.remove("modal-open");
};

galleryItems.forEach((item) => {
	item.addEventListener("click", () => {
		if (!lightbox || !lightboxImage || !lightboxCaption) return;
		lightboxImage.src = item.dataset.image;
		lightboxImage.alt = item.querySelector("img")?.alt || "Imagem ampliada da galeria";
		lightboxCaption.textContent = item.dataset.title;
		lightbox.classList.add("is-open");
		lightbox.setAttribute("aria-hidden", "false");
		document.body.classList.add("modal-open");
	});
});

lightboxClose?.addEventListener("click", closeLightbox);
lightbox?.addEventListener("click", (event) => {
	if (event.target === lightbox) {
		closeLightbox();
	}
});

document.addEventListener("keydown", (event) => {
	if (event.key === "Escape" && lightbox?.classList.contains("is-open")) {
		closeLightbox();
	}
});
