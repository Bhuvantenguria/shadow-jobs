import { currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation';
import React from 'react'

async function Home() {
  const user = await currentUser();
  console.log(user);
  const profileInfo = null;
  if(user && !profileInfo?._id){
    redirect('/onboard');
  }
  return (
    <section>
      Main Content
    </section>
  )
}

export default Home