import { useEffect } from "react";

// Custom React Hook for title of page:
function useTitle(title: string): void {
    useEffect(() => {
        document.title = title;
    }, []);
}

export default useTitle;
