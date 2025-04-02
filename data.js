var pallet = [
    "#FF0000", // red
    "#00FF00", // green
    "#0000FF", // blue
    "#FFFF00", // yellow
    "#FF00FF", // magenta
    "#00FFFF", // cyan
    "#FFA500", // orange
    "#800080", // purple
    "#808080", // gray
    "#FFC0CB", // pink
    "#A52A2A", // brown
    "#FFD700", // gold
    "#ADFF2F", // greenyellow
    "#7FFF00", // chartreuse
    "#D2691E", // chocolate
    "#FF4500", // orange red
    "#FF1493", // deep pink
];

const BU = [
    {
        name: "BU1",
        desc: "Building 1",
        color: pallet[0], 
        eventTypes: [
            { name: "Lecture", color: pallet[0] },
            { name: "Lab", color: pallet[1] },
            { name: "Seminar", color: pallet[2] },
            { name: "Workshop", color: pallet[3] },
            { name: "Meeting", color: pallet[4] },
            { name: "Conference", color: pallet[5] },
            { name: "Exam", color: pallet[6] }
        ]
    },
    {
        name: "BU2",
        desc: "Building 2",
        color: pallet[1], 
        eventTypes: [
            { name: "Lecture", color: pallet[0] },
            { name: "Lab", color: pallet[1] },
            { name: "Seminar", color: pallet[2] },
            { name: "Workshop", color: pallet[3] },
            { name: "Meeting", color: pallet[4] },
            { name: "Conference", color: pallet[5] },
            { name: "Exam", color: pallet[6] }
        ]
    },
    {
        name: "BU3",
        desc: "Building 3",
        color: pallet[2], 
        eventTypes: [
            { name: "Lecture", color: pallet[0] },
            { name: "Lab", color: pallet[1] },
            { name: "Seminar", color: pallet[2] },
            { name: "Workshop", color: pallet[3] },
            { name: "Meeting", color: pallet[4] },
            { name: "Conference", color: pallet[5] },
            { name: "Exam", color: pallet[6] }
        ]
    },
    {
        name: "BU4",
        desc: "Building 4",
        color: pallet[3], 
        eventTypes: [
            { name: "Lecture", color: pallet[0] },
            { name: "Lab", color: pallet[1] },
            { name: "Seminar", color: pallet[2] },
            { name: "Workshop", color: pallet[3] },
            { name: "Meeting", color: pallet[4] },
            { name: "Conference", color: pallet[5] },
            { name: "Exam", color: pallet[6] }
        ]
    },
    {
        name: "BU5",
        desc: "Building 5",
        color: pallet[4], 
        eventTypes: [
            { name: "Lecture", color: pallet[0] },
            { name: "Lab", color: pallet[1] },
            { name: "Seminar", color: pallet[2] },
            { name: "Workshop", color: pallet[3] },
            { name: "Meeting", color: pallet[4] },
            { name: "Conference", color: pallet[5] },
            { name: "Exam", color: pallet[6] }
        ]
    },
    {
        name: "BU6",
        desc: "Building 6",
        color: pallet[5], 
        eventTypes: [
            { name: "Lecture", color: pallet[0] },
            { name: "Lab", color: pallet[1] },
            { name: "Seminar", color: pallet[2] },
            { name: "Workshop", color: pallet[3] },
            { name: "Meeting", color: pallet[4] },
            { name: "Conference", color: pallet[5] },
            { name: "Exam", color: pallet[6] }
        ]
    },
    {
        name: "BU7",
        desc: "Building 7",
        color: pallet[6], 
        eventTypes: [
            { name: "Lecture", color: pallet[0] },
            { name: "Lab", color: pallet[1] },
            { name: "Seminar", color: pallet[2] },
            { name: "Workshop", color: pallet[3] },
            { name: "Meeting", color: pallet[4] },
            { name: "Conference", color: pallet[5] },
            { name: "Exam", color: pallet[6] }
        ]
    },
    {
        name: "BU8",
        desc: "Building 8",
        color: pallet[7], 
        eventTypes: [
            { name: "Lecture", color: pallet[0] },
            { name: "Lab", color: pallet[1] },
            { name: "Seminar", color: pallet[2] },
            { name: "Workshop", color: pallet[3] },
            { name: "Meeting", color: pallet[4] },
            { name: "Conference", color: pallet[5] },
            { name: "Exam", color: pallet[6] }
        ]
    },
    {
        name: "BU9",
        desc: "Building 9",
        color: pallet[8], 
        eventTypes: [
            { name: "Lecture", color: pallet[0] },
            { name: "Lab", color: pallet[1] },
            { name: "Seminar", color: pallet[2] },
            { name: "Workshop", color: pallet[3] },
            { name: "Meeting", color: pallet[4] },
            { name: "Conference", color: pallet[5] },
            { name: "Exam", color: pallet[6] }
        ]
    },
    {
        name: "BU10",
        desc: "Building 10",
        color: pallet[9], 
        eventTypes: [
            { name: "Lecture", color: pallet[0] },
            { name: "Lab", color: pallet[1] },
            { name: "Seminar", color: pallet[2] },
            { name: "Workshop", color: pallet[3] },
            { name: "Meeting", color: pallet[4] },
            { name: "Conference", color: pallet[5] },
            { name: "Exam", color: pallet[6] }
        ]
    },
    {
        name: "BU11",
        desc: "Building 11",
        color: pallet[10], 
        eventTypes: [
            { name: "Lecture", color: pallet[0] },
            { name: "Lab", color: pallet[1] },
            { name: "Seminar", color: pallet[2] },
            { name: "Workshop", color: pallet[3] },
            { name: "Meeting", color: pallet[4] },
            { name: "Conference", color: pallet[5] },
            { name: "Exam", color: pallet[6] }
        ]
    },
    {
        name: "BU12",
        desc: "Building 12",
        color: pallet[11], 
        eventTypes: [
            { name: "Lecture", color: pallet[0] },
            { name: "Lab", color: pallet[1] },
            { name: "Seminar", color: pallet[2] },
            { name: "Workshop", color: pallet[3] },
            { name: "Meeting", color: pallet[4] },
            { name: "Conference", color: pallet[5] },
            { name: "Exam", color: pallet[6] }
        ]
    },
    {
        name: "BU13",
        desc: "Building 13",
        color: pallet[12], 
        eventTypes: [
            { name: "Lecture", color: pallet[0] },
            { name: "Lab", color: pallet[1] },
            { name: "Seminar", color: pallet[2] },
            { name: "Workshop", color: pallet[3] },
            { name: "Meeting", color: pallet[4] },
            { name: "Conference", color: pallet[5] },
            { name: "Exam", color: pallet[6] }
        ]
    },
    {
        name: "BU14",
        desc: "Building 14",
        color: pallet[13], 
        eventTypes: [
            { name: "Lecture", color: pallet[0] },
            { name: "Lab", color: pallet[1] },
            { name: "Seminar", color: pallet[2] },
            { name: "Workshop", color: pallet[3] },
            { name: "Meeting", color: pallet[4] },
            { name: "Conference", color: pallet[5] },
            { name: "Exam", color: pallet[6] }
        ]
    },
    {
        name: "BU15",
        desc: "Building 15",
        color: pallet[14], 
        eventTypes: [
            { name: "Lecture", color: pallet[0] },
            { name: "Lab", color: pallet[1] },
            { name: "Seminar", color: pallet[2] },
            { name: "Workshop", color: pallet[3] },
            { name: "Meeting", color: pallet[4] },
            { name: "Conference", color: pallet[5] },
            { name: "Exam", color: pallet[6] }
        ]
    }
];