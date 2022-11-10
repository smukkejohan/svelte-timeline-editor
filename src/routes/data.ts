export const data = {
    duration: 55000,
    layers: [
        {
            title: "Overlays",
            blocks: []
        },
        {
             title: "Titles",
            blocks: [{
                title: "title1",
                validations: {
                    duration: {
                        fixed: 3000
                    },
                    inTime: {
                        fixed: 1000
                    }
            }
        },
        {
            title: "title 2",
        },
        {
            title: "title 3",
        },
        {
            title: "title 4",
        }]
        },
        {
        title: "Footage",
        blocks: [{
            title: "Footage 1",
            validations: {
                duration: {
                    min: 3000,
                    max: 8000
                }
            }
        }]
        },
        {
        title: "Speak",
        blocks: []
        },
    ]
};

