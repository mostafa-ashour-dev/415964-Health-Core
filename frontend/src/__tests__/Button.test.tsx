import {render, screen} from '@testing-library/react';
import Button from '../components/shared/clickables/Button';
import { expect, test } from '@jest/globals';

test('button shows text', () => {
    render(<Button variant='button_modern_primary' type="button">Click</Button>);
    // @ts-expect-error 111
    expect(screen.getByText(/Click/i)).toBeInTheDocument();
});