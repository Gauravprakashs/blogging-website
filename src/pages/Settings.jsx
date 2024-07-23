
import { Formik, Field, Form } from "formik";
import React from "react";
import { useAuth, useUserQuery } from "../components/hooks";
import axios from "axios";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";


function Settings() {


    const {logout}=useAuth();
   
    const {
        isCurrentUserLoading,
        currentUser,
        currentUserError,
    } = useUserQuery();

    const queryClient=useQueryClient();
    const navigate=useNavigate();

    console.log('Settings',{ isCurrentUserLoading,
        currentUser,
        currentUserError,})

    async function onSubmit(values,{setErrors}){
        try{
            const {data}=await axios.put('http://localhost:3001/api/user',{user:values});

            const updateUsername=data?.user?.username;
            logout(data?.user);

            queryClient.invalidateQueries(`/profiles/${updatedUsername}`);
            queryClient.invalidateQueries(`/user`);

            navigate(`/profile/${updateUsername}`);

        }catch(error){
            const {status,data}=error.response;

            if(status===422){
                setErrors(data.errors)
            }
        }
    }

    return (
        <div className="settings-page">
            <div className="container page">
                <div className="row">
                    <div className="col-md-6 offset-md-3 col-xs-12">
                        <h1 className="test-xs-center">Your Settings</h1>

                        <Formik  onSubmit={onSubmit} initialValues={currentUser?.user} enableReinitialize>
                            {({ isSubmitted }) => (
                                <>
                                    <Form>
                                        <fieldset disabled={isSubmitted}>


                                            <fieldset className="form-group">
                                                <Field
                                                    type="text"
                                                    name="image"
                                                    placeholder="URL of profilr pic"
                                                    className="form-control form-control-lg"
                                                />
                                            </fieldset>
                                            <fieldset className="form-group">
                                                <Field
                                                    type="text"
                                                    name="username"
                                                    placeholder="Ypur Name"
                                                    className="form-control form-control-lg"
                                                />
                                            </fieldset>
                                            <fieldset className="form-group">
                                                <Field

                                                    as="textarea"
                                                    name="bio"
                                                    rows={8}
                                                    placeholder="Short Bio about yourself"
                                                    className="form-control form-control-lg"
                                                />
                                            </fieldset>
                                            <fieldset className="form-group">
                                                <Field
                                                    type="text"
                                                    name="email"
                                                    placeholder="Your Email"
                                                    className="form-control form-control-lg"
                                                />
                                            </fieldset>
                                            <fieldset className="form-group">
                                                <Field
                                                    type="text"
                                                    name="password"
                                                    placeholder="Password"
                                                    className="form-control form-control-lg"
                                                />
                                            </fieldset>
                                            <button type="submit" className="btn btn-lg btn-primary pill-xs-right">
                                                Update Settings
                                            </button>
                                        </fieldset>
                                    </Form>
                                    <hr />
                                    <button onClick={() => {
                                        logout(); 
                                        navigate('/');
                                        }} type="button" className="btn btn-outline-danger">
                                        Click to Logout
                                    </button>
                                </>
                            )}
                        </Formik>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Settings;