interface Translations {
  menu: {
    header: string;
    omr: string;
    backToMenu: string;
    changeLanguage: string;
  };
  header: {
    account: string;
    hi: string;
    guest: string;
    signIn: string;
    newUser: string;
    signUp: string;
  };
  product: {
    omr: string;
    priceInclusiveOfVAT: string;
    fewItemsLeft: string;
    inStock: string;
  };
  minicart: {
    empty: {
      title: string;
      description: {
        line1: string;
        line2: string;
      };
      button: string;
    };
  };
  currentLanguage: string;
  languages: typeof languages;
}

export type Language = "en" | "ar";

const languages: Record<Language, string> = {
  en: "English",
  ar: "العربية",
};

const translations: Record<Language, Translations> = {
  en: {
    menu: {
      header: "Browse Marketplace",
      omr: "OMR",
      backToMenu: "Back to Menu",
      changeLanguage: "Change Language",
    },
    header: {
      account: "Account",
      hi: "Hi",
      guest: "Guest",
      signIn: "Sign In",
      newUser: "New to XHAWI?",
      signUp: "Sign up here",
    },
    minicart: {
      empty: {
        title: "Your cart is empty",
        description: {
          line1: "Looks like you haven't made",
          line2: "your choice yet.",
        },
        button: "Start Shopping",
      },
    },
    currentLanguage: "English",
    languages,
    product: {
      omr: "OMR",
      priceInclusiveOfVAT: "Price inclusive of VAT",
      fewItemsLeft: "few items left",
      inStock: "In Stock",
    },
  },
  ar: {
    menu: {
      header: "تصفح السوق",
      omr: "ريال",
      backToMenu: "العودة إلى القائمة",
      changeLanguage: "تغيير اللغة",
    },
    header: {
      hi: "أهلاً",
      guest: "ضيف",
      account: "حساب",
      signIn: "تسجيل الدخول",
      newUser: "هل أنت جديد في XHAWI ؟ سجل هنا",
      signUp: "سجل هنا",
    },
    minicart: {
      empty: {
        title: "سلة التسوق الخاصة بك فارغة",
        description: {
          line1: "يبدو أنك لم تفعل",
          line2: "اختر أي شيء",
        },
        button: "ابدأ التسوق",
      },
    },
    currentLanguage: "عربي",
    languages,
    product: {
      omr: "ر.ع",
      priceInclusiveOfVAT: "السعر شامل ضريبة القيمة المضافة",
      fewItemsLeft: "كمية قليلة متبقية",
      inStock: "في المخزون",
    },
  },
};

type DotKeys<T, Prefix extends string = ""> = {
  [K in keyof T]: T[K] extends object ? keyof T[K] extends never // empty object
      ? `${Prefix}${K & string}`
    : DotKeys<T[K], `${Prefix}${K & string}.`> | `${Prefix}${K & string}`
    : `${Prefix}${K & string}`;
}[keyof T];

export type TranslationKey = DotKeys<Translations>;

export function $t(language: Language = "en") {
  return translations[language] || translations["en"];
}

export const RTL_LANGUAGES = ["ar", "fa", "he", "ps", "ur"];

export function useI18n(
  props: unknown,
): {
  language: Language;
  dir: "ltr" | "rtl";
  supportedLanguages?: Language[];
  translations: Translations;
  currentUrl: (language: Language) => string;
  goTo: (href: string, language?: Language) => string;
} {
  if (
    typeof props === "object" &&
    props !== null &&
    props !== undefined &&
    !Array.isArray(props) &&
    ("_supportedLanguages" in props || "_language" in props)
  ) {
    const language =
      "_language" in props && typeof props._language === "string" &&
        props._language in languages
        ? props._language as Language
        : "en";

    const supportedLanguages =
      "_supportedLanguages" in props && Array.isArray(props._supportedLanguages)
        ? props._supportedLanguages
        : undefined;

    const url = "url" in props && typeof props.url === "string"
      ? props.url
      : undefined;

    return {
      language,
      dir: RTL_LANGUAGES.includes(language) ? "rtl" : "ltr",
      supportedLanguages,
      translations: $t(language),
      currentUrl: (language: Language) => {
        if (!url) {
          return `/${language}`;
        }

        const _url = new URL(url);
        const [_, lang] = _url.pathname.split("/");
        if (supportedLanguages?.includes(lang)) {
          _url.pathname = _url.pathname.replace(`/${lang}`, `/${language}`);
          return _url.pathname + _url.search;
        }

        _url.pathname = `/${language}/${_url.pathname}`;
        return _url.pathname + _url.search;
      },
      goTo: (href: string, lang?: string) => {
        const _language = lang || language;
        const _url = new URL(href, "http://localhost");
        const [_, _lang] = _url.pathname.split("/");

        if (supportedLanguages?.includes(_lang)) {
          _url.pathname = _url.pathname.replace(`/${_lang}`, `/${_language}`);
          return _url.pathname + _url.search;
        }

        _url.pathname = `/${_language}${_url.pathname}`;
        return _url.pathname + _url.search;
      },
    };
  }

  const trace = new Error().stack?.split("\n")[2];
  console.warn(
    "useI18n is only available inside of first level sections",
    trace,
  );

  return {
    language: "en",
    dir: "ltr",
    supportedLanguages: ["en", "ar"],
    translations: $t("en"),
    currentUrl: () => "/en",
    goTo: () => "/en",
  };
}
