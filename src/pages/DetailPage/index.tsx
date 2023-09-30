import React from 'react';
import styled from '@emotion/styled';
import Title from '../../components/Title';
import Button from '../../components/Button';
import { useParams } from 'react-router-dom';
import InputForm from './InputForm';

export default function DetailPage() {
    return (
        <>
            <Title text="Contact Detail" />
            <InputForm />
        </>
    );
}
