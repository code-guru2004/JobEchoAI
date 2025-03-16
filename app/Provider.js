'use client'
import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import axios from "axios";
import { UserDeatilsContext } from "./_context/UserDetailsContext";
import { toast } from "sonner";


export default function Provider({children}){
    const {user} = useUser();
    //console.log("user",user?.user);
    
    const [userDetails, setUserDetails] = useState(null)

    useEffect(()=>{
        user&&verifyUser();
    },[user])
    
   const verifyUser=async () =>{
           // console.log(user);
            try {
                const resp = await axios.post('/api/verify-user.js',{
                    user:user,
                });
                console.log(resp);
            } catch (error) {
                //console.log(error);
                
            }
           

            // if(resp){

            //     //console.log("Provider",resp?.data?.result);
            //     setUserDetails(resp?.data?.result);
            // }

    }
    return (
        <UserDeatilsContext.Provider value={{userDetails,setUserDetails}}>
            {children}
        </UserDeatilsContext.Provider>
    )
}