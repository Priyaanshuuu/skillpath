# Minimal Implementation Notes

## API

Base URL:

```text
https://syncsphere-hiv6.onrender.com
```

Endpoints:

```text
GET /assignment/course-data
GET /assignment/country-code
```

Only GET should be used.

## Minimum Course Model

```ts
type Course = {
  courseName: string
  courseCode: string
  description: string
  mainCategory: string
  shortCourse: string
  courseType: string
  pricePaise: number
  priceUsdCents: number
  mangoId: string
  refundable: boolean
}
```

## Minimal Reducer Flow

```text
dispatch(FETCH_START)

await Promise.allSettled(...)

if courses fulfilled:
    dispatch(COURSES_SUCCESS)

if country fulfilled:
    dispatch(COUNTRY_SUCCESS)

if courses rejected:
    dispatch(FETCH_ERROR)
```

## UI Minimum

### Hero

- heading
- one line
- one CTA

### Courses

- section heading
- responsive grid
- course name
- two-line description
- price
- one additional useful field

### Footer

- three links
- copyright

## First Working Version Checklist

- [ ] API requests are GET only
- [ ] No hardcoded course data
- [ ] Course count can vary
- [ ] INR conversion is correct
- [ ] USD conversion is correct
- [ ] Loading state exists
- [ ] Error state exists
- [ ] Empty state exists
- [ ] Country failure does not hide successful courses
- [ ] Retry works
- [ ] 3/2/1 column layout works
- [ ] Two Framer Property Controls work

Once this is working, visual enhancement can be done without changing the core state architecture.
