import React from 'react';
import {SlSpinner} from "@shoelace-style/shoelace/dist/react";
import './loader.component.scss';

const Loader = () => {
    return (
        <div className="loader">
            <SlSpinner />
        </div>
    );
}

export default Loader;
