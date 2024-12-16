/* eslint-disable @typescript-eslint/no-explicit-any */
import registrationImage from '../assets/AuthPage.jpeg'
import { NavigateFunction, useNavigate } from 'react-router'
import * as yup from 'yup';
import { useFormik } from 'formik';
import { useAppDispatch } from '../store/store';
import { compareOtp, register } from '../actions/userActions';
import { addPerson } from '../store/Features/userSlice';
import { useState } from 'react';
import AuthWrapper from '../shared/auth/auth-wrapper';
import {  Button, Input, Password, Text, Title } from 'rizzui';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

interface FormValues {
    fName: string;
    lName: string;
    email: string;
    password:string;
    date: Date;
}

const RegistrationPage = () => {
    const navigate: NavigateFunction = useNavigate();
    const [id, setId] = useState<string>('');
    const [passwordError,setPasswordError] = useState('');

    const [loading, setLoading] = useState<boolean>(false);
    const dispatch = useAppDispatch();
    const [mailSent, setMailSent] = useState<boolean>(false);

    const registrationSchema = yup.object({
        fName: yup.string().min(4, 'First Name Should be mininum 4 characters').required('First name is required'),
        lName: yup.string().min(1, 'Last Name Should be mininum 1 characters').required('Last name is required'),
        email: yup.string().email('Invalid email format').required('Email is required'),

        password: yup.string().max(5)
    });

    const formik = useFormik<FormValues>({
        initialValues: {
            fName: '',
            lName: '',
            email: '',
            password: '',
            date: new Date(),
        },
        validationSchema: registrationSchema,
        onSubmit: (values: FormValues) => {
           
            if(mailSent){
                if(!values.password){
                    setPasswordError("Otp is Required")
                    return;
                }
                if(values.password.length!=4){
                    setPasswordError("Otp Must Be  4 Characters")
                    return;
                }
                compareOtp(id,values.password)
                .then((res)=>{
                    toast.success("Logged In Successfully");
                    localStorage.setItem("token",res.data?.verifiedUser?.token);
                    localStorage.setItem("UserInfo", JSON.stringify(res.data?.verifiedUser));
                    dispatch(addPerson(res?.data?.verifiedUser)) 
                    navigate('/home')
                })
                .catch((err)=>{
                    // setPasswordError("Incorrect Otp")
                    setPasswordError(err.response?.data?.message || 'Incorrect Otp')
                    console.error(err)
                })
            }
            else{
                setLoading(true);
                register(values).then((response) => {
                    console.log(response,"wertewfr")
                    dispatch(addPerson(response.data));
                    setMailSent(true);
                    setId(response.data.user._id);
                    toast.success("Otp Sent")
                    // navigate('/otp-verification')
                })
                .catch((err)=>{
                    console.log("error boy",err)
                    // setMessage(err?.response?.data?.error || err?.message);
                    toast.error(err?.response?.data?.error)
                })
                .finally(()=>setLoading(false));
             
            }
          
        }
    });

    return (
        <>
        <AuthWrapper pageImage={registrationImage}>
            <form
                onSubmit={formik.handleSubmit}
                className="w-1/3 px-9 py-5  max-md:w-full mx-auto flex gap-4 flex-col">
                <div className="justify-between max-md:text-center my-6 flex flex-col gap-2">
                    <Title>
                        Sign Up
                    </Title>
                    <Text className="text-gray-500 " as="span">
                        Sign Up to Access full features of HD
                    </Text>
                </div>
                <div className="flex gap-4">
                <Input
                    type="text"
                    name="fName"
                    label="First Name"
                    placeholder="Ulrich"
                    className="w-1/2"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.fName}
                    error={formik.touched.fName? formik.errors.fName:''}
                />
                  <Input
                    type="text"
                    name="lName"
                    label="Last Name"
                    placeholder="Neilson"
                    className="w-1/2"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.lName}
                    error={formik.touched.lName ? formik.errors.lName:''}
                />
                </div>
                <Input
                    type="email"
                    name="email"
                    label="Email"
                    placeholder="jonhaskhanwald@hotmail.co"
                    className="w-full"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.email}
                    error={formik.touched.email? formik.errors.email :''}
                />  
                 <Input
            type="date"
            label="Date"
            required
            />         
                <div className="relative">
                {mailSent && 
                    <Password
                        label="Pin"
                        name="password"
                        placeholder="Enter Password"
                        className="w-full"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.password}
                        error={passwordError}
                    />
                }
                </div>
                <Button isLoading={loading} type="submit" className="w-full p-2 mt-4 ">
                {mailSent?"Verify Otp":"Sign Up"}
                </Button>
                
                    <Text as="small" className="w-full text-gray-500 flex md:justify-center mt-2"

                >
                   Already have an Account?{" "} &nbsp; <Link to={'/'} className="text-primary">Sign In </Link>
                </Text>
            </form>
        </AuthWrapper>
        </>

    )
}

export default RegistrationPage