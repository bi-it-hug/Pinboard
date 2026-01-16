import { renderHook, act } from "@testing-library/react";
import { ThemeProvider, useTheme } from "@/components/theme-provider";

function renderThemeHook() {
    return renderHook(() => useTheme(), {
        wrapper: ({ children }) => <ThemeProvider>{children}</ThemeProvider>,
    });
}

describe("ThemeProvider", () => {
    it("defaults to dark theme", () => {
        const { result } = renderThemeHook();
        expect(result.current.theme).toBe("dark");
    });

    it("toggles theme", () => {
        const { result } = renderThemeHook();

        act(() => {
            result.current.setTheme("light");
        });

        expect(result.current.theme).toBe("light");
    });
}

