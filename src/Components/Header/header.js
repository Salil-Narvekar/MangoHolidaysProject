import { useState, useEffect } from "react";
import "./header.scss";
import { NavLink } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import { getProductList } from "../../API/mangoholidayAPI"
import ClipLoader from "react-spinners/ClipLoader";

const Header = () => {
  const [internationalToursList, setInternationalToursList] = useState([]);
  const [customizedToursList, setCustomizedToursList] = useState([]);
  const [indiaToursList, setIndiaToursList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTours() {
      try {
        
        // --- WORLD TOURS --- 
        const worldParams = { ProductType: "World" };
        const worldData = await getProductList(worldParams);

        // --- Fetch International Tours (GIT) ---
        const internationalTours = worldData.ProductList.filter(item => item.TravelType === "GIT");
        const gitSectors = internationalTours.map(item => item.SectorName);
        const uniqueGitSectors = [...new Set(gitSectors)].sort((a, b) => a.localeCompare(b));
        setInternationalToursList(uniqueGitSectors);
        // console.log("International Sectors:", uniqueGitSectors, uniqueGitSectors.length);

        // --- Fetch Customized Tours (FIT) ---
        const customizedTours = worldData.ProductList.filter(item => item.TravelType === "FIT");
        const fitSectors = customizedTours.map(item => item.SectorName);
        const uniqueFitSectors = [...new Set(fitSectors)].sort((a, b) => a.localeCompare(b));
        setCustomizedToursList(uniqueFitSectors);
        // console.log("Customized Sectors:", uniqueFitSectors, uniqueFitSectors.length);


        // --- INDIA TOURS ---
        const indiaParams = { ProductType: "India" };
        const indiaData = await getProductList(indiaParams);

        const indiaSectors = indiaData.ProductList.map((item) => item.SectorName);
        const uniqueIndiaSectors = [...new Set(indiaSectors)].sort((a, b) => a.localeCompare(b));
        setIndiaToursList(uniqueIndiaSectors);
        // console.log("India Sectors:", uniqueIndiaSectors);

      } catch (err) {
        // 4. Catch any errors thrown by the API function
        console.error('Failed to load products in component:', err.message);

      } finally {
        // 5. Stop loading regardless of success or failure
        setLoading(false);
      }
    }

    fetchTours();
  }, []);

  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <header className={`header-container ${menuOpen ? "menu-open" : ""}`}>
      {/* Logo */}
      <div className="header-logo">
        <img
          src="/img/logo.webp"
          alt="Mango Holidays Logo"
          className="logo-img"
        />
      </div>

      {/* Hamburger Button */}
      <button className="menu-toggle" onClick={toggleMenu} aria-label="Toggle menu">
        <FaBars />
      </button>

      {/* Nav + Search */}
      <nav className={`header-nav-search ${menuOpen ? "show" : ""}`}>
        <ul className="nav-links">
          <li className="nav-item">
            <NavLink to="/" onClick={() => { closeMenu(); handleScrollToTop(); }}
              className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
              Home
            </NavLink>
          </li>


          {/* Dropdown 1 */}
          <li className="nav-item dropdown">
            <button
              className="nav-link"
              onClick={(e) => {
                e.stopPropagation();
                handleScrollToTop();
                if (window.innerWidth <= 992) {
                  const dropdown = e.currentTarget.nextElementSibling;
                  dropdown.classList.toggle("show");
                  e.currentTarget.classList.toggle("open");
                }
              }}
            >
              International Tours <i className="fa-solid fa-chevron-down"></i>
            </button>

            <ul className="dropdown-menu">
              {
                loading ? (
                  <div className="loader-container-tour-details">
                    <ClipLoader color="#ff5f10" loading={loading} size={100} />
                  </div>

                ) :

                  internationalToursList.length > 0 ?
                    internationalToursList.map((tour, index) => (
                      <li key={index}>
                        <NavLink
                          to={`packages/internation-tour/${tour.toLowerCase().replace(/\s+/g, "-")}`}
                          onClick={() => {
                            closeMenu();
                            handleScrollToTop();
                          }}
                          className="dropdown-link"
                        >
                          <span>-</span>
                          {tour}
                        </NavLink>
                      </li>
                    ))
                    :
                    <li>
                      <span className="no-tour-text">International Tours unavailable</span>
                    </li>
              }
            </ul>
          </li>

          {/* Dropdown 2 */}
          <li className="nav-item dropdown">
            <button
              className="nav-link"
              onClick={(e) => {
                e.stopPropagation();
                handleScrollToTop();
                if (window.innerWidth <= 992) {
                  const dropdown = e.currentTarget.nextElementSibling;
                  dropdown.classList.toggle("show");
                  e.currentTarget.classList.toggle("open");
                }
              }}
            >
              India Tours <i className="fa-solid fa-chevron-down"></i>
            </button>

            <ul className={`dropdown-menu ${indiaToursList && indiaToursList.length > 0 ? "show" : "empty"}`}>
              {
                loading ? (
                  <div className="loader-container-tour-details">
                    <ClipLoader color="#ff5f10" loading={loading} size={100} />
                  </div>

                ) :

                  indiaToursList.length > 0 ?
                    indiaToursList.map((tour, index) => (
                      <li key={index}>
                        <NavLink
                          // to={`/package-details/${tour.ProductID}/${tour.ProductCode}`}
                          to={`packages/india-tour/${tour
                            .toLowerCase()
                            .replace(/\s+/g, "-")}`}
                          onClick={() => {
                            closeMenu();
                            handleScrollToTop();
                          }}
                          className="dropdown-link"
                        >
                          <span>-</span>
                          {tour}
                        </NavLink>
                      </li>
                    ))
                    :
                    <li>
                      <span className="no-tour-text">India Tours unavailable</span>
                    </li>
              }
            </ul>
          </li>

          {/* Dropdown 3 */}
          <li className="nav-item dropdown">
            <button
              className="nav-link"
              onClick={(e) => {
                e.stopPropagation();
                handleScrollToTop();
                if (window.innerWidth <= 992) {
                  const dropdown = e.currentTarget.nextElementSibling;
                  dropdown.classList.toggle("show");
                  e.currentTarget.classList.toggle("open");
                }
              }}
            >
              Customized Tours <i className="fa-solid fa-chevron-down"></i>
            </button>

            <ul className="dropdown-menu">
              {
                loading ? (
                  <div className="loader-container-tour-details">
                    <ClipLoader color="#ff5f10" loading={loading} size={100} />
                  </div>

                ) :

                  customizedToursList.length > 0 ?
                    customizedToursList.map((tour, index) => (
                      <li key={index}>
                        <NavLink
                          to={`packages/customized-tour/${tour.toLowerCase().replace(/\s+/g, "-")}`}
                          onClick={() => {
                            closeMenu();
                            handleScrollToTop();
                          }}
                          className="dropdown-link"
                        >
                          <span>-</span>
                          {tour}
                        </NavLink>
                      </li>
                    ))
                    :
                    <li>
                      <span className="no-tour-text">Customized Tours unavailable</span>
                    </li>
              }
            </ul>
          </li>


          <li className="nav-item">
            <NavLink to="/about" onClick={() => { closeMenu(); handleScrollToTop(); }}
              className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
              About
            </NavLink>
          </li>

          <li className="nav-item">
            <NavLink to="/contact" onClick={() => { closeMenu(); handleScrollToTop(); }}
              className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
              Contact Us
            </NavLink>
          </li>

          <li className="nav-item">
            <NavLink to="/blogs" onClick={() => { closeMenu(); handleScrollToTop(); }}
              className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
              Blogs
            </NavLink>
          </li>

          <li className="nav-item">
            <NavLink to="/termCondition" onClick={() => { closeMenu(); handleScrollToTop(); }}
              className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
              T&C
            </NavLink>
          </li>
        </ul>

        {/* Search */}
        <div className="search-bar-container">
          <input
            type="text"
            placeholder="Eg: Europe"
            className="search-input"
            aria-label="Search destination"
          />
          <button className="search-button" aria-label="Search">
            <i className="fa-solid fa-magnifying-glass"></i>
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Header;
