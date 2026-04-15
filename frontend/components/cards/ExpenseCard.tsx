"use client";

import { Edit2, Trash2 } from 'lucide-react';
import { CATEGORY_STYLES } from '../../lib/constants';
import { formatAmount } from '../../lib/formatters';
import Badge from '../ui/Badge';
import { Expense, Participant } from '../../types';

interface ExpenseCardProps {
    expense: Expense;
    participants: Participant[];
    symbol: string;
    canEdit: boolean;
    onEdit: (expense: Expense) => void;
    onDelete: (expenseId: string) => void;
}

const ExpenseCard = ({ expense, participants, symbol, canEdit, onEdit, onDelete }: ExpenseCardProps) => {
    const style = CATEGORY_STYLES[expense.category] || CATEGORY_STYLES['Others'];
    const Icon = style.icon;
    const splitAmong = expense.splitAmong || [];

    const isEveryone = splitAmong.length === participants.length || splitAmong.length === 0;
    const splitCount = isEveryone ? participants.length : splitAmong.length;

    // Multi-payer logic
    const payers = participants.filter(p => expense.paidBy.includes(p.id));
    const payerNames = payers.length > 0 ? payers.map(p => p.name).join(', ') : 'Unknown';

    return (
        <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-[2rem] border border-gray-100 dark:border-gray-700 flex flex-col sm:flex-row justify-between items-start sm:items-center shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group relative gap-6 overflow-hidden">
            {/* Category glow background effect on hover */}
            <div className={`absolute -right-10 -bottom-10 w-40 h-40 rounded-full blur-[80px] opacity-0 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none ${style.bg}`} />

            <div className="flex items-center gap-5 w-full sm:w-auto">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 shadow-inner transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3 overflow-hidden ${style.bg}`}>
                    <img src={style.gif} alt={expense.category} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                    <h4 className="font-black text-gray-900 dark:text-white text-lg sm:text-xl mb-1 truncate"> {expense.description} </h4>
                    <div className="flex flex-wrap items-center gap-2">
                        <Badge variant="secondary" className={`text-[10px] font-black uppercase tracking-widest px-2 py-0.5 border-none ${style.bg} ${style.color}`}>
                            {expense.category}
                        </Badge>
                        <div className="flex items-center gap-1.5 text-xs font-bold text-gray-500 dark:text-gray-400">
                            Paid by <span className="text-gray-900 dark:text-white bg-gray-100 dark:bg-gray-700 px-2 py-0.5 rounded-md truncate max-w-[150px]" title={payerNames}> {payerNames} </span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex items-center justify-between w-full sm:w-auto gap-6 sm:gap-10 border-t sm:border-t-0 border-gray-50 dark:border-gray-700/50 pt-4 sm:pt-0">
                <div className="flex flex-col items-end">
                    <div className="flex items-center gap-2 mb-1.5">
                        <div className="flex -space-x-2">
                            {participants.filter(p => isEveryone || splitAmong.includes(p.id)).slice(0, 3).map(p => (
                                <div key={p.id} title={p.name} className="w-6 h-6 rounded-full border-2 border-white dark:border-gray-800 bg-brand-blue text-white flex items-center justify-center text-[10px] font-black">
                                    {p.name.charAt(0).toUpperCase()}
                                </div>
                            ))}
                            {splitCount > 3 && (
                                <div className="w-6 h-6 rounded-full border-2 border-white dark:border-gray-800 bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300 flex items-center justify-center text-[9px] font-black">
                                    +{splitCount - 3}
                                </div>
                            )}
                        </div>
                        <span className="text-[10px] font-black uppercase tracking-tighter text-gray-400"> For {isEveryone ? 'Everyone' : `${splitCount} Split`} </span>
                    </div>
                    <div className={`font-black text-xl sm:text-2xl ${expense.isPayment ? 'text-brand-green' : 'text-gray-900 dark:text-white'}`}>
                        {symbol}{formatAmount(expense.amount || 0)}
                    </div>
                </div>

                {
                    canEdit && (
                        <div className="flex items-center gap-1 bg-gray-50 dark:bg-gray-900/50 p-1 rounded-2xl md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300">
                            <button onClick={() => onEdit(expense)} className="p-2.5 text-gray-400 hover:text-brand-blue hover:bg-white dark:hover:bg-gray-800 rounded-xl shadow-sm transition-all" title="Edit">
                                <Edit2 size={18} />
                            </button>
                            <button onClick={() => onDelete(expense.id)} className="p-2.5 text-gray-400 hover:text-brand-orange hover:bg-white dark:hover:bg-gray-800 rounded-xl shadow-sm transition-all" title="Delete">
                                <Trash2 size={18} />
                            </button>
                        </div>
                    )
                }
            </div>
        </div>
    );
};

export default ExpenseCard;
