var raw_data = {
    groups : [
        { 
            name: "catagory 1",
        },
        { 
            name: "catagory 2"
        }
    ],
    
    tracks : [
        {
            name: "track 1",
            group: "catagory 1"
        },
        {
            name: "track 2",
            group: "catagory 1"
        },
        {
            name: "track 3",
            group: "catagory 2"
        },
        {
            name: "track 4",
            group: "catagory 2"
        }
    ],

    events : [
        {
            name: "event 1",
            group: "catagory 1",
            track: "track 1",
            description: "description 1",
            start: "2023-10-01T10:00:00",
            end: "2023-10-01T11:00:00",
            location: "location 1",
            audience: 100,
        },
        {
            name: "event 2",
            group: "catagory 1",
            track: "track 2",
            description: "description 2",
            start: "2023-10-01T12:00:00",
            end: "2023-10-01T13:00:00",
            location: "location 2",
            audience: 200,
        },
        {
            name: "event 3",
            group: "catagory 2",
            track: "track 3",
            description: "description 3",
            start: "2023-10-01T14:00:00",
            end: "2023-10-01T15:00:00",
            location: "location 3",
            audience: 300,
        },
        {
            name: "event 4",
            group: "catagory 2",
            track: "track 4",
            description: "description 4",
            start: "2023-10-01T16:00:00",
            end: "2023-10-01T17:00:00",
            location: "location 4",
            audience: 400,
        }
    ]
}
