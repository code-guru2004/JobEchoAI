"use client";
import { BadgeAlert } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import FileUpload from "./FileUpload";
import { toast } from "sonner";
import { chatSession } from "@/utils/GeminiAI";
import { db } from "@/utils/db";
import { MockInterview, ResumeScanDetails } from "@/utils/schema";
import { useUser } from "@clerk/nextjs";
import moment from "moment";
import { useRouter } from "next/navigation";
import { v4 as uuidv4 } from 'uuid';

function AddNewInterview() {
  const {user} = useUser();
  const route = useRouter();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState(null);
  const [yearsOfExp, setYearsOfExp] = useState("0");
  const [skills, setsetskills] = useState([]);
  const [allSkills, setAllSkills] = useState("");
  const [jsonResponse , setJsonResponse] = useState([]);

  const handleFileChange = (file) => {
    setFile(file);
    //console.log("File in Parent:", file);
  };

  const handelClick =()=>{
    setLoading(true)
    if(file===null){
      setLoading(false)
      toast("🛑 You don't upload any PDF.", {
        description: "📁 Please upload Resume/CV.",
      })
    }
    if (file&&file.type !== "application/pdf") {
      toast("🛑 Invalide File Format.", {
        description: "📁 Please upload Resume/CV in PDF.",
      })
      setLoading(false)
      return;
    }

    if(file!==null){

      
          const fileReader = new FileReader();
      
          fileReader.onload = onLoadFile;
      
          fileReader.readAsArrayBuffer(file);
    }
  }

  const onLoadFile = function () {
    const typedarray = new Uint8Array(this.result);

    // Load the PDF file.
    pdfjsLib.getDocument({ data: typedarray }).promise.then((pdf) => {
      //console.log("PDF loaded");

      // Fetch the first page
      pdf.getPage(1).then((page) => {
        //console.log("Page loaded");
        page.getTextContent().then((textContent) => {
          let text = "";
          textContent.items.forEach((item) => {
            text += item.str + " ";
          });
          GetResumeInfo(text);
        });
      });
    });
  }
   async function GetResumeInfo(text){
    //console.log(text);
    
      const prompt= `Extract only skills or technical skills as skills named array and year of experience as experience_years of the candidate from the resume in json format:\n\n${text}`
       //console.log(prompt);
      
      const result = await chatSession.sendMessage(prompt);
      //result&&console.log(result?.response);
      
      const MockJSONres = (result.response.text()).replace('```json','').replace('```','');

      if(MockJSONres){
        //console.log(MockJSONres);
        
        const resp = JSON.parse(MockJSONres);
        //console.log(resp);
        setYearsOfExp(resp?.experience_years)
        setsetskills(resp?.skills)
      }
    }
    // useEffect(() => {
    //   console.log(yearsOfExp);
      
    // }, [yearsOfExp]);

    useEffect(() => {
      let skill=skills[0]
      for(let i=1 ; i<skills.length ; i++){
        skill = skill + ", " + skills[i]
      }
      //console.log(skill);
      setAllSkills(skill)
    }, [skills]);

    useEffect(()=>{
      insertDB()
      if(allSkills!==""){
        generateInterviewQuestions();
      }
    },[allSkills,yearsOfExp]);

    const insertDB=async()=>{
    
      if(allSkills!==""){

        const res = await db.insert(ResumeScanDetails).values({
          email: user?.primaryEmailAddress?.emailAddress,
          skill: allSkills,
          yearOfExp:yearsOfExp,
          createdAt: moment().format('DD-MM-YYYY'),
          scanId: uuidv4()
        }).returning({scanId: ResumeScanDetails.scanId});
      }
    }

    const generateInterviewQuestions = async()=>{
      

        const InputPrompt="Job Description: "+allSkills+" , Year of Experience: "+yearsOfExp+". Depends on the information please give me "+process.env.NEXT_PUBLIC_QUESTION_COUNT+" interview asked questions with proper answers in JSON Format. Give question and answers as field in JSON."
      
        //console.log("Prompt",InputPrompt);
        
        const result = await chatSession.sendMessage(InputPrompt);
        const MockJSONres = (result.response.text()).replace('```json','').replace('```','');
      
      if(MockJSONres){
        setJsonResponse(MockJSONres)

        //console.log(jsonResponse);

        const res = await db.insert(MockInterview).values({
          mockId:uuidv4(),
          jsonMockResp:MockJSONres,
          jobDescription:allSkills,
          jobExperience:yearsOfExp,
          createdBy:user?.primaryEmailAddress?.emailAddress,
          createdAt:moment().format('DD-MM-YYYY'),
        }).returning({mockId: MockInterview.mockId});

        //console.log("Inserted Mock Id: ",res);

        if(res){
          setOpen(false);
          route.push(`/dashboard/interview/${res[0]?.mockId}`)
        }
        
      }
    }
  return (
    <div>
      <div
        className="p-10 border rounded-lg bg-secondary hover:scale-105 hover:shadow-md cursor-pointer transition-all flex flex-col items-center justify-between"
        onClick={() => {
          setOpen(true);
          setLoading(false);
        }}
      >
        <h2 className="font-bold text-lg text-center">+ Add New</h2>
        <p className="text-xs flex items-center gap-1">
          <BadgeAlert className="text-sm text-red-600 w-5" /> Upload Your Resume
          Here
        </p>
      </div>
      <Dialog open={open} onOpenChange={() => setOpen(!open)} >
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Upload Resume</DialogTitle>
            <DialogDescription>
              Upload resume in Pdf format here
            </DialogDescription>
          </DialogHeader>

          <FileUpload onFileSelect={handleFileChange} />
          
          <DialogFooter>
            <Button onClick={handelClick} disabled={loading} className="w-full cursor-pointer">
              {loading ? "Scaning Your Resume..." : "Scan Resume/CV"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default AddNewInterview;
