// import React from "react";
// import loginIcon from "../assest/signin.gif"; // corrected typo: from 'assest' to 'assets'
// import { FaEye, FaEyeSlash } from "react-icons/fa";
// import { Link, useNavigate } from "react-router-dom";
// import imageToBase64 from "../helpers/imageToBase64"

// import { useState } from "react";
// import SummaryApi from "../common/API";
// import { toast } from "react-toastify";

// const SignUp = () => {
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPwd, setShowConfirmPwd] = useState(false);

//   //to store user data input through login
//   const [data, setData] = useState({
//     name: "",
//     email: "",
//     contact: "",
//     password: "",
//     confirmPwd: "",
//     profilepic: "",
//   });

//   const navigate = useNavigate()

//   const handleOnChange = (e) => {
//     const { name, value } = e.target;

//     setData((prev) => {
//       return {
//         ...prev,
//         [name]: value,
//       };
//     });
//   };

//   const handleUploadPic = async (e) =>{
//     const file = e.target.files[0]

//     const image = await imageToBase64(file)

//     // console.log("Image ",image)

//     setData((prev) => {
//       return {
//         ...prev,
//         profilepic: image
//       };
//     });


//   }

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if(data.password === data.confirmPwd){
//       const dataResponse = await fetch(SummaryApi.signUp.url, {
//         method : SummaryApi.signUp.method,
//         headers : {
//           "content-type" : "application/json"
//         },
//         body : JSON.stringify(data)
//       })
  
//       const dataApiResponse = await dataResponse.json()

//       if(dataApiResponse.success){
//         toast.success(dataApiResponse.message)
//         navigate("/signin")
//       }
//       if(dataApiResponse.error){
//         toast.error(dataApiResponse.message)
//       }
//     }else{
//       toast.error("Passwords do not match. Please verify and enter again.")
//     }

    
//   };

//   // console.log(data);

//   return (
//     <section id="signin" className="py-8">
//       <div className="container py-2">
//         <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md mx-auto">
//           <h1 className="text-5xl mb-4 text-gray-500 underline text-center">
//             Sign Up
//           </h1>
//           <div className="w-24 h-24 mx-auto relative rounded-full overflow-hidden">
//             <div>
//               <img src={data.profilepic || loginIcon} alt="login icon" />
//             </div>
//             <form>
//               <label>
//                 <div className="text-xs bg-slate-200 bg-opacity-70 pb-4 pt-2 cursor-pointer absolute py-4 bottom-0 w-full text-center ">
//                   Upload Profile
//                 </div>
//                 <input type="file" className="hidden" onChange={handleUploadPic}/>
//               </label>
//             </form>
//           </div>
//           <form className="space-y-2" onSubmit={handleSubmit}>
//             <div>
//               <label className="block text-sm font-semibold text-gray-700 mb-1">
//                 Name
//               </label>
//               <div className="relative">
//                 <input
//                   type="text"
//                   placeholder="Enter your name"
//                   name="name"
//                   value={data.name}
//                   onChange={handleOnChange}
//                   className="w-full h-8 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition duration-150"
//                 />
//               </div>
//             </div>
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
//                   className="w-full h-8 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition duration-150"
//                 />
//               </div>
//             </div>
//             <div>
//               <label className="block text-sm font-semibold text-gray-700 mb-1">
//                 Contact
//               </label>
//               <div className="relative">
//                 <input
//                   type="text"
//                   placeholder="Enter your contact "
//                   name="contact"
//                   value={data.contact}
//                   onChange={handleOnChange}
//                   className="w-full h-8 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition duration-150"
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
//                   className="w-full h-8 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition duration-150"
//                 />
//                 <div
//                   className="absolute right-3 text-xl text-gray-600 cursor-pointer"
//                   onClick={() => setShowPassword((prev) => !prev)}
//                 >
//                   {showPassword ? <FaEyeSlash />  :  <FaEye />}
//                 </div>
//               </div>
//             </div>
//             <div>
//               <label className="block text-sm font-semibold text-gray-700 mb-1">
//                 Confirm Password
//               </label>
//               <div className="relative flex items-center">
//                 <input
//                   type={showConfirmPwd ? "text" : "password"}
//                   placeholder="Confirm your password"
//                   name="confirmPwd"
//                   value={data.confirmPwd}
//                   onChange={handleOnChange}
//                   className="w-full h-8 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition duration-150"
//                 />
//                 <div
//                   className="absolute right-3 text-xl text-gray-600 cursor-pointer"
//                   onClick={() => setShowConfirmPwd((prev) => !prev)}
//                 >
//                   {showConfirmPwd ? <FaEyeSlash /> :  <FaEye />}
//                 </div>
//               </div>
//             </div>
//             <button className="w-full block  max-w-[150px] mx-auto bg-blue-600 text-white py-3 rounded-full font-semibold hover:bg-blue-800 hover:scale-110 transition duration-150">
//               Sign Up
//             </button>
//           </form>
//           <p className="my-2 block mx-auto text-md w-fit ">
//             Already have an account?{" "}
//             <Link to={"/signin"} className="hover:text-blue-600 hover:underline">
//               Sign In
//             </Link>{" "}
//           </p>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default SignUp;




import React, { useState } from "react";
import loginIcon from "../assest/signin.gif"; // Correction du chemin d'accès
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import imageToBase64 from "../helpers/imageToBase64";
import SummaryApi from "../common/API";
import { toast } from "react-toastify";
import styled from "styled-components";

// Styled Components
const SignUpContainer = styled.section`
  background-color: #f9f9f9;
  padding: 80px 20px;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SignUpBox = styled.div`
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  padding: 40px;
  width: 100%;
  max-width: 400px;
  text-align: center;
`;

const SignUpTitle = styled.h1`
  font-size: 32px;
  font-weight: 600;
  color: #333;
  margin-bottom: 20px;
`;

const ProfilePictureContainer = styled.div`
  width: 100px;
  height: 100px;
  margin: 0 auto 20px;
  position: relative;
  border-radius: 50%;
  overflow: hidden;
  border: 2px solid orange;
`;

const ProfilePicture = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const UploadLabel = styled.label`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(255, 165, 0, 0.8);
  color: white;
  font-size: 12px;
  padding: 4px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: rgba(255, 140, 0, 0.8);
  }
`;

const UploadInput = styled.input`
  display: none;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
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

const SignUpButton = styled.button`
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

const SignInPrompt = styled.p`
  font-size: 14px;
  color: #666;
  margin-top: 20px;
`;

const SignInLink = styled(Link)`
  color: orange;
  text-decoration: none;
  transition: color 0.3s;

  &:hover {
    color: darkorange;
    text-decoration: underline;
  }
`;

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPwd, setShowConfirmPwd] = useState(false);
  const [data, setData] = useState({
    name: "",
    email: "",
    contact: "",
    password: "",
    confirmPwd: "",
    profilepic: "",
  });

  const navigate = useNavigate();

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUploadPic = async (e) => {
    const file = e.target.files[0];
    const image = await imageToBase64(file);
    setData((prev) => ({
      ...prev,
      profilepic: image,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (data.password === data.confirmPwd) {
      const dataResponse = await fetch(SummaryApi.signUp.url, {
        method: SummaryApi.signUp.method,
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const dataApiResponse = await dataResponse.json();

      if (dataApiResponse.success) {
        toast.success(dataApiResponse.message);
        navigate("/signin");
      }
      if (dataApiResponse.error) {
        toast.error(dataApiResponse.message);
      }
    } else {
      toast.error("Passwords do not match. Please verify and enter again.");
    }
  };

  return (
    <SignUpContainer>
      <SignUpBox>
        <SignUpTitle>Sign Up</SignUpTitle>
        <ProfilePictureContainer>
          <ProfilePicture src={data.profilepic || loginIcon} alt="Profile" />
          <UploadLabel>
            Upload Profile
            <UploadInput type="file" onChange={handleUploadPic} />
          </UploadLabel>
        </ProfilePictureContainer>
        <Form onSubmit={handleSubmit}>
          <InputContainer>
            <Label>Name</Label>
            <Input
              type="text"
              placeholder="Enter your name"
              name="name"
              value={data.name}
              onChange={handleOnChange}
            />
          </InputContainer>
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
            <Label>Contact</Label>
            <Input
              type="text"
              placeholder="Enter your contact"
              name="contact"
              value={data.contact}
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
          </InputContainer>
          <InputContainer>
            <Label>Confirm Password</Label>
            <div style={{ position: "relative" }}>
              <Input
                type={showConfirmPwd ? "text" : "password"}
                placeholder="Confirm your password"
                name="confirmPwd"
                value={data.confirmPwd}
                onChange={handleOnChange}
              />
              <PasswordToggle onClick={() => setShowConfirmPwd((prev) => !prev)}>
                {showConfirmPwd ? <FaEyeSlash /> : <FaEye />}
              </PasswordToggle>
            </div>
          </InputContainer>
          <SignUpButton type="submit">Sign Up</SignUpButton>
        </Form>
        <SignInPrompt>
          Already have an account?{" "}
          <SignInLink to="/signin">Sign In</SignInLink>
        </SignInPrompt>
      </SignUpBox>
    </SignUpContainer>
  );
};

export default SignUp;