import React from "react";
import Head from "next/head";
import config from "../config";

const Seo = () => {
    return (
        <Head>
            <title>{config.title}</title>
            <meta name="description" content={config.description} />
            <meta name="image" content="https://companyordertracker.netlify.app/favicon.png" />
            <meta property="og:title" content={config.title} />
            <meta property="og:url" content={config.siteUrl} />
            <meta property="og:image" content="/favicon.png" />
            <meta property="og:type" content="website" />
            <meta property="og:description" content={config.description} />
            <link rel="shortcut icon" href="/favicon.png" />
            <link rel="manifest" href="/manifest.json" />
        </Head>
    );
};

export default Seo;
