import React, { useState } from 'react'
import { FaPlus } from "react-icons/fa6";
import { FiUpload } from "react-icons/fi";
import { MdDelete } from "react-icons/md";
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';

const Form = () => {

    const BACKEND_URI = import.meta.env.VITE_BACKEND_URI;

    const [Data, setData] = useState({
        firstName: "",
        lastName: "",
        eMail: "",
        dateOfBirth: "",
        residentialAddress: {
            street1: "",
            street2: ""
        },
        permanentAddress: {
            street1: "",
            street2: ""
        },
        documents: []
    });
    console.log(Data)

    const [files, setFiles] = useState([]);
    const [sameAsResidential, setSameAsResidential] = useState(false);

    const handleFileChange = (event, index) => {
        const selectedFile = event.target.files[0];
        const newFiles = [...files];
        newFiles[index] = selectedFile;
        setFiles(newFiles);
    };

    const changedata = (e) => {
        const { name, value } = e.target;
    
        setData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const changeNestedData = (e) => {
        const { name, value } = e.target;
        const [parent, child] = name.split('.');
        
        setData(prevData => ({
            ...prevData,
            [parent]: {
                ...prevData[parent],
                [child]: value
            }
        }));
    };

    const handleSameAsResidential = () => {
        setSameAsResidential(!sameAsResidential);
        if (!sameAsResidential) {
            setData(prevData => ({
                ...prevData,
                permanentAddress: {
                    ...prevData.residentialAddress
                }
            }));
        } else {
            setData(prevData => ({
                ...prevData,
                permanentAddress: {
                    street1: "",
                    street2: ""
                }
            }));
        }
    };
    

    const addNewFileRow = () => {
        setFiles([...files, null]);
    };

    const removeFileRow = (index) => {
        const newFiles = [...files];
        newFiles.splice(index, 1);
        setFiles(newFiles);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { firstName, lastName, eMail, dateOfBirth, residentialAddress, permanentAddress, documents } = Data;
            if (!firstName || !lastName || !eMail || !dateOfBirth || !residentialAddress) {
                toast.error("Please Fill All Fields");
                return;
            }
            console.log(documents)
            const formData = new FormData();
            formData.append("firstName", firstName);
            formData.append("lastName", lastName);
            formData.append("eMail", eMail);
            formData.append("dateOfBirth", dateOfBirth);
            formData.append("residentialAddress", JSON.stringify(residentialAddress));
            formData.append("permanentAddress", JSON.stringify(permanentAddress));
            documents.forEach((file, index) => {
                formData.append(`document${index + 1}`, file);
            });
            // console.log(formData)

            const res = await axios.post(`${BACKEND_URI}/api/v1/data`, formData,{
                withCredentials: true
            });
            console.log(res)
            toast.success(res.data.message);
            setData({
                firstName: "",
                lastName: "",
                eMail: "",
                dateOfBirth: "",
                residentialAddress: {
                    street1: "",
                    street2: ""
                },
                permanentAddress: {
                    street1: "",
                    street2: ""
                },
                documents: []
            });
            setFiles([]);
        } catch (error) {
            console.log(error.response)
            if (error.response.data.message) {
                toast.error(error.response.data.message);
            } else {
                toast.error("An error occurred. Please try again later.");
            }
        }
    };

    return (
        <>
            <section className='py-[50px]'>
                <div className="container mx-auto px-6">
                    <form onSubmit={handleSubmit}>

                    <div className="flex justify-between flex-wrap w-full">
                    <div className='md:w-[48%] w-full mb-4'>
                            <label className='text-[17px] font-medium' htmlFor="firstName">First Name <span className="text-red-500">*</span></label>
                            <input type="text" name='firstName' id='firstName' onChange={changedata} value={Data.firstName} placeholder='Enter Your First Name here...' className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1"/>
                        </div>
                        <div className='md:w-[48%] w-full mb-4'>
                            <label className='text-[17px] font-medium' htmlFor="lastName">Last Name <span className="text-red-500">*</span></label>
                            <input type="text" name='lastName' id='lastName' onChange={changedata} value={Data.lastName} placeholder='Enter Your Last Name here...' className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1"/>
                        </div>
                        <div className='md:w-[48%] w-full mb-4'>
                            <label className='text-[17px] font-medium' htmlFor="email">E-Mail <span className="text-red-500">*</span></label>
                            <input type="email" name='eMail' id='email' onChange={changedata} value={Data.eMail} placeholder='Enter Your E-Mail here...' className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1"/>
                        </div>
                        <div className='md:w-[48%] w-full mb-4'>
                            <label className='text-[17px] font-medium' htmlFor="dob">Date of Birth <span className="text-red-500">*</span></label>
                            <input type="date" name='dateOfBirth' id='dob' onChange={changedata} value={Data.dateOfBirth} className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1"/>
                        </div>
                        <div className='w-full'>
                            <h5 className='text-[17px] font-medium'>Residential Address</h5>
                            <div className='w-full flex flex-wrap justify-between mb-4'>
                                <div className='md:w-[48%] w-full mb-4'>
                                    <label className='text-[15px] font-normal text-gray-500' htmlFor="residentialAddress1">street 1 <span className="text-red-500">*</span></label>
                                    <input type="text" name='residentialAddress.street1' onChange={changeNestedData} value={Data.residentialAddress.street1} id='residentialAddress1' placeholder='Enter Your Residential Address street 1 here...' className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1"/>
                                </div>
                                <div className='md:w-[48%] w-full mb-4'>
                                    <label className='text-[15px] font-normal text-gray-500' htmlFor="residentialAddress2">street 2 <span className="text-red-500">*</span></label>
                                    <input type="text" name='residentialAddress.street2' id='residentialAddress2' onChange={changeNestedData} value={Data.residentialAddress.street2} placeholder='Enter Your Residential Address street 2 here...' className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1"/>
                                </div>
                            </div>
                        </div>
                        <div className='w-full'>
                            <div className='md:w-[48%] w-full mb-4'>
                                <input type="checkbox" id="sameAsResidential" className="mr-2" onChange={handleSameAsResidential}/>
                                <label className='text-20px font-medium' htmlFor="sameAsResidential">Same as Residential</label>
                            </div>
                            <h5 className='text-[17px] font-medium'>Permanent Address</h5>
                            <div className='w-full flex flex-wrap justify-between mb-4'>
                                <div className='md:w-[48%] w-full mb-4'>
                                    <label className='text-[15px] font-normal text-gray-500' htmlFor="permanentAddress1">street 1</label>
                                    <input type="text" name='permanentAddress.street1' id='permanentAddress1' onChange={changeNestedData} value={sameAsResidential ? Data.residentialAddress.street1 : Data.permanentAddress.street1} placeholder='Enter Your Permanent Address street 1 here...' className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1"/>
                                </div>
                                <div className='md:w-[48%] w-full mb-4'>
                                    <label className='text-[15px] font-normal text-gray-500' htmlFor="permanentAddress2">street 2</label>
                                    <input type="text" name='permanentAddress.street2' id='permanentAddress2' onChange={changeNestedData} value={sameAsResidential ? Data.residentialAddress.street2 : Data.permanentAddress.street2} placeholder='Enter Your Permanent Address street 2 here...' className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1"/>
                                </div>
                            </div>
                        </div>
                        
                        {/* File upload section */}
                        <div className="w-full">
                            <h5 className='text-[17px] font-medium'>Upload Document</h5>
                            {files.map((file, index) => (
                                <div key={index} className="w-full flex justify-between items-center flex-wrap mb-4">
                                    <div className='md:w-[27%] w-full'>
                                        <label className='text-[17px] font-medium' htmlFor={`documentName-${index}`}>File Name <span className="text-red-500">*</span></label>
                                        <input type="text" id={`documentName-${index}`} placeholder="Enter file name" className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1"/>
                                    </div>
                                    <div className='md:w-[27%] w-full'>
                                        <label className='text-[17px] font-medium' htmlFor={`documentType-${index}`}>File Type <span className="text-red-500">*</span></label>
                                        <select id={`documentType-${index}`} className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1">
                                            <option value="">Select file type</option>
                                            <option value="image">Image</option>
                                            <option value="pdf">PDF</option>
                                        </select>
                                    </div>
                                    <div className="md:w-[27%] w-full">
                                        <label className='text-[17px] font-medium' htmlFor="postimage">Post Image <span className="text-red-500">*</span></label>
                                        <div className="cursor-pointer flex relative items-center justify-center w-full h-full border border-gray-300 rounded-md px-3 py-2 mt-1">
                                            <FiUpload className="w-6 h-6 mr-2" />
                                            {files[0] ? (
                                                <span>{files[0].name}</span>
                                            ) : (
                                                <span>Choose File</span>
                                            )}
                                            <input type="file" id="postimage" name="postimage" className="opacity-0 absolute inset-0 w-full h-full" onChange={(event) => handleFileChange(event, 0)} />
                                        </div>
                                    </div>

                                    <div className='md:w-[10%] w-full'>
                                        <button className='bg-red-500 cursor-pointer text-white text-2xl w-[50px] flex justify-center items-center h-[50px]' type='button' onClick={() => removeFileRow(index)}><MdDelete /></button>
                                    </div>
                                </div>
                            ))}
                            <div className="flex justify-center">
                                <button className='bg-black cursor-pointer text-white text-2xl w-[50px] flex justify-center items-center h-[50px]' type='button' onClick={addNewFileRow}><FaPlus /></button>
                            </div>
                        </div>
                        
                        <div className="flex justify-center mt-5">
                        <button className='w-[250px] h-[60px] bg-black text-white text-xl' type='submit'>Submit</button>
                    </div>
                    </div>
                    </form>
                </div>
            </section>
            <Toaster />
        </>
    );
}

export default Form;
