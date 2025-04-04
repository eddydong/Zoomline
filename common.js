function getRandomColor(){
    const palette = [
        "#37474F", // Dark Gray
        "#263238", // Deep Blue Gray
        "#5E35B1", // Deep Lavender
        "#D84315", // Burnt Orange
        "#FFB300", // Amber
        "#00897B", // Deep Teal
        "#8E24AA"  // Vibrant Purple
    ];
    return palette[Math.floor(Math.random() * palette.length)];
}