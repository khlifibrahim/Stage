import { useEffect } from "react";

export function useOnClickOutside (ref, handler) {
    useEffect( () => {
        const listener = (e) => {
            if(!ref.current) return 
            if(ref.current.contains(e.target)) return

            handler(e)
        }

        document.addEventListener('mousedown', listener)
        document.addEventListener('touchstart', listener)

        return () => {
            document.removeEventListener('mousedown', listener)
            document.removeEventListener('touchstart', listener)
        }
    }, [ref, handler])
}