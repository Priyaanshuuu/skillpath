export default function Footer() {
    return (
        <footer className="footer">
            <nav className="links" aria-label="Footer">
                <a href="#">About</a>
                <a href="#">Courses</a>
                <a href="#">Contact</a>
            </nav>

            <p>© 2026 Skillpath. All rights reserved.</p>

            <style>{styles}</style>
        </footer>
    )
}

const styles = `
.footer {
    padding: 48px 24px;
    border-top: 1px solid #eee;
    text-align: center;
    background: #fafafa;
}

.links {
    display: flex;
    justify-content: center;
    gap: 28px;
    margin-bottom: 18px;
}

.links a {
    color: #555;
    text-decoration: none;
    font-size: 14px;
    font-weight: 500;
}

.links a:hover,
.links a:focus-visible {
    color: #111;
}

.links a:focus-visible {
    outline: 2px solid #111;
    outline-offset: 3px;
    border-radius: 4px;
}

.footer p {
    margin: 0;
    color: #999;
    font-size: 13px;
}

@media (max-width: 600px) {
    .links {
        gap: 18px;
        flex-wrap: wrap;
    }
}
`
