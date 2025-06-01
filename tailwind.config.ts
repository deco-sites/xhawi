export default {
  content: ["./**/*.tsx"],
  darkMode: "class",
  theme: {
    container: { center: true },
    extend: {
      animation: {
        sliding: "sliding 30s linear infinite",
      },
      keyframes: {
        sliding: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      fontFamily: {
        halogen: ["halogen", "sans-serif"],
      },
      colors: {
        "omantel-alert-dark": "#EE5858",
        "omantel-background": "#DCDCDC",
        "omantel-background1": "#E6F2E6",
        "omantel-background3": "#CDDCEB",
        "omantel-background-grey": "#F1F1F1",
        "omantel-dark-green": "#95C655",
        "omantel-electric-green": "#BAF76A",
        "omantel-electric-green-1": "#E3FCC3",
        "omantel-faded-black": "#222222",
        "omantel-grey": "#808080",
        "omantel-grey-3": "#656464",
        "omantel-grey-4": "#EDEDED",
        "omantel-jet-grey": "#373737",
        "omantel-light-green": "#E3FCC3",
        "omantel-platinum": "#DDDDDD",
        "omantel-sea-salt": "#EBEBEB",
        "omantel-blue": "#144777",
        "omantel-secondary-blue": "#0379CD",
        "omantel-smoke": "#F8F8F8",
        "omantel-link": "#0673DE",
        "light-orange": "#FFEFD4",
        "light-peach": "#FFE3E4",
        "gray-500": "#9E9E9E",
        "background": "hsl(var(--background))",
        "foreground": "hsl(var(--foreground))",
        "card": "hsl(var(--card))",
        "card-foreground": "hsl(var(--card-foreground))",
        "popover": "hsl(var(--popover))",
        "popover-foreground": "hsl(var(--popover-foreground))",
        "primary": "hsl(var(--primary))",
        "primary-foreground": "hsl(var(--primary-foreground))",
        "secondary": "hsl(var(--secondary))",
        "secondary-foreground": "hsl(var(--secondary-foreground))",
        "muted": "hsl(var(--muted))",
        "muted-foreground": "hsl(var(--muted-foreground))",
        "accent": "hsl(var(--accent))",
        "accent-foreground": "hsl(var(--accent-foreground))",
        "destructive": "hsl(var(--destructive))",
        "destructive-foreground": "hsl(var(--destructive-foreground))",
        "border": "hsl(var(--border))",
        "input": "hsl(var(--input))",
        "ring": "hsl(var(--ring))",
      },
    },
  },
};

/**
 .hover\:bg-omantel-jet-grey:hover{
    --tw-bg-opacity:1;
    background-color:rgb(55 55 55)
}
 */
