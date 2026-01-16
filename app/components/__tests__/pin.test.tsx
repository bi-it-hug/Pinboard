import { render, screen } from "@testing-library/react";
import Pin from "@/components/pin";
import { PinProvider } from "@/components/pin-provider";

describe("Pin component", () => {
    it("renders image with alt text", () => {
        render(
            <PinProvider>
                <Pin src="https://example.com/image.jpg" alt="Example image" />
            </PinProvider>
        );

        const image = screen.getByAltText("Example image");
        expect(image).toBeInTheDocument();
    });
});

