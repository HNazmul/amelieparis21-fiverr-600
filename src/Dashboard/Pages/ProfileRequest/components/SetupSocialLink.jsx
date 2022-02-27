import React, { useState } from "react";
import SectionTitle from "./SectionTitle";
import { InlineIcon } from "@iconify/react";
import { useProfileContext } from "../../../../Context/ProfileTemplateContext";

function SetupSocialLink({ open, handelOpen, title, setIconPopupShow }) {
    const [iconColor, setIconColor] = useState("");
    const { socialLinks, setUserInfo, userInfo, setIconAndTextColor } = useProfileContext();

    const submitSocialLink = (e) => {
        e.preventDefault();
        const createdArray = [...e.target.elements]
            .filter((data) => data.tagName === "INPUT" && data.value !== "" && data.type !== "color")
            .map((data) => {
                return { name: data.getAttribute("name"), link: data.value, _id: data?.getAttribute("data-id") };
            });
        setUserInfo((prev) => {
            return { ...prev, links: createdArray };
        });
        setIconAndTextColor((prev) => {
            return { ...prev, icon: iconColor };
        });
    };
    const handleIconColorChange = (e) => {
        setIconColor(e.target.value);
    };

    return (
        <div className="setup-social-link db-template">
            <SectionTitle title={title} handelOpen={handelOpen} open={open} />
            <div className={`${open.includes(title) ? "d-block open-div" : "d-none"} ${title === "Setup Social Link" ? "setup-scail-area" : ""}`}>
                <div className={``}>
                    <div className="social-icon-wrapper">
                        {socialLinks?.map((data, index) => (
                            <div className="single-icon" key={index}>
                                <a href={data.link} style={{ color: iconColor }} target="_blank">
                                    {data.icon}
                                </a>
                            </div>
                        ))}
                        <div onClick={() => setIconPopupShow(true)} className="single-icon add-icon-container">
                            <InlineIcon className="add-icon" icon={"ant-design:plus-outlined"} />
                        </div>
                    </div>
                    <div className="socail-link-box">
                        <form onSubmit={submitSocialLink}>
                            <div className="row row-cols-2 w-100">
                                {socialLinks?.map((data) => {
                                    return (
                                        <div key={data?.id} className="col p-1 mb-3">
                                            <div className=" form-floating">
                                                <input
                                                    name={data.name}
                                                    data-id={data?.id}
                                                    defaultValue={userInfo?.links?.find((icon) => icon.name === data.name)?.link || ""}
                                                    type="text"
                                                    className="form-control primary-input"
                                                    id={data?.id}
                                                    placeholder="name@example.com"
                                                    required={true}
                                                />
                                                <label htmlFor={data.id}>{data?.name}</label>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                            <div className="text-end d-flex justify-content-between align-items-center">
                                <div className="w-50 me-2">
                                    <input onChange={handleIconColorChange} defaultValue={"#57697d"} type="color" className="form-control p-0" name="" id="" />
                                    <strong className="w-100 text-center d-block small">Icon Color</strong>
                                </div>
                                <button className="btn text-white bg-primary-500 px-4  rounded-pill">Submit</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SetupSocialLink;
