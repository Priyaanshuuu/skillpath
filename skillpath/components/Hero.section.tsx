"use client"

export default function Hero() {
    return (
        <section className="hero" aria-labelledby="hero-heading">
            <span className="eyebrow">Learn. Build. Grow.</span>

            <h1 id="hero-heading">
                Build skills that
                <br />
                move you forward.
            </h1>

            <p>
                Practical courses designed to help you learn useful skills
                and put them into action.
            </p>

            <button
                type="button"
                onClick={() =>
                    document
                        .getElementById("courses")
                        ?.scrollIntoView({ behavior: "smooth" })
                }
            >
                Explore Courses
            </button>

            <style>{styles}</style>
        </section>
    )
}

const styles = `
.hero {
    min-height: 600px;
    padding: 120px 24px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    box-sizing: border-box;
    background:
        radial-gradient(circle at 50% 0%, #f2f1ff 0%, #fafafa 55%, #ffffff 100%);
}

.eyebrow {
    margin-bottom: 22px;
    font-size: 13px;
    font-weight: 700;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: #6b6b6b;
}

.hero h1 {
    margin: 0;
    max-width: 820px;
    font-size: clamp(40px, 7vw, 84px);
    line-height: 1.02;
    letter-spacing: -0.04em;
    font-weight: 600;
}

.hero p {
    max-width: 560px;
    margin: 26px 0;
    color: #666;
    font-size: 18px;
    line-height: 1.6;
}

.hero button {
    margin-top: 12px;
    padding: 15px 28px;
    border: 0;
    border-radius: 10px;
    background: #111;
    color: white;
    font-size: 15px;
    font-weight: 600;
    cursor: pointer;
    transition: opacity 0.2s ease, transform 0.2s ease;
}

.hero button:hover {
    opacity: 0.85;
}

.hero button:active {
    transform: translateY(1px);
}

.hero button:focus-visible {
    outline: 2px solid #111;
    outline-offset: 3px;
}

@media (max-width: 640px) {
    .hero {
        min-height: 480px;
        padding: 88px 20px;
    }
}
`
