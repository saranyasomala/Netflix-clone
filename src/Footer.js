import React from 'react';
import './App.css';

const Footer = () => {
    return(
        <footer className='footer'>
            <div>
            <p style={{fontSize:"10px",color: '#F0F0F0' }}> Questions? Call 000-800-919-1694</p>
            </div>
            <div>
            <a href="https://help.netflix.com/en/node/412" style={{fontSize:"10px",color: "#F0F0F0", marginRight: "100px" }}> FAQ</a>
            <a href="https://help.netflix.com/en/"style={{fontSize:"10px",color: "#F0F0F0", marginRight: "100px" }}> Help Center</a>
            <a href="https://help.netflix.com/legal/termsofuse"style={{fontSize:"10px",color: "#F0F0F0",marginRight:"100px" }}> Terms of Use</a>
            <a href="https://help.netflix.com/legal/privacy"style={{fontSize:"10px",color: "#F0F0F0",marginRight:"100px" }}> Privacy</a>
            </div>
            <div>
            <a href="https://www.netflix.com/login"style={{fontSize:"10px",color: "#F0F0F0",marginRight:"30px" }}> Cookie Preferences</a>
            <a href="https://help.netflix.com/legal/corpinfo"style={{fontSize:"10px",color: "#F0F0F0",marginRight:"40px" }}> Corporate Information</a>
            </div>
        </footer>
    )
}

export default Footer;