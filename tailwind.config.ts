/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: ["class"],
    content: [
        './pages/**/*.{ts,tsx}',
        './components/**/*.{ts,tsx}',
        './app/**/*.{ts,tsx}',
        './src/**/*.{ts,tsx}',
    ],
    prefix: "",
    theme: {
        container: {
            center: true,
            padding: "2rem",
            screens: {
                "2xl": "1400px",
            },
        },
        extend: {
            colors: {
                border: "hsl(var(--border))",
                input: "hsl(var(--input))",
                ring: "hsl(var(--ring))",
                background: "hsl(var(--background))",
                foreground: "hsl(var(--foreground))",
                primary: {
                    DEFAULT: "hsl(var(--primary))",
                    foreground: "hsl(var(--primary-foreground))",
                },
                secondary: {
                    DEFAULT: "hsl(var(--secondary))",
                    foreground: "hsl(var(--secondary-foreground))",
                },
                destructive: {
                    DEFAULT: "hsl(var(--destructive))",
                    foreground: "hsl(var(--destructive-foreground))",
                },
                muted: {
                    DEFAULT: "hsl(var(--muted))",
                    foreground: "hsl(var(--muted-foreground))",
                },
                accent: {
                    DEFAULT: "hsl(var(--accent))",
                    foreground: "hsl(var(--accent-foreground))",
                },
                popover: {
                    DEFAULT: "hsl(var(--popover))",
                    foreground: "hsl(var(--popover-foreground))",
                },
                card: {
                    DEFAULT: "hsl(var(--card))",
                    foreground: "hsl(var(--card-foreground))",
                },
            },
            borderRadius: {
                lg: "var(--radius)",
                md: "calc(var(--radius) - 2px)",
                sm: "calc(var(--radius) - 4px)",
            },
            keyframes: {
                "accordion-down": {
                    from: { height: "0" },
                    to: { height: "var(--radix-accordion-content-height)" },
                },
                "accordion-up": {
                    from: { height: "var(--radix-accordion-content-height)" },
                    to: { height: "0" },
                },
                "gradient-x": {
                    "0%, 100%": {
                        "background-size": "200% 200%",
                        "background-position": "left center",
                    },
                    "50%": {
                        "background-size": "200% 200%",
                        "background-position": "right center",
                    },
                },
                "gradient-y": {
                    "0%, 100%": {
                        "background-size": "200% 200%",
                        "background-position": "center top",
                    },
                    "50%": {
                        "background-size": "200% 200%",
                        "background-position": "center bottom",
                    },
                },
                "gradient-xy": {
                    "0%, 100%": {
                        "background-size": "400% 400%",
                        "background-position": "left center",
                    },
                    "50%": {
                        "background-size": "400% 400%",
                        "background-position": "right center",
                    },
                },
                float: {
                    "0%, 100%": { transform: "translateY(0px)" },
                    "50%": { transform: "translateY(-20px)" },
                },
                "float-slow": {
                    "0%, 100%": { transform: "translateY(0px)" },
                    "50%": { transform: "translateY(-30px)" },
                },
                shimmer: {
                    "0%": { transform: "translateX(-100%)" },
                    "100%": { transform: "translateX(100%)" },
                },
                glow: {
                    "0%, 100%": { opacity: "0.5", transform: "scale(1)" },
                    "50%": { opacity: "1", transform: "scale(1.1)" },
                },
                "spin-slow": {
                    "0%": { transform: "rotate(0deg)" },
                    "100%": { transform: "rotate(360deg)" },
                },
                "bounce-slow": {
                    "0%, 100%": { transform: "translateY(0)" },
                    "50%": { transform: "translateY(-10px)" },
                },
                "pulse-glow": {
                    "0%, 100%": {
                        boxShadow: "0 0 20px rgba(102, 51, 153, 0.4)",
                        transform: "scale(1)"
                    },
                    "50%": {
                        boxShadow: "0 0 40px rgba(102, 51, 153, 0.7)",
                        transform: "scale(1.05)"
                    },
                },
                "slide-up": {
                    "0%": { transform: "translateY(100px)", opacity: "0" },
                    "100%": { transform: "translateY(0)", opacity: "1" },
                },
                "slide-down": {
                    "0%": { transform: "translateY(-100px)", opacity: "0" },
                    "100%": { transform: "translateY(0)", opacity: "1" },
                },
                "zoom-in": {
                    "0%": { transform: "scale(0.5)", opacity: "0" },
                    "100%": { transform: "scale(1)", opacity: "1" },
                },
                "rotate-in": {
                    "0%": { transform: "rotate(-180deg) scale(0)", opacity: "0" },
                    "100%": { transform: "rotate(0) scale(1)", opacity: "1" },
                },
            },
            animation: {
                "accordion-down": "accordion-down 0.2s ease-out",
                "accordion-up": "accordion-up 0.2s ease-out",
                "gradient-x": "gradient-x 2s ease infinite",
                "gradient-y": "gradient-y 2s ease infinite",
                "gradient-xy": "gradient-xy 2s ease infinite",
                "float": "float 1.5s ease-in-out infinite",
                "float-slow": "float-slow 3s ease-in-out infinite",
                "shimmer": "shimmer 1.5s infinite",
                "glow": "glow 1s ease-in-out infinite",
                "spin-slow": "spin-slow 4s linear infinite",
                "bounce-slow": "bounce-slow 1s ease-in-out infinite",
                "pulse-glow": "pulse-glow 1s ease-in-out infinite",
                "slide-up": "slide-up 0.3s ease-out",
                "slide-down": "slide-down 0.3s ease-out",
                "zoom-in": "zoom-in 0.3s ease-out",
                "rotate-in": "rotate-in 0.4s ease-out",
            },
        },
    },
    plugins: [require("tailwindcss-animate")],
}
