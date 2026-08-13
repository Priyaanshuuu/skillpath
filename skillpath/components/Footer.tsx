export default function Footer() {
    return (
        <footer className="footer">
            <div className="footer-inner">
                <div className="footer-brand">
                    <span>Skillpath</span>
                </div>

                <nav className="links" aria-label="Footer">
                    <a href="#">About</a>
                    <a href="#">Courses</a>
                    <a href="#">Contact</a>
                </nav>

                <p>© 2026 Skillpath. All rights reserved.</p>
            </div>

            <style>{styles}</style>
        </footer>
    )
}

const styles = `
.footer {
    background: #0a0a0a;
    padding: 48px 32px;
    border-top: 1px solid #1a1a1a;
}

.footer-inner {
    max-width: 1180px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 20px;
}

.footer-brand span {
    font-family: var(--font-fjalla), sans-serif;
    font-size: 18px;
    letter-spacing: 0.06em;
    color: #f2f2f2;
}

.links {
    display: flex;
    gap: 28px;
}

.links a {
    font-family: var(--font-fjalla), sans-serif;
    font-size: 12px;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: #444;
    text-decoration: none;
    transition: color 0.15s ease;
}

.links a:hover,
.links a:focus-visible {
    color: #f2f2f2;
}

.links a:focus-visible {
    outline: 2px solid #f2f2f2;
    outline-offset: 3px;
    border-radius: 2px;
}

.footer p {
    margin: 0;
    font-family: var(--font-fjalla), sans-serif;
    font-size: 11px;
    letter-spacing: 0.08em;
    color: #333;
}

@media (max-width: 640px) {
    .footer-inner {
        flex-direction: column;
        align-items: flex-start;
        gap: 24px;
    }
}
`
