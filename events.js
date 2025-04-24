var events = {
    timeline: timeline,
    eventH: 100,
    zoomY: 1, // Vertical zoom factor (default is 1)
    offsetY: 0, // Vertical panning offset (default is 0)

    data: (() => {
        const palette = preference.themes.find(t => t.name === preference.defaultTheme).palette;
        let paletteIndex = 0;

        // Generate groups with unique colors
        const groups = Array.from({ length: 20 }, (_, groupIndex) => {
            const color = palette[paletteIndex];
            paletteIndex = (paletteIndex + 1) % palette.length; // Move to the next color in the palette
            return {
                name: `Group${groupIndex + 1}`,
                color: color, // Assign the color from the palette
            };
        });

        // Generate tracks for each group
        const tracks = groups.flatMap((group, groupIndex) => {
            return Array.from({ length: 5 }, (_, trackIndex) => {
                const isBright = trackIndex % 2 === 0; // Alternate between 80% and 50% brightness
                return {
                    groupName: group.name,
                    name: `Track${groupIndex + 1}-${trackIndex + 1}`, // Globally unique track name
                    color: deriveColor(group.color, isBright), // Derive track color from the group color
                };
            });
        });

        // Generate events for each track
        const events = tracks.flatMap((track) => {
            const eventCount = Math.floor(Math.random() * 100) + 50; // Generate between 10 and 100 events
            const yearStart = new Date("2025-01-01").getTime(); // Start of the year
            const yearEnd = new Date("2025-12-31").getTime(); // End of the year
            const interval = (yearEnd - yearStart) / eventCount; // Divide the year into equal intervals

            let lastEnd = yearStart; // Initialize the end time of the last event

            return Array.from({ length: eventCount }, (_, eventIndex) => {
                const intervalStart = yearStart + eventIndex * interval; // Start of the current interval
                const intervalEnd = intervalStart + interval; // End of the current interval
                const randomStart = Math.random() * (intervalEnd - intervalStart) + intervalStart; // Random start time within the interval

                // Ensure 95% of events have a duration shorter than 4 hours
                const isShortEvent = Math.random() < 0.95;
                const randomDuration = isShortEvent
                    ? 0.5 * (Math.ceil(Math.random() * (8))+2) // Duration between 0.5 and 4 hours
                    : 0.5 * Math.ceil(Math.random() * (120)); // Duration between 0.5 and 48 hours

                const randomEnd = randomStart + randomDuration * 60 * 60 * 1000; // Calculate the end time
                lastEnd = randomEnd; // Update the last end time for the next event

                return {
                    trackName: track.name,
                    name: `Event-${track.name}-${eventIndex + 1}`, // Unique event name
                    start: new Date(randomStart),
                    end: new Date(randomEnd),
                    duration: randomDuration,
                    color: track.color, // Inherit color from the parent track
                };
            });
        });

        return { groups, tracks, events };
    })(),

    leftBar: {
        width: 200,
        color: 'rgba(30,30,30,0.9)',
        render: function(startIndex, endIndex) {
            ctx.save();

            // Render the left bar background
            ctx.fillStyle = this.color;
            ctx.fillRect(0, 0, this.width, canvas.height);

            // Draw a black line to separate the leftBar from the event container
            ctx.beginPath();
            ctx.moveTo(this.width, 0);
            ctx.lineTo(this.width, canvas.height);
            ctx.strokeStyle = "rgba(0, 0, 0, 0.5)";
            ctx.lineWidth = 1;
            ctx.stroke();

            const groupColumnWidth = this.width * 0.2; // 20% for the group column
            const trackColumnWidth = this.width * 0.8; // 80% for the track column
            ctx.font = `${view.fontSize}px ${view.font}`;
            ctx.textBaseline = 'top'; // Align text to the top
            ctx.textAlign = 'left'; // Align text to the left

            let currentGroup = null;
            let groupStartIndex = null;

            for (let i = startIndex; i <= endIndex; i++) {
                // Stop rendering if the index exceeds the number of tracks
                if (i >= events.data.tracks.length) break;

                const y = i * events.eventH * events.zoomY + events.offsetY;
                const height = events.eventH * events.zoomY;

                const track = events.data.tracks[i];
                const group = events.data.groups.find(g => g.name === track.groupName);

                // Finalize the current group if the group changes or if this is the last track
                if (currentGroup !== group || i === events.data.tracks.length - 1 || i === endIndex) {
                    if (currentGroup) {
                        // Calculate the group's position and height
                        const groupY = groupStartIndex * events.eventH * events.zoomY + events.offsetY;
                        const groupHeight = (i - groupStartIndex + (i === events.data.tracks.length - 1 ? 1 : 0)) * events.eventH * events.zoomY;

                        // Render the group background
                        const groupColorWithOpacity = currentGroup.color.replace('rgb', 'rgba').replace(')', ', 0.8)');
                        ctx.fillStyle = groupColorWithOpacity;
                        ctx.fillRect(0, groupY + events.timeline.topBar.height, groupColumnWidth, groupHeight);

                        // Measure the text width to calculate vertical centering
                        const textWidth = ctx.measureText(currentGroup.name).width;

                        // Render the group name vertically
                        if (textWidth < groupHeight - view.textPadding * 2) {
                            const groupFontColor = getFontColor(currentGroup.color);
                            ctx.fillStyle = groupFontColor;

                            // Save the current context and rotate it for vertical text
                            ctx.save();
                            const groupCenterY = groupY + groupHeight / 2; // Calculate the vertical center of the group
                            const groupCenterX = groupColumnWidth / 2; // Calculate the horizontal center of the group column
                            ctx.translate(groupCenterX, groupCenterY); // Move to the center of the group
                            ctx.rotate(-Math.PI / 2); // Rotate 90 degrees clockwise

                            const verticalOffset = textWidth / 2; // Half of the text width for vertical centering

                            // Draw the group name centered
                            ctx.textAlign = 'center'; // Align text horizontally to the center
                            ctx.textBaseline = 'middle'; // Align text vertically to the center
                            ctx.fillText(currentGroup.name, -verticalOffset-view.textPadding*3, 0);

                            // Restore the context
                            ctx.restore();
                        }
                    }

                    // Start a new group
                    currentGroup = group;
                    groupStartIndex = i;
                }

                // Render the track background
                const trackColorWithOpacity = track.color.replace('rgb', 'rgba').replace(')', ', 0.8)');
                ctx.fillStyle = trackColorWithOpacity;
                ctx.fillRect(groupColumnWidth, y + events.timeline.topBar.height, trackColumnWidth, height);

                // Render the track name
                const trackFontColor = getFontColor(track.color);
                if (view.fontSize <= height - view.textPadding * 2) {
                    ctx.fillStyle = trackFontColor;
                    ctx.fillText(
                        track.name,
                        groupColumnWidth + view.textPadding, // Padding from the left of the track column
                        y + events.timeline.topBar.height + view.textPadding + height / 2 - view.fontSize/2 // Centered vertically
                    );
                }
            }

            ctx.restore();
        }
    },

    render: function() {
        ctx.save();

        // Render the event bars first
        const containerHeight = canvas.height - this.timeline.topBar.height; // Height of the container
        const startIndex = Math.max(0, Math.floor(-this.offsetY / (this.eventH * this.zoomY))); // First visible row index
        const endIndex = Math.ceil((containerHeight - this.offsetY) / (this.eventH * this.zoomY)); // Last visible row index

        for (let i = startIndex; i < endIndex; i++) {
            // Stop rendering if the index exceeds the number of tracks
            if (i >= this.data.tracks.length) break;

            const y = i * this.eventH * this.zoomY + this.offsetY; // Calculate row position
            const height = this.eventH * this.zoomY; // Adjust height based on zoom

            const track = this.data.tracks[i];
            const eventsForTrack = this.data.events.filter(event => event.trackName === track.name);

            // Render the event bars
            eventsForTrack.forEach(event => {
                const x = (event.start.getTime() - this.timeline.tL) / this.timeline.mspp;
                const width = (event.duration * 60 * 60 * 1000) / this.timeline.mspp;

                // Skip rendering if the event is outside the visible timeline range or its width is <= 1
                if (x + width < 0 || x > this.timeline.sW || width < 1) {
                    return;
                }

                // Render the event bar
                ctx.fillStyle = event.color;
                ctx.fillRect(x + this.leftBar.width, y + this.timeline.topBar.height, width, height);

                // Determine font color based on background brightness
                const fontColor = getFontColor(event.color);

                // Calculate the font size
                const fontSize = Math.min(view.fontSize, Math.max(height - view.textPadding * 2, view.fontSize)); // Ensure the font size fits within the bar height and is at least 1x
                const adjustedFontSize = Math.min(fontSize, view.fontSize * 2); // Allow font size to grow up to 2x if space allows

                // Render the event name if there is enough space
                if (adjustedFontSize > 0) {
                    ctx.font = `${adjustedFontSize}px ${view.font}`;
                    const textWidth = ctx.measureText(event.name).width;

                    // Ensure the text fits within the event bar's width and height
                    if (width > textWidth + view.textPadding * 2 && height > adjustedFontSize + view.textPadding * 2) {
                        ctx.fillStyle = fontColor; // Use the calculated font color
                        ctx.fillText(
                            event.name,
                            x + this.leftBar.width + view.textPadding, // Position text inside the bar with padding
                            y + this.timeline.topBar.height+ view.textPadding + adjustedFontSize // Position text vertically centered in the bar
                        );
                    }
                }
            });
        }

        ctx.restore();

        this.leftBar.render(startIndex, endIndex); // Render the left bar after the events
    },

    zoom: function(deltaY, mouseY) {
        const zoomFactor = 1 - deltaY * control.zoomSpeed;

        // Calculate the total height of all tracks at the current zoom level
        const totalHeight = this.data.tracks.length * this.eventH * this.zoomY; // Total height of all tracks
        const containerHeight = canvas.height - this.timeline.topBar.height; // Height of the container

        // Dynamically calculate the minimum zoom rate
        const dynamicZoomMinY = Math.min(1, containerHeight / (this.data.tracks.length * this.eventH));

        // Calculate the new zoom level, clamping it within the dynamic range
        const newZoomY = Math.max(dynamicZoomMinY, Math.min(this.zoomY * zoomFactor, control.zoomMaxY));

        // Prevent zooming out if the total height is less than or equal to the container height
        if (totalHeight <= containerHeight && newZoomY < this.zoomY) {
            return; // Do nothing if zooming out is not allowed
        }

        // Calculate the mouse's relative position in the event list
        const mouseOffsetY = mouseY; // Mouse position relative to the container
        const mouseEventPosition = (mouseOffsetY - this.offsetY) / this.zoomY; // Mouse position relative to the zoomed content

        // Update the zoom level
        this.zoomY = newZoomY;

        // Adjust the offset to ensure the mouse Y remains at the same relative position
        this.offsetY = mouseOffsetY - mouseEventPosition * this.zoomY;

        // Clamp the offset to ensure the event list stays within the container
        const maxOffsetY = 0; // Top of the event list should align with the top of the container
        const minOffsetY = Math.min(0, containerHeight - totalHeight); // Bottom of the event list should align with the bottom of the container
        this.offsetY = Math.max(minOffsetY, Math.min(this.offsetY, maxOffsetY));
    },

    pan: function(deltaY) {
        this.offsetY -= deltaY; // Adjust vertical offset

        // Clamp the offset to ensure the event list stays within the container
        const totalHeight = this.data.tracks.length * this.eventH * this.zoomY; // Total height of all tracks
        const containerHeight = canvas.height - this.timeline.topBar.height; // Height of the container
        const maxOffsetY = 0; // Top of the event list should align with the top of the container
        const minOffsetY = Math.min(0, containerHeight - totalHeight); // Bottom of the event list should align with the bottom of the container
        this.offsetY = Math.max(minOffsetY, Math.min(this.offsetY, maxOffsetY));
    }
};

// Helper function to convert hex color to RGB
function hexToRgb(hex) {
    const bigint = parseInt(hex.slice(1), 16);
    return {
        r: (bigint >> 16) & 255,
        g: (bigint >> 8) & 255,
        b: bigint & 255,
    };
}

// Helper function to calculate brightness and determine font color
function getFontColor(backgroundColor) {
    var rgb = backgroundColor;
    
    if (backgroundColor.startsWith("#") && (backgroundColor.length == 7))
        rgb = hexToRgb(backgroundColor);
    
    if (backgroundColor.startsWith("rgb")) {
        const rgbValues = backgroundColor.match(/\d+/g);
        rgb = {
            r: parseInt(rgbValues[0]),
            g: parseInt(rgbValues[1]),
            b: parseInt(rgbValues[2]),
        };
    }

    // Calculate brightness
    const brightness = (rgb.r * 0.299 + rgb.g * 0.587 + rgb.b * 0.114) / 255;

    // Return font color based on brightness
    return brightness > 0.5 ? "rgba(0, 0, 0, 0.7)" : "rgba(255, 255, 255, 0.7)";
}

// Convert RGB to HSL
function rgbToHsl(r, g, b) {
    r /= 255;
    g /= 255;
    b /= 255;
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;

    if (max === min) {
        h = s = 0; // Achromatic
    } else {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
    }

    return { h, s, l };
}

// Convert RGB to Hex
function rgbToHex(rgb) {
    const toHex = (value) => {
        const hex = Math.round(value).toString(16);
        return hex.length === 1 ? "0" + hex : hex;
    };

    return `#${toHex(rgb.r)}${toHex(rgb.g)}${toHex(rgb.b)}`;
}

// Convert HSL to RGB
function hslToRgb(h, s, l) {
    let r, g, b;

    if (s === 0) {
        r = g = b = l; // Achromatic
    } else {
        const hue2rgb = (p, q, t) => {
            if (t < 0) t += 1;
            if (t > 1) t -= 1;
            if (t < 1 / 6) return p + (q - p) * 6 * t;
            if (t < 1 / 2) return q;
            if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
            return p;
        };

        const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        const p = 2 * l - q;
        r = hue2rgb(p, q, h + 1 / 3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1 / 3);
    }

    return { r: r * 255, g: g * 255, b: b * 255 };
}

// Helper function to derive a track color from a group color
function deriveColor(baseColor, isBright) {
    const rgb = hexToRgb(baseColor);
    const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b); // Convert RGB to HSL

    // Reduce the lightness to make the track color darker than the group color
    hsl.l = isBright ? hsl.l * 0.85 : hsl.l * 0.9; // Reduce lightness by 20% or 40%

    const derivedRgb = hslToRgb(hsl.h, hsl.s, hsl.l); // Convert HSL back to RGB
    return `rgb(${Math.round(derivedRgb.r)}, ${Math.round(derivedRgb.g)}, ${Math.round(derivedRgb.b)})`;
}
