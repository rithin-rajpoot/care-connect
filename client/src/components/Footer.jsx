import React from 'react'
import {Link} from 'react-router-dom'
import { Facebook, Instagram ,Phone , Mail} from 'lucide-react';
const Footer = () => {
  return (
    <div className="p-2 min-h-fit md:h-[45vh] w-full bg-[#222831] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 justify-evenly items-center">
        <div className="p-2 h-full w-full  flex flex-col items-center justify-center gap-2 ">
           <div className="flex items-center space-x-2">
                <div className="bg-blue-500 p-2 rounded-md">
                    logo
                </div>
                <span className="text-xl font-semibold text-[#fff]">CareConnect</span>
            </div>

            <span className="text-gray-400 ml-2 mr-2">Simplifying healthcare access with</span>
            <span className="text-gray-400 ml-2 mr-2">serial number-based appointment system.</span>
            <div className="flex gap-3">  <Instagram className="w-6 h-6 text-pink-600 hover:text-pink-800 cursor-pointer" /> <Facebook className="w-6 h-6 text-blue-600 hover:text-blue-800 cursor-pointer" /></div>
        </div> 
        <div className="p-2 h-full w-full flex flex-col justify-center items-center space-y-3 text-[#fff]">
              <h2 className="font-bold mb-2">Quick Links</h2>
                    <Link to ="/" className="cursor-pointer hover:text-blue-400">Home</Link>
                    <Link to ="/" className="cursor-pointer hover:text-blue-400">Find Hospitals</Link>
                    <Link to ="/" className="cursor-pointer hover:text-blue-400">How it Works</Link>
        </div> 
        <div className="text-[#fff] w-full h-full flex flex-col items-center justify-center space-y-3">
            <h2 className="font-bold">Contact Us</h2>
            <span className="flex items-center gap-2"><Phone className="w-5 h-5 text-blue-500" />888888888</span>
            <span className="flex items-center gap-2 cursor-pointer hover:text-blue-400"><Mail className="w-5 h-5 text-red-500" />careconnect@gmail.com</span>
        </div>
    </div>
  )
}

export default Footer
