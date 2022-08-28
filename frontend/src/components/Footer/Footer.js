import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <>
            <div className="footer">
                <div className="container">
                    <div className="footer__row">
                        <div className="footer__left">
                            <span className='footer__left__symbol'>
                                &reg;
                            </span>
                            <p className='footer__left__text'>
                                2022 All Rights Resereved | Asif Muntasir
                            </p>
                        </div>
                        <div className="footer__right">
                            <li>
                                <Link to={{ pathname: 'https://github.com/asifmuntasir/' }} target="_blank">
                                    <i class="ri-github-line"></i>
                                </Link>
                            </li>
                            <li>
                                <Link to={{ pathname: 'https://www.linkedin.com/in/asif-muntasir-shuaib/' }} target="_blank">
                                    <i class="ri-linkedin-line"></i>
                                </Link>
                            </li>
                            <li>
                                <Link to={{ pathname: 'https://www.facebook.com/muntasir.asif.79' }} target="_blank">
                                    <i class="ri-facebook-line"></i>
                                </Link>
                            </li>
                            <li>
                                <Link to={{ pathname: 'https://asifmuntasir.github.io' }} target="_blank">
                                    <i class="ri-window-line"></i>
                                </Link>
                            </li>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Footer;