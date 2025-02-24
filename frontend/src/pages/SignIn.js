// import React, { useContext, useState } from "react";
// import loginIcon from "../assest/signin.gif"; // corrected typo: from 'assest' to 'assets'
// import { FaEye, FaEyeSlash } from "react-icons/fa";
// import { Link, useNavigate } from "react-router-dom";
// import SummaryApi from "../common/API";
// import { toast } from "react-toastify";
// import context from "../context/Context";

// const SignIn = () => {
//   const [showPassword, setShowPassword] = useState(false);

//   //to store user data input through login
//   const [data, setData] = useState({
//     email: "guest@gmail.com",
//     password: "guest",
//   });

//   const navigate = useNavigate();
//   const { userDetail, fetchAddToWishListCount } = useContext(context);

//   // console.log("User Context : ", userContext)

//   const handleOnChange = (e) => {
//     const { name, value } = e.target;

//     setData((prev) => {
//       return {
//         ...prev,
//         [name]: value,
//       };
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const dataResponse = await fetch(SummaryApi.signIn.url, {
//       method: SummaryApi.signIn.method,
//       credentials: "include",
//       headers: {
//         "content-type": "application/json",
//       },
//       body: JSON.stringify(data),
//     });

//     const dataApiResponse = await dataResponse.json();

//     if (dataApiResponse.success) {
//       toast.success(dataApiResponse.message);
//       userDetail();
//       fetchAddToWishListCount()
//       navigate("/");
//     } else {
//       toast.error(dataApiResponse.message);
//     }
//   };

//   // console.log(data)

//   return (
//     <section id="signin" className="py-12">
//       <div className="container py-2">
//         <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md mx-auto">
//           <h1 className="text-5xl mb-4 text-gray-500 underline text-center">
//             Sign In
//           </h1>
//           <div className="flex justify-center mb-6">
//             <img src={loginIcon} alt="login icon" className="w-24 h-24" />
//           </div>
//           <form className="space-y-6" onSubmit={handleSubmit}>
//             <div>
//               <label className="block text-sm font-semibold text-gray-700 mb-1">
//                 Email
//               </label>
//               <div className="relative">
//                 <input
//                   type="email"
//                   placeholder="Enter your email"
//                   name="email"
//                   value={data.email}
//                   onChange={handleOnChange}
//                   className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:outline-none transition duration-150"
//                 />
//               </div>
//             </div>
//             <div>
//               <label className="block text-sm font-semibold text-gray-700 mb-1">
//                 Password
//               </label>
//               <div className="relative flex items-center">
//                 <input
//                   type={showPassword ? "text" : "password"}
//                   placeholder="Enter your password"
//                   name="password"
//                   value={data.password}
//                   onChange={handleOnChange}
//                   className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:outline-none transition duration-150"
//                 />
//                 <div
//                   className="absolute right-3 text-xl text-gray-600 cursor-pointer"
//                   onClick={() => setShowPassword((prev) => !prev)}
//                 >
//                   {showPassword ? <FaEyeSlash /> : <FaEye />}
//                 </div>
//               </div>
//               <Link
//                 to={"/forgot-password"}
//                 className="block text-sm w-fit hover:text-blue-600 hover:underline mt-2 ml-auto"
//               >
//                 Forgot password?
//               </Link>
//             </div>
//             <button className="w-full block max-w-[150px] mx-auto bg-blue-600 text-white py-3 rounded-full font-semibold hover:bg-red-800 hover:scale-110 transition duration-150">
//               Sign In
//             </button>
//           </form>
//           <p className="my-4 block mx-auto text-md w-fit ">
//             Don't have an account?{" "}
//             <Link to={"/signup"} className="hover:text-blue-600 hover:underline">
//               Sign Up
//             </Link>{" "}
//           </p>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default SignIn;




import React, { useContext, useState } from "react";
import loginIcon from "../assest/signin.gif"; // Correction du chemin d'accès
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import SummaryApi from "../common/API";
import { toast } from "react-toastify";
import context from "../context/Context";
import styled from "styled-components";

// Styled Components
const SignInContainer = styled.section`
  background-color: #f9f9f9;
  padding: 80px 20px;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SignInBox = styled.div`
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  padding: 40px;
  width: 100%;
  max-width: 400px;
  text-align: center;
`;

const SignInTitle = styled.h1`
  font-size: 32px;
  font-weight: 600;
  color: #333;
  margin-bottom: 20px;
`;

const LoginIcon = styled.img`
  width: 100px;
  height: 100px;
  margin-bottom: 20px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Label = styled.label`
  font-size: 14px;
  font-weight: 500;
  color: #555;
  text-align: left;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 14px;
  color: #333;
  outline: none;
  transition: border-color 0.3s, box-shadow 0.3s;

  &:focus {
    border-color: orange;
    box-shadow: 0 0 0 3px rgba(255, 165, 0, 0.2);
  }
`;

const PasswordToggle = styled.div`
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: #666;
  cursor: pointer;
  transition: color 0.3s;

  &:hover {
    color: orange;
  }
`;

const ForgotPasswordLink = styled(Link)`
  font-size: 14px;
  color: #666;
  text-align: right;
  text-decoration: none;
  transition: color 0.3s;

  &:hover {
    color: orange;
    text-decoration: underline;
  }
`;

const SignInButton = styled.button`
  width: 100%;
  padding: 12px;
  background-color: orange;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.3s;

  &:hover {
    background-color: darkorange;
    transform: translateY(-2px);
  }
`;

const SignUpPrompt = styled.p`
  font-size: 14px;
  color: #666;
  margin-top: 20px;
`;

const SignUpLink = styled(Link)`
  color: orange;
  text-decoration: none;
  transition: color 0.3s;

  &:hover {
    color: darkorange;
    text-decoration: underline;
  }
`;

const SignIn = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [data, setData] = useState({
    email: "guest@gmail.com",
    password: "guest",
  });

  const navigate = useNavigate();
  const { userDetail, fetchAddToWishListCount } = useContext(context);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const dataResponse = await fetch(SummaryApi.signIn.url, {
      method: SummaryApi.signIn.method,
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const dataApiResponse = await dataResponse.json();

    if (dataApiResponse.success) {
      toast.success(dataApiResponse.message);
      userDetail();
      fetchAddToWishListCount();
      navigate("/");
    } else {
      toast.error(dataApiResponse.message);
    }
  };

  return (
    <SignInContainer>
      <SignInBox>
        <SignInTitle>Sign In</SignInTitle>
        <Form onSubmit={handleSubmit}>
          <InputContainer>
            <Label>Email</Label>
            <Input
              type="email"
              placeholder="Enter your email"
              name="email"
              value={data.email}
              onChange={handleOnChange}
            />
          </InputContainer>
          <InputContainer>
            <Label>Password</Label>
            <div style={{ position: "relative" }}>
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                name="password"
                value={data.password}
                onChange={handleOnChange}
              />
              <PasswordToggle onClick={() => setShowPassword((prev) => !prev)}>
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </PasswordToggle>
            </div>
            <ForgotPasswordLink to="/forgot-password">
              Forgot password?
            </ForgotPasswordLink>
          </InputContainer>
          <SignInButton type="submit">Sign In</SignInButton>
        </Form>
        <SignUpPrompt>
          Don't have an account?{" "}
          <SignUpLink to="/signup">Sign Up</SignUpLink>
        </SignUpPrompt>
      </SignInBox>
    </SignInContainer>
  );
};

export default SignIn;