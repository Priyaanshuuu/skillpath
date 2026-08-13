export default function Footer() {
    return (
        <footer className="footer">
            <div className="links">
                <a href="#">About</a>
                <a href="#">Courses</a>
                <a href="#">Contact</a>
            </div>

            <p>© 2026 Skillpath. All rights reserved.</p>

            <style>{styles}</style>
        </footer>
    )
}

const styles = `
.footer {
    padding: 40px 24px;
    border-top: 1px solid #e8e8e8;
    text-align: center;
}

.links {
    display: flex;
    justify-content: center;
    gap: 24px;
    margin-bottom: 16px;
}

.links a {
    color: #555;
    text-decoration: none;
    font-size: 14px;
}

.footer p {
    margin: 0;
    color: #999;
    font-size: 13px;
}

@media (max-width: 600px) {
    .links {
        gap: 16px;
        flex-wrap: wrap;
    }
}
`