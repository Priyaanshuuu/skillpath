export default function Hero() {
    return (
        <section className="hero">
            <span className="eyebrow">
                Learn. Build. Grow.
            </span>

            <h1>
                Build skills that
                <br />
                move you forward.
            </h1>

            <p>
                Practical courses designed to help you learn
                useful skills and put them into action.
            </p>

            <button
                onClick={() =>
                    document
                        .getElementById("courses")
                        ?.scrollIntoView({
                            behavior: "smooth",
                        })
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
    min-height: 560px;
    padding: 100px 24px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    background: #f7f7f5;
    box-sizing: border-box;
}

.eyebrow {
    margin-bottom: 20px;
    font-size: 13px;
    font-weight: 600;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: #666;
}

.hero h1 {
    margin: 0;
    max-width: 800px;
    font-size: clamp(48px, 7vw, 88px);
    line-height: 0.98;
    letter-spacing: -0.05em;
}

.hero p {
    max-width: 560px;
    margin: 28px 0;
    color: #666;
    font-size: 18px;
    line-height: 1.6;
}

.hero button {
    padding: 14px 24px;
    border: 0;
    border-radius: 10px;
    background: #111;
    color: white;
    font-size: 15px;
    font-weight: 600;
    cursor: pointer;
}

.hero button:hover {
    opacity: 0.85;
}
`