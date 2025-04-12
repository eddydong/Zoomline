var preference = {
    themes: [
        {
            name: 'default',
            palette: [
                "#E63946", // A bold crimson red, intense and striking
                "#F4A261", // A soft coral orange, warm and inviting
                "#E9C46A", // A golden yellow, cheerful and bright
                "#2A9D8F", // A teal green, refreshing and calm
                "#264653", // A deep navy blue, strong and stable
                "#6A4C93", // A rich purple, creative and inspiring
                "#FFB4A2"  // A peachy pink, gentle and soothing
            ]
        }
    ],
    defaultTheme: 'default',
    getRandomColor: function(){
            return this.themes.find(t => t.name === this.defaultTheme).palette[Math.floor(Math.random() 
                * this.themes.find(t => t.name === this.defaultTheme).palette.length)];
    }

}