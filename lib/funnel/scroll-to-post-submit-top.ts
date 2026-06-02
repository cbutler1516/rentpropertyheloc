/** Reset viewport after pre-submit → post-submit transition (SPA retains scroll Y). */
export function scrollToPostSubmitTop() {
  const scroll = () => {
    window.scrollTo(0, 0);
  };

  scroll();
  requestAnimationFrame(() => {
    scroll();
    requestAnimationFrame(scroll);
  });
}
