import { transform } from "https://esm.sh/sucrase@3.35.1/es2022/sucrase.bundle.mjs";
import * as preact from "https://esm.sh/preact@10.29.8/es2022/preact.mjs";
import * as compat from "https://esm.sh/preact@10.29.8/es2022/compat.mjs";

// Map Preact/Compat to React API
window.React = {
  createElement: compat.createElement,
  Fragment: compat.Fragment,
  useState: compat.useState,
  useEffect: compat.useEffect,
  useCallback: compat.useCallback,
  useContext: compat.useContext,
  useRef: compat.useRef,
  useMemo: compat.useMemo,
  useLayoutEffect: compat.useLayoutEffect,
  Component: compat.Component,
  PureComponent: compat.PureComponent,
  memo: compat.memo,
  forwardRef: compat.forwardRef,
  createRef: compat.createRef,
  isValidElement: compat.isValidElement,
};

// React 18 createRoot / hydrateRoot API
window.ReactDOM = {
  createRoot: (container) => ({
    render(element) {
      compat.render(element, container);
    },
  }),
  hydrateRoot: (container, element) => ({
    unmount() {
      compat.render(null, container);
    },
  }),
};

const scripts = Array.from(document.querySelectorAll('script[type="text/jsx"][src]'));

try {
  const sources = await Promise.all(
    scripts.map(async (script) => {
      const url = script.getAttribute("src");
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Failed to fetch ${url}: HTTP ${response.status}`);
      }
      return { url, code: await response.text() };
    })
  );

  for (const { url, code } of sources) {
    const { code: compiled } = transform(code, {
      transforms: ["jsx"],
      disableESTransforms: true,
      production: true,
      filePath: url,
    });
    const element = document.createElement("script");
    element.textContent = `${compiled}\n//# sourceURL=${url}`;
    document.body.appendChild(element);
  }
} catch (error) {
  console.error("[loader]", error);
}
