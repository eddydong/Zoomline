function getRandomColor(){
    const palette = [
        "#E63946", // A bold crimson red, intense and striking
        "#F4A261", // A soft coral orange, warm and inviting
        "#E9C46A", // A golden yellow, cheerful and bright
        "#2A9D8F", // A teal green, refreshing and calm
        "#264653", // A deep navy blue, strong and stable
        "#6A4C93", // A rich purple, creative and inspiring
        "#FFB4A2"  // A peachy pink, gentle and soothing
    ];
    return palette[Math.floor(Math.random() * palette.length)];
}

function formatDT(dt) {
    let d = new Date(dt);
    return d.getFullYear() +
      "-" + String(d.getMonth() + 1).padStart(2, "0") +
      "-" + String(d.getDate()).padStart(2, "0") +
      " " + String(d.getHours()).padStart(2, "0") +
      ":" + String(d.getMinutes()).padStart(2, "0") +
      ":" + String(d.getSeconds()).padStart(2, "0");
  }