import React, { useEffect, useState } from "react";
import { FaUser } from "react-icons/fa";
import { FaKey } from "react-icons/fa6";
import { MdOutlineMailOutline } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { loginUserThunk } from "../../store/slice/user/userThunk";

const Login = () => {
  const [activeTab, setActiveTab] = useState("password"); // 'password' or 'otp'

  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
    mobile: "",
    otp: "",
  });

  //   const dispatch = useDispatch();
  //   const navigate = useNavigate();
  //   const { isAuthenticated } = useSelector((state) => state.userReducer);

  const handleInputChange = (e) => {
    setLoginData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  //   const handleLogin = async () => {
  //     const response = await dispatch(loginUserThunk(loginData));
  //     if (response?.payload?.success) {
  //       navigate("/");
  //     }
  //   };

  //   useEffect(() => {
  //     if (isAuthenticated) {
  //       navigate("/");
  //     }
  //   }, [isAuthenticated]);

  return (
    <div className="flex justify-center items-center p-10 min-h-screen">
      <div className="h-full flex max-w-[40rem] w-full flex-col gap-6 bg-base-300 rounded-lg p-6">
        <h2 className="text-2xl text-center font-semibold">Login</h2>

        <div className="flex justify-center gap-4">
          <button
            className={`btn ${activeTab === "password" ? "btn-neutral" : ""}`}
            onClick={() => setActiveTab("password")}
          >
            Email & Password
          </button>
          <button
            className={`btn ${activeTab === "otp" ? "btn-neutral" : ""}`}
            onClick={() => setActiveTab("otp")}
          >
            Mobile & OTP
          </button>
        </div>

        {activeTab === "password" && (
          <>
            <label className="input flex items-center gap-2 w-full">
              <MdOutlineMailOutline />
              <input
                type="text"
                name="username"
                className="grow"
                placeholder="Email or Username"
                onChange={handleInputChange}
              />
            </label>
            <label className="input flex items-center gap-2 w-full">
              <FaKey />
              <input
                type="password"
                name="password"
                className="grow"
                placeholder="Password"
                onChange={handleInputChange}
              />
            </label>
          </>
        )}

        {activeTab === "otp" && (
          <>
            <label className="input flex items-center gap-2 w-full">
              <FaUser />
              <input
                type="text"
                name="mobile"
                className="grow"
                placeholder="Mobile Number"
                onChange={handleInputChange}
              />
            </label>
            <label className="input flex items-center gap-2 w-full">
              <RiLockPasswordLine />
              <input
                type="text"
                name="otp"
                className="grow"
                placeholder="OTP"
                onChange={handleInputChange}
              />
            </label>
          </>
        )}

        <button className="btn btn-neutral w-full">
          Login
        </button>

        <p className="text-center">
          Don't have an account?{" "}
          <Link className="text-blue-500 underline" to="/register">
            Create a new account
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
