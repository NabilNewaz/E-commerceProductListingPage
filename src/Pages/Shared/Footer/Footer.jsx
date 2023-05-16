import React from 'react';
import { Link } from 'react-router-dom';
import { GiLoincloth } from "react-icons/gi";

const Footer = () => {
    return (
        <div className='px-2 mt-5 pb-2'>
            <footer className="footer rounded-lg p-10 bg-base-200 text-base-content">
                <div>
                    <GiLoincloth className='text-5xl' />
                    <p className='flex flex-col'><span className='text-xl font-semibold'>eShop</span><span>Providing Trustable Marketplace</span></p>
                </div>
                <div>
                    <span className="footer-title">Services</span>
                    <Link className="link link-hover">Branding</Link >
                    <Link className="link link-hover">Marketing</Link >
                    <Link className="link link-hover">Advertisement</Link >
                </div>
                <div>
                    <span className="footer-title">Company</span>
                    <Link className="link link-hover">About us</Link >
                    <Link className="link link-hover">Contact</Link >
                    <Link className="link link-hover">Press kit</Link >
                </div>
                <div>
                    <span className="footer-title">Legal</span>
                    <Link className="link link-hover">Terms of use</Link >
                    <Link className="link link-hover">Privacy policy</Link >
                    <Link className="link link-hover">Cookie policy</Link >
                </div>
                <div>
                    <span className="footer-title">Newsletter</span>
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text">Enter your email address</span>
                        </label>
                        <div className="relative">
                            <input type="text" placeholder="mail@site.com" className="input input-bordered w-full pr-16" />
                            <button className="btn btn-base-300 absolute top-0 right-0 rounded-l-none">Subscribe</button>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Footer;