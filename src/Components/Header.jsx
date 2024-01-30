import React from "react";

const Header = () => {
  return (
    <header className="page-header App-header">
      <nav className="page-navbar">
        <a
          className="website-logo"
          href="/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            className="website-logo"
            src="./gronkrans.png"
            alt="Grönkrans logo"
          />
        </a>
        <a className="page-link" href="/contact" rel="noopener noreferrer">
          Contact
        </a>
      </nav>
    </header>
  );
};

export default Header;
