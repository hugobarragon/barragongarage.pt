import { transform } from "https://esm.sh/sucrase@3.35.1/es2022/sucrase.bundle.mjs";

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
