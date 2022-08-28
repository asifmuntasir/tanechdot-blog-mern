import React from 'react';
import { Helmet } from 'react-helmet';

const NotFound = () => {
    return (
        <>
            <Helmet>
                <title>404 - Page Not Found</title>
                <meta
                    name='description'
                    content='Not Found Page'
                />
                <link rel="shortcut icon" href="./error-404.png" />
            </Helmet>
            <div className="notFound notFound__container">
                <h1 className="notFound__container__h1">
                    404
                </h1>
                <p className="notFound__container__p">
                    Oops! That page could not found!
                </p>
            </div>
        </>
    );
};

export default NotFound;