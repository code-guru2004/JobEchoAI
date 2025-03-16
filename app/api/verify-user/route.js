import { db } from "@/utils/db";
import { UsersTable } from "@/utils/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function POST(req){
    const {user} = await req.json();
    try {
        // console.log(user?.p);
        
            const isUserExist = await db.select().from(UsersTable).where(eq(UsersTable.email,user?.primaryEmailAddress?.emailAddress));

            //console.log(isUserExist[0]);
            if(isUserExist?.length === 0){
                //console.log("We need to insert");
                const newUser = await db.insert(UsersTable).values({
                    name: user?.fullName,
                    email: user?.primaryEmailAddress?.emailAddress,
                    imageUrl:user?.imageUrl,
                }).returning({UsersTable})
                console.log(newUser[0]);
                return NextResponse.json({result:newUser[0].UsersTable})
            }
            return NextResponse.json({result:isUserExist[0]})
    }
    catch (error) {
        return NextResponse.json({error:error})
    }
}