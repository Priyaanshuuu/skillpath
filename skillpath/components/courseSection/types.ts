export type CountryCode = "IN" | "US"

export type Course = {
    courseName: string
    courseCode: string
    description: string
    mainCategory: string
    shortCourse: string
    courseType: string
    pricePaise: number
    priceUsdCents: number
    mangoId: string
    refundable: boolean
}

export type State = {
    status: "idle" | "loading" | "success" | "error"
    courses: Course[]
    country: CountryCode | null
    error: string | null
}

export type Action =
    | { type: "FETCH_START" }
    | { type: "COURSES_SUCCESS"; payload: Course[] }
    | { type: "COUNTRY_SUCCESS"; payload: CountryCode }
    | { type: "FETCH_ERROR"; payload: string }