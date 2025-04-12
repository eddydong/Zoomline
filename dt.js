var dt = {
    // Function to round down a date to the nearest specified granularity
    // Example usage: floorDT(new Date(), 'hour');
    // Supported granularities: 'second', 'minute', 'hour', 'day', 'week', 'month', 'year'
    // Note: 'week' is calculated from Sunday, 'month' to the first day of the month, and 'year' to January 1st
    floorDT: function(date, granularity, step = 1) {
        const d = new Date(date); // Create a copy of the date to avoid mutating the original
        switch (granularity) {
            case 'second':
                // Handle fractional steps (e.g., step = 0.1)
                const totalMilliseconds = d.getSeconds() * 1000 + d.getMilliseconds();
                const stepMilliseconds = step * 1000;
                const flooredMilliseconds = Math.floor(totalMilliseconds / stepMilliseconds) * stepMilliseconds;
                d.setMilliseconds(flooredMilliseconds % 1000);
                d.setSeconds(Math.floor(flooredMilliseconds / 1000));
                break;
            case 'minute':
                d.setSeconds(0, 0);
                d.setMinutes(Math.floor(d.getMinutes() / step) * step);
                break;
            case 'hour':
                d.setMinutes(0, 0, 0);
                d.setHours(Math.floor(d.getHours() / step) * step);
                break;
            case 'day':
                d.setHours(0, 0, 0, 0);
                d.setDate(Math.floor((d.getDate() - 1) / step) * step + 1);
                break;
            case 'week':
                d.setHours(0, 0, 0, 0);
                const startOfWeek = d.getDate() - d.getDay(); // Align to the start of the week (Sunday)
                d.setDate(startOfWeek + Math.floor((d.getDate() - startOfWeek) / (step * 7)) * step * 7);
                break;
            case 'month':
                d.setHours(0, 0, 0, 0);
                d.setDate(1); // Align to the first day of the month
                d.setMonth(Math.floor(d.getMonth() / step) * step);
                break;
            case 'year':
                d.setHours(0, 0, 0, 0);
                d.setMonth(0, 1); // Align to January 1st
                d.setFullYear(Math.floor(d.getFullYear() / step) * step);
                break;
            default:
                throw new Error(`Unsupported granularity: ${granularity}`);
        }
        return d; // Return a valid date or epoch if invalid
    },

    addDuration: function(date, granularity, step = 1) {
        const d = new Date(date); // Create a copy of the date to avoid mutating the original
        switch (granularity) {
            case 'second':
                // Handle fractional steps (e.g., step = 0.1)
                const stepMilliseconds = step * 1000; // Convert step to milliseconds
                d.setTime(d.getTime() + stepMilliseconds); // Add the step in milliseconds
                break;
            case 'minute':
                d.setMinutes(d.getMinutes() + step);
                break;
            case 'hour':
                d.setHours(d.getHours() + step);
                break;
            case 'day':
                d.setDate(d.getDate() + step);
                break;
            case 'week':
                d.setDate(d.getDate() + step * 7);
                break;
            case 'month':
                d.setMonth(d.getMonth() + step);
                break;
            case 'year':
                d.setFullYear(d.getFullYear() + step);
                break;
            default:
                throw new Error(`Unsupported granularity: ${granularity}`);
        }
        return d;
    },

    // Function to get the current duration from a given date to its next tick by granularity
    // this is to solve the month & year issue
    // return in milliseconds
    getDuration: function(date, granularity, step=1) {
        return dt.addDuration(new Date(date), granularity, step).getTime() - new Date(date).getTime();
    },

    // Function to get a list of DateTime objects at regular intervals
    // between a start and end date in long int, with a specified step in minutes
    getDTList: function(start, end, timeline) {
        var ticks = [[],[]];
        var tickTW = [[],[]];
        var currentLayer = 0;
        for (let i = 0; i < lod.length; i++) {
            ticks[currentLayer] = [];
            const g = lod[i].granularity;
            const s = lod[i].step;
            const stepDuration = dt.getDuration(start, g, s);
            const minDuration = timeline.labelW * timeline.mspp; // Minimum duration for a tick to be considered
            if (stepDuration >= minDuration) {
                let current = dt.floorDT(start, g, s);
                while (current.getTime() <= end) {
                    ticks[currentLayer].push({
                        dt: new Date(current),
                        label: true, // Always show labels for consistent panning
                    });
                    current = dt.addDuration(current, g, s);
                }
                if (currentLayer==0) timeline.lod = i; // Set the current level of detail
                tickTW[currentLayer] = dt.getDuration(timeline.tL, g, s) / timeline.mspp;
                currentLayer++;
                if (currentLayer>1) break;
            };
        }
        timeline.ticks = ticks;
        timeline.tickTW = tickTW;
        return true;
    }
}
