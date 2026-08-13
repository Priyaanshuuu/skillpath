# Skillpath Architecture

## Component Structure

```text
Skillpath
|
+-- Hero
|
+-- CourseSection
|    |
|    +-- state/reducer
|    +-- API fetching
|    +-- CourseCard
|    +-- price formatting
|    +-- loading/error/empty/success UI
|
+-- Footer
```

## Responsibility Boundaries

### Hero

Static presentation only.

It should not know anything about the APIs or course state.

### Footer

Static presentation only.

It should not contain business logic.

### CourseSection

Container component responsible for:

- Fetching course data
- Fetching country data
- Dispatching reducer actions
- Retry behavior
- Selecting the UI state
- Passing data to course cards
- Connecting Framer Property Controls

### CourseCard

Presentational component responsible only for displaying a course.

It receives:

- course
- country/final price representation
- configurable visual props when needed

It should not perform API requests.

### Utilities

Price formatting and other pure transformations belong in small reusable functions.

## Suggested Files

```text
components/
  Hero.tsx
  Footer.tsx
  CourseSection/
    CourseSection.tsx
    CourseCard.tsx
    reducer.ts
    types.ts
    utils.ts
    styles.css
```

For the first version, these files can be combined if Framer's environment makes a smaller setup easier. The important part is separation of responsibilities, not the number of files.

## State Shape

```ts
type Status = "idle" | "loading" | "success" | "error"

type State = {
  status: Status
  courses: Course[]
  country: "IN" | "US" | null
  error: string | null
}
```

### Why status instead of several booleans?

Avoid:

```ts
loading
hasError
isSuccess
```

because multiple flags can represent contradictory states.

A single status makes the main rendering states mutually exclusive.

## Reducer Philosophy

The reducer should be pure.

It should:

- receive current state
- receive an action
- return the next state

It should not:

- call `fetch`
- format network responses
- access browser APIs
- perform side effects

Network work stays in the component/effect layer.

## Example Action Model

```text
FETCH_START

COURSES_SUCCESS

COUNTRY_SUCCESS

FETCH_ERROR

RETRY
```

The exact action set can be simplified further if the implementation does not need all of them. Avoid adding actions that do not represent a real state transition.
