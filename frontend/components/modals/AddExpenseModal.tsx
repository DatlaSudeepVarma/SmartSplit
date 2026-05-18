"use client";

import React, { useState, useEffect, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertCircle, Tag, Check } from 'lucide-react';
import Modal from '../ui/Modal';
import Input from '../ui/Input';
import Button from '../ui/Button';
import { FlipButton } from '../ui/Text3DFlip';
import { Participant, Expense } from '../../types';
import { CATEGORY_STYLES } from '../../lib/constants';
import { CurrencyContext } from '../../context/AppContext';

interface AddExpenseModalProps {
    isOpen: boolean;
    onClose: () => void;
    participants: Participant[];
    editingExpense: Expense | null;
    onSave: (expenseData: Omit<Expense, 'id' | 'tripId'>) => Promise<void>;
    isLoading?: boolean;
    error?: string;
}


const container = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.05
        }
    }
};

const item = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0 }
};

const AddExpenseModal = ({ isOpen, onClose, participants, editingExpense, onSave, isLoading, error }: AddExpenseModalProps) => {
    const { symbol } = useContext(CurrencyContext);
    const [form, setForm] = useState<{ desc: string, amount: string, category: string, paidBy: string[], date: string }>({
        desc: '',
        amount: '',
        category: 'Food',
        paidBy: [],
        date: ''
    });
    const [selectedSplit, setSelectedSplit] = useState<string[]>([]);
    const [formError, setFormError] = useState('');

    useEffect(() => {
        if (editingExpense) {
            setForm({
                desc: editingExpense.description,
                amount: editingExpense.amount.toString(),
                category: editingExpense.category,
                paidBy: Array.isArray(editingExpense.paidBy) ? editingExpense.paidBy : [editingExpense.paidBy],
                date: editingExpense.date.split('T')[0]
            });
            setSelectedSplit(editingExpense.splitAmong || []);
        } else {
            setForm({
                desc: '',
                amount: '',
                category: 'Food',
                paidBy: participants.length > 0 ? [participants[0].id] : [],
                date: new Date().toISOString().split('T')[0]
            });
            setSelectedSplit([]);
        }
        setFormError('');
    }, [editingExpense, isOpen, participants]);

    useEffect(() => {
        if (formError || error) {
            const modalBody = document.querySelector('[data-lenis-prevent]');
            if (modalBody) modalBody.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }, [formError, error]);

    const handleSave = async () => {
        if (form.paidBy.length === 0 || !form.amount || !form.desc || !form.category) {
            setFormError('Please fill all required fields.');
            return;
        }

        const data: any = {
            description: form.desc,
            amount: parseFloat(form.amount),
            date: form.date ? new Date(form.date).toISOString() : new Date().toISOString(),
            category: form.category,
            paidBy: form.paidBy,
            splitAmong: selectedSplit.length > 0 ? selectedSplit : participants.map(p => p.id),
            isPayment: false
        };
        await onSave(data);
    };

    const togglePayer = (id: string) => {
        if (form.paidBy.includes(id)) {
            if (form.paidBy.length > 1) {
                setForm({ ...form, paidBy: form.paidBy.filter(pid => pid !== id) });
            }
        } else {
            setForm({ ...form, paidBy: [...form.paidBy, id] });
        }
    };

    const toggleSplit = (id: string) => {
        if (selectedSplit.length === 0) {
            setSelectedSplit(participants.filter(p => p.id !== id).map(p => p.id));
        } else {
            if (selectedSplit.includes(id)) {
                if (selectedSplit.length === 1) setSelectedSplit([]);
                else setSelectedSplit(selectedSplit.filter(sid => sid !== id));
            } else {
                setSelectedSplit([...selectedSplit, id]);
            }
        }
    };

    const isParticipantSelected = (id: string) => {
        return selectedSplit.length === 0 || selectedSplit.includes(id);
    };

    const modalFooter = (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
        >
            <Button onClick={handleSave} className="w-full py-5 text-lg shadow-xl shadow-brand-blue/20" isLoading={isLoading}>
                {editingExpense ? "Update Expense" : "Save Expense"}
            </Button>
        </motion.div>
    );

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title={editingExpense ? "Edit Expense" : "Add Expense"}
            footer={modalFooter}
        >
            <motion.div
                variants={container}
                initial="hidden"
                animate="show"
                className="space-y-6"
            >
                <AnimatePresence mode="wait">
                    {(formError || error) && (
                        <motion.div
                            initial={{ opacity: 0, y: -20, height: 0 }}
                            animate={{ opacity: 1, y: 0, height: 'auto' }}
                            exit={{ opacity: 0, y: -20, height: 0 }}
                            className="p-4 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-sm rounded-2xl flex items-center gap-3 font-bold border border-red-100 dark:border-red-900/30 overflow-hidden mb-2"
                        >
                            <AlertCircle size={20} className="shrink-0" /> {formError || error}
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Compact Grid for Inputs */}
                <motion.div variants={item} className="grid grid-cols-2 gap-5">
                    <Input
                        label="Amount"
                        type="number"
                        value={form.amount}
                        onChange={(e) => setForm({ ...form, amount: e.target.value })}
                        placeholder="0.00"
                        required
                        leftElement={<span className="font-bold text-gray-400">{symbol}</span>}
                    />
                    <Input
                        label="Date"
                        type="date"
                        value={form.date}
                        onChange={e => setForm({ ...form, date: e.target.value })}
                        required
                    />
                </motion.div>

                <motion.div variants={item}>
                    <Input
                        label="Description"
                        value={form.desc}
                        onChange={(e) => setForm({ ...form, desc: e.target.value })}
                        placeholder="What's this for?"
                        required
                        leftElement={<Tag size={18} />}
                    />
                </motion.div>

                {/* Category Selection */}
                <motion.div variants={item}>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 ml-1"> Category </label>
                    <div className="flex flex-wrap gap-2.5">
                        {Object.entries(CATEGORY_STYLES).filter(([k]) => k !== 'Payment').map(([name, style]) => {
                            const Icon = style.icon;
                            const isSelected = form.category === name;
                            return (
                                <FlipButton
                                    key={name}
                                    onClick={() => setForm({ ...form, category: name })}
                                    className={`flex items-center gap-3 px-4 py-2 rounded-2xl border-2 transition-all duration-300 ${isSelected
                                        ? `border-brand-blue bg-brand-blue/5 shadow-md shadow-brand-blue/10`
                                        : 'border-transparent bg-gray-50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-800'
                                        }`}
                                >
                                    <div className={`w-8 h-8 rounded-xl flex items-center justify-center overflow-hidden transition-transform duration-500 ${isSelected ? 'scale-110 rotate-3' : ''} ${style.bg} ${style.color}`}>
                                        <img src={style.gif} alt={name} className="w-full h-full object-cover" />
                                    </div>
                                    <span className={`text-sm font-bold ${isSelected ? 'text-brand-blue' : 'text-gray-500 dark:text-gray-400'}`}>
                                        {name}
                                    </span>
                                </FlipButton>
                            );
                        })}
                    </div>
                </motion.div>

                {/* Payer Selection */}
                <motion.div variants={item}>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 ml-1"> Paid By (Multiple allowed) </label>
                    <div className="flex flex-wrap gap-2.5">
                        {participants.map(p => {
                            const isSelected = form.paidBy.includes(p.id);
                            return (
                                <FlipButton
                                    key={p.id}
                                    onClick={() => togglePayer(p.id)}
                                    className={`group flex items-center gap-2.5 p-1.5 pr-4 rounded-full border-2 transition-all duration-300 ${isSelected
                                        ? 'border-brand-blue bg-brand-blue/5 shadow-md shadow-brand-blue/5'
                                        : 'border-transparent bg-gray-50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-800'
                                        }`}
                                >
                                    <div className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs transition-transform ${isSelected ? 'bg-brand-blue text-white scale-110' : 'bg-gray-200 dark:bg-gray-700 text-gray-600'}`}>
                                        {p.name.charAt(0).toUpperCase()}
                                    </div>
                                    <span className={`text-sm font-bold ${isSelected ? 'text-brand-blue' : 'text-gray-600 dark:text-gray-400'}`}>
                                        {p.name}
                                    </span>
                                    {isSelected && <div className="ml-1 w-2 h-2 rounded-full bg-brand-blue animate-pulse" />}
                                </FlipButton>
                            );
                        })}
                    </div>
                </motion.div>

                {/* Split Selection */}
                <motion.div variants={item}>
                    <div className="flex justify-between items-center mb-3 ml-1">
                        <label className="text-sm font-semibold text-gray-700 dark:text-gray-300"> Split Among </label>
                        <FlipButton onClick={() => setSelectedSplit([])} className="text-xs font-bold text-brand-blue hover:underline bg-brand-blue/5 px-3 py-1 rounded-full">
                            Split Everyone
                        </FlipButton>
                    </div>
                    <div className="flex flex-wrap gap-2.5">
                        {participants.map(p => {
                            const isSelected = isParticipantSelected(p.id);
                            return (
                                <FlipButton
                                    key={p.id}
                                    onClick={() => toggleSplit(p.id)}
                                    className={`flex items-center gap-3 px-4 py-2.5 rounded-2xl border-2 transition-all duration-300 ${isSelected
                                        ? 'border-brand-green/30 bg-brand-green/5 shadow-md shadow-brand-green/5'
                                        : 'border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/40'
                                        }`}
                                >
                                    <div className={`w-5 h-5 rounded-lg flex items-center justify-center transition-all ${isSelected ? 'bg-brand-green text-white rotate-6' : 'bg-gray-300 dark:bg-gray-600'}`}>
                                        {isSelected && <Check size={12} strokeWidth={4} />}
                                    </div>
                                    <span className={`text-sm font-bold ${isSelected ? 'text-gray-900 dark:text-white' : 'text-gray-600 dark:text-gray-300'}`}> {p.name} </span>
                                </FlipButton>
                            );
                        })}
                    </div>
                </motion.div>
            </motion.div>
        </Modal>
    );
};

export default AddExpenseModal;
