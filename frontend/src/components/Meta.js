import React from 'react'
import {Helmet}from 'react-helmet'

const Meta = ({title,description,keyword}) => {
    return (
        <Helmet>
            <title>{title}</title>
            <meta name="description" content={description}> </meta>        
        </Helmet>
    )
}

Meta.defaultProps={
    title:'Welcome to Proshop',
    description:'We sell the best products for cheap'
}

export default Meta
