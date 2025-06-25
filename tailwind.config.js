/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                background: "#0D1117",
                card: "#161B22",
                primary: "#58A6FF",
                green: "#238636",
                red: "#DA3633",
            },
        },
    },
    plugins: [],
}