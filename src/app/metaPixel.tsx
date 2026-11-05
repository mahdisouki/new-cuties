import { useEffect } from "react";
import { Outlet, useLocation } from "react-router";

const pixelId = import.meta.env.VITE_META_PIXEL_ID;

type Fbq = {
  (...args: unknown[]): void;
  callMethod?: (...args: unknown[]) => void;
  queue: unknown[][];
  loaded: boolean;
  version: string;
  push: Fbq;
};

declare global {
  interface Window {
    fbq?: Fbq;
    _fbq?: Fbq;
  }
}

let initialized = false;
let lastPage = "";

function installFbq() {
  if (window.fbq) return;
  const fbq = function (this: Fbq, ...args: unknown[]) {
    if (fbq.callMethod) fbq.callMethod.apply(fbq, args);
    else fbq.queue.push(args);
  } as Fbq;
  fbq.push = fbq;
  fbq.loaded = true;
  fbq.version = "2.0";
  fbq.queue = [];
  window.fbq = fbq;
  if (!window._fbq) window._fbq = fbq;

  const script = document.createElement("script");
  script.async = true;
  script.src = "https://connect.facebook.net/en_US/fbevents.js";
  const first = document.getElementsByTagName("script")[0];
  if (!first?.parentNode) throw new Error("Missing script tag for the Meta Pixel");
  first.parentNode.insertBefore(script, first);
}

export function initMetaPixel() {
  if (initialized) return;
  if (!pixelId) throw new Error("Missing VITE_META_PIXEL_ID");
  installFbq();
  window.fbq!("init", pixelId);
  initialized = true;
}

export function trackPageView(path: string) {
  initMetaPixel();
  if (lastPage === path) return;
  lastPage = path;
  window.fbq!("track", "PageView");
}

export function trackViewContent(params: {
  content_name: string;
  content_ids: string[];
  content_type: "product";
  value: number;
  currency: "TND";
}) {
  initMetaPixel();
  window.fbq!("track", "ViewContent", params);
}

export function trackPurchase(params: {
  value: number;
  currency: "TND";
  content_ids: string[];
  content_type: "product";
  num_items: number;
  eventID: string;
}) {
  initMetaPixel();
  const { eventID, ...details } = params;
  window.fbq!("track", "Purchase", details, { eventID });
}

export function trackInitiateCheckout() {
  initMetaPixel();
  window.fbq!("track", "InitiateCheckout");
}

export function MetaPixelRoute() {
  const location = useLocation();

  useEffect(() => {
    trackPageView(`${location.pathname}${location.search}`);
  }, [location.pathname, location.search]);

  return <Outlet />;
}
