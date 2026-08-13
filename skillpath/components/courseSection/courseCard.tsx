import { Course, CountryCode } from "./types"
import { formatPrice } from "./utils"

type Props = {
    course: Course
    country: CountryCode | null
    accentColor?: string
}

export default function CourseCard({
    course,
    country,
    accentColor = "#4f46e5",
}: Props) {
    return (
        <article className="course-card">
            <div className="course-card-top">
                <span className="course-category">
                    {course.mainCategory}
                </span>

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
    min-height: 260px;
    padding: 26px;
    border: 1px solid #e8e8e8;
    border-radius: 18px;
    background: white;
    box-sizing: border-box;
    transition:
        transform 0.2s ease,
        box-shadow 0.2s ease,
        border-color 0.2s ease;
}

.course-card:hover,
.course-card:focus-within {
    transform: translateY(-4px);
    box-shadow: 0 16px 32px rgba(0, 0, 0, 0.08);
    border-color: #d8d8d8;
}

.course-card-top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 12px;
}

.course-category {
    font-size: 12px;
    font-weight: 700;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    color: #888;
}

.refundable {
    padding: 5px 10px;
    border-radius: 999px;
    background: #eef8f0;
    color: #2f7a3d;
    font-size: 11px;
    font-weight: 700;
    white-space: nowrap;
}

.course-content {
    flex: 1;
    margin-top: 20px;
}

.course-content h3 {
    margin: 0;
    font-size: 20px;
    font-weight: 600;
    line-height: 1.3;
    letter-spacing: -0.01em;
}

.course-content p {
    margin: 10px 0 0;
    color: #6b6b6b;
    font-size: 14.5px;
    line-height: 1.6;
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
    margin-top: 22px;
    padding-top: 16px;
    border-top: 1px solid #f0f0f0;
}

.course-type {
    font-size: 13px;
    color: #888;
}

.course-bottom strong {
    font-size: 19px;
    font-weight: 700;
}
`
