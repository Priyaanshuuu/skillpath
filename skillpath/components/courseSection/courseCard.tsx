import { Course, CountryCode } from "./types"
import { formatPrice } from "./utils"

type Props = {
    course: Course
    country: CountryCode
}

export default function CourseCard({
    course,
    country,
}: Props) {
    return (
        <article className="course-card">
            <div className="course-card-top">
                <span className="course-category">
                    {course.mainCategory}
                </span>

                {course.refundable && (
                    <span className="refundable">
                        Refundable
                    </span>
                )}
            </div>

            <div className="course-content">
                <h3>{course.courseName}</h3>

                <p>{course.description}</p>
            </div>

            <div className="course-bottom">
                <span className="course-type">
                    {course.courseType}
                </span>

                <strong>
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
    padding: 24px;
    border: 1px solid #e8e8e8;
    border-radius: 18px;
    background: white;
    box-sizing: border-box;
    transition:
        transform 0.2s ease,
        box-shadow 0.2s ease;
}

.course-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 30px rgba(0, 0, 0, 0.08);
}

.course-card-top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 12px;
}

.course-category {
    font-size: 13px;
    font-weight: 600;
    color: #666;
}

.refundable {
    padding: 5px 9px;
    border-radius: 999px;
    background: #eef8f0;
    color: #2f7a3d;
    font-size: 11px;
    font-weight: 600;
}

.course-content {
    flex: 1;
    margin-top: 24px;
}

.course-content h3 {
    margin: 0;
    font-size: 21px;
    line-height: 1.25;
}

.course-content p {
    margin: 12px 0 0;
    color: #6b6b6b;
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
    margin-top: 24px;
    padding-top: 16px;
    border-top: 1px solid #eeeeee;
}

.course-type {
    font-size: 13px;
    color: #777;
}

.course-bottom strong {
    font-size: 19px;
}
`