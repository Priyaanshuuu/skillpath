import { Course, CountryCode } from "./types"
import { formatPrice } from "./utils"

type Props = {
    course: Course
    country: CountryCode | null
    accentColor?: string
    index?: number
}

export default function CourseCard({
    course,
    country,
    accentColor = "#f2f2f2",
    index = 0,
}: Props) {
    return (
        <article
            className="course-card"
            style={{ animationDelay: `${index * 0.06}s` }}
        >
            <div className="course-card-top">
                <span className="course-category">{course.mainCategory}</span>
                {course.refundable && (
                    <span className="refundable">Refundable</span>
                )}
            </div>

            <div className="course-content">
                <h3>{course.courseName}</h3>
                <p>{course.description}</p>
            </div>

            <div className="course-bottom">
                <span className="course-type">{course.courseType}</span>
                <strong style={{ color: accentColor }}>
                    {formatPrice(course, country)}
                </strong>
            </div>

            <style>{styles}</style>
        </article>
    )
}

const styles = `
.course-card {
    display: flex;
    flex-direction: column;
    min-height: 240px;
    padding: 22px;
    border: 1px solid #242424;
    border-radius: 4px;
    background: #111111;
    box-sizing: border-box;
    transition: border-color 0.25s ease, transform 0.25s ease, opacity 0.25s ease;
    animation: fadeUp 0.5s ease both;
}

.course-card:hover,
.course-card:focus-within {
    border-color: #3a3a3a;
    transform: scale(1.04);
    z-index: 1;
}

.course-card-top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 12px;
}

.course-category {
    font-family: var(--font-fjalla), sans-serif;
    font-size: 11px;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: #555;
}

.refundable {
    padding: 4px 10px;
    border-radius: 2px;
    border: 1px solid #2a4a2e;
    color: #4ade80;
    font-family: var(--font-fjalla), sans-serif;
    font-size: 10px;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    white-space: nowrap;
}

.course-content {
    flex: 1;
    margin-top: 22px;
}

.course-content h3 {
    font-family: var(--font-fjalla), sans-serif;
    margin: 0;
    font-size: 22px;
    font-weight: 400;
    line-height: 1.25;
    letter-spacing: 0.01em;
    color: #f2f2f2;
}

.course-content p {
    margin: 10px 0 0;
    font-family: Georgia, serif;
    color: #666;
    font-size: 14px;
    line-height: 1.65;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
}

.course-bottom {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 16px;
    margin-top: 24px;
    padding-top: 18px;
    border-top: 1px solid #1e1e1e;
}

.course-type {
    font-family: var(--font-fjalla), sans-serif;
    font-size: 11px;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: #444;
}

.course-bottom strong {
    font-family: var(--font-fjalla), sans-serif;
    font-size: 20px;
    font-weight: 400;
    color: #f2f2f2;
}
`
