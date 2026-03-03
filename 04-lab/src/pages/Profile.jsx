import '../components/Dashboard.css';

const Profile = () => {
    return (
        <div className="profile-page glass-panel" style={{ maxWidth: '800px', margin: '0 auto', padding: '40px' }}>
            <div className="profile-header" style={{ display: 'flex', alignItems: 'center', gap: '30px', marginBottom: '40px' }}>
                <div className="profile-avatar" >
                    <img src='https://avatars.githubusercontent.com/u/144257965?v=4' style={{
                    width: '120px',
                    height: '120px',
                    borderRadius: '50%',
                    backgroundColor: 'var(--card-bg)',
                    border: '4px solid var(--accent-color)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '3rem'
                    }}
                />
                </div>
                <div>
                    <h1 style={{ margin: 0, fontSize: '2.5rem' }}>Maxim Novikov</h1>
                    <p style={{ color: 'var(--accent-color)', fontSize: '1.2rem', marginTop: '5px' }}>FullStack TypeScript Developer & System Architect</p>
                </div>
            </div>

            <div className="profile-details">
                <section style={{ marginBottom: '30px' }}>
                    <h2 style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '10px', marginBottom: '20px' }}>About Me</h2>
                    <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                        Passionate software engineer with a focus on self-hosted infrastructure and automation.
                        Currently studying at IITU and building the own ecosystem.
                        I love orchestrating containers, managing servers, and optimizing workflows ;)
                    </p>
                </section>

                <section>
                    <h2 style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '10px', marginBottom: '20px' }}>Contact & Links</h2>
                    <ul style={{ listStyle: 'none', padding: 0 }}>
                        <li style={{ marginBottom: '15px' }}>
                            <strong>GitHub:</strong> <a href="https://github.com/novihub" target='_blank' style={{ color: 'var(--accent-color)', textDecoration: 'none' }}>@novihub</a>
                        </li>
                        <li style={{ marginBottom: '15px' }}>
                            <strong>Email:</strong> <a href="mailto:max@novitech.dev" style={{ color: 'var(--accent-color)', textDecoration: 'none' }}>max@novitech.dev</a>
                        </li>
                        <li style={{ marginBottom: '15px' }}>
                            <strong>University:</strong> International IT University (IITU)
                        </li>
                    </ul>
                </section>
            </div>
        </div>
    );
};

export default Profile;
