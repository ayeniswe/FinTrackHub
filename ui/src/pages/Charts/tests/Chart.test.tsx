import '@testing-library/jest-dom'
import { setupJestCanvasMock } from 'jest-canvas-mock';
import { cleanup, render} from '@testing-library/react';
import SavingsTrend from '../SavingsTrend';


beforeEach(() => {
    // Mock functions
    setupJestCanvasMock();
})

afterEach(() => {
    cleanup();
})

describe("Render Charts", () => {
    test("show savings trend chart", () => {
        // Get canvas
        const { container } = render(<SavingsTrend/>);
        // Verify chart renders
        expect(container).toBeInTheDocument();
    });
    test("show savings trend chart w/ default settings", () => {
        // Get canvas context
        const { container } = render(<SavingsTrend/>);
        const ctx = container.querySelector('canvas')?.getContext('2d');
        // Verify settings hardcoded called
        expect(ctx?.scale).toBeCalledWith(1, -1);
        expect(ctx?.translate).toBeCalledWith(0, -1100);
        expect(ctx?.lineWidth).toEqual(25);
        expect(ctx?.lineCap).toEqual("round");
        expect(ctx?.beginPath).toBeCalledTimes(1);
        expect(ctx?.moveTo).toBeCalledWith(0, 0);
        expect(ctx?.stroke).toBeCalledTimes(1);
    });
});
