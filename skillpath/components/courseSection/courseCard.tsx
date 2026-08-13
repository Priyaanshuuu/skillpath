import { Course, CountryCode } from "./types"
import { formatPrice } from "./utils"

type Props = {
    course: Course
    country: CountryCode | null
}

export default function CourseCard({ course, country }: Props) {
    return (
        <div
            style={{
                border: "1px solid #e5e5e5",
                borderRadius: 16,
                padding: 20,
                display: "flex",
                flexDirection: "column",
                gap: 12,
            }}
        >
            <div>
                <h3 style={{ margin: 0 }}>{course.courseName}</h3>
                <p
                    style={{
                        margin: "8px 0 0",
                        color: "#666",
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                    }}
                >
                    {course.description}
                </p>
            </div>

            <span style={{ fontSize: 14, color: "#666" }}>
                {course.mainCategory}
            </span>

            <strong style={{ fontSize: 20 }}>
                {formatPrice(course, country)}
            </strong>

            {course.refundable && (
                <span
                    style={{
                        fontSize: 12,
                        padding: "4px 8px",
                        borderRadius: 999,
                        background: "#eef6ee",
                        width: "fit-content",
                    }}
                >
                    Refundable
                </span>
            )}
        </div>
    )
}