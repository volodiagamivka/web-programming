import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import './CheckoutForm.css';

const CheckoutForm = () => {
    const navigate = useNavigate();

    const validationSchema = Yup.object({
        firstName: Yup.string()
            .matches(/^[а-щА-ЩЬьЮюЯяІіЇїЄєҐґ]+$/, 'Ім’я має містити лише українські літери')
            .max(20, 'Максимум 20 символів')
            .required('Ім’я є обов’язковим'),
        lastName: Yup.string()
            .matches(/^[а-щА-ЩЬьЮюЯяІіЇїЄєҐґ]+$/, 'Прізвище має містити лише українські літери')
            .max(30, 'Максимум 30 символів')
            .required('Прізвище є обов’язковим'),
        email: Yup.string().email('Некоректний Email').required('Email є обов’язковим'),
        phoneNumber: Yup.string()
            .matches(/^\+380\d{9}$/, 'Телефон має бути у форматі +380XXXXXXXXX')
            .required('Номер телефону є обов’язковим'),
        address: Yup.string().required('Адреса є обов’язковою'),
    });

    const handleSubmit = (values) => {
        console.log('Form Submitted:', values);
        navigate('/success');
    };

    return (
        <div className="checkout-page">
            <h1>Форма замовлення</h1>
            <Formik
                initialValues={{
                    firstName: '',
                    lastName: '',
                    email: '',
                    phoneNumber: '+380',
                    address: '',
                }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {() => (
                    <Form className="checkout-form">
                        <div className="form-group">
                            <label htmlFor="firstName">Ім’я:</label>
                            <Field type="text" name="firstName" />
                            <ErrorMessage name="firstName" component="div" className="error" />
                        </div>

                        <div className="form-group">
                            <label htmlFor="lastName">Прізвище:</label>
                            <Field type="text" name="lastName" />
                            <ErrorMessage name="lastName" component="div" className="error" />
                        </div>

                        <div className="form-group">
                            <label htmlFor="email">Email:</label>
                            <Field type="email" name="email" />
                            <ErrorMessage name="email" component="div" className="error" />
                        </div>

                        <div className="form-group">
                            <label htmlFor="phoneNumber">Телефон:</label>
                            <Field type="text" name="phoneNumber" />
                            <ErrorMessage name="phoneNumber" component="div" className="error" />
                        </div>

                        <div className="form-group">
                            <label htmlFor="address">Адреса:</label>
                            <Field type="text" name="address" />
                            <ErrorMessage name="address" component="div" className="error" />
                        </div>

                        <button type="submit" className="submit-button">Підтвердити замовлення</button>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default CheckoutForm;
