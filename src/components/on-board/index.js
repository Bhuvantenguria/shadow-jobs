'use client'

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import CommonForm from "../commonForm";
import { candidateOnboardFormControls, initialCandidateAccountFormData, initialCandidateFormData, initialRecruiterFormData, recruiterOnboardFormControls } from "@/utils";
import { createProfile } from "@/actions";
import { useUser } from "@clerk/nextjs";

function OnBoard(){
    const [currentTab , setCurrentTab] = useState('recruiter');
    const [recruiterFormData, setRecruiterFormData] = useState(initialRecruiterFormData);
    const [candidateFormData, setCandidateFormData] = useState(initialCandidateFormData);
    const currentAuthUser = useUser();
    const {user} = currentAuthUser;
    // console.log(user);
    function handleChange(val){
        setCurrentTab(val);
        console.log(currentTab);
    }
    function handleRecuiterFormValid() {
        return (
          recruiterFormData &&
          recruiterFormData.name.trim() !== "" &&
          recruiterFormData.companyName.trim() !== "" &&
          recruiterFormData.companyRole.trim() !== ""
        );
      }
    
      function handleCandidateFormValid() {
        return Object.keys(candidateFormData).every(
          (key) => candidateFormData[key].trim() !== ""
        );
      }
      async function createProfileAction(){
        const data = {
            recruiterInfo : recruiterFormData,
            role : 'recruiter',
            isPremimumUser : false,
            userId : user?.id,
            email : user?.primaryEmailAddress?.emailAddress,
        }
        await createProfile(data,'/onboard');
      }
    return (
        <div className="bg-white">
            <Tabs value={currentTab} onValueChange={handleChange}>
                <div className="w-full" >
                    <div className="flex items-baseline justify-between border-b pb-6 pt-24 " >
                        <h1 className="text-4xl font-bold tracking-light text-gray-900 ">Welcome to Onboarding</h1>
                        <TabsList>
                            <TabsTrigger value = "candidate" >Candidate</TabsTrigger>
                            <TabsTrigger value = "recruiter">Recruiter</TabsTrigger>
                        </TabsList>
                    </div>
                </div>
                <TabsContent value="candidate">
                    <CommonForm 
                    formControls={candidateOnboardFormControls}
                    buttonText={'Onboard as Candidate'}
                    formData={candidateFormData}
                    setFormData={setCandidateFormData} 
                    isBtnDisabled={!handleCandidateFormValid()}/>
                </TabsContent>
                <TabsContent value="recruiter">
                    <CommonForm
                    formControls={recruiterOnboardFormControls}
                    buttonText={'Onboard as recruiter'}
                    formData={recruiterFormData}
                    setFormData={setRecruiterFormData}
                    isBtnDisabled={!handleRecuiterFormValid()} 
                    action={createProfileAction}/>
                </TabsContent>
            </Tabs>
        </div>
    )
}

export default OnBoard;