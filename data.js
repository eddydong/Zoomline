const BUs = [
    {
        name: "BU1",
    },
    {
        name: "BU2",
    },
    {
        name: "BU3",
    },
    {
        name: "BU4",
    },
    {
        name: "BU5",
    },
    {
        name: "BU6",
    },
    {
        name: "BU7",
    },
    {
        name: "BU8",
    },
    {
        name: "BU9",
    },
    {
        name: "BU10",
    },
];

const eTypes = [
    {
        name: "eType1",
    },
    {
        name: "eType2",
    },
    {
        name: "eType3",
    },
    {
        name: "eType4",
    },
    {
        name: "eType5",
    },
    {
        name: "eType6",
    },
    {
        name: "eType7",
    },
    {
        name: "eType8",
    },
    {
        name: "eType9",
    },
    {
        name: "eType10",
    }
];

const events = Array.from({ length: 100 }, (_, i) => {
    const randomBU = BUs[Math.floor(Math.random() * BUs.length)];
    const randomEType = eTypes[Math.floor(Math.random() * eTypes.length)];
    const randomStart = new Date(
        new Date("2025-01-01").getTime() +
        Math.random() * (new Date("2025-12-31").getTime() - new Date("2025-01-01").getTime())
    );

    // Ensure 95% of events have a duration shorter than 4 hours
    const isShortEvent = Math.random() < 0.95;
    const randomDuration = isShortEvent
        ? 0.5 * Math.ceil(Math.random() * (4 / 0.5)) // Duration between 0.5 and 4 hours
        : 0.5 * Math.ceil(Math.random() * (2160 / 0.5)); // Duration between 0.5 and 2160 hours

    const randomEnd = new Date(randomStart.getTime() + randomDuration * 60 * 60 * 1000);

    return {
        name: `Event${i + 1}`,
        desc: `Description of Event${i + 1}`,
        BU: randomBU,
        eType: randomEType,
        start: randomStart,
        duration: randomDuration,
        end: randomEnd,
    };
});