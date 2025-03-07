import GithubLogo from '../../icons/github.png';

export function Footer() {
    return (
        <footer>
            <p className="footer-author">
                Developed by
                <a target="_blank" href="https://github.com/topihenrik">
                    <img id="github-logo" src={GithubLogo} />
                    topihenrik
                </a>
            </p>
        </footer>
    );
}
