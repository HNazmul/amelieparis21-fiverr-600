import axios from "axios";
import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { apiBaseURL } from "../../../Util/API_Info";
import GetCookie from "../../../Util/Coockie";
import { SecureFetch } from "../../../Util/SecureFetch";
import { CreateCardPageContext } from "../CreateCardPage";

const OrderValidation = () => {
    const { cardLogo, setCardLogo, cardDetails, setCardDetails, cardFiles, setCardFiles, checkingSteps, setCheckingSteps } = useContext(CreateCardPageContext);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const getCookie = new GetCookie();
    const [sameBillingAddress, setSameBillingAddress] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    const onSubmit = async (data) => {
        const { additional_address, address, city, company, country, landing, email, firstName, lastName, phone, position, postalCode, quantity, society, website } = cardDetails;
        const billingInfo = () => {
            if (sameBillingAddress) {
                return { is_billing_same_delivery: true };
            } else {
                return {
                    firstName: data.b_firstName,
                    lastName: data.b_lastName,
                    address: data.b_address,
                    additional_address: data.b_additional_address,
                    society: data.b_society,
                    phone: data.b_phone,
                    postalCode: data.b_postalCode,
                    city: data?.b_city,
                };
            }
        };
        const formData = new FormData();
        formData.append("backSide", cardFiles?.backside);
        formData.append("frontSide", cardFiles?.frontSide);
        const { data: uploadedImg } = await axios.post(`${apiBaseURL}`, formData, {
            headers: {
                Authorization: getCookie.getCookie("token"),
                userId: getCookie.getCookie("userId"),
                "Content-type": "multipart/form-data",
            },
        });
        if (uploadedImg) {
            const dataForSendBackend = {
                card_base: cardLogo.card_base,
                frontSide: {
                    logo: uploadedImg.frontSide,
                    scale: cardLogo.front?.scale,
                },
                backSide: {
                    logo: uploadedImg.backSide,
                    scale: cardLogo.back.scale,
                    infoAlign: cardLogo.back.infoAlign,
                },
                cardInfo: {
                    firstName,
                    lastName,
                    position,
                    email,
                    company,
                    website,
                    landing,
                    address,
                    additional_address,
                    quantity,
                    phone,
                    city,
                    country,
                    society,
                    postalCode,
                },
                deliveryInfo: {
                    firstName: data?.firstName,
                    lastName: data?.lastName,
                    address: data?.address,
                    additional_address: data?.additionalAddress,
                    society: data?.society,
                    phone: data?.phone,
                    postalCode: data?.postalCode,
                    city: data?.city,
                    comment_on: data.comment_on,
                    promoCode: data?.promoCode,
                },
                billingInfo: billingInfo(),
                is_billing_same_delivery: sameBillingAddress,
                comment_on: data?.comment_on,
                promoCode: data?.promoCode,
            };
            const returnedData = await SecureFetch.post(`${apiBaseURL}/api/card/create-card`, dataForSendBackend);
            console.log(returnedData);
            if (returnedData?.card_created) {
                navigate(`/card-status/${returnedData?.cardId}`);
            }
        }
    };

    return (
        <section id="order_validate">
            <div className="container">
                <div className="validateInner">
                    <form action="" className="validateForm" onSubmit={handleSubmit(onSubmit)}>
                        <h3 className="title">Validate your Order</h3>
                        <div>
                            <h6 className="subTitle">Delivary</h6>

                            <div className="d-flex gap-3">
                                <div className="w-100 form-floating mb-3">
                                    <input
                                        type="text"
                                        className="form-control primary-input"
                                        id="floatingInput"
                                        name="firstname"
                                        placeholder="name@example.com"
                                        {...register("firstName", { required: true })}
                                    />
                                    <label for="floatingInput">First Name</label>
                                    {errors.firstName?.type === "required" && <span className="text-danger ">First name is required</span>}
                                </div>

                                <div className="w-100 form-floating mb-3">
                                    <input
                                        type="text"
                                        className="form-control primary-input"
                                        id="floatingInput"
                                        name="lastname"
                                        placeholder="name@example.com"
                                        {...register("lastName", { required: true })}
                                    />
                                    <label for="floatingInput">Last Name</label>
                                    {errors.lastName?.type === "required" && <span className="text-danger ">Last name is required</span>}
                                </div>
                            </div>

                            <div className="form-floating mb-3">
                                <input
                                    type="text"
                                    className="form-control primary-input"
                                    id="floatingInput"
                                    name="society"
                                    placeholder="name@example.com"
                                    {...register("society", { required: true })}
                                />
                                <label for="floatingInput">Society</label>
                                {errors.society?.type === "required" && <span className="text-danger ">Society is required</span>}
                            </div>

                            <div className="form-floating mb-3">
                                <input type="text" className="form-control primary-input" id="floatingInput" placeholder="name@example.com" {...register("address", { required: true })} />
                                <label for="floatingInput">Address</label>
                                {errors.address?.type === "required" && <span className="text-danger ">Address is required</span>}
                            </div>

                            <div className="form-floating mb-3">
                                <input type="text" className="form-control primary-input" id="floatingInput" placeholder="name@example.com" {...register("additionalAddress", { required: true })} />
                                <label for="floatingInput">Additional Address</label>
                                {errors.additionalAddress?.type === "required" && <span className="text-danger ">Additional Address is required</span>}
                            </div>

                            <div className="d-flex gap-3">
                                <div className="w-100 form-floating mb-3">
                                    <input type="text" className="form-control primary-input" id="floatingInput" placeholder="name@example.com" {...register("postalCode", { required: true })} />
                                    <label for="floatingInput">Postal code</label>
                                    {errors.postalCode?.type === "required" && <span className="text-danger ">Postal code is required</span>}
                                </div>

                                <div className="w-100 form-floating mb-3">
                                    <input type="text" className="form-control primary-input" id="floatingInput" placeholder="name@example.com" {...register("city", { required: true })} />
                                    <label for="floatingInput">City</label>
                                    {errors.city?.type === "required" && <span className="text-danger ">City is required</span>}
                                </div>
                            </div>

                            <div className="form-floating mb-3">
                                <input type="text" className="form-control primary-input" id="floatingInput" placeholder="name@example.com" {...register("country", { required: true })} />
                                <label for="floatingInput">Country</label>
                                {errors.country?.type === "required" && <span className="text-danger ">Country is required</span>}
                            </div>
                        </div>

                        <div className={`pt-4`}>
                            <h6 className="subTitle">Delivary</h6>

                            <div className="form-check">
                                <input className="form-check-input check_box" type="checkbox" value={"data"} id={"b_checkbox"} onChange={() => setSameBillingAddress(!sameBillingAddress)} />
                                <label className="form-check-label check_box_label mb-3" for="b_checkbox">
                                    My billing address is the same
                                </label>
                            </div>
                            <div className={`${sameBillingAddress ? "d-none" : "d-block"} `}>
                                <div className="d-flex gap-3">
                                    <div className="w-100 form-floating mb-3">
                                        <input
                                            type="text"
                                            className="form-control primary-input"
                                            id="floatingInput"
                                            placeholder="name@example.com"
                                            {...register("b_firstName", {
                                                required: sameBillingAddress ? false : true,
                                            })}
                                        />
                                        <label for="floatingInput">First Name</label>
                                        {errors.b_firstName?.type === "required" && <span className="text-danger ">First name is required</span>}
                                    </div>

                                    <div className="w-100 form-floating mb-3">
                                        <input
                                            type="text"
                                            className="form-control primary-input"
                                            id="floatingInput"
                                            placeholder="name@example.com"
                                            {...register("b_lastName", {
                                                required: sameBillingAddress ? false : true,
                                            })}
                                        />
                                        <label for="floatingInput">Last Name</label>
                                        {errors.b_lastName?.type === "required" && <span className="text-danger ">Last name is required</span>}
                                    </div>
                                </div>

                                <div className="form-floating mb-3">
                                    <input
                                        type="text"
                                        className="form-control primary-input"
                                        id="floatingInput"
                                        placeholder="name@example.com"
                                        {...register("b_society", {
                                            required: sameBillingAddress ? false : true,
                                        })}
                                    />
                                    <label for="floatingInput">Society</label>
                                    {errors.b_society?.type === "required" && <span className="text-danger ">Society is required</span>}
                                </div>

                                <div className="form-floating mb-3">
                                    <input
                                        type="text"
                                        className="form-control primary-input"
                                        id="floatingInput"
                                        placeholder="name@example.com"
                                        {...register("b_address", {
                                            required: sameBillingAddress ? false : true,
                                        })}
                                    />
                                    <label for="floatingInput">Address</label>
                                    {errors.b_address?.type === "required" && <span className="text-danger ">Address is required</span>}
                                </div>

                                <div className="form-floating mb-3">
                                    <input
                                        type="text"
                                        className="form-control primary-input"
                                        id="floatingInput"
                                        placeholder="name@example.com"
                                        {...register("b_additional_address", {
                                            required: sameBillingAddress ? false : true,
                                        })}
                                    />
                                    <label for="floatingInput">Additional Address</label>
                                    {errors.b_additionalAddress?.type === "required" && <span className="text-danger ">Additional Address is required</span>}
                                </div>

                                <div className="d-flex gap-3">
                                    <div className="w-100 form-floating mb-3">
                                        <input
                                            type="text"
                                            className="form-control primary-input"
                                            id="floatingInput"
                                            placeholder="name@example.com"
                                            {...register("b_postalCode", {
                                                required: sameBillingAddress ? false : true,
                                            })}
                                        />
                                        <label for="floatingInput">Postal code</label>
                                        {errors.b_postalCode?.type === "required" && <span className="text-danger ">Postal code is required</span>}
                                    </div>

                                    <div className="w-100 form-floating mb-3">
                                        <input
                                            type="text"
                                            className="form-control primary-input"
                                            id="floatingInput"
                                            placeholder="name@example.com"
                                            {...register("b_city", {
                                                required: sameBillingAddress ? false : true,
                                            })}
                                        />
                                        <label for="floatingInput">City</label>
                                        {errors.b_city?.type === "required" && <span className="text-danger ">City is required</span>}
                                    </div>
                                </div>

                                <div className="form-floating mb-3">
                                    <input
                                        type="text"
                                        className="form-control primary-input"
                                        id="floatingInput"
                                        placeholder="name@example.com"
                                        {...register("b_country", {
                                            required: sameBillingAddress ? false : true,
                                        })}
                                    />
                                    <label for="floatingInput">Country</label>
                                    {errors.b_country?.type === "required" && <span className="text-danger ">Country is required</span>}
                                </div>
                                <div className="form-floating mb-3">
                                    <input
                                        type="text"
                                        className="form-control primary-input"
                                        id="floatingInput"
                                        placeholder="name@example.com"
                                        {...register("b_phone", {
                                            required: sameBillingAddress ? false : true,
                                        })}
                                    />
                                    <label for="floatingInput">Phone</label>
                                    {errors.b_phone?.type === "required" && <span className="text-danger ">Country is required</span>}
                                </div>
                            </div>

                            <div className="form-floating mb-3">
                                <input type="text" className="form-control primary-input" id="floatingInput" placeholder="name@example.com" {...register("comment_on", { required: true })} />
                                <label for="floatingInput">Comment On this Commance</label>
                                {errors.comment_on?.type === "required" && <span className="text-danger ">Comment On this Commance is required</span>}
                            </div>

                            <p className="mb-0 ms-3 pt-4">Do you have a promo code?</p>
                            <div className="form-floating mb-3">
                                <input type="text" className="form-control primary-input" id="floatingInput" placeholder="name@example.com" {...register("promoCode")} />
                                <label for="floatingInput">Promo Code</label>
                            </div>
                        </div>

                        <div className="validateArea">
                            <button type="submit" className="btn">
                                Validate Your Request
                            </button>
                            <p className="">Payment will be made by check or bank transfer</p>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default OrderValidation;
