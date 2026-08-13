"use client"

import { useEffect, useMemo, useReducer, useState } from "react"
import { addPropertyControls, ControlType } from "./framer-shim"
import { reducer, initialState } from "./reducer"
import { Course, CountryCode } from "./types"
import CourseCard from "./courseCard"

const COURSES_URL =
    "https://syncsphere-hiv6.onrender.com/assignment/course-data"
const COUNTRY_URL =
    "https://syncsphere-hiv6.onrender.com/assignment/country-code"

type Props = {
    heading: string
    accentColor: string
}

export default function CourseSection({
    heading = "Explore Our Courses",
    accentColor = "#4f46e5",
}: Props) {
    const [state, dispatch] = useReducer(reducer, initialState)
    const [search, setSearch] = useState("")
    const [sort, setSort] = useState<"default" | "low" | "high">("default")
    const [retryCount, setRetryCount] = useState(0)

    useEffect(() => {
        let cancelled = false

        async function load() {
            dispatch({ type: "FETCH_START" })

            const [coursesResult, countryResult] = await Promise.allSettled([
                fetch(COURSES_URL).then((res) => {
                    if (!res.ok) throw new Error("Failed to load courses")
                    return res.json() as Promise<Course[]>
                }),
                fetch(COUNTRY_URL).then((res) => {
                    if (!res.ok) throw new Error("Failed to load country")
                    return res.json() as Promise<{
                        country_code: CountryCode
                    }>
                }),
            ])

            if (cancelled) return

            if (coursesResult.status === "fulfilled") {
                dispatch({
                    type: "COURSES_SUCCESS",
                    payload: coursesResult.value,
                })
            } else {
                dispatch({
                    type: "FETCH_ERROR",
                    payload: "We couldn't load the courses. Please try again.",
                })
            }

            if (countryResult.status === "fulfilled") {
                dispatch({
                    type: "COUNTRY_SUCCESS",
                    payload: countryResult.value.country_code,
                })
            }
        }

        load()

        return () => {
            cancelled = true
        }
    }, [retryCount])

    const visibleCourses = useMemo(() => {
        let list = state.courses

        if (search.trim()) {
            const q = search.trim().toLowerCase()
            list = list.filter(
                (c) =>
                    c.courseName.toLowerCase().includes(q) ||
                    c.mainCategory.toLowerCase().includes(q)
            )
        }

        if (sort !== "default") {
            list = [...list].sort((a, b) =>
                sort === "low"
                    ? a.pricePaise - b.pricePaise
                    : b.pricePaise - a.pricePaise
            )
        }

        return list
    }, [state.courses, search, sort])

    function retry() {
        setSearch("")
        setRetryCount((n) => n + 1)
    }

    return (
        <section id="courses" className="course-section" aria-labelledby="course-heading">
            <div className="course-section-inner">
                <div className="course-header">
                    <span className="cs-eyebrow">Courses</span>
                    <h2 id="course-heading">{heading}</h2>
                    <p>
                        Hands-on, practical courses picked to help you build
                        real skills, fast.
                    </p>
                </div>

                {state.status === "success" && state.courses.length > 0 && (
                    <div className="course-controls">
                        <input
                            type="search"
                            aria-label="Search courses"
                            placeholder="Search courses..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                        <select
                            aria-label="Sort by price"
                            value={sort}
                            onChange={(e) =>
                                setSort(e.target.value as typeof sort)
                            }
                        >
                            <option value="default">Sort: Featured</option>
                            <option value="low">Price: Low to High</option>
                            <option value="high">Price: High to Low</option>
                        </select>
                    </div>
                )}

                <div role="status" aria-live="polite">
                    {state.status === "loading" && (
                        <div className="course-grid" aria-label="Loading courses">
                            {Array.from({ length: 6 }).map((_, i) => (
                                <div className="skeleton-card" key={i}>
                                    <div className="skeleton-line short" />
                                    <div className="skeleton-line title" />
                                    <div className="skeleton-line" />
                                    <div className="skeleton-line" />
                                </div>
                            ))}
                        </div>
                    )}

                    {state.status === "error" && (
                        <div className="state-panel">
                            <p className="state-title">Something went wrong</p>
                            <p className="state-text">{state.error}</p>
                            <button
                                className="retry-button"
                                onClick={retry}
                            >
                                Try again
                            </button>
                        </div>
                    )}

                    {state.status === "success" && state.courses.length === 0 && (
                        <div className="state-panel">
                            <p className="state-title">No courses available</p>
                            <p className="state-text">
                                Check back soon — new courses are on the way.
                            </p>
                        </div>
                    )}

                    {state.status === "success" && visibleCourses.length === 0 && state.courses.length > 0 && (
                        <div className="state-panel">
                            <p className="state-title">No matches found</p>
                            <p className="state-text">
                                Try a different search term.
                            </p>
                        </div>
                    )}

                    {state.status === "success" && visibleCourses.length > 0 && (
                        <div className="course-grid">
                            {visibleCourses.map((course, i) => (
                                <CourseCard
                                    key={course.mangoId}
                                    course={course}
                                    country={state.country}
                                    accentColor={accentColor}
                                    index={i}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </div>

            <style>{styles}</style>
        </section>
    )
}

const styles = `
.course-section {
    background: #0a0a0a;
    padding: 96px 0;
    border-bottom: 1px solid #1e1e1e;
}

.course-section-inner {
    max-width: 1180px;
    margin: 0 auto;
    padding: 0 32px;
}

.course-header {
    max-width: 640px;
    margin-bottom: 56px;
    animation: fadeUp 0.7s ease both;
}

.cs-eyebrow {
    display: block;
    font-family: var(--font-fjalla), sans-serif;
    font-size: 11px;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: #555;
    margin-bottom: 16px;
}

.course-header h2 {
    font-family: var(--font-fjalla), sans-serif;
    margin: 0;
    font-size: clamp(32px, 4.5vw, 52px);
    letter-spacing: 0.01em;
    line-height: 1.1;
    font-weight: 400;
    color: #f2f2f2;
}

.course-header p {
    margin: 16px 0 0;
    font-family: Georgia, serif;
    color: #555;
    font-size: 17px;
    line-height: 1.7;
}

.course-controls {
    display: flex;
    gap: 12px;
    margin-bottom: 40px;
    flex-wrap: wrap;
    animation: fadeIn 0.5s 0.2s ease both;
}

.course-controls input,
.course-controls select {
    padding: 11px 16px;
    border: 1px solid #242424;
    border-radius: 4px;
    font-size: 14px;
    font-family: var(--font-fjalla), sans-serif;
    letter-spacing: 0.04em;
    background: #111;
    color: #f2f2f2;
    outline: none;
    transition: border-color 0.2s ease;
}

.course-controls input::placeholder {
    color: #444;
}

.course-controls input:focus,
.course-controls select:focus {
    border-color: #444;
}

.course-controls select option {
    background: #111;
}

.course-controls input {
    flex: 1;
    min-width: 200px;
}

.course-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 2px;
    border: 1px solid #1e1e1e;
}

.course-grid > * {
    border-radius: 0;
    border: none;
    border-right: 1px solid #1e1e1e;
    border-bottom: 1px solid #1e1e1e;
}

@media (max-width: 960px) {
    .course-grid {
        grid-template-columns: repeat(2, 1fr);
    }
}

@media (max-width: 640px) {
    .course-grid {
        grid-template-columns: 1fr;
    }
    .course-section {
        padding: 64px 0;
    }
    .course-section-inner {
        padding: 0 20px;
    }
}

.skeleton-card {
    min-height: 280px;
    padding: 28px;
    background: #111;
}

.skeleton-line {
    height: 13px;
    border-radius: 2px;
    background: linear-gradient(90deg, #1a1a1a 25%, #242424 50%, #1a1a1a 75%);
    background-size: 200% 100%;
    animation: shimmer 1.6s ease infinite;
    margin-top: 14px;
}

.skeleton-line.short {
    width: 35%;
    margin-top: 0;
}

.skeleton-line.title {
    width: 75%;
    height: 22px;
    margin-top: 22px;
}

.state-panel {
    padding: 80px 24px;
    text-align: center;
    border: 1px solid #1e1e1e;
}

.state-title {
    font-family: var(--font-fjalla), sans-serif;
    margin: 0;
    font-size: 22px;
    font-weight: 400;
    letter-spacing: 0.02em;
    color: #f2f2f2;
}

.state-text {
    margin: 10px 0 28px;
    font-family: Georgia, serif;
    color: #555;
    font-size: 15px;
}

.retry-button {
    border: 1px solid #333;
    background: transparent;
    color: #f2f2f2;
    padding: 12px 28px;
    font-family: var(--font-fjalla), sans-serif;
    font-size: 13px;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    border-radius: 4px;
    cursor: pointer;
    transition: background 0.2s ease, border-color 0.2s ease;
}

.retry-button:hover {
    background: #1a1a1a;
    border-color: #444;
}

.retry-button:focus-visible {
    outline: 2px solid #f2f2f2;
    outline-offset: 3px;
}
`

addPropertyControls(CourseSection, {
    heading: {
        type: ControlType.String,
        title: "Heading",
        defaultValue: "Explore Our Courses",
    },
    accentColor: {
        type: ControlType.Color,
        title: "Accent Color",
        defaultValue: "#4f46e5",
    },
})
