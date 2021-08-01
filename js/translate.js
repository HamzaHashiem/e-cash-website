var translator = new Translator({
  defaultLanguage: "en",
  detectLanguage: true,
  filesLocation: "assets/i18n",
});

// This will fetch "/i18n/ar.json" and "/i18n/en.json"
translator.fetch(["en", "ar"]).then(() => {
  // You now have both languages available to you
  translator.translatePageTo("en");
});

const switchLanguage = (lg) => {
  translator.translatePageTo(lg);
};
