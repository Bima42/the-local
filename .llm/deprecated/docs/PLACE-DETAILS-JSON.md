❯ python analysis.py
✓ JSON loaded: place-details-google.json

==========================================================================================
JSON STRUCTURE ANALYSIS
==========================================================================================

Total tokens: 12,981

==========================================================================================
SCHEMA STRUCTURE
==========================================================================================

root: {
  name: string
  id: string
  types: [ // 3 items
    string
  ]
  nationalPhoneNumber: string
  internationalPhoneNumber: string
  formattedAddress: string
  addressComponents: [ // 8 items
    item: {
      longText: string
      shortText: string
      types: [ // 1 items
        string
      ]
      languageCode: string
    }
  ]
  plusCode: {
    globalCode: string
    compoundCode: string
  }
  location: {
    latitude: number
    longitude: number
  }
  viewport: {
    low: {
      latitude: number
      longitude: number
    }
    high: {
      latitude: number
      longitude: number
    }
  }
  rating: number
  googleMapsUri: string
  websiteUri: string
  regularOpeningHours: {
    openNow: boolean
    periods: [ // 5 items
      item: {
        open: {
          day: integer
          hour: integer
          minute: integer
        }
        close: {
          day: integer
          hour: integer
          minute: integer
        }
      }
    ]
    weekdayDescriptions: [ // 7 items
      string
    ]
    nextOpenTime: string
  }
  utcOffsetMinutes: integer
  adrFormatAddress: string
  businessStatus: string
  userRatingCount: integer
  iconMaskBaseUri: string
  iconBackgroundColor: string
  displayName: {
    text: string
    languageCode: string
  }
  primaryTypeDisplayName: {
    text: string
    languageCode: string
  }
  currentOpeningHours: {
    openNow: boolean
    periods: [ // 5 items
      item: {
        open: {
          day: integer
          hour: integer
          minute: integer
          date: {
            year: integer
            month: integer
            day: integer
          }
        }
        close: {
          day: integer
          hour: integer
          minute: integer
          date: {
            year: integer
            month: integer
            day: integer
          }
        }
      }
    ]
    weekdayDescriptions: [ // 7 items
      string
    ]
    nextOpenTime: string
  }
  primaryType: string
  shortFormattedAddress: string
  editorialSummary: {
    text: string
    languageCode: string
  }
  reviews: [ // 5 items
    item: {
      name: string
      relativePublishTimeDescription: string
      rating: integer
      text: {
        text: string
        languageCode: string
      }
      originalText: {
        text: string
        languageCode: string
      }
      authorAttribution: {
        displayName: string
        uri: string
        photoUri: string
      }
      publishTime: string
      flagContentUri: string
      googleMapsUri: string
    }
  ]
  photos: [ // 10 items
    item: {
      name: string
      widthPx: integer
      heightPx: integer
      authorAttributions: [ // 1 items
        item: {
          displayName: string
          uri: string
          photoUri: string
        }
      ]
      flagContentUri: string
      googleMapsUri: string
    }
  ]
  accessibilityOptions: {
    wheelchairAccessibleParking: boolean
    wheelchairAccessibleEntrance: boolean
  }
  pureServiceAreaBusiness: boolean
  addressDescriptor: {
    landmarks: [ // 5 items
      item: {
        name: string
        placeId: string
        displayName: {
          text: string
          languageCode: string
        }
        types: [ // 2 items
          string
        ]
        straightLineDistanceMeters: number
        travelDistanceMeters: number
      }
    ]
    areas: [ // 1 items
      item: {
        name: string
        placeId: string
        displayName: {
          text: string
          languageCode: string
        }
        containment: string
      }
    ]
  }
  googleMapsLinks: {
    directionsUri: string
    placeUri: string
    writeAReviewUri: string
    reviewsUri: string
    photosUri: string
  }
  timeZone: {
    id: string
  }
  postalAddress: {
    regionCode: string
    languageCode: string
    postalCode: string
    administrativeArea: string
    locality: string
    addressLines: [ // 1 items
      string
    ]
  }
}

==========================================================================================
ROOT LEVEL STRUCTURE BREAKDOWN
==========================================================================================

Field                          Type                 Tokens          Percentage
------------------------------------------------------------------------------------------
photos                         array[10] (10 items)         5,913    45.6%
reviews                        array[5] (5 items)           3,981    30.7%
addressDescriptor              object                         651     5.0%
currentOpeningHours            object                         614     4.7%
googleMapsLinks                object                         469     3.6%
regularOpeningHours            object                         390     3.0%
addressComponents              array[8] (8 items)             274     2.1%
adrFormatAddress               string                          66     0.5%
googleMapsUri                  string                          59     0.5%
postalAddress                  object                          57     0.4%
viewport                       object                          54     0.4%
plusCode                       object                          29     0.2%
editorialSummary               object                          28     0.2%
name                           string                          24     0.2%
id                             string                          22     0.2%
location                       object                          22     0.2%
formattedAddress               string                          20     0.2%
iconMaskBaseUri                string                          17     0.1%
accessibilityOptions           object                          17     0.1%
primaryTypeDisplayName         object                          16     0.1%
types                          array[3] (3 items)              14     0.1%
websiteUri                     string                          14     0.1%
displayName                    object                          14     0.1%
shortFormattedAddress          string                          13     0.1%
timeZone                       object                          11     0.1%
internationalPhoneNumber       string                          10     0.1%
nationalPhoneNumber            string                           9     0.1%
iconBackgroundColor            string                           7     0.1%
primaryType                    string                           5     0.0%
businessStatus                 string                           4     0.0%
rating                         number                           3     0.0%
utcOffsetMinutes               integer                          2     0.0%
userRatingCount                integer                          2     0.0%
pureServiceAreaBusiness        boolean                          1     0.0%

==========================================================================================
ADDRESSCOMPONENTS FIELDS ANALYSIS
==========================================================================================

Total items: 8
Unique fields: 4

------------------------------------------------------------------------------------------
Field                               Type            Present      Avg Tokens   Total Tokens
------------------------------------------------------------------------------------------
types                               mixed           8/8 (100%)          6.4             51
shortText                           string          8/8 (100%)          4.5             36
longText                            string          8/8 (100%)          4.4             35
languageCode                        string          8/8 (100%)          3.8             30

==========================================================================================
TOKEN OPTIMIZATION - ADDRESSCOMPONENTS
==========================================================================================

✅ ALWAYS PRESENT FIELDS (100%):
------------------------------------------------------------------------------------------
  • types                                    6.4 tok/item          51 (33.6%)  [cum:  33.6%]
  • shortText                                4.5 tok/item          36 (23.7%)  [cum:  57.2%]
  • longText                                 4.4 tok/item          35 (23.0%)  [cum:  80.3%]
  • languageCode                             3.8 tok/item          30 (19.7%)  [cum: 100.0%]

📊 Total tokens in addressComponents: 152
📊 Average tokens per item: 19.0

==========================================================================================
REVIEWS FIELDS ANALYSIS
==========================================================================================

Total items: 5
Unique fields: 9

------------------------------------------------------------------------------------------
Field                               Type            Present      Avg Tokens   Total Tokens
------------------------------------------------------------------------------------------
text                                object          5/5 (100%)        186.4            932
originalText                        object          5/5 (100%)        186.4            932
googleMapsUri                       string          5/5 (100%)        106.0            530
authorAttribution                   object          5/5 (100%)        104.0            520
name                                string          5/5 (100%)         75.0            375
flagContentUri                      string          5/5 (100%)         71.0            355
publishTime                         string          5/5 (100%)         19.0             95
relativePublishTimeDescription      string          5/5 (100%)          4.6             23
rating                              integer         5/5 (100%)          1.0              5

==========================================================================================
TOKEN OPTIMIZATION - REVIEWS
==========================================================================================

✅ ALWAYS PRESENT FIELDS (100%):
------------------------------------------------------------------------------------------
  • text                                   186.4 tok/item         932 (24.7%)  [cum:  24.7%]
  • originalText                           186.4 tok/item         932 (24.7%)  [cum:  49.5%]
  • googleMapsUri                          106.0 tok/item         530 (14.1%)  [cum:  63.6%]
  • authorAttribution                      104.0 tok/item         520 (13.8%)  [cum:  77.4%]
  • name                                    75.0 tok/item         375 (10.0%)  [cum:  87.3%]
  • flagContentUri                          71.0 tok/item         355 ( 9.4%)  [cum:  96.7%]
  • publishTime                             19.0 tok/item          95 ( 2.5%)  [cum:  99.3%]
  • relativePublishTimeDescription           4.6 tok/item          23 ( 0.6%)  [cum:  99.9%]
  • rating                                   1.0 tok/item           5 ( 0.1%)  [cum: 100.0%]

📊 Total tokens in reviews: 3,767
📊 Average tokens per item: 753.4

==========================================================================================
PHOTOS FIELDS ANALYSIS
==========================================================================================

Total items: 10
Unique fields: 6

------------------------------------------------------------------------------------------
Field                               Type            Present      Avg Tokens   Total Tokens
------------------------------------------------------------------------------------------
name                                string          10/10 (100%)      335.6          3,356
authorAttributions                  array[1]        10/10 (100%)       96.9            969
googleMapsUri                       string          10/10 (100%)       75.4            754
flagContentUri                      string          10/10 (100%)       48.4            484
widthPx                             integer         10/10 (100%)        1.9             19
heightPx                            integer         10/10 (100%)        1.9             19

==========================================================================================
TOKEN OPTIMIZATION - PHOTOS
==========================================================================================

✅ ALWAYS PRESENT FIELDS (100%):
------------------------------------------------------------------------------------------
  • name                                   335.6 tok/item       3,356 (59.9%)  [cum:  59.9%]
  • authorAttributions                      96.9 tok/item         969 (17.3%)  [cum:  77.2%]
  • googleMapsUri                           75.4 tok/item         754 (13.5%)  [cum:  90.7%]
  • flagContentUri                          48.4 tok/item         484 ( 8.6%)  [cum:  99.3%]
  • widthPx                                  1.9 tok/item          19 ( 0.3%)  [cum:  99.7%]
  • heightPx                                 1.9 tok/item          19 ( 0.3%)  [cum: 100.0%]

📊 Total tokens in photos: 5,601
📊 Average tokens per item: 560.1

==========================================================================================
END OF ANALYSIS
==========================================================================================
