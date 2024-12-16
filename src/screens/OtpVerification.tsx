import {  useState } from "react";
import loginImage from '../assets/AuthPage.jpeg'
import { useFormik } from 'formik';
import AuthWrapper from "../shared/auth/auth-wrapper";
import {  Button, Input, Text, Title } from "rizzui";

export interface UserInfoType {
    email: string,
    fName: string,
    lName: string,
    token: string
}

interface FormValues {
    otp: number | string
}

const OtpVerification = () => {
    const [ loading, setLoading ] = useState<boolean>(false);
    const [message, setMessage ] = useState<string>('');

   
    
    const formik = useFormik<FormValues>({
        initialValues: {
            otp: ''
        },
        onSubmit:async (values: FormValues) => {
            if(values.otp.toString().length<4){
                setMessage("Otp Must be Greater than 4");
                return
            }
            setLoading(true);
            
            // compareOtp(userInfo, values.otp)
            // .then((res) => {

            //     if(res.message === 'Otp Verified' && res.verifiedUser.verified === true){
            //         localStorage.setItem("UserInfo", JSON.stringify(res.verifiedUser));
                    
            //         dispatch(updatePerson(res.verifiedUser))
            //         navigate('/home')
            //     }
            //     else if (res.message === 'Wrong Otp'){
            //         setLoading(false)
            //         setMessage('Wrong Otp')
            //     }
            // })
            // .finally(()=>{
            //     setLoading(false);
            // })
        }
    });

    return (
        <>
        <AuthWrapper pageImage={loginImage}>
        <form className="w-1/3 px-9 py-5  max-md:w-full mx-auto"
                onSubmit={formik.handleSubmit}
            >
                <div className="justify-between max-md:text-center my-6 flex flex-col gap-2">
                    <Title>
                        Verify Otp
                    </Title>
                    <Text className="text-gray-500 " as="span">
                        
                        Enter Otp sent to your Registered Email
                    </Text>
                </div>
                <Input
                    type="text"
                    name="otp"
                    placeholder="0000"
                    className="w-full my-4"
                    required
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.otp}
                    error={message}
                />
                
                <Button isLoading={loading} type="submit" className="w-full"
                >
                    Verify
                </Button>
            </form>

        </AuthWrapper>
        </>

    )
}

export default OtpVerification