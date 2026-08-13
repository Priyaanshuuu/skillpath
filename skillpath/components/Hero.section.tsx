"use client"

export default function Hero() {
    return (
        <section className="hero" aria-labelledby="hero-heading">
            <div className="hero-inner">
                <span className="hero-eyebrow">Learn. Build. Grow.</span>

                <h1 id="hero-heading">
                    Build skills that<br />move you forward.
                </h1>

                <p className="hero-sub">
                    Practical courses designed to help you learn useful skills
                    and put them into action.
                </p>

                <button
                    type="button"
                    className="hero-cta"
                    onClick={() =>
                        document
                            .getElementById("courses")
                            ?.scrollIntoView({ behavior: "smooth" })
                    }
                >
                    Explore Courses →
                </button>
            </div>

            <style>{styles}</style>
        </section>
    )
}

const styles = `
.hero {
    background: #0a0a0a;
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 24px;
    border-bottom: 1px solid #1e1e1e;
}

.hero-inner {
    max-width: 860px;
    text-align: center;
    animation: fadeUp 0.8s ease both;
}

.hero-eyebrow {
    display: inline-block;
    font-family: var(--font-fjalla), sans-serif;
    font-size: 13px;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: #666;
    margin-bottom: 32px;
    animation: fadeUp 0.6s ease both;
}

.hero h1 {
    font-family: var(--font-sekuya), Georgia, serif;
    font-size: clamp(52px, 9vw, 112px);
    line-height: 1.0;
    letter-spacing: -0.03em;
    color: #f2f2f2;
    margin: 0 0 32px;
    font-weight: 400;
    animation: fadeUp 0.7s 0.1s ease both;
}

.hero-sub {
    font-family: Georgia, serif;
    font-size: 19px;
    line-height: 1.7;
    color: #777;
    max-width: 520px;
    margin: 0 auto 44px;
    animation: fadeUp 0.7s 0.2s ease both;
}

.hero-cta {
    font-family: var(--font-fjalla), sans-serif;
    font-size: 15px;
    letter-spacing: 0.06em;
    padding: 14px 32px;
    background: #f2f2f2;
    color: #0a0a0a;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background 0.2s ease, transform 0.15s ease;
    animation: fadeUp 0.7s 0.3s ease both;
}

.hero-cta:hover {
    background: #ffffff;
    transform: translateY(-1px);
}

.hero-cta:active {
    transform: translateY(0);
}

.hero-cta:focus-visible {
    outline: 2px solid #f2f2f2;
    outline-offset: 3px;
}

@media (max-width: 640px) {
    .hero {
        min-height: 90vh;
        padding: 80px 20px;
        align-items: flex-start;
        padding-top: 20vh;
    }
    .hero-inner {
        text-align: left;
    }
    .hero-sub {
        margin-left: 0;
    }
}
`
