import axios from 'axios';
import React, { useState } from 'react'

export default function AddTask({ list, onAddTaskItem }) {
    const [isVisible, setVisible] = useState(false);
    const [inputValue, setInputValue] = useState('');

    const toggleFormVisible = () => {
        setVisible(!isVisible);
        setInputValue('');
    };

    const onAdd = () => {
        const obj = {
            itemId: list.id,
            title: inputValue,
            completed: false
        }

        if (inputValue.trim() !== '') {
            axios.post(`http://localhost:3001/taskItems`, obj).then(({ data }) => {
                onAddTaskItem(list.id, data);
                toggleFormVisible();
            });
        }
    }

    return (
        <div className="tasks__add-form">
            {
                !isVisible ? (
                    <button className="tasks__add-task" onClick={toggleFormVisible}>
                        <i>
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M8 1V15" stroke="#B4B4B4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M1 8H15" stroke="#B4B4B4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>    
                            </svg>
                        </i>
                        <span>Новая задача</span>
                    </button>
                ) : (
                    <div className="tasks__form">
                        <div className="tasks__form-input addList-popup__input-name">
                            <input type="text" placeholder="Текст задачи" value={inputValue} onChange={e => setInputValue(e.target.value)}/>
                        </div>
                        <div className="tasks__form-btns">
                            <button className="tasks__form-submit addList-popup__add-folder" onClick={onAdd}>Добавить задачу</button>
                            <button className="tasks__form-cancel" onClick={toggleFormVisible}>Отмена</button>
                        </div>
                    </div>
                )
            }
            
        </div>
    )
}
