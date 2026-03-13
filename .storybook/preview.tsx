import React, { useEffect } from "react";
import { withThemeByClassName } from "@storybook/addon-themes";
import type { Preview, Decorator } from "@storybook/react";

// Base styles
import "../src/styles/global.css";
import "../src/styles/themes/light.css";
import "../src/styles/themes/dark.css";

// Theme presets (must be imported AFTER base styles for cascade priority)
import "../src/styles/themes/presets/corporate.css";
import "../src/styles/themes/presets/vibrant.css";
import "../src/styles/themes/presets/minimal.css";

// Swiper CSS for Carousel component
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-fade";
import "swiper/css/effect-coverflow";

// Custom decorator for theme presets - applies data-theme to html element
const withThemePreset: Decorator = (Story, context) => {
  const preset = context.globals.preset || "none";

  useEffect(() => {
    // Apply data-theme to html element (same element that gets .dark class)
    const html = document.documentElement;
    if (preset === "none") {
      html.removeAttribute("data-theme");
    } else {
      html.setAttribute("data-theme", preset);
    }
  }, [preset]);

  return <Story />;
};

const preview: Preview = {
  globalTypes: {
    preset: {
      description: "Theme preset",
      toolbar: {
        title: "Preset",
        icon: "paintbrush",
        items: [
          { value: "none", title: "Default" },
          { value: "corporate", title: "Corporate" },
          { value: "vibrant", title: "Vibrant" },
          { value: "minimal", title: "Minimal" },
        ],
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: {
    preset: "none",
  },
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
  decorators: [
    withThemePreset,
    // Light/Dark mode switcher (applies .dark class to html)
    withThemeByClassName({
      themes: {
        light: "",
        dark: "dark",
      },
      defaultTheme: "light",
    }),
  ],
};

export default preview;
