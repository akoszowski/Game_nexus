import React, { useState } from 'react';
import './Dashboard.css';
import './Settings.css';
import {cookies} from './cookie-manager'
import sha1 from 'sha1'
import axios from "axios";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tabs";

export default function Settings({usernamevalue})
{
    const [errorMsg, setErrorMsg] = useState(" ");

    const [oldEmail, setOldEmail] = useState("");
    const [newEmail, setNewEmail] = useState("");

    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");

    const [profileImage, setProfileImage] = useState("");

    function resetError(){
        setErrorMsg(" ");
    }

    function handleEmailUpdate(event) {

    }

    function handleUserInfo(event) {
        // FIXME: error handler

        if (event)
            event.preventDefault();
        
        let data = null;
        let token = cookies.get('token');
        axios.post("/api/v1/userInfo", {token: token}).then(res =>{
            data = res.data;
            console.log(data);
            console.log(data.mail);
            console.log(data.username);
            return data.mail;
            
        }).catch((error) => {
            console.log("Error while parsing user info!");
            console.log(error);
            // errorFun(JSON.stringify(error.response.data));
        });
    }
    
    function handlePasswordUpdate(event) 
    {
        if (event)
            event.preventDefault();

        const holder = usernamevalue;
        console.log("Update for " + holder);

        axios.post("api/v1/updatePassword",
        {
            email:  holder, 
            oldPassword: sha1(oldPassword),
            newPassword: sha1(newPassword)
        }).then((res) => { 
            // TOFIX - Ta część kodu sie nie wykonuje mimo suckesu operacji.
            alert("Password update success!");
            console.log("Success!");

        }).catch((error) => {
            alert("Password update failure");
            error("Password update failure");
            console.log("Password update failure");
            console.log(error);

             setOldPassword("");
             setNewPassword("");
        })
        
       
    }

    function handleImageUpdate(event) {

    }

    function setAndValidateImage(element) 
    {
        setProfileImage(element.value);

        if (element.files[0].size  > 4e6)
        {
            alert("File is too big!");
            setProfileImage(null);
        }
    }

    return (
        <div id="settings-body" className="settings-content main-content">
            <div class = "forms-wrapper">
                <Tabs onSelect={resetError}>
                <Tab eventKey="PasswordTab" title="Update Password" onClick={resetError} tabClassName="noborder">
                        <div className="error"> {errorMsg}</div>
                        <Form onSubmit={handlePasswordUpdate}>
                            <Form.Group size="lg" controlId="oldpassword">
                                <Form.Label>Old Password</Form.Label>
                                <Form.Control
                                    autoFocus
                                    required
                                    type="password"
                                    value={oldPassword}
                                    onChange={(e) => setOldPassword(e.target.value)}
                                />
                            </Form.Group>
                            <Form.Group size="lg" controlId="newpassword">
                                <Form.Label>New Password</Form.Label>
                                <Form.Control
                                    required
                                    type="password"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                />
                            </Form.Group>
                            <Button variant="primary" type="submit">
                                Update password
                            </Button>
                            <div className="error"></div>
                        </Form>
                    </Tab>

                    <Tab eventKey="EmailTab" title="Update Email" onClick={resetError} tabClassName="noborder" disabled>
                        <div className="error"> {errorMsg}</div>
                        <Form onSubmit={(e) => handleEmailUpdate(e)}>
                            <Form.Group size="lg" controlId="oldemail">
                                <Form.Label>Old Email</Form.Label>
                                <Form.Control
                                    autoFocus
                                    required
                                    type="email"
                                    value={oldEmail}
                                    onChange={(e) => setOldEmail(e.target.value)}
                                />
                            </Form.Group>
                            <Form.Group size="lg" controlId="newemail">
                                <Form.Label>New Email</Form.Label>
                                <Form.Control
                                    required
                                    type="email"
                                    value={newEmail}
                                    onChange={(e) => setNewEmail(e.target.value)}
                                />
                            </Form.Group>
                            <Button variant="primary" type="submit">
                                Update Email
                            </Button>
                            <div className="error">⠀</div>
                        </Form>
                    </Tab>

                    <Tab eventKey="AvatarTab" title="Update Profile Image" onClick={resetError} tabClassName="noborder" disabled>
                        <div className="error"> {errorMsg}</div>
                        <Form onSubmit={(e) => handleImageUpdate(e)}>
                            <Form.Group size="lg" controlId="avatar">
                                <Form.Label>Upload image (max. 4 MB)</Form.Label>
                                <Form.Control
                                    autoFocus
                                    required
                                    type="file"
                                    value={profileImage}
                                    onChange={(e) => setAndValidateImage(e.target)}
                                />
                            </Form.Group>
                            <Button variant="primary" type="submit">
                                Update profile image
                            </Button>
                            <div className="error"></div>
                        </Form>
                    </Tab>
                </Tabs>
            </div>
        </div>
    )
}