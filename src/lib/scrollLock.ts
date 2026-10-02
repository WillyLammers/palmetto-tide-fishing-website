// Reference-counted page scroll lock. The mobile menu and the photo viewer can
// both hold it; a single shared attribute let whichever closed first unlock the
// page while the other was still open.

let locks = 0;

export function lockScroll(): () => void {
  if (locks++ === 0) document.documentElement.setAttribute("data-lock", "");
  let released = false;
  return () => {
    if (released) return;
    released = true;
    if (--locks === 0) document.documentElement.removeAttribute("data-lock");
  };
}
