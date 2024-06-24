export const handleInput = () => {
    const handleKeyDown = (e: KeyboardEvent) => {
        const scrollBy: ScrollToOptions = {
            left: 0,
            top: 0,
            behavior: 'smooth'
        };

        switch (e.key) {
            case 'd':
                scrollBy.left = 150;
                break;
            case 'a':
                scrollBy.left = -150;
                break;
            case 'w':
                scrollBy.top = -150;
                break;
            case 's':
                scrollBy.top = 150;
                break;
        }

        document.getElementById('gameArea')?.scrollBy(scrollBy);
    }

    document.addEventListener('keypress', handleKeyDown);
}