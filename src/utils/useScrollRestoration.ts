import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export function handleBeforeUnload() {
    if (typeof window !== "undefined") {
        const pathname = window.location.pathname;
        localStorage.setItem("scrollPosition_" + pathname, window.scrollY.toString());
    } else {
        console.log("window object does not exist");
    }
};
export default function useScrollRestoration() {
    const pathname = usePathname();

    useEffect(() => {
        window.addEventListener("beforeunload", handleBeforeUnload);
        return () => {
            window.removeEventListener("beforeunload", handleBeforeUnload);
        };
    }, [pathname]);

    useEffect(() => {
        setTimeout(() => {
            const savedScrollPosition = localStorage.getItem(
                "scrollPosition_" + pathname
            );
            if (savedScrollPosition) {
                window.scrollTo({
                    top: Number(savedScrollPosition),
                    behavior: "smooth",
                });
                localStorage.removeItem("scrollPosition_" + pathname);
            }
        }, 1000);
    }, []);
}


