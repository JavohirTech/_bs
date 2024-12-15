import {NavLinks} from "../../mock/navLinks.ts";
import {Link, useLocation} from "react-router-dom";
import {ExchangesBadge} from "../exchangeBadge/ExchangesBadge.tsx";
import {DownloadTransactions} from "../downloadTransactions/DownloadTransactions.tsx";
import {ImportTransactions} from "../importTransactions/ImportTransactions.tsx";
import {ClearTransactions} from "../clearTransactions/ClearTransactions.tsx";

export function Navbar() {
  const {pathname} = useLocation();
  return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container">
          <a className="navbar-brand text-success fw-bold" href="/">Pul-Hisobchi</a>
          <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav mx-auto gap-5">
              {
                NavLinks.map((link, index) => {
                  const isActive = pathname === link.href;
                  return (
                      <li className={`nav-item`} key={index}>
                        <Link className={`nav-link ${isActive ? 'active border-bottom border-primary' : ''}`}
                              to={link.href}>{link.label}</Link>
                      </li>
                  );
                })
              }
            </ul>
            <div className="navbar-text d-flex ms-3 gap-2">
              <ExchangesBadge/>
              <DownloadTransactions/>
              <ImportTransactions/>
              <ClearTransactions/>
            </div>
          </div>
        </div>
      </nav>
  );
}