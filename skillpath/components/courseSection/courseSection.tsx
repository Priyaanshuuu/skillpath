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
            <div className="course-header">
                <span className="eyebrow" style={{ color: accentColor }}>
                    Courses
                </span>
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
                            style={{ background: accentColor }}
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
                        {visibleCourses.map((course) => (
                            <CourseCard
                                key={course.mangoId}
                                course={course}
                                country={state.country}
                                accentColor={accentColor}
                            />
                        ))}
                    </div>
                )}
            </div>

            <style>{styles}</style>
        </section>
    )
}

const styles = `
.course-section {
    max-width: 1180px;
    margin: 0 auto;
    padding: 96px 24px;
}

.course-header {
    max-width: 620px;
    margin-bottom: 48px;
}

.eyebrow {
    display: block;
    font-size: 13px;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    margin-bottom: 12px;
}

.course-header h2 {
    margin: 0;
    font-size: clamp(30px, 4vw, 42px);
    letter-spacing: -0.02em;
    line-height: 1.1;
}

.course-header p {
    margin: 16px 0 0;
    color: #666;
    font-size: 17px;
    line-height: 1.6;
}

.course-controls {
    display: flex;
    gap: 12px;
    margin-bottom: 32px;
    flex-wrap: wrap;
}

.course-controls input,
.course-controls select {
    padding: 10px 14px;
    border: 1px solid #e2e2e2;
    border-radius: 10px;
    font-size: 14px;
    background: white;
}

.course-controls input {
    flex: 1;
    min-width: 200px;
}

.course-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 24px;
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
        padding: 64px 20px;
    }
}

.skeleton-card {
    min-height: 260px;
    padding: 24px;
    border: 1px solid #eee;
    border-radius: 18px;
    background: #fff;
}

.skeleton-line {
    height: 14px;
    border-radius: 6px;
    background: linear-gradient(90deg, #eee 25%, #f5f5f5 37%, #eee 63%);
    background-size: 400% 100%;
    animation: shimmer 1.4s ease infinite;
    margin-top: 14px;
}

.skeleton-line.short {
    width: 40%;
    margin-top: 0;
}

.skeleton-line.title {
    width: 80%;
    height: 20px;
    margin-top: 24px;
}

@keyframes shimmer {
    0% { background-position: 100% 0; }
    100% { background-position: 0 0; }
}

.state-panel {
    padding: 64px 24px;
    text-align: center;
    border: 1px dashed #e2e2e2;
    border-radius: 18px;
}

.state-title {
    margin: 0;
    font-size: 18px;
    font-weight: 600;
}

.state-text {
    margin: 8px 0 20px;
    color: #777;
    font-size: 15px;
}

.retry-button {
    border: 0;
    color: white;
    padding: 12px 22px;
    border-radius: 10px;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
}

.retry-button:hover {
    opacity: 0.9;
}

.retry-button:focus-visible {
    outline: 2px solid #111;
    outline-offset: 2px;
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
