import React from 'react'
import cardImg from "../../../../assets/images/Rectangle 9.png"
import ProfileTemplate1 from './../../../Components/ProfileTemplate1/ProfileTemplate1';
import ProfileTemplate2 from './../../../Components/ProfileTemplate2/ProfileTemplate2';

function RightSection() {
    return (
        <div>
            {/* <img src={cardImg} alt="" className='w-100' /> */}
            {/* <ProfileTemplate2 /> */}
            <ProfileTemplate1 />
        </div>
    )
}

export default RightSection
