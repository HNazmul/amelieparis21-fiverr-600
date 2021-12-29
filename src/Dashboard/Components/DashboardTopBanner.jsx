import React from 'react'

function DashboardTopBanner({title}) {
    console.log("title", title)
    return (
        <section className='card-body-banner'>
            <article>
                <h1>{title}</h1>
            </article>
        </section>
    )
}

export default DashboardTopBanner
