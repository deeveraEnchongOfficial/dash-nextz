import { type } from 'os';
import React from 'react';

type ButtonLoaderProps = {
    isLoading: boolean;
    onClick: () => void;
    type: 'submit' | 'button';
    name?: string;
};

function ButtonLoader({ isLoading, onClick, type, name }: ButtonLoaderProps) {
    return (
        <button
            type={type}
            className="w-full cursor-pointer rounded-lg border border-primary bg-primary p-4 text-white transition hover:bg-opacity-90"
            onClick={onClick}
            disabled={isLoading}
        >
            {isLoading ? (
                <div className="flex justify-center items-center">
                    <div className="h-6 w-6 animate-spin rounded-full border-4 border-solid border-blue-200 border-t-transparent"></div>
                </div>
            ) : (
                name ?? 'Submit'
            )}
        </button>
    );
}

export default ButtonLoader;
