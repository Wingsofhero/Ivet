const header = document.querySelector("[data-header]");

window.addEventListener(
  "scroll",
  () => {
    header?.classList.toggle("is-scrolled", window.scrollY > 12);
  },
  { passive: true }
);

const galleryButtons = [...document.querySelectorAll("[data-gallery] button")];
const lightbox = document.querySelector("[data-lightbox]");
const lightboxImage = document.querySelector("[data-lightbox-image]");
let currentImage = 0;

const showImage = (index) => {
  if (!lightbox || !lightboxImage || galleryButtons.length === 0) return;

  currentImage = (index + galleryButtons.length) % galleryButtons.length;
  lightboxImage.src = galleryButtons[currentImage].dataset.src;
  lightbox.hidden = false;
  document.body.style.overflow = "hidden";
};

const closeLightbox = () => {
  if (!lightbox || !lightboxImage) return;

  lightbox.hidden = true;
  lightboxImage.src = "";
  document.body.style.overflow = "";
};

galleryButtons.forEach((button, index) => {
  button.addEventListener("click", () => showImage(index));
});

document.querySelector("[data-lightbox-close]")?.addEventListener("click", closeLightbox);
document.querySelector("[data-lightbox-prev]")?.addEventListener("click", () => showImage(currentImage - 1));
document.querySelector("[data-lightbox-next]")?.addEventListener("click", () => showImage(currentImage + 1));

lightbox?.addEventListener("click", (event) => {
  if (event.target === lightbox) closeLightbox();
});

window.addEventListener("keydown", (event) => {
  if (!lightbox || lightbox.hidden) return;
  if (event.key === "Escape") closeLightbox();
  if (event.key === "ArrowLeft") showImage(currentImage - 1);
  if (event.key === "ArrowRight") showImage(currentImage + 1);
});
