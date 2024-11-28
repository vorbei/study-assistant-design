/** @type {import('tailwindcss').Config} */
import animate from 'tailwindcss-animate'

export default {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    // 设置默认字符间距为 0
    letterSpacing: {
      DEFAULT: '0',
      normal: '0',
    },
    // 设置默认圆角为 2px
    borderRadius: {
      none: '0px',
      DEFAULT: '2px',
      sm: '2px',
      md: '4px',
      lg: '8px',
      full: '50%',
    },
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    // 设置默认字重为 Regular (400)
    fontWeight: {
      regular: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
    },
    // 设置字号规范
    fontSize: {
      xs: ['12px', '16px'],     // H5、辅助文字
      sm: ['14px', '20px'],     // 正文、按钮文字
      base: ['16px', '22px'],   // H4
      lg: ['18px', '24px'],     // H2
      xl: ['20px', '28px'],
      '2xl': ['24px', '34px'],  // H1
      '3xl': ['30px', '38px'],
      '4xl': ['36px', '44px'],
      '5xl': ['48px', '56px'],
      '6xl': ['60px', '72px'],
      '7xl': ['72px', '84px'],
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        // 设置默认文本颜色为 N1
        text: {
          DEFAULT: "hsl(var(--neutral-1))",
          label: "hsl(var(--neutral-1))",
        },
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
        success: {
          DEFAULT: "hsl(var(--success))",
          foreground: "hsl(var(--success-foreground))",
        },
        neutral: {
          0: "#000000",  // 纯黑
          1: "#1F264D",  // 主要文字
          2: "#596080",  // 次要文字
          3: "#898CA3",  // 辅助文字
          4: "#B8BCCC",  // 禁用状态
          5: "#D8D9E6",  // 边框线条
          6: "#E6E9F2",  // 分割线
          7: "#F3F5FA",  // 背景色
          8: "#F7F9FC",  // 浅背景
          9: "#FFFFFF",  // 纯白
        },
        // 添加禁用状态的颜色
        disabled: {
          bg: "hsl(var(--neutral-7))",    // N7 背景色
          border: "hsl(var(--neutral-5))", // N5 边框色
          text: "hsl(var(--neutral-4))",   // N4 文字色
        },
        // 添加基础色系
        blue: {
          0: '#2E4CB3',  // 最深
          1: '#2E57E6',
          2: '#466BEB',
          3: '#6080F0',
          4: '#879FF5',
          5: '#AFC0FA',
          6: '#D6DFFF',
          7: '#F2F5FF',  // 最浅
          500: '#2E4CB3',
          600: '#2E57E6',
          700: '#466BEB',
          800: '#6080F0',
          900: '#879FF5',
          1000: '#AFC0FA',
          1100: '#D6DFFF',
          1200: '#F2F5FF',
        },
        red: {
          0: '#CC3D55',
          1: '#E6455F',
          2: '#EB5E75',
          3: '#F0788B',
          4: '#F593A2',
          5: '#FAB9C3',
          6: '#FFD6DD',
          7: '#FFF2F4',
          500: '#CC3D55',
          600: '#E6455F',
          700: '#EB5E75',
          800: '#F0788B',
          900: '#F593A2',
          1000: '#FAB9C3',
          1100: '#FFD6DD',
          1200: '#FFF2F4',
        },
        orange: {
          0: '#E57709',
          1: '#F58718',
          2: '#F5983B',
          3: '#F7AD63',
          4: '#F7BC81',
          5: '#FAD2AA',
          6: '#FCE8D4',
          7: '#FFF2E5',
          500: '#E57709',
          600: '#F58718',
          700: '#F5983B',
          800: '#F7AD63',
          900: '#F7BC81',
          1000: '#FAD2AA',
          1100: '#FCE8D4',
          1200: '#FFF2E5',
        },
        green: {
          0: '#31A37D',
          1: '#12B881',
          2: '#3DCC9D',
          3: '#60DBB3',
          4: '#8AE6C7',
          5: '#A8F0D8',
          6: '#C8FAE9',
          7: '#E6FFF7',
          500: '#31A37D',
          600: '#12B881',
          700: '#3DCC9D',
          800: '#60DBB3',
          900: '#8AE6C7',
          1000: '#A8F0D8',
          1100: '#C8FAE9',
          1200: '#E6FFF7',
        },
        teal: {
          0: '#1298B3',
          1: '#00ABCD',
          2: '#42C2DB',
          3: '#65D0E6',
          4: '#8EE4F5',
          5: '#ADF2FF',
          6: '#CCF6FF',
          7: '#E6FBFF',
          500: '#1298B3',
          600: '#00ABCD',
          700: '#42C2DB',
          800: '#65D0E6',
          900: '#8EE4F5',
          1000: '#ADF2FF',
          1100: '#CCF6FF',
          1200: '#E6FBFF',
        },
        ultra: {
          0: '#6060DB',
          1: '#7070FF',
          2: '#8585FF',
          3: '#9999FF',
          4: '#B3B3FF',
          5: '#CCCCFF',
          6: '#E6E6FF',
          7: '#F2F2FF',
          500: '#6060DB',
          600: '#7070FF',
          700: '#8585FF',
          800: '#9999FF',
          900: '#B3B3FF',
          1000: '#CCCCFF',
          1100: '#E6E6FF',
          1200: '#F2F2FF',
        },
        purple: {
          0: '#884EC2',
          1: '#9C53E6',
          2: '#B075EB',
          3: '#C090F0',
          4: '#D0ABF5',
          5: '#E1C8FA',
          6: '#F2E6FF',
          7: '#F9F2FF',
          500: '#884EC2',
          600: '#9C53E6',
          700: '#B075EB',
          800: '#C090F0',
          900: '#D0ABF5',
          1000: '#E1C8FA',
          1100: '#F2E6FF',
          1200: '#F9F2FF',
        },
        borderWidth: {
          '1': '1px',
          '2': '2px',
        },
        boxShadow: {
          '1': '0px 0px 1px rgba(31, 38, 76, 0.16), 0px 2px 5px rgba(31, 38, 76, 0.03), 0px 3px 8px rgba(31, 38, 76, 0.04)',
          '2': '0px 0px 1px rgba(31, 38, 76, 0.16), 0px 4px 12px rgba(31, 38, 76, 0.06), 0px 8px 20px -8px rgba(31, 38, 76, 0.06)',
          '3': '0px 0px 1px rgba(31, 38, 76, 0.16), 0px 8px 24px rgba(31, 38, 76, 0.04), 0px 12px 32px -12px rgba(31, 38, 76, 0.04)',
        },
        keyframes: {
          "accordion-down": {
            from: { height: 0 },
            to: { height: "var(--radix-accordion-content-height)" },
          },
          "accordion-up": {
            from: { height: "var(--radix-accordion-content-height)" },
            to: { height: 0 },
          },
        },
        animation: {
          "accordion-down": "accordion-down 0.2s ease-out",
          "accordion-up": "accordion-up 0.2s ease-out",
        },
      },
    },
  },
  plugins: [animate],
};
