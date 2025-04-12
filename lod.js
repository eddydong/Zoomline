const LOD = [
    {
        granularity: 'second',
        step: 0.1,
        format: [
            { minute: "2-digit", second: "2-digit", fractionalSecondDigits: 1 },
            { year: "numeric", month: "long", day: "2-digit", hour: "2-digit",hour12: false, }
        ]
    },
    {
        granularity: 'second',
        step: 1,
        format: [
            {  minute: "2-digit", hour12: false, second: "2-digit" },
            { year: "numeric", month: "long", day: "2-digit", hour: "2-digit",hour12: false }
        ]
    },
    {
        granularity: 'second',
        step: 10,
        format: [
            { minute: "2-digit", hour12: false, second: "2-digit" },
            { year: "numeric", month: "long", day: "2-digit", hour: "2-digit",hour12: false }
        ]
    },
    {
        granularity: 'minute',
        step: 1,
        format: [
            { hour: "2-digit", minute: "2-digit", hour12: false },
            { year: "numeric", month: "long", day: "2-digit",hour12: false,  hour: "2-digit"}
        ]
    },
    {
        granularity: 'minute',
        step: 10,
        format: [
            { hour: "2-digit", minute: "2-digit", hour12: false },
            { year: "numeric", month: "long", day: "2-digit" }
        ]
    },
    {
        granularity: 'hour',
        step: 1,
        format: [
            { hour: "2-digit", minute: "2-digit", hour12: false },
            { year: "numeric", month: "long", day: "2-digit" }
        ]
    },
    {
        granularity: 'hour',
        step: 8,
        format: [
            { hour: "2-digit", minute: "2-digit", hour12: false },
            { year: "numeric", month: "long", day: "2-digit" }
        ]
    },
    {
        granularity: 'day',
        step: 1,
        format: [
            { day: "2-digit", weekday: "short" },
            { year: "numeric", month: "long" }
        ]
    },
    {
        granularity: 'week',
        step: 1,
        format: [
            { day: "2-digit", weekday: "short" },
            { year: "numeric", month: "long" }
        ]
    },
    {
        granularity: 'month',
        step: 1,
        format: [
            { month: "short"  },
            { year: "numeric" }
        ]
    },
    {
        granularity: 'month',
        step: 3,
        format: [
            { month: "short"  },
            { year: "numeric" }
        ]
    },
    {
        granularity: 'year',
        step: 1,
        format: [
            { year: "numeric"},
            { year: "numeric"}
        ]
    },
    {
        granularity: 'year',
        step: 10,
        format: [
            { year: "numeric"},
            { year: "numeric", era: "short"  }
        ]
    },
    {
        granularity: 'year',
        step: 100,
        format: [
            { year: "numeric", era: "short" },
            { year: "numeric" , era: "short" }
        ]
    },
    {
        granularity: 'year',
        step: 1000,
        format: [
            { year: "numeric", era: "short" },
            { year: "numeric" , era: "short" }
        ]
    },
    {
        granularity: 'year',
        step: 10000,
        format: [
            { year: "numeric", era: "short" },
            { year: "numeric" , era: "short" }
        ]
    },
    {
        granularity: 'year',
        step: 100000,
        format: [
            { year: "numeric", era: "short" },
            { year: "numeric" , era: "short" }
        ]
    }
];
