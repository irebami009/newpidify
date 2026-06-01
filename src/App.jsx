import React, { useState, useEffect } from 'react'
import { Toaster } from 'react-hot-toast';
import { UserProvider } from "./context/UserContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SplashScreen from './SplashScreen';
import Homepage from './Pages/Homepage'
import PastQuestions from './Pages/PastQuestions'
import Quiz from './Pages/Quiz'
import Register from './Pages/Register'
import Login from './Pages/Login'
import SoftwarePdf from './Pages/Software/SoftwarePdf';
import SoftwarePdf2 from './Pages/Software/SoftwarePdf2';
import SoftwarePdf3 from './Pages/Software/SoftwarePdf3';
import SoftwarePdf4 from './Pages/Software/SoftwarePdf4';
import CyberPdf from './Pages/Cyber Security/CyberPdf';
import CyberPdf2 from './Pages/Cyber Security/CyberPdf2';
import CyberPdf3 from './Pages/Cyber Security/CyberPdf3';
import CyberPdf4 from './Pages/Cyber Security/CyberPdf4';
import CyberPq1 from './Pages/Cyber Security/CyberPq1';
import CyberPq2 from './Pages/Cyber Security/CyberPq2';
import CyberPq3 from './Pages/Cyber Security/CyberPq3';
import CyberPq4 from './Pages/Cyber Security/CyberPq4';
import ComputerPq1 from './Pages/Computer/ComputerPq1';
import ComputerPq2 from './Pages/Computer/ComputerPq2';
import ComputerPq3 from './Pages/Computer/ComputerPq3';
import ComputerPq4 from './Pages/Computer/ComputerPq4';
import MicroBiology1 from './Pages/Micro-Biology/MicroBiology1';
import MicroBiology2 from './Pages/Micro-Biology/MicroBiology2';
import MicroBiology3 from './Pages/Micro-Biology/MicroBiology3';
import MicroBiology4 from './Pages/Micro-Biology/MicroBiology4';
import MicroBiologyPq1 from './Pages/Micro-Biology/MicroBiologyPq1';
import MicroBiologyPq2 from './Pages/Micro-Biology/MicroBiologyPq2';
import MicroBiologyPq3 from './Pages/Micro-Biology/MicroBiologyPq3';
import MicroBiologyPq4 from './Pages/Micro-Biology/MicroBiologyPq4';
import FpasDashboard from './Pages/Dashboard/Fpas/FpasDashboard';
import FsmsDashboard from './Pages/Dashboard/Fsms/FsmsDashboard';
import Timetables from './Pages/Timetables';
import AnnouncementFpas from './Pages/AnnouncementFpas';
import AnnouncementFsms from './Pages/AnnouncementFsms';
import Timetables2 from './Pages/Timetables2';
import BioChem1 from './Pages/Biochemistry/BioChem1';
import BioChem2 from './Pages/Biochemistry/BioChem2';
import BioChem3 from './Pages/Biochemistry/BioChem3';
import BioChem4 from './Pages/Biochemistry/BioChem4';
import BioChemPq1 from './Pages/Biochemistry/BioChemPq1';
import BioChemPq2 from './Pages/Biochemistry/BioChemPq2';
import BioChemPq3 from './Pages/Biochemistry/BioChemPq3';
import BioChemPq4 from './Pages/Biochemistry/BioChemPq4';
import ComputerPdf1 from './Pages/Computer/ComputerPdf1';
import ComputerPdf2 from './Pages/Computer/ComputerPdf2';
import ComputerPdf3 from './Pages/Computer/ComputerPdf3';
import ComputerPdf4 from './Pages/Computer/ComputerPdf4';
import SoftwarePq1 from './Pages/Software/SoftwarePq1';
import SoftwarePq2 from './Pages/Software/SoftwarePq2';
import SoftwarePq3 from './Pages/Software/SoftwarePq3';
import SoftwarePq4 from './Pages/Software/SoftwarePq4';
import MassComPdf from './Pages/Mass-Com/MassComPdf';
import MassComPq from './Pages/Mass-Com/MassComPq';
import InterRelPdf from './Pages/Inter-Rel/InterRelPdf';
import InterRelPq from './Pages/Inter-Rel/InterRelPq';
import BusinessAdminPdf from './Pages/Business-Admin/BusinessAdminPdf';
import BusinessAdminPq from './Pages/Business-Admin/BusinessAdminPq';
import AccountingPdf from './Pages/Accounting/AccountingPdf';
import AccountingPq from './Pages/Accounting/AccountingPq';
import EconomicsPdf from './Pages/Economics/EconomicsPdf';
import EconomicsPq from './Pages/Economics/EconomicsPq';

const App = () => {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 4000); // Show splash for 4 seconds

    return () => clearTimeout(timer);
  }, []);

  if (showSplash) {
    return <SplashScreen />;
  }

  return (
    <UserProvider>
      <Toaster />
      <Routes>
        <Route path='/' element={<Homepage />} />
        <Route path='/past-questions' element={<PastQuestions />} />
        <Route path='/quiz' element={<Quiz />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
      
        {/* fpas */}
         <Route path="/dashboard/fpas" element={<FpasDashboard />} />


         {/* fsms */}
         <Route path="/dashboard/fsms" element={<FsmsDashboard />} />
        
        
      {/* admin */}
      {/* <Route path="/dashboard/admin/*" element={<AdminDashboard />} /> */}

      {/* Course materials */}

      {/* COMPUTER SCIENCE PDF */}

      <Route path="/computer-science-pdf/100" element={<ComputerPdf1 />} />
      <Route path="/computer-science-pdf/200" element={<ComputerPdf2 />} />
      <Route path="/computer-science-pdf/300" element={<ComputerPdf3 />} />
      <Route path="/computer-science-pdf/400" element={<ComputerPdf4 />} />


      {/* computer Science */}
     <Route path="/computer-science/100level" element={<ComputerPq1 />} />
     <Route path="/computer-science/200level" element={<ComputerPq2 />} />
     <Route path="/computer-science/300level" element={<ComputerPq3 />} />
     <Route path="/computer-science/400level" element={<ComputerPq4 />} />



{/* Software Engineering */}
     <Route path="/software-engineering/100" element={<SoftwarePdf />} />
     <Route path="/software-engineering/200" element={<SoftwarePdf2 />} />
     <Route path="/software-engineering/300" element={<SoftwarePdf3 />} />
     <Route path="/software-engineering/400" element={<SoftwarePdf4 />} />

{/* Software Engineering Past Questions */}
     <Route path="/software-engineering-pq/100" element={<SoftwarePq1 />} />
     <Route path="/software-engineering-pq/200" element={<SoftwarePq2 />} />
     <Route path="/software-engineering-pq/300" element={<SoftwarePq3 />} />
     <Route path="/software-engineering-pq/400" element={<SoftwarePq4 />} />

{/* Cyber Security */}
     <Route path="/cyber-security/100" element={<CyberPdf/>} />
     <Route path="/cyber-security/200" element={<CyberPdf2/>} />
     <Route path="/cyber-security/300" element={<CyberPdf3/>} />
     <Route path="/cyber-security/400" element={<CyberPdf4/>} />

{/* Cyber Security Past Questions */}
     <Route path="/cyber-security-pq/100" element={<CyberPq1 />} />
     <Route path="/cyber-security-pq/200" element={<CyberPq2 />} />
     <Route path="/cyber-security-pq/300" element={<CyberPq3 />} />
     <Route path="/cyber-security-pq/400" element={<CyberPq4 />} />

     {/* Biochemistry */}
     <Route path="/biochemistry/100" element={<BioChem1 />} />
     <Route path="/biochemistry/200" element={<BioChem2 />} />
     <Route path="/biochemistry/300" element={<BioChem3 />} />
     <Route path="/biochemistry/400" element={<BioChem4 />} />

     {/* BIO-CHEMISTRY PAST QUESTIONS */}
     <Route path="/bio-chemistry-pq/100" element={<BioChemPq1 />} />
     <Route path="/bio-chemistry-pq/200" element={<BioChemPq2 />} />
     <Route path="/bio-chemistry-pq/300" element={<BioChemPq3 />} />
     <Route path="/bio-chemistry-pq/400" element={<BioChemPq4 />} />

     {/* FSMS courses */}
     <Route path="/mass-communication/:level" element={<MassComPdf />} />
     <Route path="/mass-communication-pq/:level" element={<MassComPq />} />
     <Route path="/international-relations/:level" element={<InterRelPdf />} />
     <Route path="/international-relations-pq/:level" element={<InterRelPq />} />
     <Route path="/business-administration/:level" element={<BusinessAdminPdf />} />
     <Route path="/business-administration-pq/:level" element={<BusinessAdminPq />} />
     <Route path="/accounting/:level" element={<AccountingPdf />} />
     <Route path="/accounting-pq/:level" element={<AccountingPq />} />
     <Route path="/economics/:level" element={<EconomicsPdf />} />
     <Route path="/economics-pq/:level" element={<EconomicsPq />} />

     {/* Micro-Biology PDF Materials */}
     <Route path="/micro-biology/100" element={<MicroBiology1 />} />
     <Route path="/micro-biology/200" element={<MicroBiology2 />} />
     <Route path="/micro-biology/300" element={<MicroBiology3 />} />
     <Route path="/micro-biology/400" element={<MicroBiology4 />} />

     {/* Micro-Biology Past Questions */}
     <Route path="/micro-biology-pq/100" element={<MicroBiologyPq1 />} />
     <Route path="/micro-biology-pq/200" element={<MicroBiologyPq2 />} />
     <Route path="/micro-biology-pq/300" element={<MicroBiologyPq3 />} />
     <Route path="/micro-biology-pq/400" element={<MicroBiologyPq4 />} />

    {/* TIMETABLE */}
     <Route path="/timetablefpas" element={<Timetables />} />
     <Route path="/fsmstimetable" element={<Timetables2 />} />
     



     {/* ANNOUNCEMENT */}
     <Route path="/announcementfpas" element={<AnnouncementFpas />} />
     <Route path="/announcementfsms" element={<AnnouncementFsms />} />

     

      </Routes>
    </UserProvider>
  )
}

export default App