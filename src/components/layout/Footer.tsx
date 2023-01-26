import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faTwitter } from "@fortawesome/free-brands-svg-icons";

import classes from "./Footer.module.css";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className={classes.footer}>
      <ul className={classes.links}>
        <li>
          <a
            className={classes.twitter}
            href="https://twitter.com/samkmr0220"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon icon={faTwitter} />
          </a>
        </li>
        <a
          className={classes.github}
          href="https://github.com/kimmireu0220"
          target="_blank"
          rel="noopener noreferrer"
        >
          <li>
            <FontAwesomeIcon icon={faGithub} />
          </li>
        </a>
      </ul>
      <div
        className={classes.copyright}
      >{`© ${year} Trading App. All rights reserved.`}</div>
    </footer>
  );
};

export default Footer;
