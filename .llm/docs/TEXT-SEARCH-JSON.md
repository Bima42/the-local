❯ python analysis.py
✓ JSON loaded: text-search-hamburgers.json

==========================================================================================
JSON STRUCTURE ANALYSIS
==========================================================================================

Total tokens: 334,764

==========================================================================================
SCHEMA STRUCTURE
==========================================================================================

root: {
  places: [ // 20 items
    item: {
      name: string
      id: string
      types: [ // 7 items
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
        periods: [ // 7 items
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
      priceLevel: string
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
      takeout: boolean
      delivery: boolean
      dineIn: boolean
      reservable: boolean
      servesBreakfast: boolean
      servesLunch: boolean
      servesDinner: boolean
      servesBeer: boolean
      servesWine: boolean
      servesBrunch: boolean
      servesVegetarianFood: boolean
      currentOpeningHours: {
        openNow: boolean
        periods: [ // 7 items
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
      outdoorSeating: boolean
      liveMusic: boolean
      menuForChildren: boolean
      servesCocktails: boolean
      servesDessert: boolean
      servesCoffee: boolean
      goodForChildren: boolean
      restroom: boolean
      goodForGroups: boolean
      goodForWatchingSports: boolean
      paymentOptions: {
        acceptsCreditCards: boolean
        acceptsDebitCards: boolean
        acceptsCashOnly: boolean
        acceptsNfc: boolean
      }
      parkingOptions: {
        paidParkingLot: boolean
        paidStreetParking: boolean
      }
      accessibilityOptions: {
        wheelchairAccessibleEntrance: boolean
        wheelchairAccessibleRestroom: boolean
        wheelchairAccessibleSeating: boolean
      }
      addressDescriptor: {
        landmarks: [ // 5 items
          item: {
            name: string
            placeId: string
            displayName: {
              text: string
              languageCode: string
            }
            types: [ // 3 items
              string
            ]
            straightLineDistanceMeters: number
            travelDistanceMeters: number
          }
          // Note: Some items also have: spatialRelationship
        ]
        areas: [ // 3 items
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
      priceRange: {
        startPrice: {
          currencyCode: string
          units: string
        }
        endPrice: {
          currencyCode: string
          units: string
        }
      }
      timeZone: {
        id: string
      }
      postalAddress: {
        regionCode: string
        languageCode: string
        postalCode: string
        locality: string
        addressLines: [ // 1 items
          string
        ]
      }
    }
    // Note: Some items also have: allowsDogs, containingPlaces, curbsidePickup, currentSecondaryOpeningHours, editorialSummary, regularSecondaryOpeningHours
  ]
  contextualContents: [ // 20 items
    item: {
      photos: [ // 5 items
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
      justifications: [ // 2 items
        item: {
          reviewJustification: {
            highlightedText: {
              text: string
              highlightedTextRanges: [ // 1 items
                item: {
                  startIndex: integer
                  endIndex: integer
                }
              ]
            }
            review: {
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
          }
        }
        // Note: Some items also have: businessAvailabilityAttributesJustification
      ]
    }
  ]
  nextPageToken: string
  searchUri: string
}

==========================================================================================
ROOT LEVEL STRUCTURE BREAKDOWN
==========================================================================================

Field                          Type                 Tokens          Percentage
------------------------------------------------------------------------------------------
places                         array[20] (20 items)       267,095    79.8%
contextualContents             array[20] (20 items)        67,035    20.0%
nextPageToken                  string                         600     0.2%
searchUri                      string                          18     0.0%

==========================================================================================
PLACES FIELDS ANALYSIS
==========================================================================================

Total items: 20
Unique fields: 63

------------------------------------------------------------------------------------------
Field                               Type            Present      Avg Tokens   Total Tokens
------------------------------------------------------------------------------------------
photos                              array[10]       20/20 (100%)     5882.0        117,640
reviews                             array[5]        20/20 (100%)     2898.6         57,971
addressDescriptor                   object          20/20 (100%)      856.6         17,132
currentOpeningHours                 object          20/20 (100%)      855.0         17,101
regularOpeningHours                 object          20/20 (100%)      513.9         10,278
googleMapsLinks                     object          20/20 (100%)      487.3          9,746
currentSecondaryOpeningHours        array[5]        2/20 (10%)       4069.0          8,138
addressComponents                   mixed           20/20 (100%)      286.5          5,730
regularSecondaryOpeningHours        array[5]        2/20 (10%)       2499.0          4,998
googleMapsUri                       string          20/20 (100%)       61.9          1,238
adrFormatAddress                    string          20/20 (100%)       54.0          1,081
viewport                            object          20/20 (100%)       54.0          1,080
postalAddress                       object          20/20 (100%)       47.1            942
priceRange                          object          20/20 (100%)       34.0            680
paymentOptions                      object          20/20 (100%)       32.2            644
types                               mixed           20/20 (100%)       32.1            643
accessibilityOptions                object          20/20 (100%)       27.1            543
name                                string          20/20 (100%)       23.2            464
id                                  string          20/20 (100%)       21.2            424
location                            object          20/20 (100%)       20.9            418
formattedAddress                    string          20/20 (100%)       17.6            353
displayName                         object          20/20 (100%)       17.6            352
iconMaskBaseUri                     string          20/20 (100%)       17.0            340
primaryTypeDisplayName              object          20/20 (100%)       16.7            334
parkingOptions                      object          19/20 (95%)        16.2            307
plusCode                            object          20/20 (100%)       14.7            294
shortFormattedAddress               string          20/20 (100%)       13.3            266
containingPlaces                    array[1]        5/20 (25%)         52.4            262
websiteUri                          string          20/20 (100%)       10.3            206
timeZone                            object          20/20 (100%)        9.0            180
internationalPhoneNumber            string          19/20 (95%)         9.0            171
editorialSummary                    object          5/20 (25%)         31.4            157
nationalPhoneNumber                 string          19/20 (95%)         7.1            134
priceLevel                          string          17/20 (85%)         7.1            121
iconBackgroundColor                 string          20/20 (100%)        6.0            120
primaryType                         string          20/20 (100%)        4.7             94
businessStatus                      string          20/20 (100%)        4.0             80
rating                              number          20/20 (100%)        3.0             60
userRatingCount                     integer         20/20 (100%)        1.9             37
restroom                            boolean         20/20 (100%)        1.0             20
dineIn                              boolean         20/20 (100%)        1.0             20
servesLunch                         boolean         20/20 (100%)        1.0             20
utcOffsetMinutes                    integer         20/20 (100%)        1.0             20
takeout                             boolean         20/20 (100%)        1.0             20
servesDinner                        boolean         20/20 (100%)        1.0             20
liveMusic                           boolean         20/20 (100%)        1.0             20
goodForWatchingSports               boolean         20/20 (100%)        1.0             20
servesVegetarianFood                boolean         20/20 (100%)        1.0             20
servesWine                          boolean         19/20 (95%)         1.0             19
servesDessert                       boolean         19/20 (95%)         1.0             19
outdoorSeating                      boolean         19/20 (95%)         1.0             19
servesBrunch                        boolean         19/20 (95%)         1.0             19
goodForGroups                       boolean         19/20 (95%)         1.0             19
servesBeer                          boolean         19/20 (95%)         1.0             19
servesCoffee                        boolean         19/20 (95%)         1.0             19
servesCocktails                     boolean         18/20 (90%)         1.0             18
reservable                          boolean         18/20 (90%)         1.0             18
delivery                            boolean         18/20 (90%)         1.0             18
menuForChildren                     boolean         18/20 (90%)         1.0             18
goodForChildren                     boolean         16/20 (80%)         1.0             16
servesBreakfast                     boolean         16/20 (80%)         1.0             16
curbsidePickup                      boolean         12/20 (60%)         1.0             12
allowsDogs                          boolean         9/20 (45%)          1.0              9

==========================================================================================
TOKEN OPTIMIZATION - PLACES
==========================================================================================

✅ ALWAYS PRESENT FIELDS (100%):
------------------------------------------------------------------------------------------
  • photos                                5882.0 tok/item     117,640 (45.0%)  [cum:  45.0%]
  • reviews                               2898.6 tok/item      57,971 (22.2%)  [cum:  67.2%]
  • addressDescriptor                      856.6 tok/item      17,132 ( 6.6%)  [cum:  73.8%]
  • currentOpeningHours                    855.0 tok/item      17,101 ( 6.5%)  [cum:  80.3%]
  • regularOpeningHours                    513.9 tok/item      10,278 ( 3.9%)  [cum:  84.3%]
  • googleMapsLinks                        487.3 tok/item       9,746 ( 3.7%)  [cum:  88.0%]
  • addressComponents                      286.5 tok/item       5,730 ( 2.2%)  [cum:  90.2%]
  • googleMapsUri                           61.9 tok/item       1,238 ( 0.5%)  [cum:  90.7%]
  • adrFormatAddress                        54.0 tok/item       1,081 ( 0.4%)  [cum:  91.1%]
  • viewport                                54.0 tok/item       1,080 ( 0.4%)  [cum:  91.5%]
  • postalAddress                           47.1 tok/item         942 ( 0.4%)  [cum:  91.9%]
  • priceRange                              34.0 tok/item         680 ( 0.3%)  [cum:  92.1%]
  • paymentOptions                          32.2 tok/item         644 ( 0.2%)  [cum:  92.4%]
  • types                                   32.1 tok/item         643 ( 0.2%)  [cum:  92.6%]
  • accessibilityOptions                    27.1 tok/item         543 ( 0.2%)  [cum:  92.8%]
  • name                                    23.2 tok/item         464 ( 0.2%)  [cum:  93.0%]
  • id                                      21.2 tok/item         424 ( 0.2%)  [cum:  93.2%]
  • location                                20.9 tok/item         418 ( 0.2%)  [cum:  93.3%]
  • formattedAddress                        17.6 tok/item         353 ( 0.1%)  [cum:  93.5%]
  • displayName                             17.6 tok/item         352 ( 0.1%)  [cum:  93.6%]
  • iconMaskBaseUri                         17.0 tok/item         340 ( 0.1%)  [cum:  93.7%]
  • primaryTypeDisplayName                  16.7 tok/item         334 ( 0.1%)  [cum:  93.9%]
  • plusCode                                14.7 tok/item         294 ( 0.1%)  [cum:  94.0%]
  • shortFormattedAddress                   13.3 tok/item         266 ( 0.1%)  [cum:  94.1%]
  • websiteUri                              10.3 tok/item         206 ( 0.1%)  [cum:  94.1%]
  • timeZone                                 9.0 tok/item         180 ( 0.1%)  [cum:  94.2%]
  • iconBackgroundColor                      6.0 tok/item         120 ( 0.0%)  [cum:  94.3%]
  • primaryType                              4.7 tok/item          94 ( 0.0%)  [cum:  94.3%]
  • businessStatus                           4.0 tok/item          80 ( 0.0%)  [cum:  94.3%]
  • rating                                   3.0 tok/item          60 ( 0.0%)  [cum:  94.3%]
  • userRatingCount                          1.9 tok/item          37 ( 0.0%)  [cum:  94.4%]
  • restroom                                 1.0 tok/item          20 ( 0.0%)  [cum:  94.4%]
  • dineIn                                   1.0 tok/item          20 ( 0.0%)  [cum:  94.4%]
  • servesLunch                              1.0 tok/item          20 ( 0.0%)  [cum:  94.4%]
  • utcOffsetMinutes                         1.0 tok/item          20 ( 0.0%)  [cum:  94.4%]
  • takeout                                  1.0 tok/item          20 ( 0.0%)  [cum:  94.4%]
  • servesDinner                             1.0 tok/item          20 ( 0.0%)  [cum:  94.4%]
  • liveMusic                                1.0 tok/item          20 ( 0.0%)  [cum:  94.4%]
  • goodForWatchingSports                    1.0 tok/item          20 ( 0.0%)  [cum:  94.4%]
  • servesVegetarianFood                     1.0 tok/item          20 ( 0.0%)  [cum:  94.4%]

⚠️  OPTIONAL FIELDS:
------------------------------------------------------------------------------------------
  • currentSecondaryOpeningHours               2/20 ( 10.0%)
  • regularSecondaryOpeningHours               2/20 ( 10.0%)
  • editorialSummary                           5/20 ( 25.0%)
  • containingPlaces                           5/20 ( 25.0%)
  • allowsDogs                                 9/20 ( 45.0%)
  • curbsidePickup                            12/20 ( 60.0%)
  • goodForChildren                           16/20 ( 80.0%)
  • servesBreakfast                           16/20 ( 80.0%)
  • priceLevel                                17/20 ( 85.0%)
  • servesCocktails                           18/20 ( 90.0%)
  • reservable                                18/20 ( 90.0%)
  • delivery                                  18/20 ( 90.0%)
  • menuForChildren                           18/20 ( 90.0%)
  • parkingOptions                            19/20 ( 95.0%)
  • servesWine                                19/20 ( 95.0%)
  • servesDessert                             19/20 ( 95.0%)
  • outdoorSeating                            19/20 ( 95.0%)
  • servesBrunch                              19/20 ( 95.0%)
  • internationalPhoneNumber                  19/20 ( 95.0%)
  • nationalPhoneNumber                       19/20 ( 95.0%)
  • goodForGroups                             19/20 ( 95.0%)
  • servesBeer                                19/20 ( 95.0%)
  • servesCoffee                              19/20 ( 95.0%)

🔴 HIGH TOKEN FIELDS (>500 tokens/item):
------------------------------------------------------------------------------------------
  • photos                                   5882.0 tok/item     117,640 (45.0%)
  • reviews                                  2898.6 tok/item      57,971 (22.2%)
  • addressDescriptor                         856.6 tok/item      17,132 ( 6.6%)
  • currentOpeningHours                       855.0 tok/item      17,101 ( 6.5%)
  • regularOpeningHours                       513.9 tok/item      10,278 ( 3.9%)
  • currentSecondaryOpeningHours             4069.0 tok/item       8,138 ( 3.1%)
  • regularSecondaryOpeningHours             2499.0 tok/item       4,998 ( 1.9%)

📊 Total tokens in places: 261,197
📊 Average tokens per item: 13,059.9

==========================================================================================
CONTEXTUALCONTENTS FIELDS ANALYSIS
==========================================================================================

Total items: 20
Unique fields: 2

------------------------------------------------------------------------------------------
Field                               Type            Present      Avg Tokens   Total Tokens
------------------------------------------------------------------------------------------
photos                              array[5]        20/20 (100%)     2787.9         55,759
justifications                      array[2]        20/20 (100%)      558.7         11,174

==========================================================================================
TOKEN OPTIMIZATION - CONTEXTUALCONTENTS
==========================================================================================

✅ ALWAYS PRESENT FIELDS (100%):
------------------------------------------------------------------------------------------
  • photos                                2787.9 tok/item      55,759 (83.3%)  [cum:  83.3%]
  • justifications                         558.7 tok/item      11,174 (16.7%)  [cum: 100.0%]

🔴 HIGH TOKEN FIELDS (>500 tokens/item):
------------------------------------------------------------------------------------------
  • photos                                   2787.9 tok/item      55,759 (83.3%)
  • justifications                            558.7 tok/item      11,174 (16.7%)

📊 Total tokens in contextualContents: 66,933
📊 Average tokens per item: 3,346.7

==========================================================================================
END OF ANALYSIS
==========================================================================================
