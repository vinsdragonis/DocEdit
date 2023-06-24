import React from 'react';
import ScrollReveal from "scrollreveal";

import './footer.css';

function Footer() {
    const sr = ScrollReveal({
		distance: "65px",
		duration: 2600,
		delay: 450,
	});
	sr.reveal(".footer-text", { delay: 200, origin: "bottom" });
    return (
        <div className="footer">
            <span className="footer-text">
                Copyright <i className="ri-copyright-line"></i> 2023 - VINEETH B V
            </span>
        </div>
    );
}

export default Footer;