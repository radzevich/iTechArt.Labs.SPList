function Config() {
    return {
        siteUrl: 'http://wm-windows2012r/sites/apps/learnSP',
        listTitle: 'testCrudList',
        listColumnsInfo: [
            {
                intenalName: 'ID',
                displayName: 'ID',
                type: 'text',
            },
            {
                intenalName: 'Title',
                displayName: 'Title',
                type: 'text',
            },
            {
                intenalName: 'Created By',
                displayName: 'Created By',
                type: 'text',
            },
            {
                intenalName: 'Genre',
                displayName: 'Genre',
                type: 'choice',
            },
            {
                intenalName: 'BookDownloadLink',
                displayName: 'Download Link',
                type: 'text',
            },   
            {
                intenalName: 'Author',
                displayName: 'Author',
                type: 'lookup',
            },
        ],
    }
}