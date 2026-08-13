import Hero from "@/components/Hero.section"
import CourseSection from "@/components/courseSection/courseSection"
import Footer from "@/components/Footer"

export default function Home() {
    return (
        <div className="flex flex-col flex-1">
            <Hero />
            <CourseSection heading="Explore Our Courses" accentColor="#4f46e5" />
            <Footer />
        </div>
    )
}
