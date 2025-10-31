import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
// import { FaArrowRight } from "react-icons/fa6";
import { NavLink } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";
import "./packages.css";
import { getProductList } from "../../API/mangoholidayAPI"


// const tourPackages = [
//     {
//         id: 1,
//         title: "Spain Portugal",
//         days: "13",
//         nights: "12",
//         price: "3,37,015",
//         img: "/img/dubai-abu-dhabi.webp",
//     },
//     {
//         id: 2,
//         title: "Spain Portugal",
//         days: "13",
//         nights: "12",
//         price: "3,37,015",
//         img: "/img/dubai-abu-dhabi.webp",
//     },
//     {
//         id: 3,
//         title: "Spain Portugal",
//         days: "13",
//         nights: "12",
//         price: "3,37,015",
//         img: "/img/dubai-abu-dhabi.webp",
//     },
//     {
//         id: 4,
//         title: "Spain Portugal",
//         days: "13",
//         nights: "12",
//         price: "3,37,015",
//         img: "/img/dubai-abu-dhabi.webp",
//     }
// ];

const Packages = () => {

    const { "tour-type": type, location } = useParams();

    const [tourLocation, setTourLocation] = useState(null);
    const [tourType, setTourType] = useState(null);
    const [currentProductType, setCurrentProductType] = useState(null);
    const [tourPackages, setTourPackages] = useState([]);
    const [loading, setLoading] = useState(true);

    // Function to Convert the params, as for example: "south-america" to "South America"
    const formatTitle = (str) =>
        str
            .split("-")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ");

    useEffect(() => {
        setTourType(formatTitle(type));
        setTourLocation(formatTitle(location))
    }, [type, location])

    useEffect(() => {
        document.title = `${tourLocation} ${tourType} | Mango Holidays`;
    }, [tourLocation, tourType]);

    useEffect(() => {
        // console.log(type)
        if (type === 'india-tour') {
            setCurrentProductType('India')
        } else {
            setCurrentProductType('World')
        }

    }, [type]);

    const handleScrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };


    // API Calling function
    useEffect(() => {
        async function fetchTours() {

            // prevent running when params aren’t ready
            if (!currentProductType || !tourLocation) return;
            setLoading(true);

            try {
                const data = await getProductList({
                    ProductType: currentProductType,
                    SectorName: tourLocation,
                });
                // console.log("Fetched Data:", data, currentProductType, tourLocation);

                if (!data?.ProductList || !Array.isArray(data.ProductList)) {
                    console.warn("No tours found or invalid data structure");
                    setTourPackages([]);
                    return;
                }

                // Group by SectorName
                const groupedData = data.ProductList.reduce((acc, item) => {
                    const { SectorName, ProductID, ProductCode, ProductTitle, Days, Nights, ProductPricingHeader, ProductImage } = item;
                    const netINRValue = ProductPricingHeader?.[0]?.ProductPricingDetail?.[0]?.NETINRValue || null;

                    if (!acc[SectorName]) acc[SectorName] = [];
                    acc[SectorName].push({
                        SectorName,
                        ProductID,
                        ProductCode,
                        ProductTitle,
                        Days,
                        Nights,
                        ProductImage,
                        NETINRValue: netINRValue,
                    });

                    return acc;
                }, {});

                // Convert object to array 
                const groupedArray = Object.keys(groupedData).map((sector) => ({
                    sector,
                    tours: groupedData[sector],
                }));

                // console.log("Grouped Tours:", groupedArray[0].tours);
                setTourPackages(groupedArray[0]?.tours || []);

            } catch (err) {
                console.error("Failed to load products:", err.message);
                setTourPackages([]);
            } finally {
                setLoading(false);
            }
        }

        fetchTours();
    }, [currentProductType, tourLocation]);

    return (
        <>
            {/* Banner Section */}
            <section className="banner-section-packages">
                <div className="img-container-packages">
                    <img src="/img/exotic-europe-banner.webp" alt="Banner Unavailable" />
                </div>
                <div className="banner-overlay-packages">
                    <h1 className='banner-title-packages'>{tourPackages[0]?.SectorName ? tourPackages[0]?.SectorName : ""} {tourType}</h1>
                </div>
            </section>


            {/* Packages Section */}
            <section className="packages-cards-section">
                <div className="container">
                    {
                        loading ? (

                            <div className="loader-container">
                                <ClipLoader color="#ff5f10" loading={loading} size={100} />
                                <p className="loading-text">Fetching tours...</p>
                            </div>

                        ) : tourPackages.length > 0 ? (
                            <div className="packages-grid">
                                {
                                    tourPackages.map((pkg) => (
                                        <div key={pkg.ProductCode} className="package-image-container">
                                            <div className="package-image">
                                                <img src={pkg.ProductImage} alt="Banner Unavailable" />
                                            </div>

                                            <div className="hover-overlay">
                                                <i className="fas fa-link fa-2x"></i>
                                            </div>

                                            <div className="package-overlay-content">
                                                <h3>{pkg.ProductTitle}</h3>
                                                <p>{pkg.Days} days | {pkg.Nights} nights</p>
                                                <div className="price-bar">
                                                    <h3>{pkg.NETINRValue && '₹ ' + Number(pkg.NETINRValue).toLocaleString("en-IN")}</h3>
                                                    <NavLink
                                                        to={`/tour-details/${pkg.ProductID}/${pkg.ProductCode}/${pkg.ProductTitle.toLowerCase().replace(/\s+/g, "-")}`}
                                                        onClick={handleScrollToTop}
                                                    >
                                                        <p>See Details</p>
                                                    </NavLink>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                        )
                            :
                            (
                                <div className="data-unavailable-banner">
                                    <img src="/img/data-not-available.webp" alt="No Tours available" />
                                </div>
                            )}
                </div>
            </section>
        </>
    )
}

export default Packages