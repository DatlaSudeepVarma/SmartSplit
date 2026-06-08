"use client";

import React, { useState, useEffect, useContext } from 'react';
import { AlertCircle, Calendar, CreditCard, AlignLeft, Banknote, Smartphone, Building2, CircleDollarSign } from 'lucide-react';
import Modal from '../ui/Modal';
import Button from '../ui/Button';
import Input from '../ui/Input';
import { FlipButton } from '../ui/Text3DFlip';
import { CurrencyContext } from '../../context/AppContext';
import { DailyExpense, DailyCategory } from '../../types';

interface AddDailyExpenseModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (data: Omit<DailyExpense, 'id' | 'userId'>) => Promise<void>;
    categories: DailyCategory[];
    expense?: DailyExpense;
}

type PaymentMethod = DailyExpense['paymentMethod'];

const PAYMENT_METHODS: { value: PaymentMethod; label: string; icon: React.ElementType }[] = [
    { value: 'Cash', label: 'Cash', icon: Banknote },
    { value: 'Card', label: 'Card', icon: CreditCard },
    { value: 'UPI', label: 'UPI', icon: Smartphone },
    { value: 'Net Banking', label: 'Net Banking', icon: Building2 },
    { value: 'Other', label: 'Other', icon: CircleDollarSign },
];

const AddDailyExpenseModal = ({ isOpen, onClose, onSave, categories, expense }: AddDailyExpenseModalProps) => {
    const { symbol } = useContext(CurrencyContext);
    const [amount, setAmount] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
    const [categoryId, setCategoryId] = useState('');
    const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('Cash');
    const [notes, setNotes] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        if (!isOpen) return;

        if (expense) {
            setAmount(expense.amount.toString());
            setDescription(expense.description);
            setDate(expense.date.split('T')[0]);
            setCategoryId(expense.categoryId);
            setPaymentMethod(expense.paymentMethod);
            setNotes(expense.notes || '');
        } else {
            setAmount('');
            setDescription('');
            setDate(new Date().toISOString().split('T')[0]);
            setPaymentMethod('Cash');
            setNotes('');
            setCategoryId(categories[0]?.id || '');
        }
        setError('');
    }, [expense, isOpen]);

    useEffect(() => {
        if (!isOpen || expense || !categories.length) return;
        setCategoryId((current) => current || categories[0].id);
    }, [categories, expense, isOpen]);

    const handleSave = async () => {
        const parsedAmount = parseFloat(amount);
        if (!amount || Number.isNaN(parsedAmount) || parsedAmount <= 0) {
            setError('Please enter a valid amount greater than zero.');
            return;
        }
        if (!description.trim()) {
            setError('Please enter a description.');
            return;
        }
        if (!categoryId) {
            setError(categories.length === 0
                ? 'Categories are still loading. Please wait a moment and try again.'
                : 'Please select a category.');
            return;
        }

        setIsLoading(true);
        setError('');
        try {
            await onSave({
                amount: parsedAmount,
                description: description.trim(),
                date: new Date(date).toISOString(),
                categoryId,
                paymentMethod,
                notes: notes.trim()
            });
            onClose();
        } catch (e: unknown) {
            setError(e instanceof Error ? e.message : 'Failed to save expense');
        } finally {
            setIsLoading(false);
        }
    };

    const modalFooter = (
        <div className="flex gap-3">
            <Button variant="secondary" onClick={onClose} className="flex-1 py-4">
                Cancel
            </Button>
            <Button
                onClick={handleSave}
                isLoading={isLoading}
                disabled={!categoryId && categories.length === 0}
                className="flex-[1.4] py-4 shadow-lg shadow-brand-blue/20"
            >
                {expense ? 'Update Expense' : 'Save Expense'}
            </Button>
        </div>
    );

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title={expense ? 'Edit Expense' : 'Add New Expense'}
            footer={modalFooter}
            maxWidth="max-w-lg"
        >
            <div className="space-y-6">
                {error && (
                    <div className="flex items-center gap-3 rounded-2xl border border-red-100 bg-red-50 p-4 text-sm font-semibold text-red-600 dark:border-red-900/30 dark:bg-red-900/20 dark:text-red-400">
                        <AlertCircle size={18} className="shrink-0" />
                        {error}
                    </div>
                )}

                <div className="rounded-2xl border border-brand-blue/15 bg-gradient-to-br from-brand-blue/5 via-white to-brand-skyblue/5 p-5 dark:from-brand-blue/10 dark:via-gray-800 dark:to-brand-skyblue/5">
                    <label className="mb-2 block text-xs font-bold uppercase tracking-widest text-gray-500 dark:text-gray-400">
                        Amount <span className="text-red-500">*</span>
                    </label>
                    <div className="flex items-center gap-2">
                        <span className="text-2xl font-bold text-brand-blue">{symbol}</span>
                        <input
                            type="number"
                            inputMode="decimal"
                            placeholder="0.00"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            className="w-full bg-transparent text-4xl font-extrabold tracking-tight text-gray-900 outline-none placeholder:text-gray-300 dark:text-white dark:placeholder:text-gray-600"
                            autoFocus
                        />
                    </div>
                </div>

                <Input
                    label="Description"
                    placeholder="What was this for?"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    leftElement={<AlignLeft size={18} />}
                    required
                />

                <Input
                    label="Date"
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    leftElement={<Calendar size={18} />}
                    required
                />

                <div className="space-y-3">
                    <label className="ml-1 block text-sm font-semibold text-gray-700 dark:text-gray-300">
                        Payment Method
                    </label>
                    <div className="flex flex-wrap gap-2">
                        {PAYMENT_METHODS.map(({ value, label, icon: Icon }) => {
                            const isSelected = paymentMethod === value;
                            return (
                                <FlipButton
                                    key={value}
                                    type="button"
                                    onClick={() => setPaymentMethod(value)}
                                    className={`flex items-center gap-2 rounded-xl border-2 px-3 py-2 text-sm font-bold transition-all ${
                                        isSelected
                                            ? 'border-brand-blue bg-brand-blue/5 text-brand-blue shadow-sm shadow-brand-blue/10'
                                            : 'border-transparent bg-gray-50 text-gray-500 hover:bg-gray-100 dark:bg-gray-800/60 dark:text-gray-400 dark:hover:bg-gray-800'
                                    }`}
                                >
                                    <Icon size={16} />
                                    {label}
                                </FlipButton>
                            );
                        })}
                    </div>
                </div>

                {categories.length > 0 ? (
                    <div className="space-y-3">
                        <label className="ml-1 block text-sm font-semibold text-gray-700 dark:text-gray-300">
                            Category <span className="text-red-500">*</span>
                        </label>
                        <div className="flex flex-wrap gap-2">
                            {categories.map((cat) => {
                                const isSelected = categoryId === cat.id;
                                return (
                                    <FlipButton
                                        key={cat.id}
                                        type="button"
                                        onClick={() => setCategoryId(cat.id)}
                                        className={`flex items-center gap-2.5 rounded-2xl border-2 px-3 py-2 transition-all ${
                                            isSelected
                                                ? 'border-brand-blue bg-brand-blue/5 shadow-md shadow-brand-blue/10'
                                                : 'border-transparent bg-gray-50 hover:bg-gray-100 dark:bg-gray-800/50 dark:hover:bg-gray-800'
                                        }`}
                                    >
                                        <div
                                            className="flex h-8 w-8 items-center justify-center rounded-xl text-xs font-black text-white"
                                            style={{ backgroundColor: cat.color || '#3b82f6' }}
                                        >
                                            {cat.name.charAt(0).toUpperCase()}
                                        </div>
                                        <span className={`text-sm font-bold ${isSelected ? 'text-brand-blue' : 'text-gray-600 dark:text-gray-400'}`}>
                                            {cat.name}
                                        </span>
                                    </FlipButton>
                                );
                            })}
                        </div>
                    </div>
                ) : (
                    <div className="rounded-2xl border border-dashed border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-500 dark:border-gray-700 dark:bg-gray-800/50 dark:text-gray-400">
                        No categories available. Add categories first to classify expenses.
                    </div>
                )}

                <div className="space-y-2">
                    <label className="ml-1 block text-sm font-semibold text-gray-700 dark:text-gray-300">
                        Notes <span className="font-normal text-gray-400">(optional)</span>
                    </label>
                    <textarea
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        placeholder="Add more details..."
                        rows={3}
                        className="w-full resize-none rounded-2xl border border-gray-200 bg-white p-4 text-sm text-gray-900 outline-none transition-all focus:border-brand-blue focus:ring-4 focus:ring-brand-blue/10 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                    />
                </div>
            </div>
        </Modal>
    );
};

export default AddDailyExpenseModal;
