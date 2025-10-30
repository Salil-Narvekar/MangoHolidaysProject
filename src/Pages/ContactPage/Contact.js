import { useState, useRef, useEffect } from 'react'
import { FaPhoneAlt, FaMapMarkerAlt, FaClock } from "react-icons/fa";
import { RiMailOpenFill } from "react-icons/ri";
import "./Contact.css";


export const Contact = () => {
    useEffect(() => {
        document.title = "Contact | Mango Holidays";
    }, []);

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        message: "",
    });
    const [errorField, setErrorField] = useState(null);

    const nameRef = useRef();
    const emailRef = useRef();
    const phoneRef = useRef();
    const messageRef = useRef();

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData((prev) => ({ ...prev, [id]: value }));
    };

    const handleSubmit = () => {

        if (!formData.name.trim()) {
            setErrorField("name");
            nameRef.current.focus();
            return;

        } else if (!formData.email.trim() || !/^\S+@\S+\.\S+$/.test(formData.email)) {
            setErrorField("email");
            emailRef.current.focus();
            return;

        } else if (!formData.phone.trim() || !/^\d{10}$/.test(formData.phone)) {
            setErrorField("phone");
            phoneRef.current.focus();
            return;

        } else if (!formData.message.trim()) {
            setErrorField("message");
            messageRef.current.focus();
            return;

        } else {
            setErrorField(null);
            console.log('Email JS', formData)
            setFormData({ name: "", email: "", phone: "", message: ""});
            return
        }
    };

    const addresses = [
        {
            city: 'Pune',
            address: '4th Floor, 302, Swojas Capital, Above Atithi restaurant, Law College Rd, near Film Institute, Pune, Maharashtra 411004.',
            contactNo: 'Toll Free - 18002685980',
            mobileNo: '+91 8380039505 / +91 20 25444415 / 16',
            mailId: 'info@mangoholidays.in',
            timming: '10:00 AM to 07:00 PM',
            mapSrc: "https://www.google.com/maps?q=Mango+Holidays+India+Pvt.+Ltd,+Pune&output=embed"
        },
        {
            city: 'Mumbai',
            address: '5, Adi House, Gokhale Road North, Near Portuguese Church, Dadar (W) - 400 028, Maharashtra.',
            contactNo: 'Toll Free - 18002685980',
            mobileNo: '+91 8380039503 / +91 22 24335500 / 11 / 22',
            mailId: 'info@mangoholidays.in',
            timming: '10:00 AM to 07:00 PM',
            mapSrc: "https://www.google.com/maps?q=Mango+Holidays+India+Pvt.+Ltd,+Mumbai&output=embed"
        }
    ]

    return (
        <>
            {/* -- Banner Section -- */}
            <section className="banner-section-contact">
                <div className="img-container-contact">
                    <img src="/img/contact-us.webp" alt="Banner Unavailable" />
                </div>
                <div className="banner-overlay-contact">
                    <h1 className='banner-title-contact'>Contact Us</h1>
                </div>
            </section>


            {/* -- Contact Section --  */}
            <section className="contact-container">

                {/* -- Left Section -- */}
                <div className="contact-left">
                    <h2>Connect with us</h2>
                    <h3><FaPhoneAlt className='icons' /> 8380039505</h3>
                    <h3><RiMailOpenFill className='icons' /> info@mangoholidays.in</h3>

                    <hr />

                    <h2>Send us a message</h2>

                    <div className="form-container">
                        <div className="input-group">
                            <input
                                ref={nameRef}
                                id="name"
                                type="text"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder=" "
                                className={errorField === "name" ? "inputError" : ""}
                            />
                            <label htmlFor="name">Name</label>
                        </div>

                        <div className="input-group">
                            <input
                                ref={emailRef}
                                id="email"
                                type="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder=" "
                                className={errorField === "email" ? "inputError" : ""}
                            />
                            <label htmlFor="email">Email</label>
                        </div>

                        <div className="input-group">
                            <input
                                ref={phoneRef}
                                id="phone"
                                type="text"
                                value={formData.phone}
                                onChange={handleChange}
                                placeholder=" "
                                maxLength={10}
                                className={errorField === "phone" ? "inputError" : ""}
                            />
                            <label htmlFor="phone">Phone No.</label>
                        </div>

                        <div className="input-group">
                            <textarea
                                ref={messageRef}
                                id="message"
                                rows="4"
                                value={formData.message}
                                onChange={handleChange}
                                placeholder=" "
                                className={errorField === "message" ? "inputError" : ""}
                            />
                            <label htmlFor="message">Message</label>
                        </div>

                        <button className='btn-c' onClick={handleSubmit}><p>Send Message</p></button>
                    </div>
                </div>

                {/* -- Right Section -- */}
                <div className="contact-right">
                    {addresses.map((address, index) => {
                        return (
                            <div className="office-details" key={index}>
                                <div className='text-details'>
                                    <h2>{address.city}</h2>
                                    <h3><FaMapMarkerAlt className="icons" /> {address.address}</h3>
                                    <h3><FaPhoneAlt className="icons" /> {address.contactNo}</h3>
                                    <h3><FaPhoneAlt className="icons" /> {address.mobileNo}</h3>
                                    <h3><RiMailOpenFill className="icons" /> {address.mailId}</h3>
                                    <h3><FaClock className="icons" /> {address.timming}</h3>
                                </div>

                                <div className='map-box'>
                                    <iframe
                                        title={`${address.city} Office`}
                                        src={address.mapSrc}
                                        loading="lazy"
                                    />
                                </div>
                            </div>
                        );
                    })}
                </div>
            </section>


            {/* -- sales-agent-section -- */}
            <section className='sales-agent-section'>
                <h2 className="section-title">Preferred Sales Agents</h2>
            </section>
        </>
    )
}
