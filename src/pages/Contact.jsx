import React, { useState } from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';
import Button from '../components/UI/Button';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        department: 'General',
        message: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        const subject = `Inquiry for ${formData.department}: ${formData.name}`;
        const body = `Name: ${formData.name}%0D%0AEmail: ${formData.email}%0D%0ADepartment: ${formData.department}%0D%0A%0D%0AMessage:%0D%0A${formData.message}`;
        window.location.href = `mailto:hr@skylinkltd.ai?subject=${subject}&body=${body}`;
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <div className="pt-24 pb-16 bg-gray-50 min-h-screen">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h1 className="text-4xl font-bold text-skylink-blue mb-4">Get in Touch</h1>
                    <p className="text-xl text-slate-600 max-w-2xl mx-auto">
                        Ready to start a project or need support? Reach out to our dedicated teams in Dhaka, USA, or Australia.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    {/* Contact Info */}
                    <div className="bg-white rounded-lg shadow-lg p-8">
                        <h2 className="text-2xl font-bold text-slate-900 mb-6">Contact Information</h2>
                        <div className="space-y-6">
                            <div className="flex items-start">
                                <div className="p-3 bg-blue-50 rounded-full text-skylink-blue mr-4">
                                    <MapPin size={24} />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-slate-900">Headquarters</h3>
                                    <p className="text-slate-600">Bashundhara R/A, Dhaka, Bangladesh</p>
                                    <p className="text-slate-500 text-sm mt-1">Operating Globally (USA & Australia)</p>
                                </div>
                            </div>

                            <div className="flex items-start">
                                <div className="p-3 bg-blue-50 rounded-full text-skylink-blue mr-4">
                                    <Mail size={24} />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-slate-900">Email Us</h3>
                                    <a href="mailto:hr@skylinkltd.ai" className="text-slate-600 hover:text-skylink-blue">hr@skylinkltd.ai</a>
                                </div>
                            </div>

                            <div className="flex items-start">
                                <div className="p-3 bg-blue-50 rounded-full text-skylink-blue mr-4">
                                    <Phone size={24} />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-slate-900">Call Us</h3>
                                    <p className="text-slate-600">+880 123 456 7890</p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-12 p-6 bg-slate-100 rounded-lg">
                            <h3 className="font-semibold text-slate-900 mb-2">Office Hours</h3>
                            <p className="text-slate-600">Sunday - Thursday: 9:00 AM - 6:00 PM</p>
                            <p className="text-slate-600">Support (ITES): 24/7 Available</p>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="bg-white rounded-lg shadow-lg p-8">
                        <h2 className="text-2xl font-bold text-slate-900 mb-6">Send us a Message</h2>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    required
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-skylink-blue focus:border-skylink-blue focus:outline-none"
                                    placeholder="John Doe"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Email Address</label>
                                <input
                                    type="email"
                                    name="email"
                                    required
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-skylink-blue focus:border-skylink-blue focus:outline-none"
                                    placeholder="john@example.com"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Department</label>
                                <select
                                    name="department"
                                    value={formData.department}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-skylink-blue focus:border-skylink-blue focus:outline-none bg-white"
                                >
                                    <option value="General">General Inquiry</option>
                                    <option value="Real Estate">Real Estate Services</option>
                                    <option value="BPO Services">ITES & BPO Services</option>
                                    <option value="Careers">Careers / HR</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Message</label>
                                <textarea
                                    name="message"
                                    required
                                    rows={4}
                                    value={formData.message}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-skylink-blue focus:border-skylink-blue focus:outline-none"
                                    placeholder="How can we help you?"
                                ></textarea>
                            </div>

                            <Button type="submit" className="w-full">
                                Send Message via Email
                            </Button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;
