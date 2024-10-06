import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import styled from 'styled-components';

// Validation schema using Yup
const validationSchema = Yup.object({
    firstName: Yup.string().required('First Name is required'),
    lastName: Yup.string().required('Last Name is required'),
    phone: Yup.string().required('Phone is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    property: Yup.string().required('Property is required'),
    unit: Yup.string(),
});

const EntryForm = ({ fetchPeopleData, onRequestClose, initialValues }) => {


    const handleFormSubmit = (formData, isEditMode) => {
        if (isEditMode) {
            updateData(formData);
        } else {
            createNewData(formData);
        }
    };


    const updateData = async (formData) => {
        console.log(formData, "Success");
        try {
            const response = await fetch('/api/submitForm', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error('Failed to submit form');
            }

            const data = await response.json();
            fetchPeopleData()
            onRequestClose();
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    }



    const createNewData = async (values) => {
        try {
            const response = await fetch('/api/submitForm', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(values),
            });

            if (!response.ok) {
                throw new Error('Failed to submit form');
            }

            const data = await response.json();
            fetchPeopleData()
            onRequestClose();
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };

    console.log(initialValues, "Success");

    return (
        <Box>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={async (values, { setSubmitting }) => {
                    setSubmitting(true);
                    try {
                        await handleFormSubmit(values, initialValues._id);
                    } finally {
                        setSubmitting(false);
                    }
                }}
            >
                {({ isSubmitting }) => (
                    <StyledForm>
                        <HeaderText>
                            {
                                initialValues._id ? 'Edit' : 'Create'
                            }
                        </HeaderText>
                        <FormField>
                            <label htmlFor="firstName">First Name</label>
                            <StyledField name="firstName" type="text" />
                            <ErrorMessage name="firstName" component="ErrorText" />
                        </FormField>

                        <FormField>
                            <label htmlFor="lastName">Last Name</label>
                            <StyledField name="lastName" type="text" />
                            <ErrorMessage name="lastName" component="ErrorText" />
                        </FormField>

                        <FormField>
                            <label htmlFor="phone">Phone</label>
                            <StyledField name="phone" type="text" />
                            <ErrorMessage name="phone" component="ErrorText" />
                        </FormField>

                        <FormField>
                            <label htmlFor="email">Email</label>
                            <StyledField name="email" type="email" />
                            <ErrorMessage name="email" component="ErrorText" />
                        </FormField>

                        <FormField>
                            <label htmlFor="property">Property</label>
                            <Field as="select" name="property">
                                <option value="">Select Property</option>
                                <option value="ABC">ABC</option>
                                <option value="PQR">PQR</option>
                                <option value="XYZ">XYZ</option>
                            </Field>
                            <ErrorMessage name="property" component="ErrorText" />
                        </FormField>
                        <FormField>
                            <label htmlFor="unit">Unit</label>
                            <StyledField name="unit" type="text" />
                        </FormField>

                        <ButtonContainer>
                            <StyledButton type="submit" disabled={isSubmitting}>
                                {isSubmitting ? 'Saving...' : 'Save'}
                            </StyledButton>
                            <CancelButton type="button" onClick={onRequestClose}>Cancel</CancelButton>
                        </ButtonContainer>
                    </StyledForm>
                )}
            </Formik>
        </Box>
    );
};

const Box = styled.div`
width: 100%;
height: 100%;
`

// Styled Components for form and elements
const StyledForm = styled(Form)`
  width: 400px;
  padding: 20px;
  background-color: white;
  border-radius: 10px;
  height:100%;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const FormField = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
  label {
    font-size: 13px;
    font-weight: 600;
    color: #333;
    line-height: 15.6px;
   text-align: left;
  }
`;

const StyledField = styled(Field)`
  padding: 5px;
  font-size: 13px;
  height: 2rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  transition: border-color 0.2s ease;

  &:focus {
    border-color: #333;
  }
`;

const StyledSelect = styled(StyledField)`
  appearance: none;
  background-color: white;
`;

const ButtonContainer = styled.div`
  width : 100%;
  display: flex;
  flex-direction: column;
  gap: 15px;
  justify-content: center;
  align-items: center;
`;

export const StyledButton = styled.button`
gap: 15px;
border-radius: 3px 0px 0px 0px;
padding: 7px 14px 7px 14px;
  width: 100%;
  background-color: black;
  color: white;
  gap : 0.5rem;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #333;
  }

  &:disabled {
    background-color: #ccc;
  }
`;

export const CancelButton = styled(StyledButton)`
  width  : fit-content;
  background-color: transparent;
  color: #333;
  border: 1px solid #333;
  border: none;

  &:hover {
    background-color: #f5f5f5;
  }
`;

const ErrorMessage = styled.div`
  color: red;
  font-size: 12px;
`;

const HeaderText = styled.h2`
  font-size: 20px;
  font-weight: 600;
  color: #333;
  text-align: left;
`;



export default EntryForm;
