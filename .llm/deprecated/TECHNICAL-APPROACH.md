# Technical Approach - The Local

## Core Objective
Build an AI-powered discovery engine that analyzes comprehensive review data to understand what truly makes a place great (or not) based on specific user needs.

## User Flow
1. **User Input**: Natural language query (e.g., "best burgers in Hamburg", "quiet cafes with terrace open late")
2. **Initial Search**: Retrieve maximum possible places matching query
3. **Smart Filtering**: Filter by categorical criteria (open now, has terrace, LGBT friendly, late hours, etc.)
4. **Deep Analysis**: For each qualifying place, analyze ALL reviews with AI
5. **Contextual Results**: Present places with AI-generated insights explaining why they match user's specific needs

---

## Technical Requirements

### 1. Maximum Place Retrieval
**Challenge**: Text Search API returns max 20 results per page, 60 total with pagination

**Solutions to explore**:
- ✅ **Pagination**: Use `nextPageToken` to get up to 60 results per query
- ✅ **Multiple Queries**: Vary search parameters to get different result sets:
  - Different `locationBias` centers (multiple points in search area)
  - Different `rankPreference` (RELEVANCE vs DISTANCE)
  - Variations in `textQuery` formulation
- ✅ **De-duplication**: Merge results using place `id` to avoid duplicates
- ⚠️ **Target**: Aim for 100-150 unique places minimum

### 2. Complete Review Collection
**Challenge**: Text Search returns only 5 reviews per place

**Solution**:
- Use **Place Details API** for each filtered place
- Request maximum reviews available (typically up to 5 most relevant, but we need to verify limits)
- **Question**: Does Place Details give us MORE reviews or just the same 5?
- **Alternative**: May need to explore Places API review limits and pagination

### 3. API Call Optimization Strategy

#### Phase 1: Initial Search (Text Search API)
```
Goal: Get maximum unique places
Method: 
- Primary query with pagination (up to 60 results)
- 2-3 additional queries with varied parameters
- De-duplicate by place.id
Target: 100-150 unique places

Fields needed (minimal for filtering):
- places.id (for deduplication)
- places.displayName
- places.location
- places.rating
- places.userRatingCount
- places.priceLevel
- places.currentOpeningHours (for "open now")
- places.types (for category filtering)
- Specific categorical fields (outdoor seating, etc.)
```

#### Phase 2: Categorical Filtering (Client-side)
```
Filter based on user criteria:
- Open now: currentOpeningHours.openNow
- Price range: priceLevel
- Categories: types
- Specific attributes: outdoorSeating, liveMusic, etc.
- Minimum rating threshold
- Location constraints

Result: Reduced set of highly relevant places (20-40?)
```

#### Phase 3: Deep Data Collection (Place Details API)
```
For each filtered place:
- Get complete place details
- Focus on reviews collection
- Get all available metadata

Fields needed:
- reviews (ALL available)
- photos (for context)
- All descriptive fields for AI context
```

#### Phase 4: AI Analysis
```
For each place with reviews:
- Analyze all reviews with AI
- Extract positive/negative patterns
- Identify specific mentions relevant to user query
- Generate contextual summary
```

---

## API Usage Pattern

### Text Search Request Structure
```javascript
{
  "textQuery": "best burgers in Hamburg",
  "pageSize": 20,  // max per page
  "locationBias": {
    "circle": {
      "center": { "latitude": 53.5511, "longitude": 9.9937 },
      "radius": 5000  // vary this for multiple queries
    }
  },
  "rankPreference": "RELEVANCE",  // try both RELEVANCE and DISTANCE
  "minRating": 3.5,  // optional filter
  "openNow": true,   // if user specified
  "priceLevels": ["PRICE_LEVEL_MODERATE"]  // if user specified
}

// Minimal FieldMask for initial search
X-Goog-FieldMask: places.id,places.displayName,places.location,places.rating,places.userRatingCount,places.priceLevel,places.currentOpeningHours,places.types,places.outdoorSeating,places.servesVegetarianFood,nextPageToken
```

### Pagination Strategy
```javascript
// First call - get initial 20 results + nextPageToken
// Second call - use pageToken to get next 20
// Third call - use pageToken to get final 20 (if available)
// Result: Up to 60 places from one query
```

### Multi-Query Strategy
```javascript
queries = [
  { locationBias: center1, radius: 3000, rankPreference: "RELEVANCE" },
  { locationBias: center2, radius: 3000, rankPreference: "RELEVANCE" },
  { locationBias: center1, radius: 5000, rankPreference: "DISTANCE" }
]

// Combine all results, deduplicate by place.id
```

---

## Key Questions to Resolve

1. **Review Limits**: 
   - How many reviews can Place Details API actually return?
   - Is there a way to get more than 5 reviews per place?
   - Do we need to implement review pagination?

2. **API Costs**:
   - Text Search: Multiple queries vs single query cost
   - Place Details: Cost for full details per place
   - Optimization: Balance between data quality and cost

3. **Rate Limits**:
   - How many concurrent requests can we make?
   - Do we need request queuing?

4. **Data Freshness**:
   - Should we cache results?
   - How to handle "open now" with cached data?