import React, { createContext, useContext, useState } from 'react'
import { generateAccountNumber, generateIban } from '../components/Util/generateAccountNumber'

export const FormContext = createContext(null)

export const FormProvider = ({ children }) => {
    const [user, setUser] = useState({
        title: "",
        firstName: "",
        lastName: "",
        dateOfBirth: "",
        maritalStatus: "",
        phoneNumber: "",
        email: "",
        streetAddress: "",
        city: "",
        state: "",
        postalCode: "",
        country: "",
        photoUrl: "",
        accountType: "",
        occupation: "",
        monthlyIncome: "",
        password: "",
        confirmPassword: "",
        accountNumber: "",
        iban: "",
        balance: "0.00"
    })

    const handleChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
    }

    const handleDragOver = (e) => {
        e.preventDefault();
    }
    
    const handleDrop = (e) => {
        e.preventDefault()
        const file = e.dataTransfer.files[0]
        if(file){
            setUser({
            ...user, 
            photoUrl: URL.createObjectURL(file)
            })
        }
    }

    const onFileChange = (e) => {
        const file = e.target.files[0]
        if(file){
            setUser({
            ...user, 
            photoUrl: URL.createObjectURL(file)
            })
        }
    }
    const createAccount = () => {
        // Generate account number
        const generatedAccountNumber = generateAccountNumber(user.accountType)
        const generatedIban = generateIban(generatedAccountNumber)
        // console.log(generatedAccountNumber, generatedIban)
        setUser({
          ...user,
          accountNumber: generatedAccountNumber,
          iban: generatedIban.replace(/\W/gi, '').replace(/(.{4})/g, '$1 ')
        })
    }
    
    const value = {
        user, setUser, handleChange, handleDragOver, handleDrop, onFileChange, createAccount
    }

    return(
        <FormContext.Provider value={ value }>
            {children}
        </FormContext.Provider>
    )
}

export const useFormContext = () => useContext(FormContext)