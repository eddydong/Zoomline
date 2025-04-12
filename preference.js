var preference = {
    themes: [
        {
            name: 'default',
            palette: [
                "#E63946", // Crimson red, vibrant and bold
                "#F3722C", // Deep orange, warm and energetic
                "#F9C74F", // Golden yellow, bright and cheerful
                "#90BE6D", // Fresh green, natural and calming
                "#43AA8B", // Teal green, refreshing and balanced
                "#577590", // Muted blue, cool and stable
                "#764BA2"  // Soft violet, elegant and harmonious
            ]
        },
        {
            name: 'rainbow',
            palette: [
                "#FF6B6B", // Soft red, lively and warm
                "#FFA36C", // Peach orange, smooth and inviting
                "#FFD93D", // Sunny yellow, bright and happy
                "#6BCB77", // Mint green, fresh and soothing
                "#4D96FF", // Sky blue, calm and serene
                "#9D4EDD", // Lavender purple, soft and dreamy
                "#C77DFF"  // Light violet, playful and harmonious
            ]
        }
    ],
    defaultTheme: 'default',
    getRandomColor: function(){
        return this.themes.find(t => t.name === this.defaultTheme).palette[Math.floor(Math.random() 
            * this.themes.find(t => t.name === this.defaultTheme).palette.length)];
    }
}