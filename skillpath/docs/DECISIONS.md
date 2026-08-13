# Engineering Decisions and Tradeoffs

## 1. `useReducer` instead of multiple `useState` calls

### Decision

Use `useReducer` for the CourseSection.

### Why

The component has related state transitions:

- loading
- course success
- country success
- request failure
- retry

A reducer gives those transitions explicit names and keeps updates centralized.

### Tradeoff

`useReducer` has more setup than:

```ts
const [courses, setCourses] = useState([])
```

For a tiny component with only one or two independent values, `useState` would be simpler.

Here the assignment deliberately tests several states, so the extra structure is justified.

---

## 2. `Promise.allSettled()` instead of `Promise.all()`

### Decision

Run both GET requests in parallel with `Promise.allSettled()`.

### Why

The course endpoint and country endpoint are independent.

Possible result:

```text
Courses -> success
Country -> failure
```

`Promise.all()` rejects as soon as one promise rejects, which makes partial success handling awkward.

`Promise.allSettled()` gives the result of each request separately.

### Tradeoff

The result handling is slightly more verbose.

That is acceptable because the assignment explicitly tests partial failure.

---

## 3. No Redux/Zustand/Context

### Decision

Use local reducer state.

### Why

There is only one meaningful state owner: CourseSection.

Global state would add:

- dependency
- boilerplate
- more files
- more concepts to explain

without solving a real problem.

### Tradeoff

A larger product with shared course state across many pages could justify a global store. This assignment does not need one.

---

## 4. API data is the source of truth

### Decision

Do not hardcode courses.

The UI renders whatever array the API returns.

### Why

The count changes between calls, and hardcoding would directly violate the assignment.

### Tradeoff

The UI must be designed for arbitrary valid lengths rather than a perfect row count.

CSS Grid solves this naturally.

---

## 5. Courses are the critical dependency

### Decision

Treat course-fetch failure differently from country-fetch failure.

### Course failure

Show an error state because there are no cards to render.

### Country failure

Keep the course cards visible and use a safe pricing fallback.

For the initial implementation, the fallback should be explicit and consistent rather than silently pretending the country is known.

Possible options:

- show a neutral "Price unavailable" label
- use a documented default currency

A neutral unavailable state is more semantically correct; a default currency is more useful for UX but makes an assumption.

---

## 6. Price formatting

### Decision

Keep price conversion in a pure utility.

Rules:

```text
IN -> pricePaise / 100
US -> priceUsdCents / 100
```

Then format with `Intl.NumberFormat`.

### Why

This prevents currency logic from being duplicated inside card markup.

### Important

Never confuse paise/cents with whole currency units.

Example:

```text
199900 paise -> ₹1,999
3999 cents   -> $39.99
```

---

## 7. Responsive layout

### Decision

Use CSS Grid with responsive column counts.

```text
Desktop -> 3
Tablet  -> 2
Mobile  -> 1
```

### Why

Grid naturally handles variable card counts. It does not depend on the API returning a specific number of courses.

### Tradeoff

Exact breakpoints need to be tested in Framer because the assignment requires the layout to remain stable between device sizes.

---

## 8. Property Controls

### Decision

Expose two values that a designer can realistically change.

Recommended:

1. Section heading
2. Accent color

### Why

These demonstrate that the component is genuinely reusable in Framer, rather than only being configurable through code.

### Tradeoff

Every control adds maintenance and testing surface. Only expose useful design-level settings.

---

## 9. Error UX

### Decision

Never render a raw API error or blank section.

States:

```text
Loading
Error
Empty
Success
```

### Why

The assignment explicitly scores these states.

### Enhancement

A retry button can trigger the same fetch function without reloading the page.

---

## 10. Optional features

Search, sorting, skeleton loaders, and refundable badges are explicitly bonus items.

They should come after the required behavior is stable.

The risk of adding them too early is spending time on polish while introducing bugs in the core state machine.

## Interview Tradeoff Summary

The implementation intentionally favors:

```text
Predictability > cleverness
Local state > global state
Partial failure handling > all-or-nothing requests
Small components > over-abstraction
Correctness > optional polish
```
