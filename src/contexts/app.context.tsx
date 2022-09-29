import { createContext, ReactNode } from "react";
import React from 'react';
import toast from 'react-hot-toast';

interface IResponse {
    amount: number
    installments: number
    mdr: number
    days?: any
}

interface AppProviderProps {
    children: ReactNode
}

interface AppProviderData {
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
    formatData: (data: IResponse) => {
        amount: number;
        installments: number;
        mdr: number;
    }
    handleResponse: (data: any) => void
    isLoading: boolean
    isDaysOn: boolean
    responseObject: IResponse | undefined
    isResponseOn: boolean
    ajustAmount: (amount: IResponse) => IResponse
    handleError: (error: any) => void
}

export const AppContext = createContext<AppProviderData>({} as AppProviderData);

export const AppProvider = ({ children }: AppProviderProps) => {

    const [isResponseOn, setIsResponseOn] = React.useState<boolean>(false)
    const [isDaysOn, setIsDaysOn] = React.useState<boolean>(false)
    const [responseObject, setResponseObject] = React.useState<IResponse>()
    const [isLoading, setIsLoading] = React.useState<boolean>(false)

    const ajustAmount = (data: IResponse) => {
        let dataToBeReturned = {
            amount: data.amount * 100,
            installments: data.installments,
            mdr: data.mdr,
            days: data.days
        }
        return dataToBeReturned
    }

    const formatData = (data: IResponse) => {
        let defaultData = {
            amount: data.amount,
            installments: data.installments,
            mdr: data.mdr
        }

        if (data.days === "") {
            return defaultData
        }

        let arrayOfDays = data.days && data.days.split(',')
        data.days = arrayOfDays

        return data
    }

    const handleResponse = (data: any) => {

        let dataKeys = Object.keys(data)
        let defaultResponseKeys = ['1', '15', '30', '90']

        let arrayComparison = dataKeys.length === defaultResponseKeys.length && dataKeys.every((value, index) => value === defaultResponseKeys[index])

        if (!arrayComparison) {
            setIsDaysOn(true)
        }

        setIsResponseOn(true)
        setResponseObject(data)
        setIsLoading(false)
    }

    const handleError = (error:any) => {
        if(error.status === 408){
            toast.error('Timeout')
        }
    }




    return (
        <AppContext.Provider
            value={{ setIsLoading, formatData, handleResponse, isLoading, isDaysOn, isResponseOn, responseObject, ajustAmount, handleError}}
        >
            {children}
        </AppContext.Provider>
    );
};
