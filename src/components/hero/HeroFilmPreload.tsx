import { videos } from "@/lib/videos";

/**
 * Starts the correct homepage film as early as possible (before hydration).
 * Picks one source only so phones never also pull the 16:9 file (and vice versa).
 */
export function HeroFilmPreload() {
  const desktop = videos.hero.src ?? "";
  const mobile = videos.hero.mobileSrc ?? desktop;

  return (
    <script
      dangerouslySetInnerHTML={{
        __html: `(function(){try{var m=window.matchMedia("(max-width:767px)");var phone=m.matches||(Math.min(screen.width,screen.height)<=520&&window.matchMedia("(pointer:coarse)").matches);var href=phone?${JSON.stringify(mobile)}:${JSON.stringify(desktop)};if(!href)return;var l=document.createElement("link");l.rel="preload";l.as="video";l.href=href;l.type="video/mp4";l.setAttribute("fetchpriority","high");document.head.appendChild(l);}catch(e){}})();`,
      }}
    />
  );
}
