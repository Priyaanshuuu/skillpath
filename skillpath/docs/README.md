# Skillpath

## Project Goal

Build a simple learning-platform landing page in Framer with three sections:

- Hero: static content
- Courses: dynamic data fetched from the assignment APIs
- Footer: static content

The Courses section is the primary technical requirement.

## Core Approach

The Courses section will be implemented as a React/Framer Code Component using:

- TypeScript
- React hooks
- `useReducer` for state management
- `useEffect` for the initial data load
- `Promise.allSettled()` for the two independent GET requests
- CSS Grid for responsive layout
- Framer Property Controls for designer-configurable values

## Why This Approach

The assignment intentionally includes flaky APIs and a partially independent country request. The main challenge is therefore predictable state management rather than complex UI.

`useReducer` keeps related transitions explicit and avoids scattered state updates.

`Promise.allSettled()` allows the course request and country request to succeed or fail independently. This is important because the assignment explicitly tests the case where courses load but the country request fails.

## Main Data Flow

```text
Component mounts
      |
      v
FETCH_START
      |
      v
Fetch courses + country in parallel
      |
      +------------------+
      |                  |
      v                  v
Courses result       Country result
      |                  |
      v                  v
COURSES_SUCCESS       COUNTRY_SUCCESS
or                    or
FETCH_ERROR           fallback
      |
      v
Render loading / error / empty / success
```

## Product Rule

Courses are the primary data dependency.

- If courses fail: show the error state.
- If courses succeed and country succeeds: show localized pricing.
- If courses succeed but country fails: still show courses and use a clearly defined fallback pricing strategy.
- If courses succeed with an empty array: show an empty state.

## Scope

The first implementation should focus on correctness:

1. Dynamic course fetching
2. Country-based price formatting
3. Loading state
4. Error state
5. Empty state
6. Responsive grid
7. Retry
8. Two Framer Property Controls

Optional features such as search, sorting, skeleton loaders, and refundable badges should only be added after the core behavior is stable.
