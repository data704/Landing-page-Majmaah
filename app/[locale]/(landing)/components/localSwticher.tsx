'use client';

import { useState, useRef, useEffect, useTransition } from 'react';
import Image from 'next/image';
import { usePathname, useRouter } from '@/i18n/navigation';
import { routing } from '@/i18n/routing';

type Locale = 'en' | 'ar';

interface Props {
    currentLocale: Locale
}
export default function LocaleSwitcher({ currentLocale }: Props) {
    const router = useRouter();
    const pathname = usePathname();
    const [open, setOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);
    const [isPending, startTransition] = useTransition();

    useEffect(() => {
        const clickOutside = (e: MouseEvent) => {
            if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
        };
        document.addEventListener('mousedown', clickOutside);
        return () => document.removeEventListener('mousedown', clickOutside);
    }, []);

    function handleLocaleChange(nextLocale: Locale) {
        startTransition(() => {
            // Use the signature required by your i18n library
            router.replace(pathname, { locale: nextLocale });
        });
        setOpen(false); // Close the menu after selection
    }

    return (
        <div ref={ref} className='relative flex items-center justify-center'>
            <button 
                onClick={() => setOpen(!open)} 
                disabled={isPending}
                className="focus:outline-none"
            >
                <Image 
                    src="/icons/world.png" 
                    width={24} 
                    height={24} 
                    alt="language" 
                    className='bg-white w-10 h-10 rounded-full shadow-md p-2 hover:bg-gray-100 cursor-pointer'
                />
            </button>

            {open && (
                <ul className={`absolute top-12 ${currentLocale ==="ar" ? 'left-0' :"right-0"}  bg-white shadow-xl rounded-lg mt-1 p-2 min-w-30`}>
                    {routing.locales.map((l) => (
                        <li key={l}>
                            <button
                                onClick={() => handleLocaleChange(l as Locale)}
                                className={`p-2 hover:text-primary w-full text-left cursor-pointer transition-colors ${
                                    currentLocale === l ? "text-primary font-bold" : "text-gray-700"
                                }`}
                            >
                                {l === 'en' ? 'English' : 'العربية'}
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}