import { ChangeEvent, useContext, useEffect, useState } from 'react';
import './BudgetWindow.css'
import { Expense, useExpense } from './useExpense';
import AppContext from '../../context/AppContext';
import { BudgetView } from '../../constants/view';

const BudgetWindowComponent = () => {
    const { addExpenses, showExpenses, updateAllExpenses, isLoading, } = useExpense();
    const { dispatch } = useContext(AppContext);

    const [addExpense, setAddExpense] = useState(false);

    const [name, setName] = useState('');
    const [amount, setAmount] = useState('');
    const newExpense: Expense = {
        ID: "0",
        Name: name,
        Limit: amount,
        Spent: "0.00"
    }

    const handleNameOnChange = (event: ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
    }
    const handleAmountOnChange = (event: any) => {
        setAmount(event.target.value);
    }
    const handleViewOnChange = (event: any) => {
        updateAllExpenses(event.target.value)
        dispatch({ type:'SET_STATE', state:{ budgetView: event.target.value}})
    };

    useEffect(() => {
        updateAllExpenses();
        // eslint-disable-next-line
    },[])

    return (
        <div className='miniwindow'>
            <div className='miniwindow__view'>
                <h4 className='miniwindow__view__header'>Current View</h4>
                <select onChange={(event) => handleViewOnChange(event)}className='miniwindow__view__list'>
                    <option value={BudgetView.MONTHLY}>Monthly</option>
                    <option value={BudgetView.WEEKLY}>Weekly</option>
                    <option value={BudgetView.YEARLY}>Yearly</option>
                </select>
            </div>
            <div className='miniwindow__budget'>
                <div className='miniwindow__budget__header'>
                    <span className='miniwindow__budget__header__item'>Name</span>
                    <span className='miniwindow__budget__header__item'>Budgeted Amount</span>
                    <span className='miniwindow__budget__header__item'>Actual Spent</span>
                </div>
                <div className='miniwindow__budget__view'>
                    {showExpenses()}
                    <button className={`miniwindow__budget__view__item miniwindow__budget__view__item__button${isLoading ? '--hide' : ''}`} onClick={() => setAddExpense(!addExpense)}>+ Create Expense</button>
                    {addExpense ?
                    <div className='miniwindow__budget__view__item'>
                        <span><input aria-label='expense-name' className='miniwindow__budget__view__item__input' value={name} onChange={(event) => handleNameOnChange(event)}/></span>------------<span><input aria-label='expense-limit' className='miniwindow__budget__view__item__input' value={amount} onChange={(event) => handleAmountOnChange(event)}/></span>------------<span className='miniwindow__budget__view__item__input miniwindow__budget__view__item__input--filled'>$0.00</span>
                        <button className='miniwindow__budget__view__item__button miniwindow__budget__view__item__button--save' onClick={() => addExpenses(newExpense)}>Save</button>
                    </div>
                    :
                    null
                    }
                </div>
            </div>
        </div>
    );
}
export default BudgetWindowComponent