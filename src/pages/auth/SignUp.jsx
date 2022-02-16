import swal from "@sweetalert/with-react";
import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import CardRoundImage from "../../assets/images/group 23.png";
import { UserContextData } from "../../Context/UserContext";
import { apiBaseURL } from "../../Util/API_Info";
import Authentication from "../../Util/Authentication";

const SignUp = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const navigate = useNavigate();
    const [isSpinnerShow, setIsSpinnerShow] = useState(false);
    const { setFormFilledDataForSignUp, formFilledDataForSignUp: userData_f } = useContext(UserContextData);
    const [isTypePassword, setIsTypePassword] = useState(true);

    const onSubmit = async (data) => {
        setIsSpinnerShow(true);
        setFormFilledDataForSignUp({
            username: data?.username,
            password: data?.password,
            confirmPassword: data?.confirmPassword,
            email: data?.email,
            firstname: data?.firstName,
            lastname: data?.lastName,
            address: data?.address,
            additional_address: data?.additional_address,
            society: data?.society,
            phone: data?.phone,
            city: data?.city,
            ambassador_code: data?.ambassador_code,
            postalCode: data?.postalCode,
        });

        fetch(`${apiBaseURL}/api/auth/send-email`, {
            method: "POST",
            headers: {
                "content-type": "application/JSON",
            },
            body: JSON.stringify({ email: data?.email }),
        })
            .then((res) => res.json())
            .then((data) => {
                setIsSpinnerShow(false);
                navigate(`/verify-profile/${data._id}/${encodeURIComponent(data.code)}/`);
            })
            .catch((e) => swal("Failed to send Verification email", e.message, "error"));
    };

    useEffect(() => {
        document.title = "Signup Onecard Pro";
    }, []);

    return (
        <div id="signup_area">
            <div className="container">
                <div className="row">
                    <div className="col-md-10 offset-md-1">
                        <div className="modal-content" id="registrationPopup">
                            <div className="fCard">
                                <img src={CardRoundImage} className="img-fluid" alt="" />
                            </div>

                            <form action="" onSubmit={handleSubmit(onSubmit)}>
                                <h2 className="title mb-4 mt-5">Registration</h2>

                                <div className="d-flex gap-3 mb-5">
                                    <div className="w-100 form-floating mt-3 ">
                                        <input
                                            defaultValue={userData_f?.firstname}
                                            type="text"
                                            {...register("firstName", { required: true })}
                                            className="form-control unFatty-input"
                                            id="floatingInput44"
                                            placeholder="name@example.com"
                                        />
                                        <label htmlFor="floatingInput44">First Name</label>
                                        {errors.firstName?.type === "required" && <span className="d-block ps-3 text-danger text-start">First Name is required</span>}
                                    </div>

                                    <div className="w-100 form-floating mt-3 ">
                                        <input
                                            defaultValue={userData_f?.lastname}
                                            type="text"
                                            {...register("lastName", { required: true })}
                                            className="form-control unFatty-input"
                                            id="floatingInput1"
                                            placeholder="name@example.com"
                                        />
                                        <label htmlFor="floatingInput1">Last Name</label>
                                        {errors.lastName?.type === "required" && <span className="d-block ps-3 text-danger text-start">Last Name is required</span>}
                                    </div>
                                </div>

                                <div className="form-floating my-4 mb-5 ">
                                    <input
                                        defaultValue={userData_f?.email}
                                        type="email"
                                        {...register("email", { required: true })}
                                        className="form-control unFatty-input"
                                        id="floatingInput2"
                                        placeholder="name@example.com"
                                    />
                                    <label htmlFor="floatingInput2">Email *</label>
                                    {errors.email?.type === "required" && <span className="d-block ps-3 text-danger text-start">Email is required</span>}
                                </div>
                                <div className="form-floating my-4 mb-5 ">
                                    <input
                                        type="text"
                                        defaultValue={userData_f?.username}
                                        {...register("username", { required: true })}
                                        name="username"
                                        className="form-control unFatty-input"
                                        id="floatingInput5"
                                        placeholder="name@example.com"
                                    />
                                    <label htmlFor="floatingInput5">Username</label>
                                    {errors.username?.type === "required" && <span className="d-block ps-3 text-danger text-start">Username is required</span>}
                                </div>

                                <div className="d-flex gap-4 my-4 flex-wrap">
                                    <div style={{ width: "48.2%" }} className="form-floating">
                                        <input
                                            defaultValue={userData_f?.password}
                                            type={isTypePassword ? "password" : "text"}
                                            {...register("password", { required: true })}
                                            className="form-control unFatty-input"
                                            id="floatingPassword45"
                                            placeholder="Password"
                                        />
                                        <label htmlFor="floatingPassword45">Password *</label>
                                        {errors.password?.type === "required" && <span className="d-block ps-3 text-danger text-start">Password is required</span>}
                                    </div>
                                    <div style={{ width: "48.2%" }} className="form-floating">
                                        <input
                                            defaultValue={userData_f?.confirmPassword}
                                            type={isTypePassword ? "password" : "text"}
                                            {...register("confirmPassword", { required: true })}
                                            className="form-control unFatty-input"
                                            id="floatingPassword76"
                                            placeholder="Password"
                                        />
                                        <label htmlFor="floatingPassword76">Re-Password *</label>
                                        {errors.confirmPassword?.type === "required" && <span className="d-block ps-3 text-danger text-start">Re-Password is required</span>}
                                    </div>
                                    <div className="w-100 text-start">
                                        <input type="checkbox" defaultChecked={!isTypePassword} id="show-password" onChange={(e) => setIsTypePassword(!e.currentTarget.checked)} />{" "}
                                        <label htmlFor="show-password"> Show Password</label>
                                    </div>
                                </div>

                                <div className="d-flex gap-3">
                                    <div className="w-100 form-floating my-3">
                                        <input
                                            defaultValue={userData_f?.society}
                                            type="text"
                                            {...register("society", { required: true })}
                                            className="form-control unFatty-input"
                                            id="floatingPassword123"
                                            placeholder="Password"
                                        />
                                        <label htmlFor="floatingPassword123">Society</label>
                                        {errors.society?.type === "required" && <span className="d-block ps-3 text-danger text-start">Society is required</span>}
                                    </div>

                                    <div className="w-100 form-floating my-3">
                                        <input
                                            defaultValue={userData_f?.phone}
                                            type="tel"
                                            {...register("phone", { required: true })}
                                            className="form-control unFatty-input"
                                            id="floatingPassword786"
                                            placeholder="Password"
                                        />
                                        <label htmlFor="floatingPassword786">Phone</label>
                                        {errors.phone?.type === "required" && <span className="d-block ps-3 text-danger text-start">Phone is required</span>}
                                    </div>
                                </div>

                                <div className="form-floating my-4 mb-5">
                                    <input
                                        defaultValue={userData_f?.address}
                                        type="text"
                                        {...register("address", { required: true })}
                                        className="form-control unFatty-input"
                                        id="floatingPassword2324"
                                        placeholder="Password"
                                    />
                                    <label htmlFor="floatingPassword2324">Address</label>
                                    {errors.address?.type === "required" && <span className="d-block ps-3 text-danger text-start">Address is required</span>}
                                </div>

                                <div className="form-floating my-4">
                                    <input
                                        defaultValue={userData_f?.additional_address}
                                        type="text"
                                        {...register("additional_address", { required: false })}
                                        className="form-control unFatty-input"
                                        id="floatingPassword127"
                                        placeholder="Password"
                                    />
                                    <label htmlFor="floatingPassword127">Additional Address</label>
                                </div>

                                <div className="d-flex gap-3">
                                    <div className="w-100 form-floating my-4">
                                        <input
                                            defaultValue={userData_f?.postalCode}
                                            type="text"
                                            {...register("postalCode", { required: true })}
                                            className="form-control unFatty-input"
                                            id="floatingPassword48"
                                            placeholder="Password"
                                        />
                                        <label htmlFor="floatingPassword48">Postal code</label>
                                        {errors.postalCode?.type === "required" && <span className="d-block ps-3 text-danger text-start">Postal Code is required</span>}
                                    </div>

                                    <div className="w-100 form-floating my-4">
                                        <input
                                            defaultValue={userData_f?.city}
                                            type="text"
                                            {...register("city", { required: true })}
                                            className="form-control unFatty-input"
                                            id="floatingPass324"
                                            placeholder="Password"
                                        />
                                        <label htmlFor="floatingPass324">City</label>
                                        {errors.city?.type === "required" && <span className="d-block ps-3 text-danger text-start">City is required</span>}
                                    </div>
                                </div>

                                <div>
                                    <p className="text-start my-0 ms-3">Do you have an ambassador code ?</p>
                                    <div className="form-floating my-3">
                                        <input
                                            defaultValue={userData_f?.ambassador_code}
                                            type="text"
                                            {...register("ambassador_code", { required: false })}
                                            className="form-control unFatty-input"
                                            id="floatingPassword39"
                                            placeholder="Password"
                                        />
                                        <label htmlFor="floatingPassword39">Ambassador Code</label>
                                        {errors.ambassador_code?.type === "required" && <span className="d-block ps-3 text-danger text-start">Ambassador Code is required</span>}
                                    </div>
                                </div>

                                <div className="validateBtn">
                                    <button className="btn d-inline-flex align-items-center ">
                                        {isSpinnerShow && (
                                            <div className="spinner-border spinner-border-sm me-3" role="status">
                                                <span className="visually-hidden">Loading...</span>
                                            </div>
                                        )}
                                        Register
                                    </button>
                                    <p>
                                        Already Have an Account ? <a href="/login">Login</a>
                                    </p>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignUp;
