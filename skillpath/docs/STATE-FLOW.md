# CourseSection State Flow

## Main State Machine

```text
IDLE
 |
 | FETCH_START
 v
LOADING
 |
 +---------------------------+
 |                           |
 | Courses success           | Courses failure
 v                           v
COURSES AVAILABLE         ERROR
 |                           |
 | Country success           | RETRY
 |                           |
 v                           |
COUNTRY AVAILABLE            +----> LOADING
 |
 v
SUCCESS UI
```

## Partial Failure Case

This is the important edge case.

```text
LOADING
 |
 +-----------------------+
 |                       |
 v                       v
Courses: SUCCESS      Country: FAILURE
 |                       |
 +-----------+-----------+
             |
             v
       Show courses
       Use pricing fallback
```

The country failure must not blank the entire course section.

## Empty State

```text
Courses request succeeds
        |
        v
courses.length === 0
        |
        v
"No courses available"
```

An empty result is not the same as a network error.

## Retry

```text
ERROR
 |
 | Retry
 v
LOADING
 |
 v
new API requests
```

The retry action should reuse the same request path instead of duplicating fetching logic.

## Rendering Priority

Use a simple, deterministic order:

```text
1. loading
2. error
3. empty
4. success
```

That prevents ambiguous UI combinations.
