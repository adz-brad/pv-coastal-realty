export const properties = {
    title: "MLS",
    name: "mlsProperty",
    type: "document",
    readOnly: true,
    fields: [
        {title: "MLV", name: "mlvId", type: "number"},
        {title: "ID", name: "id", type: "number"},
        {title: "Title", name: "title", type: "string"},
        {title: "Zone", name: "zoneId", type: "number"},
        {title: "Region", name: "regionId", type: "number"},
        {title: "Created On", name: "createdOn", type: "string"},
        {title: "Updated On", name: "updatedOn", type: "string"},
        {title: "Sort Date", name: "sortDate", type: "datetime"},
        {title: "Days on Market", name: "daysOnMarket", type: "number"},
        {title: "Price", name: "price", type: "object", fields: [
            {title: "Current", name: "current", type: "number"},
            {title: "Start", name: "start", type: "number"},
            {title: "Search", name: "search", type: "number"},
        ]},
        {title: "Type", name: "type", type: "object", fields: [
            {title: "English", name: "en", type: "string"},
            {title: "Spanish", name: "es", type: "string"},
        ]},
        {title: "Description", name: "description", type: "object", fields: [
            {title: "English", name: "en", type: "text"},
            {title: "Spanish", name: "es", type: "text"},
        ]},
        {title: "Address", name: "address", type: "object", fields: [
            {title: "Street", name: "street", type: "string"},
            {title: "City", name: "city", type: "string"},
            {title: "State", name: "state", type: "string"},
            {title: "Region", name: "region", type: "string"},
            {title: "Description", name: "description", type: "object", fields: [
                {title: "English", name: "en", type: "text"},
                {title: "Spanish", name: "es", type: "text"},
            ]},
            {title: "Geo Coordinates", name: "coordinates", type: "geopoint"},
        ]},
        {title: "Bedrooms", name: "bedrooms", type: "number"},
        {title: "Bathrooms", name: "bathrooms", type: "number"},
        {title: "Construction Size", name: "constructionSize", type: "number"},
        {title: "Features", name: "features", type: "array", of: [
            { type: "object", fields: [
                {title: "Title", name: "name", type: "string" },
                {title: "Value", name: "value", type: "number"},
                {title: "Title Strings", name: "title", type: "object", fields: [
                    {title: "English", name: "en", type: "string"},
                    {title: "Spanish", name: "es", type: "string"},
                ]},
            ]}
        ]},
        {title: "Ammenities", name: "ammenities", type: "array", of: [
            { type: "object", fields: [
                {title: "English", name: "en", type: "string"},
                {title: "Spanish", name: "es", type: "string"},
            ]},
        ]},
        {title: "Views", name: "view", type: "array", of: [
            { type: "object", fields: [
                {title: "English", name: "en", type: "string"},
                {title: "Spanish", name: "es", type: "string"},
            ]},
        ]},
        {title: "Images", name: "images", type: "array", of: [{type: "image", fields: [{ title: 'Alt Text', name: 'alt', type: 'string'}]}]}
    ],
    preview: {
        select: {
            title: "title",
            image: "images",
            mlvId: "mlvId"
        },
        prepare({ title, image, mlvId }){
            return {
                title: title ? title : '',
                subtitle: mlvId? `MLV# ${mlvId}` : '',
                media: image.length ? image[0] : null,
            }
        }
    },
}

export const listings = {
    title: "Listings",
    name: "listings",
    type: "document",
    groups: [
        {title: "Featured",name:"featured"},
        {title: "Off-Market",name:"offMarket"},
    ],
    fields: [
        {title: "Title", name: "title", type: "string", hidden: true},
        {title: "Featured", name: "featured", type: "array", group: "featured", description: "Search MLS Vallarta using the MLS property ID or property name.", of:[{type: "reference", to: [{type:"mlsProperty"}], options: { disableNew: true } }]},
        {title: "Off-Market", name: "offMarket", type: "array", group: "offMarket", of:[{type: "property"}]}
    ],
    initialValue: {
        title: "Listings"
    }
}

export const property = {
    title: "Property",
    name: "property",
    type: "object",
    fields: [
        {title: "Title", name: "title", type: "string"},
        {title: "Zone", name: "zoneId", type: "number"},
        {title: "Region", name: "regionId", type: "number"},
        {title: "Created On", name: "createdOn", type: "string"},
        {title: "Updated On", name: "updatedOn", type: "string"},
        {title: "Sort Date", name: "sortDate", type: "datetime"},
        {title: "Days on Market", name: "daysOnMarket", type: "number"},
        {title: "Price", name: "price", type: "object", fields: [
            {title: "Current", name: "current", type: "number"},
            {title: "Start", name: "start", type: "number"},
            {title: "Search", name: "search", type: "number"},
        ]},
        {title: "Type", name: "type", type: "object", fields: [
            {title: "English", name: "en", type: "string"},
            {title: "Spanish", name: "es", type: "string"},
        ]},
        {title: "Description", name: "description", type: "object", fields: [
            {title: "English", name: "en", type: "text"},
            {title: "Spanish", name: "es", type: "text"},
        ]},
        {title: "Address", name: "address", type: "object", fields: [
            {title: "Street", name: "street", type: "string"},
            {title: "City", name: "city", type: "string"},
            {title: "State", name: "state", type: "string"},
            {title: "Region", name: "region", type: "string"},
            {title: "Description", name: "description", type: "object", fields: [
                {title: "English", name: "en", type: "text"},
                {title: "Spanish", name: "es", type: "text"},
            ]},
            {title: "Geo Coordinates", name: "coordinates", type: "geopoint"},
        ]},
        {title: "Bedrooms", name: "bedrooms", type: "number"},
        {title: "Bathrooms", name: "bathrooms", type: "number"},
        {title: "Construction Size", name: "constructionSize", type: "number"},
        {title: "Features", name: "ammenities", type: "array", description: "Featured ammenities at this property.", of: [
            { type: "object", fields: [
                {title: "English", name: "en", type: "string"},
                {title: "Spanish", name: "es", type: "string"},
            ]},
        ]},
        {title: "Views", name: "view", type: "array", description: "The view(s) from this property.", of: [
            { type: "object", fields: [
                {title: "English", name: "en", type: "string"},
                {title: "Spanish", name: "es", type: "string"},
            ]},
        ]},
        {title: "Images", name: "images", type: "array", of: [{type: "image", fields: [{ title: 'Alt Text', name: 'alt', type: 'string'}]}]}
    ]
}

export const featured = {
    title: "Featured",
    name: "featured",
    type: "object",
    description: "Manage the featured listings on your site.",
    fields: [
        {
            title: "Listings", 
            name: "listings", 
            type: "array", 
            description: "Choose from your off-market listings / MLS properties.", 
            of: [{type: "reference", to: [{type: "mlsProperty"},{type:"offMarket"}]}],
        }
    ],
}

export const regions = {
    title: "Regions",
    name: "region",
    type: "document",
    fields: [
        {title: "Title", name: "title", type: "string"},
        {title: "MLS Region ID", name: "id", type: "number"},
        {title: "Description", name: "description", type: "text"},
        {title: "Image", name: "image", type: "image"},
        {title: "Zones", name: "zones", type: "array", of: [{type: "reference", to: [{type:"zone"}]}]}
    ]
}

export const zones = {
    title: "Zones",
    name: "zone",
    type: "document",
    fields: [
        {title: "Title", name: "title", type: "string"},
        {title: "MLS Zone ID", name: "id", type: "number"},
        {title: "Region", name: "region", type: "string" },
        {title: "Featured", name: "featured", type: "boolean"},
        {title: "Description", name: "description", type: "text"},
        {title: "Image", name: "image", type: "image"},
    ],
    initialValue: {
        featured: false
    }
}