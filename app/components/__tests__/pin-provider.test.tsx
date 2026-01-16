import { renderHook, act } from "@testing-library/react";
import { PinProvider, usePins, type PinData } from "@/components/pin-provider";

function renderPinsHook() {
    return renderHook(() => usePins(), {
        wrapper: ({ children }) => <PinProvider>{children}</PinProvider>,
    });
}

describe("PinProvider", () => {
    const samplePin: PinData = {
        id: "1",
        src: "https://example.com/image.jpg",
        alt: "Example image",
    };

    it("starts with an empty list", () => {
        const { result } = renderPinsHook();
        expect(result.current.selectedPins).toEqual([]);
    });

    it("adds a pin", () => {
        const { result } = renderPinsHook();

        act(() => {
            result.current.addPin(samplePin);
        });

        expect(result.current.selectedPins).toEqual([samplePin]);
    });

    it("does not add duplicates", () => {
        const { result } = renderPinsHook();

        act(() => {
            result.current.addPin(samplePin);
            result.current.addPin(samplePin);
        });

        expect(result.current.selectedPins).toHaveLength(1);
    });

    it("removes a pin", () => {
        const { result } = renderPinsHook();

        act(() => {
            result.current.addPin(samplePin);
        });

        act(() => {
            result.current.removePin(samplePin.id);
        });

        expect(result.current.selectedPins).toEqual([]);
    });
}

