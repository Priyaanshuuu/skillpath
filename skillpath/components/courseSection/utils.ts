import { Course, CountryCode } from "./types"

export function formatPrice(
    course: Course,
    country: CountryCode | null
): string {
    if (!country) return "Price unavailable"

    if (country === "IN") {
        return new Intl.NumberFormat("en-IN", {
            style: "currency",
            currency: "INR",
        }).format(course.pricePaise / 100)
    }

    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
    }).format(course.priceUsdCents / 100)
}