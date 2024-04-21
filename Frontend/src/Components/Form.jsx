import React, { useState } from 'react'
import { FaPlus } from "react-icons/fa6";
import { FiUpload } from "react-icons/fi";



const Form = () => {

    const [Data, setData] = useState({
        firstName: "",
        lastName: "",
        eMail: "",
        dataofBirth: "",
        residentialAddress: {
            street1: "",
            street2: ""
        },
        permanentAddress: {
            street1: "",
            street2: ""
        },
        document: []
    })
    console.log(Data);

    const [file1, setFile1] = useState(null);

    const handleFileChange = (event, setFile) => {
        const selectedFile = event.target.files[0];
        setFile(selectedFile);
    };

  return (
    <>
        <section className='py-[50px]'>
            <div className="container mx-auto px-6">
                <form action="">
                    <div className="flex justify-between flex-wrap w-full">
                        <div className='md:w-[48%] w-full mb-4'>
                            <label className='text-[17px] font-medium' htmlFor="firstName">First Name <span className="text-red-500">*</span></label>
                            <input type="text" id='firstName' value={Data.firstName} placeholder='Enter Your First Name here...' className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1"/>
                        </div>
                        <div className='md:w-[48%] w-full mb-4'>
                            <label className='text-[17px] font-medium' htmlFor="lastName">Last Name <span className="text-red-500">*</span></label>
                            <input type="text" id='lastName' value={Data.lastName} placeholder='Enter Your Last Name here...' className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1"/>
                        </div>
                        <div className='md:w-[48%] w-full mb-4'>
                            <label className='text-[17px] font-medium' htmlFor="email">E-Mail <span className="text-red-500">*</span></label>
                            <input type="email" id='email' value={Data.eMail} placeholder='Enter Your E-Mail here...' className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1"/>
                        </div>
                        <div className='md:w-[48%] w-full mb-4'>
                            <label className='text-[17px] font-medium' htmlFor="dob">Date of Birth <span className="text-red-500">*</span></label>
                            <input type="date" id='dob' value={Data.dataofBirth} className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1"/>
                        </div>
                        <div className='w-full'>
                            <h5 className='text-[17px] font-medium'>Residential Address</h5>
                            <div className='w-full flex flex-wrap justify-between mb-4'>
                                <div className='md:w-[48%] w-full mb-4'>
                                    <label className='text-[15px] font-normal text-gray-500' htmlFor="residentialAddress1">street 1 <span className="text-red-500">*</span></label>
                                    <input type="text" value={Data.residentialAddress.street1} id='residentialAddress1' placeholder='Enter Your Residential Address street 1 here...' className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1"/>
                                </div>
                                <div className='md:w-[48%] w-full mb-4'>
                                    <label className='text-[15px] font-normal text-gray-500' htmlFor="residentialAddress2">street 2 <span className="text-red-500">*</span></label>
                                    <input type="text" id='residentialAddress2' value={Data.residentialAddress.street2} placeholder='Enter Your Residential Address street 2 here...' className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1"/>
                                </div>
                            </div>
                        </div>
                        <div className='w-full'>
                            <div className='md:w-[48%] w-full mb-4'>
                                <input type="checkbox" id="sameAsResidential" className="mr-2"/>
                                <label className='text-20px] font-medium' htmlFor="sameAsResidential">Same as Residential</label>
                            </div>
                            <h5 className='text-[17px] font-medium'>Permanent Address</h5>
                            <div className='w-full flex flex-wrap justify-between mb-4'>
                                <div className='md:w-[48%] w-full mb-4'>
                                    <label className='text-[15px] font-normal text-gray-500' htmlFor="permanentAddress1">street 1</label>
                                    <input type="text" id='permanentAddress1' value={Data.permanentAddress.street1} placeholder='Enter Your Permanent Address street 1 here...' className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1"/>
                                </div>
                                <div className='md:w-[48%] w-full mb-4'>
                                    <label className='text-[15px] font-normal text-gray-500' htmlFor="permanentAddress2">street 2</label>
                                    <input type="text" id='permanentAddress2' value={Data.permanentAddress.street2} placeholder='Enter Your Permanent Address street 2 here...' className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1"/>
                                </div>
                            </div>
                        </div>
                        
                        {/* File upload section */}
                        <div className="w-full">
                            <h5 className='text-[17px] font-medium'>Upload Document</h5>
                            <div className="w-full flex justify-between items-center flex-wrap">
                                <div className='md:w-[27%] w-full mb-4'>
                                    <label className='text-[17px] font-medium' htmlFor="document1Name">File Name <span className="text-red-500">*</span></label>
                                    <input type="text" id="document1Name" placeholder="Enter file name" className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1"/>
                                </div>
                                <div className='md:w-[27%] w-full mb-4'>
                                    <label className='text-[17px] font-medium' htmlFor="document1Type">File Type <span className="text-red-500">*</span></label>
                                    <select id="document1Type" className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1">
                                        <option value="">Select file type</option>
                                        <option value="image">Image</option>
                                        <option value="pdf">PDF</option>
                                    </select>
                                </div>
                                <div className='md:w-[27%] w-full mb-4'>
                                    <label className='text-[17px] font-medium' htmlFor="document1">Upload Document <span className="text-red-500">*</span></label>
                                    <div className="cursor-pointer flex relative items-center justify-center w-full h-full border border-gray-300 rounded-md px-3 py-2 mt-1">
                                        <FiUpload className="w-6 h-6 mr-2" />
                                        {file1 ? (
                                        <span>{file1.name}</span>
                                        ) : (
                                        <span>Choose File</span>
                                        )}
                                        <input type="file" id="document1" className="opacity-0 absolute inset-0 w-full h-full" onChange={(event) => handleFileChange(event, setFile1)} />
                                    </div>
                                </div>
                                <div className='md:w-[10%] w-full'>
                                    <button className='bg-black cursor-pointer text-white text-2xl w-[50px] flex justify-center items-center h-[50px]'><FaPlus /></button>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </section>
    </>
  )
}

export default Form
